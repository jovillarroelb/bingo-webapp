# 🎉 ¡Bingo Familiar! — Ruleta 3D, Bombo y Cartones Imprimibles

Una aplicación web moderna, interactiva y festiva diseñada para jugar al Bingo tradicional en familia, con apoderados, cursos escolares o grupos de amigos. Incluye un bombo 3D interactivo con física de esferas, generación de cartones en PDF listos para imprimir, verificación instantánea con fuegos artificiales, tablero maestro y marcador (*scoreboard*) por sesión.

---

## 🚀 Tecnologías Utilizadas

Esta aplicación **NO** es HTML/CSS básico ni usa Vue. Es una **Single Page Application (SPA) moderna basada en React, TypeScript y Vite**:

| Tecnología | Versión / Detalle | Propósito en la Aplicación |
| :--- | :--- | :--- |
| **React** | `v19` | Biblioteca principal de interfaces reactivas, estado de componentes y modales interactivos. |
| **TypeScript** | `v5.8` | Tipado estático estricto para garantizar fiabilidad y prevenir errores en tiempo de ejecución. |
| **Vite** | `v6.2` | Bundler y servidor de desarrollo ultra-rápido de última generación. |
| **Tailwind CSS** | `v4` | Framework de diseño utilitario para estilos modernos, diseño responsivo y reglas de impresión (`@media print`). |
| **Three.js** | `v0.186` | Renderizado 3D acelerado por WebGL para el bombo giratorio, iluminación y bolitas con textura física. |
| **jsPDF** | `v4.2` | Motor de generación vectorial directa de documentos PDF con cartones formateados para corte con tijera. |
| **Canvas-Confetti** | `v1.9` | Efectos visuales de fiesta, explosión de confeti y fuegos artificiales al verificar un Bingo ganador. |
| **Lucide React** | `v0.546` | Iconografía vectorizada nítida y accesible. |
| **Web Audio API** | Nativa | Efectos de sonido sintetizados en el navegador (giro de bombo, extracción de bola, clic y fanfarria triunfal). |
| **LocalStorage / State** | Nativa | Persistencia de participantes y configuración de cartones; reseteo limpio de marcador por sesión. |

---

## ✨ Características Principales

1. **Pantalla de Bienvenida (Landing Page)**: Acceso directo con un solo clic en *"Iniciar Sesión de Juego"*, sin necesidad de cuentas ni contraseñas.
2. **Ruleta 3D y Bombo Interactivo**:
   - Jaula metálica tridimensional en **Three.js** que gira de manera realista.
   - 75 bolitas numeradas del 1 al 75 organizadas por letra tradicional (**B - I - N - G - O**).
   - Atajo de teclado: **Barra Espaciadora** (`Espacio`) para girar y sacar bola.
3. **Botón ¡Cantar Bingo! y Verificación con Fiesta**:
   - Botón grande y visible para cantar Bingo al instante.
   - Atajo de teclado: Tecla **`Enter ↵`**.
   - Animación de victoria con fuegos artificiales y confeti.
4. **Modalidades de Juego**:
   - 🏆 **Cartón Lleno** (Full House)
   - ↔️ **Línea Horizontal** (Fila)
   - ↕️ **Línea Vertical** (Columna)
5. **Generador e Impresión de Cartones en PDF**:
   - Permite personalizar los nombres de los participantes (ideal para cursos o familias).
   - Generación de 1, 2 o 4 cartones por hoja tamaño carta/A4 con líneas guía de tijera (✂️).
   - Descarga directa en archivo `.pdf` o impresión nativa con `Ctrl + P`.
6. **Modo Digital**:
   - Para jugar directamente en tablets, notebooks o teléfonos marcando casillas en pantalla.
7. **Scoreboard por Sesión**:
   - Permite registrar el nombre del ganador tecleándolo directamente.
   - Muestra podio con trofeos (🥇, 🥈, 🥉) y estadísticas de bolas cantadas.
   - Cada nueva sesión comienza con un marcador limpio.
8. **Instrucciones Integradas**:
   - Guía completa paso a paso accesible en cualquier momento desde el botón *"Instrucciones"*.

---

## 📦 Instalación y Ejecución Local

### Prerrequisitos
- Tener instalado [Node.js](https://nodejs.org/) (versión 18 o superior).
- Un gestor de paquetes (`npm` viene incluido con Node).

### 1. Clonar el repositorio
```bash
git clone https://github.com/TU-USUARIO/bingo-familiar.git
cd bingo-familiar
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Iniciar el servidor de desarrollo
```bash
npm run dev
```
Abre tu navegador en la URL que indique la consola (normalmente `http://localhost:3000` o `http://localhost:5173`).

### 4. Compilar para producción
```bash
npm run build
```
Esto creará la carpeta `dist/` con todos los archivos estáticos listos y optimizados para publicación.

---

## 🌐 Cómo Publicar en GitHub Pages

El proyecto ya viene preconfigurado con `base: './'` en `vite.config.ts` y con un flujo automatizado de **GitHub Actions** en `.github/workflows/deploy.yml`.

### Método 1: Despliegue Automático con GitHub Actions (Recomendado)

1. Sube tu código a un repositorio en GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: primer commit de Bingo Familiar"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/bingo-familiar.git
   git push -u origin main
   ```
2. En tu repositorio de GitHub, dirígete a:
   - **Settings** → **Pages** (en el menú lateral izquierdo).
3. En la sección **Build and deployment**:
   - En **Source**, selecciona: **GitHub Actions**.
4. ¡Listo! Cada vez que hagas `git push` a la rama `main`, GitHub compilará el proyecto y lo publicará automáticamente en:
   `https://TU-USUARIO.github.io/bingo-familiar/`

---

### Método 2: Despliegue Manual con la rama `gh-pages`

Si prefieres compilar localmente y subir la carpeta `dist/`:

1. Instala el paquete de ayuda para despliegue:
   ```bash
   npm install -D gh-pages
   ```
2. Agrega estos scripts a tu `package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
3. Ejecuta:
   ```bash
   npm run deploy
   ```
4. En GitHub (**Settings** → **Pages**), asegúrate de que el **Source** sea `Deploy from a branch` y selecciona la rama `gh-pages`.

---

## 📁 Estructura del Proyecto

```text
├── .github/
│   └── workflows/
│       └── deploy.yml          # Flujo CI/CD para despliegue en GitHub Pages
├── index.html                  # Punto de entrada HTML (con fuentes, favicon y meta tags)
├── vite.config.ts              # Configuración de Vite y Tailwind CSS (base: './')
├── package.json                # Dependencias y scripts
├── src/
│   ├── main.tsx                # Entrada principal de React 19
│   ├── App.tsx                 # Componente raíz y control de sesión
│   ├── types.ts                # Definiciones de tipos TypeScript
│   ├── components/
│   │   ├── LandingPage.tsx     # Pantalla inicial de bienvenida
│   │   ├── BingoWheel.tsx      # Bombo con Three.js y controles
│   │   ├── ThreeWheel.tsx      # Canvas 3D de Three.js (jaula metálica y bolas)
│   │   ├── MasterBoard.tsx     # Tablero maestro de 75 números
│   │   ├── PrintableCards.tsx  # Generador de cartones y exportador PDF con jsPDF
│   │   ├── DigitalCards.tsx    # Cartones interactivos digitales en pantalla
│   │   ├── Scoreboard.tsx      # Marcador de victorias por sesión
│   │   ├── BingoClaimModal.tsx # Modal de verificación con confeti y registro
│   │   ├── InstructionsModal.tsx # Guía e instrucciones completas
│   │   └── Footer.tsx          # Pie de página con derechos y enlace a Smera
│   └── utils/
│       ├── audio.ts            # Síntesis Web Audio API (sonidos nativos)
│       ├── bingoData.ts        # Algoritmo de generación de números B-I-N-G-O (1-75)
│       ├── participants.ts     # Gestión de participantes y cartones
│       └── scoreboard.ts       # Gestión de puntuaciones por sesión
└── README.md
```

---

## 👨‍💻 Autor y Créditos

- Desarrollado con ❤️ por **[Smera](https://www.smera.cl)**.
- Sitio web oficial: [https://www.smera.cl](https://www.smera.cl)
- © Todos los derechos reservados.
