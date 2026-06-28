# Folder Structure

## Complete Tree Overview

```text
a2zqr/
├── docs/                      # Extensive project documentation
│   ├── design/                # Brand, UI, Asset docs
│   ├── planning/              # API, Database schemas, Roadmaps
│   └── product/               # Vision, PRDs
├── public/                    # Static assets served at root
│   ├── assets/                # SVGs, overlays, backgrounds
│   └── templates/             # Pre-rendered template thumbnails
├── src/                       # React Source Code
│   ├── components/            # Reusable React components
│   │   ├── admin/             # Dashboard specific components
│   │   ├── tools/             # Tool-specific editors/forms
│   │   └── ui/                # Shared UI (Buttons, Modals)
│   ├── data/                  # Static data, configs
│   │   └── tools.ts           # The master list of 102 tools
│   ├── lib/                   # Utility libraries and API clients
│   │   ├── firebase.ts        # Firebase initialization
│   │   └── qrengine.ts        # Core logic for Canvas/SVG generation
│   ├── types/                 # TypeScript interfaces
│   ├── App.tsx                # Main Router / Entry component
│   ├── Dashboard.tsx          # Admin/User Dashboard view
│   └── main.tsx               # React DOM render entry
├── server.ts                  # Express backend server entry point
├── package.json               # Node.js dependencies & scripts
├── tsconfig.json              # TypeScript compiler config
├── .eslintrc.cjs              # ESLint rules
├── .prettierrc                # Code formatting rules
└── README.md                  # Project overview
```

## Key Files Purpose
- `src/data/tools.ts`: The central nervous system of the app. Defines every category and tool available.
- `server.ts`: Contains the API routes for communicating securely with Google Gemini.
- `src/components/LandingPage.tsx`: The highly optimized entry point for users.
