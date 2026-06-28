# Contributing to A2ZQR (EzQR.IO)

Thank you for your interest in contributing to the A2ZQR project! This document outlines our setup process and coding standards.

## Getting Started
1. Clone the repository and install dependencies with `npm install`.
2. Follow the setup instructions in the `README.md`.
3. Check out the active roadmap in `docs/planning/ROADMAP.md` before starting work.

## Development Workflow
We follow standard Git flow:
1. Create a branch: `feature/name-of-feature` or `fix/description-of-bug`.
2. Write clean, self-documenting code.
3. Commit using Conventional Commits: `feat(scope): message` or `fix(scope): message`.
4. Run `npm run lint` and `npm run format` before pushing.
5. Submit a Pull Request.

## Coding Standards
Please refer to `docs/CODING_STANDARDS.md` for a comprehensive list of our TypeScript, React, and Tailwind guidelines.

**Key principles:**
- **Strict Mode:** Always use strict TypeScript (`any` is discouraged).
- **Component Size:** Keep components under 300 lines; extract sub-components if necessary.
- **Design:** Ensure high contrast, minimalist styling matching `docs/design/BRAND_GUIDELINES.md`.

## Asset Addition
To add new templates or assets, see `docs/design/ASSET_LIBRARY.md`.

## Pre-Commit Hooks
This project uses `husky` and `lint-staged` to automatically format and lint files before commit.
