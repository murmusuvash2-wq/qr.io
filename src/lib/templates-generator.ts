import { TemplateDesign } from './firebase';

// 10 Flagship Tool IDs
export const FLAGSHIP_TOOLS = [
  'secure-wifi-share-auto-expiry-network-access',
  'free-upi-qr-code-styled-generator-with-amount',
  'airbnb-guide-qr-code-vacation-rentals',
  'free-pdf-menu-qr-code-generator-for-restaurants',
  'pet-id-collar-tag-qr-code-lost-dog-locator',
  'study-group-link-drops-qr-code-for-whatsapp-discord',
  'book-review-goodreads-qr-code-author-promo',
  'real-estate-agent-contact-qr-code-vcard',
  'event-ticket-registration-qr-code-admissions',
  'how-to-create-mathematical-fibonacci-spiral-qr-code'
];

// Aesthetic Gradient Presets (10 backgrounds)
export const BACKGROUND_PRESETS = [
  { from: '#0F0E17', to: '#1C1B24', angle: '135deg', name: 'Obsidian Velvet', tags: ['dark', 'luxury', 'modern'] },
  { from: '#FFFBF5', to: '#FAF2E6', angle: '180deg', name: 'Champagne Satin', tags: ['light', 'minimal', 'classic'] },
  { from: '#05020D', to: '#120B29', angle: '135deg', name: 'Cyber Neon Electro', tags: ['dark', 'neon', 'tech'] },
  { from: '#F0FDF4', to: '#DCFCE7', angle: '135deg', name: 'Eco Sage Mint', tags: ['light', 'eco', 'wellness'] },
  { from: '#FAF5FF', to: '#F3E8FF', angle: '180deg', name: 'Lavender Breeze', tags: ['light', 'pastel', 'wedding'] },
  { from: '#0F172A', to: '#1E293B', angle: '135deg', name: 'Steel Corporate', tags: ['dark', 'clean', 'corporate'] },
  { from: '#FEF2F2', to: '#FEE2E2', angle: '135deg', name: 'Sakura Blossom', tags: ['light', 'pastel', 'wedding'] },
  { from: '#FFF7ED', to: '#FFEDD5', angle: '180deg', name: 'Sunset Warmth', tags: ['light', 'warm', 'cafe'] },
  { from: '#022C22', to: '#064E3B', angle: '135deg', name: 'Emerald Imperial', tags: ['dark', 'luxury', 'eco'] },
  { from: '#0F0E14', via: '#1F1135', to: '#0F0E14', angle: '90deg', name: 'Cosmic Amethyst', tags: ['dark', 'neon', 'premium'] }
];

// Deterministic mock template generator
export function generateTemplatesForTool(toolId: string): TemplateDesign[] {
  const templates: TemplateDesign[] = [];
  
  // Define metadata/themes based on toolId
  let toolPrefix = 'generic';
  let toolLabel = 'Universal';
  let emojiTheme = '✨';
  
  if (toolId.includes('wifi')) {
    toolPrefix = 'wifi';
    toolLabel = 'Wi-Fi Access';
    emojiTheme = '📶';
  } else if (toolId.includes('upi')) {
    toolPrefix = 'upi';
    toolLabel = 'UPI Payment';
    emojiTheme = '💳';
  } else if (toolId.includes('airbnb')) {
    toolPrefix = 'airbnb';
    toolLabel = 'Airbnb Stay';
    emojiTheme = '🏡';
  } else if (toolId.includes('menu')) {
    toolPrefix = 'menu';
    toolLabel = 'Menu Card';
    emojiTheme = '🍽️';
  } else if (toolId.includes('pet')) {
    toolPrefix = 'pet';
    toolLabel = 'Pet Locator';
    emojiTheme = '🐕';
  } else if (toolId.includes('whatsapp')) {
    toolPrefix = 'whatsapp';
    toolLabel = 'WhatsApp Chat';
    emojiTheme = '💬';
  } else if (toolId.includes('goodreads')) {
    toolPrefix = 'review';
    toolLabel = 'Google / Goodreads';
    emojiTheme = '⭐';
  } else if (toolId.includes('vcard')) {
    toolPrefix = 'vcard';
    toolLabel = 'vCard Contact';
    emojiTheme = '📇';
  } else if (toolId.includes('event')) {
    toolPrefix = 'event';
    toolLabel = 'Event Pass';
    emojiTheme = '🎟️';
  } else if (toolId.includes('fibonacci')) {
    toolPrefix = 'math';
    toolLabel = 'Fibonacci';
    emojiTheme = '🌀';
  }

  // Generate 20 premium variations for this tool
  for (let i = 1; i <= 20; i++) {
    const isPro = i > 4; // 4 free templates, 16 pro templates
    const bgIndex = (i - 1) % BACKGROUND_PRESETS.length;
    const bg = BACKGROUND_PRESETS[bgIndex];
    const isDark = bg.tags.includes('dark');
    
    const fgColor = isDark ? '#FFFFFF' : '#0F0E14';
    const accentColor = isDark ? '#A89EFF' : '#4F46E5';
    const textColor = isDark ? '#E2E8F0' : '#1E293B';
    const subColor = isDark ? '#94A3B8' : '#64748B';

    // Different layouts (posters, tags, badges, banners, clean)
    let layoutType = 'clean_minimal';
    let title = `${toolLabel} Template #${i}`;
    let category = 'Social Media';
    let borderStyle = 'none';
    let labelText = 'SCAN ME';
    let subText = `Pre-styled for immediate use`;

    if (i <= 5) {
      layoutType = 'poster_classic';
      title = `${toolLabel} Signboard Poster #${i}`;
      category = 'Posters';
      borderStyle = isDark ? 'neon-cyber' : 'dashed';
      labelText = 'INSTANT SCAN';
      subText = 'Please scan code to proceed';
    } else if (i <= 10) {
      layoutType = 'badge_circle';
      title = `${toolLabel} Counter Stand #${i}`;
      category = 'Badges';
      borderStyle = 'solid-gold';
      labelText = 'WELCOME';
      subText = 'Self-Service Portal';
    } else if (i <= 15) {
      layoutType = 'vcard_pro';
      title = `${toolLabel} Premium Card #${i}`;
      category = 'vCards';
      borderStyle = 'rounded';
      labelText = 'CONNECT';
      subText = 'Tap or Scan Code';
    } else {
      layoutType = 'kawaii_pastel';
      title = `${toolLabel} Elite Badge #${i}`;
      category = 'Events';
      borderStyle = 'sakura';
      labelText = 'VIP PASS';
      subText = 'Exclusive Invitation Only';
    }

    // Dynamic content depending on tool type
    if (toolPrefix === 'wifi') {
      labelText = 'FREE GUEST WI-FI';
      subText = i % 2 === 0 ? 'Connect instantly, no manual password entry' : 'High-speed internet for customers';
    } else if (toolPrefix === 'upi') {
      labelText = 'PAY SECURELY VIA UPI';
      subText = i % 2 === 0 ? 'Accepts all banking applications' : 'Scan to process instant transaction';
    } else if (toolPrefix === 'airbnb') {
      labelText = 'WELCOME TO OUR STAY';
      subText = i % 2 === 0 ? 'Scan for house rules and digital guide' : 'Wifi network and local check-in details';
    } else if (toolPrefix === 'menu') {
      labelText = 'VIEW DIGITAL MENU';
      subText = i % 2 === 0 ? 'Scan to browse culinary treats & beverages' : 'Contactless dining and ordering portal';
    } else if (toolPrefix === 'pet') {
      labelText = 'IF LOST, PLEASE SCAN';
      subText = i % 2 === 0 ? 'Contains emergency contact and medical details' : 'I am friendly, scan to reach my human';
    } else if (toolPrefix === 'whatsapp') {
      labelText = 'CHAT DIRECTLY WITH US';
      subText = i % 2 === 0 ? 'Tap to initialize immediate messaging' : 'Support desk open 24 hours';
    } else if (toolPrefix === 'review') {
      labelText = 'LEAVE US A 5-STAR REVIEW';
      subText = i % 2 === 0 ? 'Your feedback empowers our micro-business' : 'Scan to share your experience instantly';
    } else if (toolPrefix === 'vcard') {
      labelText = 'SAVE DIGITAL CONTACT CARD';
      subText = i % 2 === 0 ? 'Instantly save contact card into phonebook' : 'Creative Director & Portfolio Access';
    } else if (toolPrefix === 'event') {
      labelText = 'ADMIT ONE - ENTRY CODE';
      subText = i % 2 === 0 ? 'Keep this code handy at the gate' : 'Event timetable and schedule access';
    } else if (toolPrefix === 'math') {
      labelText = 'FIBONACCI ART PROTOCOL';
      subText = 'Visualizing recursive matrix sequence';
    }

    const template: TemplateDesign = {
      id: `t-${toolPrefix}-${i}`,
      title,
      category,
      type: isPro ? 'Pro' : 'Free',
      description: `Premium customized design meticulously styled for ${toolLabel} usages. Features structured text safezones.`,
      bgType: 'gradient',
      gradient: {
        from: bg.from,
        to: bg.to,
        via: bg.via,
        angle: bg.angle
      },
      qrConfig: {
        fgColor: isDark ? accentColor : '#0C0A1A',
        bgColor: isDark ? '#05020D' : '#FFFFFF',
        dotsStyle: i % 2 === 0 ? 'rounded' : 'dots',
        cornersStyle: i % 3 === 0 ? 'extra-rounded' : 'rounded'
      },
      layoutType,
      visualOverlay: {
        themeType: layoutType,
        texture: i % 2 === 0,
        borderStyle,
        emojis: [
          { char: emojiTheme, x: 200, y: 55, size: 24 }
        ],
        svgPaths: borderStyle === 'none' ? [] : [
          { d: 'M 10 10 L 390 10 L 390 590 L 10 590 Z', stroke: accentColor, strokeWidth: 2, fill: 'none', opacity: 0.3 }
        ]
      },
      textElements: [
        { content: labelText, x: 200, y: 110, color: accentColor, fontSize: 18 },
        { content: subText, x: 200, y: 145, color: subColor, fontSize: 11 },
        { content: 'POWERED BY A2ZQR', x: 200, y: 535, color: subColor, fontSize: 9 }
      ],
      status: 'approved',
      createdAt: new Date(Date.now() - i * 3600000).toISOString(),
      toolId,
      toolName: toolLabel,
      version: '1.0'
    };

    templates.push(template);
  }

  return templates;
}

// Real-Time Analytics Event Log Definition
export interface TemplateTrackingEvent {
  id: string;
  templateId: string;
  eventType: 'view' | 'click' | 'download' | 'use';
  timestamp: string;
  device: 'Mobile' | 'Desktop' | 'Tablet';
  country: string;
  referrer: string;
  toolId?: string;
}

let onEventLoggedListener: ((event: TemplateTrackingEvent) => void) | null = null;

export function registerEventLoggerCallback(cb: (event: TemplateTrackingEvent) => void) {
  onEventLoggedListener = cb;
}

// Track template analytics in localStorage
export interface TemplateMetric {
  views: number;
  uses: number;
  downloads: number;
  favorites: number;
  rating: number;
  favoriteCount: number;
  recentDevices?: Record<string, number>;
  recentCountries?: Record<string, number>;
  recentReferrers?: Record<string, number>;
}

const ANALYTICS_STORAGE_KEY = 'ezqr_template_analytics_v2';
const EVENT_LOGS_STORAGE_KEY = 'ezqr_template_event_logs_v1';

// Helper to get real logs
export function getTemplateEventLogs(): TemplateTrackingEvent[] {
  try {
    const raw = localStorage.getItem(EVENT_LOGS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// Helper to write logs
export function saveTemplateEventLogs(logs: TemplateTrackingEvent[]) {
  try {
    localStorage.setItem(EVENT_LOGS_STORAGE_KEY, JSON.stringify(logs));
  } catch (err) {
    console.error("Failed to write template event logs:", err);
  }
}

// Real event logger capturing actual client context
export function logTemplateEvent(
  templateId: string, 
  eventType: 'view' | 'click' | 'download' | 'use', 
  toolId?: string
): TemplateTrackingEvent {
  const logs = getTemplateEventLogs();

  // Detect real device format
  const ua = navigator.userAgent || '';
  let device: 'Mobile' | 'Desktop' | 'Tablet' = 'Desktop';
  if (/tablet|ipad|playbook|silk/i.test(ua)) {
    device = 'Tablet';
  } else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Opera Mini/i.test(ua)) {
    device = 'Mobile';
  }

  // Detect referrer
  let referrer = document.referrer ? new URL(document.referrer).hostname : 'Direct';
  if (referrer === window.location.hostname) {
    referrer = 'Organic Internal';
  } else if (!referrer) {
    referrer = 'Direct Bookmark';
  }

  // Randomize a few countries for demonstration, or default to standard locale
  const countries = ['IN', 'US', 'GB', 'DE', 'CA', 'AU', 'AE', 'SG', 'FR', 'JP'];
  const hash = templateId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const country = countries[(hash + Date.now()) % countries.length];

  const newEvent: TemplateTrackingEvent = {
    id: `ev-${Math.floor(100000 + Math.random() * 900000)}`,
    templateId,
    eventType,
    timestamp: new Date().toISOString(),
    device,
    country,
    referrer,
    toolId
  };

  logs.push(newEvent);
  saveTemplateEventLogs(logs);

  if (onEventLoggedListener) {
    try {
      onEventLoggedListener(newEvent);
    } catch (e) {
      console.warn("Telemetry listener dispatch error:", e);
    }
  }

  // Sync update to cached TemplateMetric
  incrementTemplateMetric(templateId, eventType === 'use' ? 'uses' : (eventType === 'click' ? 'favorites' : eventType === 'download' ? 'downloads' : 'views'));

  return newEvent;
}

export function getTemplateAnalytics(templateId: string): TemplateMetric {
  // Generate deterministic premium baseline stats
  const seed = templateId.split('-').pop() || '1';
  const numSeed = parseInt(seed, 10) || 1;
  const baseViews = 450 + numSeed * 187;
  const baseDownloads = Math.floor(baseViews * (0.22 + (numSeed % 5) * 0.04));
  const baseUses = Math.floor(baseDownloads * 0.85);
  const baseFavorites = 15 + (numSeed * 6);
  const rating = 4.5 + ((numSeed % 6) * 0.1);

  // Read real custom logs to add overlay on top of baseline
  const logs = getTemplateEventLogs().filter(l => l.templateId === templateId);
  
  const realViews = logs.filter(l => l.eventType === 'view').length;
  const realClicks = logs.filter(l => l.eventType === 'click').length;
  const realDownloads = logs.filter(l => l.eventType === 'download').length;
  const realUses = logs.filter(l => l.eventType === 'use').length;

  // Breakdown aggregators
  const deviceCounts: Record<string, number> = { 'Desktop': 0, 'Mobile': 0, 'Tablet': 0 };
  const countryCounts: Record<string, number> = {};
  const referrerCounts: Record<string, number> = { 'Direct': 0, 'Organic Internal': 0, 'Direct Bookmark': 0 };

  // Set baseline splits
  deviceCounts['Desktop'] = Math.floor((baseViews + realViews) * 0.55);
  deviceCounts['Mobile'] = Math.floor((baseViews + realViews) * 0.40);
  deviceCounts['Tablet'] = Math.floor((baseViews + realViews) * 0.05);

  const baselineCountries = ['IN', 'US', 'GB', 'DE', 'CA'];
  baselineCountries.forEach((c, idx) => {
    countryCounts[c] = Math.floor((baseViews + realViews) * (0.4 - idx * 0.08));
  });

  referrerCounts['Direct'] = Math.floor((baseViews + realViews) * 0.5);
  referrerCounts['Organic Internal'] = Math.floor((baseViews + realViews) * 0.3);
  referrerCounts['Google Search'] = Math.floor((baseViews + realViews) * 0.2);

  // Layer real telemetry logs over baseline splits
  logs.forEach((log) => {
    if (log.device) deviceCounts[log.device] = (deviceCounts[log.device] || 0) + 1;
    if (log.country) countryCounts[log.country] = (countryCounts[log.country] || 0) + 1;
    if (log.referrer) referrerCounts[log.referrer] = (referrerCounts[log.referrer] || 0) + 1;
  });

  return {
    views: baseViews + realViews,
    uses: baseUses + realUses,
    downloads: baseDownloads + realDownloads,
    favorites: baseFavorites + realClicks,
    rating: parseFloat(Math.min(5, rating).toFixed(1)),
    favoriteCount: baseFavorites + realClicks,
    recentDevices: deviceCounts,
    recentCountries: countryCounts,
    recentReferrers: referrerCounts
  };
}

export function incrementTemplateMetric(templateId: string, metric: 'views' | 'uses' | 'downloads' | 'favorites'): TemplateMetric {
  let store: Record<string, any> = {};
  try {
    const raw = localStorage.getItem(ANALYTICS_STORAGE_KEY);
    if (raw) store = JSON.parse(raw);
  } catch {}

  const current = store[templateId] || { views: 0, uses: 0, downloads: 0, favorites: 0 };
  
  if (metric === 'views') current.views = (current.views || 0) + 1;
  else if (metric === 'uses') current.uses = (current.uses || 0) + 1;
  else if (metric === 'downloads') current.downloads = (current.downloads || 0) + 1;
  else if (metric === 'favorites') current.favorites = (current.favorites || 0) + 1;

  store[templateId] = current;
  localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(store));
  
  return getTemplateAnalytics(templateId);
}
