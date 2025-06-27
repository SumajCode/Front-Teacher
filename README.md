# Front Docente

```bash
  https://front-teacher.vercel.app/ # copiar
```

Una aplicación web construida con Next. **TypeScript**, que muestra la gestión y visualización de cursos.

## 🔧 Clonar el repositorio

1. Haz clic en **Code** y copia la URL:

   ```bash
   https://github.com/SumajCode/Front-Teacher.git # copiar
   ```

2. En tu terminal ejecuta:
   ```bash
   git clone https://github.com/SumajCode/Front-Teacher.git  # copiar
   ```

---

## 🏗️ Instalación y arranque

1. Entra al directorio del proyecto:
   ```bash
   cd front-docente  # copiar
   ```
2. Instala las dependencias:
   ```bash
   npm install  # copiar
   ```
3. Arranca el servidor de desarrollo:
   ```bash
   npm run dev  # copiar
   ```
4. Abre tu navegador en http://localhost:3000

---

## 📂 Estructura del proyecto Screaming

```
front-docente/
├─ public/           # Archivos estáticos (imagenes, favicon)
├─ src/
│  ├─ app/           # Rutas de Next.js (App Router)
│  │  ├─ layout.tsx  # Layout global
   │  ├─ page.tsx    # Página principal
   │  └─ courses/    # Sub-rutas de cursos
│  ├─ components/   # Componentes reutilizables
│  │  └─ ui/        # Biblioteca de UI (botones, tarjetas, etc.)
│  ├─ hooks/        # Hooks personalizados (por ejemplo, use-mobile)
│  ├─ modules/      # Lógica y componentes por dominio (cursos)
|  |  └─ coruse/    # componentes , util , hook , etc
│  └─ lib/          # Utilidades globales
├─ next.config.ts    # Configuración de Next.js
├─ tsconfig.json     # Configuración de TypeScript
└─ package.json      # Scripts y dependencias
```

---

## 🚀 Globales

- **App Router**: Se basa en la carpeta `src/app`. Cada carpeta anidada define una ruta.
- **Componentes globales**: En `src/components/ui` encontrarás controles estilizados reutilizables.
- **Estilos globales**: En `src/app/globals.css` y `postcss.config.mjs`.

---

## 📖 Guía de desarrollo

1. Añadir nuevas rutas: crea carpetas y archivos `.tsx` en `src/app`.
2. Crear componentes : úsalos en `src/components` y agrégalos a la UI.
3. Escribir hooks/funciones: en `src/hooks` o `src/lib` según su alcance.
4. Gestionar datos: define archivos de datos en `src/modules/*`.

---

---

## ⚙️ GitHub Actions - CI

En `.github/workflows/ci.yml` se define un flujo de trabajo de Integración Continua:

- **Ramas afectadas**: `main`, `dev`.
- **Eventos**:

  - `push` a `main` o `dev`.
  - `pull_request` hacia `main` o `dev`.

- **Job `build`** (runs-on: `ubuntu-latest`):
  1. Usa `actions/checkout@v4`: Clona el repositorio.
  2. Usa `actions/setup-node@v4` con `node-version: 20.x`: Configura Node.js.
  3. `npm install`: Instala dependencias.
  4. `npx next lint --max-warnings=0`: Ejecuta linter y falla si hay advertencias.
  5. `npm run build`: Compila el proyecto.
  6. `npm test`: Ejecuta los tests.
  7. `npx prettier --check .`: Verifica el formato.
  8. `npm audit --audit-level=high`: Audita dependencias y falla en vulnerabilidades críticas o altas.
