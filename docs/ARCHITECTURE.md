# System Architecture: A2ZQR (EzQR.IO)

## System Architecture Diagram

```mermaid
graph TD
    User([End User]) --> |HTTPS| CDN[Vercel CDN]
    
    subgraph Frontend (React SPA + Static)
        CDN --> LP[Landing Page]
        CDN --> Tools[100+ Static Tool Pages]
        CDN --> Dashboard[Admin Dashboard]
        Tools --> Core[QR Core Engine / Canvas]
    end
    
    subgraph Backend (Express + API)
        Dashboard --> API_Gateway[Express Server]
        API_Gateway --> |Generates| Gemini[Google Gemini AI]
    end
    
    subgraph Data Layer (Firebase + Local)
        Core -.-> |Static Generates| LocalStorage[(Browser Local Storage)]
        API_Gateway --> Firestore[(Firebase Firestore)]
        Dashboard --> Firestore
        Tools -.-> |Auth / Dynamic QRs| Firebase_Auth[Firebase Auth]
    end
```

## Component Tree
- **React SPA:** The core application routing handles the Landing Page and Dashboard.
- **Static Tool Pages:** 100+ individual routes dynamically or statically generated mapping to `src/data/tools.ts`.
- **Express API:** Lightweight Node.js server handling secure API calls to Gemini and scheduling cron tasks.

## Data Flow
1. **Static QR Flow:** User enters data → Client-side library generates SVG/Canvas → User downloads. No server storage. Absolute privacy.
2. **Dynamic QR Flow:** User authenticates via Firebase → Data saved to Firestore → Short link generated → Core generates QR pointing to short link → Short link redirects to target.

## Firebase Integration Architecture
- **Auth:** Standard Firebase Authentication (Email/Password, Google OAuth).
- **Firestore:** Stores User profiles, Dynamic QR configurations, and Curated Templates.
- **Fallback:** If offline or unauthenticated, the app gracefully degrades to LocalStorage for session persistence.

## Gemini AI Daily Template Generation Pipeline
- A cron job or manual trigger in the Admin Dashboard calls `POST /api/generate-templates`.
- Express Server formulates a strict JSON schema prompt and sends it to Gemini.
- Gemini returns 10 variations based on a randomized daily theme.
- Templates are saved to Firestore in 'pending' status for Admin approval.

## Build Pipeline
1. `tools-config.cjs`: Reads the master tools list and prepares routing.
2. `build.cjs`: Triggers Vite build.
3. Outputs are collected in `/dist` for serving.

## Deployment Architecture
- Deployed primarily on **Vercel** or **Google Cloud Run**.
- Requires Node.js environment for the Express backend if deployed as a full-stack container.
