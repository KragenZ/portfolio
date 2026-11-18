# Design & Styling Notes

Notes on the styling decisions, typography, color system, and layout structure used across the portfolio.

## Color Palette

The styling uses CSS custom properties defined in `:root` and overridden under `body.light-mode`.

### Dark Mode (Default)
- **Background (`--canvas`)**: `#090d16` — Dark slate background.
- **Card Surface (`--surface`)**: `#111827` — Base container color for cards.
- **Elevated Surface (`--surface-raised`)**: `#1e293b` — Slightly lighter background for nested blocks and code tags.
- **Border (`--border`)**: `#283548` — Container border color.
- **Text Primary (`--text-primary`)**: `#f8fafc` — High-contrast text for headings and primary content.
- **Text Secondary (`--text-secondary`)**: `#cbd5e1` — Body copy and descriptions.
- **Text Muted (`--text-muted`)**: `#94a3b8` — Dates, secondary labels, and metadata.
- **Accent Blue (`--brand` / `--brand-text`)**: `#2563eb` / `#60a5fa` — Interactive buttons, links, and active states.
- **Accent Amber (`--accent` / `--accent-text`)**: `#d97706` / `#fbbf24` — Status indicator for projects currently in progress.

### Light Mode
- **Background (`--canvas`)**: `#f8fafc` — Off-white canvas.
- **Card Surface (`--surface`)**: `#ffffff` — Crisp white card surfaces.
- **Elevated Surface (`--surface-raised`)**: `#f1f5f9` — Light slate for code snippets and tags.
- **Border (`--border`)**: `#e2e8f0` — Subtle gray divider borders.
- **Text Primary (`--text-primary`)**: `#0f172a` — Dark slate text.
- **Text Secondary (`--text-secondary`)**: `#334155` — Medium slate body text.

All text and background color combinations were chosen to meet WCAG AA contrast standards.

## Typography

Three web fonts are loaded via Google Fonts:
- **Headings**: `Manrope` (weights: 600, 700, 800) — A clean, geometric sans-serif for section titles and hero copy.
- **Body Text**: `DM Sans` (weights: 400, 500) — Legible sans-serif for paragraphs, narrative descriptions, and lists.
- **Code & Metrics**: `JetBrains Mono` (weights: 400, 500, 600) — Monospace font used for tech tags, numbers, and dataset details.

## Layout & Responsive Breakpoints

The layout uses a centered container (`--container-max: 1160px`) with fluid side padding:
- **Desktop (> 992px)**: Two-column grid for project cards (media preview on the left, details and links on the right), two-column grid for education and certifications.
- **Tablet (≤ 992px)**: Project cards stack into a single vertical column.
- **Mobile (≤ 768px)**: Header navigation collapses into a toggleable hamburger menu; section padding reduces from 5.5rem to 4rem.
- **Small Mobile (≤ 480px)**: Hero actions and project buttons stretch to full width for easier tapping; font sizes scale down using `clamp()`.

## Accessibility Considerations

- **Keyboard Navigation**: A skip-to-content link appears at the top when tabbing; `:focus-visible` outlines are applied to all interactive controls; the mobile navigation menu closes on `Escape`.
- **Motion**: An `@media (prefers-reduced-motion: reduce)` block disables CSS transitions and smooth scrolling for users who prefer reduced motion.
- **Semantic HTML**: Proper sectioning elements (`<header>`, `<main id="main-content">`, `<nav>`, `<section>`, `<footer>`) are used throughout.
