# UI Components Inventory

## Core Components (`src/components/`)

### LandingPage (`LandingPage.tsx`)
- **Purpose:** The main entry point displaying the 100+ tools organized by the 17 categories.
- **State:** Manages search filtering, category expansion (accordion), and mobile menu toggle.
- **Behavior:** Clicking a tool routes the user to the tool's specific generation page.

### Dashboard (`Dashboard.tsx`)
- **Purpose:** The administrative and user portal.
- **State:** Complex state managing tabs (Analytics, Dynamic QRs, Templates, AI Factory).
- **Behavior:** Handles auth checks, fetches data from Firebase, and triggers Gemini API calls.

### QRCodeGenerator (conceptual/engine)
- **Purpose:** Renders the actual SVG/Canvas based on user inputs.
- **Props:** `data`, `size`, `fgColor`, `bgColor`, `logoUrl`, `patternType`.

### Shared UI Patterns
- **Buttons:** Solid black for primary actions (`bg-slate-900 text-white`), outline for secondary. Fully rounded (`rounded-full` or `rounded-xl` for cards).
- **Cards:** White background, subtle border (`border-slate-200`), minimal shadow on hover.
- **Inputs:** Clean borders, focus states using `focus:ring-2 focus:ring-blue-500/20`.
