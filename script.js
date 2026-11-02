/* ==========================================================================
   CLÍNICA VETERINARIA PATITAS FELICES - JAVASCRIPT
   Índice:
   1.  Configuración y utilidades
   2.  Analítica web ligera (eventos + métricas de rendimiento)
   3.  Manejo de errores (scripts e imágenes)
   4.  Tema claro/oscuro con memoria (localStorage)
   5.  Menú: fondo sólido, enlace activo y cierre en móvil
   6.  Barra de progreso y botón "volver arriba"
   7.  Animaciones al hacer scroll y contadores
   8.  Carrusel de testimonios (4 por vista, responsivo)
   9.  Formulario: validación, borrador persistente y envío por correo
   10. Inicialización
   ========================================================================== */

'use strict';

/* ==========================================================================
   1. CONFIGURACIÓN Y UTILIDADES
   ========================================================================== */
const CONFIG = {
  correoDestino: 'citas@patitasfelices.com.do',
  claveTema: 'pf-tema',
  claveBorrador: 'pf-borrador-contacto',
  claveAnalitica: 'pf-analitica',
  autoplayMs: 5000,
  esperaDeteccionCorreo: 1500
};

const $ = (selector, contexto = document) => contexto.querySelector(selector);
const $$ = (selector, contexto = document) => Array.from(contexto.querySelectorAll(selector));

const reducirMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Acceso seguro a localStorage (puede fallar en modo privado o si está bloqueado) */
const almacen = {
  leer(clave, porDefecto = null) {
    try {
      const valor = localStorage.getItem(clave);
      return valor === null ? porDefecto : JSON.parse(valor);
    } catch (error) {
      return porDefecto;
    }
  },
  guardar(clave, valor) {
    try {
      localStorage.setItem(clave, JSON.stringify(valor));
    } catch (error) {
      /* Sin almacenamiento disponible: la página sigue funcionando sin persistencia */
    }
  },
  borrar(clave) {
    try {
      localStorage.removeItem(clave);
    } catch (error) {
      /* Ignorado intencionalmente */
    }
  }
};

/* Muestra una notificación breve (toast de Bootstrap) */
function mostrarAviso(texto) {
  const toastEl = $('#toastAviso');
  if (!toastEl || !window.bootstrap) return;
  $('#toastTexto').textContent = texto;
  bootstrap.Toast.getOrCreateInstance(toastEl, { delay: 3500 }).show();
}

/* Escapa texto antes de insertarlo como HTML (seguridad: evita XSS) */
function escaparHTML(texto) {
  const div = document.createElement('div');
  div.textContent = texto;
  return div.innerHTML;
}

/* ==========================================================================
   2. ANALÍTICA WEB LIGERA
   - Registra eventos en window.dataLayer (compatible con Google Tag Manager / GA4)
   - Guarda un resumen local en localStorage para poder revisarlo en la consola:
     escribe  PatitasAnalitica.resumen()  en la consola del navegador.
   ========================================================================== */
window.dataLayer = window.dataLayer || [];

const Analitica = {
  registrar(evento, datos = {}) {
    const registro = { event: evento, ...datos, fecha: new Date().toISOString() };
    window.dataLayer.push(registro);

    const resumen = almacen.leer(CONFIG.claveAnalitica, {});
    resumen[evento] = (resumen[evento] || 0) + 1;
    almacen.guardar(CONFIG.claveAnalitica, resumen);
  },

  resumen() {
    const datos = almacen.leer(CONFIG.claveAnalitica, {});
    console.table(datos);
    return datos;
  },

  /* Métricas de rendimiento (Core Web Vitals básicos) */
  medirRendimiento() {
    if (!('PerformanceObserver' in window)) return;

    try {
      // LCP: cuánto tarda en pintarse el elemento más grande
      new PerformanceObserver((lista) => {
        const entradas = lista.getEntries();
        const ultima = entradas[entradas.length - 1];
        if (ultima) this.registrar('web_vital_lcp', { valor_ms: Math.round(ultima.startTime) });
      }).observe({ type: 'largest-contentful-paint', buffered: true });

      // CLS: cuánto "salta" el contenido mientras carga
      let cls = 0;
      new PerformanceObserver((lista) => {
        lista.getEntries().forEach((e) => { if (!e.hadRecentInput) cls += e.value; });
      }).observe({ type: 'layout-shift', buffered: true });

      window.addEventListener('pagehide', () => {
        this.registrar('web_vital_cls', { valor: Number(cls.toFixed(4)) });
      }, { once: true });
    } catch (error) {
      /* Navegador sin soporte para alguna métrica */
    }

    window.addEventListener('load', () => {
      const nav = performance.getEntriesByType('navigation')[0];
      if (nav) this.registrar('tiempo_carga', { valor_ms: Math.round(nav.loadEventStart) });
    });
  }
};

window.PatitasAnalitica = Analitica;

/* Registra clics en enlaces importantes (teléfono, WhatsApp, redes, CTA) */
function iniciarSeguimientoClics() {
  document.addEventListener('click', (e) => {
    const enlace = e.target.closest('a, button');
    if (!enlace) return;
    const href = enlace.getAttribute('href') || '';

    if (href.startsWith('tel:')) Analitica.registrar('clic_telefono', { numero: href.slice(4) });
    else if (href.includes('wa.me')) Analitica.registrar('clic_whatsapp');
    else if (enlace.closest('.redes')) Analitica.registrar('clic_red_social', { red: enlace.getAttribute('aria-label') });
    else if (enlace.classList.contains('btn-cta')) Analitica.registrar('clic_cta');
  });
}

/* ==========================================================================
   3. MANEJO DE ERRORES
   ========================================================================== */
window.addEventListener('error', (e) => {
  // Errores de recursos (imágenes) se gestionan abajo; aquí solo errores de script
  if (e.message) Analitica.registrar('error_js', { mensaje: e.message });
});

window.addEventListener('unhandledrejection', (e) => {
  Analitica.registrar('error_promesa', { mensaje: String(e.reason) });
});

/* Si una imagen externa no carga, se reemplaza por una ilustración con huellita */
function iniciarRespaldoImagenes() {
  const respaldo = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">' +
    '<rect width="400" height="300" fill="#18BC9C"/>' +
    '<text x="50%" y="55%" font-size="110" text-anchor="middle" dominant-baseline="middle">🐾</text></svg>'
  );

  $$('img').forEach((img) => {
    const aplicar = () => {
      if (img.dataset.respaldo) return;
      img.dataset.respaldo = 'true';
      img.src = respaldo;
      Analitica.registrar('error_imagen', { imagen: img.alt });
    };
    img.addEventListener('error', aplicar, { once: true });
    // Por si la imagen falló antes de que el script cargara
    if (img.complete && img.naturalWidth === 0 && img.getAttribute('src')) aplicar();
  });
}

/* ==========================================================================
   4. TEMA CLARO / OSCURO (con memoria del navegador)
   ========================================================================== */
function iniciarTema() {
  const btn = $('#btnTema');
  const raiz = document.documentElement;
  const prefiereOscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const temaGuardado = almacen.leer(CONFIG.claveTema, prefiereOscuro ? 'dark' : 'light');

  const aplicarTema = (tema) => {
    raiz.setAttribute('data-theme', tema);
    const oscuro = tema === 'dark';
    btn.innerHTML = `<i class="fa-solid ${oscuro ? 'fa-sun' : 'fa-moon'}" aria-hidden="true"></i>`;
    btn.setAttribute('aria-label', oscuro ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
  };

  aplicarTema(temaGuardado);

  btn.addEventListener('click', () => {
    const nuevo = raiz.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    aplicarTema(nuevo);
    almacen.guardar(CONFIG.claveTema, nuevo);
    Analitica.registrar('cambio_tema', { tema: nuevo });
    mostrarAviso(nuevo === 'dark' ? '🌙 Modo oscuro activado' : '☀️ Modo claro activado');
  });
}

/* ==========================================================================
   5. MENÚ DE NAVEGACIÓN
   ========================================================================== */
function iniciarMenu() {
  const menu = $('#menuPrincipal');
  const enlaces = $$('.navbar-vet .nav-link');
  const colapsable = $('#menuEnlaces');

  // Cierra el menú en móviles al tocar un enlace
  enlaces.forEach((enlace) => {
    enlace.addEventListener('click', () => {
      if (colapsable.classList.contains('show') && window.bootstrap) {
        bootstrap.Collapse.getOrCreateInstance(colapsable).hide();
      }
    });
  });

  // Marca como activo el enlace de la sección visible
  const secciones = $$('main section[id]');
  if ('IntersectionObserver' in window) {
    const observador = new IntersectionObserver((entradas) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;
        const id = entrada.target.id;
        enlaces.forEach((enlace) => {
          const activo = enlace.getAttribute('href') === `#${id}`;
          enlace.classList.toggle('active', activo);
          if (activo) enlace.setAttribute('aria-current', 'page');
          else enlace.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    secciones.forEach((s) => observador.observe(s));
  }

  return menu;
}

/* ==========================================================================
   6. BARRA DE PROGRESO Y BOTÓN "VOLVER ARRIBA"
   ========================================================================== */
function iniciarScroll(menu) {
  const barra = $('#progresoScroll');
  const btnArriba = $('#volverArriba');
  let pendiente = false;

  const actualizar = () => {
    const y = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    barra.style.width = `${total > 0 ? (y / total) * 100 : 0}%`;
    menu.classList.toggle('menu-solido', y > 60);
    btnArriba.classList.toggle('mostrar', y > 500);
    pendiente = false;
  };

  // requestAnimationFrame evita recalcular en cada píxel de scroll (rendimiento)
  window.addEventListener('scroll', () => {
    if (!pendiente) {
      pendiente = true;
      requestAnimationFrame(actualizar);
    }
  }, { passive: true });

  btnArriba.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: reducirMovimiento ? 'auto' : 'smooth' });
  });

  actualizar();
}

/* ==========================================================================
   7. ANIMACIONES AL HACER SCROLL Y CONTADORES
   ========================================================================== */
function iniciarRevelado() {
  const elementos = $$('.revelar');

  if (!('IntersectionObserver' in window) || reducirMovimiento) {
    elementos.forEach((el) => el.classList.add('visible'));
    return;
  }

  const observador = new IntersectionObserver((entradas, obs) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('visible');
        obs.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.12 });

  elementos.forEach((el, i) => {
    el.style.transitionDelay = `${(i % 3) * 0.12}s`;
    observador.observe(el);
  });
}

function iniciarContadores() {
  const formato = new Intl.NumberFormat('es-DO');

  $$('.contador').forEach((contador) => {
    const meta = Number(contador.dataset.meta) || 0;

    if (reducirMovimiento) {
      contador.textContent = formato.format(meta);
      return;
    }

    const duracion = 1800;
    let inicio = null;
    const paso = (tiempo) => {
      if (!inicio) inicio = tiempo;
      const progreso = Math.min((tiempo - inicio) / duracion, 1);
      const suavizado = 1 - Math.pow(1 - progreso, 3);
      contador.textContent = formato.format(Math.floor(meta * suavizado));
      if (progreso < 1) requestAnimationFrame(paso);
      else contador.textContent = `${formato.format(meta)}+`;
    };
    requestAnimationFrame(paso);
  });
}

/* ==========================================================================
   8. CARRUSEL DE TESTIMONIOS
   - 4 cards por vista en escritorio, 3 / 2 / 1 según el ancho (definido en CSS)
   - Botones fuera del grupo de cards, puntos indicadores, autoplay, teclado y gestos táctiles
   ========================================================================== */
function iniciarCarrusel() {
  const carrusel = $('#carruselTestimonios');
  const pista = $('#pistaTestimonios');
  const contPuntos = $('#puntosTestimonios');
  if (!carrusel || !pista) return;

  const items = $$('.carrusel-item', pista);
  let indice = 0;
  let temporizador = null;

  const porVista = () => {
    const valor = parseInt(getComputedStyle(carrusel).getPropertyValue('--por-vista'), 10);
    return Number.isNaN(valor) ? 4 : valor;
  };

  const totalPaginas = () => Math.ceil(items.length / porVista());
  const indiceMaximo = () => Math.max(items.length - porVista(), 0);
  const paginaActual = () => Math.min(Math.ceil(indice / porVista()), totalPaginas() - 1);

  const crearPuntos = () => {
    contPuntos.innerHTML = '';
    for (let p = 0; p < totalPaginas(); p++) {
      const punto = document.createElement('button');
      punto.type = 'button';
      punto.className = 'carrusel-punto';
      punto.setAttribute('role', 'tab');
      punto.setAttribute('aria-label', `Grupo ${p + 1} de ${totalPaginas()}`);
      punto.addEventListener('click', () => { irAPagina(p); reiniciarAutoplay(); });
      contPuntos.appendChild(punto);
    }
  };

  const actualizar = () => {
    const vista = porVista();
    pista.style.transform = `translateX(-${(indice * 100) / vista}%)`;

    // Solo las cards visibles son accesibles por teclado/lector de pantalla
    items.forEach((item, i) => {
      const visible = i >= indice && i < indice + vista;
      item.setAttribute('aria-hidden', String(!visible));
      item.toggleAttribute('inert', !visible);
    });

    $$('.carrusel-punto', contPuntos).forEach((punto, p) => {
      punto.setAttribute('aria-selected', String(p === paginaActual()));
    });
  };

  const irAPagina = (pagina) => {
    indice = Math.min(pagina * porVista(), indiceMaximo());
    actualizar();
  };

  const siguiente = () => {
    indice = indice >= indiceMaximo() ? 0 : Math.min(indice + porVista(), indiceMaximo());
    actualizar();
  };

  const anterior = () => {
    indice = indice <= 0 ? indiceMaximo() : Math.max(indice - porVista(), 0);
    actualizar();
  };

  const detenerAutoplay = () => clearInterval(temporizador);
  const reiniciarAutoplay = () => {
    detenerAutoplay();
    if (!reducirMovimiento) temporizador = setInterval(siguiente, CONFIG.autoplayMs);
  };

  $('#btnNext').addEventListener('click', () => { siguiente(); reiniciarAutoplay(); Analitica.registrar('carrusel_siguiente'); });
  $('#btnPrev').addEventListener('click', () => { anterior(); reiniciarAutoplay(); Analitica.registrar('carrusel_anterior'); });

  // Pausa al pasar el ratón o al enfocar con teclado
  carrusel.addEventListener('mouseenter', detenerAutoplay);
  carrusel.addEventListener('mouseleave', reiniciarAutoplay);
  carrusel.addEventListener('focusin', detenerAutoplay);
  carrusel.addEventListener('focusout', reiniciarAutoplay);

  // Flechas del teclado
  carrusel.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { siguiente(); e.preventDefault(); }
    if (e.key === 'ArrowLeft') { anterior(); e.preventDefault(); }
  });

  // Deslizar con el dedo en móviles
  let xInicial = null;
  pista.addEventListener('touchstart', (e) => { xInicial = e.touches[0].clientX; detenerAutoplay(); }, { passive: true });
  pista.addEventListener('touchend', (e) => {
    if (xInicial === null) return;
    const diferencia = e.changedTouches[0].clientX - xInicial;
    if (Math.abs(diferencia) > 50) (diferencia < 0 ? siguiente : anterior)();
    xInicial = null;
    reiniciarAutoplay();
  });

  // Recalcula al cambiar el tamaño de la ventana (las cards por vista cambian)
  let vistaPrevia = porVista();
  let espera;
  window.addEventListener('resize', () => {
    clearTimeout(espera);
    espera = setTimeout(() => {
      if (porVista() !== vistaPrevia) {
        vistaPrevia = porVista();
        indice = Math.min(indice, indiceMaximo());
        crearPuntos();
      }
      actualizar();
    }, 150);
  });

  // Pausa el autoplay si la pestaña no está visible (ahorra batería)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) detenerAutoplay();
    else reiniciarAutoplay();
  });

  crearPuntos();
  actualizar();
  reiniciarAutoplay();
}

/* ==========================================================================
   9. FORMULARIO DE CONTACTO
   ========================================================================== */
const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

const reglas = {
  nombre: (v) => v.trim().length >= 3 && /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'.-]+$/.test(v.trim()),
  email: (v) => REGEX_EMAIL.test(v.trim()),
  mensaje: (v) => v.trim().length >= 10
};

const mensajesError = {
  nombre: 'Escribe tu nombre (mínimo 3 letras, sin números).',
  email: 'Introduce un correo válido (ej: nombre@dominio.com).',
  mensaje: 'El mensaje debe tener al menos 10 caracteres.'
};

function validarCampo(campo) {
  const valido = reglas[campo.name](campo.value);
  const idError = `error${campo.name.charAt(0).toUpperCase()}${campo.name.slice(1)}`;
  const error = document.getElementById(idError);

  campo.classList.toggle('is-invalid', !valido);
  campo.classList.toggle('is-valid', valido);
  campo.setAttribute('aria-invalid', String(!valido));
  campo.setAttribute('aria-describedby', idError);
  if (error) {
    error.textContent = mensajesError[campo.name];
    error.classList.toggle('mostrar', !valido);
  }
  return valido;
}

/* Abre la app de correo y detecta si el navegador perdió el foco (señal de que se abrió) */
function abrirCorreo(datos) {
  return new Promise((resolve) => {
    let detectada = false;
    const alPerderFoco = () => { detectada = true; };
    const alCambiarVisibilidad = () => { if (document.hidden) detectada = true; };

    window.addEventListener('blur', alPerderFoco);
    document.addEventListener('visibilitychange', alCambiarVisibilidad);

    const asunto = `🐾 Nueva consulta de ${datos.nombre} - Web Patitas Felices`;
    const cuerpo =
      `Hola equipo de Patitas Felices,\n\n${datos.mensaje}\n\n` +
      `--------------------------\nNombre: ${datos.nombre}\nCorreo: ${datos.email}\n` +
      `Enviado desde el sitio web: ${new Date().toLocaleString('es-DO')}`;

    const mailto = `mailto:${CONFIG.correoDestino}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;

    // Se usa un enlace temporal para no navegar fuera de la página
    const enlace = document.createElement('a');
    enlace.href = mailto;
    enlace.style.display = 'none';
    document.body.appendChild(enlace);
    enlace.click();
    enlace.remove();

    setTimeout(() => {
      window.removeEventListener('blur', alPerderFoco);
      document.removeEventListener('visibilitychange', alCambiarVisibilidad);
      resolve(detectada);
    }, CONFIG.esperaDeteccionCorreo);
  });
}

function mostrarModalConfirmacion(datos, appDetectada) {
  const titulo = $('#tituloModal');
  const mensaje = $('#modalMensaje');
  const icono = $('#modalIcono');

  if (appDetectada) {
    icono.innerHTML = '<i class="fa-solid fa-circle-check" aria-hidden="true"></i>';
    titulo.textContent = '¡Correo listo para enviar! 🎉📬';
    mensaje.innerHTML = `Gracias, <strong>${escaparHTML(datos.nombre)}</strong> 🐶❤️. Detectamos que se abrió tu aplicación de correo. ` +
      'Solo presiona <strong>Enviar</strong> allí y te responderemos en menos de 1 hora. ⏱️✨';
  } else {
    icono.innerHTML = '<i class="fa-solid fa-paper-plane" aria-hidden="true"></i>';
    titulo.textContent = '¡Mensaje preparado! 📨🐾';
    mensaje.innerHTML = `Gracias, <strong>${escaparHTML(datos.nombre)}</strong> 😺. Si tu aplicación de correo no se abrió, ` +
      `escríbenos a <a href="mailto:${CONFIG.correoDestino}">${CONFIG.correoDestino}</a> ` +
      'o por <a href="https://wa.me/18095550123" target="_blank" rel="noopener noreferrer">WhatsApp</a> 💬.';
  }

  $('#modalResumen').innerHTML =
    `<p><strong>👤 Nombre:</strong> ${escaparHTML(datos.nombre)}</p>` +
    `<p><strong>📧 Correo:</strong> ${escaparHTML(datos.email)}</p>` +
    `<p><strong>💬 Mensaje:</strong> ${escaparHTML(datos.mensaje)}</p>`;

  if (window.bootstrap) {
    bootstrap.Modal.getOrCreateInstance($('#modalConfirmacion')).show();
  } else {
    alert(`${titulo.textContent}\n${mensaje.textContent}`);
  }
}

function iniciarFormulario() {
  const form = $('#formContacto');
  if (!form) return;

  const campos = $$('input, textarea', form);
  const mensaje = $('#mensaje');
  const contador = $('#contadorMensaje');
  const botonEnviar = $('button[type="submit"]', form);

  const actualizarContador = () => {
    const largo = mensaje.value.length;
    contador.textContent = `${largo}/${mensaje.maxLength}`;
    contador.classList.toggle('limite', largo >= mensaje.maxLength - 20);
  };

  // Restaura el borrador guardado (persistencia en el navegador)
  const borrador = almacen.leer(CONFIG.claveBorrador, null);
  if (borrador) {
    campos.forEach((c) => { if (borrador[c.name]) c.value = borrador[c.name]; });
    if (Object.values(borrador).some((v) => v)) mostrarAviso('💾 Recuperamos el borrador de tu mensaje');
  }
  actualizarContador();

  // Guarda el borrador mientras el usuario escribe y valida en tiempo real
  campos.forEach((campo) => {
    campo.addEventListener('input', () => {
      if (campo.classList.contains('is-invalid') || campo.classList.contains('is-valid')) validarCampo(campo);
      if (campo === mensaje) actualizarContador();
      const datos = {};
      campos.forEach((c) => { datos[c.name] = c.value; });
      almacen.guardar(CONFIG.claveBorrador, datos);
    });
    campo.addEventListener('blur', () => { if (campo.value) validarCampo(campo); });
  });

  // Los enlaces "Solicitar consulta" de las cards rellenan el mensaje
  $$('.enlace-servicio').forEach((enlace) => {
    enlace.addEventListener('click', () => {
      const servicio = enlace.dataset.servicio;
      if (!mensaje.value.trim()) {
        mensaje.value = `Hola, me interesa el servicio de ${servicio} para mi mascota. 🐾`;
        actualizarContador();
      }
      Analitica.registrar('interes_servicio', { servicio });
      setTimeout(() => $('#nombre').focus({ preventScroll: true }), 700);
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const resultados = campos.map(validarCampo);
    if (resultados.includes(false)) {
      form.classList.remove('sacudir');
      void form.offsetWidth; // reinicia la animación
      form.classList.add('sacudir');
      campos[resultados.indexOf(false)].focus();
      Analitica.registrar('formulario_error');
      return;
    }

    const datos = {
      nombre: $('#nombre').value.trim(),
      email: $('#email').value.trim(),
      mensaje: mensaje.value.trim()
    };

    const textoOriginal = botonEnviar.innerHTML;
    botonEnviar.disabled = true;
    botonEnviar.innerHTML = '<span class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span> Abriendo tu correo...';

    try {
      const detectada = await abrirCorreo(datos);
      Analitica.registrar('formulario_enviado', { app_correo_detectada: detectada });
      mostrarModalConfirmacion(datos, detectada);

      form.reset();
      campos.forEach((c) => {
        c.classList.remove('is-valid', 'is-invalid');
        c.removeAttribute('aria-invalid');
      });
      actualizarContador();
      almacen.borrar(CONFIG.claveBorrador);
    } catch (error) {
      mostrarAviso('⚠️ No pudimos abrir tu correo. Escríbenos por WhatsApp.');
      Analitica.registrar('error_envio', { mensaje: String(error) });
    } finally {
      botonEnviar.disabled = false;
      botonEnviar.innerHTML = textoOriginal;
    }
  });
}

/* ==========================================================================
   10. INICIALIZACIÓN
   ========================================================================== */
function iniciar() {
  $('#anioActual').textContent = new Date().getFullYear();

  Analitica.medirRendimiento();
  Analitica.registrar('vista_pagina', { pagina: location.pathname });

  iniciarRespaldoImagenes();
  iniciarTema();
  const menu = iniciarMenu();
  iniciarScroll(menu);
  iniciarRevelado();
  iniciarContadores();
  iniciarCarrusel();
  iniciarFormulario();
  iniciarSeguimientoClics();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', iniciar);
} else {
  iniciar();
}
