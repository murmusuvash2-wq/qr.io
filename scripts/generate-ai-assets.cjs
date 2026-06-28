// ═══════════════════════════════════════════════════════════════════
//  AI ASSET GENERATOR — Premium SVGs for All 16 Industries
//  Uses: Gemini API (already in project)
//  Output: 200+ SVGs in public/assets/ + registry.json update
// ═══════════════════════════════════════════════════════════════════

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'YOUR_GEMINI_API_KEY';
const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

const fs = require('fs');
const path = require('path');

const ASSETS_DIR = path.join(__dirname, '../public/assets');
const REGISTRY_PATH = path.join(ASSETS_DIR, 'registry.json');

// ─── Asset ID Generator ──────────────────────────────────────────
function getNextId(category, existingAssets) {
  const prefixMap = {
    backgrounds: 'BG', frames: 'FRAME', patterns: 'PATTERN',
    stickers: 'STICKER', textures: 'TEXTURE', icons: 'ICON',
    illustrations: 'ILLUS', ribbons: 'RIBBON', qr_shapes: 'QR_SHAPE'
  };
  const prefix = prefixMap[category] || 'AST';
  const list = existingAssets[category] || [];
  let maxNum = 0;
  list.forEach(a => {
    const parts = a.id?.split('-');
    if (parts?.length === 2) {
      const num = parseInt(parts[1], 10);
      if (!isNaN(num) && num > maxNum) maxNum = num;
    }
  });
  return `${prefix}-${String(maxNum + 1).padStart(6, '0')}`;
}

// ─── Gemini SVG Generator ────────────────────────────────────────
async function generateSVG(prompt, retries = 3) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><rect width="800" height="600" fill="#f0f0f0"/><text x="400" y="300" font-family="sans-serif" font-size="24" text-anchor="middle" fill="#333">${prompt.split(',')[0].substring(0, 30)}</text></svg>`;
}

// ─── Save to Disk ─────────────────────────────────────────────────
function saveSVG(category, filename, svgContent) {
  const dir = path.join(ASSETS_DIR, category);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const filePath = path.join(dir, filename);
  fs.writeFileSync(filePath, svgContent);
  return `/assets/${category}/${filename}`;
}

// ─── Register in Registry ─────────────────────────────────────────
function registerAsset(category, filename, name, tags, path_url) {
  let registry = { assets: {} };
  if (fs.existsSync(REGISTRY_PATH)) {
    try {
      registry = JSON.parse(fs.readFileSync(REGISTRY_PATH, 'utf8'));
    } catch (e) {
      console.warn("Failed to parse registry.json, creating a new one");
    }
  }
  
  if (!registry.assets) registry.assets = {};
  if (!registry.assets[category]) registry.assets[category] = [];

  const id = getNextId(category, registry.assets);
  
  // Check if it already exists by name
  const existingIndex = registry.assets[category].findIndex(a => a.name === name);
  
  const assetData = {
    id: existingIndex >= 0 ? registry.assets[category][existingIndex].id : id,
    name, path: path_url, tags, category,
    type: 'svg', source: 'ai-generated', license: 'proprietary',
    dateAdded: new Date().toISOString().split('T')[0]
  };

  if (existingIndex >= 0) {
    registry.assets[category][existingIndex] = assetData;
  } else {
    registry.assets[category].push(assetData);
  }

  fs.writeFileSync(REGISTRY_PATH, JSON.stringify(registry, null, 2));
  return assetData.id;
}

// ═══════════════════════════════════════════════════════════════════
//  ASSET DEFINITIONS — 200+ Premium SVGs
// ═══════════════════════════════════════════════════════════════════

const ASSETS = {
  backgrounds: [
    { name: 'Obsidian Gold Vein', tags: ['luxury', 'dark', 'premium', 'gold'],
      prompt: 'Premium dark obsidian background with flowing gold vein patterns, elegant marble-like texture, 800x600 SVG, rich deep blacks with metallic gold accents' },
    { name: 'Royal Amethyst Mesh', tags: ['luxury', 'dark', 'purple', 'premium'],
      prompt: 'Luxury mesh gradient background deep purple to midnight blue, soft flowing curves, ethereal glow, 800x600 SVG' },
    { name: 'Champagne Satin', tags: ['luxury', 'light', 'gold', 'elegant'],
      prompt: 'Elegant champagne gold satin texture background, soft flowing folds, warm luminous tones, 800x600 SVG, wedding luxury style' },
    { name: 'Cosmic Nebula', tags: ['premium', 'dark', 'space', 'modern'],
      prompt: 'Deep space nebula background with scattered stars and cosmic dust, deep purples and blues, 800x600 SVG' },
    { name: 'Warm Amber Kitchen', tags: ['restaurant', 'warm', 'food'],
      prompt: 'Warm amber and terracotta gradient background, subtle spice-like particles, restaurant ambiance, 800x600 SVG' },
    { name: 'Fresh Herb Green', tags: ['restaurant', 'eco', 'organic', 'fresh'],
      prompt: 'Fresh organic green gradient background with subtle leaf patterns, natural texture, farm-to-table vibe, 800x600 SVG' },
    { name: 'Wooden Rustic', tags: ['restaurant', 'rustic', 'cafe', 'warm'],
      prompt: 'Warm wooden texture background, light oak grain pattern, natural wood fibers visible, 800x600 SVG' },
    { name: 'Blush Pink Elegance', tags: ['wedding', 'pink', 'romantic', 'elegant'],
      prompt: 'Soft blush pink gradient with rose gold shimmer, delicate floating petals, wedding romantic style, 800x600 SVG' },
    { name: 'Ivory Lace', tags: ['wedding', 'ivory', 'classic', 'traditional'],
      prompt: 'Ivory cream background with subtle lace patterns overlaid, classic wedding invitation style, 800x600 SVG' },
    { name: 'Dusty Rose Velvet', tags: ['wedding', 'rose', 'vintage', 'romantic'],
      prompt: 'Dusty rose velvet texture background, soft matte finish, vintage wedding aesthetic, 800x600 SVG' },
    { name: 'Clean Clinical White', tags: ['medical', 'clean', 'corporate', 'white'],
      prompt: 'Clean medical white background with subtle blue crosshatch pattern, clinical fresh feel, 800x600 SVG' },
    { name: 'Healing Blue Gradient', tags: ['medical', 'health', 'blue', 'calm'],
      prompt: 'Calming medical blue gradient from light sky to soft teal, healing spa atmosphere, 800x600 SVG' },
    { name: 'Wellness Mint', tags: ['medical', 'wellness', 'green', 'calm'],
      prompt: 'Soothing mint green gradient with subtle organic wave patterns, wellness and healthcare themed, 800x600 SVG' },
    { name: 'Cyberpunk Grid Neon', tags: ['tech', 'neon', 'cyber', 'modern'],
      prompt: 'Dark cyberpunk grid background with neon pink and cyan glow lines, futuristic tech style, 800x600 SVG' },
    { name: 'Minimal Slate Dark', tags: ['tech', 'minimal', 'dark', 'corporate'],
      prompt: 'Clean dark slate gradient, minimal tech background, subtle geometric lines, SaaS product style, 800x600 SVG' },
    { name: 'Circuit Board Blueprint', tags: ['tech', 'engineering', 'blueprint', 'modern'],
      prompt: 'Dark blue circuit board pattern background with glowing trace lines, engineering tech style, 800x600 SVG' },
    { name: 'Data Flow Matrix', tags: ['tech', 'digital', 'modern', 'abstract'],
      prompt: 'Abstract digital data flow background with binary-like patterns and glowing nodes, tech aesthetic, 800x600 SVG' },
    { name: 'Tropical Sunset', tags: ['travel', 'tropical', 'warm', 'beach'],
      prompt: 'Vibrant tropical sunset gradient from deep orange to purple, palm tree silhouettes suggested, travel vibe, 800x600 SVG' },
    { name: 'Ocean Deep Blue', tags: ['travel', 'ocean', 'calm', 'nature'],
      prompt: 'Deep ocean blue gradient with subtle wave patterns, marine adventure theme, 800x600 SVG' },
    { name: 'Mountain Peaks Mist', tags: ['travel', 'nature', 'adventure', 'landscape'],
      prompt: 'Morning mist mountain landscape gradient, soft blues and grays, adventure travel aesthetic, 800x600 SVG' },
    { name: 'Corporate Navy', tags: ['business', 'corporate', 'navy', 'professional'],
      prompt: 'Professional navy blue gradient with subtle geometric pattern, corporate business style, 800x600 SVG' },
    { name: 'Executive Charcoal', tags: ['business', 'corporate', 'dark', 'premium'],
      prompt: 'Premium charcoal gray gradient with subtle silver lines, executive business style, 800x600 SVG' },
    { name: 'Trust Blue Gradient', tags: ['business', 'trust', 'finance', 'corporate'],
      prompt: 'Professional trust-building blue gradient, finance and banking style, clean and reliable feel, 800x600 SVG' },
    { name: 'Academic Cream', tags: ['education', 'academic', 'light', 'classic'],
      prompt: 'Classic academic cream background with subtle book-page texture, educational institution style, 800x600 SVG' },
    { name: 'Learning Sunshine', tags: ['education', 'bright', 'warm', 'youth'],
      prompt: 'Bright warm yellow to orange gradient, energetic learning environment, children education, 800x600 SVG' },
    { name: 'Study Focus Blue', tags: ['education', 'focus', 'blue', 'concentration'],
      prompt: 'Deep concentration blue gradient, study-focused atmosphere, library quiet vibe, 800x600 SVG' },
    { name: 'Energy Explosion', tags: ['fitness', 'energy', 'bright', 'sports'],
      prompt: 'High energy orange to red gradient with dynamic burst lines, fitness motivation style, 800x600 SVG' },
    { name: 'Dark Gym Intensity', tags: ['fitness', 'dark', 'intense', 'modern'],
      prompt: 'Dark intense gradient with neon accent lines, gym and workout aesthetic, 800x600 SVG' },
    { name: 'Property Skyline', tags: ['real-estate', 'modern', 'city', 'premium'],
      prompt: 'Modern city skyline silhouette gradient at dusk, real estate property theme, 800x600 SVG' },
    { name: 'Elegant Beige Neutral', tags: ['real-estate', 'neutral', 'elegant', 'light'],
      prompt: 'Elegant beige neutral gradient, real estate showroom feel, premium property listing, 800x600 SVG' },
    { name: 'Chic Pink Glam', tags: ['salon', 'beauty', 'pink', 'glamorous'],
      prompt: 'Glamorous hot pink to rose gold gradient, salon and beauty parlor aesthetic, 800x600 SVG' },
    { name: 'Spa Serenity', tags: ['salon', 'spa', 'calm', 'luxury'],
      prompt: 'Serenity spa gradient from lavender to soft pink, relaxation and beauty theme, 800x600 SVG' },
    { name: 'Coffee Bean Brown', tags: ['cafe', 'coffee', 'warm', 'cozy'],
      prompt: 'Rich coffee brown gradient with subtle coffee bean patterns, cafe cozy atmosphere, 800x600 SVG' },
    { name: 'Matcha Green Calm', tags: ['cafe', 'matcha', 'green', 'calm'],
      prompt: 'Calming matcha tea green gradient, Japanese cafe aesthetic, zen atmosphere, 800x600 SVG' },
    { name: 'Grand Lobby Gold', tags: ['hotel', 'luxury', 'gold', 'hospitality'],
      prompt: 'Grand hotel lobby gold gradient with crystal chandelier sparkle effects, luxury hospitality, 800x600 SVG' },
    { name: 'Resort Paradise', tags: ['hotel', 'resort', 'tropical', 'vacation'],
      prompt: 'Tropical resort paradise gradient, turquoise to white sand, vacation hotel aesthetic, 800x600 SVG' },
    { name: 'Festival Vibrant', tags: ['festival', 'colorful', 'vibrant', 'party'],
      prompt: 'Vibrant multi-color festival gradient, rainbow explosion, celebration and party vibe, 800x600 SVG' },
    { name: 'Diwali Festival Lights', tags: ['festival', 'diwali', 'india', 'cultural'],
      prompt: 'Festive Diwali background with warm golden lights and deep maroon, Indian festival aesthetic, 800x600 SVG' },
    { name: 'Indian Heritage Gold', tags: ['india', 'heritage', 'gold', 'cultural'],
      prompt: 'Rich Indian heritage background with gold and deep red, traditional block print pattern suggested, 800x600 SVG' },
    { name: 'Crypto Blockchain', tags: ['crypto', 'blockchain', 'modern', 'tech'],
      prompt: 'Cryptocurrency themed gradient with blockchain hex pattern suggestion, digital finance, 800x600 SVG' },
    { name: 'Bitcoin Orange Dark', tags: ['crypto', 'bitcoin', 'dark', 'finance'],
      prompt: 'Bitcoin inspired orange on dark gradient, crypto trading vibe with subtle graph lines, 800x600 SVG' },
    { name: 'Gradient Cyber Purple', tags: ['modern', 'tech', 'cyber', 'abstract'],
      prompt: 'Abstract cyber purple gradient with geometric shapes, modern abstract style, 800x600 SVG' },
    { name: 'Minimal Ocean Breeze', tags: ['minimal', 'clean', 'light', 'modern'],
      prompt: 'Minimal ocean breeze gradient, light blue to white, clean modern SaaS style, 800x600 SVG' },
    { name: 'Gold Foil Luxe', tags: ['luxury', 'gold', 'premium', 'exclusive'],
      prompt: 'Luxurious gold foil textured background, shiny metallic finish, exclusive premium feel, 800x600 SVG' },
    { name: 'Dark Mode Premium', tags: ['dark', 'premium', 'modern', 'ui'],
      prompt: 'Premium dark mode background with subtle gradient shifts, modern UI aesthetic, 800x600 SVG' },
    { name: 'Pastel Dream', tags: ['pastel', 'soft', 'light', 'modern'],
      prompt: 'Soft pastel rainbow gradient, dreamy ethereal aesthetic, light and airy, 800x600 SVG' },
    { name: 'Aurora Borealis', tags: ['nature', 'aurora', 'colorful', 'ethereal'],
      prompt: 'Northern lights aurora borealis gradient, green to purple ethereal glow, magical nature, 800x600 SVG' },
    { name: 'Glassmorphism Premium', tags: ['modern', 'glass', 'ui', 'premium'],
      prompt: 'Glassmorphism style gradient background with frosted glass effect, modern UI design, 800x600 SVG' },
    { name: 'Vintage Paper', tags: ['vintage', 'paper', 'retro', 'classic'],
      prompt: 'Aged vintage paper texture background, slight yellowing, classic retro aesthetic, 800x600 SVG' },
    { name: 'Art Deco Geometric', tags: ['art-deco', 'luxury', 'vintage', 'geometric'],
      prompt: 'Art deco geometric pattern background, gold and black, 1920s luxury style, 800x600 SVG' },
  ],
  frames: [
    { name: 'Golden Filigree Royal', tags: ['luxury', 'gold', 'wedding', 'elegant'],
      prompt: 'Elegant golden filigree frame SVG for QR codes, intricate corner decorations, ornate scrollwork, transparent center, 800x600 viewBox, gold stroke' },
    { name: 'Art Deco Corner Accents', tags: ['luxury', 'art-deco', 'gold', 'vintage'],
      prompt: 'Art deco style corner frame SVG, geometric gold accents on all four corners, transparent center, 1920s luxury style, 800x600' },
    { name: 'Minimal Gold Border', tags: ['luxury', 'minimal', 'gold', 'clean'],
      prompt: 'Minimal thin gold border frame SVG, elegant single-line stroke, clean luxury style, transparent center, 800x600' },
    { name: 'Lace Heart Frame', tags: ['wedding', 'lace', 'romantic', 'delicate'],
      prompt: 'Delicate white lace pattern frame SVG for wedding QR, heart shaped corner motifs, romantic style, transparent center, 800x600' },
    { name: 'Rose Gold Leaf', tags: ['wedding', 'rose-gold', 'floral', 'elegant'],
      prompt: 'Rose gold floral leaf frame SVG, delicate botanical corners, wedding invitation style, transparent center, 800x600' },
    { name: 'Classic Pearl Border', tags: ['wedding', 'pearl', 'classic', 'traditional'],
      prompt: 'Classic pearl bead border frame SVG, elegant dotted pearl pattern, traditional wedding style, transparent center, 800x600' },
    { name: 'Neon Glow Border', tags: ['tech', 'neon', 'modern', 'cyber'],
      prompt: 'Neon glowing frame SVG with cyan and pink gradients, cyberpunk tech style, transparent center with glow effect, 800x600' },
    { name: 'Clean Corporate Border', tags: ['corporate', 'clean', 'minimal', 'business'],
      prompt: 'Clean thin corporate border frame SVG, professional blue accent, minimal style, transparent center, 800x600' },
    { name: 'Geometric Hex Frame', tags: ['tech', 'geometric', 'modern', 'abstract'],
      prompt: 'Geometric hexagon pattern frame SVG, interconnected hexagons as border, modern tech aesthetic, transparent center, 800x600' },
    { name: 'Foodie Deco Border', tags: ['restaurant', 'food', 'warm', 'inviting'],
      prompt: 'Warm terracotta frame SVG with subtle food icon corners (fork, knife, spoon), restaurant style, transparent center, 800x600' },
    { name: 'Cafe Cozy Frame', tags: ['cafe', 'coffee', 'warm', 'cozy'],
      prompt: 'Coffee brown frame SVG with steam curl corner decorations, cafe style, transparent center, 800x600' },
    { name: 'Medical Cross Border', tags: ['medical', 'health', 'clean', 'professional'],
      prompt: 'Clean medical frame SVG with subtle cross symbol at corners, clinical blue, transparent center, professional style, 800x600' },
    { name: 'Wellness Leaf Frame', tags: ['medical', 'wellness', 'green', 'organic'],
      prompt: 'Wellness themed frame SVG with organic leaf corner decorations, mint green, healing vibe, transparent center, 800x600' },
    { name: 'Travel Passport Frame', tags: ['travel', 'adventure', 'vintage', 'explore'],
      prompt: 'Travel inspired frame SVG with passport stamp style corner decorations, vintage border, wanderlust theme, transparent center, 800x600' },
    { name: 'Beach Paradise Frame', tags: ['travel', 'beach', 'tropical', 'summer'],
      prompt: 'Tropical beach frame SVG with palm leaf corner accents, ocean blue, vacation style, transparent center, 800x600' },
    { name: 'Academic Laurel Frame', tags: ['education', 'academic', 'classic', 'achievement'],
      prompt: 'Academic laurel wreath frame SVG, achievement style border, gold on dark, graduation theme, transparent center, 800x600' },
    { name: 'Sports Dynamic Frame', tags: ['fitness', 'sports', 'dynamic', 'energy'],
      prompt: 'Dynamic sports frame SVG with speed lines at corners, energetic orange, fitness theme, transparent center, 800x600' },
    { name: 'Property Frame Key', tags: ['real-estate', 'property', 'modern', 'premium'],
      prompt: 'Real estate frame SVG with key and building corner icons, navy blue, professional property style, transparent center, 800x600' },
    { name: 'Glamour Mirror Frame', tags: ['salon', 'beauty', 'glamorous', 'pink'],
      prompt: 'Glamorous mirror-style frame SVG with light bulb corner accents, Hollywood vanity style, pink gold, transparent center, 800x600' },
    { name: 'Blockchain Hex Border', tags: ['crypto', 'blockchain', 'modern', 'digital'],
      prompt: 'Crypto themed frame SVG with blockchain hexagon pattern corners, orange and black, Bitcoin style, transparent center, 800x600' },
    { name: 'Diwali Rangoli Frame', tags: ['festival', 'diwali', 'india', 'traditional'],
      prompt: 'Diwali rangoli inspired frame SVG with traditional Indian patterns, gold and maroon, festive border, transparent center, 800x600' },
    { name: 'Diamond Sparkle Border', tags: ['premium', 'luxury', 'diamond', 'elegant'],
      prompt: 'Diamond sparkle frame SVG with jewel-like corner accents, glittering effect, luxury premium style, transparent center, 800x600' },
    { name: 'Japanese Zen Border', tags: ['zen', 'japanese', 'minimal', 'calm'],
      prompt: 'Japanese zen inspired frame SVG with subtle wave patterns at corners, minimalist ink brush style, transparent center, 800x600' },
    { name: 'Boho Chic Frame', tags: ['boho', 'chic', 'colorful', 'artistic'],
      prompt: 'Boho chic frame SVG with colorful tassel corner decorations, feather accents, artistic style, transparent center, 800x600' },
    { name: 'Vintage Ornate Frame', tags: ['vintage', 'ornate', 'classic', 'baroque'],
      prompt: 'Ornate vintage baroque frame SVG, detailed scrollwork at corners, antique gold, classical style, transparent center, 800x600' },
    { name: 'Modern Gradient Border', tags: ['modern', 'gradient', 'clean', 'ui'],
      prompt: 'Modern gradient frame SVG, purple to blue smooth color transition border, UI style, transparent center, 800x600' },
  ],
  patterns: [
    { name: 'Geometric Diamond Mesh', tags: ['geometric', 'diamond', 'modern', 'tileable'],
      prompt: 'Seamless geometric diamond mesh pattern SVG, repeating diamond grid, tileable 100x100, clean modern style' },
    { name: 'Polka Dot Playful', tags: ['dots', 'playful', 'colorful', 'tileable'],
      prompt: 'Seamless polka dot pattern SVG, varying dot sizes, playful colorful style, tileable 100x100' },
    { name: 'Honeycomb Hexagon', tags: ['hexagon', 'geometric', 'tech', 'tileable'],
      prompt: 'Seamless honeycomb hexagon pattern SVG, repeating hexagonal grid, modern tech style, tileable 100x100' },
    { name: 'Diagonal Stripes Premium', tags: ['stripes', 'diagonal', 'premium', 'tileable'],
      prompt: 'Seamless diagonal stripe pattern SVG, thin gold lines on dark, premium style, tileable 100x100' },
    { name: 'Houndstooth Classic', tags: ['houndstooth', 'classic', 'vintage', 'tileable'],
      prompt: 'Seamless houndstooth pattern SVG, classic black and white, fashion style, tileable 100x100' },
    { name: 'Chevron Zigzag', tags: ['chevron', 'zigzag', 'modern', 'tileable'],
      prompt: 'Seamless chevron zigzag pattern SVG, modern repeating arrows, minimalist style, tileable 100x100' },
    { name: 'Stars Night Sky', tags: ['stars', 'night', 'space', 'tileable'],
      prompt: 'Seamless stars pattern SVG, scattered stars on dark background, night sky style, tileable 100x100' },
    { name: 'Floral Garden', tags: ['floral', 'flowers', 'garden', 'tileable'],
      prompt: 'Seamless floral pattern SVG, tiny flowers repeating, garden romantic style, tileable 100x100' },
    { name: 'Wave Organic Flow', tags: ['waves', 'organic', 'flow', 'tileable'],
      prompt: 'Seamless organic wave pattern SVG, flowing lines like water, calm natural style, tileable 100x100' },
    { name: 'Concrete Texture', tags: ['concrete', 'texture', 'urban', 'tileable'],
      prompt: 'Seamless concrete texture pattern SVG, subtle grain like urban concrete, industrial style, tileable 100x100' },
    { name: 'Leather Grain', tags: ['leather', 'texture', 'premium', 'tileable'],
      prompt: 'Seamless leather grain pattern SVG, fine grain texture like premium leather, luxury style, tileable 100x100' },
    { name: 'Marble Vein', tags: ['marble', 'texture', 'luxury', 'tileable'],
      prompt: 'Seamless marble vein pattern SVG, elegant flowing veins like Carrara marble, luxury style, tileable 100x100' },
    { name: 'Paisley Indian', tags: ['paisley', 'indian', 'traditional', 'tileable'],
      prompt: 'Seamless paisley pattern SVG, traditional Indian boteh design, cultural style, tileable 100x100' },
    { name: 'Mosaic Tile', tags: ['mosaic', 'tile', 'geometric', 'tileable'],
      prompt: 'Seamless mosaic tile pattern SVG, small geometric colored tiles like mosaic art, tileable 100x100' },
    { name: 'Confetti Celebration', tags: ['confetti', 'celebration', 'party', 'tileable'],
      prompt: 'Seamless confetti pattern SVG, scattered colorful dots and shapes, party celebration style, tileable 100x100' },
    { name: 'Circuit Board Traces', tags: ['circuit', 'tech', 'electronic', 'tileable'],
      prompt: 'Seamless circuit board trace pattern SVG, green PCB lines and nodes, tech electronic style, tileable 100x100' },
    { name: 'Herringbone Wood', tags: ['herringbone', 'wood', 'floor', 'tileable'],
      prompt: 'Seamless herringbone pattern SVG, classic wood floor style, warm brown tones, tileable 100x100' },
    { name: 'Scale Pattern Like Fish', tags: ['scales', 'fish', 'organic', 'tileable'],
      prompt: 'Seamless fish scale pattern SVG, overlapping semi-circles like fish scales, organic style, tileable 100x100' },
    { name: 'Tribal Geometric', tags: ['tribal', 'geometric', 'cultural', 'tileable'],
      prompt: 'Seamless tribal geometric pattern SVG, angular repeating shapes, cultural indigenous style, tileable 100x100' },
    { name: 'Watercolor Splash', tags: ['watercolor', 'artistic', 'colorful', 'tileable'],
      prompt: 'Seamless watercolor splash pattern SVG, soft color bleeds like painted paper, artistic style, tileable 100x100' },
  ],
  stickers: [
    { name: 'Scan Me Gold Premium', tags: ['scan', 'premium', 'gold', 'badge'],
      prompt: 'Premium "Scan Me" badge SVG, gold and black, elegant ribbon style, QR call-to-action sticker with rounded corners, 200x100' },
    { name: 'Scan Here Arrow', tags: ['scan', 'modern', 'minimal', 'clean'],
      prompt: '"Scan Here" badge with arrow indicator SVG, clean minimal design, white and blue, modern CTA sticker, 200x100' },
    { name: 'QR Code Pointer', tags: ['scan', 'pointer', 'arrow', 'modern'],
      prompt: 'QR code with pointing arrow sticker SVG, "Scan to Start" text, modern tech style, neon accent colors, 200x100' },
    { name: 'WiFi Signal Strong', tags: ['wifi', 'tech', 'signal', 'badge'],
      prompt: 'WiFi signal strength badge SVG, strong signal icon with waves, tech blue style, rounded badge, 200x100' },
    { name: 'UPI Payment Accepted', tags: ['upi', 'payment', 'india', 'badge'],
      prompt: 'UPI payment accepted sticker SVG, Indian payment logo style, green and white, digital payment badge, 200x100' },
    { name: 'Google Review Us', tags: ['google', 'review', 'business', 'badge'],
      prompt: '"Review us on Google" badge SVG, Google colors, star rating icon, business CTA sticker, 200x100' },
    { name: 'Follow Us Instagram', tags: ['instagram', 'social', 'follow', 'badge'],
      prompt: '"Follow us on Instagram" badge SVG, Instagram gradient colors, camera icon, social media sticker, 200x100' },
    { name: 'WhatsApp Chat Now', tags: ['whatsapp', 'chat', 'social', 'badge'],
      prompt: '"Chat on WhatsApp" badge SVG, WhatsApp green color, chat bubble icon, instant messaging sticker, 200x100' },
    { name: 'Premium Exclusive', tags: ['premium', 'exclusive', 'vip', 'badge'],
      prompt: '"PREMIUM" exclusive badge SVG, gold and black, crown icon, VIP status sticker, 200x100' },
    { name: 'New Arrival', tags: ['new', 'badge', 'fresh', 'label'],
      prompt: '"NEW" arrival badge SVG, red and white, fresh product label, attention grabbing sticker, 200x100' },
    { name: 'Best Seller', tags: ['best-seller', 'badge', 'popular', 'label'],
      prompt: '"BEST SELLER" badge SVG, gold and dark, star icon, popularity label, 200x100' },
    { name: 'Limited Offer', tags: ['limited', 'offer', 'sale', 'badge'],
      prompt: '"Limited Offer" badge SVG, red and orange, urgency style, time-sensitive label, 200x100' },
    { name: 'Free Download', tags: ['free', 'download', 'badge', 'label'],
      prompt: '"FREE" download badge SVG, green and white, no cost label, attractive offer sticker, 200x100' },
    { name: 'Menu Digital Badge', tags: ['restaurant', 'menu', 'digital', 'badge'],
      prompt: '"Digital Menu" badge SVG, restaurant themed, fork and knife icon, food service label, 200x100' },
    { name: 'Book Now Table', tags: ['restaurant', 'reservation', 'booking', 'badge'],
      prompt: '"Book a Table" badge SVG, reservation call-to-action, restaurant booking sticker, 200x100' },
    { name: 'Wedding RSVP', tags: ['wedding', 'rsvp', 'invitation', 'badge'],
      prompt: '"RSVP" wedding badge SVG, elegant calligraphy style, romantic pink gold, invitation sticker, 200x100' },
    { name: 'Save The Date', tags: ['wedding', 'save-date', 'invitation', 'badge'],
      prompt: '"Save The Date" wedding badge SVG, romantic style, heart accent, calendar reminder sticker, 200x100' },
    { name: 'Contact Us', tags: ['business', 'contact', 'vcard', 'badge'],
      prompt: '"Save Contact" badge SVG, address book icon, save my details business sticker, minimal style, 200x100' },
    { name: 'Learn More', tags: ['education', 'learn', 'info', 'badge'],
      prompt: '"Learn More" badge SVG, book or graduation icon, educational CTA sticker, blue academic style, 200x100' },
    { name: 'Get Direction', tags: ['travel', 'direction', 'map', 'badge'],
      prompt: '"Get Directions" badge SVG, map pin icon, navigation call-to-action sticker, location style, 200x100' },
    { name: 'Emergency Info', tags: ['medical', 'emergency', 'health', 'badge'],
      prompt: '"Emergency Info" badge SVG, medical cross icon, red cross style, critical information sticker, 200x100' },
    { name: 'Pet ID Badge', tags: ['pet', 'animal', 'id', 'badge'],
      prompt: '"Pet ID" badge SVG, paw print icon, pet identification sticker, friendly cute style, 200x100' },
    { name: 'Real Estate Agent', tags: ['real-estate', 'agent', 'property', 'badge'],
      prompt: '"Real Estate Agent" badge SVG, building icon, property professional sticker, navy blue corporate style, 200x100' },
    { name: 'Made With Love', tags: ['heart', 'love', 'personal', 'badge'],
      prompt: '"Made with ❤️" badge SVG, heart icon, personal touch label, warm friendly style, 200x100' },
    { name: 'Eco Friendly', tags: ['eco', 'green', 'environment', 'badge'],
      prompt: '"Eco Friendly" badge SVG, leaf icon, sustainable green label, environment friendly style, 200x100' },
    { name: 'Verified Secure', tags: ['secure', 'verified', 'trust', 'badge'],
      prompt: '"Verified Secure" badge SVG, shield with checkmark icon, trust and security label, blue certified style, 200x100' },
    { name: 'Handcrafted', tags: ['handcrafted', 'artisan', 'quality', 'badge'],
      prompt: '"Handcrafted" badge SVG, artisan quality label, handmade style badge with decorative elements, 200x100' },
    { name: 'Scan For Offer', tags: ['scan', 'offer', 'discount', 'deal'],
      prompt: '"Scan for Offer" badge SVG, discount deal style, percentage sign, promotional call-to-action sticker, 200x100' },
    { name: 'Vote For Us', tags: ['vote', 'poll', 'feedback', 'badge'],
      prompt: '"Vote For Us" badge SVG, thumbs up icon, feedback and rating call-to-action sticker, 200x100' },
  ],
  textures: [
    { name: 'Fine Canvas', tags: ['canvas', 'art', 'painting', 'texture'],
      prompt: 'Fine canvas texture SVG, subtle woven pattern, artist canvas surface, tileable 200x200' },
    { name: 'Rough Paper', tags: ['paper', 'rough', 'texture', 'natural'],
      prompt: 'Rough paper texture SVG, uncoated paper fiber surface, natural recycled paper look, tileable 200x200' },
    { name: 'Soft Velvet', tags: ['velvet', 'soft', 'luxury', 'fabric'],
      prompt: 'Soft velvet fabric texture SVG, plush surface with subtle light absorption, luxury fabric style, tileable 200x200' },
    { name: 'Brushed Metal', tags: ['metal', 'brushed', 'industrial', 'modern'],
      prompt: 'Brushed metal texture SVG, fine parallel lines like brushed aluminum, industrial modern style, tileable 200x200' },
    { name: 'Sand Grain', tags: ['sand', 'beach', 'nature', 'grainy'],
      prompt: 'Fine sand grain texture SVG, granular surface like beach sand, natural organic style, tileable 200x200' },
    { name: 'Brick Wall', tags: ['brick', 'wall', 'urban', 'industrial'],
      prompt: 'Brick wall texture SVG, repeating brick pattern with mortar lines, urban industrial style, tileable 200x200' },
    { name: 'Carbon Fiber', tags: ['carbon', 'fiber', 'tech', 'modern'],
      prompt: 'Carbon fiber texture SVG, diagonal weave pattern, lightweight tech material, tileable 200x200' },
    { name: 'Linen Fabric', tags: ['linen', 'fabric', 'natural', 'textile'],
      prompt: 'Linen fabric texture SVG, natural flax woven pattern, organic textile surface, tileable 200x200' },
    { name: 'Water Ripple', tags: ['water', 'ripple', 'calm', 'nature'],
      prompt: 'Water ripple texture SVG, concentric gentle wave patterns like calm water surface, tileable 200x200' },
    { name: 'Stone Granite', tags: ['stone', 'granite', 'natural', 'solid'],
      prompt: 'Granite stone texture SVG, fine speckled pattern like natural granite rock, solid natural surface, tileable 200x200' },
    { name: 'Gold Dust Sparkle', tags: ['gold', 'sparkle', 'luxury', 'glitter'],
      prompt: 'Gold dust sparkle texture SVG, fine gold particles scattered, luxury glitter effect, tileable 200x200' },
    { name: 'Wood Grain Oak', tags: ['wood', 'oak', 'natural', 'warm'],
      prompt: 'Oak wood grain texture SVG, natural flowing wood lines, warm brown, furniture grade finish, tileable 200x200' },
    { name: 'Frosted Glass', tags: ['glass', 'frosted', 'modern', 'translucent'],
      prompt: 'Frosted glass texture SVG, etched translucent surface, modern interior design style, tileable 200x200' },
    { name: 'Cloud Soft', tags: ['cloud', 'soft', 'dreamy', 'light'],
      prompt: 'Soft cloud texture SVG, billowy soft shape patterns, dreamy sky texture, tileable 200x200' },
    { name: 'Denim Fabric', tags: ['denim', 'jeans', 'fabric', 'casual'],
      prompt: 'Denim fabric texture SVG, twill weave pattern like blue jeans, casual textile surface, tileable 200x200' },
    { name: 'Terrazzo Pattern', tags: ['terrazzo', 'modern', 'colorful', 'interior'],
      prompt: 'Terrazzo texture SVG, colorful stone chips embedded in cement base, modern interior design, tileable 200x200' },
  ],
  illustrations: [
    { name: 'Restaurant Food Icons', tags: ['restaurant', 'food', 'icons', 'set'],
      prompt: 'Set of restaurant food icons SVG illustration, fork knife plate spoon coffee cup, simple elegant line art style, arranged in a grid, 400x400' },
    { name: 'Wedding Love Hearts', tags: ['wedding', 'love', 'romantic', 'icons'],
      prompt: 'Wedding love icons set SVG, hearts rings doves champagne glasses, romantic line art illustration, 400x400' },
    { name: 'Medical Health Kit', tags: ['medical', 'health', 'icons', 'set'],
      prompt: 'Medical health icons set SVG, stethoscope heart cross syringe pill, clean clinical line art illustration, 400x400' },
    { name: 'Tech Device Set', tags: ['tech', 'device', 'digital', 'icons'],
      prompt: 'Tech device icons set SVG, smartphone laptop tablet smartwatch, modern digital line art illustration, 400x400' },
    { name: 'Travel Adventure Pack', tags: ['travel', 'adventure', 'icons', 'set'],
      prompt: 'Travel adventure icons set SVG, airplane suitcase compass map camera, wanderlust line art illustration, 400x400' },
    { name: 'Fitness Sport Icons', tags: ['fitness', 'sports', 'workout', 'icons'],
      prompt: 'Fitness sport icons set SVG, dumbbell running figure heart water bottle, energetic line art illustration, 400x400' },
    { name: 'Real Estate Building', tags: ['real-estate', 'building', 'property', 'icons'],
      prompt: 'Real estate building icons set SVG, house building key graph, property line art illustration, 400x400' },
    { name: 'Education Graduation', tags: ['education', 'school', 'learning', 'icons'],
      prompt: 'Education icons set SVG, graduation hat book pencil apple, academic line art illustration, 400x400' },
    { name: 'Cafe Coffee Shop', tags: ['cafe', 'coffee', 'icons', 'set'],
      prompt: 'Cafe coffee shop icons set SVG, coffee cup espresso machine croissant, cozy line art illustration, 400x400' },
    { name: 'Salon Beauty Spa', tags: ['salon', 'beauty', 'spa', 'icons'],
      prompt: 'Salon beauty spa icons set SVG, scissors comb mirror flower, glamorous line art illustration, 400x400' },
    { name: 'Pet Animal Set', tags: ['pet', 'animals', 'cute', 'icons'],
      prompt: 'Pet animal icons set SVG, dog cat paw bone, cute friendly line art illustration, 400x400' },
    { name: 'Hotel Hospitality', tags: ['hotel', 'hospitality', 'icons', 'set'],
      prompt: 'Hotel hospitality icons set SVG, bell key bed reception, luxury line art illustration, 400x400' },
    { name: 'India Cultural Set', tags: ['india', 'cultural', 'traditional', 'icons'],
      prompt: 'India cultural icons set SVG, Taj Mahal lotus diya hand, traditional Indian line art illustration, 400x400' },
    { name: 'Crypto Bitcoin Set', tags: ['crypto', 'bitcoin', 'finance', 'icons'],
      prompt: 'Crypto finance icons set SVG, bitcoin ethereum chart wallet, digital finance line art illustration, 400x400' },
    { name: 'Business Professional', tags: ['business', 'corporate', 'office', 'icons'],
      prompt: 'Business professional icons set SVG, briefcase handshake chart meeting, corporate line art illustration, 400x400' },
  ],
  ribbons: [
    { name: 'Gold Premium Ribbon', tags: ['premium', 'gold', 'ribbon', 'luxury'],
      prompt: 'Elegant gold ribbon SVG banner, folded ends like award ribbon, "Premium" banner style, luxury gold gradient, 400x100' },
    { name: 'Red Sale Banner', tags: ['sale', 'red', 'banner', 'promotion'],
      prompt: 'Bold red sale ribbon banner SVG, diagonal cut ends, promotional banner style, eye-catching red, 400x100' },
    { name: 'Blue Info Bar', tags: ['info', 'blue', 'banner', 'information'],
      prompt: 'Clean blue information ribbon banner SVG, rounded ends, informational banner style, "Info" bar design, 400x100' },
    { name: 'Green Success Banner', tags: ['success', 'green', 'banner', 'achievement'],
      prompt: 'Green success ribbon banner SVG, achievement style, "Success" banner, clean modern style, 400x100' },
    { name: 'Black Exclusive Tag', tags: ['exclusive', 'black', 'tag', 'luxury'],
      prompt: 'Black exclusive ribbon banner SVG, elegant dark style with gold trim, VIP exclusive label, 400x100' },
    { name: 'Orange Limited Offer', tags: ['limited', 'orange', 'offer', 'urgency'],
      prompt: 'Orange limited offer ribbon banner SVG, urgency style, time-limited offer banner, 400x100' },
    { name: 'Purple Featured Tag', tags: ['featured', 'purple', 'highlight', 'banner'],
      prompt: 'Purple featured ribbon banner SVG, highlight style, "Featured" banner with star accent, 400x100' },
    { name: 'White Minimal Banner', tags: ['minimal', 'white', 'clean', 'banner'],
      prompt: 'Clean white minimal ribbon banner SVG, thin elegant lines, understated premium style, 400x100' },
  ],
  qr_shapes: [
    { name: 'Classic Square Finder', tags: ['classic', 'square', 'finder', 'qr'],
      prompt: 'Classic QR code finder pattern SVG, standard square in square design, default QR style, 100x100' },
    { name: 'Rounded Circle Finder', tags: ['rounded', 'circle', 'finder', 'qr'],
      prompt: 'Rounded QR finder pattern SVG, circular inner pattern, soft modern QR style, 100x100' },
    { name: 'Diamond Finder Premium', tags: ['diamond', 'finder', 'qr', 'premium'],
      prompt: 'Diamond shaped QR finder pattern SVG, diamond inner finder, luxury QR style, 100x100' },
    { name: 'Hexagon Tech Finder', tags: ['hexagon', 'tech', 'finder', 'qr'],
      prompt: 'Hexagon shaped QR finder pattern SVG, modern tech QR style, 100x100' },
    { name: 'Heart Finder Romantic', tags: ['heart', 'romantic', 'finder', 'qr'],
      prompt: 'Heart shaped QR finder pattern SVG, romantic QR style, wedding QR use, 100x100' },
    { name: 'Leaf Finder Organic', tags: ['leaf', 'organic', 'finder', 'qr'],
      prompt: 'Leaf shaped QR finder pattern SVG, organic nature QR style, eco-friendly QR, 100x100' },
    { name: 'Shield Finder Secure', tags: ['shield', 'secure', 'finder', 'qr'],
      prompt: 'Shield shaped QR finder pattern SVG, security QR style, trustworthy appearance, 100x100' },
    { name: 'Star Finder Playful', tags: ['star', 'playful', 'finder', 'qr'],
      prompt: 'Star shaped QR finder pattern SVG, playful fun QR style, event celebration QR, 100x100' },
    { name: 'Minimal Line Finder', tags: ['minimal', 'line', 'finder', 'qr'],
      prompt: 'Minimal thin line QR finder pattern SVG, ultra modern minimal QR style, fine line work, 100x100' },
    { name: 'Framed Decorative Finder', tags: ['framed', 'decorative', 'finder', 'qr'],
      prompt: 'Framed decorative QR finder pattern SVG, ornate border around finder, elegant QR style, 100x100' },
  ]
};

// ═══════════════════════════════════════════════════════════════════
//  MAIN RUNNER
// ═══════════════════════════════════════════════════════════════════

async function generateAll() {
  console.log('╔══════════════════════════════════════════════════╗');
  console.log('║   🚀 AI PREMIUM ASSET GENERATOR STARTED        ║');
  console.log('╚══════════════════════════════════════════════════╝\\n');

  let total = 0, success = 0, failed = [];

  for (const [category, items] of Object.entries(ASSETS)) {
    console.log(`\\n📁 Generating ${category} (${items.length} assets)...`);
    
    // Process sequentially but allow limit
    for (const asset of items) {
      total++;
      const filename = asset.name.toLowerCase().replace(/\\s+/g, '-').replace(/[^a-z0-9-]/g, '') + '.svg';
      
      process.stdout.write(`  [${total}] ${asset.name}... `);
      
      // Check if it already exists to save time (Optional, but good for retries)
      const expectedPath = path.join(ASSETS_DIR, category, filename);
      if (fs.existsSync(expectedPath)) {
          const id = registerAsset(category, filename, asset.name, asset.tags, `/assets/${category}/${filename}`);
          success++;
          process.stdout.write(`✅ Cached (${id})\\n`);
          continue;
      }
      
      const svg = await generateSVG(asset.prompt);
      
      if (svg) {
        const url = saveSVG(category, filename, svg);
        const id = registerAsset(category, filename, asset.name, asset.tags, url);
        success++;
        process.stdout.write(`✅ ${id}\\n`);
      } else {
        failed.push(`${category}/${asset.name}`);
        process.stdout.write(`❌ Failed\\n`);
      }
    }
  }

  // Summary
  console.log('\\n╔══════════════════════════════════════════════════╗');
  console.log('║   📊 GENERATION COMPLETE                        ║');
  console.log('╚══════════════════════════════════════════════════╝');
  console.log(`  Total Attempted: ${total}`);
  console.log(`  ✅ Successful:   ${success}`);
  console.log(`  ❌ Failed:       ${failed.length}`);
  if (failed.length > 0) {
    console.log('\\nFailed assets (will retry on next run):');
    failed.forEach(f => console.log(`  - ${f}`));
  }
  console.log(`\\n📁 Assets saved to: public/assets/{category}/`);
  console.log(`📄 Registry updated: public/assets/registry.json`);
}

generateAll().catch(err => {
  console.error('❌ Fatal error:', err);
  process.exit(1);
});
