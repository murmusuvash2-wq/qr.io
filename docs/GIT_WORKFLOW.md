# Git Workflow

## Branch Naming Convention
- `feature/name-of-feature` - For new features (e.g., `feature/bulk-upload`)
- `fix/description-of-bug` - For bug fixes (e.g., `fix/qr-canvas-rendering`)
- `docs/what-was-documented` - For documentation updates
- `refactor/what-was-refactored` - For code improvements without feature changes
- `chore/task-name` - For routine tasks (dependency updates, build scripts)

## Commit Message Convention
We use Conventional Commits format:
`<type>(<optional scope>): <description>`

Examples:
- `feat(tools): add new real-estate vcard tool`
- `fix(auth): resolve localstorage persistence bug`
- `docs(prd): update success metrics`

## PR Workflow
1. Branch from `main`.
2. Commit changes using Conventional Commits.
3. Open a Pull Request targeting `main`.
4. Ensure all CI checks (lint, format) pass.
5. Require at least 1 approval before merge.
6. Squash and merge to keep the main history clean.
