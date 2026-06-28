// ═══════════════════════════════════════════════════════════════════
//  DESIGN PACKS DATABASE — 16 Industries × 8 Design Types
//  Each pack has complete Design DNA: colors, fonts, QR art, assets
// ═══════════════════════════════════════════════════════════════════

export interface DesignPack {
  packId: string;
  industry: string;
  name: string;
  icon: string;
  description: string;
  tagline: string;
  order: number;
  isPremium: boolean;
  
  // Tool mappings
  tools: string[];  // tool IDs that belong to this pack
  
  // Design DNA (shared across all 8 designs in the pack)
  designTokens: {
    colors: {
      primary: string;     // Main brand color
      bg: string;          // Background color
      text: string;        // Text color
      accent: string;      // Accent/highlight color
      qr_fg: string;       // QR code foreground
      qr_bg: string;       // QR code background
    };
    typography: {
      heading: string;     // Google Font name for headings
      body: string;        // Google Font name for body text
      accent: string;      // Optional accent font
    };
    qrArt: {
      dots: string;        // From QR_ART.dots keys
      eyes: string;        // From QR_ART.eyes keys
      gradient: string;    // From QR_ART.gradients keys
      frame: string;       // From QR_ART.frames keys
      logo: string;        // From QR_ART.logos keys
      effect: string;      // From QR_ART.effects keys
    };
  };
  
  // Asset references (from Phase 4 registry)
  assets: {
    backgrounds: string[];  // asset IDs
    frames: string[];       // asset IDs
    stickers: string[];     // asset IDs
    icons: string[];        // asset IDs
    textures: string[];     // asset IDs
  };
  
  // 8 Design Templates (references to Phase 6 generated templates)
  templates: {
    poster: string;          // Template ID from AI Factory
    sticker: string;
    flyer: string;
    table_tent: string;
    standee: string;
    window_sticker: string;
    card: string;
    background_pack: string;
  };
  
  // SEO metadata for pack landing page
  seo: {
    title: string;           // 60 chars max
    metaDescription: string; // 160 chars max
    keywords: string[];
    slug: string;
  };
}

// ─── 16 INDUSTRY PACKS ──────────────────────────────────────────
export const DESIGN_PACKS: DesignPack[] = [
  // ── 1. Restaurant ────────────────────────────────────────────
  {
    packId: 'pack-restaurant',
    industry: 'restaurant',
    name: 'Smart Dining Restaurant Pack',
    icon: '🍽️',
    description: 'Complete QR ecosystem for restaurants — digital menus, Google reviews, WhatsApp orders, and table feedback.',
    tagline: 'Your restaurant, fully digital. Scan to order, review, and connect.',
    order: 1,
    isPremium: false,
    tools: ['restaurant-menu-qr', 'google-review-qr', 'whatsapp-direct-chat', 'zomato-rating-qr',
            'table-reservation-qr', 'feedback-form-qr', 'instagram-promo-qr', 'delivery-partner-qr'],
    designTokens: {
      colors: { primary: '#C73E1D', bg: '#FDF6F0', text: '#2D2D2D', accent: '#D4A574', qr_fg: '#C73E1D', qr_bg: '#FFFFFF' },
      typography: { heading: 'Playfair Display', body: 'Inter', accent: 'Dancing Script' },
      qrArt: { dots: 'rounded', eyes: 'standard', gradient: 'radial', frame: 'thin_border', logo: 'bottom_right', effect: 'none' }
    },
    assets: {
      backgrounds: ['BG-REST-001', 'BG-REST-002', 'BG-REST-003'],
      frames: ['FRAME-REST-001', 'FRAME-REST-002'],
      stickers: ['STICKER-REST-001', 'STICKER-REST-002', 'STICKER-REST-003'],
      icons: ['ICON-REST-001', 'ICON-REST-002'],
      textures: ['TEXTURE-REST-001']
    },
    templates: {
      poster: 'TMP-REST-001',
      sticker: 'TMP-REST-002',
      flyer: 'TMP-REST-003',
      table_tent: 'TMP-REST-004',
      standee: 'TMP-REST-005',
      window_sticker: 'TMP-REST-006',
      card: 'TMP-REST-007',
      background_pack: 'TMP-REST-008'
    },
    seo: {
      title: 'Restaurant QR Code Design Pack | Menu, Reviews & More',
      metaDescription: 'Complete restaurant QR kit — digital menu, Google review, WhatsApp ordering. 8 ready-to-use designs. Download free.',
      keywords: ['restaurant qr code', 'menu qr', 'restaurant digital menu', 'qr code restaurant'],
      slug: 'restaurant-qr-design-pack'
    }
  },

  // ── 2. Wedding ──────────────────────────────────────────────
  {
    packId: 'pack-wedding',
    industry: 'wedding',
    name: 'Royal Elegance Wedding Pack',
    icon: '💍',
    description: 'Complete wedding QR stationery — RSVP tracking, photo sharing, gift registry, and thank you cards.',
    tagline: 'Your love story, digitally connected. Scan to share memories.',
    order: 2,
    isPremium: true,
    tools: ['wedding-rsvp-qr', 'wedding-photo-share-qr', 'wedding-gift-registry-qr', 'wedding-thank-you-qr',
            'wedding-seating-qr', 'wedding-hashtag-qr', 'wedding-video-qr', 'wedding-contact-qr'],
    designTokens: {
      colors: { primary: '#D4AF37', bg: '#FFFBF5', text: '#4A4A4A', accent: '#E8D5B7', qr_fg: '#B8860B', qr_bg: '#FFFFFF' },
      typography: { heading: 'Playfair Display', body: 'Lora', accent: 'Great Vibes' },
      qrArt: { dots: 'heart', eyes: 'framed', gradient: 'metallic', frame: 'decorative', logo: 'bordered', effect: 'rounded_qr' }
    },
    assets: {
      backgrounds: ['BG-WED-001', 'BG-WED-002', 'BG-WED-003'],
      frames: ['FRAME-WED-001', 'FRAME-WED-002'],
      stickers: ['STICKER-WED-001', 'STICKER-WED-002'],
      icons: ['ICON-WED-001', 'ICON-WED-002'],
      textures: ['TEXTURE-WED-001']
    },
    templates: {
      poster: 'TMP-WED-001', sticker: 'TMP-WED-002', flyer: 'TMP-WED-003',
      table_tent: 'TMP-WED-004', standee: 'TMP-WED-005',
      window_sticker: 'TMP-WED-006', card: 'TMP-WED-007', background_pack: 'TMP-WED-008'
    },
    seo: {
      title: 'Wedding QR Code Design Pack | RSVP & Photo Sharing',
      metaDescription: 'Elegant wedding QR stationery — RSVP tracker, photo sharing, gift registry. 8 premium designs.',
      keywords: ['wedding qr code', 'rsvp qr', 'wedding stationery', 'qr code wedding'],
      slug: 'wedding-qr-design-pack'
    }
  },

// ── 3. Medical & Healthcare ─────────────────────────────────
  {
    packId: 'pack-medical',
    industry: 'medical',
    name: 'Healthcare Professional Pack',
    icon: '🏥',
    description: 'Medical QR solutions — patient intake, prescription access, appointment booking, and emergency info.',
    tagline: 'Better care through instant connection. Scan for medical info.',
    order: 3,
    isPremium: false,
    tools: ['patient-intake-qr', 'prescription-qr', 'appointment-booking-qr', 'emergency-info-qr',
            'medical-report-qr', 'vaccination-cert-qr', 'health-tip-qr', 'clinic-contact-qr'],
    designTokens: {
      colors: { primary: '#1A73E8', bg: '#F8FAFE', text: '#202124', accent: '#34A853', qr_fg: '#1A73E8', qr_bg: '#FFFFFF' },
      typography: { heading: 'Inter', body: 'Roboto', accent: '' },
      qrArt: { dots: 'square', eyes: 'standard', gradient: 'solid', frame: 'thin_border', logo: 'center', effect: 'none' }
    },
    assets: {
      backgrounds: ['BG-MED-001', 'BG-MED-002', 'BG-MED-003'],
      frames: ['FRAME-MED-001', 'FRAME-MED-002'],
      stickers: ['STICKER-MED-001', 'STICKER-MED-002'],
      icons: ['ICON-MED-001', 'ICON-MED-002'],
      textures: ['TEXTURE-MED-001']
    },
    templates: {
      poster: 'TMP-MED-001', sticker: 'TMP-MED-002', flyer: 'TMP-MED-003',
      table_tent: 'TMP-MED-004', standee: 'TMP-MED-005',
      window_sticker: 'TMP-MED-006', card: 'TMP-MED-007', background_pack: 'TMP-MED-008'
    },
    seo: {
      title: 'Medical QR Code Design Pack | Healthcare & Clinic',
      metaDescription: 'Professional medical QR kit — patient intake, prescriptions, appointments. Clean clinical design.',
      keywords: ['medical qr code', 'healthcare qr', 'clinic qr', 'patient qr'],
      slug: 'medical-qr-design-pack'
    }
  },

  // ── 4. Tech & SaaS ─────────────────────────────────────────
  {
    packId: 'pack-tech',
    industry: 'tech',
    name: 'Cyber Tech Startup Pack',
    icon: '💻',
    description: 'Tech-optimized QR designs — product demos, app downloads, developer docs, and event check-ins.',
    tagline: 'Connect the digital world. Scan for demos, docs, and downloads.',
    order: 4,
    isPremium: false,
    tools: ['app-download-qr', 'product-demo-qr', 'docs-link-qr', 'event-checkin-qr',
            'api-docs-qr', 'github-repo-qr', 'linkedin-profile-qr', 'portfolio-qr'],
    designTokens: {
      colors: { primary: '#6C63FF', bg: '#0F0E17', text: '#FFFFFE', accent: '#FF8906', qr_fg: '#FFFFFE', qr_bg: '#0F0E17' },
      typography: { heading: 'Space Grotesk', body: 'Inter', accent: 'JetBrains Mono' },
      qrArt: { dots: 'hexagon', eyes: 'modern', gradient: 'neon_glow', frame: 'corner_only', logo: 'circular', effect: 'glow' }
    },
    assets: {
      backgrounds: ['BG-TECH-001', 'BG-TECH-002', 'BG-TECH-003'],
      frames: ['FRAME-TECH-001', 'FRAME-TECH-002'],
      stickers: ['STICKER-TECH-001', 'STICKER-TECH-002'],
      icons: ['ICON-TECH-001', 'ICON-TECH-002'],
      textures: ['TEXTURE-TECH-001']
    },
    templates: {
      poster: 'TMP-TECH-001', sticker: 'TMP-TECH-002', flyer: 'TMP-TECH-003',
      table_tent: 'TMP-TECH-004', standee: 'TMP-TECH-005',
      window_sticker: 'TMP-TECH-006', card: 'TMP-TECH-007', background_pack: 'TMP-TECH-008'
    },
    seo: {
      title: 'Tech QR Code Design Pack | Modern & Cyber Style',
      metaDescription: 'Modern tech QR kit — app download, product demo, developer docs. Neon cyber design style.',
      keywords: ['tech qr code', 'app download qr', 'developer qr', 'startup qr'],
      slug: 'tech-qr-design-pack'
    }
  },

  // ── 5. Travel & Tourism ─────────────────────────────────────
  {
    packId: 'pack-travel',
    industry: 'travel',
    name: 'Wanderlust Travel Pack',
    icon: '✈️',
    description: 'Travel QR essentials — destination guides, hotel check-in, tour bookings, and travel alerts.',
    tagline: 'Explore more. Scan for guides, bookings, and adventures.',
    order: 5,
    isPremium: false,
    tools: ['travel-guide-qr', 'hotel-checkin-qr', 'tour-booking-qr', 'flight-info-qr',
            'luggage-tag-qr', 'travel-alert-qr', 'local-attractions-qr', 'visa-info-qr'],
    designTokens: {
      colors: { primary: '#FF6B35', bg: '#FFF8F0', text: '#2D2D2D', accent: '#004E89', qr_fg: '#FF6B35', qr_bg: '#FFFFFF' },
      typography: { heading: 'Poppins', body: 'Nunito', accent: '' },
      qrArt: { dots: 'rounded', eyes: 'circle', gradient: 'linear_diagonal', frame: 'rounded_frame', logo: 'bordered', effect: 'none' }
    },
    assets: {
      backgrounds: ['BG-TRAV-001', 'BG-TRAV-002', 'BG-TRAV-003'],
      frames: ['FRAME-TRAV-001', 'FRAME-TRAV-002'],
      stickers: ['STICKER-TRAV-001', 'STICKER-TRAV-002'],
      icons: ['ICON-TRAV-001', 'ICON-TRAV-002'],
      textures: ['TEXTURE-TRAV-001']
    },
    templates: {
      poster: 'TMP-TRAV-001', sticker: 'TMP-TRAV-002', flyer: 'TMP-TRAV-003',
      table_tent: 'TMP-TRAV-004', standee: 'TMP-TRAV-005',
      window_sticker: 'TMP-TRAV-006', card: 'TMP-TRAV-007', background_pack: 'TMP-TRAV-008'
    },
    seo: {
      title: 'Travel QR Code Design Pack | Tourism & Adventures',
      metaDescription: 'Travel QR kit — destination guides, hotel check-in, tour bookings. Wanderlust-themed designs.',
      keywords: ['travel qr code', 'tourism qr', 'hotel qr', 'travel guide qr'],
      slug: 'travel-qr-design-pack'
    }
  },

  // ── 6. Real Estate ─────────────────────────────────────────
  {
    packId: 'pack-real-estate',
    industry: 'real_estate',
    name: 'Property Pro Real Estate Pack',
    icon: '🏠',
    description: 'Real estate QR tools — property listings, virtual tours, agent contact, and open house invites.',
    tagline: 'Your dream property is a scan away. Virtual tours & listings.',
    order: 6,
    isPremium: true,
    tools: ['property-listing-qr', 'virtual-tour-qr', 'agent-contact-qr', 'open-house-qr',
            'mortgage-calc-qr', 'testimonial-qr', 'area-guide-qr', 'schedule-viewing-qr'],
    designTokens: {
      colors: { primary: '#1E3A5F', bg: '#F8F9FA', text: '#212529', accent: '#4A90D9', qr_fg: '#1E3A5F', qr_bg: '#FFFFFF' },
      typography: { heading: 'Playfair Display', body: 'Inter', accent: '' },
      qrArt: { dots: 'square', eyes: 'standard', gradient: 'linear_vertical', frame: 'shadow_frame', logo: 'center', effect: 'shadow_2d' }
    },
    assets: {
      backgrounds: ['BG-RE-001', 'BG-RE-002', 'BG-RE-003'],
      frames: ['FRAME-RE-001', 'FRAME-RE-002'],
      stickers: ['STICKER-RE-001', 'STICKER-RE-002'],
      icons: ['ICON-RE-001', 'ICON-RE-002'],
      textures: ['TEXTURE-RE-001']
    },
    templates: {
      poster: 'TMP-RE-001', sticker: 'TMP-RE-002', flyer: 'TMP-RE-003',
      table_tent: 'TMP-RE-004', standee: 'TMP-RE-005',
      window_sticker: 'TMP-RE-006', card: 'TMP-RE-007', background_pack: 'TMP-RE-008'
    },
    seo: {
      title: 'Real Estate QR Code Design Pack | Property & Agents',
      metaDescription: 'Professional real estate QR kit — property listings, virtual tours, agent contact. Premium designs.',
      keywords: ['real estate qr code', 'property qr', 'agent qr', 'virtual tour qr'],
      slug: 'real-estate-qr-design-pack'
    }
  },

  // ── 7. Education ───────────────────────────────────────────
  {
    packId: 'pack-education',
    industry: 'education',
    name: 'Academic Learning Pack',
    icon: '📚',
    description: 'Educational QR resources — course materials, attendance tracking, library access, and student IDs.',
    tagline: 'Learn smarter. Scan for courses, materials, and resources.',
    order: 7,
    isPremium: false,
    tools: ['course-link-qr', 'attendance-qr', 'library-qr', 'student-id-qr',
            'assignment-qr', 'exam-schedule-qr', 'event-register-qr', 'feedback-qr'],
    designTokens: {
      colors: { primary: '#1565C0', bg: '#F5F8FF', text: '#1A1A2E', accent: '#FF6F00', qr_fg: '#1565C0', qr_bg: '#FFFFFF' },
      typography: { heading: 'Merriweather', body: 'Open Sans', accent: '' },
      qrArt: { dots: 'rounded', eyes: 'standard', gradient: 'linear_vertical', frame: 'thin_border', logo: 'center', effect: 'none' }
    },
    assets: {
      backgrounds: ['BG-EDU-001', 'BG-EDU-002', 'BG-EDU-003'],
      frames: ['FRAME-EDU-001', 'FRAME-EDU-002'],
      stickers: ['STICKER-EDU-001', 'STICKER-EDU-002'],
      icons: ['ICON-EDU-001', 'ICON-EDU-002'],
      textures: ['TEXTURE-EDU-001']
    },
    templates: {
      poster: 'TMP-EDU-001', sticker: 'TMP-EDU-002', flyer: 'TMP-EDU-003',
      table_tent: 'TMP-EDU-004', standee: 'TMP-EDU-005',
      window_sticker: 'TMP-EDU-006', card: 'TMP-EDU-007', background_pack: 'TMP-EDU-008'
    },
    seo: {
      title: 'Education QR Code Design Pack | Schools & Courses',
      metaDescription: 'Academic QR kit — course materials, attendance, library access. Clean educational design.',
      keywords: ['education qr code', 'school qr', 'course qr', 'student qr'],
      slug: 'education-qr-design-pack'
    }
  },
// ── 8. Business & Corporate ────────────────────────────────
  {
    packId: 'pack-business',
    industry: 'business',
    name: 'Corporate Enterprise Pack',
    icon: '💼',
    description: 'Business QR solutions — vCard sharing, meeting booking, portfolio access, and LinkedIn connection.',
    tagline: 'Network smarter. Scan to connect, share, and grow.',
    order: 8,
    isPremium: true,
    tools: ['vcard-qr', 'meeting-booking-qr', 'portfolio-qr', 'linkedin-qr',
            'business-proposal-qr', 'catalog-qr', 'testimonial-qr', 'newsletter-qr'],
    designTokens: {
      colors: { primary: '#2C3E50', bg: '#ECF0F1', text: '#2C3E50', accent: '#3498DB', qr_fg: '#2C3E50', qr_bg: '#FFFFFF' },
      typography: { heading: 'Inter', body: 'Roboto', accent: '' },
      qrArt: { dots: 'classy', eyes: 'modern', gradient: 'linear_horizontal', frame: 'thin_border', logo: 'center', effect: 'none' }
    },
    assets: {
      backgrounds: ['BG-BIZ-001', 'BG-BIZ-002', 'BG-BIZ-003'],
      frames: ['FRAME-BIZ-001', 'FRAME-BIZ-002'],
      stickers: ['STICKER-BIZ-001', 'STICKER-BIZ-002'],
      icons: ['ICON-BIZ-001', 'ICON-BIZ-002'],
      textures: ['TEXTURE-BIZ-001']
    },
    templates: {
      poster: 'TMP-BIZ-001', sticker: 'TMP-BIZ-002', flyer: 'TMP-BIZ-003',
      table_tent: 'TMP-BIZ-004', standee: 'TMP-BIZ-005',
      window_sticker: 'TMP-BIZ-006', card: 'TMP-BIZ-007', background_pack: 'TMP-BIZ-008'
    },
    seo: {
      title: 'Business QR Code Design Pack | Corporate & Enterprise',
      metaDescription: 'Professional business QR kit — vCard, meeting booking, portfolio. Corporate design style.',
      keywords: ['business qr code', 'corporate qr', 'vcard qr', 'professional qr'],
      slug: 'business-qr-design-pack'
    }
  },

  // ── 9. Fitness & Gym ───────────────────────────────────────
  {
    packId: 'pack-fitness',
    industry: 'fitness',
    name: 'Energize Fitness Pack',
    icon: '💪',
    description: 'Fitness QR tools — class schedules, membership cards, trainer contact, and workout guides.',
    tagline: 'Transform your fitness journey. Scan for schedules, tips, and more.',
    order: 9,
    isPremium: false,
    tools: ['class-schedule-qr', 'membership-card-qr', 'trainer-contact-qr', 'workout-qr',
            'nutrition-guide-qr', 'progress-tracker-qr', 'gym-wifi-qr', 'social-follow-qr'],
    designTokens: {
      colors: { primary: '#FF4500', bg: '#1A1A1A', text: '#FFFFFF', accent: '#00FF87', qr_fg: '#FFFFFF', qr_bg: '#1A1A1A' },
      typography: { heading: 'Bebas Neue', body: 'Poppins', accent: '' },
      qrArt: { dots: 'rounded', eyes: 'modern', gradient: 'neon_glow', frame: 'thick_border', logo: 'center', effect: 'glow' }
    },
    assets: {
      backgrounds: ['BG-FIT-001', 'BG-FIT-002', 'BG-FIT-003'],
      frames: ['FRAME-FIT-001', 'FRAME-FIT-002'],
      stickers: ['STICKER-FIT-001', 'STICKER-FIT-002'],
      icons: ['ICON-FIT-001', 'ICON-FIT-002'],
      textures: ['TEXTURE-FIT-001']
    },
    templates: {
      poster: 'TMP-FIT-001', sticker: 'TMP-FIT-002', flyer: 'TMP-FIT-003',
      table_tent: 'TMP-FIT-004', standee: 'TMP-FIT-005',
      window_sticker: 'TMP-FIT-006', card: 'TMP-FIT-007', background_pack: 'TMP-FIT-008'
    },
    seo: {
      title: 'Fitness QR Code Design Pack | Gym & Wellness',
      metaDescription: 'High-energy fitness QR kit — class schedules, membership, trainer contact. Dynamic sporty design.',
      keywords: ['fitness qr code', 'gym qr', 'workout qr', 'membership qr'],
      slug: 'fitness-qr-design-pack'
    }
  },

  // ── 10. Cafe & Coffee Shop ─────────────────────────────────
  {
    packId: 'pack-cafe',
    industry: 'cafe',
    name: 'Cozy Cafe Corner Pack',
    icon: '☕',
    description: 'Cafe QR essentials — digital menu, loyalty program, free WiFi, and social media connect.',
    tagline: 'Your cozy corner, digitally connected. Scan for menu and treats.',
    order: 10,
    isPremium: false,
    tools: ['cafe-menu-qr', 'loyalty-card-qr', 'wifi-qr', 'instagram-qr',
            'feedback-qr', 'order-online-qr', 'events-qr', 'gift-card-qr'],
    designTokens: {
      colors: { primary: '#6F4E37', bg: '#FEF9F0', text: '#3E2723', accent: '#C8A97E', qr_fg: '#6F4E37', qr_bg: '#FFFFFF' },
      typography: { heading: 'Playfair Display', body: 'Nunito', accent: 'Dancing Script' },
      qrArt: { dots: 'rounded', eyes: 'standard', gradient: 'solid', frame: 'rounded_frame', logo: 'bottom_right', effect: 'none' }
    },
    assets: {
      backgrounds: ['BG-CAFE-001', 'BG-CAFE-002', 'BG-CAFE-003'],
      frames: ['FRAME-CAFE-001', 'FRAME-CAFE-002'],
      stickers: ['STICKER-CAFE-001', 'STICKER-CAFE-002'],
      icons: ['ICON-CAFE-001', 'ICON-CAFE-002'],
      textures: ['TEXTURE-CAFE-001']
    },
    templates: {
      poster: 'TMP-CAFE-001', sticker: 'TMP-CAFE-002', flyer: 'TMP-CAFE-003',
      table_tent: 'TMP-CAFE-004', standee: 'TMP-CAFE-005',
      window_sticker: 'TMP-CAFE-006', card: 'TMP-CAFE-007', background_pack: 'TMP-CAFE-008'
    },
    seo: {
      title: 'Cafe QR Code Design Pack | Coffee Shop Digital Menu',
      metaDescription: 'Cozy cafe QR kit — digital menu, loyalty card, WiFi access. Warm coffee shop design.',
      keywords: ['cafe qr code', 'coffee shop qr', 'digital menu qr', 'cafe wifi qr'],
      slug: 'cafe-qr-design-pack'
    }
  },

  // ── 11. Salon & Beauty ─────────────────────────────────────
  {
    packId: 'pack-salon',
    industry: 'salon',
    name: 'Glamour Salon Beauty Pack',
    icon: '💇♀️',
    description: 'Salon QR tools — appointment booking, portfolio viewing, product shop, and stylist contact.',
    tagline: 'Where beauty meets technology. Scan to book and explore.',
    order: 11,
    isPremium: true,
    tools: ['appointment-qr', 'portfolio-qr', 'product-shop-qr', 'stylist-contact-qr',
            'reviews-qr', 'instagram-qr', 'loyalty-qr', 'price-list-qr'],
    designTokens: {
      colors: { primary: '#E91E63', bg: '#FFF5F7', text: '#4A0024', accent: '#FFD700', qr_fg: '#E91E63', qr_bg: '#FFFFFF' },
      typography: { heading: 'Playfair Display', body: 'Lato', accent: 'Great Vibes' },
      qrArt: { dots: 'flower', eyes: 'framed', gradient: 'pastel', frame: 'decorative', logo: 'circular', effect: 'rounded_qr' }
    },
    assets: {
      backgrounds: ['BG-SALON-001', 'BG-SALON-002', 'BG-SALON-003'],
      frames: ['FRAME-SALON-001', 'FRAME-SALON-002'],
      stickers: ['STICKER-SALON-001', 'STICKER-SALON-002'],
      icons: ['ICON-SALON-001', 'ICON-SALON-002'],
      textures: ['TEXTURE-SALON-001']
    },
    templates: {
      poster: 'TMP-SALON-001', sticker: 'TMP-SALON-002', flyer: 'TMP-SALON-003',
      table_tent: 'TMP-SALON-004', standee: 'TMP-SALON-005',
      window_sticker: 'TMP-SALON-006', card: 'TMP-SALON-007', background_pack: 'TMP-SALON-008'
    },
    seo: {
      title: 'Salon QR Code Design Pack | Beauty & Spa',
      metaDescription: 'Glamorous salon QR kit — appointment booking, portfolio, product shop. Beauty-inspired design.',
      keywords: ['salon qr code', 'beauty qr', 'salon appointment qr', 'hair salon qr'],
      slug: 'salon-qr-design-pack'
    }
  },
// ── 12. Hotel & Hospitality ────────────────────────────────
  {
    packId: 'pack-hotel',
    industry: 'hotel',
    name: 'Grand Hospitality Hotel Pack',
    icon: '🏨',
    description: 'Hotel QR suite — contactless check-in, room service menu, concierge, and local guides.',
    tagline: 'Experience luxury at your fingertips. Scan for premium service.',
    order: 12,
    isPremium: true,
    tools: ['checkin-qr', 'room-service-qr', 'concierge-qr', 'local-guide-qr',
            'spa-booking-qr', 'feedback-qr', 'wifi-qr', 'hotel-amenities-qr'],
    designTokens: {
      colors: { primary: '#8B6914', bg: '#FFFBF0', text: '#2C1810', accent: '#D4AF37', qr_fg: '#8B6914', qr_bg: '#FFFFFF' },
      typography: { heading: 'Playfair Display', body: 'Cormorant Garamond', accent: '' },
      qrArt: { dots: 'diamond', eyes: 'framed', gradient: 'metallic', frame: 'decorative', logo: 'center', effect: 'shadow_2d' }
    },
    assets: {
      backgrounds: ['BG-HOTEL-001', 'BG-HOTEL-002', 'BG-HOTEL-003'],
      frames: ['FRAME-HOTEL-001', 'FRAME-HOTEL-002'],
      stickers: ['STICKER-HOTEL-001', 'STICKER-HOTEL-002'],
      icons: ['ICON-HOTEL-001', 'ICON-HOTEL-002'],
      textures: ['TEXTURE-HOTEL-001']
    },
    templates: {
      poster: 'TMP-HOTEL-001', sticker: 'TMP-HOTEL-002', flyer: 'TMP-HOTEL-003',
      table_tent: 'TMP-HOTEL-004', standee: 'TMP-HOTEL-005',
      window_sticker: 'TMP-HOTEL-006', card: 'TMP-HOTEL-007', background_pack: 'TMP-HOTEL-008'
    },
    seo: {
      title: 'Hotel QR Code Design Pack | Hospitality & Resorts',
      metaDescription: 'Luxury hotel QR kit — contactless check-in, room service, concierge. Premium hospitality design.',
      keywords: ['hotel qr code', 'hospitality qr', 'room service qr', 'hotel checkin qr'],
      slug: 'hotel-qr-design-pack'
    }
  },

  // ── 13. Retail & Shop ──────────────────────────────────────
  {
    packId: 'pack-retail',
    industry: 'retail',
    name: 'Smart Retail Shop Pack',
    icon: '🛍️',
    description: 'Retail QR solutions — product catalogs, online store links, promotional offers, and customer feedback.',
    tagline: 'Shop smarter. Scan for products, offers, and store info.',
    order: 13,
    isPremium: false,
    tools: ['product-catalog-qr', 'online-store-qr', 'promo-offer-qr', 'feedback-qr',
            'loyalty-qr', 'size-guide-qr', 'store-locator-qr', 'whatsapp-order-qr'],
    designTokens: {
      colors: { primary: '#2E7D32', bg: '#F1F8E9', text: '#1B5E20', accent: '#FF6F00', qr_fg: '#2E7D32', qr_bg: '#FFFFFF' },
      typography: { heading: 'Poppins', body: 'Inter', accent: '' },
      qrArt: { dots: 'rounded', eyes: 'standard', gradient: 'solid', frame: 'thin_border', logo: 'center', effect: 'none' }
    },
    assets: {
      backgrounds: ['BG-RETAIL-001', 'BG-RETAIL-002', 'BG-RETAIL-003'],
      frames: ['FRAME-RETAIL-001', 'FRAME-RETAIL-002'],
      stickers: ['STICKER-RETAIL-001', 'STICKER-RETAIL-002'],
      icons: ['ICON-RETAIL-001', 'ICON-RETAIL-002'],
      textures: ['TEXTURE-RETAIL-001']
    },
    templates: {
      poster: 'TMP-RETAIL-001', sticker: 'TMP-RETAIL-002', flyer: 'TMP-RETAIL-003',
      table_tent: 'TMP-RETAIL-004', standee: 'TMP-RETAIL-005',
      window_sticker: 'TMP-RETAIL-006', card: 'TMP-RETAIL-007', background_pack: 'TMP-RETAIL-008'
    },
    seo: {
      title: 'Retail QR Code Design Pack | Shop & Store',
      metaDescription: 'Smart retail QR kit — product catalog, online store, promotional offers. Modern shop design.',
      keywords: ['retail qr code', 'shop qr', 'store qr', 'product catalog qr'],
      slug: 'retail-qr-design-pack'
    }
  },

  // ── 14. Crypto & Finance ───────────────────────────────────
  {
    packId: 'pack-crypto',
    industry: 'crypto',
    name: 'Crypto Finance Blockchain Pack',
    icon: '₿',
    description: 'Crypto QR tools — wallet addresses, exchange links, portfolio trackers, and NFT galleries.',
    tagline: 'Your crypto gateway. Scan to transact, track, and explore.',
    order: 14,
    isPremium: true,
    tools: ['wallet-address-qr', 'exchange-link-qr', 'portfolio-qr', 'nft-gallery-qr',
            'defi-app-qr', 'whitepaper-qr', 'community-discord-qr', 'news-update-qr'],
    designTokens: {
      colors: { primary: '#F7931A', bg: '#1A1A2E', text: '#FFFFFF', accent: '#00D9FF', qr_fg: '#F7931A', qr_bg: '#1A1A2E' },
      typography: { heading: 'Space Grotesk', body: 'Inter', accent: 'JetBrains Mono' },
      qrArt: { dots: 'hexagon', eyes: 'shield', gradient: 'mesh', frame: 'corner_only', logo: 'circular', effect: 'glow' }
    },
    assets: {
      backgrounds: ['BG-CRYPTO-001', 'BG-CRYPTO-002', 'BG-CRYPTO-003'],
      frames: ['FRAME-CRYPTO-001', 'FRAME-CRYPTO-002'],
      stickers: ['STICKER-CRYPTO-001', 'STICKER-CRYPTO-002'],
      icons: ['ICON-CRYPTO-001', 'ICON-CRYPTO-002'],
      textures: ['TEXTURE-CRYPTO-001']
    },
    templates: {
      poster: 'TMP-CRYPTO-001', sticker: 'TMP-CRYPTO-002', flyer: 'TMP-CRYPTO-003',
      table_tent: 'TMP-CRYPTO-004', standee: 'TMP-CRYPTO-005',
      window_sticker: 'TMP-CRYPTO-006', card: 'TMP-CRYPTO-007', background_pack: 'TMP-CRYPTO-008'
    },
    seo: {
      title: 'Crypto QR Code Design Pack | Bitcoin & Blockchain',
      metaDescription: 'Cryptocurrency QR kit — wallet addresses, exchange links, NFT gallery. Modern blockchain design.',
      keywords: ['crypto qr code', 'bitcoin qr', 'wallet qr', 'blockchain qr'],
      slug: 'crypto-qr-design-pack'
    }
  },

  // ── 15. Festival & Events ──────────────────────────────────
  {
    packId: 'pack-festival',
    industry: 'festival',
    name: 'Celebration Festival Pack',
    icon: '🎉',
    description: 'Event QR solutions — ticket verification, event schedules, photo sharing, and booth information.',
    tagline: 'Make every event memorable. Scan for tickets, info, and fun.',
    order: 15,
    isPremium: false,
    tools: ['ticket-qr', 'schedule-qr', 'photo-share-qr', 'booth-info-qr',
            'feedback-qr', 'sponsor-link-qr', 'merchandise-qr', 'social-share-qr'],
    designTokens: {
      colors: { primary: '#FF006E', bg: '#1A0A2E', text: '#FFFFFF', accent: '#00F5FF', qr_fg: '#FFFFFF', qr_bg: '#1A0A2E' },
      typography: { heading: 'Poppins', body: 'Nunito', accent: '' },
      qrArt: { dots: 'star', eyes: 'circle', gradient: 'multi_stop', frame: 'banner_frame', logo: 'center', effect: 'glow' }
    },
    assets: {
      backgrounds: ['BG-FEST-001', 'BG-FEST-002', 'BG-FEST-003'],
      frames: ['FRAME-FEST-001', 'FRAME-FEST-002'],
      stickers: ['STICKER-FEST-001', 'STICKER-FEST-002'],
      icons: ['ICON-FEST-001', 'ICON-FEST-002'],
      textures: ['TEXTURE-FEST-001']
    },
    templates: {
      poster: 'TMP-FEST-001', sticker: 'TMP-FEST-002', flyer: 'TMP-FEST-003',
      table_tent: 'TMP-FEST-004', standee: 'TMP-FEST-005',
      window_sticker: 'TMP-FEST-006', card: 'TMP-FEST-007', background_pack: 'TMP-FEST-008'
    },
    seo: {
      title: 'Festival QR Code Design Pack | Events & Celebrations',
      metaDescription: 'Vibrant festival QR kit — ticket verification, schedules, photo sharing. Colorful event design.',
      keywords: ['event qr code', 'festival qr', 'ticket qr', 'event schedule qr'],
      slug: 'festival-qr-design-pack'
    }
  },

  // ── 16. Pet & Animals ──────────────────────────────────────
  {
    packId: 'pack-pet',
    industry: 'pet',
    name: 'Pet Care & ID Pack',
    icon: '🐾',
    description: 'Pet QR essentials — lost pet ID tags, vaccination records, vet contact, and pet profile pages.',
    tagline: 'Every pet deserves a digital ID. Scan to find their story.',
    order: 16,
    isPremium: false,
    tools: ['pet-id-tag-qr', 'vet-contact-qr', 'vaccination-qr', 'pet-profile-qr',
            'pet-sitter-qr', 'pet-store-qr', 'adoption-qr', 'pet-insurance-qr'],
    designTokens: {
      colors: { primary: '#FF8C00', bg: '#FFF8F0', text: '#3E2723', accent: '#4CAF50', qr_fg: '#FF8C00', qr_bg: '#FFFFFF' },
      typography: { heading: 'Fredoka One', body: 'Nunito', accent: '' },
      qrArt: { dots: 'rounded', eyes: 'circle', gradient: 'solid', frame: 'rounded_frame', logo: 'center', effect: 'none' }
    },
    assets: {
      backgrounds: ['BG-PET-001', 'BG-PET-002', 'BG-PET-003'],
      frames: ['FRAME-PET-001', 'FRAME-PET-002'],
      stickers: ['STICKER-PET-001', 'STICKER-PET-002'],
      icons: ['ICON-PET-001', 'ICON-PET-002'],
      textures: ['TEXTURE-PET-001']
    },
    templates: {
      poster: 'TMP-PET-001', sticker: 'TMP-PET-002', flyer: 'TMP-PET-003',
      table_tent: 'TMP-PET-004', standee: 'TMP-PET-005',
      window_sticker: 'TMP-PET-006', card: 'TMP-PET-007', background_pack: 'TMP-PET-008'
    },
    seo: {
      title: 'Pet QR Code Design Pack | Pet ID & Care',
      metaDescription: 'Pet-friendly QR kit — lost pet ID tag, vaccination records, vet contact. Cute pet-themed design.',
      keywords: ['pet qr code', 'pet id tag', 'lost pet qr', 'pet profile qr'],
      slug: 'pet-qr-design-pack'
    }
  }
];

// ─── HELPERS ─────────────────────────────────────────────────────
export function getPackByIndustry(industry: string): DesignPack | undefined {
  return DESIGN_PACKS.find(p => p.industry === industry);
}

export function getPackById(packId: string): DesignPack | undefined {
  return DESIGN_PACKS.find(p => p.packId === packId);
}

export function getToolsForPack(packId: string): string[] {
  const pack = getPackById(packId);
  return pack?.tools || [];
}

export function getPackByTool(toolId: string): DesignPack | undefined {
  return DESIGN_PACKS.find(p => p.tools.includes(toolId));
}

export const PACK_CATEGORIES = DESIGN_PACKS.map(p => ({
  id: p.packId,
  name: p.name,
  icon: p.icon,
  industry: p.industry,
  isPremium: p.isPremium,
  templateCount: Object.keys(p.templates).length,
  toolCount: p.tools.length
}));
