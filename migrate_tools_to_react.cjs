const fs = require('fs');
const path = require('path');
const cfg = require('./tools-config.cjs');

// Categories lookup and mapping
const categories = [
  'Technical & Math',
  'Cyber Security & Privacy',
  'Cultural & Festive',
  'Emotional & Safety',
  'B2B & Compliance',
  'India Regional & Civic',
  'Education & Events',
  'Crypto & Payments',
  'Restaurant & Hospitality',
  'Healthcare & Medical',
  'Real Estate & Auto',
  'Utilities & Daily Life'
];

function getToolType(fields = []) {
  if (fields.some(f => f.guard === 'wifi')) return 'wifi';
  if (fields.some(f => f.guard === 'contact')) return 'vcard';
  if (fields.some(f => f.guard === 'crypto')) return 'crypto';
  if (fields.some(f => f.guard === 'map')) return 'geo';
  if (fields.some(f => f.guard === 'upi')) return 'url'; // UPI link is upi:// which is a url
  if (fields.some(f => f.guard === 'text')) return 'text';
  return 'url';
}

function getHindi(name, desc) {
  let title = name + " क्यूआर कोड";
  if (name.includes("Mandelbrot")) {
    title = "मैंडेलब्रॉट फ्रैक्टल मैट्रिक्स क्यूआर";
  } else if (name.includes("Fibonacci")) {
    title = "गणितीय फाइबोनैचि सर्पिल क्यूआर";
  } else if (name.includes("Sierpinski")) {
    title = "सिएरपिंस्की त्रिकोण क्यूआर कोड";
  } else if (name.includes("PCB")) {
    title = "सर्किट बोर्ड पीसीबी ट्रेस क्यूआर";
  } else if (name.includes("Vinyl")) {
    title = "विनाइल रिकॉर्ड क्यूआर कोड";
  } else if (name.includes("vCard")) {
    title = "डिजिटल वीकार्ड बिज़नेस क्यूआर";
  } else if (name.includes("WiFi") || name.includes("Wi-Fi")) {
    title = "वाईफाई नेटवर्क पासवर्ड क्यूआर";
  } else if (name.includes("UPI")) {
    title = "यूपीआई भुगतान क्यूआर कोड";
  } else if (name.includes("Menu") || name.includes("Restaurant")) {
    title = "रेस्तरां डिजिटल मेनू कार्ड क्यूआर";
  } else if (name.includes("Wedding")) {
    title = "शादी आमंत्रण (RSVP) क्यूआर";
  } else if (name.includes("Airbnb")) {
    title = "एयरबीएनबी वेलकम बुकलेट क्यूआर";
  } else if (name.includes("Crypto")) {
    title = "क्रिप्टो वॉयलेट एड्रेस क्यूआर";
  } else if (name.includes("Solana")) {
    title = "सोलाना (SOL) एड्रेस क्यूआर";
  } else if (name.includes("Tether") || name.includes("USDT")) {
    title = "टीथर (USDT) वॉलेट एड्रेस क्यूआर";
  }

  const shortHDesc = `EzQR द्वारा निःशुल्क और स्थायी ${name} क्यूआर कोड प्राप्त करें। सुरक्षित और तीव्र।`;
  return { title, desc: shortHDesc };
}

function getCategorySpecifics(cat, name) {
  const c = (cat || '').toLowerCase();
  
  if (c.includes('math') || c.includes('tech') || c.includes('cyber') || c.includes('privacy') || c.includes('security')) {
    return {
      useCases: [
        `Academic and Classroom Labs: Print custom mathematical formula QR icons direct on homework worksheets or textbook margins.`,
        `Secure Local Backups: Encrypt and safeguard complex offline 2FA backup seed strings on secure paper records.`,
        `Direct Portal Access: Link directly to complex 3D calculators, geometric visualizers, or dynamic matrix solutions.`
      ],
      benefits: [
        `Precise Matrix Resolution: Handles intricate geometric fractal and formula curves with zero pixel distortion.`,
        `100% Offline Generation: Generates credentials locally inside your browser memory for maximum hardware security.`,
        `Clean High-Contrast Vectors: Sharp edge rendering ensures camera lenses resolve high-density formulas instantly.`
      ],
      bestPractices: [
        `Ensure Ultra-Contrast: Keep vector parameters highly dark on pure, solid lightweight default white backgrounds.`,
        `Label Code Clearly: Add a visible caption like "Scan for 3D Molecular Model" to help students navigate topics.`,
        `Single-Surface Placement: Mount on smooth, non-reflective labels to prevent laser reflection distortions.`
      ]
    };
  }

  if (c.includes('cultural') || c.includes('festive') || c.includes('event') || c.includes('education')) {
    return {
      useCases: [
        `Wedding invitations and RSVPs: Print custom romantic themed cards directing family instantly to Google RSVP forms.`,
        `Exhibition and Monument Walks: Guide tourists and art gallery lovers to audio narration pages on physical plaques.`,
        `Live Festival Schedule: Access band line-ups, temple schedules, and seat maps with a single simple scan.`
      ],
      benefits: [
        `Highly Elegant Theme Match: Beautiful custom Sakura, Sumi-e or festive patterns match invite stationery.`,
        `Zero Scan Caps: Welcome unlimited family and guests without worrying about arbitrary monthly limits.`,
        `Universal Standard Access: Easily scanned by guest-facing Android cameras and iOS systems on-the-spot.`
      ],
      bestPractices: [
        `Integrate Clear Banners: Add an invitation label like "Scan to RSVP" to boost engagement.`,
        `Double-Verify Targets: Ensure wedding lists or RSVP web resources remain active throughout the event season.`,
        `Paper Quality Selection: Print on matte and thick linen stocks to avoid glare on camera lens sensors.`
      ]
    };
  }

  if (c.includes('restaurant') || c.includes('hospitality')) {
    return {
      useCases: [
        `Acrylic Table Tent Standees: Let guests scan custom QR frames at their seats to review digital dining menus instantly.`,
        `Takeaway Box Branding: Print codes on delivery packaging to share social pages or direct Zomato platforms.`,
        `Contactless Waiter Calling: Enable rapid self-checkout links and waiter help table buttons without paper clutter.`
      ],
      benefits: [
        `Save Printing Operating Costs: Update your digital menu backend links anytime without reprinting expensive cardstock.`,
        `Frictionless Guest Experience: No app downloads or cumbersome manual URL typing required for food ordering.`,
        `Hygienic Dining Operations: Reduces material touching and physical menu maintenance on table surfaces.`
      ],
      bestPractices: [
        `Laminate for Durability: Protect tabletop codes with non-glossy, water-resistant shields.`,
        `Incorporate Dining CTA: Add friendly messages like "Scan to Browse Today's Kitchen Specials".`,
        `Optimal Counter Sizing: Keep stand labels at least 5cm square so customers can scan from comfortable seating angles.`
      ]
    };
  }

  if (c.includes('real estate') || c.includes('auto')) {
    return {
      useCases: [
        `Window Display Sheets: Place high-resolution QR formats on agency glass to link buyers directly to 360 virtual tours.`,
        `Dashboards and Maintenance Tags: Tag dealer vehicles or rental assets with fast service report history gateways.`,
        `Outdoor Sale Signage: Place strong rustproof weather indicators on front yards for instant floorplan inspection.`
      ],
      benefits: [
        `Uncapped Lead Potential: Drive traffic perpetually to active listings with zero monthly maintenance bills.`,
        `Seamless Mobile Brokerage: Instantly open video flyers, maps, or broker contacts inside potential buyers' hands.`,
        `No Third-Party Intermediaries: Connect users directly to your own self-hosted real estate listings.`
      ],
      bestPractices: [
        `Scale For Sidewalk Scandability: Print window display QR codes at least 12cm wide for comfortable sidewalk scanning.`,
        `Callout to Action: Label precisely with words like "Scan to Take a 3D Interactive Video Tour".`,
        `Maintain Link Cleanliness: Always double check target properties are not redirected to invalid landing portals.`
      ]
    };
  }

  if (c.includes('crypto') || c.includes('payment') || c.includes('b2b') || c.includes('compliance')) {
    return {
      useCases: [
        `Receipt and Invoice Bill tags: Add UPI or crypto gateway QR codes in the margins for immediate checkout.`,
        `Product Authenticity Certificates: Guard against counterfeit products with tamper-resistant packaging codes.`,
        `Industrial OSHA SDS Sheets: Fast-track chemical safety data lookups by placing markers on chemical drum labels.`
      ],
      benefits: [
        `Instant Wallet Loading: Bypasses manual copy-pasting of long 42-char wallet addresses to prevent errors.`,
        `Frictionless Micro-Donations: Enables instant peer-to-peer bank transfers with zero intermediary setups.`,
        `Strict Local Compliance: No financial data or secret payment variables are ever transmitted to external servers.`
      ],
      bestPractices: [
        `Mandatory Code Verification: Scan the printed code multiple times with active wallets before requesting transactions.`,
        `Include Payment Brand Badges: Frame with small visual guides like "Accepting UPI / Bitcoin" for trust.`,
        `Keep Quiet Zones Clear: Maintain generous padding margins around outer brackets for rapid cashier parsing.`
      ]
    };
  }

  if (c.includes('medical') || c.includes('health') || c.includes('safety') || c.includes('emotional')) {
    return {
      useCases: [
        `Emergency Medical Smart ID: Print vital info contacts on wristbands, keychains, or pet collar identification tags.`,
        `Prescription Dosage Reminders: Tag medicine bottle caps with fast medication timetable alerts.`,
        `First Aid Station Manuals: Link directly to offline emergency rescue guide PDFs on cabinet doors.`
      ],
      benefits: [
        `Lifesaving Speed: Offers instant access to critical emergency contact details or allergies in vital seconds.`,
        `Standard Offline Reliability: Functional during cell signal failures because data is written directly to the pattern.`,
        `Absolute Data Confidentiality: No medical history or personal database is saved in centralized clouds.`
      ],
      bestPractices: [
        `High-Visibility Contrast: Use high-contrast color choices like crimson or deep navy to guarantee recognition.`,
        `Laminate Critical Badges: Ensure emergency keychains are waterproof and scratch-protected.`,
        `Simple Instruction Text: Print a clear message next to the code such as "Scan in Emergency for Key Info".`
      ]
    };
  }

  return {
    useCases: [
      `Printed Marketing Materials: Embed codes on flyers, business cards, or brochures to bridge offline-to-online traffic.`,
      `Instant Account Profiles: Share dynamic professional resumés, portfolio pages, or personal contact business cards gracefully.`,
      `Smart Home Device Setup: Streamline configuration guidelines by attaching setups directly to hardware hulls.`
    ],
    benefits: [
      `100% Permanence guaranteed: Encoded static data remains functional indefinitely without ever expiring.`,
      `Secure Device Execution: No user form parameters or private inputs are ever transmitted to our cloud servers.`,
      `Maximized Scanning Range: Rendered in perfect mathematical SVG grids for effortless smartphone camera capture.`
    ],
    bestPractices: [
      `Maintain Outer Borders: Retain safe spacing (quiet zones) around the outer grid boundaries for easy scanning.`,
      `Add Strong Callouts: Accompany codes with brief instructions like "Scan to View Professional Showcase".`,
      `Test Multiple Lenses: Ensure perfect legibility on both low-light mobile lenses and flagship camera models.`
    ]
  };
}

const tools = [];
const forms = {};
const toolContent = {};
const faqs = {};
const related = {};

let index = 0;
for (const [key, t] of Object.entries(cfg)) {
  const type = getToolType(t.fields);
  const hindi = getHindi(t.name, t.metaDesc);

  // 1. QRTool record
  tools.push({
    id: key,
    name: t.name,
    slug: key,
    category: t.cat || 'Utilities & Daily Life',
    isHighTraffic: index < 15,
    keywords: [
      t.name.toLowerCase().replace(/[^a-z0-9 ]/g, ''),
      ...(t.badges || []).map(b => b.replace(/[^a-zA-Z]/g, '').toLowerCase()),
      'qr generator',
      'vector qr'
    ].filter(Boolean),
    description: t.metaDesc || '',
    hindiTitle: hindi.title,
    hindiDesc: hindi.desc,
    type: type
  });

  // 2. Forms record
  forms[key] = {
    id: key,
    title: t.name,
    fields: (t.fields || []).map(f => ({
      id: f.id,
      label: f.label,
      type: f.type || 'text',
      required: true,
      placeholder: f.placeholder || '',
      validation: f.guard || undefined
    }))
  };

  const specifics = getCategorySpecifics(t.cat, t.name);

  // 3. ToolContent record
  toolContent[key] = {
    id: key,
    seoTitle: t.metaTitle || `${t.name} Generator | Free Permanent QR Suite`,
    metaDescription: t.metaDesc || '',
    heroTitle: t.h1Title || t.name,
    heroSubtitle: t.metaDesc || '',
    useCases: specifics.useCases,
    benefits: specifics.benefits,
    bestPractices: specifics.bestPractices
  };

  // 4. FAQs record
  faqs[key] = (t.faqs || []).map((faq, idx) => ({
    id: `${key}-faq-${idx}`,
    question: faq.q,
    answer: faq.a
  }));

  // 5. Related record
  related[key] = {
    id: key,
    relatedIds: (t.related || []).map(r => r.path ? r.path.replace(/^\//, '') : '').filter(Boolean)
  };

  index++;
}

// Write outputs to TypeScript files!
const dataDir = path.join(__dirname, 'src', 'data');

// Tools file
const toolsContent = `export interface QRTool {
  id: string;
  name: string;
  slug: string;
  category: string;
  isHighTraffic: boolean;
  keywords: string[];
  description: string;
  hindiTitle: string;
  hindiDesc: string;
  type: 'url' | 'wifi' | 'text' | 'crypto' | 'vcard' | 'mecard' | 'email' | 'sms' | 'phone' | 'geo' | 'whatsapp' | 'event' | 'social';
}

export const CATEGORIES = ${JSON.stringify(categories, null, 2)} as const;

export const QR_TOOLS: QRTool[] = ${JSON.stringify(tools, null, 2)};
`;
fs.writeFileSync(path.join(dataDir, 'tools.ts'), toolsContent);

// Forms file
const formsContent = `import { Field, FormConfig } from './schemas';

export const FORMS_DATABASE: Record<string, FormConfig> = ${JSON.stringify(forms, null, 2)};

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
    return \`WIFI:S:\${ssid};P:\${pass};;\`;
  }

  // Check if it's Contact (vCard)
  if (fields.some(f => f.validation === 'contact' || f.id.includes('contact') || f.id.includes('name'))) {
    const name = formValues['in-contact-name'] || '';
    const phone = formValues['in-contact-phone'] || '';
    const email = formValues['in-contact-email'] || '';
    return \`BEGIN:VCARD\\nVERSION:3.0\\nFN:\${name}\\nTEL:\${phone}\\nEMAIL:\${email}\\nEND:VCARD\`;
  }

  // Check if it's Crypto
  if (fields.some(f => f.validation === 'crypto' || f.id.includes('crypto') || f.id.includes('addr'))) {
    const addr = formValues['in-crypto-addr'] || '';
    const amt = formValues['in-crypto-amt'] || '';
    return amt ? \`\${addr}?amount=\${amt}\` : addr;
  }

  // Check if it's Map / GPS
  if (fields.some(f => f.validation === 'map' || f.id.includes('map') || f.id.includes('lat'))) {
    const lat = formValues['in-map-lat'] || '';
    const lng = formValues['in-map-lng'] || '';
    return \`geo:\${lat},\${lng}\`;
  }

  // Check if it's UPI Payment
  if (fields.some(f => f.validation === 'upi' || f.id.includes('upi') || f.id.includes('vpa'))) {
    const vpa = formValues['in-upi-vpa'] || '';
    const name = formValues['in-upi-name'] || '';
    const amt = formValues['in-upi-amt'] || '';
    return \`upi://pay?pa=\${vpa}&pn=\${encodeURIComponent(name)}&am=\${amt}&cu=INR\`;
  }

  // Default: if there's more than one field, return a beautifully structured multi-line text layout containing all entered fields
  if (fields.length > 1) {
    const lines = fields
      .map(f => {
        const val = (formValues[f.id] || '').trim();
        return val ? \`\${f.label}: \${val}\` : '';
      })
      .filter(Boolean);
    if (lines.length > 0) {
      return lines.join('\\\\n');
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
  return \`https://ezqr.io/\${tool.slug}\`;
}
`;
fs.writeFileSync(path.join(dataDir, 'forms.ts'), formsContent);

// ToolContent file
const toolContentContent = `import { ToolContentConfig } from './schemas';

export const TOOL_CONTENT_DATABASE: Record<string, ToolContentConfig> = ${JSON.stringify(toolContent, null, 2)};
`;
fs.writeFileSync(path.join(dataDir, 'toolContent.ts'), toolContentContent);

// FAQs file
const faqsContent = `import { FAQItem } from './schemas';

export const FAQS_DATABASE: Record<string, FAQItem[]> = ${JSON.stringify(faqs, null, 2)};

export const DEFAULT_FAQ: FAQItem[] = [
  {
    id: 'gen-faq-1',
    question: 'How much do static QR codes cost to maintain?',
    answer: 'They are completely free. Once downloaded, static QR codes function independently of our services and can be scanned unlimited times without any expiry.'
  },
  {
    id: 'gen-faq-2',
    question: 'Do static QR codes expire or have scan limits?',
    answer: 'No. Because the content is encoded directly in the pattern itself, static codes work offline forever without ever expiring or having scan count caps.'
  }
];
`;
fs.writeFileSync(path.join(dataDir, 'faqs.ts'), faqsContent);

// RelatedTools file
const relatedContent = `import { RelatedToolsConfig } from './schemas';

export const RELATED_TOOLS_DATABASE: Record<string, RelatedToolsConfig> = ${JSON.stringify(related, null, 2)};
`;
fs.writeFileSync(path.join(dataDir, 'relatedTools.ts'), relatedContent);

console.log("Successfully generated all 100 tools datasets and written to src/data/ directory!");
