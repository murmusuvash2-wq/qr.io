export const QR_ART = {
  // ── DOTS: 10 shapes ──────────────────────────────────────
  dots: {
    circle:    { name: 'Circle',    svg: '<circle r="{r}" />',                            bestFor: ['all', 'corporate'] },
    square:    { name: 'Square',    svg: '<rect width="{s}" height="{s}" rx="0" />',       bestFor: ['tech', 'b2b', 'industrial'] },
    diamond:   { name: 'Diamond',   svg: '<polygon points="{cx},{cy-s} {cx+s},{cy} {cx},{cy+s} {cx-s},{cy}" />', bestFor: ['fashion', 'premium'] },
    heart:     { name: 'Heart',     svg: '<path d="M{cx},{cy+r} C{cx-r},{cy-r} {cx},{cy-r*2} {cx+r},{cy-r*2} C{cx+r*2},{cy-r*2} {cx+r*2},{cy} {cx+r},{cy+r} Z" />', bestFor: ['wedding', 'romantic'] },
    star:      { name: 'Star',      svg: '<polygon points="{cx},{cy-s} {cx+s*.22},{cy-s*.31} {cx+s},{cy-s*.31} {cx+s*.36},{cy+s*.12} {cx+s*.55},{cy+s} {cx},{cy+s*.55} {cx-s*.55},{cy+s} {cx-s*.36},{cy+s*.12} {cx-s},{cy-s*.31} {cx-s*.22},{cy-s*.31}" />', bestFor: ['festival', 'events'] },
    leaf:      { name: 'Leaf',      svg: '<path d="M{cx},{cy} C{cx+r},{cy} {cx+r},{cy-r} {cx},{cy-r} C{cx-r},{cy-r} {cx-r},{cy} {cx},{cy} Z" />', bestFor: ['eco', 'wellness', 'organic'] },
    teardrop:  { name: 'Teardrop',  svg: '<path d="M{cx},{cy+s} C{cx-r},{cy} {cx-r},{cy-s} {cx},{cy-s} C{cx+r},{cy-s} {cx+r},{cy} {cx},{cy+s} Z" />', bestFor: ['spa', 'wellness', 'beauty'] },
    hexagon:   { name: 'Hexagon',   svg: '<polygon points="{cx},{cy-r} {cx+s*.86},{cy-r*.5} {cx+s*.86},{cy+r*.5} {cx},{cy+r} {cx-s*.86},{cy+r*.5} {cx-s*.86},{cy-r*.5}" />', bestFor: ['tech', 'crypto', 'modern'] },
    flower:    { name: 'Flower',    svg: '<path d="M{cx},{cy} A{r},{r} 0 1,1 {cx-1},{cy} Z" /><path d="M{cx},{cy} A{r*.7},{r*.7} 0 1,1 {cx-1},{cy} Z" fill="white" />', bestFor: ['wedding', 'beauty', 'garden'] },
    custom:    { name: 'Custom',    svg: '{userPath}',                                     bestFor: ['branded'] }
  },

  // ── EYES/FINDERS: 8 styles ────────────────────────────────
  eyes: {
    standard:   { name: 'Standard Square',   desc: '3-box finder pattern (QR default)' },
    circle:     { name: 'Circle Finder',     desc: 'Rounded finder, softer look' },
    diamond:    { name: 'Diamond Finder',    desc: 'Diamond shaped inner pattern' },
    leaf:       { name: 'Leaf Finder',       desc: 'Organic leaf-inspired shape' },
    shield:     { name: 'Shield Finder',     desc: 'Shield shape, security feel' },
    modern:     { name: 'Modern Minimal',    desc: 'Thin line finder, minimal' },
    framed:     { name: 'Framed Finder',     desc: 'Decorative corner frame' },
    custom:     { name: 'Custom Path',       desc: 'Upload SVG path' }
  },

  // ── GRADIENTS: 10 styles ──────────────────────────────────
  gradients: {
    solid:             { name: 'Solid Color',       type: 'solid' },
    linear_horizontal: { name: 'Horizontal Linear', type: 'linear', angle: '0deg' },
    linear_vertical:   { name: 'Vertical Linear',   type: 'linear', angle: '90deg' },
    linear_diagonal:   { name: 'Diagonal Sweep',    type: 'linear', angle: '135deg' },
    radial:            { name: 'Radial Burst',      type: 'radial' },
    multi_stop:        { name: 'Multi-Color',       type: 'linear', stops: 4 },
    mesh:              { name: 'Mesh Gradient',     type: 'mesh' },
    neon_glow:         { name: 'Neon Glow',         type: 'neon' },
    metallic:          { name: 'Metallic Sheen',    type: 'metallic' },
    pastel:            { name: 'Pastel Blend',      type: 'linear' }
  },

  // ── FRAMES: 8 styles ──────────────────────────────────────
  frames: {
    none:          { name: 'No Frame',           padding: 0 },
    thin_border:   { name: 'Thin Border',        padding: 10 },
    thick_border:  { name: 'Thick Border',       padding: 20 },
    rounded_frame: { name: 'Rounded Frame',      padding: 15, radius: 12 },
    banner_frame:  { name: 'Banner Frame',       padding: 15, banners: ['top', 'bottom'] },
    corner_only:   { name: 'Corner Accents',     padding: 10 },
    shadow_frame:  { name: 'Shadow Box',         padding: 20, shadow: true },
    decorative:    { name: 'Decorative Frame',   padding: 25 }
  },

  // ── LOGOS: 8 styles ───────────────────────────────────────
  logos: {
    none:            { name: 'No Logo',          size: '0%' },
    center:          { name: 'Center Logo',      size: '20%', position: 'center' },
    bottom_right:    { name: 'Bottom Right',     size: '15%', position: 'bottom-right' },
    watermark:       { name: 'Watermark',        size: '25%', opacity: 0.3 },
    bordered:        { name: 'Bordered Logo',    size: '18%', border: '3px white' },
    circular:        { name: 'Circular Logo',    size: '18%', shape: 'circle' },
    transparent_bg:  { name: 'Transparent',      size: '15%', bg: 'none' },
    gradient_bg:     { name: 'Gradient BG Logo', size: '20%', bg: 'gradient' }
  },

  // ── EFFECTS: 8 styles ─────────────────────────────────────
  effects: {
    none:             { name: 'No Effect' },
    glow:             { name: 'Glow',              desc: 'Modules glow on dark bg' },
    shadow_2d:        { name: 'Drop Shadow',       desc: 'Soft shadow for depth' },
    rounded_qr:       { name: 'Rounded QR',        radius: 16 },
    rotated:          { name: 'Rotated QR',        angle: 45 },
    scaled:           { name: 'Scaled',            scale: 0.85 },
    pixel_distortion: { name: 'Pixel Distortion',  desc: 'Artistic warp effect' },
    noise_texture:    { name: 'Noise Texture',     desc: 'Vintage grain overlay' }
  }
};

export const ART_PROFILES: Record<string, any[]> = {
  restaurant: [
    { name: 'Warm & Inviting',  dots: 'circle',   eyes: 'standard', gradient: 'radial',        frame: 'thin_border',  logo: 'bottom_right', effect: 'none' },
    { name: 'Menu Modern',       dots: 'teardrop',  eyes: 'modern',   gradient: 'linear_diagonal', frame: 'corner_only',  logo: 'center',       effect: 'rounded_qr' },
    { name: 'Playful Eatery',    dots: 'circle',    eyes: 'circle',   gradient: 'multi_stop',    frame: 'none',         logo: 'center',       effect: 'shadow_2d' },
    { name: 'Premium Dining',    dots: 'diamond',   eyes: 'framed',   gradient: 'metallic',      frame: 'decorative',   logo: 'bordered',     effect: 'none' },
    { name: 'Cafe Casual',       dots: 'circle',   eyes: 'standard', gradient: 'pastel',        frame: 'rounded_frame', logo: 'bottom_right',  effect: 'none' },
    { name: 'Street Food Vibes', dots: 'star',      eyes: 'circle',   gradient: 'neon_glow',     frame: 'thick_border', logo: 'center',       effect: 'glow' },
    { name: 'Bakery Sweet',      dots: 'flower',    eyes: 'leaf',     gradient: 'pastel',        frame: 'decorative',   logo: 'circular',     effect: 'rounded_qr' },
    { name: 'Bar Night',         dots: 'hexagon',   eyes: 'shield',   gradient: 'neon_glow',     frame: 'corner_only',  logo: 'transparent_bg', effect: 'glow' }
  ],
  wedding: [
    { name: 'Elegant Gold',     dots: 'heart',     eyes: 'framed',   gradient: 'metallic',      frame: 'decorative',   logo: 'bordered',     effect: 'rounded_qr' },
    { name: 'Romantic Blush',   dots: 'flower',    eyes: 'leaf',     gradient: 'pastel',        frame: 'rounded_frame', logo: 'circular',     effect: 'none' },
    { name: 'Minimal Love',     dots: 'circle',    eyes: 'standard', gradient: 'radial',        frame: 'thin_border',  logo: 'center',       effect: 'shadow_2d' },
    { name: 'Royal Classic',    dots: 'diamond',   eyes: 'framed',   gradient: 'linear_horizontal', frame: 'decorative', logo: 'bordered',   effect: 'none' },
    { name: 'Garden Party',     dots: 'leaf',      eyes: 'leaf',     gradient: 'pastel',        frame: 'none',         logo: 'watermark',    effect: 'none' },
    { name: 'Modern Couple',    dots: 'hexagon',   eyes: 'modern',   gradient: 'mesh',          frame: 'corner_only',  logo: 'circular',     effect: 'scaled' },
    { name: 'Bohemian Style',   dots: 'star',      eyes: 'circle',   gradient: 'multi_stop',    frame: 'rounded_frame', logo: 'transparent_bg', effect: 'noise_texture' },
    { name: 'Luxury Reception', dots: 'heart',     eyes: 'framed',   gradient: 'metallic',      frame: 'shadow_frame', logo: 'gradient_bg',  effect: 'glow' }
  ],
  medical: [
    { name: 'Clean & Trust',    dots: 'square',    eyes: 'standard', gradient: 'solid',         frame: 'thin_border',  logo: 'center',       effect: 'none' },
    { name: 'Modern Health',    dots: 'circle',   eyes: 'modern',   gradient: 'linear_vertical', frame: 'shadow_frame', logo: 'bordered',    effect: 'rounded_qr' },
    { name: 'Pharmacy Clear',   dots: 'circle',    eyes: 'standard', gradient: 'solid',         frame: 'none',         logo: 'center',       effect: 'none' },
    { name: 'Wellness Calm',    dots: 'teardrop',  eyes: 'leaf',     gradient: 'pastel',        frame: 'rounded_frame', logo: 'watermark',    effect: 'none' },
    { name: 'Emergency Bold',   dots: 'square',    eyes: 'shield',   gradient: 'solid',         frame: 'thick_border', logo: 'center',       effect: 'none' },
    { name: 'Clinic Clean',     dots: 'circle',   eyes: 'standard', gradient: 'linear_horizontal', frame: 'thin_border', logo: 'bordered',  effect: 'shadow_2d' },
    { name: 'Vet Care Soft',    dots: 'leaf',      eyes: 'circle',   gradient: 'pastel',        frame: 'rounded_frame', logo: 'circular',     effect: 'none' },
    { name: 'Hospital Trust',   dots: 'square',    eyes: 'modern',   gradient: 'linear_vertical', frame: 'none',         logo: 'center',       effect: 'none' }
  ],
  tech: [
    { name: 'Cyber Neon',       dots: 'hexagon',   eyes: 'modern',   gradient: 'neon_glow',     frame: 'corner_only',  logo: 'circular',     effect: 'glow' },
    { name: 'Clean Code',       dots: 'diamond',   eyes: 'diamond',  gradient: 'linear_horizontal', frame: 'none',      logo: 'center',       effect: 'none' },
    { name: 'Futuristic',       dots: 'star',      eyes: 'shield',   gradient: 'mesh',          frame: 'shadow_frame', logo: 'gradient_bg',  effect: 'pixel_distortion' },
    { name: 'Startup Hustle',   dots: 'circle',   eyes: 'modern',   gradient: 'radial',        frame: 'rounded_frame', logo: 'bordered',     effect: 'shadow_2d' },
    { name: 'SaaS Clean',       dots: 'square',    eyes: 'standard', gradient: 'linear_vertical', frame: 'thin_border', logo: 'center',       effect: 'rounded_qr' },
    { name: 'Dev Tool',         dots: 'diamond',   eyes: 'diamond',  gradient: 'solid',         frame: 'none',         logo: 'transparent_bg', effect: 'none' },
    { name: 'Crypto Edge',      dots: 'hexagon',   eyes: 'shield',   gradient: 'metallic',      frame: 'corner_only',  logo: 'circular',     effect: 'glow' },
    { name: 'AI Modern',        dots: 'star',      eyes: 'modern',   gradient: 'mesh',          frame: 'rounded_frame', logo: 'gradient_bg',  effect: 'scaled' }
  ],
  travel: [
    { name: 'Wanderlust',       dots: 'circle',    eyes: 'standard', gradient: 'linear_diagonal', frame: 'thin_border', logo: 'center',       effect: 'none' },
    { name: 'Adventure',        dots: 'diamond',   eyes: 'shield',   gradient: 'multi_stop',    frame: 'thick_border', logo: 'bordered',     effect: 'scaled' },
    { name: 'Luxury Resort',    dots: 'leaf',      eyes: 'framed',   gradient: 'metallic',      frame: 'decorative',   logo: 'watermark',    effect: 'shadow_2d' },
    { name: 'Budget Friendly',  dots: 'circle',   eyes: 'modern',   gradient: 'solid',         frame: 'none',         logo: 'center',       effect: 'none' },
    { name: 'Beach Paradise',   dots: 'teardrop',  eyes: 'circle',   gradient: 'pastel',        frame: 'rounded_frame', logo: 'circular',     effect: 'none' },
    { name: 'Mountain Trek',    dots: 'hexagon',   eyes: 'modern',   gradient: 'linear_vertical', frame: 'shadow_frame', logo: 'bordered',   effect: 'noise_texture' },
    { name: 'City Explorer',    dots: 'square',    eyes: 'standard', gradient: 'neon_glow',     frame: 'corner_only',  logo: 'transparent_bg', effect: 'glow' },
    { name: 'Family Trip',      dots: 'star',      eyes: 'circle',   gradient: 'multi_stop',    frame: 'rounded_frame', logo: 'center',       effect: 'rounded_qr' }
  ],
  business: [
    { name: 'Corporate Clean',  dots: 'square',    eyes: 'standard', gradient: 'solid',         frame: 'thin_border',  logo: 'center',       effect: 'none' },
    { name: 'Executive Dark',   dots: 'diamond',   eyes: 'modern',   gradient: 'linear_horizontal', frame: 'shadow_frame', logo: 'bordered',  effect: 'shadow_2d' },
    { name: 'Startup Pitch',    dots: 'circle',    eyes: 'circle',   gradient: 'radial',        frame: 'rounded_frame', logo: 'transparent_bg', effect: 'rounded_qr' },
    { name: 'Finance Secure',   dots: 'hexagon',   eyes: 'shield',   gradient: 'linear_vertical', frame: 'corner_only',  logo: 'center',      effect: 'none' },
    { name: 'Creative Agency',  dots: 'star',      eyes: 'modern',   gradient: 'mesh',          frame: 'none',         logo: 'watermark',    effect: 'scaled' },
    { name: 'Retail Pop',       dots: 'flower',    eyes: 'leaf',     gradient: 'multi_stop',    frame: 'decorative',   logo: 'circular',     effect: 'glow' },
    { name: 'Consultant Card',  dots: 'circle',    eyes: 'framed',   gradient: 'pastel',        frame: 'thin_border',  logo: 'bottom_right', effect: 'none' },
    { name: 'Premium Brand',    dots: 'diamond',   eyes: 'diamond',  gradient: 'metallic',      frame: 'thick_border', logo: 'gradient_bg',  effect: 'pixel_distortion' }
  ],
  education: [
    { name: 'Academic Classic', dots: 'circle',    eyes: 'standard', gradient: 'solid',         frame: 'thin_border',  logo: 'center',       effect: 'none' },
    { name: 'Student Playful',  dots: 'star',      eyes: 'circle',   gradient: 'multi_stop',    frame: 'rounded_frame', logo: 'transparent_bg', effect: 'shadow_2d' },
    { name: 'Library Quiet',    dots: 'square',    eyes: 'modern',   gradient: 'pastel',        frame: 'none',         logo: 'watermark',    effect: 'none' },
    { name: 'Campus Tech',      dots: 'hexagon',   eyes: 'shield',   gradient: 'linear_diagonal', frame: 'corner_only', logo: 'bordered',    effect: 'rounded_qr' },
    { name: 'Kindergarten',     dots: 'heart',     eyes: 'leaf',     gradient: 'radial',        frame: 'decorative',   logo: 'circular',     effect: 'glow' },
    { name: 'University Gold',  dots: 'diamond',   eyes: 'framed',   gradient: 'metallic',      frame: 'thick_border', logo: 'center',       effect: 'shadow_2d' },
    { name: 'Online Course',    dots: 'circle',    eyes: 'modern',   gradient: 'mesh',          frame: 'shadow_frame', logo: 'bottom_right', effect: 'scaled' },
    { name: 'Science Lab',      dots: 'teardrop',  eyes: 'diamond',  gradient: 'neon_glow',     frame: 'none',         logo: 'gradient_bg',  effect: 'pixel_distortion' }
  ],
  real_estate: [
    { name: 'Luxury Villa',     dots: 'diamond',   eyes: 'framed',   gradient: 'metallic',      frame: 'decorative',   logo: 'center',       effect: 'shadow_2d' },
    { name: 'Modern Apartment', dots: 'square',    eyes: 'modern',   gradient: 'linear_vertical', frame: 'thin_border', logo: 'bordered',   effect: 'none' },
    { name: 'Cozy Home',        dots: 'heart',     eyes: 'circle',   gradient: 'pastel',        frame: 'rounded_frame', logo: 'watermark',   effect: 'rounded_qr' },
    { name: 'Commercial Space', dots: 'hexagon',   eyes: 'shield',   gradient: 'solid',         frame: 'thick_border', logo: 'transparent_bg', effect: 'none' },
    { name: 'Eco Property',     dots: 'leaf',      eyes: 'leaf',     gradient: 'linear_diagonal', frame: 'none',       logo: 'circular',     effect: 'glow' },
    { name: 'City Skyline',     dots: 'circle',    eyes: 'standard', gradient: 'mesh',          frame: 'corner_only',  logo: 'bottom_right', effect: 'noise_texture' },
    { name: 'Broker VCard',     dots: 'circle',    eyes: 'modern',   gradient: 'radial',        frame: 'shadow_frame', logo: 'center',       effect: 'scaled' },
    { name: 'Open House Sign',  dots: 'star',      eyes: 'framed',   gradient: 'multi_stop',    frame: 'decorative',   logo: 'gradient_bg',  effect: 'pixel_distortion' }
  ],
  fitness: [
    { name: 'Gym Intense',      dots: 'hexagon',   eyes: 'shield',   gradient: 'neon_glow',     frame: 'thick_border', logo: 'center',       effect: 'glow' },
    { name: 'Yoga Calm',        dots: 'leaf',      eyes: 'leaf',     gradient: 'pastel',        frame: 'rounded_frame', logo: 'watermark',   effect: 'none' },
    { name: 'Crossfit Grunge',  dots: 'square',    eyes: 'standard', gradient: 'solid',         frame: 'none',         logo: 'bordered',     effect: 'noise_texture' },
    { name: 'Runner Speed',     dots: 'teardrop',  eyes: 'modern',   gradient: 'linear_horizontal', frame: 'corner_only', logo: 'transparent_bg', effect: 'scaled' },
    { name: 'Personal Trainer', dots: 'diamond',   eyes: 'diamond',  gradient: 'metallic',      frame: 'shadow_frame', logo: 'bottom_right', effect: 'shadow_2d' },
    { name: 'Zumba Party',      dots: 'star',      eyes: 'circle',   gradient: 'multi_stop',    frame: 'decorative',   logo: 'circular',     effect: 'pixel_distortion' },
    { name: 'Diet Plan',        dots: 'circle',    eyes: 'leaf',     gradient: 'linear_vertical', frame: 'thin_border', logo: 'center',      effect: 'none' },
    { name: 'Sports Team',      dots: 'hexagon',   eyes: 'framed',   gradient: 'mesh',          frame: 'rounded_frame', logo: 'gradient_bg', effect: 'rounded_qr' }
  ],
  salon_beauty: [
    { name: 'Glamour Rose',     dots: 'flower',    eyes: 'leaf',     gradient: 'pastel',        frame: 'rounded_frame', logo: 'circular',     effect: 'shadow_2d' },
    { name: 'Chic Minimal',     dots: 'circle',    eyes: 'modern',   gradient: 'solid',         frame: 'thin_border',  logo: 'center',       effect: 'none' },
    { name: 'Luxury Spa',       dots: 'diamond',   eyes: 'framed',   gradient: 'metallic',      frame: 'decorative',   logo: 'watermark',    effect: 'glow' },
    { name: 'Neon Nails',       dots: 'star',      eyes: 'circle',   gradient: 'neon_glow',     frame: 'corner_only',  logo: 'bordered',     effect: 'rounded_qr' },
    { name: 'Hair Studio',      dots: 'teardrop',  eyes: 'shield',   gradient: 'linear_diagonal', frame: 'shadow_frame', logo: 'transparent_bg', effect: 'none' },
    { name: 'Organic Skincare', dots: 'leaf',      eyes: 'leaf',     gradient: 'linear_vertical', frame: 'none',       logo: 'center',       effect: 'noise_texture' },
    { name: 'Makeup Artist',    dots: 'heart',     eyes: 'modern',   gradient: 'multi_stop',    frame: 'thick_border', logo: 'bottom_right', effect: 'pixel_distortion' },
    { name: 'Barber Vintage',   dots: 'square',    eyes: 'standard', gradient: 'radial',        frame: 'decorative',   logo: 'gradient_bg',  effect: 'scaled' }
  ],
  events: [
    { name: 'Concert Neon',     dots: 'star',      eyes: 'modern',   gradient: 'neon_glow',     frame: 'corner_only',  logo: 'center',       effect: 'glow' },
    { name: 'VIP Pass',         dots: 'diamond',   eyes: 'shield',   gradient: 'metallic',      frame: 'thick_border', logo: 'bordered',     effect: 'shadow_2d' },
    { name: 'Festival Boho',    dots: 'flower',    eyes: 'circle',   gradient: 'multi_stop',    frame: 'decorative',   logo: 'watermark',    effect: 'noise_texture' },
    { name: 'Corporate Expo',   dots: 'square',    eyes: 'standard', gradient: 'linear_vertical', frame: 'thin_border', logo: 'bottom_right', effect: 'none' },
    { name: 'Gala Night',       dots: 'hexagon',   eyes: 'framed',   gradient: 'mesh',          frame: 'shadow_frame', logo: 'transparent_bg', effect: 'pixel_distortion' },
    { name: 'Charity Run',      dots: 'heart',     eyes: 'leaf',     gradient: 'pastel',        frame: 'rounded_frame', logo: 'circular',    effect: 'rounded_qr' },
    { name: 'Club Party',       dots: 'circle',    eyes: 'modern',   gradient: 'radial',        frame: 'none',         logo: 'center',       effect: 'scaled' },
    { name: 'Art Exhibition',   dots: 'teardrop',  eyes: 'diamond',  gradient: 'linear_horizontal', frame: 'corner_only', logo: 'gradient_bg', effect: 'none' }
  ],
  crypto_finance: [
    { name: 'Bitcoin Orange',   dots: 'hexagon',   eyes: 'shield',   gradient: 'linear_diagonal', frame: 'corner_only', logo: 'center',      effect: 'glow' },
    { name: 'Ethereum Blue',    dots: 'diamond',   eyes: 'diamond',  gradient: 'mesh',          frame: 'thin_border',  logo: 'transparent_bg', effect: 'none' },
    { name: 'Cyberpunk DeFi',   dots: 'star',      eyes: 'modern',   gradient: 'neon_glow',     frame: 'shadow_frame', logo: 'bordered',     effect: 'pixel_distortion' },
    { name: 'Secure Bank',      dots: 'square',    eyes: 'standard', gradient: 'solid',         frame: 'thick_border', logo: 'bottom_right', effect: 'shadow_2d' },
    { name: 'NFT Art',          dots: 'circle',    eyes: 'circle',   gradient: 'multi_stop',    frame: 'decorative',   logo: 'circular',     effect: 'noise_texture' },
    { name: 'Gold Standard',    dots: 'hexagon',   eyes: 'framed',   gradient: 'metallic',      frame: 'rounded_frame', logo: 'gradient_bg', effect: 'rounded_qr' },
    { name: 'Minimal Wallet',   dots: 'teardrop',  eyes: 'leaf',     gradient: 'pastel',        frame: 'none',         logo: 'watermark',    effect: 'scaled' },
    { name: 'Trading Chart',    dots: 'leaf',      eyes: 'modern',   gradient: 'radial',        frame: 'corner_only',  logo: 'center',       effect: 'none' }
  ],
  retail: [
    { name: 'Sale Tag Red',     dots: 'star',      eyes: 'circle',   gradient: 'solid',         frame: 'thick_border', logo: 'center',       effect: 'none' },
    { name: 'Boutique Chic',    dots: 'diamond',   eyes: 'framed',   gradient: 'pastel',        frame: 'thin_border',  logo: 'transparent_bg', effect: 'shadow_2d' },
    { name: 'Tech Store',       dots: 'hexagon',   eyes: 'modern',   gradient: 'linear_vertical', frame: 'corner_only', logo: 'bordered',    effect: 'glow' },
    { name: 'Supermarket Fast', dots: 'square',    eyes: 'standard', gradient: 'radial',        frame: 'none',         logo: 'bottom_right', effect: 'none' },
    { name: 'Eco Shop',         dots: 'leaf',      eyes: 'leaf',     gradient: 'linear_diagonal', frame: 'rounded_frame', logo: 'circular',  effect: 'rounded_qr' },
    { name: 'Luxury Mall',      dots: 'circle',    eyes: 'diamond',  gradient: 'metallic',      frame: 'decorative',   logo: 'watermark',    effect: 'pixel_distortion' },
    { name: 'Pop-Up Store',     dots: 'heart',     eyes: 'shield',   gradient: 'multi_stop',    frame: 'shadow_frame', logo: 'gradient_bg',  effect: 'noise_texture' },
    { name: 'Window Display',   dots: 'teardrop',  eyes: 'modern',   gradient: 'mesh',          frame: 'corner_only',  logo: 'center',       effect: 'scaled' }
  ],
  gaming: [
    { name: 'Arcade Retro',     dots: 'square',    eyes: 'standard', gradient: 'neon_glow',     frame: 'thick_border', logo: 'center',       effect: 'pixel_distortion' },
    { name: 'Esports Pro',      dots: 'hexagon',   eyes: 'shield',   gradient: 'linear_horizontal', frame: 'corner_only', logo: 'bordered',  effect: 'glow' },
    { name: 'Fantasy RPG',      dots: 'diamond',   eyes: 'framed',   gradient: 'metallic',      frame: 'decorative',   logo: 'transparent_bg', effect: 'shadow_2d' },
    { name: 'Mobile Casual',    dots: 'circle',    eyes: 'circle',   gradient: 'multi_stop',    frame: 'rounded_frame', logo: 'circular',    effect: 'rounded_qr' },
    { name: 'Sci-Fi FPS',       dots: 'star',      eyes: 'modern',   gradient: 'mesh',          frame: 'none',         logo: 'watermark',    effect: 'noise_texture' },
    { name: 'Indie Darling',    dots: 'heart',     eyes: 'leaf',     gradient: 'pastel',        frame: 'thin_border',  logo: 'bottom_right', effect: 'none' },
    { name: 'Streaming Overlay',dots: 'teardrop',  eyes: 'diamond',  gradient: 'radial',        frame: 'shadow_frame', logo: 'gradient_bg',  effect: 'scaled' },
    { name: 'Board Game',       dots: 'leaf',      eyes: 'standard', gradient: 'solid',         frame: 'corner_only',  logo: 'center',       effect: 'none' }
  ],
  music: [
    { name: 'Vinyl Classic',    dots: 'circle',    eyes: 'circle',   gradient: 'solid',         frame: 'rounded_frame', logo: 'circular',    effect: 'shadow_2d' },
    { name: 'Synthwave Neon',   dots: 'star',      eyes: 'modern',   gradient: 'neon_glow',     frame: 'corner_only',  logo: 'transparent_bg', effect: 'glow' },
    { name: 'Acoustic Warm',    dots: 'leaf',      eyes: 'leaf',     gradient: 'pastel',        frame: 'thin_border',  logo: 'center',       effect: 'none' },
    { name: 'Rock Grunge',      dots: 'square',    eyes: 'standard', gradient: 'linear_vertical', frame: 'thick_border', logo: 'bordered',   effect: 'noise_texture' },
    { name: 'Classical Gold',   dots: 'diamond',   eyes: 'framed',   gradient: 'metallic',      frame: 'decorative',   logo: 'watermark',    effect: 'rounded_qr' },
    { name: 'Pop Star',         dots: 'heart',     eyes: 'shield',   gradient: 'multi_stop',    frame: 'none',         logo: 'bottom_right', effect: 'scaled' },
    { name: 'DJ Set',           dots: 'hexagon',   eyes: 'diamond',  gradient: 'mesh',          frame: 'shadow_frame', logo: 'gradient_bg',  effect: 'pixel_distortion' },
    { name: 'Podcast Clear',    dots: 'teardrop',  eyes: 'modern',   gradient: 'radial',        frame: 'corner_only',  logo: 'center',       effect: 'none' }
  ],
  art_design: [
    { name: 'Minimalist Blank', dots: 'circle',    eyes: 'modern',   gradient: 'solid',         frame: 'none',         logo: 'watermark',    effect: 'none' },
    { name: 'Abstract Splash',  dots: 'star',      eyes: 'circle',   gradient: 'multi_stop',    frame: 'corner_only',  logo: 'transparent_bg', effect: 'shadow_2d' },
    { name: 'Geometric Bau',    dots: 'square',    eyes: 'standard', gradient: 'linear_diagonal', frame: 'thick_border', logo: 'bordered',  effect: 'pixel_distortion' },
    { name: 'Watercolor Soft',  dots: 'teardrop',  eyes: 'leaf',     gradient: 'pastel',        frame: 'rounded_frame', logo: 'circular',    effect: 'rounded_qr' },
    { name: 'Industrial Brut',  dots: 'hexagon',   eyes: 'shield',   gradient: 'metallic',      frame: 'shadow_frame', logo: 'bottom_right', effect: 'noise_texture' },
    { name: 'Pop Art Bright',   dots: 'flower',    eyes: 'diamond',  gradient: 'neon_glow',     frame: 'decorative',   logo: 'gradient_bg',  effect: 'glow' },
    { name: 'Photography Mono', dots: 'diamond',   eyes: 'framed',   gradient: 'radial',        frame: 'thin_border',  logo: 'center',       effect: 'scaled' },
    { name: '3D Render',        dots: 'leaf',      eyes: 'modern',   gradient: 'mesh',          frame: 'none',         logo: 'center',       effect: 'none' }
  ]
};

export function getArtProfile(industry: string, profileIndex = 0) {
  const profiles = ART_PROFILES[industry] || ART_PROFILES.tech;
  return profiles[profileIndex % profiles.length];
}

export function buildQRConfig(artProfile: any) {
  const dots    = (QR_ART.dots as any)[artProfile.dots];
  const eyes    = (QR_ART.eyes as any)[artProfile.eyes];
  const grad    = (QR_ART.gradients as any)[artProfile.gradient];
  const frame   = (QR_ART.frames as any)[artProfile.frame];
  const logo    = (QR_ART.logos as any)[artProfile.logo];
  const effect  = (QR_ART.effects as any)[artProfile.effect];

  return {
    dotsStyle: artProfile.dots,
    dotsShape: dots?.svg || null,
    eyesStyle: artProfile.eyes,
    eyesDesc: eyes?.desc || null,
    gradientType: grad?.type || 'solid',
    gradientAngle: grad?.angle || '0deg',
    gradientStops: grad?.stops || 2,
    frameStyle: artProfile.frame,
    framePadding: frame?.padding || 0,
    frameRadius: frame?.radius || 0,
    frameShadow: frame?.shadow || false,
    logoStyle: artProfile.logo,
    logoSize: logo?.size || '0%',
    logoPosition: logo?.position || 'center',
    logoOpacity: logo?.opacity || 1,
    logoBorder: logo?.border || null,
    logoShape: logo?.shape || null,
    effect: artProfile.effect,
    effectRadius: effect?.radius || 0,
    effectAngle: effect?.angle || 0,
    effectScale: effect?.scale || 1
  };
}

export async function suggestArtStyles(toolData: any, industry: string) {
  const prompt = `Suggest 3 QR art styles for ${toolData.name}.

INDUSTRY: ${industry}
TOOL: ${toolData.name}
DESCRIPTION: ${toolData.description}

AVAILABLE STYLES:
  Dot Shapes: circle, square, diamond, heart, star, leaf, teardrop, hexagon, flower
  Eye/Finder: standard, circle, diamond, leaf, shield, modern, framed
  Gradients: solid, linear, radial, multi_stop, mesh, neon_glow, metallic, pastel
  Frames: none, thin_border, thick_border, rounded_frame, banner_frame, corner_only, shadow_frame, decorative
  Logos: none, center, bottom_right, watermark, bordered, circular, transparent_bg, gradient_bg
  Effects: none, glow, shadow_2d, rounded_qr, rotated, scaled, pixel_distortion, noise_texture

RETURN JSON:
{
  "suggestions": [
    {
      "name": "Style Name",
      "description": "Why this fits",
      "artProfile": {
        "dots": "diamond",
        "eyes": "modern",
        "gradient": "neon_glow",
        "frame": "corner_only",
        "logo": "center",
        "effect": "glow"
      }
    }
  ]
}`;

  const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta';
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  const res = await fetch(`${GEMINI_API_URL}/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.4, maxOutputTokens: 2048, responseMimeType: 'application/json' }
    })
  });
  const data = await res.json();
  return JSON.parse(data.candidates[0].content.parts[0].text).suggestions;
}

export function generateArtSVGPreview(artProfile: any, size = 200) {
  const qr = buildQRConfig(artProfile);
  const s = size, dot = 10, gap = 20, start = 40;

  let svg = `<svg width="${s}" height="${s}" viewBox="0 0 ${s} ${s}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="glow"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>
    <rect width="${s}" height="${s}" fill="#f5f5f5" rx="${qr.effectRadius || 0}"/>`;

  // Draw sample finder patterns (simplified QR layout)
  svg += drawFinder(start, start, 3, qr);
  svg += drawFinder(s - start - 3*gap, start, 3, qr);
  svg += drawFinder(start, s - start - 3*gap, 3, qr);

  // Draw sample data modules
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if ((r < 3 && c < 3) || (r < 3 && c > 5) || (r > 5 && c < 3)) continue;
      const cx = start + c * gap + dot/2;
      const cy = start + r * gap + dot/2;
      svg += drawModule(cx, cy, dot, qr.dotsStyle);
    }
  }

  // Draw frame
  if (qr.frameStyle !== 'none') {
    const pad = qr.framePadding || 10;
    svg += `<rect x="${pad}" y="${pad}" width="${s-pad*2}" height="${s-pad*2}" fill="none" stroke="#333" stroke-width="2" rx="${qr.frameRadius || 0}"/>`;
  }

  svg += `</svg>`;
  return svg;
}

function drawModule(cx: number, cy: number, s: number, style: string) {
  const r = s/2;
  switch(style) {
    case 'square':   return `<rect x="${cx-s/2}" y="${cy-s/2}" width="${s}" height="${s}" fill="#333"/>`;
    case 'diamond':  return `<polygon points="${cx},${cy-r} ${cx+r},${cy} ${cx},${cy+r} ${cx-r},${cy}" fill="#333"/>`;
    case 'heart':    return `<path d="M${cx},${cy+r} C${cx-r},${cy-r} ${cx},${cy-r*2} ${cx+r},${cy-r*2} C${cx+r*2},${cy-r*2} ${cx+r*2},${cy} ${cx+r},${cy+r} Z" fill="#333"/>`;
    case 'star':     return `<polygon points="${cx},${cy-r} ${cx+r*.22},${cy-r*.31} ${cx+r},${cy-r*.31} ${cx+r*.36},${cy+r*.12} ${cx+r*.55},${cy+r} ${cx},${cy+r*.55} ${cx-r*.55},${cy+r} ${cx-r*.36},${cy+r*.12} ${cx-r},${cy-r*.31} ${cx-r*.22},${cy-r*.31}" fill="#333"/>`;
    case 'hexagon':  return `<polygon points="${cx},${cy-r} ${cx+r*.86},${cy-r*.5} ${cx+r*.86},${cy+r*.5} ${cx},${cy+r} ${cx-r*.86},${cy+r*.5} ${cx-r*.86},${cy-r*.5}" fill="#333"/>`;
    case 'teardrop': return `<path d="M${cx},${cy+r} C${cx-r},${cy} ${cx-r},${cy-r} ${cx},${cy-r} C${cx+r},${cy-r} ${cx+r},${cy} ${cx},${cy+r} Z" fill="#333"/>`;
    case 'flower':   return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#333"/><circle cx="${cx}" cy="${cy-r}" r="${r*.4}" fill="#333"/><circle cx="${cx+r*.64}" cy="${cy+r*.4}" r="${r*.4}" fill="#333"/><circle cx="${cx-r*.64}" cy="${cy+r*.4}" r="${r*.4}" fill="#333"/>`;
    default:         return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#333"/>`; // circle / leaf
  }
}

function drawFinder(x: number, y: number, modules: number, qr: any) {
  const s = modules * 20;
  let svg = "";
  svg += `<rect x="${x}" y="${y}" width="${s}" height="${s}" fill="#333" rx="4"/>`;
  svg += `<rect x="${x+5}" y="${y+5}" width="${s-10}" height="${s-10}" fill="#fff" rx="3"/>`;
  svg += `<rect x="${x+10}" y="${y+10}" width="${s-20}" height="${s-20}" fill="#333" rx="2"/>`;
  return svg;
}
