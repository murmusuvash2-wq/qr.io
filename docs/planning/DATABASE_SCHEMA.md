# Database Schema

## Firebase Firestore

### `users` Collection
- **Path:** `/users/{uid}`
- **Fields:**
  - `email` (string)
  - `isPro` (boolean)
  - `planType` (string: "free", "pro", "agency")
  - `expiryDate` (timestamp)
  - `totalGenerated` (number)
  - `createdAt` (timestamp)
  - `country` (string)
  - `currency` (string)

### `templates` Collection
Stores the AI-generated and curated design templates.
- **Path:** `/templates/{id}`
- **Fields:**
  - `id` (string)
  - `title` (string)
  - `category` (string)
  - `toolId` (string, optional - if specific to a tool)
  - `description` (string)
  - `bgType` (string: "color", "gradient", "image")
  - `qrConfig` (object: contains dots, corners, colors)
  - `layoutType` (string: "minimal", "luxury", "corporate")
  - `visualOverlay` (object: frame, sticker, icon)
  - `textElements` (array of objects)
  - `status` (string: "pending", "approved", "rejected")
  - `createdAt` (timestamp)
  - `approvedAt` (timestamp, optional)

## LocalStorage Schema (Fallback/Offline)
Used for fast access, unauthenticated users, and dashboard state persistence.
- `ezqr_secure_user_doc`: Encrypted or stringified minimal user state.
- `isUserPremiumPro`: boolean (stringified).
- `dashboardDynamicQRs`: Array of generated dynamic QR metadata.
- `dashboardCategories`: Categories state for the dashboard.
- `dashboardCustomTemplates`: User's saved custom templates.
- `ezqr_audit_counts`: Usage counters to prompt for signup/pro.
- `isAdminLoggedIn`: Auth bypass state (needs refactoring to secure HTTP-only cookies or Firebase Auth).
