# Next.js Prompt (Refactored)

Build a **single full-screen hero section** for a Next.js 15 App Router project using:

- React
- TypeScript
- Tailwind CSS
- `lucide-react`

The section is a premium animated figurine carousel called **TOONHUB**.

---

## Requirements

### Tech Constraints

- Must work in a Next.js App Router project.
- Use `"use client"` because the component relies on browser APIs (`window`, resize listener, image preloading, animations).
- Export a default React component.
- Keep everything inside a single component file.
- Use inline styles only where dynamic values are needed.
- Do not use Framer Motion or external animation libraries.
- Animations must rely entirely on CSS transitions.

---

## Fonts

Load these fonts in `app/layout.tsx` using `<link>` tags inside `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
```

Typography rules:

- Default body font: `'Inter', sans-serif`
- Display font: `'Anton', sans-serif`

---

## Data

Use this exact image dataset:

```ts
const IMAGES = [
  {
    src: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/1.02464a56.png",
    bg: "#F4845F",
    panel: "#F79B7F",
  },
  {
    src: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/2.b977faab.png",
    bg: "#6BBF7A",
    panel: "#85CC92",
  },
  {
    src: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/3.4df853b4.png",
    bg: "#E882B4",
    panel: "#ED9DC4",
  },
  {
    src: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/4.4457fbce.png",
    bg: "#6EB5FF",
    panel: "#8DC4FF",
  },
];
```

---

## Image Preloading

On component mount:

- Preload all images using `new Image()`
- Prevent layout flashing before animation begins

```ts
useEffect(() => {
  IMAGES.forEach((item) => {
    const img = new Image();
    img.src = item.src;
  });
}, []);
```

---

## State Management

```ts
const [activeIndex, setActiveIndex] = useState(0);
const [isAnimating, setIsAnimating] = useState(false);
const [isMobile, setIsMobile] = useState(false);
```

---

## Responsive Detection

```ts
window.innerWidth < 640
```

Requirements:

- Update on resize
- Add/remove resize listener properly
- Initialize immediately on mount

---

## Carousel Navigation Logic

```ts
navigate(direction: "next" | "prev")
```

Behavior:

- Ignore clicks while animating
- Set `isAnimating = true`
- Rotate indexes circularly
- Release animation lock after `650ms`

```ts
next => (prev + 1) % 4
prev => (prev + 3) % 4
```

---

## Role Mapping

```ts
const center = activeIndex;
const left = (activeIndex + 3) % 4;
const right = (activeIndex + 1) % 4;
const back = (activeIndex + 2) % 4;
```

---

# Layout

## Root Container

Main wrapper:

- `relative`
- `w-full`
- `overflow-hidden`

Dynamic background color:

```ts
backgroundColor: IMAGES[activeIndex].bg
```

Transition:

```css
background-color 650ms cubic-bezier(0.4, 0, 0.2, 1)
```

Use full viewport height:

```css
height: 100vh;
```

---

# Visual Layers

## 1. Grain Overlay

Create a fullscreen grain/noise layer.

Requirements:

- absolute inset-0
- pointer-events-none
- z-index: 50
- subtle SVG fractal noise background
- opacity: 0.4
- background-size: 200px 200px
- repeated texture

Use SVG turbulence filter encoded as a data URI.

---

## 2. Giant Background Text

Centered ghost text:

```txt
3D SHAPE
```

Position:

- absolute
- horizontally centered
- top: 18%
- z-index: 2

Style:

- font-family: Anton
- uppercase
- white
- opacity: 1
- line-height: 1
- letter-spacing: -0.02em
- white-space: nowrap

Responsive size:

```css
font-size: clamp(90px, 28vw, 380px)
```

---

## 3. Top-left Brand Label

Text:

```txt
TOONHUB
```

Position:

- top-6
- left-4
- sm:left-8

Style:

- text-xs
- font-semibold
- uppercase
- tracking-[0.18em]
- white
- opacity-90
- z-index: 60

---

# Carousel

## Container

Fullscreen absolute layer:

```css
absolute inset-0
z-index: 3
```

Render all 4 images simultaneously.

Each item:

- `position: absolute`
- `aspect-ratio: 0.6 / 1`
- animated with CSS transitions

Image rules:

```css
width: 100%;
height: 100%;
object-fit: contain;
object-position: bottom center;
```

Disable dragging.

---

# Role-based Styles

## Center

```ts
transform: translateX(-50%) scale(isMobile ? 1.25 : 1.68)
left: 50%
height: isMobile ? "60%" : "92%"
bottom: isMobile ? "22%" : 0
opacity: 1
filter: blur(0px)
zIndex: 20
```

---

## Left

```ts
transform: translateX(-50%) scale(1)
left: isMobile ? "20%" : "30%"
height: isMobile ? "16%" : "28%"
bottom: isMobile ? "32%" : "12%"
opacity: 0.85
filter: blur(2px)
zIndex: 10
```

---

## Right

Same as left, except:

```ts
left: isMobile ? "80%" : "70%"
```

---

## Back

```ts
transform: translateX(-50%) scale(1)
left: 50%
height: isMobile ? "13%" : "22%"
bottom: isMobile ? "32%" : "12%"
opacity: 1
filter: blur(4px)
zIndex: 5
```

---

# Animation Rules

```css
transform 650ms cubic-bezier(0.4,0,0.2,1),
filter 650ms cubic-bezier(0.4,0,0.2,1),
opacity 650ms cubic-bezier(0.4,0,0.2,1),
left 650ms cubic-bezier(0.4,0,0.2,1)
```

```css
will-change: transform, filter, opacity;
```

---

# Bottom-left Content

Position:

```css
absolute bottom-6 left-4
sm:bottom-20 sm:left-24
z-index: 60
max-width: 320px
```

## Heading

```txt
TOONHUB FIGURINES
```

Style:

- bold
- uppercase
- tracking-widest
- white
- opacity: 0.95

Responsive size:

```css
text-base sm:text-[22px]
```

---

## Description Text

Desktop only:

```css
hidden sm:block
```

Text:

```txt
The artwork is stunning, shipped fully prepared. The finish is a vision, the 3D craft is flawless. Many thanks! Wishing you the win. Order now.
```

---

# Navigation Buttons

Use `ArrowLeft` and `ArrowRight` from `lucide-react`.

Button styles:

- circular
- transparent background
- 2px white border
- white icons
- centered content

Sizes:

```css
w-12 h-12 sm:w-16 sm:h-16
```

Hover effect:

```css
scale(1.08)
background: rgba(255,255,255,0.12)
```

---

# Bottom-right CTA

Text:

```txt
DISCOVER IT
```

Position:

```css
absolute bottom-6 right-4
sm:bottom-20 sm:right-10
z-index: 60
```

---

# Final Behavior

The section should feel cinematic and premium.

When navigation occurs:

- Background color crossfades
- Figurines smoothly reposition
- Scale, blur, opacity, and depth animate together

Motion timing:

```css
cubic-bezier(0.4,0,0.2,1)
```

The figurines should overlap the giant `"3D SHAPE"` typography while remaining anchored visually near the bottom of the viewport.

Focus heavily on:

- smooth transitions
- layered depth
- luxury street-style presentation
- clean modern composition
- responsive behavior
