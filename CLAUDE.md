# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 portfolio project for Ignacio Weigandt with TypeScript, Tailwind CSS, and GSAP animations featuring ScrollTrigger and SplitText plugins.

## Development Commands

- `npm run dev` - Start development server (usually runs on http://localhost:3000)
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Architecture

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: GSAP with ScrollTrigger and SplitText plugins, Motion (Framer Motion)
- **Fonts**: Exo 2, Plus Jakarta Sans (Google Fonts)
- **Smooth Scrolling**: Lenis for enhanced scroll experience

### Project Structure
```
src/
├── app/                 # Next.js App Router pages
│   ├── globals.css     # Global styles and Tailwind imports
│   ├── layout.tsx      # Root layout component
│   └── page.tsx        # Home page
├── components/         # React components
│   ├── Hero.tsx       # Main hero section orchestrating all components
│   ├── Header.tsx     # Fixed header with hamburger menu button
│   ├── Menu.tsx       # Full-screen animated navigation menu
│   ├── LoadingScreen.tsx # Animated loading curtain on initial page load
│   ├── About.tsx      # About section with GSAP text animations
│   ├── Services.tsx   # Services section with animated cards
│   ├── Timeline.tsx   # Process timeline section with 6 steps
│   ├── Contact.tsx    # Contact section component
│   ├── ProfileCard.tsx # Profile card component with tilt effects
│   ├── ScrollVelocity.tsx # Horizontal scrolling text with Motion
│   ├── ScrollStack.tsx # Stack scrolling component
│   └── CurvedLoop.tsx # Curved marquee text component
├── hooks/             # Custom React hooks
│   └── useGSAP.ts    # GSAP context hook for animations
├── lib/               # Utilities and configurations
│   └── gsap.ts        # GSAP setup and plugin registration
└── utils/             # Utility functions (empty)
```

### Animation Architecture

**GSAP Integration:**
- GSAP plugins are registered in `src/lib/gsap.ts`
- Use the `useGSAP` hook for component-scoped animations with automatic cleanup
- ScrollTrigger is automatically refreshed after context creation
- SplitText is used for text animations (chars, words, lines)

**Motion Integration:**
- ScrollVelocity component uses Motion for scroll-velocity based animations
- Combines useScroll, useVelocity, useSpring for smooth effects
- Custom useElementWidth hook for responsive width calculations

### Key Patterns

1. **GSAP Animations**: Use the `useGSAP` hook to create animations with proper cleanup
2. **Text Animations**: SplitText splits text into animatable elements with custom CSS classes
3. **Scroll-Based Animations**: Motion library for velocity-based scrolling effects
4. **Component Composition**: Hero component orchestrates multiple animated sub-components
5. **Responsive Design**: Tailwind CSS classes with mobile-first approach
6. **TypeScript**: Strict typing throughout the codebase

### Animation Examples

**About Component** (`src/components/About.tsx`):
- Character-by-character title reveal using SplitText
- Line-by-line text animation with staggered effects
- Interactive hover effects on individual characters
- Custom CSS classes for performance optimization

**ScrollVelocity Component** (`src/components/ScrollVelocity.tsx`):
- Horizontal scrolling text that responds to scroll velocity
- Uses Motion's useScroll, useVelocity, and useSpring
- Dynamic direction changes based on scroll direction

**CurvedLoop Component** (`src/components/CurvedLoop.tsx`):
- SVG-based curved marquee text with interactive drag functionality
- Responsive design with mobile curve adjustments
- Custom path calculations for text along curves
- Interactive drag-to-change-direction feature

**Services Component** (`src/components/Services.tsx`):
- Service cards with staggered GSAP animations
- Interactive hover effects with scale and rotation
- SVG icon rotation animations triggered by scroll
- Character-by-character title animations with SplitText

**Timeline Component** (`src/components/Timeline.tsx`):
- Vertical timeline showing 6-step web development process
- ScrollTrigger.batch for performance-optimized step reveals
- Progressive line animation with scrub effect
- Circle animations: scale from 0, pulse effect, elastic border growth
- Hover effects with glow/shadow on each step
- Staggered content animations (circles, borders, text)
- Used in place of previous work portfolio section

**ProfileCard Component** (`src/components/ProfileCard.tsx`):
- Advanced tilt effects with mouse/touch interaction
- Complex gradient effects and hover states
- Device orientation support for mobile tilt
- Performance-optimized animations with easing functions

**Menu Component** (`src/components/Menu.tsx`):
- Full-screen overlay menu with curtain animation
- GSAP-powered opening/closing animations (height-based curtain effect)
- Staggered menu items and numbers animation
- Escape key and body scroll locking
- Section navigation with smooth scrolling to data-section attributes

**Header Component** (`src/components/Header.tsx`):
- Fixed position header with transparent background
- Animated hamburger menu button (transforms to X when open)
- Controls Menu component visibility

**LoadingScreen Component** (`src/components/LoadingScreen.tsx`):
- Initial page load animation with curtain effect
- Slides down and out after 1.5 seconds
- GSAP animation with power3.inOut easing
- Auto-unmounts after animation completes

### Development Notes

**GSAP & Animations:**
- GSAP plugins require client-side rendering (`'use client'` directive)
- Always clean up GSAP contexts and SplitText instances using revert()
- ScrollTrigger refresh is handled automatically in the useGSAP hook
- Motion components require proper ref handling for width calculations
- Custom CSS classes in globals.css provide animation performance optimizations
- Lenis smooth scrolling library is included for enhanced scroll experience

**Navigation & Sections:**
- Sections use `data-section` attributes for navigation (e.g., `data-section="home"`, `data-section="about"`, `data-section="work"`, `data-section="contact"`)
- Menu component scrolls to sections using querySelector on data-section attributes
- Fixed header is positioned at z-40, Menu at z-50, LoadingScreen at z-100

**Fonts & Styling:**
- Font variables are set in layout.tsx: `--font-exo-2` and `--font-plus-jakarta-sans`
- Exo 2: Used for headings, titles, and the header logo (uppercase, bold, tracking-tight)
- Plus Jakarta Sans: Used for body text, descriptions, and menu numbers

**Assets & Imports:**
- Images are stored in `/public/img/` directory (accessible via `/img/` in code)
- TypeScript path alias `@/*` maps to `./src/*` for clean imports
- Components with CSS files use named imports (e.g., `./ProfileCard.css`, `./ScrollVelocity.css`, `./CurvedLoop.css`)

**Component Patterns:**
- All animated components use `'use client'` directive
- refs are used extensively for GSAP animations and DOM manipulation
- Components follow a pattern: refs → useGSAP → cleanup in useEffect
- ProfileCard uses complex ref management with useMemo and useCallback for performance

### Styling Conventions

**Color Palette:**
- Primary background: `#292929` (dark gray)
- Secondary background: `#343434` (used for service cards)
- Menu overlay: `#3a3a3a` (slightly lighter gray)
- LoadingScreen & CurvedLoop accent: `#d4d4d4` (light gray)
- Foreground text: `#ffffff` (white)
- Divider lines: `#3e3e3e` (subtle gray)

**Typography:**
- Exo 2: Headings, titles, header logo, menu items (uppercase, bold, tracking-tight)
- Plus Jakarta Sans: Body text, descriptions, menu numbers
- Custom line-height of 1.8 for body text in About section

**Animation Classes:**
- Performance-optimized with `will-change`, `transform: translateZ(0)`, and `backface-visibility: hidden`
- Custom classes: `.about-title-char`, `.about-text-line`, `.work-card-side`, `.contact-title-char`
- All use `transform-style: preserve-3d` for 3D transforms
