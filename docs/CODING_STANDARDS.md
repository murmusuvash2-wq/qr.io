# Coding Standards

## TypeScript Guidelines
- **Strict Mode:** Always enabled. No `any` types unless absolutely necessary (e.g., rapid prototyping of complex API responses, but must be refactored).
- **Interfaces vs Types:** Use `interface` for object definitions and component props. Use `type` for unions, intersections, and primitives.

## Naming Conventions
- **Variables & Functions:** `camelCase` (e.g., `generateQrCode`, `activeTab`).
- **React Components:** `PascalCase` (e.g., `TemplateEditor`, `LandingPage`).
- **Files & Directories:**
  - Components: `PascalCase.tsx` (e.g., `AssetLibrary.tsx`).
  - Utilities/Hooks/Data: `kebab-case.ts` (e.g., `qr-engine.ts`, `tools.ts`).
- **Constants:** `UPPER_SNAKE_CASE` (e.g., `MAX_UPLOAD_SIZE`).

## File Organization Rules
- Components must be self-contained. If a component grows beyond 300 lines, extract sub-components into the same folder.
- Keep business logic out of UI components. Use custom hooks (`src/hooks/`) for complex state.

## Import Ordering Convention
1. React / Framework imports (`import React, { useState } from 'react'`)
2. Third-party libraries (`import { QRCodeSVG } from 'qrcode.react'`)
3. Internal Core / Contexts (`import { useAuth } from '@/lib/auth'`)
4. Internal Components (`import Button from '@/components/ui/Button'`)
5. Types and Styles

## Tailwind CSS Usage
- Use utility classes directly in JSX.
- Avoid extracting to `.css` files with `@apply` unless it is a globally repeated pattern (like typography base styles).
- For complex conditional classes, use `clsx` or `tailwind-merge` (often aliased as `cn()`).

## LocalStorage Rules
- LocalStorage is used for fast prototyping and offline mode.
- Keys MUST be prefixed with `ezqr_` (e.g., `ezqr_user_preferences`).
- **Warning:** Do not store sensitive data (PII, passwords, access tokens) in LocalStorage.
