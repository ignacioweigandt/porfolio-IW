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
│   ├── About.tsx      # About section with GSAP text animations
│   ├── Services.tsx   # Services section with animated cards
│   ├── MisTrabajos.tsx # Work portfolio section
│   ├── WorkCard.tsx   # Individual work project card component
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

**ProfileCard Component** (`src/components/ProfileCard.tsx`):
- Advanced tilt effects with mouse/touch interaction
- Complex gradient effects and hover states
- Device orientation support for mobile tilt
- Performance-optimized animations with easing functions

### Development Notes

- GSAP plugins require client-side rendering (`'use client'` directive)
- Always clean up GSAP contexts and SplitText instances using revert()
- ScrollTrigger refresh is handled automatically in the useGSAP hook
- Motion components require proper ref handling for width calculations
- Custom CSS classes in globals.css provide animation performance optimizations
- Font variables are set in layout.tsx: `--font-exo-2` and `--font-plus-jakarta-sans`
- Images are stored in both `/img/` and `/public/img/` directories
- TypeScript path alias `@/*` maps to `./src/*` for clean imports
- Components with CSS files use named imports (e.g., `./ProfileCard.css`)
- Lenis smooth scrolling library is included for enhanced scroll experience

### Styling Conventions

- Dark theme with `--background: #292929` and `--foreground: #ffffff`
- Exo 2 font for headings and titles (uppercase, bold)
- Plus Jakarta Sans for body text and descriptions
- CSS custom properties for consistent color theming
- Performance-optimized animation classes with `will-change` and `transform3d`