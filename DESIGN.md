---
name: Srijit Kumar Roy Portfolio Design System
description: Precision engineering aesthetic for an AI & Machine Learning engineer portfolio
colors:
  primary: "#2563eb"
  primary-hover: "#1d4ed8"
  primary-text: "#60a5fa"
  accent: "#d97706"
  accent-hover: "#b45309"
  accent-text: "#fbbf24"
  accent-subtle: "rgba(217, 119, 6, 0.15)"
  success: "#10b981"
  success-text: "#34d399"
  success-subtle: "rgba(16, 185, 129, 0.15)"
  canvas-dark: "#090d16"
  surface-dark: "#111827"
  surface-raised-dark: "#1e293b"
  surface-hover-dark: "#263347"
  border-dark: "#283548"
  border-subtle-dark: "#1e293b"
  border-focus: "#3b82f6"
  text-primary-dark: "#f8fafc"
  text-secondary-dark: "#cbd5e1"
  text-muted-dark: "#94a3b8"
  canvas-light: "#f8fafc"
  surface-light: "#ffffff"
  surface-raised-light: "#f1f5f9"
  surface-hover-light: "#e2e8f0"
  border-light: "#e2e8f0"
  border-subtle-light: "#edf2f7"
  text-primary-light: "#0f172a"
  text-secondary-light: "#334155"
  text-muted-light: "#475569"
typography:
  fontFamily:
    display: "Manrope, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    heading: "Manrope, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    body: "DM Sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    mono: "JetBrains Mono, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
  fontSize:
    xs: "0.75rem"
    sm: "0.8125rem"
    md: "0.875rem"
    base: "0.9375rem"
    body: "1rem"
    lg: "1.0625rem"
    xl: "1.125rem"
    2xl: "1.25rem"
    3xl: "1.5rem"
    4xl: "1.75rem"
    5xl: "2rem"
    6xl: "2.25rem"
    7xl: "2.5rem"
    8xl: "3.5rem"
    display: "4.25rem"
rounded:
  sm: "4px"
  md: "8px"
  lg: "12px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  xxl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "10px 20px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-secondary:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.text-primary-dark}"
    rounded: "{rounded.md}"
    padding: "10px 20px"
---

# Design System

## Overview
This design system establishes an authentic engineering aesthetic for Srijit Kumar Roy's portfolio. It emphasizes clarity, technical precision, high readability, and verifiable project evidence over theatrical AI cliches.

## Colors
The palette is built around deep slate neutrals paired with classic engineering royal blue and warm technical amber.

### Primary
- **Royal Cobalt Blue (`#2563eb` / `#1d4ed8`)**: Primary action buttons and focus indicators.
- **Cobalt Sky (`#60a5fa`)**: Primary link and accent text on dark backgrounds, achieving WCAG AAA contrast (> 7:1).

### Secondary
- **Technical Amber (`#d97706` / `#b45309`)**: Highlighting "In Progress" states and active engineering badges.
- **Amber Text (`#fbbf24`)**: High-contrast amber text on dark surfaces (> 9:1 contrast).

### Neutral
- **Canvas Dark (`#090d16`)**: Deep low-noise obsidian ground.
- **Surface Dark (`#111827`)**: Structural card background.
- **Surface Raised (`#1e293b`)**: Elevated card elements and code specs.
- **Border (`#283548`)**: Subtle 1px structural container divider.
- **Text Primary (`#f8fafc`)**: Highest contrast reading copy (15:1 ratio).
- **Text Secondary (`#cbd5e1`)**: Supporting body copy and bullet points (9.8:1 ratio).
- **Text Muted (`#94a3b8`)**: Micro-labels, dates, and metadata (5.5:1 ratio, strictly exceeding WCAG AA 4.5:1).

### Named Rules
**The Verification Rule.** Every color used for status indicators conveys truth: green (`#10b981` / `#34d399`) marks verified, deployed projects; amber (`#d97706` / `#fbbf24`) marks ongoing engineering work.

## Typography
- **Display & Headings**: `Manrope` (700 & 800 weight). Modern, geometric, authoritative, with high legibility across viewports.
- **Body & Longform**: `DM Sans` (400, 500, & 600 weight). Clean editorial rhythm with 65–75ch optimal measure.
- **Data & Code**: `JetBrains Mono` (500 weight). Precision technical face for metrics, file links, and stack tags.
- **Banned Faces**: Inter, Roboto, Space Grotesk, Geist, Plus Jakarta Sans (banned by Impeccable overused-font rule).

### Hierarchy
- **Display** (800, clamp(2.5rem, 5.5vw, 4.25rem), 1.1 line-height): Hero headline.
- **Headline** (800, clamp(1.85rem, 3.5vw, 2.5rem), 1.25 line-height): Section titles.
- **Title** (700, 1.5rem, 1.3 line-height): Project titles.
- **Body** (400, 1rem, 1.65 line-height): Narrative text.
- **Label / Tag** (500, 0.75rem – 0.8125rem, uppercase): Metadata chips and badges.

## Layout
- Maximum content width: 1160px, centered with fluid padding (1.5rem mobile, 2.5rem desktop).
- Section vertical spacing: 5.5rem (88px) desktop, 4rem (64px) mobile.
- Strict CSS Grid and Flexbox alignment with no horizontal overflow.
- Generous breathing room: space above headings is at least 1.5x the space below.

## Elevation & Depth
- Flat architectural planes with clean 1px border dividers (`#283548` dark / `#e2e8f0` light).
- Soft, realistic directional shadows with natural blur (`box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.35)`).
- Absolutely zero zero-offset colored glow halos and zero artificial chromatic luminescence.

## Shapes
- Modest, functional radii: 4px for tags, 8px for cards and buttons, 12px for container cards.
- Crisp rectangular architecture without excessive rounding.

## Components
- **Navbar**: Sticky, lightweight bar with logo, semantic navigation links, resume download CTA, external social links, and theme toggle.
- **Buttons**:
  - Primary: Solid high-contrast fill (`#2563eb`) with subtle hover elevation.
  - Secondary: Crisp 1px border outline (`#283548`) with surface hover.
- **Project Cards**:
  - Structured 2-column grid layout (media preview + detailed technical breakdown).
  - Explicit metrics block, stack pills, and direct repository / deployment links.
- **Skill Groups**: Clean categorized lists (Languages, ML & Data, LLM & Applications, Databases & BI) with inline SVG icons.
- **Status Badge**: Clean, static badge with dedicated styling for "Verified" vs "In Progress".

## Do's and Don'ts
- **DO** present verifiable facts, real datasets (Ames Housing, PaySim), real metrics (R² ~0.91, MAE ~$12,800), and actual repositories.
- **DO** provide a direct, working download for the genuine `Resume.pdf`.
- **DO** maintain strict keyboard focus states and WCAG AA contrast on every element.
- **DON'T** use gradient text on headings.
- **DON'T** use purple neon glow effects or cyan-on-dark AI tropes.
- **DON'T** include fake experience counters ("2+ Years Dev Experience", "10+ Projects Shipped").
- **DON'T** load heavy WebGL or physics libraries (Three.js, Matter.js, Shery.js) that cause mobile lag.
- **DON'T** use pulsing decorative animations that simulate false activity.
