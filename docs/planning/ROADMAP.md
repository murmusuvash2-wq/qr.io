# Product Roadmap & Tech Debt

## Feature Priority Matrix

### P0 (Critical - Must Have for Launch)
- Complete the 100 static tool pages generation.
- Ensure Firebase Security Rules are solid (read-only for templates, secure dynamic QR access).
- Remove hardcoded credentials.

### P1 (High Priority - Fast Follow)
- Full Firebase Auth integration replacing local storage auth bypass.
- User accounts (Dashboard for normal users to view their generated QRs).
- PDF generation / SVG export polishing.

### P2 (Medium Priority)
- Bulk Generation via CSV (Upload list, get zip of 100 QRs).
- Advanced Analytics (Scan locations, device types).
- Subscription/Stripe integration for Pro tier.

### P3 (Low Priority - Future)
- Canva/Figma plugins.
- Team/Agency sub-accounts.

## Known Technical Debt Items
1. **Hardcoded Admin Credentials:** Addressed in Step 5 (Moved to Environment Variables).
2. **Exposed Firebase API Key:** Addressed in Step 5 (Removed from `firebase-applet-config.json` and `.gitignore` updated).
3. **Auth Bypass:** The `isAdminLoggedIn` flag in LocalStorage is insecure. Needs full Firebase Auth integration.
4. **Dual SPA Maintenance:** Ensure the build process for 100 tools doesn't conflict with the dynamic React router.
5. **LocalStorage-as-Database Pattern:** Overuse of local storage for `dashboardDynamicQRs`, etc. Need to migrate state to Firestore for persistent user data.
6. **Zero Test Coverage:** Need to add Jest/Vitest and React Testing Library.
7. **Missing Strict TS Mode:** Enable `strict: true` in `tsconfig.json`.

## Sprint Plan (Next 3 Iterations)
- **Sprint 1 (Security & Stability):** Fix all tech debt items 1-3. Enable strict mode. Set up proper testing framework.
- **Sprint 2 (User Accounts):** Roll out Firebase Auth for end users. Allow saving generated QRs to an account.
- **Sprint 3 (Monetization):** Integrate Stripe. Launch the "Pro" dynamic routing features.
