# 🐾 PROYECTO 2: PÁGINA WEB PARA UNA CLÍNICA VETERINARIA
### Tutorial desde cero: desarrollo web, diseño web y maquetado con IA

> Proyecto: **Clínica Veterinaria Patitas Felices**
> Archivos: `index.html`, `style.css`, `script.js`
> Herramientas: Visual Studio Code, Live Server, GitHub, GitHub Pages y Vercel

---

## 📑 ÍNDICE

1. Tutorial desde cero sobre desarrollo web
2. Las tecnologías fundamentales en orden histórico
3. Cómo las usamos en este proyecto (resumen paso a paso)
4. Guía documentada del código, sección por sección
5. Cómo trabajar el proyecto en Visual Studio Code y Live Server
6. Publicación en GitHub y GitHub Pages (sin comandos, arrastrando y soltando)
7. Publicación en Vercel enlazado con GitHub
8. Cómo visualizar y compartir el proyecto
9. Métrica de tiempo por perfil de desarrollador (tabla para Excel)
10. Conclusión (modelo para personalizar)
11. Bibliografía y recursos
12. Lista de verificación para entregar el PDF

---

## 1. 📘 TUTORIAL DESDE CERO SOBRE DESARROLLO WEB

### 1.1 ¿Qué es la programación web?

La **programación web** es el proceso de escribir instrucciones (código) que un navegador como Chrome, Edge o Firefox puede leer para mostrar páginas y aplicaciones en Internet.

Cuando escribes una dirección (por ejemplo `https://google.com`) ocurre lo siguiente:

1. Tu navegador (**cliente**) pide la página a un computador remoto (**servidor**).
2. El servidor responde enviando archivos: HTML, CSS, JavaScript, imágenes.
3. El navegador **interpreta** esos archivos y dibuja la página en tu pantalla.

### 1.2 Las tres áreas del desarrollo web

| Área | ¿Qué hace? | Ejemplos |
|------|-----------|----------|
| **Frontend** (lado del cliente) | Lo que el usuario ve y toca | HTML, CSS, JavaScript, Bootstrap |
| **Backend** (lado del servidor) | Datos, lógica, seguridad, bases de datos | Node.js, PHP, Python, Java |
| **Full Stack** | Ambas partes | Un desarrollador que domina frontend y backend |

👉 **Este proyecto es 100 % Frontend**: no necesita servidor propio ni base de datos.

### 1.3 Diseño web vs. maquetado web vs. desarrollo web

- **Diseño web:** decidir cómo se verá la página: colores, tipografía, distribución, experiencia de usuario (UX) e interfaz (UI).
- **Maquetado web:** convertir ese diseño en código HTML + CSS, colocando cada elemento en su lugar.
- **Desarrollo web:** agregar comportamiento e interactividad (JavaScript), validar datos, conectar servicios y publicar el sitio.

### 1.4 Conceptos clave que debes conocer

| Concepto | Significado sencillo |
|----------|---------------------|
| **Responsive** | La página se adapta al tamaño de la pantalla (móvil, tablet, PC). |
| **CDN** | Red de servidores que entrega librerías (Bootstrap, Font Awesome) rápidamente desde el lugar más cercano al usuario. |
| **SEO** | Optimización para que Google encuentre y posicione la página. |
| **SEM** | Marketing en buscadores (anuncios pagados). Un sitio rápido y bien etiquetado mejora la calidad de esos anuncios. |
| **A11y (accesibilidad)** | Que personas con discapacidad (visual, motriz) puedan usar el sitio. |
| **HTTPS** | Conexión cifrada y segura. GitHub Pages y Vercel la activan gratis. |
| **localStorage** | "Memoria" del navegador para guardar datos pequeños aunque se cierre la página. |
| **Service Worker** | Script que permite que una web funcione sin conexión (se menciona como mejora futura, ya que este proyecto exige solo 3 archivos). |

---

## 2. 🕰️ LAS TECNOLOGÍAS FUNDAMENTALES EN ORDEN HISTÓRICO

### 2.1 HTML — 1991 🧱 (la estructura)
**HyperText Markup Language**, creado por **Tim Berners-Lee** en el CERN. Es el "esqueleto" de toda página web: indica qué es un título, un párrafo, una imagen, un enlace o un formulario mediante **etiquetas** como `<h1>`, `<p>`, `<img>`, `<a>`.
La versión actual es **HTML5** (2014), que añadió etiquetas **semánticas** (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`) para que buscadores y lectores de pantalla entiendan mejor el contenido.

### 2.2 JavaScript — 1995 ⚡ (el comportamiento)
Creado por **Brendan Eich** en Netscape en solo 10 días. Es el único lenguaje de programación que los navegadores ejecutan de forma nativa. Permite reaccionar a clics, validar formularios, crear animaciones, carruseles y comunicarse con servidores.
Hoy se estandariza como **ECMAScript** (ES6 en 2015 trajo `let`, `const`, funciones flecha, clases, promesas).

### 2.3 CSS — 1996 🎨 (la presentación)
**Cascading Style Sheets**, propuesto por **Håkon Wium Lie**. Separa el diseño del contenido: colores, fuentes, tamaños, márgenes, animaciones y adaptación a pantallas.
CSS3 añadió **variables**, **Flexbox**, **Grid**, **degradados**, **transiciones**, **animaciones** y **media queries** (clave del diseño responsive).

### 2.4 Bootstrap — 2011 🧰 (el framework de diseño)
Creado por **Mark Otto y Jacob Thornton** en Twitter. Es una librería de CSS y JavaScript con componentes listos (menús, tarjetas, modales, carruseles) y un **sistema de rejilla de 12 columnas** que facilita el diseño responsive.
Usamos **Bootstrap 5.3.0**, que ya no depende de jQuery.

### 2.5 Font Awesome — 2012 ⭐ (los íconos)
Creado por **Dave Gandy**. Es una biblioteca de miles de **íconos vectoriales** que se insertan como texto con una etiqueta `<i>`. Se pueden cambiar de tamaño y color con CSS sin perder calidad.
Usamos **Font Awesome 6.0** (estilos `fa-solid`, `fa-regular` y `fa-brands`).

### 2.6 Línea de tiempo resumida

| Año | Tecnología | Rol | Analogía |
|-----|-----------|-----|----------|
| 1991 | HTML | Estructura | El esqueleto 🦴 |
| 1995 | JavaScript | Comportamiento | El cerebro y los músculos 🧠 |
| 1996 | CSS | Presentación | La piel y la ropa 👕 |
| 2011 | Bootstrap | Framework de diseño | Muebles prefabricados 🛋️ |
| 2012 | Font Awesome | Íconos | Los letreros y señales 🪧 |

---

## 3. 🛠️ CÓMO LAS USAMOS EN ESTE PROYECTO (RESUMEN PASO A PASO)

| Paso | Tecnología | Qué hicimos |
|------|-----------|-------------|
| 1 | **HTML** | Creamos la estructura: menú, inicio, servicios, equipo, testimonios, contacto y footer, con etiquetas semánticas. |
| 2 | **Bootstrap** | Usamos su rejilla (`row`, `col-md-6`, `col-lg-4`), el menú colapsable, las cards, el modal y el toast. |
| 3 | **Font Awesome** | Añadimos íconos a menú, servicios, equipo, testimonios, contacto y redes sociales. |
| 4 | **CSS** | Definimos variables con la paleta (#2C3E50, #18BC9C, #F39C12), sombras, efectos hover, bordes arcoíris, latido, modo oscuro y media queries. |
| 5 | **JavaScript** | Programamos la validación del formulario, el envío por correo con detección de la app, el modal, el carrusel de 4 cards, el modo oscuro y la analítica. |
| 6 | **GitHub / Vercel** | Publicamos el sitio en Internet con HTTPS gratuito. |

---

## 4. 📖 GUÍA DOCUMENTADA DEL CÓDIGO (SECCIÓN POR SECCIÓN)

> 💡 El código completo está en los tres archivos del proyecto. Aquí se explica cada bloque con fragmentos para que entiendas **qué hace** y **por qué**.

### Etapa 1 — Estructura base del HTML (`<head>`)

```html
<!DOCTYPE html>                 <!-- Indica al navegador que es HTML5 -->
<html lang="es-DO">             <!-- Idioma: español de Rep. Dominicana (SEO y lectores de pantalla) -->
<head>
  <meta charset="UTF-8">        <!-- Permite tildes, ñ y emojis -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0"> <!-- Imprescindible para móviles -->
  <title>Clínica Veterinaria Patitas Felices | Santo Domingo, RD</title>
  <meta name="description" content="...">   <!-- Texto que aparece en Google -->

  <!-- Bootstrap 5.3.0 desde su CDN oficial -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
  <!-- Font Awesome 6.0 desde su CDN oficial -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
  <!-- Nuestro CSS va DESPUÉS para poder sobrescribir a Bootstrap -->
  <link rel="stylesheet" href="style.css">
</head>
```

**Extras de SEO incluidos:** etiquetas Open Graph (cómo se ve el enlace al compartirlo por WhatsApp o Facebook), datos estructurados `VeterinaryCare` de Schema.org (Google entiende que es una veterinaria, su dirección y horario) y `preconnect` para acelerar la carga de los CDN.

### Etapa 2 — Menú fijo superior responsivo

```html
<nav class="navbar navbar-expand-lg fixed-top navbar-vet" id="menuPrincipal">
  <!-- fixed-top: queda fijo arriba al hacer scroll -->
  <!-- navbar-expand-lg: en pantallas grandes se ve completo; en móviles se convierte en hamburguesa -->
  <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#menuEnlaces">...</button>
  <div class="collapse navbar-collapse" id="menuEnlaces">
    <ul class="navbar-nav ms-auto">
      <li><a class="nav-link" href="#inicio">Inicio</a></li>   <!-- href="#id" lleva a la sección -->
      ...
    </ul>
  </div>
</nav>
```

- El **scroll suave** se logra con una sola línea de CSS: `html { scroll-behavior: smooth; }`.
- `scroll-padding-top` evita que el menú fijo tape los títulos.
- Con JavaScript, el menú se vuelve sólido al bajar y se resalta el enlace de la sección visible.

### Etapa 3 — Sección Inicio (banner al 100 % del ancho)

```html
<section id="inicio" class="hero">
  <img class="hero-imagen" src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee" alt="...">
  <div class="hero-capa"></div>     <!-- Capa oscura para que el texto se lea bien -->
  <h1>🐶 Cuidamos a tu mascota como familia 🐱❤️</h1>
  <p>Párrafo introductorio...</p>
  <a href="#contacto" class="btn btn-cta btn-lg">Agenda tu cita ahora</a>  <!-- Botón CTA grande -->
</section>
```

```css
.hero-imagen {
  position: absolute; inset: 0;     /* Ocupa todo el banner */
  width: 100%; height: 100%;
  object-fit: cover;                /* Rellena sin deformarse */
}
```

### Etapa 4 — Servicios (3 cards)

Cada card usa la rejilla de Bootstrap: `col-md-6 col-lg-4` = 2 columnas en tablet y 3 en PC.

```html
<article class="card card-servicio">
  <div class="card-servicio-img">
    <img src="...purina...jpg" alt="Consulta general">
    <span class="card-servicio-icono"><i class="fa-solid fa-stethoscope"></i></span>  <!-- Ícono Font Awesome -->
  </div>
  <div class="card-body">
    <h3 class="card-title">Consulta General</h3>   <!-- Título -->
    <p class="card-text">Descripción breve...</p>   <!-- Descripción -->
  </div>
</article>
```

```css
.card-servicio:hover { transform: translateY(-12px); box-shadow: var(--sombra-lg); } /* Efecto hover */
.card-servicio:hover img { transform: scale(1.12); }                                  /* Zoom de imagen */
```

### Etapa 5 — Equipo (3 veterinarios con foto circular)

```css
.perfil-foto img {
  border-radius: 50%;   /* Convierte la foto cuadrada en un círculo */
  object-fit: cover;
}
```

### Etapa 6 — "Lo que dicen nuestros clientes" (carrusel 4 por vista)

**Estructura:** los botones están **fuera** del grupo de cards gracias a una rejilla de 3 columnas:

```css
.carrusel {
  display: grid;
  grid-template-columns: auto 1fr auto;  /* [botón] [cards] [botón] → nunca se solapan */
  --por-vista: 4;                        /* 4 cards por vista en PC */
}
.carrusel-item { flex: 0 0 calc(100% / var(--por-vista)); }
@media (max-width: 991.98px) { .carrusel { --por-vista: 2; } }  /* tablet */
@media (max-width: 575.98px) { .carrusel { --por-vista: 1; } }  /* móvil */
```

**Borde arcoíris animado:** un degradado cónico que gira detrás de la card; cada card arranca con otro color (`hue-rotate`).

```css
@property --angulo { syntax: "<angle>"; inherits: false; initial-value: 0deg; }
.testimonio::before {
  background: conic-gradient(from var(--angulo), #FF004C, #FF8A00, #FFE600, #2BFF88, #00D4FF, #6A5BFF, #FF00C8, #FF004C);
  animation: girarBorde 4s linear infinite;
}
@keyframes girarBorde { to { --angulo: 360deg; } }
```

**Latido del corazón en la foto:**

```css
@keyframes latido {
  0%, 100% { transform: scale(1); }
  14%  { transform: scale(1.12); }   /* primer "pum" */
  28%  { transform: scale(1); }
  42%  { transform: scale(1.12); }   /* segundo "pum" */
}
.testimonio-foto { border-radius: 50%; animation: latido 1.6s infinite; }
```

**JavaScript del carrusel:** mueve la "pista" con `translateX`, crea los puntos indicadores, avanza solo cada 5 s, se pausa con el ratón, funciona con flechas del teclado y deslizando el dedo.

```js
pista.style.transform = `translateX(-${(indice * 100) / vista}%)`;
```

### Etapa 7 — Contacto

- **Teléfono grande dominicano:** `<a href="tel:+18095550123">(809) 555-0123</a>` → al tocarlo en el celular, marca.
- **WhatsApp:** `https://wa.me/18095550123?text=...` → abre el chat con un mensaje escrito.
- **Animación hover:** la tarjeta sube, gira levemente y el ícono del teléfono "timbra".

**Validación del formulario (JavaScript):**

```js
const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;   // texto@texto.dominio
const reglas = {
  nombre:  (v) => v.trim().length >= 3,
  email:   (v) => REGEX_EMAIL.test(v.trim()),
  mensaje: (v) => v.trim().length >= 10
};
```

**Envío por correo y detección de la app:**

```js
// 1. Se construye un enlace mailto: con asunto y cuerpo
const mailto = `mailto:citas@patitasfelices.com.do?subject=...&body=...`;
// 2. Se escucha si la ventana pierde el foco (señal de que se abrió Outlook, Gmail, Correo...)
window.addEventListener('blur', () => detectada = true);
// 3. Tras 1.5 s se muestra el modal con emojis indicando si se detectó la app o no
bootstrap.Modal.getOrCreateInstance(modal).show();
```

**Persistencia:** mientras escribes, el borrador se guarda en `localStorage`; si cierras la página y vuelves, el mensaje sigue ahí.

### Etapa 8 — Footer
5 íconos sociales (`fa-facebook-f`, `fa-instagram`, `fa-twitter`, `fa-linkedin-in`, `fa-youtube`) con el color oficial de cada red al pasar el ratón, dirección dentro de `<address>` y tabla de horarios.

### Etapa 9 — Estilos personalizados con variables CSS

```css
:root {
  --color-primario:   #2C3E50;
  --color-secundario: #18BC9C;
  --color-acento:     #F39C12;
  --fuente: Arial, Helvetica, sans-serif;
}
[data-theme="dark"] { --fondo: #121A22; --superficie: #1E2A36; --texto: #ECF0F1; }
```
Al cambiar el valor de una variable, cambia en **todo** el sitio. Así se implementó el **modo oscuro** 🌙 con un solo botón.

### Etapa 10 — Buenas prácticas aplicadas

| Práctica | Cómo se aplicó |
|----------|---------------|
| **UI/UX** | Jerarquía tipográfica clara, botones grandes, CTA visible, feedback inmediato en el formulario |
| **Responsive / adaptativo** | Rejilla Bootstrap + media queries a 1200, 992, 768 y 576 px |
| **Memoria del navegador** | `localStorage` guarda el tema elegido y el borrador del formulario |
| **SEO** | Título y descripción, `lang`, encabezados en orden (h1→h2→h3), `alt` en imágenes, Open Graph, Schema.org |
| **Rendimiento** | `preconnect`, `loading="lazy"` en imágenes, scripts con `defer`, `requestAnimationFrame` en el scroll |
| **Accesibilidad (A11y)** | Enlace "Saltar al contenido", `aria-label`, foco visible, `prefers-reduced-motion`, contraste |
| **Seguridad** | HTTPS al publicar, `rel="noopener noreferrer"`, `integrity` (SRI) en Bootstrap, texto escapado antes de insertarlo en el modal |
| **Manejo de errores** | Imagen de respaldo 🐾 si una foto no carga, `try/catch`, registro de errores |
| **Analítica** | Eventos en `window.dataLayer` (compatible con Google Tag Manager/GA4), métricas LCP/CLS; escribe `PatitasAnalitica.resumen()` en la consola |

---

## 5. 💻 CÓMO TRABAJAR EL PROYECTO EN VISUAL STUDIO CODE

### 5.1 Instalar Visual Studio Code
1. Entra a **https://code.visualstudio.com**
2. Pulsa **Download for Windows** (o tu sistema).
3. Ejecuta el instalador → acepta la licencia → marca **"Agregar a PATH"** y **"Abrir con Code"** → **Instalar**.

### 5.2 Crear la carpeta del proyecto
1. En el **Escritorio**, clic derecho → **Nuevo → Carpeta**.
2. Nómbrala: `clinica-veterinaria-patitas-felices` (sin espacios ni tildes; los servidores lo agradecen).
3. Abre VS Code → **File (Archivo) → Open Folder (Abrir carpeta)** → selecciona la carpeta → **Seleccionar carpeta**.
4. Si pregunta "¿Confía en los autores?", elige **Sí, confío**.

### 5.3 Crear los 3 archivos independientes
1. En el panel izquierdo (Explorador), pasa el ratón sobre el nombre de la carpeta y pulsa el ícono **📄+ (New File)**.
2. Escribe `index.html` y pulsa Enter. Repite para `style.css` y `script.js`.
3. Copia el código de cada archivo y pégalo en el correspondiente.
4. Guarda con **Ctrl + S** (o activa **File → Auto Save**).

```
clinica-veterinaria-patitas-felices/
├── index.html
├── style.css
└── script.js
```

> ⚠️ Los nombres deben ser **exactos** y en minúsculas: el HTML enlaza `style.css` y `script.js` por su nombre.

### 5.4 Ver la página en el navegador

**Opción A (sencilla):** abre la carpeta en el Explorador de Windows y haz doble clic en `index.html`.

**Opción B (recomendada): Live Server** — recarga la página automáticamente cada vez que guardas.

1. En VS Code pulsa el ícono de **Extensiones** (cuatro cuadritos) o **Ctrl + Shift + X**.
2. Busca **Live Server** (autor: **Ritwick Dey**).
3. Pulsa **Install**.
4. Abre `index.html` y:
   - clic derecho en el código → **Open with Live Server**, o
   - pulsa **Go Live** en la barra inferior derecha.
5. Se abrirá el navegador en `http://127.0.0.1:5500/index.html`.
6. Para detenerlo, pulsa de nuevo en la barra inferior (donde dice **Port: 5500**).

**Extensiones opcionales útiles:** *Prettier* (ordena el código), *Auto Rename Tag* (renombra etiquetas en pareja), *Spanish Language Pack* (VS Code en español).

### 5.5 Probar la versión móvil
En el navegador pulsa **F12** → ícono de celular/tablet (**Ctrl + Shift + M**) → elige un dispositivo (iPhone, Galaxy) y revisa que todo se adapte.

---

## 6. 🐙 PUBLICACIÓN EN GITHUB Y GITHUB PAGES (SIN COMANDOS)

### 6.1 Crear la cuenta en GitHub
1. Entra a **https://github.com** → **Sign up**.
2. Escribe tu **correo**, crea una **contraseña** y elige un **nombre de usuario** (aparecerá en tu URL pública, elige uno profesional, ej. `ana-perez-dev`).
3. Resuelve la verificación ("no soy un robot").
4. Escribe el **código de 8 dígitos** que llegará a tu correo.
5. Elige el plan **Free** y completa (u omite) el cuestionario.

### 6.2 Crear el repositorio
1. Arriba a la derecha pulsa **+ → New repository**.
2. **Repository name:** `Patitas-Felices`
3. **Description:** "Página web de clínica veterinaria con HTML, CSS, Bootstrap y JavaScript".
4. Marca **Public** (obligatorio para GitHub Pages con cuenta gratuita).
5. Puedes marcar **Add a README file** (opcional).
6. Pulsa **Create repository**.

### 6.3 Subir los archivos arrastrando y soltando
1. Dentro del repositorio, pulsa **Add file → Upload files** (o el enlace "uploading an existing file").
2. Abre la carpeta del proyecto en el Explorador de Windows.
3. Selecciona `index.html`, `style.css`, `script.js` (y `README.md`) y **arrástralos** al recuadro de GitHub.
   > ⚠️ Arrastra **los archivos**, no la carpeta: `index.html` debe quedar en la **raíz** del repositorio.
4. Abajo, en **Commit changes**, escribe un mensaje: `Primera versión de la página veterinaria`.
5. Pulsa **Commit changes**. Ya verás tus archivos listados.

### 6.4 Activar GitHub Pages
1. En el repositorio pulsa **Settings** (⚙️ Configuración).
2. En el menú izquierdo, pulsa **Pages**.
3. En **Build and deployment → Source** elige **Deploy from a branch**.
4. En **Branch** selecciona **main** y carpeta **/ (root)** → **Save**.
5. Espera 1–3 minutos y recarga. Aparecerá: **"Your site is live at…"**
6. Tu URL será: `https://sohanygalan.github.io/Patitas-Felices/`
7. Pulsa **Visit site** para verla. 🎉

### 6.5 Actualizar el sitio
Si cambias un archivo, vuelve a **Add file → Upload files**, arrastra la nueva versión (reemplaza la anterior) y pulsa **Commit changes**. GitHub Pages se actualiza solo en 1–2 minutos.

---

## 7. ▲ PUBLICACIÓN EN VERCEL ENLAZADO CON GITHUB

### 7.1 Crear la cuenta y vincularla con GitHub
1. Entra a **https://vercel.com** → **Sign Up**.
2. Elige el plan **Hobby** (gratis, uso personal) y escribe tu nombre.
3. Pulsa **Continue with GitHub** → **Authorize Vercel**. Así la cuenta queda vinculada a GitHub desde el inicio.

### 7.2 Importar el proyecto
1. En el panel (Dashboard) pulsa **Add New… → Project**.
2. En **Import Git Repository**, si no aparece tu repositorio, pulsa **Install / Adjust GitHub App Permissions** → elige **All repositories** o **Only select repositories** → selecciona `Patitas-Felices` → **Install**.
3. Junto al repositorio pulsa **Import**.
4. Configuración:
   - **Project Name:** `patitas-felices`
   - **Framework Preset:** **Other** (es HTML puro, no requiere compilación).
   - **Root Directory:** `./`
   - No cambies Build/Output.
5. Pulsa **Deploy** y espera ~30 segundos. Verás confeti 🎊 y la vista previa.
6. Pulsa **Continue to Dashboard** → **Visit**. Tu URL será similar a: `https://patitas-felices.vercel.app`

### 7.3 Público o privado
- **Repositorio privado en GitHub:** Vercel puede desplegarlo igualmente (el código queda oculto, pero la web es pública).
- **Sitio público:** es la opción por defecto; cualquiera con el enlace puede verlo.
- **Restringir el acceso:** en el proyecto ve a **Settings → Deployment Protection** y activa **Vercel Authentication** (solo las personas con sesión en tu equipo de Vercel ven los despliegues protegidos). En el plan gratuito protege las vistas previas; proteger también el dominio de producción o usar contraseña requiere un plan de pago.
- ⚠️ **Para la entrega universitaria deja el sitio público**, para que el profesor pueda abrir los enlaces.

### 7.4 Actualizaciones automáticas
Cada vez que subas un cambio a GitHub (Upload files → Commit), Vercel **lo publica automáticamente** en menos de un minuto.

---

## 8. 🌐 CÓMO VISUALIZAR Y COMPARTIR EL PROYECTO

| Enlace | Formato | Para qué sirve |
|--------|---------|----------------|
| Repositorio GitHub | `https://github.com/SohanyGalan/Patitas-Felices` | Ver el código fuente |
| GitHub Pages | `https://sohanygalan.github.io/Patitas-Felices/` | Ver la página publicada |
| Vercel | `https://patitas-felices.vercel.app` | Ver la página publicada (CDN global) |

**Compartir:** copia el enlace y pégalo en WhatsApp, correo o el documento PDF. Gracias a las etiquetas Open Graph, en WhatsApp y Facebook aparecerá una vista previa con imagen y título.
**Verificar:** abre cada enlace en una ventana de incógnito (**Ctrl + Shift + N**) y desde tu celular para confirmar que funcionan para cualquier persona.

---

## 9. 📊 MÉTRICA DE TIEMPO POR PERFIL DE DESARROLLADOR

**Supuestos:** proyecto completo = análisis, diseño, maquetado HTML, CSS personalizado responsive, JavaScript (validación, carrusel, modal, persistencia), SEO/A11y/rendimiento, pruebas en navegadores y dispositivos, despliegue en GitHub Pages + Vercel y documentación/tutorial. En **empresa** se suman reuniones y revisiones de código; como **freelancer** se suman comunicación con el cliente y la ausencia de un equipo de apoyo. "Con IA" = usando asistentes como Gemini, ChatGPT o Claude para generar y depurar código. Tarifas de referencia en USD para el mercado latinoamericano.

> 📋 Copia la tabla de abajo (o abre `METRICAS-TIEMPO.tsv`) y pégala en Excel: cada columna caerá en su celda.

| Perfil | Modalidad | Requisitos y planificación (h) | Diseño UI/UX (h) | HTML semántico (h) | CSS personalizado y responsive (h) | JavaScript: validación, carrusel, modal (h) | SEO, A11y y rendimiento (h) | Pruebas multi-navegador y móvil (h) | Despliegue GitHub + Vercel (h) | Documentación y tutorial (h) | TOTAL sin IA (h) | Días laborales sin IA (8 h) | TOTAL con IA (h) | Ahorro con IA (%) | Tarifa ref. (USD/h) | Costo sin IA (USD) | Costo con IA (USD) |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Aprendiz | Empresa | 3 | 5 | 6 | 10 | 12 | 5 | 4 | 3 | 6 | 54 | 6.8 | 14 | 74% | 5 | 270 | 70 |
| Aprendiz | Freelancer | 4 | 6 | 6 | 11 | 13 | 5 | 4 | 3 | 6 | 58 | 7.3 | 16 | 72% | 8 | 464 | 128 |
| Junior | Empresa | 2 | 3 | 3 | 6 | 6 | 3 | 2 | 1.5 | 3 | 29.5 | 3.7 | 9 | 69% | 12 | 354 | 108 |
| Junior | Freelancer | 2.5 | 3.5 | 3 | 6 | 6 | 3 | 2.5 | 1.5 | 3 | 31 | 3.9 | 10 | 68% | 15 | 465 | 150 |
| Senior | Empresa | 1 | 2 | 1.5 | 3 | 3 | 2 | 1.5 | 0.5 | 2 | 16.5 | 2.1 | 6 | 64% | 30 | 495 | 180 |
| Senior | Freelancer | 1.5 | 2 | 1.5 | 3 | 3 | 2 | 1.5 | 0.5 | 2 | 17 | 2.1 | 6.5 | 62% | 40 | 680 | 260 |
| Experto Full Stack | Empresa | 0.5 | 1.5 | 1 | 2 | 2 | 1.5 | 1 | 0.5 | 1.5 | 11.5 | 1.4 | 4.5 | 61% | 50 | 575 | 225 |
| Experto Full Stack | Freelancer | 1 | 1.5 | 1 | 2 | 2 | 1.5 | 1 | 0.5 | 1.5 | 12 | 1.5 | 5 | 58% | 65 | 780 | 325 |

**Lectura de la tabla:**
- Sin IA, solo el **Senior** y el **Experto** completan el reto en menos de **5 horas**… y ni siquiera ellos si incluimos documentación y pruebas (16.5 h y 11.5 h).
- **Con IA**, un **Junior** baja a ~9 h y un **Aprendiz** a ~14 h: la IA reduce entre **58 % y 74 %** el tiempo.
- El mayor ahorro es para quien menos experiencia tiene: la IA **acorta la distancia** entre aprender y producir.
- La IA no elimina el tiempo de pruebas, despliegue ni la comprensión del código: ahí sigue siendo clave el criterio humano.

---

## 10. 💭 CONCLUSIÓN (MODELO PARA PERSONALIZAR)

> ✏️ La conclusión debe ser **tuya**: usa este texto como guía y reemplázalo con tu experiencia real.

Desarrollar la página web de la Clínica Veterinaria Patitas Felices fue una experiencia que cambió mi forma de ver la tecnología. Al principio, palabras como HTML, CSS, Bootstrap o JavaScript me parecían lejanas, propias de programadores con años de experiencia. Sin embargo, con la ayuda de la inteligencia artificial y una buena ingeniería de prompts, pude construir un sitio completo, responsive y publicado en Internet en pocas horas.

Lo más valioso no fue solo obtener el código, sino **entenderlo**: saber por qué una variable CSS cambia todo el diseño, cómo una media query adapta la página al celular, cómo JavaScript valida un correo o cómo GitHub y Vercel ponen mi trabajo al alcance de cualquier persona con un enlace. Comprendí que la IA no reemplaza al desarrollador: es un copiloto que acelera el trabajo, pero quien decide, revisa, corrige y aprende sigue siendo la persona.

A partir de hoy usaré estos conocimientos para crear mi portafolio, ofrecer páginas web a pequeños negocios de mi comunidad y seguir formándome en desarrollo web. Este proyecto me demostró que en la era digital **la capacidad de aprender cualquier cosa está al alcance de quien tenga curiosidad, disciplina y las herramientas adecuadas**. Aprender nuevas habilidades ya no depende solo de dónde estudiamos, sino de nuestra disposición para preguntar, experimentar y equivocarnos hasta lograrlo.

---

## 11. 📚 BIBLIOGRAFÍA Y RECURSOS

- Inteligencia artificial utilizada: *(indica cuáles usaste: Claude, Gemini, AI Studio, ChatGPT, Grok, Copilot, DeepSeek, etc.)*
- MDN Web Docs — HTML, CSS y JavaScript: https://developer.mozilla.org/es/
- Bootstrap 5.3 — Documentación oficial: https://getbootstrap.com/docs/5.3/
- Font Awesome 6 — Íconos: https://fontawesome.com/v6/icons
- W3C — Estándares web y accesibilidad (WCAG): https://www.w3.org/WAI/
- Schema.org — VeterinaryCare: https://schema.org/VeterinaryCare
- Visual Studio Code: https://code.visualstudio.com/docs
- Live Server (Ritwick Dey): https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer
- GitHub Pages — Documentación: https://docs.github.com/es/pages
- Vercel — Documentación: https://vercel.com/docs
- Imágenes: Unsplash, Purina, HolaVet, Neozoo y RandomUser.me

---

## 12. ✅ LISTA DE VERIFICACIÓN PARA ENTREGAR EL PDF

**Nombre del archivo:** `NOMBRE_APELLIDO_MATRÍCULA_DOCUMENTACIÓN_PROYECTO_2.pdf`

- [ ] **Portada:** universidad, materia, título del proyecto, estudiante, profesor, fecha.
- [ ] **Introducción:** descripción, objetivos e importancia del proyecto.
- [ ] **Desarrollo:** este tutorial paso a paso con formato y colores.
- [ ] **Capturas:** VS Code con `index.html`, `style.css` y `script.js`; la página en PC y móvil; repositorio en GitHub; pantalla de GitHub Pages; despliegue en Vercel.
- [ ] **Código fuente** completo de HTML, CSS y JS.
- [ ] **Enlaces públicos funcionando:** repositorio GitHub, URL de GitHub Pages y URL de Vercel.
- [ ] **Tabla de métricas** de tiempo.
- [ ] **Conclusión personal.**
- [ ] **Bibliografía** indicando qué IA utilizaste.
- [ ] Exportar desde Word: **Archivo → Exportar → Crear PDF/XPS → Publicar**.
