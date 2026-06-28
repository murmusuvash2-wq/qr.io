# Navigation Convention

## URL Structure Documentation
A2ZQR relies on clean, SEO-friendly URLs. 

- **Home:** `/`
- **Dashboard:** `/dashboard`
- **Tool Page Pattern:** `/tool/:category-slug/:tool-slug`
  - Example: `/tool/food-dining/pdf-menu-generator`
  - Example: `/tool/payments/upi-styled-code`

## Tool Slug Naming Convention
- Slugs are generated from the Tool Name.
- Must be lowercase.
- Spaces replaced with hyphens `-`.
- Special characters (`/`, `(`, `)`, `&`) removed.
- *Example:* "WiFi Access (Guest)" becomes `wifi-access-guest`.

## Route Patterns
- Application uses standard React Router (`react-router-dom`).
- `*` catch-all route redirects to `/` or a branded 404 page.
