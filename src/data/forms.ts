import { Field, FormConfig } from './schemas';

export const FORMS_DATABASE: Record<string, FormConfig> = {
  "how-to-create-mathematical-fibonacci-spiral-qr-code": {
    "id": "how-to-create-mathematical-fibonacci-spiral-qr-code",
    "title": "Mathematical Fibonacci Spiral",
    "fields": [
      {
        "id": "target-url",
        "label": "Target URL / Text",
        "type": "url",
        "required": true,
        "placeholder": "https://example.com/math-portal",
        "validation": "url"
      },
      {
        "id": "spiral-density",
        "label": "Spiral Density",
        "type": "select",
        "required": true,
        "placeholder": ""
      },
      {
        "id": "spiral-color",
        "label": "Spiral Color",
        "type": "color",
        "required": true,
        "placeholder": ""
      },
      {
        "id": "bg-color",
        "label": "Background Color",
        "type": "color",
        "required": true,
        "placeholder": ""
      },
      {
        "id": "logo-url",
        "label": "Logo Upload / URL",
        "type": "url",
        "required": true,
        "placeholder": "https://example.com/logo.png (optional)",
        "validation": "url"
      }
    ]
  },
  "generate-mandelbrot-fractal-matrix-qr-code-free": {
    "id": "generate-mandelbrot-fractal-matrix-qr-code-free",
    "title": "Mandelbrot Fractal Matrix",
    "fields": [
      {
        "id": "target-url",
        "label": "Target URL / Text",
        "type": "url",
        "required": true,
        "placeholder": "https://example.com/fractal-portal",
        "validation": "url"
      },
      {
        "id": "fractal-intensity",
        "label": "Fractal Intensity",
        "type": "select",
        "required": true,
        "placeholder": ""
      },
      {
        "id": "color-theme",
        "label": "Color Theme",
        "type": "select",
        "required": true,
        "placeholder": ""
      },
      {
        "id": "quiet-zone-size",
        "label": "Quiet Zone Size",
        "type": "select",
        "required": true,
        "placeholder": ""
      },
      {
        "id": "logo-url",
        "label": "Logo Upload / URL",
        "type": "url",
        "required": true,
        "placeholder": "https://example.com/logo.png (optional)",
        "validation": "url"
      }
    ]
  },
  "custom-sierpinski-triangle-vector-qr-code-style": {
    "id": "custom-sierpinski-triangle-vector-qr-code-style",
    "title": "Sierpinski Triangle",
    "fields": [
      {
        "id": "target-url",
        "label": "Target URL / Text",
        "type": "url",
        "required": true,
        "placeholder": "https://example.com/sierpinski",
        "validation": "url"
      },
      {
        "id": "triangle-density",
        "label": "Triangle Density",
        "type": "select",
        "required": true,
        "placeholder": ""
      },
      {
        "id": "primary-color",
        "label": "Primary Color",
        "type": "color",
        "required": true,
        "placeholder": ""
      },
      {
        "id": "bg-color",
        "label": "Background Color",
        "type": "color",
        "required": true,
        "placeholder": ""
      }
    ]
  },
  "circuit-board-pcb-trace-qr-code-for-engineers": {
    "id": "circuit-board-pcb-trace-qr-code-for-engineers",
    "title": "Circuit Board / PCB Trace",
    "fields": [
      {
        "id": "target-url",
        "label": "URL / Text",
        "type": "url",
        "required": true,
        "placeholder": "https://your-schematics.com",
        "validation": "url"
      },
      {
        "id": "company-name",
        "label": "Company Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Acme Tech Circuitry"
      },
      {
        "id": "pcb-style",
        "label": "PCB Style",
        "type": "select",
        "required": true,
        "placeholder": ""
      },
      {
        "id": "accent-color",
        "label": "Accent Color",
        "type": "color",
        "required": true,
        "placeholder": ""
      }
    ]
  },
  "vinyl-record-circular-qr-code-for-music-audio": {
    "id": "vinyl-record-circular-qr-code-for-music-audio",
    "title": "Vinyl Record Circular",
    "fields": [
      {
        "id": "song-url",
        "label": "Song URL",
        "type": "url",
        "required": true,
        "placeholder": "https://spotify.link/your-song",
        "validation": "url"
      },
      {
        "id": "album-name",
        "label": "Album Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Midnight Memories"
      },
      {
        "id": "artist-name",
        "label": "Artist Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. The Retro Vibe"
      },
      {
        "id": "record-theme",
        "label": "Record Theme",
        "type": "select",
        "required": true,
        "placeholder": ""
      }
    ]
  },
  "alphabet-letter-shaped-qr-code-generator-online": {
    "id": "alphabet-letter-shaped-qr-code-generator-online",
    "title": "Alphabet / Letter-Shaped (A-Z)",
    "fields": [
      {
        "id": "target-url",
        "label": "URL / Text",
        "type": "url",
        "required": true,
        "placeholder": "https://example.com",
        "validation": "url"
      },
      {
        "id": "letter",
        "label": "Letter (A-Z)",
        "type": "text",
        "required": true,
        "placeholder": "e.g. A"
      },
      {
        "id": "primary-color",
        "label": "Color",
        "type": "color",
        "required": true,
        "placeholder": ""
      },
      {
        "id": "letter-style",
        "label": "Style",
        "type": "select",
        "required": true,
        "placeholder": ""
      }
    ]
  },
  "number-jersey-custom-qr-code-for-sports-merch": {
    "id": "number-jersey-custom-qr-code-for-sports-merch",
    "title": "Number / Jersey Custom (0-9)",
    "fields": [
      {
        "id": "target-url",
        "label": "URL / Text",
        "type": "url",
        "required": true,
        "placeholder": "https://example.com/team-store",
        "validation": "url"
      },
      {
        "id": "jersey-number",
        "label": "Number",
        "type": "number",
        "required": true,
        "placeholder": "e.g. 7"
      },
      {
        "id": "team-name",
        "label": "Team Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Red Devils FC"
      },
      {
        "id": "jersey-color",
        "label": "Jersey Color",
        "type": "color",
        "required": true,
        "placeholder": ""
      }
    ]
  },
  "waveform-audio-visualizer-qr-code-sound-tracks": {
    "id": "waveform-audio-visualizer-qr-code-sound-tracks",
    "title": "Waveform Audio-Visualizer",
    "fields": [
      {
        "id": "audio-url",
        "label": "Audio URL",
        "type": "url",
        "required": true,
        "placeholder": "https://soundcloud.com/track-name",
        "validation": "url"
      },
      {
        "id": "track-name",
        "label": "Track Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Golden Hour Vibes"
      },
      {
        "id": "artist-name",
        "label": "Artist",
        "type": "text",
        "required": true,
        "placeholder": "e.g. DJ Horizon"
      },
      {
        "id": "wave-style",
        "label": "Wave Style",
        "type": "select",
        "required": true,
        "placeholder": ""
      }
    ]
  },
  "physics-formula-posters-qr-code-for-textbooks": {
    "id": "physics-formula-posters-qr-code-for-textbooks",
    "title": "Physics Formula Posters",
    "fields": [
      {
        "id": "formula-name",
        "label": "Formula Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Schrödinger Wave Equation"
      },
      {
        "id": "pdf-url",
        "label": "PDF URL",
        "type": "url",
        "required": true,
        "placeholder": "https://education.edu/papers/schrodinger.pdf",
        "validation": "url"
      },
      {
        "id": "subject",
        "label": "Subject",
        "type": "select",
        "required": true,
        "placeholder": ""
      },
      {
        "id": "poster-theme",
        "label": "Poster Theme",
        "type": "select",
        "required": true,
        "placeholder": ""
      }
    ]
  },
  "scientific-constants-qr-code-reference-card-for-students": {
    "id": "scientific-constants-qr-code-reference-card-for-students",
    "title": "Constants Reference Card",
    "fields": [
      {
        "id": "reference-url",
        "label": "Reference URL",
        "type": "url",
        "required": true,
        "placeholder": "https://constants.nist.gov",
        "validation": "url"
      },
      {
        "id": "subject",
        "label": "Subject",
        "type": "select",
        "required": true,
        "placeholder": ""
      },
      {
        "id": "theme",
        "label": "Theme",
        "type": "select",
        "required": true,
        "placeholder": ""
      }
    ]
  },
  "molecule-structure-3d-qr-code-for-chemistry-labs": {
    "id": "molecule-structure-3d-qr-code-for-chemistry-labs",
    "title": "Molecule Structure 3D",
    "fields": [
      {
        "id": "molecule-name",
        "label": "Molecule Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Caffeine / C8H10N4O2"
      },
      {
        "id": "reference-link",
        "label": "URL / PDF",
        "type": "url",
        "required": true,
        "placeholder": "https://pubchem.ncbi.nlm.nih.gov/...caffeine",
        "validation": "url"
      },
      {
        "id": "lab-name",
        "label": "Lab Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Biomolecular Synthesis Suite"
      }
    ]
  },
  "secure-password-qr-code-generator-local-storage": {
    "id": "secure-password-qr-code-generator-local-storage",
    "title": "Password",
    "fields": [
      {
        "id": "password",
        "label": "Password",
        "type": "text",
        "required": true,
        "placeholder": "Enter your secure key..."
      },
      {
        "id": "label",
        "label": "Label",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Personal Email Vault"
      },
      {
        "id": "expiry-note",
        "label": "Expiry Note",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Change before December 2026"
      }
    ]
  },
  "2fa-authenticator-backup-qr-code-seed-strings": {
    "id": "2fa-authenticator-backup-qr-code-seed-strings",
    "title": "2FA Backup",
    "fields": [
      {
        "id": "secret-key",
        "label": "Secret Key",
        "type": "text",
        "required": true,
        "placeholder": "e.g. JBSWY3DPEHPK3PXP"
      },
      {
        "id": "account-name",
        "label": "Account Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. user@gmail.com"
      },
      {
        "id": "issuer-name",
        "label": "Issuer Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Google, GitHub"
      }
    ]
  },
  "encrypted-message-qr-code-cipher-payload-decoder": {
    "id": "encrypted-message-qr-code-cipher-payload-decoder",
    "title": "Encrypted Message",
    "fields": [
      {
        "id": "secret-message",
        "label": "Secret Message",
        "type": "textarea",
        "required": true,
        "placeholder": "Enter dynamic text cipher payload here..."
      },
      {
        "id": "password-hint",
        "label": "Password Hint",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Your first pet's name"
      },
      {
        "id": "encryption-type",
        "label": "Encryption Type",
        "type": "select",
        "required": true,
        "placeholder": ""
      }
    ]
  },
  "secure-wifi-share-auto-expiry-network-access": {
    "id": "secure-wifi-share-auto-expiry-network-access",
    "title": "Secure WiFi Share (Auto-Expiry)",
    "fields": [
      {
        "id": "in-wifi-ssid",
        "label": "WiFi Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. SecureHostNet",
        "validation": "wifi"
      },
      {
        "id": "in-wifi-pass",
        "label": "Password",
        "type": "text",
        "required": true,
        "placeholder": "e.g. super-secret-key-123",
        "validation": "wifi"
      },
      {
        "id": "in-wifi-sec",
        "label": "Encryption",
        "type": "select",
        "required": true,
        "placeholder": "",
        "validation": "wifi"
      },
      {
        "id": "in-wifi-hidden",
        "label": "Hidden Network",
        "type": "select",
        "required": true,
        "placeholder": "",
        "validation": "wifi"
      }
    ]
  },
  "sakura-cherry-blossom-qr-code-aesthetic-floral": {
    "id": "sakura-cherry-blossom-qr-code-aesthetic-floral",
    "title": "Sakura Cherry Blossom",
    "fields": [
      {
        "id": "target-url",
        "label": "URL / Text",
        "type": "url",
        "required": true,
        "placeholder": "https://example.com/spring-festival",
        "validation": "url"
      },
      {
        "id": "greeting-message",
        "label": "Message",
        "type": "text",
        "required": true,
        "placeholder": "e.g. May your season bloom beautifully!"
      },
      {
        "id": "theme-color",
        "label": "Theme Color",
        "type": "select",
        "required": true,
        "placeholder": ""
      }
    ]
  },
  "sumi-e-ink-brush-stroke-qr-code-artistic-presets": {
    "id": "sumi-e-ink-brush-stroke-qr-code-artistic-presets",
    "title": "Sumi-e Ink Brush",
    "fields": [
      {
        "id": "target-url",
        "label": "URL / Text",
        "type": "url",
        "required": true,
        "placeholder": "https://example.com/art-gallery",
        "validation": "url"
      },
      {
        "id": "ink-style",
        "label": "Ink Style",
        "type": "select",
        "required": true,
        "placeholder": ""
      },
      {
        "id": "primary-color",
        "label": "Color",
        "type": "color",
        "required": true,
        "placeholder": ""
      }
    ]
  },
  "torii-gate-frame-qr-code-japanese-themed": {
    "id": "torii-gate-frame-qr-code-japanese-themed",
    "title": "Torii Gate Frame",
    "fields": [
      {
        "id": "target-url",
        "label": "URL",
        "type": "url",
        "required": true,
        "placeholder": "https://example.com/torii-shrine",
        "validation": "url"
      },
      {
        "id": "shrine-name",
        "label": "Shrine/Event Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Fushimi Inari Taisha"
      },
      {
        "id": "shrine-theme",
        "label": "Theme",
        "type": "select",
        "required": true,
        "placeholder": ""
      }
    ]
  },
  "k-pop-fan-card-custom-qr-code-collectible": {
    "id": "k-pop-fan-card-custom-qr-code-collectible",
    "title": "K-Pop Fan Card Custom",
    "fields": [
      {
        "id": "fan-club",
        "label": "Fan Club Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. ARMY Union, BLINK Squad"
      },
      {
        "id": "target-url",
        "label": "Social Link",
        "type": "url",
        "required": true,
        "placeholder": "https://instagram.com/your-fan-handle",
        "validation": "url"
      },
      {
        "id": "artist-name",
        "label": "Artist Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. BTS, BLACKPINK, NewJeans"
      },
      {
        "id": "photo-url",
        "label": "Photo / Image URL",
        "type": "url",
        "required": true,
        "placeholder": "https://example.com/profile-or-card.jpg"
      }
    ]
  },
  "arabic-calligraphy-stroke-qr-code-design-islamic": {
    "id": "arabic-calligraphy-stroke-qr-code-design-islamic",
    "title": "Arabic Calligraphy Stroke",
    "fields": [
      {
        "id": "target-url",
        "label": "URL / Text",
        "type": "url",
        "required": true,
        "placeholder": "https://example.com/arabic-heritage",
        "validation": "url"
      },
      {
        "id": "arabic-phrase",
        "label": "Arabic Phrase",
        "type": "text",
        "required": true,
        "placeholder": "e.g. bismillah ar-rahman ar-rahim"
      },
      {
        "id": "calligraphy-style",
        "label": "Style",
        "type": "select",
        "required": true,
        "placeholder": ""
      }
    ]
  },
  "crescent-moon-star-eye-qr-code-holiday-graphics": {
    "id": "crescent-moon-star-eye-qr-code-holiday-graphics",
    "title": "Crescent Moon & Star Eye",
    "fields": [
      {
        "id": "target-url",
        "label": "URL / Text",
        "type": "url",
        "required": true,
        "placeholder": "https://example.com/ramadan-eid",
        "validation": "url"
      },
      {
        "id": "greeting-message",
        "label": "Greeting Message",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Eid Mubarak / Ramadan Kareem"
      },
      {
        "id": "moon-theme",
        "label": "Theme",
        "type": "select",
        "required": true,
        "placeholder": ""
      }
    ]
  },
  "islamic-geometric-tile-qr-code-mosaic-patterns": {
    "id": "islamic-geometric-tile-qr-code-mosaic-patterns",
    "title": "Islamic Geometric Tile",
    "fields": [
      {
        "id": "target-url",
        "label": "URL / Text",
        "type": "url",
        "required": true,
        "placeholder": "https://example.com/tile-heritage",
        "validation": "url"
      },
      {
        "id": "pattern-style",
        "label": "Pattern Style",
        "type": "select",
        "required": true,
        "placeholder": ""
      },
      {
        "id": "pattern-color",
        "label": "Color",
        "type": "color",
        "required": true,
        "placeholder": ""
      }
    ]
  },
  "festival-qr-code-holiday-theme-packs-free": {
    "id": "festival-qr-code-holiday-theme-packs-free",
    "title": "Festival/Holiday Theme Packs",
    "fields": [
      {
        "id": "target-url",
        "label": "URL / Text",
        "type": "url",
        "required": true,
        "placeholder": "https://example.com/holiday-greetings",
        "validation": "url"
      },
      {
        "id": "festival-name",
        "label": "Festival Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Diwali, Christmas, Hanukkah"
      },
      {
        "id": "greeting-message",
        "label": "Greeting Message",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Wishing you light, love, and laughter!"
      }
    ]
  },
  "how-to-lock-time-capsule-memory-qr-code": {
    "id": "how-to-lock-time-capsule-memory-qr-code",
    "title": "Time Capsule Memory",
    "fields": [
      {
        "id": "capsule-title",
        "label": "Capsule Title",
        "type": "text",
        "required": true,
        "placeholder": "e.g. High School Graduation Class of 2026"
      },
      {
        "id": "capsule-message",
        "label": "Message",
        "type": "textarea",
        "required": true,
        "placeholder": "Write your letter to the future self here..."
      },
      {
        "id": "unlock-date",
        "label": "Unlock Date",
        "type": "date",
        "required": true,
        "placeholder": ""
      },
      {
        "id": "photo-url",
        "label": "Photo Upload / URL",
        "type": "url",
        "required": true,
        "placeholder": "https://example.com/capsule-image.jpg",
        "validation": "url"
      },
      {
        "id": "video-url",
        "label": "Video Upload / URL",
        "type": "url",
        "required": true,
        "placeholder": "https://example.com/capsule-video.mp4",
        "validation": "url"
      },
      {
        "id": "recipient-name",
        "label": "Recipient Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. John Doe & Sarah Smith"
      }
    ]
  },
  "baby-birth-announcement-qr-code-newborn-cards": {
    "id": "baby-birth-announcement-qr-code-newborn-cards",
    "title": "Baby Birth Announcement",
    "fields": [
      {
        "id": "baby-name",
        "label": "Baby Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Liam Alexander Miller"
      },
      {
        "id": "birth-date",
        "label": "Birth Date",
        "type": "date",
        "required": true,
        "placeholder": ""
      },
      {
        "id": "baby-weight",
        "label": "Weight",
        "type": "text",
        "required": true,
        "placeholder": "e.g. 7 lbs 4 oz / 3.3 kg"
      },
      {
        "id": "parents-name",
        "label": "Parents Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Robert & Clara Miller"
      },
      {
        "id": "photo-url",
        "label": "Photo Upload / URL",
        "type": "url",
        "required": true,
        "placeholder": "https://example.com/baby-photo.jpg",
        "validation": "url"
      },
      {
        "id": "gallery-url",
        "label": "Gallery URL",
        "type": "url",
        "required": true,
        "placeholder": "https://example.com/full-shower-gallery",
        "validation": "url"
      }
    ]
  },
  "memorial-gravestone-qr-code-digital-obituary": {
    "id": "memorial-gravestone-qr-code-digital-obituary",
    "title": "Memorial / Gravestone",
    "fields": [
      {
        "id": "full-name",
        "label": "Full Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Robert Edward Johnson"
      },
      {
        "id": "birth-date",
        "label": "Birth Date",
        "type": "date",
        "required": true,
        "placeholder": ""
      },
      {
        "id": "passing-date",
        "label": "Passing Date",
        "type": "date",
        "required": true,
        "placeholder": ""
      },
      {
        "id": "bio-url",
        "label": "Biography URL",
        "type": "url",
        "required": true,
        "placeholder": "https://everloved.com/memorial/robert-johnson",
        "validation": "url"
      },
      {
        "id": "photo-url",
        "label": "Photo Upload / URL",
        "type": "url",
        "required": true,
        "placeholder": "https://example.com/robert-portrait.jpg (optional)",
        "validation": "url"
      },
      {
        "id": "family-contact",
        "label": "Family Contact (Optional)",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Sarah J. (Daughter) - +1 555-0199"
      }
    ]
  },
  "pet-id-collar-tag-qr-code-lost-dog-locator": {
    "id": "pet-id-collar-tag-qr-code-lost-dog-locator",
    "title": "Pet ID Collar Tag",
    "fields": [
      {
        "id": "pet-name",
        "label": "Pet Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Max / Bella"
      },
      {
        "id": "pet-type",
        "label": "Pet Type",
        "type": "select",
        "required": true,
        "placeholder": ""
      },
      {
        "id": "pet-breed",
        "label": "Breed",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Golden Retriever / Persian"
      },
      {
        "id": "owner-name",
        "label": "Owner Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Jane Doe"
      },
      {
        "id": "owner-phone",
        "label": "Phone Number",
        "type": "tel",
        "required": true,
        "placeholder": "e.g. +1 555-0199"
      },
      {
        "id": "owner-address",
        "label": "Address",
        "type": "textarea",
        "required": true,
        "placeholder": "Enter home address for returning pet..."
      },
      {
        "id": "medical-notes",
        "label": "Medical Notes",
        "type": "textarea",
        "required": true,
        "placeholder": "e.g. Diabetic - needs insulin twice a day (optional)"
      }
    ]
  },
  "medical-id-allergy-badge-qr-code-emergency-vital": {
    "id": "medical-id-allergy-badge-qr-code-emergency-vital",
    "title": "Medical ID / Allergy Badge",
    "fields": [
      {
        "id": "full-name",
        "label": "Full Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. John Albert Smith"
      },
      {
        "id": "blood-group",
        "label": "Blood Group",
        "type": "select",
        "required": true,
        "placeholder": ""
      },
      {
        "id": "allergies",
        "label": "Allergies",
        "type": "textarea",
        "required": true,
        "placeholder": "e.g. Severe Penicillin & Peanut Allergy"
      },
      {
        "id": "emergency-contact",
        "label": "Emergency Contact",
        "type": "tel",
        "required": true,
        "placeholder": "e.g. +1 555-0144 (Spouse)"
      },
      {
        "id": "medical-conditions",
        "label": "Medical Conditions",
        "type": "textarea",
        "required": true,
        "placeholder": "e.g. Type 1 Diabetes, Asthma (uses inhaler)"
      },
      {
        "id": "doctor-contact",
        "label": "Doctor Contact",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Dr. Davis - +1 555-0188"
      }
    ]
  },
  "child-safety-wristband-qr-code-parents-contact": {
    "id": "child-safety-wristband-qr-code-parents-contact",
    "title": "Child Safety Wristband",
    "fields": [
      {
        "id": "child-name",
        "label": "Child Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Tommy Miller"
      },
      {
        "id": "parent-name",
        "label": "Parent Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Robert Miller"
      },
      {
        "id": "parent-phone",
        "label": "Parent Phone",
        "type": "tel",
        "required": true,
        "placeholder": "e.g. +1 555-0133"
      },
      {
        "id": "address",
        "label": "Address",
        "type": "textarea",
        "required": true,
        "placeholder": "Enter child's home address..."
      },
      {
        "id": "emergency-phone",
        "label": "Emergency Contact",
        "type": "tel",
        "required": true,
        "placeholder": "e.g. +1 555-0177 (Grandmother)"
      }
    ]
  },
  "medicine-dosage-alert-qr-code-medication-timer": {
    "id": "medicine-dosage-alert-qr-code-medication-timer",
    "title": "Medicine Dosage Alert",
    "fields": [
      {
        "id": "patient-name",
        "label": "Patient Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Alice Peterson"
      },
      {
        "id": "medicine-name",
        "label": "Medicine Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Metformin 500mg"
      },
      {
        "id": "dosage",
        "label": "Dosage",
        "type": "text",
        "required": true,
        "placeholder": "e.g. 1 Tablet"
      },
      {
        "id": "frequency",
        "label": "Frequency",
        "type": "select",
        "required": true,
        "placeholder": ""
      },
      {
        "id": "doctor-name",
        "label": "Doctor Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Dr. Angela Carson"
      },
      {
        "id": "emergency-contact",
        "label": "Emergency Contact",
        "type": "tel",
        "required": true,
        "placeholder": "e.g. +1 555-0122 (Guardian)"
      }
    ]
  },
  "instantcard-free-contact-sharing-qr-code": {
    "id": "instantcard-free-contact-sharing-qr-code",
    "title": "InstantCard Contact Sharing",
    "fields": [
      {
        "id": "full-name",
        "label": "Full Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Liam Alexander Miller"
      },
      {
        "id": "phone",
        "label": "Phone",
        "type": "tel",
        "required": true,
        "placeholder": "e.g. +1 555-0155"
      },
      {
        "id": "email",
        "label": "Email",
        "type": "email",
        "required": true,
        "placeholder": "e.g. liam@instantcard.me"
      },
      {
        "id": "website",
        "label": "Website",
        "type": "url",
        "required": true,
        "placeholder": "https://instantcard.me/liam",
        "validation": "url"
      },
      {
        "id": "company",
        "label": "Company",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Creative Horizon Ltd"
      },
      {
        "id": "address",
        "label": "Address",
        "type": "textarea",
        "required": true,
        "placeholder": "e.g. Suite 404, Tech Park, Austin, TX"
      },
      {
        "id": "profile-photo-url",
        "label": "Profile Photo Upload / URL",
        "type": "url",
        "required": true,
        "placeholder": "https://example.com/liam-avatar.jpg (optional)",
        "validation": "url"
      }
    ]
  },
  "brand-dna-auto-match-engine-qr-branding": {
    "id": "brand-dna-auto-match-engine-qr-branding",
    "title": "Brand DNA Auto-Match Engine",
    "fields": [
      {
        "id": "brand-name",
        "label": "Brand Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Vertex Innovations"
      },
      {
        "id": "website",
        "label": "Website",
        "type": "url",
        "required": true,
        "placeholder": "https://vertexbrand.com",
        "validation": "url"
      },
      {
        "id": "brand-color",
        "label": "Brand Color",
        "type": "color",
        "required": true,
        "placeholder": ""
      },
      {
        "id": "logo-url",
        "label": "Logo Upload / URL",
        "type": "url",
        "required": true,
        "placeholder": "https://vertexbrand.com/assets/logo.png (optional)",
        "validation": "url"
      },
      {
        "id": "tagline",
        "label": "Tagline",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Peak Efficiency. Reimagined."
      },
      {
        "id": "industry",
        "label": "Industry",
        "type": "select",
        "required": true,
        "placeholder": ""
      }
    ]
  },
  "handmade-product-packaging-qr-code-etsy-sellers": {
    "id": "handmade-product-packaging-qr-code-etsy-sellers",
    "title": "Handmade Product Packaging",
    "fields": [
      {
        "id": "product-name",
        "label": "Product Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Lavender Oats Scented Candle"
      },
      {
        "id": "product-url",
        "label": "Product URL",
        "type": "url",
        "required": true,
        "placeholder": "https://etsy.com/listing/your-product",
        "validation": "url"
      },
      {
        "id": "brand-name",
        "label": "Brand Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Serene Craft Co."
      },
      {
        "id": "instagram-url",
        "label": "Instagram Link",
        "type": "url",
        "required": true,
        "placeholder": "https://instagram.com/serenecrafts",
        "validation": "url"
      },
      {
        "id": "care-instructions",
        "label": "Care Instructions",
        "type": "textarea",
        "required": true,
        "placeholder": "e.g. Trim wick to 1/4 inch before lighting. Do not burn for more than 4 hours at a time."
      }
    ]
  },
  "airbnb-host-welcome-guide-qr-code-vacation-rentals": {
    "id": "airbnb-host-welcome-guide-qr-code-vacation-rentals",
    "title": "Airbnb Host Welcome Guide",
    "fields": [
      {
        "id": "property-name",
        "label": "Property Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. The Blue Horizon Beachfront Chalet"
      },
      {
        "id": "welcome-guide-url",
        "label": "Welcome Guide URL",
        "type": "url",
        "required": true,
        "placeholder": "https://guide.booking.com/p/your-chalet",
        "validation": "url"
      },
      {
        "id": "wifi-name",
        "label": "WiFi Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Blue_Horizon_Guest_5G"
      },
      {
        "id": "wifi-pass",
        "label": "WiFi Password",
        "type": "text",
        "required": true,
        "placeholder": "e.g. oceanwaves2026"
      },
      {
        "id": "host-contact",
        "label": "Host Contact",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Clara Miller - +1 555-0182"
      }
    ]
  },
  "restaurant-allergen-chart-qr-code-fssai": {
    "id": "restaurant-allergen-chart-qr-code-fssai",
    "title": "Restaurant Allergen Chart",
    "fields": [
      {
        "id": "restaurant-name",
        "label": "Restaurant Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Olive Garden Delights"
      },
      {
        "id": "menu-url",
        "label": "PDF/Menu URL",
        "type": "url",
        "required": true,
        "placeholder": "https://olivegardendelights.com/allergen-menu.pdf",
        "validation": "url"
      },
      {
        "id": "allergy-info",
        "label": "Allergy Information",
        "type": "textarea",
        "required": true,
        "placeholder": "e.g. Gluten-Free options marked. Contains nuts in some desserts."
      },
      {
        "id": "contact-phone",
        "label": "Contact Number",
        "type": "tel",
        "required": true,
        "placeholder": "e.g. +1 555-0191 (Front Desk)"
      }
    ]
  },
  "product-authenticity-anti-counterfeit-qr-code-secure": {
    "id": "product-authenticity-anti-counterfeit-qr-code-secure",
    "title": "Product Authenticity Anti-Counterfeit",
    "fields": [
      {
        "id": "product-name",
        "label": "Product Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Leather Designer Handbag Edition X"
      },
      {
        "id": "product-id",
        "label": "Product ID",
        "type": "text",
        "required": true,
        "placeholder": "e.g. SN-89201-BHA"
      },
      {
        "id": "verification-url",
        "label": "Verification URL",
        "type": "url",
        "required": true,
        "placeholder": "https://verify.branddna.com/sn-89201-bha",
        "validation": "url"
      },
      {
        "id": "manufacturer-name",
        "label": "Manufacturer Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Apex Luxury Handmades Ltd"
      },
      {
        "id": "support-contact",
        "label": "Support Contact",
        "type": "text",
        "required": true,
        "placeholder": "e.g. support@apexhandmades.com"
      }
    ]
  },
  "hotel-secure-room-wifi-qr-code-seamless-onboarding": {
    "id": "hotel-secure-room-wifi-qr-code-seamless-onboarding",
    "title": "Hotel Secure Room WiFi",
    "fields": [
      {
        "id": "hotel-name",
        "label": "Hotel Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Grand Palace Resort"
      },
      {
        "id": "room-number",
        "label": "Room Number",
        "type": "text",
        "required": true,
        "placeholder": "e.g. 504"
      },
      {
        "id": "wifi-name",
        "label": "WiFi Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. GrandPalace_Room_504"
      },
      {
        "id": "wifi-pass",
        "label": "Password",
        "type": "text",
        "required": true,
        "placeholder": "e.g. palace504secure"
      },
      {
        "id": "reception-phone",
        "label": "Reception Number",
        "type": "tel",
        "required": true,
        "placeholder": "e.g. +1 555-0100 (Dial 9 from room)"
      }
    ]
  },
  "chemical-safety-sds-labels-qr-code-osha-compliance": {
    "id": "chemical-safety-sds-labels-qr-code-osha-compliance",
    "title": "Chemical Safety SDS Labels",
    "fields": [
      {
        "id": "chemical-name",
        "label": "Chemical Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Isopropyl Alcohol 99%"
      },
      {
        "id": "sds-url",
        "label": "SDS PDF URL",
        "type": "url",
        "required": true,
        "placeholder": "https://www.sigmaaldrich.com/sds/isopropyl-99.pdf",
        "validation": "url"
      },
      {
        "id": "manufacturer",
        "label": "Manufacturer",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Sigma-Aldrich Co."
      },
      {
        "id": "emergency-phone",
        "label": "Emergency Number",
        "type": "tel",
        "required": true,
        "placeholder": "e.g. +1 800-424-9300 (Chemtrec)"
      }
    ]
  },
  "free-upi-qr-code-styled-generator-with-amount": {
    "id": "free-upi-qr-code-styled-generator-with-amount",
    "title": "UPI Styled Code",
    "fields": [
      {
        "id": "in-upi-vpa",
        "label": "UPI ID / VPA",
        "type": "text",
        "required": true,
        "placeholder": "e.g. merchant@upi"
      },
      {
        "id": "in-upi-name",
        "label": "Payee Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Shop Name"
      },
      {
        "id": "in-upi-amt",
        "label": "Amount (Optional)",
        "type": "number",
        "required": true,
        "placeholder": "e.g. 500"
      },
      {
        "id": "upi-currency",
        "label": "Currency",
        "type": "select",
        "required": true,
        "placeholder": ""
      },
      {
        "id": "upi-note",
        "label": "Note",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Payment for Groceries"
      }
    ]
  },
  "masked-aadhaar-safe-id-qr-code-offline-kyc": {
    "id": "masked-aadhaar-safe-id-qr-code-offline-kyc",
    "title": "Aadhaar-Safe ID",
    "fields": [
      {
        "id": "name",
        "label": "Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Rajesh Kumar"
      },
      {
        "id": "masked-aadhaar",
        "label": "Masked Aadhaar Number",
        "type": "text",
        "required": true,
        "placeholder": "e.g. XXXX-XXXX-9012"
      },
      {
        "id": "verification-url",
        "label": "Verification URL",
        "type": "url",
        "required": true,
        "placeholder": "https://myaadhaar.uidai.gov.in/verify",
        "validation": "url"
      },
      {
        "id": "contact-phone",
        "label": "Contact Number",
        "type": "tel",
        "required": true,
        "placeholder": "e.g. +91 98765-43210"
      }
    ]
  },
  "fssai-food-label-qr-code-merchant-license": {
    "id": "fssai-food-label-qr-code-merchant-license",
    "title": "FSSAI Food Label",
    "fields": [
      {
        "id": "brand-name",
        "label": "Brand Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. PureDelight Organics"
      },
      {
        "id": "fssai-number",
        "label": "FSSAI Number",
        "type": "text",
        "required": true,
        "placeholder": "e.g. 10020031000456"
      },
      {
        "id": "product-name",
        "label": "Product Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Pure Premium Cow Ghee"
      },
      {
        "id": "website",
        "label": "Website",
        "type": "url",
        "required": true,
        "placeholder": "https://puredelight.in",
        "validation": "url"
      },
      {
        "id": "nutrition-url",
        "label": "Nutrition PDF URL",
        "type": "url",
        "required": true,
        "placeholder": "https://puredelight.in/nutrition-chart.pdf",
        "validation": "url"
      }
    ]
  },
  "street-address-maps-qr-code-home-delivery": {
    "id": "street-address-maps-qr-code-home-delivery",
    "title": "Street Address Maps",
    "fields": [
      {
        "id": "address",
        "label": "Address",
        "type": "textarea",
        "required": true,
        "placeholder": "Enter full delivery/residential address..."
      },
      {
        "id": "map-url",
        "label": "Google Maps URL",
        "type": "url",
        "required": true,
        "placeholder": "https://maps.app.goo.gl/your-location-link",
        "validation": "url"
      },
      {
        "id": "contact-phone",
        "label": "Contact Number",
        "type": "tel",
        "required": true,
        "placeholder": "e.g. +91 98765-43210"
      },
      {
        "id": "landmark",
        "label": "Landmark",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Near Rose Garden Metro Pillar 102"
      }
    ]
  },
  "seed-authenticity-agriculture-qr-code-farmers": {
    "id": "seed-authenticity-agriculture-qr-code-farmers",
    "title": "Seed Authenticity Agriculture",
    "fields": [
      {
        "id": "seed-name",
        "label": "Seed Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Hybrid Basmati Rice Seed Type-A"
      },
      {
        "id": "batch-number",
        "label": "Batch Number",
        "type": "text",
        "required": true,
        "placeholder": "e.g. BATCH-2026-AGRO-77"
      },
      {
        "id": "verification-url",
        "label": "Verification URL",
        "type": "url",
        "required": true,
        "placeholder": "https://verify.agroseeds.in/batch-77",
        "validation": "url"
      },
      {
        "id": "company-name",
        "label": "Company Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Bharat Agro Seeds Ltd"
      }
    ]
  },
  "matrimony-profile-qr-code-biodata-sharing": {
    "id": "matrimony-profile-qr-code-biodata-sharing",
    "title": "Matrimony Profile",
    "fields": [
      {
        "id": "full-name",
        "label": "Full Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Ramesh Kumar Sharma"
      },
      {
        "id": "biodata-url",
        "label": "Biodata PDF URL",
        "type": "url",
        "required": true,
        "placeholder": "https://sharmamatrimony.in/profiles/ramesh-biodata.pdf",
        "validation": "url"
      },
      {
        "id": "contact-phone",
        "label": "Contact Number",
        "type": "tel",
        "required": true,
        "placeholder": "e.g. +91 991122-3344"
      },
      {
        "id": "photo-url",
        "label": "Photo Upload / URL",
        "type": "url",
        "required": true,
        "placeholder": "https://sharmamatrimony.in/profiles/ramesh-photo.png",
        "validation": "url"
      },
      {
        "id": "occupation",
        "label": "Occupation",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Senior Software Engineer at Google"
      }
    ]
  },
  "temple-donation-qr-code-digital-hundi-payments": {
    "id": "temple-donation-qr-code-digital-hundi-payments",
    "title": "Temple Donation",
    "fields": [
      {
        "id": "temple-name",
        "label": "Temple Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Sri Venkateswara Swamy Temple"
      },
      {
        "id": "donation-upi",
        "label": "UPI ID",
        "type": "text",
        "required": true,
        "placeholder": "e.g. svst_mumbai@upi"
      },
      {
        "id": "donation-amt",
        "label": "Donation Amount (Optional)",
        "type": "number",
        "required": true,
        "placeholder": "e.g. 501"
      },
      {
        "id": "website",
        "label": "Website",
        "type": "url",
        "required": true,
        "placeholder": "https://tirumala.org",
        "validation": "url"
      }
    ]
  },
  "periodic-table-elements-set-qr-code-programmatic-pages": {
    "id": "periodic-table-elements-set-qr-code-programmatic-pages",
    "title": "Periodic Table Elements Set",
    "fields": [
      {
        "id": "element-name",
        "label": "Element Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Carbon"
      },
      {
        "id": "atomic-number",
        "label": "Atomic Number",
        "type": "text",
        "required": true,
        "placeholder": "e.g. 6"
      },
      {
        "id": "element-symbol",
        "label": "Symbol",
        "type": "text",
        "required": true,
        "placeholder": "e.g. C"
      },
      {
        "id": "wiki-url",
        "label": "Learn More URL",
        "type": "url",
        "required": true,
        "placeholder": "https://wikipedia.org/wiki/Carbon",
        "validation": "url"
      }
    ]
  },
  "historical-monument-walk-qr-code-tourism-guide": {
    "id": "historical-monument-walk-qr-code-tourism-guide",
    "title": "Historical Monument Walk",
    "fields": [
      {
        "id": "monument-name",
        "label": "Monument Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Taj Mahal"
      },
      {
        "id": "construction-year",
        "label": "Construction Year",
        "type": "text",
        "required": true,
        "placeholder": "e.g. 1631 - 1648 AD"
      },
      {
        "id": "guide-url",
        "label": "Audio Guide URL",
        "type": "url",
        "required": true,
        "placeholder": "https://audioguide.tourism.in/tajmahal",
        "validation": "url"
      },
      {
        "id": "monument-desc",
        "label": "Description",
        "type": "textarea",
        "required": true,
        "placeholder": "Write a short historical overview about the monument..."
      }
    ]
  },
  "study-group-link-drops-qr-code-for-whatsapp-discord": {
    "id": "study-group-link-drops-qr-code-for-whatsapp-discord",
    "title": "Study Group Link Drops",
    "fields": [
      {
        "id": "group-name",
        "label": "Group Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Advanced AI Study Circle"
      },
      {
        "id": "platform-name",
        "label": "Platform Name",
        "type": "select",
        "required": true,
        "placeholder": ""
      },
      {
        "id": "invite-url",
        "label": "Invite Link URL",
        "type": "url",
        "required": true,
        "placeholder": "https://discord.gg/ai-study-circle",
        "validation": "url"
      },
      {
        "id": "subject",
        "label": "Subject / Topic",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Deep Learning & Antigravity Agent Architectures"
      }
    ]
  },
  "solana-sol-address-qr-code-crypto-transfers": {
    "id": "solana-sol-address-qr-code-crypto-transfers",
    "title": "Solana (SOL) Address",
    "fields": [
      {
        "id": "wallet-label",
        "label": "Wallet Name / Label",
        "type": "text",
        "required": true,
        "placeholder": "e.g. My Personal SOL Wallet"
      },
      {
        "id": "sol-address",
        "label": "SOL Address",
        "type": "text",
        "required": true,
        "placeholder": "e.g. HN7cAB...8E9"
      },
      {
        "id": "sol-amount",
        "label": "Amount (SOL) (Optional)",
        "type": "number",
        "required": true,
        "placeholder": "e.g. 1.5"
      },
      {
        "id": "message",
        "label": "Message",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Payment for design services"
      }
    ]
  },
  "usdt-tether-address-qr-code-stablecoin-wallets": {
    "id": "usdt-tether-address-qr-code-stablecoin-wallets",
    "title": "USDT (Tether) Address",
    "fields": [
      {
        "id": "wallet-label",
        "label": "Wallet Name / Label",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Main Savings Wallet"
      },
      {
        "id": "usdt-address",
        "label": "USDT Address",
        "type": "text",
        "required": true,
        "placeholder": "e.g. 0x71C...39"
      },
      {
        "id": "network",
        "label": "Network",
        "type": "select",
        "required": true,
        "placeholder": ""
      },
      {
        "id": "usdt-amount",
        "label": "Amount (USDT) (Optional)",
        "type": "number",
        "required": true,
        "placeholder": "e.g. 100"
      }
    ]
  },
  "binance-coin-bnb-qr-code-bep20-wallets": {
    "id": "binance-coin-bnb-qr-code-bep20-wallets",
    "title": "Binance Coin (BNB)",
    "fields": [
      {
        "id": "wallet-label",
        "label": "Wallet Name / Label",
        "type": "text",
        "required": true,
        "placeholder": "e.g. My Ledger BNB"
      },
      {
        "id": "wallet-address",
        "label": "Wallet Address",
        "type": "text",
        "required": true,
        "placeholder": "e.g. 0x71C8efd92...89"
      },
      {
        "id": "network",
        "label": "Network (BEP20/BEP2)",
        "type": "select",
        "required": true,
        "placeholder": ""
      },
      {
        "id": "bnb-amount",
        "label": "Amount (Optional)",
        "type": "number",
        "required": true,
        "placeholder": "e.g. 0.5"
      }
    ]
  },
  "custom-crypto-wallet-qr-code-public-keys": {
    "id": "custom-crypto-wallet-qr-code-public-keys",
    "title": "Custom Crypto Wallet",
    "fields": [
      {
        "id": "coin-name",
        "label": "Coin Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Cardano (ADA)"
      },
      {
        "id": "wallet-address",
        "label": "Wallet Address",
        "type": "text",
        "required": true,
        "placeholder": "e.g. addr1..."
      },
      {
        "id": "network",
        "label": "Network",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Cardano Mainnet"
      },
      {
        "id": "amount",
        "label": "Amount",
        "type": "number",
        "required": true,
        "placeholder": "e.g. 100"
      },
      {
        "id": "wallet-label",
        "label": "Label",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Trezor Wallet"
      }
    ]
  },
  "free-pdf-menu-qr-code-generator-for-restaurants": {
    "id": "free-pdf-menu-qr-code-generator-for-restaurants",
    "title": "PDF Menu",
    "fields": [
      {
        "id": "restaurant-name",
        "label": "Restaurant Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Olive Garden Delights"
      },
      {
        "id": "pdf-url",
        "label": "PDF URL",
        "type": "url",
        "required": true,
        "placeholder": "https://olivegardendelights.com/menu.pdf",
        "validation": "url"
      },
      {
        "id": "phone-number",
        "label": "Phone Number",
        "type": "tel",
        "required": true,
        "placeholder": "e.g. +1 555-0190"
      },
      {
        "id": "website",
        "label": "Website",
        "type": "url",
        "required": true,
        "placeholder": "https://olivegardendelights.com",
        "validation": "url"
      }
    ]
  },
  "digital-online-menu-qr-code-contactless-dining": {
    "id": "digital-online-menu-qr-code-contactless-dining",
    "title": "Digital Menu",
    "fields": [
      {
        "id": "restaurant-name",
        "label": "Restaurant Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Bella Italia Bistro"
      },
      {
        "id": "menu-url",
        "label": "Menu URL",
        "type": "url",
        "required": true,
        "placeholder": "https://bellaitaliabistro.com/menu",
        "validation": "url"
      },
      {
        "id": "phone-number",
        "label": "Phone Number",
        "type": "tel",
        "required": true,
        "placeholder": "e.g. +1 555-0143"
      },
      {
        "id": "table-booking-url",
        "label": "Table Booking URL",
        "type": "url",
        "required": true,
        "placeholder": "https://bellaitaliabistro.com/reserve",
        "validation": "url"
      }
    ]
  },
  "table-ordering-link-qr-code-self-checkout": {
    "id": "table-ordering-link-qr-code-self-checkout",
    "title": "Table Ordering Link",
    "fields": [
      {
        "id": "restaurant-name",
        "label": "Restaurant Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Spicy Sichuan"
      },
      {
        "id": "ordering-url",
        "label": "Ordering URL",
        "type": "url",
        "required": true,
        "placeholder": "https://spicysichuan.com/order?table=12",
        "validation": "url"
      },
      {
        "id": "table-number",
        "label": "Table Number",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Table 12"
      },
      {
        "id": "contact-number",
        "label": "Contact Number",
        "type": "tel",
        "required": true,
        "placeholder": "e.g. +1 555-0188"
      }
    ]
  },
  "waiter-calling-service-qr-code-table-buttons": {
    "id": "waiter-calling-service-qr-code-table-buttons",
    "title": "Waiter Calling / Service",
    "fields": [
      {
        "id": "restaurant-name",
        "label": "Restaurant Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Le Parisien"
      },
      {
        "id": "table-number",
        "label": "Table Number",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Table 5"
      },
      {
        "id": "service-url",
        "label": "Service URL",
        "type": "url",
        "required": true,
        "placeholder": "https://leparisien.smartwaiter.app/call?table=5",
        "validation": "url"
      },
      {
        "id": "phone-number",
        "label": "Phone Number",
        "type": "tel",
        "required": true,
        "placeholder": "e.g. +1 555-0177"
      }
    ]
  },
  "room-wifi-qr-code-seamless-onboarding": {
    "id": "room-wifi-qr-code-seamless-onboarding",
    "title": "Hotel Room WiFi",
    "fields": [
      {
        "id": "hotel-name",
        "label": "Hotel Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Horizon Suite Hotel"
      },
      {
        "id": "room-number",
        "label": "Room Number",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Room 302"
      },
      {
        "id": "wifi-name",
        "label": "WiFi Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Horizon_Guest_302"
      },
      {
        "id": "wifi-pass",
        "label": "Password",
        "type": "text",
        "required": true,
        "placeholder": "e.g. horizon302safe"
      }
    ]
  },
  "airbnb-guide-qr-code-vacation-rentals": {
    "id": "airbnb-guide-qr-code-vacation-rentals",
    "title": "Airbnb Welcome Guide",
    "fields": [
      {
        "id": "property-name",
        "label": "Property Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. The Sunny Beachside Villa"
      },
      {
        "id": "guide-url",
        "label": "Guide URL (Optional)",
        "type": "url",
        "required": true,
        "placeholder": "https://airbnb.com/posts/guide-info...",
        "validation": "url"
      },
      {
        "id": "host-name",
        "label": "Host Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Clara Miller"
      },
      {
        "id": "contact-number",
        "label": "Contact Number",
        "type": "tel",
        "required": true,
        "placeholder": "e.g. +1 555-0182"
      }
    ]
  },
  "hotel-concierge-contact-qr-code-guest-support": {
    "id": "hotel-concierge-contact-qr-code-guest-support",
    "title": "Hotel Concierge Contact",
    "fields": [
      {
        "id": "hotel-name",
        "label": "Hotel Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Grand Palace Resort"
      },
      {
        "id": "concierge-name",
        "label": "Concierge Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Liam Alexander"
      },
      {
        "id": "phone-number",
        "label": "Phone Number",
        "type": "tel",
        "required": true,
        "placeholder": "e.g. +1 555-0100"
      },
      {
        "id": "whatsapp-number",
        "label": "WhatsApp Number",
        "type": "tel",
        "required": true,
        "placeholder": "e.g. +1 555-0101"
      }
    ]
  },
  "food-delivery-app-qr-code-zomato-swiggy": {
    "id": "food-delivery-app-qr-code-zomato-swiggy",
    "title": "Food Delivery App",
    "fields": [
      {
        "id": "restaurant-name",
        "label": "Restaurant Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Burger Palace"
      },
      {
        "id": "delivery-url",
        "label": "Delivery URL",
        "type": "url",
        "required": true,
        "placeholder": "https://zomato.com/burgerpalace",
        "validation": "url"
      },
      {
        "id": "phone-number",
        "label": "Phone Number",
        "type": "tel",
        "required": true,
        "placeholder": "e.g. +1 555-0125"
      },
      {
        "id": "promo-code",
        "label": "Promo Code",
        "type": "text",
        "required": true,
        "placeholder": "e.g. PIZZA50"
      }
    ]
  },
  "medical-id-emergency-info-qr-code-first-responders": {
    "id": "medical-id-emergency-info-qr-code-first-responders",
    "title": "Medical ID / Emergency Info",
    "fields": [
      {
        "id": "full-name",
        "label": "Full Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Liam Alexander Miller"
      },
      {
        "id": "blood-group",
        "label": "Blood Group",
        "type": "select",
        "required": true,
        "placeholder": ""
      },
      {
        "id": "allergies",
        "label": "Allergies",
        "type": "textarea",
        "required": true,
        "placeholder": "e.g. Peanuts, Penicillin (optional)"
      },
      {
        "id": "emergency-contact",
        "label": "Emergency Contact",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Clara Miller - +1 555-0182"
      },
      {
        "id": "medical-conditions",
        "label": "Medical Conditions",
        "type": "textarea",
        "required": true,
        "placeholder": "e.g. Asthma, High Blood Pressure (optional)"
      }
    ]
  },
  "pet-tag-lost-pet-qr-code-smart-collars": {
    "id": "pet-tag-lost-pet-qr-code-smart-collars",
    "title": "Pet Tag / Lost Pet",
    "fields": [
      {
        "id": "pet-name",
        "label": "Pet Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Max"
      },
      {
        "id": "breed",
        "label": "Breed",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Golden Retriever"
      },
      {
        "id": "owner-name",
        "label": "Owner Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Rajesh Kumar"
      },
      {
        "id": "phone-number",
        "label": "Phone Number",
        "type": "tel",
        "required": true,
        "placeholder": "e.g. +91 98765-43210"
      },
      {
        "id": "reward-note",
        "label": "Reward Note",
        "type": "textarea",
        "required": true,
        "placeholder": "e.g. Friendly but shy. $100 reward if returned safely."
      }
    ]
  },
  "child-safety-luggage-tag-qr-code-lost-transit": {
    "id": "child-safety-luggage-tag-qr-code-lost-transit",
    "title": "Child Safety / Luggage Tag",
    "fields": [
      {
        "id": "child-name",
        "label": "Child Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Leo Alexander"
      },
      {
        "id": "parent-name",
        "label": "Parent Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Liam Alexander"
      },
      {
        "id": "phone-number",
        "label": "Phone Number",
        "type": "tel",
        "required": true,
        "placeholder": "e.g. +1 555-0155"
      },
      {
        "id": "address",
        "label": "Address",
        "type": "textarea",
        "required": true,
        "placeholder": "e.g. Suite 404, Tech Park, Austin, TX"
      }
    ]
  },
  "blood-donor-contact-qr-code-emergency-transfusion": {
    "id": "blood-donor-contact-qr-code-emergency-transfusion",
    "title": "Blood Donor Contact",
    "fields": [
      {
        "id": "donor-name",
        "label": "Donor Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Rajesh Kumar"
      },
      {
        "id": "blood-group",
        "label": "Blood Group",
        "type": "select",
        "required": true,
        "placeholder": ""
      },
      {
        "id": "phone-number",
        "label": "Phone Number",
        "type": "tel",
        "required": true,
        "placeholder": "e.g. +91 98765-43210"
      },
      {
        "id": "city",
        "label": "City",
        "type": "text",
        "required": true,
        "placeholder": "e.g. New Delhi"
      },
      {
        "id": "emergency-contact",
        "label": "Emergency Contact",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Clara Miller - +1 555-0182"
      }
    ]
  },
  "hospital-appointment-link-qr-code-doctor-slots": {
    "id": "hospital-appointment-link-qr-code-doctor-slots",
    "title": "Hospital Appointment Link",
    "fields": [
      {
        "id": "hospital-name",
        "label": "Hospital Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. City General Hospital"
      },
      {
        "id": "appointment-url",
        "label": "Appointment Booking URL",
        "type": "url",
        "required": true,
        "placeholder": "https://citygeneral.com/book-slot",
        "validation": "url"
      },
      {
        "id": "department",
        "label": "Department",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Cardiology"
      },
      {
        "id": "doctor-name",
        "label": "Doctor Name (Optional)",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Dr. Liam Alexander"
      }
    ]
  },
  "pharmacy-prescription-upload-qr-code-medical": {
    "id": "pharmacy-prescription-upload-qr-code-medical",
    "title": "Pharmacy Prescription Upload",
    "fields": [
      {
        "id": "pharmacy-name",
        "label": "Pharmacy Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Wellness Pharmacy"
      },
      {
        "id": "upload-url",
        "label": "Upload Portal URL",
        "type": "url",
        "required": true,
        "placeholder": "https://wellnesspharmacy.com/upload-rx",
        "validation": "url"
      },
      {
        "id": "patient-name",
        "label": "Patient Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Liam Alexander"
      },
      {
        "id": "contact-number",
        "label": "Contact Number",
        "type": "tel",
        "required": true,
        "placeholder": "e.g. +1 555-0199"
      }
    ]
  },
  "wheelchair-disability-access-qr-code-civic-rights": {
    "id": "wheelchair-disability-access-qr-code-civic-rights",
    "title": "Wheelchair / Disability",
    "fields": [
      {
        "id": "location-name",
        "label": "Location / Venue Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Central Library Entrance"
      },
      {
        "id": "assistance-number",
        "label": "Assistance Phone Number",
        "type": "tel",
        "required": true,
        "placeholder": "e.g. +1 555-0105"
      },
      {
        "id": "guide-url",
        "label": "Accessibility Guide URL (Optional)",
        "type": "url",
        "required": true,
        "placeholder": "https://library.city.gov/access-map",
        "validation": "url"
      },
      {
        "id": "notes",
        "label": "Access Notes",
        "type": "textarea",
        "required": true,
        "placeholder": "e.g. Ramp is located on the west side of the building."
      }
    ]
  },
  "dietary-restrictions-allergy-qr-code-health-alerts": {
    "id": "dietary-restrictions-allergy-qr-code-health-alerts",
    "title": "Dietary Restrictions / Allergy",
    "fields": [
      {
        "id": "person-name",
        "label": "Person Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Liam Alexander"
      },
      {
        "id": "restrictions",
        "label": "Dietary Restrictions / Allergies",
        "type": "textarea",
        "required": true,
        "placeholder": "e.g. Strictly Gluten-Free, Severe Peanut Allergy"
      },
      {
        "id": "emergency-contact",
        "label": "Emergency Contact",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Clara Miller - +1 555-0182"
      }
    ]
  },
  "covid-vax-certificate-qr-code-official-records": {
    "id": "covid-vax-certificate-qr-code-official-records",
    "title": "COVID / Vax Certificate",
    "fields": [
      {
        "id": "full-name",
        "label": "Full Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Rajesh Kumar"
      },
      {
        "id": "certificate-id",
        "label": "Certificate ID",
        "type": "text",
        "required": true,
        "placeholder": "e.g. VAC-9876543-A"
      },
      {
        "id": "vaccine-type",
        "label": "Vaccine Type / Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Covishield / Pfizer-BioNTech"
      },
      {
        "id": "doses-taken",
        "label": "Doses Taken",
        "type": "select",
        "required": true,
        "placeholder": ""
      }
    ]
  },
  "first-aid-instructions-pdf-qr-code-survival-manual": {
    "id": "first-aid-instructions-pdf-qr-code-survival-manual",
    "title": "First Aid Instructions PDF",
    "fields": [
      {
        "id": "guideline-title",
        "label": "Guideline / Kit Title",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Workplace First Aid Plan"
      },
      {
        "id": "pdf-url",
        "label": "Instructions PDF URL",
        "type": "url",
        "required": true,
        "placeholder": "https://redcross.org/first-aid-instructions.pdf",
        "validation": "url"
      },
      {
        "id": "emergency-number",
        "label": "Emergency Phone Number",
        "type": "tel",
        "required": true,
        "placeholder": "e.g. 911 / 112"
      }
    ]
  },
  "virtual-property-tour-360-qr-code-video": {
    "id": "virtual-property-tour-360-qr-code-video",
    "title": "Virtual Property Tour (360°)",
    "fields": [
      {
        "id": "property-title",
        "label": "Property Name / Title",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Luxury Penthouse Suite"
      },
      {
        "id": "tour-url",
        "label": "Virtual Tour / Video URL",
        "type": "url",
        "required": true,
        "placeholder": "https://matterport.com/demo-tour-uuid",
        "validation": "url"
      },
      {
        "id": "price",
        "label": "Asking Price (Optional)",
        "type": "text",
        "required": true,
        "placeholder": "e.g. $1,250,000"
      },
      {
        "id": "agent-phone",
        "label": "Agent Phone Number",
        "type": "tel",
        "required": true,
        "placeholder": "e.g. +1 555-0155"
      }
    ]
  },
  "real-estate-agent-contact-qr-code-vcard": {
    "id": "real-estate-agent-contact-qr-code-vcard",
    "title": "Real Estate Agent Contact",
    "fields": [
      {
        "id": "agent-name",
        "label": "Agent Full Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Liam Alexander"
      },
      {
        "id": "agency-name",
        "label": "Agency / Brokerage Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Horizon Premium Realty"
      },
      {
        "id": "phone-number",
        "label": "Phone Number",
        "type": "tel",
        "required": true,
        "placeholder": "e.g. +1 555-0155"
      },
      {
        "id": "email-address",
        "label": "Email Address",
        "type": "email",
        "required": true,
        "placeholder": "e.g. liam@horizonrealty.com"
      },
      {
        "id": "website-url",
        "label": "Website URL",
        "type": "url",
        "required": true,
        "placeholder": "https://horizonrealty.com",
        "validation": "url"
      }
    ]
  },
  "property-brochure-pdf-qr-code-digital-flyer": {
    "id": "property-brochure-pdf-qr-code-digital-flyer",
    "title": "Property Brochure PDF",
    "fields": [
      {
        "id": "property-name",
        "label": "Property Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Oakridge Crest Condos"
      },
      {
        "id": "brochure-url",
        "label": "Brochure PDF URL",
        "type": "url",
        "required": true,
        "placeholder": "https://oakridgecrest.com/brochure.pdf",
        "validation": "url"
      },
      {
        "id": "contact-number",
        "label": "Contact Number",
        "type": "tel",
        "required": true,
        "placeholder": "e.g. +1 555-0155"
      },
      {
        "id": "agency-name",
        "label": "Agency Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Horizon Realty"
      }
    ]
  },
  "open-house-registration-qr-code-visitor-sign-in": {
    "id": "open-house-registration-qr-code-visitor-sign-in",
    "title": "Open House Registration",
    "fields": [
      {
        "id": "property-address",
        "label": "Property Address",
        "type": "text",
        "required": true,
        "placeholder": "e.g. 742 Evergreen Terrace, Springfield"
      },
      {
        "id": "registration-url",
        "label": "Registration Form URL",
        "type": "url",
        "required": true,
        "placeholder": "https://forms.gle/openhouse-reg",
        "validation": "url"
      },
      {
        "id": "event-date-time",
        "label": "Event Date & Time",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Saturday, Oct 14th @ 2:00 PM"
      },
      {
        "id": "agent-name",
        "label": "Hosting Agent Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. John Doe"
      }
    ]
  },
  "rent-payment-portal-qr-code-tenants": {
    "id": "rent-payment-portal-qr-code-tenants",
    "title": "Rent Payment Portal",
    "fields": [
      {
        "id": "landlord-or-property",
        "label": "Landlord or Property Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Apex Property Management"
      },
      {
        "id": "payment-url",
        "label": "Payment Portal/UPI URL",
        "type": "url",
        "required": true,
        "placeholder": "https://portal.apexproperties.com/rent",
        "validation": "url"
      },
      {
        "id": "tenant-unit",
        "label": "Tenant / Unit Number",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Unit 4B"
      },
      {
        "id": "amount-due",
        "label": "Amount Due (Optional)",
        "type": "text",
        "required": true,
        "placeholder": "e.g. $1,850"
      }
    ]
  },
  "car-dealership-test-drive-qr-code-automotive": {
    "id": "car-dealership-test-drive-qr-code-automotive",
    "title": "Car Dealership Test Drive",
    "fields": [
      {
        "id": "dealership-name",
        "label": "Dealership Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Apex Motors"
      },
      {
        "id": "vehicle-model",
        "label": "Vehicle Model",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Tesla Model 3 (2024)"
      },
      {
        "id": "booking-url",
        "label": "Test Drive Booking URL",
        "type": "url",
        "required": true,
        "placeholder": "https://apexmotors.com/book-test-drive",
        "validation": "url"
      },
      {
        "id": "sales-contact",
        "label": "Sales Contact",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Liam Alexander - +1 555-0155"
      }
    ]
  },
  "vehicle-service-record-qr-code-maintenance-logs": {
    "id": "vehicle-service-record-qr-code-maintenance-logs",
    "title": "Vehicle Service Record",
    "fields": [
      {
        "id": "vehicle-number",
        "label": "Vehicle Number",
        "type": "text",
        "required": true,
        "placeholder": "e.g. DL-1CA-1234"
      },
      {
        "id": "owner-name",
        "label": "Owner Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Rajesh Kumar"
      },
      {
        "id": "service-history-url",
        "label": "Service History URL",
        "type": "url",
        "required": true,
        "placeholder": "https://serviceportal.com/records/DL1CA1234",
        "validation": "url"
      },
      {
        "id": "garage-contact",
        "label": "Garage Contact",
        "type": "text",
        "required": true,
        "placeholder": "e.g. AutoTech Garage - +91 98765-43210"
      }
    ]
  },
  "emergency-roadside-assist-qr-code-towing-sos": {
    "id": "emergency-roadside-assist-qr-code-towing-sos",
    "title": "Emergency Roadside Assist",
    "fields": [
      {
        "id": "vehicle-number",
        "label": "Vehicle Number",
        "type": "text",
        "required": true,
        "placeholder": "e.g. MH-12-AB-1234"
      },
      {
        "id": "emergency-contact",
        "label": "Emergency Contact",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Tow Service - +91 91111-12222"
      },
      {
        "id": "insurance-number",
        "label": "Insurance Number",
        "type": "text",
        "required": true,
        "placeholder": "e.g. INS-9876543-X"
      },
      {
        "id": "assistance-url",
        "label": "Assistance URL",
        "type": "url",
        "required": true,
        "placeholder": "https://roadsidehelp.com/sos",
        "validation": "url"
      }
    ]
  },
  "used-car-listing-link-qr-code-buyer-specs": {
    "id": "used-car-listing-link-qr-code-buyer-specs",
    "title": "Used Car Listing Link",
    "fields": [
      {
        "id": "vehicle-model",
        "label": "Vehicle Model",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Honda Civic (2018)"
      },
      {
        "id": "listing-url",
        "label": "Listing URL",
        "type": "url",
        "required": true,
        "placeholder": "https://cars.com/listing-123456",
        "validation": "url"
      },
      {
        "id": "seller-name",
        "label": "Seller Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. John Doe"
      },
      {
        "id": "contact-number",
        "label": "Contact Number",
        "type": "tel",
        "required": true,
        "placeholder": "e.g. +1 555-0199"
      }
    ]
  },
  "parking-spot-payment-qr-code-instant-checkout": {
    "id": "parking-spot-payment-qr-code-instant-checkout",
    "title": "Parking Spot Payment",
    "fields": [
      {
        "id": "parking-name",
        "label": "Parking Name/Lot",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Downtown Central Plaza Parking"
      },
      {
        "id": "payment-url",
        "label": "Payment URL / Portal Link",
        "type": "url",
        "required": true,
        "placeholder": "https://parkpay.com/pay?lot=22B",
        "validation": "url"
      },
      {
        "id": "spot-number",
        "label": "Spot Number",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Lot B - Spot #42"
      },
      {
        "id": "contact-number",
        "label": "Contact Number",
        "type": "tel",
        "required": true,
        "placeholder": "e.g. +1 555-0111"
      }
    ]
  },
  "student-id-verification-qr-code-for-schools-colleges": {
    "id": "student-id-verification-qr-code-for-schools-colleges",
    "title": "Student ID Verification",
    "fields": [
      {
        "id": "student-name",
        "label": "Student Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Liam Alexander"
      },
      {
        "id": "student-id",
        "label": "Student ID / Roll No.",
        "type": "text",
        "required": true,
        "placeholder": "e.g. STU-2024-897"
      },
      {
        "id": "verification-url",
        "label": "Verification URL",
        "type": "url",
        "required": true,
        "placeholder": "https://schoolportal.edu/verify/stu-2024-897",
        "validation": "url"
      },
      {
        "id": "institution-name",
        "label": "Institution Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Stanford University"
      }
    ]
  },
  "classroom-attendance-form-qr-code-for-teachers": {
    "id": "classroom-attendance-form-qr-code-for-teachers",
    "title": "Classroom Attendance Form",
    "fields": [
      {
        "id": "class-name",
        "label": "Class Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Grade 10 - Section B"
      },
      {
        "id": "attendance-form-url",
        "label": "Attendance Form URL",
        "type": "url",
        "required": true,
        "placeholder": "https://forms.gle/classroom-attendance-id",
        "validation": "url"
      },
      {
        "id": "teacher-name",
        "label": "Teacher Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Clara Miller"
      },
      {
        "id": "subject",
        "label": "Subject / Topic",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Introduction to Calculus"
      }
    ]
  },
  "online-exam-quiz-link-qr-code-test-portals": {
    "id": "online-exam-quiz-link-qr-code-test-portals",
    "title": "Exam / Quiz Link",
    "fields": [
      {
        "id": "exam-name",
        "label": "Exam / Quiz Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Midterm Physics Evaluation"
      },
      {
        "id": "exam-url",
        "label": "Exam Portal URL",
        "type": "url",
        "required": true,
        "placeholder": "https://quiz.school.edu/start?id=phys-mid",
        "validation": "url"
      },
      {
        "id": "subject",
        "label": "Subject",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Physics"
      },
      {
        "id": "start-date",
        "label": "Start Date / Time",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Monday, Nov 12th @ 9:00 AM"
      }
    ]
  },
  "syllabus-study-material-pdf-qr-code-course-notes": {
    "id": "syllabus-study-material-pdf-qr-code-course-notes",
    "title": "Syllabus / Study Material PDF",
    "fields": [
      {
        "id": "course-name",
        "label": "Course Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. CS101: Introduction to Computer Science"
      },
      {
        "id": "pdf-url",
        "label": "Syllabus / Study Material PDF URL",
        "type": "url",
        "required": true,
        "placeholder": "https://school.edu/courses/cs101/syllabus.pdf",
        "validation": "url"
      },
      {
        "id": "instructor-name",
        "label": "Instructor Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Dr. Liam Alexander"
      }
    ]
  },
  "event-ticket-registration-qr-code-admissions": {
    "id": "event-ticket-registration-qr-code-admissions",
    "title": "Event Ticket Registration",
    "fields": [
      {
        "id": "event-name",
        "label": "Event Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Annual Tech Conference 2024"
      },
      {
        "id": "registration-url",
        "label": "Registration URL",
        "type": "url",
        "required": true,
        "placeholder": "https://conf.com/tickets/register",
        "validation": "url"
      },
      {
        "id": "date",
        "label": "Event Date",
        "type": "text",
        "required": true,
        "placeholder": "e.g. October 15-17, 2024"
      },
      {
        "id": "venue",
        "label": "Venue / Location",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Convention Center, Hall A"
      }
    ]
  },
  "wedding-rsvp-form-qr-code-digital-invites": {
    "id": "wedding-rsvp-form-qr-code-digital-invites",
    "title": "Wedding RSVP Form",
    "fields": [
      {
        "id": "bride-name",
        "label": "Bride Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Clara Miller"
      },
      {
        "id": "groom-name",
        "label": "Groom Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Liam Alexander"
      },
      {
        "id": "wedding-date",
        "label": "Wedding Date",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Saturday, Oct 14th, 2024"
      },
      {
        "id": "venue",
        "label": "Venue / Location",
        "type": "text",
        "required": true,
        "placeholder": "e.g. St. Patrick's Cathedral, Austin, TX"
      },
      {
        "id": "rsvp-url",
        "label": "RSVP URL / Link",
        "type": "url",
        "required": true,
        "placeholder": "https://claraandliam.wedding/rsvp",
        "validation": "url"
      }
    ]
  },
  "event-itinerary-schedule-qr-code-timelines": {
    "id": "event-itinerary-schedule-qr-code-timelines",
    "title": "Event Itinerary / Schedule",
    "fields": [
      {
        "id": "event-name",
        "label": "Event Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Annual Music Festival"
      },
      {
        "id": "schedule-pdf-url",
        "label": "Schedule PDF URL",
        "type": "url",
        "required": true,
        "placeholder": "https://musicfest.com/schedule.pdf",
        "validation": "url"
      },
      {
        "id": "date",
        "label": "Event Date",
        "type": "text",
        "required": true,
        "placeholder": "e.g. October 15-17, 2024"
      },
      {
        "id": "venue",
        "label": "Venue / Location",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Central Park Amphitheater"
      }
    ]
  },
  "charity-donation-page-qr-code-fundraisers": {
    "id": "charity-donation-page-qr-code-fundraisers",
    "title": "Charity / Donation Page",
    "fields": [
      {
        "id": "charity-name",
        "label": "Charity Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Hope Worldwide Foundation"
      },
      {
        "id": "donation-url",
        "label": "Donation URL / Portal Link",
        "type": "url",
        "required": true,
        "placeholder": "https://hopeww.org/donate",
        "validation": "url"
      },
      {
        "id": "contact-number",
        "label": "Contact Number",
        "type": "tel",
        "required": true,
        "placeholder": "e.g. +1 555-0133"
      },
      {
        "id": "website",
        "label": "Website",
        "type": "url",
        "required": true,
        "placeholder": "https://hopeww.org",
        "validation": "url"
      }
    ]
  },
  "event-photo-gallery-link-qr-code-images-share": {
    "id": "event-photo-gallery-link-qr-code-images-share",
    "title": "Event Photo Gallery Link",
    "fields": [
      {
        "id": "event-name",
        "label": "Event Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Annual Tech Summit"
      },
      {
        "id": "gallery-url",
        "label": "Gallery URL",
        "type": "url",
        "required": true,
        "placeholder": "https://flickr.com/photos/tech-summit-2024",
        "validation": "url"
      },
      {
        "id": "date",
        "label": "Event Date",
        "type": "text",
        "required": true,
        "placeholder": "e.g. October 15, 2024"
      }
    ]
  },
  "webinar-registration-qr-code-zoom-access": {
    "id": "webinar-registration-qr-code-zoom-access",
    "title": "Webinar Registration",
    "fields": [
      {
        "id": "webinar-name",
        "label": "Webinar Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Masterclass on AI Trends"
      },
      {
        "id": "registration-url",
        "label": "Registration URL",
        "type": "url",
        "required": true,
        "placeholder": "https://zoom.us/webinar/register/id",
        "validation": "url"
      },
      {
        "id": "speaker-name",
        "label": "Speaker Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Clara Miller"
      },
      {
        "id": "date",
        "label": "Webinar Date & Time",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Wednesday, Sep 20th @ 3:00 PM EST"
      }
    ]
  },
  "gym-fitness-app-check-in-qr-code-scanner": {
    "id": "gym-fitness-app-check-in-qr-code-scanner",
    "title": "Gym / Fitness App Check-in",
    "fields": [
      {
        "id": "gym-name",
        "label": "Gym Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Iron & Fitness Club"
      },
      {
        "id": "check-in-url",
        "label": "Check-in URL",
        "type": "url",
        "required": true,
        "placeholder": "https://gymportal.com/checkin/iron-club",
        "validation": "url"
      },
      {
        "id": "membership-id",
        "label": "Membership ID",
        "type": "text",
        "required": true,
        "placeholder": "e.g. MEM-98745"
      },
      {
        "id": "contact-number",
        "label": "Contact Number",
        "type": "tel",
        "required": true,
        "placeholder": "e.g. +1 555-0182"
      }
    ]
  },
  "secret-message-love-note-qr-code-hidden-text": {
    "id": "secret-message-love-note-qr-code-hidden-text",
    "title": "Secret Message / Love Note",
    "fields": [
      {
        "id": "secret-message",
        "label": "Secret Message",
        "type": "textarea",
        "required": true,
        "placeholder": "e.g. Meet me at 8 PM at the corner cafe..."
      },
      {
        "id": "password",
        "label": "Password (Optional)",
        "type": "text",
        "required": true,
        "placeholder": "e.g. MyPassword123"
      },
      {
        "id": "expiry-date",
        "label": "Expiry Date",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Valid until Oct 31, 2024"
      }
    ]
  },
  "smart-home-device-setup-qr-code-configuration": {
    "id": "smart-home-device-setup-qr-code-configuration",
    "title": "Smart Home Device Setup",
    "fields": [
      {
        "id": "device-name",
        "label": "Device Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Philips Hue Smart Bridge"
      },
      {
        "id": "setup-url",
        "label": "Setup URL",
        "type": "url",
        "required": true,
        "placeholder": "https://setup.meethue.com/bridge",
        "validation": "url"
      },
      {
        "id": "wifi-name",
        "label": "WiFi Name (SSID)",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Home_Network"
      },
      {
        "id": "support-url",
        "label": "Support URL / Manual",
        "type": "url",
        "required": true,
        "placeholder": "https://meethue.com/support/docs.pdf",
        "validation": "url"
      }
    ]
  },
  "guest-network-wifi-qr-code-for-office-visitors": {
    "id": "guest-network-wifi-qr-code-for-office-visitors",
    "title": "Guest Network WiFi",
    "fields": [
      {
        "id": "wifi-name",
        "label": "WiFi Name (SSID)",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Guest_WiFi"
      },
      {
        "id": "password",
        "label": "Password",
        "type": "text",
        "required": true,
        "placeholder": "e.g. guestpwd987"
      },
      {
        "id": "encryption",
        "label": "Encryption Type",
        "type": "select",
        "required": true,
        "placeholder": ""
      },
      {
        "id": "expiry-note",
        "label": "Expiry Note",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Expires end of day / 24 hours"
      }
    ]
  },
  "recipe-link-qr-code-cooking-instructions-packaging": {
    "id": "recipe-link-qr-code-cooking-instructions-packaging",
    "title": "Recipe Link",
    "fields": [
      {
        "id": "recipe-name",
        "label": "Recipe Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Classic Chocolate Chip Cookies"
      },
      {
        "id": "recipe-url",
        "label": "Recipe URL",
        "type": "url",
        "required": true,
        "placeholder": "https://cooking.com/recipes/chocolate-chip-cookies",
        "validation": "url"
      },
      {
        "id": "author-name",
        "label": "Author Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Clara Miller"
      }
    ]
  },
  "book-review-goodreads-qr-code-author-promo": {
    "id": "book-review-goodreads-qr-code-author-promo",
    "title": "Book Review / Goodreads",
    "fields": [
      {
        "id": "book-name",
        "label": "Book Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. The Great Gatsby"
      },
      {
        "id": "review-url",
        "label": "Review URL",
        "type": "url",
        "required": true,
        "placeholder": "https://goodreads.com/book/show/12345/reviews",
        "validation": "url"
      },
      {
        "id": "author-name",
        "label": "Author Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. F. Scott Fitzgerald"
      }
    ]
  },
  "music-band-album-launch-qr-code-streaming-links": {
    "id": "music-band-album-launch-qr-code-streaming-links",
    "title": "Music Band Album Launch",
    "fields": [
      {
        "id": "album-name",
        "label": "Album Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Echoes of Silence"
      },
      {
        "id": "streaming-url",
        "label": "Streaming URL",
        "type": "url",
        "required": true,
        "placeholder": "https://spotify.link/album-echoes",
        "validation": "url"
      },
      {
        "id": "artist-name",
        "label": "Artist Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Echoes Band"
      },
      {
        "id": "release-date",
        "label": "Release Date",
        "type": "text",
        "required": true,
        "placeholder": "e.g. October 15, 2024"
      }
    ]
  },
  "podcast-episode-link-qr-code-spotify-apple": {
    "id": "podcast-episode-link-qr-code-spotify-apple",
    "title": "Podcast Episode Link",
    "fields": [
      {
        "id": "podcast-name",
        "label": "Podcast Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Modern Developer Talks"
      },
      {
        "id": "episode-url",
        "label": "Episode URL",
        "type": "url",
        "required": true,
        "placeholder": "https://apple.co/podcasts/devtalks-12",
        "validation": "url"
      },
      {
        "id": "host-name",
        "label": "Host Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Clara Miller"
      }
    ]
  },
  "resume-cv-link-qr-code-job-applications": {
    "id": "resume-cv-link-qr-code-job-applications",
    "title": "Resume / CV Link",
    "fields": [
      {
        "id": "full-name",
        "label": "Full Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Liam Alexander"
      },
      {
        "id": "resume-pdf-url",
        "label": "Resume PDF URL",
        "type": "url",
        "required": true,
        "placeholder": "https://liamresume.com/cv.pdf",
        "validation": "url"
      },
      {
        "id": "linkedin-url",
        "label": "LinkedIn URL",
        "type": "url",
        "required": true,
        "placeholder": "https://linkedin.com/in/liamalexander",
        "validation": "url"
      },
      {
        "id": "email",
        "label": "Email",
        "type": "email",
        "required": true,
        "placeholder": "e.g. liam@example.com"
      },
      {
        "id": "phone-number",
        "label": "Phone Number",
        "type": "tel",
        "required": true,
        "placeholder": "e.g. +1 555-0155"
      }
    ]
  },
  "portfolio-github-behance-qr-code-designers": {
    "id": "portfolio-github-behance-qr-code-designers",
    "title": "Portfolio / GitHub / Behance",
    "fields": [
      {
        "id": "full-name",
        "label": "Full Name",
        "type": "text",
        "required": true,
        "placeholder": "e.g. Clara Miller"
      },
      {
        "id": "portfolio-url",
        "label": "Portfolio URL",
        "type": "url",
        "required": true,
        "placeholder": "https://claramiller.design",
        "validation": "url"
      },
      {
        "id": "github-url",
        "label": "GitHub URL",
        "type": "url",
        "required": true,
        "placeholder": "https://github.com/claramiller",
        "validation": "url"
      },
      {
        "id": "behance-url",
        "label": "Behance URL",
        "type": "url",
        "required": true,
        "placeholder": "https://behance.net/claramiller",
        "validation": "url"
      },
      {
        "id": "linkedin-url",
        "label": "LinkedIn URL",
        "type": "url",
        "required": true,
        "placeholder": "https://linkedin.com/in/claramiller",
        "validation": "url"
      },
      {
        "id": "email",
        "label": "Email",
        "type": "email",
        "required": true,
        "placeholder": "e.g. clara@example.com"
      }
    ]
  }
};

export function getResolvedFieldsForTool(tool: any): Field[] {
  const form = FORMS_DATABASE[tool.id];
  return form ? form.fields : [];
}

export function generateQRStringForTool(tool: any, formValues: Record<string, string>): string {
  const fields = getResolvedFieldsForTool(tool);
  if (!fields || fields.length === 0) {
    return 'https://ezqr.io';
  }

  // Check if it's WiFi
  if (fields.some(f => f.validation === 'wifi' || f.id.includes('wifi') || f.id.includes('ssid'))) {
    const ssid = formValues['in-wifi-ssid'] || '';
    const pass = formValues['in-wifi-pass'] || '';
    return `WIFI:S:${ssid};P:${pass};;`;
  }

  // Check if it's Contact (vCard)
  if (fields.some(f => f.validation === 'contact' || f.id.includes('contact') || f.id.includes('name'))) {
    const name = formValues['in-contact-name'] || '';
    const phone = formValues['in-contact-phone'] || '';
    const email = formValues['in-contact-email'] || '';
    return `BEGIN:VCARD\nVERSION:3.0\nFN:${name}\nTEL:${phone}\nEMAIL:${email}\nEND:VCARD`;
  }

  // Check if it's Crypto
  if (fields.some(f => f.validation === 'crypto' || f.id.includes('crypto') || f.id.includes('addr'))) {
    const addr = formValues['in-crypto-addr'] || '';
    const amt = formValues['in-crypto-amt'] || '';
    return amt ? `${addr}?amount=${amt}` : addr;
  }

  // Check if it's Map / GPS
  if (fields.some(f => f.validation === 'map' || f.id.includes('map') || f.id.includes('lat'))) {
    const lat = formValues['in-map-lat'] || '';
    const lng = formValues['in-map-lng'] || '';
    return `geo:${lat},${lng}`;
  }

  // Check if it's UPI Payment
  if (fields.some(f => f.validation === 'upi' || f.id.includes('upi') || f.id.includes('vpa'))) {
    const vpa = formValues['in-upi-vpa'] || '';
    const name = formValues['in-upi-name'] || '';
    const amt = formValues['in-upi-amt'] || '';
    return `upi://pay?pa=${vpa}&pn=${encodeURIComponent(name)}&am=${amt}&cu=INR`;
  }

  // Default: if there's more than one field, return a beautifully structured multi-line text layout containing all entered fields
  if (fields.length > 1) {
    const lines = fields
      .map(f => {
        const val = (formValues[f.id] || '').trim();
        return val ? `${f.label}: ${val}` : '';
      })
      .filter(Boolean);
    if (lines.length > 0) {
      return lines.join('\\n');
    }
  }

  // Otherwise, find the first field with 'url' or 'text', or just return the first entered form value!
  const urlField = fields.find(f => f.type === 'url' || f.id.includes('url') || f.id.includes('link') || f.id === 'target-url');
  if (urlField) {
    const val = formValues[urlField.id]?.trim();
    if (val) return val;
  }

  // Fallback: look for ANY non-empty form value in formValues
  const firstFilled = Object.keys(formValues).find(k => formValues[k] && formValues[k].trim() !== '');
  if (firstFilled) return formValues[firstFilled].trim();

  // If absolutely nothing is typed, return a default nice URL
  return `https://ezqr.io/${tool.slug}`;
}
