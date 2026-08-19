# 🔥 VERSIÓN EXPERIMENTAL - BRUTALISTA

Esta es una versión **completamente disruptiva** del marketplace de libros, diseñada con estética **brutalista experimental** y **máximo espectáculo visual**.

## 🎨 Características del Diseño

### Estilo Brutalista
- **Tipografía MASIVA**: Títulos de hasta 240px usando Bebas Neue y Space Grotesk
- **Contrastes brutales**: Negro, blanco, amarillo, rojo - sin grises intermedios
- **Bordes gruesos**: 8-16px en todos los elementos
- **Grid asimétrico**: Cada libro tiene tamaño diferente, rompiendo la uniformidad

### Animaciones Espectaculares
- ✨ **Scroll-triggered animations**: Cards aparecen con entrada dramática
- 🌀 **Parallax multi-capa**: Efecto de profundidad en scroll
- ⚡ **Glitch effects**: Efectos de distorsión al hacer hover
- 🎯 **3D tilt effect**: Las cards responden al movimiento del mouse
- 🔮 **Text scramble**: Títulos se "reescriben" al pasar el mouse
- 💫 **Magnetic cursor**: Botones se mueven sutilmente hacia el cursor

### Micro-interacciones
- Scroll progress bar animada
- Hover effects con rotación y elevación
- Formas geométricas que siguen el mouse
- Efectos de ruido (grain) en el fondo
- Glitch aleatorio cada 5-10 segundos

## 📁 Estructura de Archivos

```
experimental/
├── index-experimental.html          # Catálogo principal
├── tremenda-turra-experimental.html # Detalle del libro más reciente
├── tragedia-experimental.html       # Ejemplo de página de detalle
│
├── css/
│   ├── brutalist.css                # Estilos principales (17KB)
│   ├── animations-brutal.css        # Animaciones (10KB)
│   └── detail-brutal.css            # Estilos para páginas de detalle (11KB)
│
└── js/
    └── experimental.js              # JavaScript con todos los efectos (12KB)
```

## 🎯 Diferencias con la Versión Minimalista

| Aspecto | Minimalista | Experimental |
|---------|-------------|--------------|
| **Tipografía** | Inter + Lora (elegante) | Bebas Neue + Space Grotesk (agresiva) |
| **Colores** | Grises neutros | Negro/Blanco + Amarillo/Rojo |
| **Layout** | Grid uniforme | Grid asimétrico caótico |
| **Animaciones** | Suaves y sutiles | Dramáticas y espectaculares |
| **Filosofía** | Menos es más | Más es más |
| **Tamaño CSS** | 14KB | 38KB |
| **JavaScript** | 2KB (mínimo) | 12KB (máximo espectáculo) |

## 🚀 Características Técnicas

### Efectos Implementados
1. **Scroll Progress Bar** - Barra roja en la parte superior
2. **Intersection Observer** - Animaciones al entrar en viewport
3. **Parallax Scroll** - 3 capas con velocidades diferentes
4. **3D Tilt Effect** - Rotación basada en posición del mouse
5. **Text Scramble** - Efecto de texto decodificándose
6. **Random Glitch** - Efectos aleatorios de distorsión
7. **Magnetic Elements** - Botones que atraen el cursor
8. **Geometric Shapes Animation** - Formas que siguen el mouse
9. **Number Counter** - Contador animado en sección de libros
10. **Custom Cursor** - Cursores personalizados SVG

### Easter Eggs
- **Konami Code**: Teclea `↑↑↓↓←→←→BA` para un efecto sorpresa
- **Console Art**: Abre la consola del navegador para ver mensajes especiales

## 🎨 Paleta de Colores

```css
--black: #000000      /* Fondo y bordes */
--white: #FFFFFF      /* Fondos de cards */
--yellow: #FFFF00     /* Acentos principales */
--red: #FF0000        /* Badges y detalles */
--blue: #0000FF       /* Efectos glitch */
--gray: #CCCCCC       /* Solo para sección "Más libros" */
```

## 📱 Responsive

- **Desktop (1280px+)**: Grid asimétrico completo, todos los efectos
- **Tablet (768-1280px)**: Grid simplificado a 6 columnas
- **Mobile (<768px)**: Grid 1 columna, efectos reducidos para performance

## ⚡ Performance

- **Animaciones pausadas**: Cuando la pestaña no está visible
- **Reduced Motion**: Respeta preferencia del usuario
- **Intersection Observer**: Anima solo elementos visibles
- **RequestAnimationFrame**: Para animaciones suaves
- **Lazy Effects**: Algunos efectos solo se activan al hacer hover

## 🎭 Tipografía

- **Display**: Bebas Neue (ultra bold, condensada)
- **Body**: Space Grotesk (geométrica, tech)
- **Monospace**: Space Mono (código y detalles)

Todas cargadas vía Google Fonts.

## 🔗 Navegación

### Para volver a la versión minimalista:
Usa el botón en el footer: **"VERSIÓN MINIMALISTA ←"**

### Páginas disponibles:
- `index-experimental.html` - Catálogo completo
- `tremenda-turra-experimental.html` - Detalle de Tremenda turra
- `tragedia-experimental.html` - Detalle del libro de tragedias

## 🎨 Inspiración

Este diseño se inspira en:
- **Brutalismo web**: Anti-diseño intencional
- **High-end editorial**: Layouts experimentales de revistas digitales
- **Awwwards**: Sitios ganadores con efectos espectaculares
- **Cyberpunk aesthetic**: Glitch, neón, caos controlado

## ⚠️ Notas

- Esta versión es **experimental** y más pesada que la minimalista
- Requiere navegadores modernos (Chrome 90+, Firefox 88+, Safari 14+)
- Mejor experiencia en desktop con mouse
- Algunos efectos pueden ser intensos para usuarios sensibles

## 🛠️ Personalización

Para modificar colores, edita las variables en `brutalist.css`:
```css
:root {
    --black: #000000;
    --yellow: #FFFF00;
    --red: #FF0000;
    /* ... */
}
```

Para ajustar animaciones, modifica `animations-brutal.css`.

---

**Versión**: 2.0 Experimental
**Creado con**: HTML + CSS + JavaScript (vanilla)
**Filosofía**: Máximo espectáculo, cero sutileza
**Estado**: 🔥 DISRUPTIVO 🔥
