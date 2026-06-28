# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - Phase 0 Foundation
### Added
- **Project Documentation:** Comprehensive documentation covering Vision, PRD, Architecture, Database Schemas, API endpoints, Brand Guidelines, and Roadmap (`/docs`).
- **Dev Tools:** Integrated ESLint, Prettier, Husky, and Lint-staged for strict coding standards.
- **Security:** Removed hardcoded admin credentials from `Dashboard.tsx` and implemented environment-based variables. Removed exposed Firebase API key from config.

### Changed
- Refactored `Dashboard.tsx` auth flow to rely on environment variables (demo mode fallback).
- Updated `tsconfig.json` to enforce `strict: true`.

### Fixed
- Addressed security vulnerabilities by cleaning `firebase-applet-config.json` and adding it to `.gitignore`.
