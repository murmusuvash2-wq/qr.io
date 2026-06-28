# Brand Guidelines

## Brand Identity
- **Name:** EzQR.IO (Project name: A2ZQR)
- **Tagline:** Bridge the physical and digital, instantly.
- **Brand Voice & Tone:** Professional, authoritative yet accessible, minimalist, and fast. We do not use "tech bro" slang. We speak in clear, actionable terms.

## Color Palette Reference
Based on the high-visibility minimalist workspace theme:

| Role | Variable | Hex | Usage |
| :--- | :--- | :--- | :--- |
| **Primary Dark** | `COLORS.primary` | `#000000` | Main text, core UI elements, primary buttons |
| **Primary Light** | `COLORS.primaryLight` | `#222222` | Secondary headers, hover states on dark |
| **Secondary** | `COLORS.secondary` | `#111111` | Deep backgrounds |
| **Accent** | `COLORS.accent` | `#000000` | Action items (keeping the monochrome aesthetic) |
| **Text Muted** | `COLORS.textMuted` | `#555555` | Subtitles, helper text |
| **Grid/Border** | `COLORS.grid` | `#E2E8F0` | Dividers, subtle borders |
| **Background** | `COLORS.bg` | `#FFFFFF` | Main application background |
| **Warning** | `COLORS.warning` | `#F59E0B` | Alerts, pending statuses |
| **Danger/Error** | `COLORS.danger` | `#EF4444` | Deletions, error states |

*(Note: While the app has a colorful tool selector, the core application frame is high-contrast black and white).*

## Typography Specification
- **Primary:** `Inter` (Weights 400, 500, 600, 700). Used for all body copy, UI elements, and standard data.
- **Display:** `Syne` (Weights 600, 700, 800). Used for major marketing headings on the landing page and premium templates.
- **Monospace:** `Space Mono` or `JetBrains Mono`. Used for code snippets, IDs, and technical data.

## Spacing Scale Reference
We use the standard Tailwind CSS spacing scale (based on 0.25rem / 4px).
- `p-4` (16px) - Standard component padding
- `gap-6` (24px) - Standard grid gap
- `mb-8` (32px) - Section spacing

## Design Tokens
Implemented primarily via Tailwind configuration and CSS custom properties (variables) defined in `index.css`.
