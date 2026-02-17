# Portfolio de Kevin Miranda

Un portafolio interactivo estilo **Desktop OS** con interfaz de usuario similar a un sistema operativo moderno. Construido con **React**, **Astro**, **Tailwind CSS** y **Framer Motion**.

## 🎨 Características

- **Interfaz tipo Desktop**: Ventanas arrastrables y redimensionables
- **Sistema de Apps**: Múltiples aplicaciones funcionales e interactivas
- **Tema Oscuro/Claro**: Toggle dinámico para cambiar entre modos
- **Tamagotchi Interactivo**: Mascota virtual con estados de ánimo dinámicos
- **Dock Navegable**: Barra de acceso rápido a aplicaciones
- **Wallpaper Animado**: Gradientes y efectos visuales dinámicos
- **Responsive Design**: Optimizado completamente para móvil y desktop
- **Efectos Glass y Grid**: Preferencias visuales ajustables en tiempo real
- **Proyectos con Carrusel**: Galerías de imágenes interactivas

## 🛠️ Tech Stack

| Categoría | Tecnología | Versión |
|-----------|-----------|---------|
| **Framework** | Astro | 5.16.6 |
| **UI Framework** | React | 19.2.3 |
| **Styling** | Tailwind CSS | 4.1.18 |
| **Animaciones** | Framer Motion | 12.24.7 |
| **State** | Zustand | 5.0.10 |
| **Icons** | Lucide React | 0.563.0 |

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo (localhost:4321)
npm run dev

# Build para producción
npm run build

# Vista previa de la build
npm run preview
```

## 📁 Estructura del Proyecto

```
portfolio/
├── src/
│   ├── components/
│   │   ├── apps/                    # Aplicaciones del sistema
│   │   │   ├── About.tsx            # Información personal
│   │   │   ├── Projects.tsx         # Galería de proyectos
│   │   │   ├── Skills.tsx           # Habilidades técnicas
│   │   │   ├── Experience.tsx       # Experiencia laboral
│   │   │   ├── Contact.tsx          # Formulario de contacto
│   │   │   ├── CV.tsx               # Descarga de CV
│   │   │   ├── Calculator.tsx       # Calculadora
│   │   │   ├── Notes.tsx            # App de notas
│   │   │   ├── Music.tsx            # Reproductor de música
│   │   │   ├── TerminalApp.tsx      # Simulador de terminal
│   │   │   ├── ImageViewer.tsx      # Visor de imágenes
│   │   │   ├── Preferences.tsx      # Configuración del sistema
│   │   │   └── Tamagotchi.tsx       # Mascota virtual
│   │   ├── desktop/
│   │   │   ├── Desktop.tsx          # Contenedor principal
│   │   │   ├── Window.tsx           # Gestor de ventanas
│   │   │   ├── Icon.tsx             # Iconos de app
│   │   │   └── Dock.tsx             # Barra de navegación
│   │   └── ... (otros componentes)
│   ├── pages/
│   │   └── index.astro              # Página principal
│   ├── layouts/
│   │   └── Layout.astro             # Layout HTML
│   ├── store/
│   │   └── desktopStore.ts          # Zustand store global
│   └── styles/
│       └── global.css               # Estilos globales
├── public/
│   ├── assets/
│   ├── icons/
│   └── img/                         # Imágenes de proyectos
├── package.json
├── astro.config.mjs
├── tailwind.config.js
└── vite.config.js
```

## 🎮 Aplicaciones Disponibles

### Desktop (Pantallas Grandes >1024px)
Todas las aplicaciones están disponibles como ventanas flotantes arrastrables:

| App | Descripción |
|-----|------------|
| **Sobre mí** | Información personal y profesional |
| **Proyectos** | Galería interactiva con carruseles de imágenes |
| **Skills** | Habilidades técnicas y competencias |
| **Experiencia** | Historial profesional |
| **Contacto** | Formulario de contacto funcional |
| **CV** | Descarga del curriculum vitae |
| **Preferencias** | Configuración del sistema (tema, efectos, grid) |
| **Calculadora** | Calculadora científica funcional |
| **Notas** | App de notas con almacenamiento |
| **Reproductor de Música** | Player de música integrado |
| **Terminal** | Simulador de terminal para comandos |
| **Visor de Imágenes** | Galería de imágenes ampliada |
| **Tamagotchi** | Mascota virtual interactiva |

### Móvil (<768px)
Las apps aparecen como una grilla 2x2 con acceso directo desde los iconos. El tamagotchi es una app más dentro del sistema.

## 🎮 Sistema Tamagotchi

Mascota virtual con inteligencia artificial simple:

### Estados de Ánimo
- 😊 **Feliz**: Energía y hambre balanceados
- 🤔 **Normal**: Estado neutro
- 😴 **Cansado**: Energía baja
- 😩 **Hambriento**: Hambre muy alta

### Mecánicas
- **Energía**: Disminuye con el tiempo, se recupera durmiendo
- **Hambre**: Aumenta con el tiempo, se reduce comiendo
- **Ánimo**: Aumenta con atención (mimarlo)
- **Decay**: Stats disminuyen automáticamente cada 12 segundos

### Interacciones
```
🤗 Mimar    → Aumenta ánimo (+30)
🍔 Comer    → Reduce hambre (-40), aumenta energía (+10)
😴 Dormir   → Aumenta energía (+50), reduce ánimo (-20)
```

## 🎨 Sistema de Personalización

Accede a **Preferencias** para configurar:

### Tema Visual
- Toggle Oscuro/Claro
- Efecto Glass (blur backdrop)
- Grid de fondo visible
- Glow dinámico en wallpaper

### Efectos de Animación
- Wallpaper con gradientes animados
- Transiciones suaves en ventanas
- Dragging y resizing fluidos

## 📱 Responsive Design

### Desktop (>1024px)
- Interfaz completa con todas las ventanas
- Grid de apps 3x4
- Dock horizontal inferior
- Wallpaper con efectos completos

### Tablet (768px-1024px)
- Layout optimizado
- Dock lateral
- Ventanas ajustadas al tamaño

### Móvil (<768px)
- Grid compacta 2x2
- Dock vertical lateral
- Tamagotchi como app accesible
- Interfaz táctil optimizada

## 🌟 Proyectos Destacados

### 1. Sistema Odontológico - UNAH
**Liderando el desarrollo de un sistema aprobado por el rector** para la gestión de expedientes de la facultad de Odontología.
- **Stack**: React, Node.js, PostgreSQL, Cloudinary
- **Status**: Próximo a implementarse en producción
- **Rol**: Full Stack Developer (Líder técnico)

### 2. E-commerce Gift Joy
E-commerce con catálogo dinámico, gestión de pedidos y checkout seguro.
- **Stack**: Next.js, Strapi CMS, Tailwind CSS
- **Demo**: [Visitar Gift Joy](https://giftjoy-frontend-strapi.vercel.app)
- **Rol**: Frontend Developer

### 3. Póker de Dados - Estilo Witcher
Juego multiplayer de póker de dados inspirado en The Witcher con Websockets en tiempo real.
- **Stack**: Next.js, Tailwind, Node.js, Socket.io
- **Demo**: [Jugar ahora](https://frontend-dicepoker.vercel.app)
- **GitHub**: [Ver código](https://github.com/akaValmi/backend_dicepoker)
- **Features**: Salas en vivo, chat, ranking, multiplayer

### 4. Pomorodio
Pomodoro moderno con integración de Spotify para música de concentración.
- **Stack**: Next.js, Spotify API, Tailwind CSS
- **Demo**: [Usarlo ahora](https://pomorodio.vercel.app)
- **GitHub**: [Ver código](https://github.com/akaValmi/pomorodio)
- **Features**: Temporizador, integración Spotify, estadísticas

## 🔧 Configuración Avanzada

### Agregar Nuevas Apps

1. **Crear componente en `src/components/apps/`**:
```tsx
// MiApp.tsx
export default function MiApp() {
  return <div>Mi contenido</div>
}
```

2. **Registrar en `desktopStore.ts`**:
```ts
type AppId = 'miapp' | ... // Agregar nuevo tipo

initialWindows: {
  miapp: {
    title: "Mi App",
    isOpen: false,
    isMinimized: false,
  }
}
```

3. **Importar en `Window.tsx`**:
```tsx
import MiApp from './apps/MiApp'

const apps: Record<AppId, () => JSX.Element> = {
  miapp: MiApp,
  ...
}
```

4. **Agregar ícono en `Icon.tsx`**:
```tsx
const icons: Record<AppId, IconType> = {
  miapp: SomeIcon,
  ...
}
```

5. **Agregar a `windowApps` en `Desktop.tsx`**:
```tsx
const windowApps = [
  'miapp',
  ...
]
```

## 🚀 Deployment

### Vercel (Recomendado)
```bash
npm install -g vercel
vercel
```

### GitHub Pages
Configura en `astro.config.mjs`:
```js
export default defineConfig({
  output: 'static',
  site: 'https://usuario.github.io/portfolio'
})
```

## 📊 Performance

- **Lighthouse Score**: Optimizado para mobile y desktop
- **Core Web Vitals**: Bueno (LCP <2.5s)
- **Tamaño del Bundle**: ~150KB (gzipped)
- **Renderizado**: React con SSR mediante Astro

## 🔗 Enlaces Importantes

- **Portfolio en vivo**: [portfolio-km-sandy.vercel.app](https://portfolio-km-sandy.vercel.app)
- **GitHub**: [@akaValmi](https://github.com/akaValmi)
- **LinkedIn**: [kevin-miranda-5ba759275](https://www.linkedin.com/in/kevin-miranda-5ba759275/)
- **Email**: kevin@ejemplo.com

## 📝 Comandos Útiles

```bash
# Desarrollo
npm run dev          # Inicia servidor local

# Build
npm run build        # Construir para producción
npm run preview      # Ver build localmente

# Análisis
npm run astro --help # Ver comandos disponibles
```

## 📄 Licencia

Este proyecto es de código abierto. Siéntete libre de usarlo como inspiración para tu propio portfolio.

## 🙏 Agradecimientos

- [Astro](https://astro.build) - Framework
- [Framer Motion](https://www.framer.com/motion/) - Animaciones
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [Lucide Icons](https://lucide.dev) - Iconografía

---

**Creado con ❤️ por Kevin Miranda**

