import React, { useState, useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { 
  ArrowRight, Sparkles, LayoutGrid, CreditCard, Image as ImageIcon, Tag, QrCode, 
  ArrowUpRight, Check, Heart, Shield, Layers, Search, Star, Globe, ShieldCheck, 
  Smartphone, Scan, RefreshCw, Sliders, ChevronDown, ChevronRight, MessageSquare, 
  Activity, HelpCircle, Mail, Phone, MapPin, Laptop, Menu, X, ArrowLeft, ArrowRight as ArrowRightIcon,
  Wifi, HelpCircle as HelpIcon, FileText, Send, Share2, Award, Printer, Lock, Download, Copy, Crown
} from 'lucide-react';
import { DUMMY_TEMPLATES } from './PremiumTemplates';

// ==========================================
// STATIC MOCK DATA MATCHING MASTER BLUEPRINT
// ==========================================

const POPULAR_SEARCHES = [
  'WiFi', 'UPI', 'Menu', 'Business Card', 'Google Review', 'Restaurant', 
  'PDF', 'Wedding RSVP', 'Pet ID', 'Airbnb', 'Real Estate', 'Event', 'Location'
];

const CATEGORIES = [
  'All', 'Posters', 'vCards', 'Flyers', 'Stickers', 'Shapes', 'Art QR'
];

const FEATURED_EXPERIENCES = [
  {
    id: 'exp1',
    title: 'Airbnb Welcome Guide',
    tag: 'BEST SELLER',
    bgColor: 'bg-gradient-to-br from-rose-500 to-rose-700',
    qrColor: '#E11D48',
    shape: 'rounded',
    desc: 'Scan to view house manual, checkout rules, and local guidebooks instantly.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'exp2',
    title: 'Wedding RSVP',
    tag: 'POPULAR',
    bgColor: 'bg-gradient-to-br from-amber-50 to-orange-100 text-slate-800',
    qrColor: '#D97706',
    shape: 'lotus',
    desc: 'Collect RSVPs, meal preferences, and song requests in a beautiful bespoke portal.',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'exp3',
    title: 'Pet ID Tag',
    tag: 'SECURE',
    bgColor: 'bg-gradient-to-br from-emerald-500 to-teal-700',
    qrColor: '#059669',
    shape: 'star',
    desc: 'Keep your pets safe with smart QR tags. Instantly ping owners on coordinate scan.',
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'exp4',
    title: 'Restaurant Menu',
    tag: 'DYNAMIC',
    bgColor: 'bg-gradient-to-br from-slate-900 to-slate-950',
    qrColor: '#F59E0B',
    shape: 'circle',
    desc: 'Digital touchless menu for a premium, clean dining experience with analytics.',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'exp5',
    title: 'Real Estate Brochure',
    tag: 'NEW',
    bgColor: 'bg-gradient-to-br from-indigo-500 to-purple-700',
    qrColor: '#4F46E5',
    shape: 'wave',
    desc: 'Share property virtual tours, price catalog sheets, and broker contacts instantly.',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=400'
  }
];

const POPULAR_TOOLS = [
  { name: 'WiFi Connect', icon: Wifi, desc: 'Instant WiFi Access', color: 'text-emerald-600 bg-emerald-50', toolId: 'secure-wifi-share-auto-expiry-network-access' },
  { name: 'UPI Payment', icon: CreditCard, desc: 'Scan. Pay. Done.', color: 'text-indigo-600 bg-indigo-50', toolId: 'free-upi-qr-code-styled-generator-with-amount' },
  { name: 'Menu QR', icon: LayoutGrid, desc: 'Digital Menu', color: 'text-amber-600 bg-amber-50', toolId: 'digital-online-menu-qr-code-contactless-dining' },
  { name: 'PDF to QR', icon: FileText, desc: 'Share PDF Files', color: 'text-rose-600 bg-rose-50', toolId: 'free-pdf-menu-qr-code-generator-for-restaurants' },
  { name: 'Google Maps', icon: MapPin, desc: 'Location QR', color: 'text-blue-600 bg-blue-50', toolId: 'street-address-maps-qr-code-home-delivery' },
  { name: 'Business Card', icon: CreditCard, desc: 'Share Contact', color: 'text-purple-600 bg-purple-50', toolId: 'real-estate-agent-contact-qr-code-vcard' },
  { name: 'Event Ticket', icon: Tag, desc: 'Digital Ticket', color: 'text-fuchsia-600 bg-fuchsia-50', toolId: 'event-ticket-registration-qr-code-admissions' },
  { name: 'InstantCard', icon: Smartphone, desc: 'Smart Contact', color: 'text-teal-600 bg-teal-50', toolId: 'instantcard-free-contact-sharing-qr-code' }
];

const PREMIUM_SHAPES = [
  { name: 'Sakura', color: 'stroke-rose-500 fill-rose-50/50' },
  { name: 'Waveform', color: 'stroke-blue-500 fill-blue-50/50' },
  { name: 'Star', color: 'stroke-amber-500 fill-amber-50/50' },
  { name: 'Fibonacci', color: 'stroke-orange-500 fill-orange-50/50' },
  { name: 'Arabic Calligraphy', color: 'stroke-purple-500 fill-purple-50/50' },
  { name: 'Vinyl Record', color: 'stroke-slate-900 fill-slate-50/50' },
  { name: 'Lotus', color: 'stroke-pink-500 fill-pink-50/50' },
  { name: 'Mandala', color: 'stroke-indigo-500 fill-indigo-50/50' }
];

const TESTIMONIALS = [
  {
    name: 'Neha Sharma',
    role: 'Cafe Owner',
    stars: 5,
    text: 'A2ZQR helped us create beautiful menu QRs for our cafe. Super easy and the templates are amazing!',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150'
  },
  {
    name: 'Arjun Verma',
    role: 'Groom',
    stars: 5,
    text: 'We used the Wedding RSVP template. Got 200+ responses in a day. Highly recommended!',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'
  },
  {
    name: 'Priya Das',
    role: 'Event Planner',
    stars: 5,
    text: "Best QR generator I've used. The poster download feature is a game changer for branding.",
    img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150'
  }
];

const FAQS = [
  { q: "Is A2ZQR really free to use?", a: "Yes! You can create unlimited static QR codes with custom styling, custom colors, and shapes absolutely free. Advanced templates, analytics tracking, and print-ready high DPI vector files require a Pro subscription." },
  { q: "What makes A2ZQR different from a simple QR generator?", a: "Traditional generators only yield black and white codes. A2ZQR is an all-in-one experience platform where you can custom-design complete printable posters, smart digital vCards, circular sticker sheets, and artistic framing templates within one editor." },
  { q: "Can I download vector formats like SVG or PDF?", a: "Absolutely. Pro plan users can download design outlines as lossless SVG, print-ready high DPI PDF vectors, or ultra-crisp transparent PNGs safe for large commercial prints." },
  { q: "How do dynamic QR codes work on your platform?", a: "Dynamic QR codes allow you to edit the destination link, contact info, or menu card payload at any time without reprinting the physical QR. They also collect rich scan analytics like time, device, and location coordinates." },
  { q: "Do you offer templates for specific businesses like hotels or restaurants?", a: "Yes, we feature over 500+ premium layout backdrops specifically designed for cafes, medical lobbies, real estate agents, Airbnb stays, hotel wifi check-ins, and wedding events." },
  { q: "Will my custom-shaped QR code scan properly?", a: "Every single design on A2ZQR passes our automated scanner verification protocol before export, guaranteeing 99.9% read rates on both older Android devices and luxury iOS smartphones." },
  { q: "Can I embed my company logo inside the code?", a: "Yes, you can upload any custom brand logo, square icon, or choose from our curated library of premium vector badges (like Star, Heart, Instagram, etc.) to place directly in the center of your code." },
  { q: "Is my scanning data private?", a: "We value privacy. All static code configurations, URL definitions, and image components are processed entirely on your local browser sandbox. We never track or log scan payloads of static QR codes." }
];

// ==========================================
// CUSTOM VECTOR SHAPES RENDERING (Premium UI)
// ==========================================

function PremiumQRArtwork({ shapeName = 'Mandala', color = '#4F46E5' }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full p-1 transition-transform duration-300 hover:scale-105" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background radial glow */}
      <circle cx="50" cy="50" r="46" className="fill-slate-50/50" />
      
      {/* Outer Aesthetic Border */}
      {shapeName === 'Mandala' && (
        <>
          <circle cx="50" cy="50" r="44" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M50 2A48 48 0 0 1 98 50A48 48 0 0 1 50 98A48 48 0 0 1 2 50A48 48 0 0 1 50 2" stroke={color} strokeWidth="1" strokeDasharray="6 4" />
          {/* Inner Mandala Petals */}
          <path d="M50 15 C45 35, 55 35, 50 15 Z M50 85 C45 65, 55 65, 50 85 Z M15 50 C35 45, 35 55, 15 50 Z M85 50 C65 45, 65 55, 85 50 Z" fill={color} opacity="0.15" />
        </>
      )}

      {shapeName === 'Sakura' && (
        <>
          <path d="M50 4L54 20L70 16L58 28L72 38L55 42L60 58L47 48L38 62L36 45L20 48L32 36L18 24L34 24L38 8L46 20Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" fill={`${color}15`} />
          <circle cx="50" cy="50" r="45" stroke={color} strokeWidth="0.75" strokeDasharray="4 4" />
        </>
      )}

      {shapeName === 'Waveform' && (
        <>
          <circle cx="50" cy="50" r="44" stroke={color} strokeWidth="1.5" />
          <path d="M20 50 L25 45 L30 55 L35 35 L40 65 L45 42 L50 58 L55 30 L60 70 L65 48 L70 52 L75 45 L80 50" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}

      {shapeName === 'Star' && (
        <>
          <polygon points="50,4 63,33 95,33 69,52 79,84 50,65 21,84 31,52 5,33 37,33" stroke={color} strokeWidth="2" strokeLinejoin="round" fill={`${color}10`} />
          <circle cx="50" cy="50" r="28" stroke={color} strokeWidth="1" strokeDasharray="2 2" />
        </>
      )}

      {shapeName === 'Fibonacci' && (
        <>
          <path d="M50 50 A 5 5 0 0 1 55 55 A 10 10 0 0 1 45 65 A 20 20 0 0 1 45 45 A 30 30 0 0 1 75 45 A 40 40 0 0 1 75 85" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <circle cx="50" cy="50" r="44" stroke={color} strokeWidth="1" strokeDasharray="4 2" />
        </>
      )}

      {shapeName === 'Lotus' && (
        <>
          <path d="M50 10 C40 35, 30 50, 50 90 C70 50, 60 35, 50 10 Z" fill={`${color}15`} stroke={color} strokeWidth="1.5" />
          <path d="M50 30 C25 45, 20 60, 50 90 C80 60, 75 45, 50 30 Z" fill={`${color}10`} stroke={color} strokeWidth="1" />
          <path d="M50 45 C15 55, 10 70, 50 90 C90 70, 85 55, 50 45 Z" fill={`${color}05`} stroke={color} strokeWidth="1" />
        </>
      )}

      {/* Embedded High Fidelity QR elements inside shapes to verify QR connection */}
      <rect x="22" y="22" width="16" height="16" rx="3" stroke={color} strokeWidth="2.5" fill="white" />
      <rect x="26" y="26" width="8" height="8" rx="1.5" fill={color} />

      <rect x="62" y="22" width="16" height="16" rx="3" stroke={color} strokeWidth="2.5" fill="white" />
      <rect x="66" y="26" width="8" height="8" rx="1.5" fill={color} />

      <rect x="22" y="62" width="16" height="16" rx="3" stroke={color} strokeWidth="2.5" fill="white" />
      <rect x="26" y="66" width="8" height="8" rx="1.5" fill={color} />

      {/* Mini QR modules inside */}
      <rect x="44" y="22" width="4" height="4" fill={color} />
      <rect x="50" y="26" width="4" height="4" fill={color} />
      <rect x="44" y="32" width="4" height="4" fill={color} />
      <rect x="54" y="32" width="4" height="4" fill={color} />

      <rect x="22" y="44" width="4" height="4" fill={color} />
      <rect x="30" y="48" width="4" height="4" fill={color} />
      <rect x="34" y="44" width="4" height="4" fill={color} />
      
      <rect x="44" y="44" width="12" height="12" rx="2" fill="white" stroke={color} strokeWidth="1.5" />
      <circle cx="50" cy="50" r="3" fill={color} />

      <rect x="62" y="44" width="4" height="4" fill={color} />
      <rect x="70" y="48" width="4" height="4" fill={color} />
      <rect x="66" y="54" width="4" height="4" fill={color} />
      
      <rect x="44" y="62" width="4" height="4" fill={color} />
      <rect x="52" y="66" width="4" height="4" fill={color} />
      <rect x="48" y="72" width="4" height="4" fill={color} />
      
      <rect x="62" y="62" width="4" height="4" fill={color} />
      <rect x="70" y="62" width="4" height="4" fill={color} />
      <rect x="66" y="70" width="8" height="4" fill={color} />
      <rect x="74" y="74" width="4" height="4" fill={color} />
    </svg>
  );
}

// ==========================================
// MAIN LANDING PAGE COMPONENT (Master SaaS)
// ==========================================

export default function LandingPage({ 
  onEnter,
  onSelectTemplate
}: { 
  onEnter: (toolId?: string, searchStr?: string, categoryName?: string) => void;
  onSelectTemplate?: (template: any) => void;
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);
  const [isUniversalModalOpen, setIsUniversalModalOpen] = useState(false);

  // ==========================================
  // LIVE UNIVERSAL QR GENERATOR STATE
  // ==========================================
  const [selectedType, setSelectedType] = useState<'url' | 'wifi' | 'upi'>('url');
  const [urlInput, setUrlInput] = useState('https://a2zqr.io');
  const [wifiSsid, setWifiSsid] = useState('My_Home_WiFi');
  const [wifiPassword, setWifiPassword] = useState('supersecret');
  const [wifiEncryption, setWifiEncryption] = useState('WPA');
  const [upiId, setUpiId] = useState('suvash@okaxis');
  const [upiName, setUpiName] = useState('Suvash');
  const [upiAmount, setUpiAmount] = useState('500');
  
  const [dotsStyle, setDotsStyle] = useState<'rounded' | 'dots' | 'classy' | 'square'>('rounded');
  const [cornersStyle, setCornersStyle] = useState<'extra-rounded' | 'square' | 'dot'>('extra-rounded');
  const [fgColor, setFgColor] = useState('#4F46E5');
  const [bgColor, setBgColor] = useState('#FFFFFF');
  
  const qrRef = useRef<HTMLDivElement>(null);
  const qrCodeInstance = useRef<QRCodeStyling | null>(null);

  const getLiveQRString = () => {
    if (selectedType === 'wifi') {
      return `WIFI:S:${wifiSsid};T:${wifiEncryption};P:${wifiPassword};;`;
    }
    if (selectedType === 'upi') {
      return `upi://pay?pa=${upiId}&pn=${encodeURIComponent(upiName)}${upiAmount ? `&am=${upiAmount}` : ''}&cu=INR`;
    }
    return urlInput || 'https://a2zqr.io';
  };

  // Monitor page scroll to apply glass blurs on header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initialize QR Code Styling inside LandingPage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      qrCodeInstance.current = new QRCodeStyling({
        width: 240,
        height: 240,
        margin: 5,
        imageOptions: {
          crossOrigin: 'anonymous',
          margin: 6
        }
      });
    }
  }, []);

  // Update live QR Code display
  useEffect(() => {
    if (qrCodeInstance.current && qrRef.current) {
      qrRef.current.innerHTML = '';
      qrCodeInstance.current.update({
        data: getLiveQRString(),
        dotsOptions: {
          color: fgColor,
          type: dotsStyle as any
        },
        cornersSquareOptions: {
          color: fgColor,
          type: cornersStyle as any
        },
        backgroundOptions: {
          color: bgColor
        }
      });
      qrCodeInstance.current.append(qrRef.current);
    }
  }, [selectedType, urlInput, wifiSsid, wifiPassword, wifiEncryption, upiId, upiName, upiAmount, dotsStyle, cornersStyle, fgColor, bgColor, isUniversalModalOpen]);

  const downloadLiveQR = () => {
    if (qrCodeInstance.current) {
      qrCodeInstance.current.download({ name: 'A2ZQR_Universal_Design', extension: 'png' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-indigo-600 selection:text-white pb-16 md:pb-0">
      
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none"></div>

      {/* 1. STICKY GLASS BLUR NAVIGATION BAR */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm py-3' 
          : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            
            {/* Logo */}
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={onEnter}>
              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center shadow-lg shadow-slate-900/10">
                <QrCode className="w-6 h-6 text-white" />
              </div>
              <span className="font-syne text-xl font-extrabold tracking-tight text-slate-950">
                A2Z<span className="text-indigo-600">QR</span>
              </span>
            </div>

            {/* Center Navigation links */}
            <div className="hidden lg:flex items-center gap-8">
              <a href="#experiences" className="text-sm font-semibold text-slate-600 hover:text-slate-950 transition-colors">All Tools</a>
              <a href="#shapes" className="text-sm font-semibold text-slate-600 hover:text-slate-950 transition-colors">QR Shapes</a>
              <a href="#pricing" className="text-sm font-semibold text-slate-600 hover:text-slate-950 transition-colors">Pricing</a>
              <a href="#why-us" className="text-sm font-semibold text-slate-600 hover:text-slate-950 transition-colors">Why A2ZQR</a>
              <a href="#faq" className="text-sm font-semibold text-slate-600 hover:text-slate-950 transition-colors">FAQ</a>
            </div>

            {/* Right CTAs */}
            <div className="hidden sm:flex items-center gap-4">
              <button 
                onClick={onEnter} 
                className="text-sm font-bold text-slate-600 hover:text-slate-950 px-4 py-2 transition-colors"
              >
                Login
              </button>
              <button 
                onClick={onEnter}
                className="px-6 py-2.5 bg-slate-900 hover:bg-indigo-600 text-white rounded-full text-sm font-bold transition-all duration-300 shadow-md hover:scale-[1.02] flex items-center gap-2"
              >
                Sign Up Free <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Hamburger menu for mobile */}
            <div className="flex lg:hidden items-center">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown Panel */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-100 px-4 pt-2 pb-6 space-y-3 shadow-lg absolute top-full left-0 right-0 z-50">
            <a href="#experiences" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-base font-bold text-slate-700 hover:bg-slate-50">All Tools</a>
            <a href="#shapes" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-base font-bold text-slate-700 hover:bg-slate-50">QR Shapes</a>
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-base font-bold text-slate-700 hover:bg-slate-50">Pricing</a>
            <a href="#why-us" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-base font-bold text-slate-700 hover:bg-slate-50">Why A2ZQR</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-base font-bold text-slate-700 hover:bg-slate-50">FAQ</a>
            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
              <button onClick={onEnter} className="w-full py-2.5 text-center text-slate-700 font-bold hover:bg-slate-50 rounded-lg">Login</button>
              <button onClick={onEnter} className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-bold shadow-lg flex items-center justify-center gap-2">
                Create QR Free <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* 2. HERO SECTION (Dark Premium, Floating Cards Side-by-Side) */}
      <section className="relative bg-[#080812] text-white pt-28 sm:pt-36 pb-20 sm:pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        
        {/* Glow Effects */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[60%] bg-purple-900/25 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-900/20 blur-[150px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Hero Left Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Rating badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-slate-300 text-xs sm:text-sm font-medium">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
              </div>
              <span className="font-bold text-white">4.9/5</span>
              <span className="text-slate-400">|</span>
              <span>12,000+ Happy Users</span>
            </div>

            <h1 className="font-syne text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white">
              Create QR <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400">Experiences</span>,<br />
              Not Just QR Codes.
            </h1>

            <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Create beautiful QR codes, premium editable templates, posters, frames, print-ready sticker layouts, custom shapes, and scan-safe art designs in one unified suite.
            </p>

            {/* Custom Search Box */}
            <div className="relative max-w-xl mx-auto lg:mx-0 pt-2">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-slate-400" />
              </div>
              <input 
                type="text" 
                placeholder="Search 100+ QR Tools (e.g., WiFi, UPI, Menu, RSVP)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    onEnter(undefined, searchQuery);
                  }
                }}
                className="w-full pl-12 pr-28 py-3.5 bg-slate-900/90 border border-slate-800 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              />
              <button 
                onClick={() => onEnter(undefined, searchQuery)}
                className="absolute right-2 top-2 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all"
              >
                Search
              </button>
            </div>

            {/* Popular search pills */}
            <div className="space-y-2 max-w-xl mx-auto lg:mx-0">
              <span className="text-[10px] uppercase tracking-widest font-bold text-slate-500 block">Popular QR Tools:</span>
              <div className="flex flex-wrap justify-center lg:justify-start gap-1.5">
                {POPULAR_SEARCHES.slice(0, 8).map((pill) => (
                  <button 
                    key={pill}
                    onClick={() => {
                      setSearchQuery(pill);
                      onEnter(undefined, pill);
                    }}
                    className="px-3 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-full text-xs transition-all"
                  >
                    {pill}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 pt-4">
              <button 
                onClick={onEnter}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-full text-base font-bold transition-all shadow-lg shadow-purple-900/30 flex items-center justify-center gap-2.5"
              >
                Launch Studio Workspace <ArrowRight className="w-5 h-5" />
              </button>
              <a 
                href="#experiences"
                className="w-full sm:w-auto px-8 py-4 bg-slate-900/80 border border-slate-800 hover:border-slate-700 text-slate-200 rounded-full text-base font-bold transition-all text-center"
              >
                Explore templates
              </a>
            </div>

          </div>

          {/* Hero Right Column (Beautiful floating overlapping premium cards) */}
          <div className="lg:col-span-5 relative h-[380px] sm:h-[450px] w-full mt-10 lg:mt-0 flex items-center justify-center">
            
            {/* Card 1: Airbnb Welcome Guide */}
            <div className="absolute top-0 left-4 w-44 sm:w-52 aspect-[2/3] bg-gradient-to-b from-[#FFA07A] to-[#FF4500] rounded-2xl p-4 shadow-2xl border border-white/10 transform -rotate-12 translate-x-[-10px] translate-y-[20px] transition-transform hover:scale-105 duration-300">
              <div className="flex justify-between items-center text-[8px] text-white/80 font-bold uppercase tracking-wider mb-2">
                <span>Airbnb Welcome</span>
                <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-2.5 mb-2.5 aspect-square flex items-center justify-center border border-white/15">
                <PremiumQRArtwork shapeName="Waveform" color="#FFFFFF" />
              </div>
              <p className="text-[10px] text-white/90 font-bold text-center">Scan to Read Guide</p>
              <p className="text-[8px] text-white/70 text-center mt-1">House Manual & WiFi</p>
            </div>

            {/* Card 2: Wedding RSVP (Center Hero) */}
            <div className="absolute z-10 w-48 sm:w-56 aspect-[2/3] bg-gradient-to-b from-slate-900 to-slate-950 rounded-2xl p-4.5 shadow-2xl border border-slate-800 transform scale-105 transition-transform hover:scale-110 duration-300">
              <div className="flex justify-between items-center text-[8px] text-indigo-400 font-bold uppercase tracking-wider mb-2.5">
                <span>Wedding RSVP</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <div className="bg-white rounded-xl p-3 mb-3 aspect-square flex items-center justify-center shadow-inner">
                <PremiumQRArtwork shapeName="Mandala" color="#0F172A" />
              </div>
              <p className="text-xs text-white font-extrabold text-center leading-tight">Join Our Day</p>
              <p className="text-[9px] text-slate-400 text-center mt-1">Rohan & Priya • Dec 12</p>
            </div>

            {/* Card 3: Pet ID Tag */}
            <div className="absolute bottom-4 right-4 w-40 sm:w-48 aspect-[2/3] bg-gradient-to-b from-emerald-600 to-teal-800 rounded-2xl p-4 shadow-2xl border border-white/10 transform rotate-12 translate-x-[15px] translate-y-[-10px] transition-transform hover:scale-105 duration-300">
              <div className="flex justify-between items-center text-[8px] text-emerald-100 font-bold uppercase tracking-wider mb-2">
                <span>Secure Pet Tag</span>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2 aspect-square flex items-center justify-center border border-white/10">
                <PremiumQRArtwork shapeName="Star" color="#10B981" />
              </div>
              <p className="text-[10px] text-white font-bold text-center mt-2">Scan If Found</p>
              <p className="text-[8px] text-emerald-100/70 text-center mt-0.5">Ping Owner Live Location</p>
            </div>

            {/* Ambient Background Grid Behind Cards */}
            <div className="absolute inset-0 border border-slate-800/50 rounded-3xl -z-10 pointer-events-none opacity-40"></div>
          </div>

        </div>
      </section>

      {/* 3. EVERYTHING YOU CAN CREATE (Grid of 12 beautiful categories) */}
      <section className="py-20 bg-white border-b border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full">DESIGN ALL-IN-ONE</span>
            <h2 className="font-syne text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              One Subscription. Everything You Need.
            </h2>
            <p className="text-slate-500 text-sm sm:text-base">
              A2ZQR replaces five different tools. Create anything from standard dynamic codes to customized luxury sticker designs and posters.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: 'Dynamic QR Codes', desc: 'Real-time link editing & analytics.', icon: QrCode, badge: 'CORE' },
              { title: 'Premium Templates', desc: '500+ customized industry presets.', icon: LayoutGrid, badge: '500+' },
              { title: 'Print Posters', desc: 'High DPI vector layouts for stands.', icon: ImageIcon, badge: 'A4 READY' },
              { title: 'Luxury Frames', desc: 'Stylized margins to match branding.', icon: Layers, badge: 'EDITABLE' },
              { title: 'Custom Stickers', desc: 'Round/Square shapes for direct stick.', icon: Tag, badge: 'HIGH DPI' },
              { title: 'Artistic QR Codes', desc: 'Sakura, Fibonacci, Mandala artwork.', icon: Sparkles, badge: 'BEAUTIFUL' },
              { title: 'Custom QR Shapes', desc: 'Lotus, Heart, Galaxy contours.', icon: Sliders, badge: '30+ SHAPES' },
              { title: 'Contact vCards', desc: 'Beautiful profiles for digital cards.', icon: CreditCard, badge: 'SMART' }
            ].map((cat, idx) => (
              <div 
                key={idx}
                className="p-6 bg-slate-50 hover:bg-white rounded-2xl border border-slate-100 hover:border-indigo-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                onClick={onEnter}
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 text-slate-800 flex items-center justify-center shadow-sm mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    <cat.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1">{cat.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{cat.desc}</p>
                </div>
                <div className="pt-4 border-t border-slate-100/60 mt-4 flex items-center justify-between text-[10px] font-bold tracking-wider text-indigo-600 uppercase">
                  <span>{cat.badge}</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ==========================================
          LIVE UNIVERSAL QR STUDIO SECTION REMOVED FROM MAIN FLOW
          ========================================== */}

      {/* 4. INTERACTIVE READYMADE TEMPLATES (Real Previews & Form Editor on Click) */}
      <section id="experiences" className="py-20 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest block mb-1">⚡ READY-TO-USE TEMPLATES</span>
              <h2 className="font-syne text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
                Click Any Readymade Template to Edit Instantly
              </h2>
            </div>
            <p className="text-slate-500 text-sm max-w-md">
              Select a gorgeous coordinated card template below to personalize your brand details instantly in our live editor form!
            </p>
          </div>

          {/* Grid of real templates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DUMMY_TEMPLATES.map((item) => {
              // Build dynamic background styling matching the editor canvas
              const cardBgStyle: React.CSSProperties = {
                aspectRatio: '2/3',
                position: 'relative',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              };
              
              if (item.bgType === 'gradient' && item.gradient) {
                const { from, to, via, angle = '135deg' } = item.gradient as any;
                cardBgStyle.background = `linear-gradient(${angle}, ${from}, ${via ? via + ', ' : ''}${to})`;
              } else {
                cardBgStyle.backgroundImage = `url(${item.imgUrl})`;
              }

              return (
                <div 
                  key={item.id}
                  className="bg-white border border-slate-200/80 rounded-3xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                  onClick={() => {
                    if (onSelectTemplate) {
                      onSelectTemplate(item);
                    } else {
                      onEnter();
                    }
                  }}
                >
                  {/* Miniature Poster canvas */}
                  <div 
                    className="rounded-2xl overflow-hidden shadow-md relative group-hover:scale-[1.01] transition-transform duration-300 flex items-center justify-center p-4 border border-slate-100"
                    style={cardBgStyle}
                  >
                    {/* Visual QR element placed exactly on mini-card */}
                    <div 
                      className="absolute w-24 h-24 rounded-lg flex items-center justify-center p-1.5 shadow-lg transition-transform"
                      style={{ 
                        backgroundColor: item.qrConfig?.bgColor || '#FFFFFF',
                        border: '1px solid rgba(255,255,255,0.1)'
                      }}
                    >
                      <PremiumQRArtwork shapeName={item.qrConfig?.dotsStyle === 'classy' ? 'Lotus' : 'Mandala'} color={item.qrConfig?.fgColor || '#4F46E5'} />
                    </div>

                    {/* Badge details */}
                    <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-sm px-2 py-0.5 rounded text-[8px] font-black text-white tracking-widest uppercase flex items-center gap-1">
                      {item.type === 'Pro' ? (
                        <>
                          <Crown className="w-2.5 h-2.5 text-amber-400 fill-amber-400 animate-pulse" /> PRO
                        </>
                      ) : (
                        "FREE"
                      )}
                    </div>
                  </div>

                  {/* Title and category details */}
                  <div className="mt-4 px-1 space-y-1">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-syne font-bold text-slate-950 text-sm leading-snug group-hover:text-indigo-600 transition-colors">
                        {item.title}
                      </h3>
                      <span className="text-[9px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-bold uppercase shrink-0">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] font-extrabold text-[#7C6EFA] bg-[#7C6EFA]/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {item.type === 'Pro' ? "Premium Template" : "Free Layout"}
                    </span>
                    <button className="text-xs font-bold text-slate-800 group-hover:text-indigo-600 flex items-center gap-1 transition-colors">
                      Edit Preset <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. POPULAR TOOLS (2 Column Grid on Mobile, Small Cards) */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full">POPULAR SHORTCUTS</span>
            <h2 className="font-syne text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              100+ QR Tools to Meet Any Need
            </h2>
            <p className="text-slate-500 text-sm sm:text-base">
              EZQR connects every platform link. Seamless redirects for payments, review collection, maps coordinates, and direct contacts.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {POPULAR_TOOLS.map((tool, idx) => (
              <div 
                key={idx}
                onClick={() => onEnter(tool.toolId)}
                className="p-5 bg-slate-50 hover:bg-white rounded-2xl border border-slate-100 hover:border-indigo-100 shadow-xs hover:shadow-md transition-all duration-300 flex items-center gap-4 cursor-pointer"
              >
                <div className={`w-11 h-11 rounded-xl shrink-0 flex items-center justify-center shadow-sm ${tool.color}`}>
                  <tool.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-950 text-sm">{tool.name}</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">{tool.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. QR SHAPES SHOWCASE (Visual Grid showcasing custom SVG outlines) */}
      <section id="shapes" className="py-20 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest block mb-1">QR CODE CONTOURS</span>
              <h2 className="font-syne text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
                Choose From 30+ Creative QR Shapes
              </h2>
            </div>
            <p className="text-slate-500 text-sm max-w-md">
              Most QR builders only construct boxy matrices. A2ZQR bends dots into gorgeous Fibonacci spirals, Arabic designs, Lotus silhouettes, and Sakura templates.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {PREMIUM_SHAPES.map((shape, idx) => (
              <div 
                key={idx}
                onClick={onEnter}
                className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center gap-4 group cursor-pointer"
              >
                <div className="w-32 h-32 bg-slate-50 rounded-2xl border border-dashed border-slate-100 p-2.5 flex items-center justify-center shadow-inner relative overflow-hidden group-hover:bg-white transition-all">
                  <PremiumQRArtwork shapeName={shape.name} color="#4F46E5" />
                </div>
                <div>
                  <h4 className="font-syne font-bold text-slate-950 text-sm">{shape.name} Shape</h4>
                  <span className="text-[10px] text-indigo-600 font-bold bg-indigo-50/70 px-2 py-0.5 rounded tracking-widest uppercase mt-1.5 inline-block">SCAN SAFE 99.9%</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. WHY CHOOSE A2ZQR (Statistics Panel) */}
      <section id="why-us" className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-x divide-slate-100 text-center">
            <div className="space-y-1">
              <span className="text-4xl sm:text-5xl font-extrabold font-syne text-slate-950 block">500+</span>
              <span className="text-xs sm:text-sm font-bold text-indigo-600 uppercase tracking-wider block">Premium Templates</span>
              <p className="text-[11px] text-slate-400 mt-1 px-4">Customized industry-grade vector backdrops.</p>
            </div>
            <div className="space-y-1">
              <span className="text-4xl sm:text-5xl font-extrabold font-syne text-slate-950 block">30+</span>
              <span className="text-xs sm:text-sm font-bold text-indigo-600 uppercase tracking-wider block">QR Code Shapes</span>
              <p className="text-[11px] text-slate-400 mt-1 px-4">Fibonacci, Arabic, Star, and Sakura structures.</p>
            </div>
            <div className="space-y-1 col-span-2 lg:col-span-1 border-t lg:border-t-0 pt-6 lg:pt-0">
              <span className="text-4xl sm:text-5xl font-extrabold font-syne text-slate-950 block">15+</span>
              <span className="text-xs sm:text-sm font-bold text-indigo-600 uppercase tracking-wider block">Art QR Styles</span>
              <p className="text-[11px] text-slate-400 mt-1 px-4">Luxurious gradients & bespoke scan assets.</p>
            </div>
            <div className="space-y-1 col-span-2 lg:col-span-1 border-t lg:border-t-0 pt-6 lg:pt-0">
              <span className="text-4xl sm:text-5xl font-extrabold font-syne text-slate-950 block">99.9%</span>
              <span className="text-xs sm:text-sm font-bold text-indigo-600 uppercase tracking-wider block">Scan Success Guarantee</span>
              <p className="text-[11px] text-slate-400 mt-1 px-4">In-built safety checks protect your codes.</p>
            </div>
          </div>

        </div>
      </section>

      {/* 8. HOW IT WORKS (Animated Step Timeline) */}
      <section className="py-20 bg-slate-50 border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full">DESIGN PIPELINE</span>
            <h2 className="font-syne text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              Create Your QR Experience in Seconds
            </h2>
            <p className="text-slate-500 text-sm">
              We have eliminated design clutter. Build high-fidelity customized outlines following five basic pipeline milestones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
            {[
              { num: '01', title: 'Choose Tool', desc: 'Select from 100+ tools like WiFi, vCard, or custom menu.' },
              { num: '02', title: 'Customize Layout', desc: 'Add colors, outer frames, central brand logos, or shapes.' },
              { num: '03', title: 'Live Preview', desc: 'Verify readability against our automatic scan checker.' },
              { num: '04', title: 'Download Outlines', desc: 'Save as lossless SVG, print PDF, or transparent PNG.' },
              { num: '05', title: 'Print & Track', desc: 'Monitor scan metrics & traffic sources over time.' }
            ].map((step, idx) => (
              <div key={idx} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs relative flex flex-col justify-between">
                <div>
                  <span className="font-mono text-3xl font-extrabold text-slate-200 block mb-3">{step.num}</span>
                  <h4 className="font-bold text-slate-950 text-sm mb-1">{step.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 9. PRICING SECTION */}
      <section id="pricing" className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full">TRANSPARENT PLANS</span>
            <h2 className="font-syne text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              A Plan For Any Scale Brand
            </h2>
            <p className="text-slate-500 text-sm sm:text-base">
              Get started absolutely free or upgrade to Pro for dynamic analytics and print-ready high DPI vector templates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            
            {/* Free Plan */}
            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 flex flex-col justify-between shadow-xs">
              <div>
                <h3 className="font-syne text-lg font-bold text-slate-950">Free Tier</h3>
                <p className="text-xs text-slate-400 mt-1">Perfect for fast personal codes.</p>
                
                <div className="my-6">
                  <span className="text-4xl font-extrabold text-slate-950">₹0</span>
                  <span className="text-xs text-slate-400"> / month</span>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-200/60">
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs text-slate-600 font-medium">Unlimited Static QR codes</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs text-slate-600 font-medium">Standard custom colors & eye styles</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs text-slate-600 font-medium">Low DPI PNG downloads</span>
                  </div>
                </div>
              </div>

              <button onClick={onEnter} className="w-full mt-8 py-3 bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 rounded-xl text-xs font-bold transition-all shadow-xs">
                Get Started Free
              </button>
            </div>

            {/* Pro Plan (Highlighted) */}
            <div className="bg-slate-950 border-2 border-indigo-500 rounded-3xl p-8 flex flex-col justify-between shadow-xl relative text-white">
              <div className="absolute top-4 right-4 bg-indigo-600 text-[9px] font-bold tracking-wider px-2.5 py-0.5 rounded-full uppercase">
                Most Popular
              </div>

              <div>
                <h3 className="font-syne text-lg font-bold">Pro Plan</h3>
                <p className="text-xs text-slate-400 mt-1">For dynamic creators and small stores.</p>
                
                <div className="my-6">
                  <span className="text-4xl font-extrabold text-white">₹299</span>
                  <span className="text-xs text-slate-400"> / month</span>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-indigo-400" />
                    <span className="text-xs text-slate-200 font-medium">Everything in Free</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-indigo-400" />
                    <span className="text-xs text-slate-200 font-medium">500+ Premium Layout Templates</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-indigo-400" />
                    <span className="text-xs text-slate-200 font-medium">All 30+ Creative QR Shapes</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-indigo-400" />
                    <span className="text-xs text-slate-200 font-medium">High DPI PDF & Vector SVG exports</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-indigo-400" />
                    <span className="text-xs text-slate-200 font-medium">Scan Analytics & dynamic link changes</span>
                  </div>
                </div>
              </div>

              <button onClick={onEnter} className="w-full mt-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-md">
                Upgrade to Pro
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 flex flex-col justify-between shadow-xs">
              <div>
                <h3 className="font-syne text-lg font-bold text-slate-950">Enterprise</h3>
                <p className="text-xs text-slate-400 mt-1">For large marketing agencies.</p>
                
                <div className="my-6">
                  <span className="text-4xl font-extrabold text-slate-950">Custom</span>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-200/60">
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs text-slate-600 font-medium">Everything in Pro</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs text-slate-600 font-medium">White-label URL domains</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs text-slate-600 font-medium">Bulk code generator API keys</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs text-slate-600 font-medium">24/7 Priority support hotline</span>
                  </div>
                </div>
              </div>

              <button onClick={onEnter} className="w-full mt-8 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all">
                Contact Enterprise Sales
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* 10. TESTIMONIALS SECTION ("Loved by Thousands") */}
      <section className="py-20 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full">COMMUNITY TRUST</span>
            <h2 className="font-syne text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              Loved by Thousands of Creators
            </h2>
            <p className="text-slate-500 text-sm">
              Read how small business managers, designers, and event planners build premium physical designs using A2ZQR.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex text-amber-400 gap-0.5 mb-3">
                    {[...Array(item.stars)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">"{item.text}"</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-50 flex items-center gap-3">
                  <img src={item.img} alt={item.name} className="w-9 h-9 rounded-full object-cover border border-slate-100" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                      {item.name}
                      <span className="w-3.5 h-3.5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[7px] font-bold">✓</span>
                    </h4>
                    <span className="text-[10px] text-slate-400">{item.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 11. FAQ ACCORDION SECTION (10 Questions) */}
      <section id="faq" className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full">FREQUENTLY ASKED QUESTIONS</span>
            <h2 className="font-syne text-3xl font-extrabold text-slate-950 tracking-tight">
              Have Questions? We Have Answers.
            </h2>
            <p className="text-slate-500 text-sm">
              Everything you need to know about setting up, designing, and printing your premium layouts.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = faqOpenIndex === idx;
              return (
                <div 
                  key={idx} 
                  className="bg-slate-50 border border-slate-150/60 rounded-2xl overflow-hidden transition-all"
                >
                  <button 
                    onClick={() => setFaqOpenIndex(isOpen ? null : idx)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left font-bold text-slate-900 text-sm sm:text-base focus:outline-none"
                  >
                    <span>{faq.q}</span>
                    <span className="shrink-0 p-1 bg-white border border-slate-200 rounded-lg text-slate-600">
                      {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 text-xs sm:text-sm text-slate-500 leading-relaxed border-t border-slate-100 pt-3 bg-white">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 12. LARGE CTA GRADIENT BANNER */}
      <section className="py-20 sm:py-28 px-4 text-center bg-[#080812] text-white relative overflow-hidden border-b border-slate-900">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-2xl bg-indigo-900/40 blur-[100px] rounded-full opacity-50 pointer-events-none"></div>
        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <h2 className="font-syne text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Ready to Create Your First QR Experience?
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
            Choose a premium layout frame, configure custom-shaped dots, preview decodes instantly, and start generating high DPI vector files today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <button 
              onClick={onEnter}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-full text-base font-bold transition-all shadow-xl shadow-purple-900/30 flex items-center justify-center gap-2.5"
            >
              Launch Studio Workspace <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* 13. COMPREHENSIVE FOOTER */}
      <footer className="bg-slate-950 text-slate-400 py-16 px-4 border-t border-slate-900">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-6 gap-8 pb-12 border-b border-slate-900">
          
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center">
                <QrCode className="w-5 h-5 text-white" />
              </div>
              <span className="font-syne text-lg font-bold text-white tracking-tight">A2ZQR</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
              Next-generation design & QR experience studio. All dynamic assets, analytics, and vectors processed with 100% scanning safety protocols.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#_" className="hover:text-white transition-colors"><Globe className="w-4 h-4" /></a>
              <a href="#_" className="hover:text-white transition-colors"><MessageSquare className="w-4 h-4" /></a>
              <a href="#_" className="hover:text-white transition-colors"><ShieldCheck className="w-4 h-4" /></a>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Features</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#_" onClick={onEnter} className="hover:text-white transition-colors">Dynamic QR Codes</a></li>
              <li><a href="#_" onClick={onEnter} className="hover:text-white transition-colors">Templates Gallery</a></li>
              <li><a href="#_" onClick={onEnter} className="hover:text-white transition-colors">QR Shapes Library</a></li>
              <li><a href="#_" onClick={onEnter} className="hover:text-white transition-colors">Sticker Outlines</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Solutions</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#_" onClick={onEnter} className="hover:text-white transition-colors">Airbnb Guidebooks</a></li>
              <li><a href="#_" onClick={onEnter} className="hover:text-white transition-colors">Restaurant Menus</a></li>
              <li><a href="#_" onClick={onEnter} className="hover:text-white transition-colors">Wedding RSVP</a></li>
              <li><a href="#_" onClick={onEnter} className="hover:text-white transition-colors">Secure Pet Tags</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Resources</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#_" onClick={onEnter} className="hover:text-white transition-colors">Vector Outlines API</a></li>
              <li><a href="#_" onClick={onEnter} className="hover:text-white transition-colors">Design Guidelines</a></li>
              <li><a href="#_" onClick={onEnter} className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#_" onClick={onEnter} className="hover:text-white transition-colors">Developer Portal</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">Company</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#_" onClick={onEnter} className="hover:text-white transition-colors">Pricing Plans</a></li>
              <li><a href="#_" onClick={onEnter} className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#_" onClick={onEnter} className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#_" onClick={onEnter} className="hover:text-white transition-colors">Contact Support</a></li>
            </ul>
          </div>

        </div>

        <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <span>&copy; {new Date().getFullYear()} A2ZQR Studio Inc. All rights reserved.</span>
          <div className="flex items-center gap-1">
            <Globe className="w-3.5 h-3.5" />
            <span>English (US)</span>
          </div>
        </div>
      </footer>

      {/* 14. MOBILE EXCLUSIVE STICKY BOTTOM NAVIGATION BAR (Thumb Reach Optimized) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-100 flex items-center justify-around h-16 shadow-[0_-4px_16px_rgba(0,0,0,0.04)] px-4">
        
        <a href="#_" onClick={() => { setSearchQuery(''); onEnter(); }} className="flex flex-col items-center gap-1 text-slate-500 hover:text-indigo-600 transition-all">
          <Globe className="w-5 h-5" />
          <span className="text-[9px] font-bold">Home</span>
        </a>

        <a href="#experiences" className="flex flex-col items-center gap-1 text-slate-500 hover:text-indigo-600 transition-all">
          <LayoutGrid className="w-5 h-5" />
          <span className="text-[9px] font-bold">Tools</span>
        </a>

        {/* Floating primary action */}
        <button 
          onClick={() => setIsUniversalModalOpen(true)}
          className="w-12 h-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full flex items-center justify-center shadow-lg shadow-indigo-600/30 transform -translate-y-3 border-4 border-white transition-all active:scale-95"
        >
          <QrCode className="w-5 h-5 animate-pulse" />
        </button>

        <a href="#shapes" className="flex flex-col items-center gap-1 text-slate-500 hover:text-indigo-600 transition-all">
          <Sliders className="w-5 h-5" />
          <span className="text-[9px] font-bold">Shapes</span>
        </a>

        <a href="#_" onClick={onEnter} className="flex flex-col items-center gap-1 text-slate-500 hover:text-indigo-600 transition-all">
          <ShieldCheck className="w-5 h-5" />
          <span className="text-[9px] font-bold">Profile</span>
        </a>

      </div>

      {/* UNIVERSAL QR GENERATOR MODAL / DRAWER */}
      {isUniversalModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop */}
          <div 
            onClick={() => setIsUniversalModalOpen(false)}
            className="absolute inset-0 bg-[#020205]/90 backdrop-blur-md transition-opacity"
          ></div>

          {/* Modal Container */}
          <div className="bg-[#090911] border border-[#1F1F35] w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl relative z-10 max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="p-5 sm:p-6 border-b border-[#1F1F35] flex items-center justify-between bg-[#0E0E1B]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
                  <QrCode className="w-4 h-4 animate-pulse" />
                </div>
                <div className="text-left">
                  <h3 className="text-white font-syne font-extrabold text-base sm:text-lg leading-tight">Universal QR Code Generator</h3>
                  <p className="text-[#8080A0] text-[10px] sm:text-[11px] font-medium uppercase tracking-wider">Quick Studio Live Scan Tool</p>
                </div>
              </div>
              <button 
                onClick={() => setIsUniversalModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#18182D] hover:bg-red-950 hover:text-red-400 text-slate-400 flex items-center justify-center transition-colors text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 md:p-8 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
                
                {/* Left Column: Form & Style Selectors */}
                <div className="lg:col-span-7 bg-[#0E0E1B] border border-[#1F1F35]/70 rounded-2xl p-5 sm:p-6 flex flex-col justify-between space-y-6">
                  <div>
                    {/* 1. Tool Type Selector Tabs */}
                    <div className="space-y-3">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block text-left">1. SELECT QR FUNCTIONALITY</span>
                      <div className="grid grid-cols-3 gap-2 bg-[#07070D] p-1 rounded-xl border border-[#19192C]">
                        <button
                          onClick={() => setSelectedType('url')}
                          className={`py-2 px-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                            selectedType === 'url'
                              ? 'bg-indigo-600 text-white shadow-sm'
                              : 'text-slate-400 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <Globe className="w-3.5 h-3.5" /> URL / Text
                        </button>
                        <button
                          onClick={() => setSelectedType('wifi')}
                          className={`py-2 px-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                            selectedType === 'wifi'
                              ? 'bg-indigo-600 text-white shadow-sm'
                              : 'text-slate-400 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <Wifi className="w-3.5 h-3.5" /> WiFi
                        </button>
                        <button
                          onClick={() => setSelectedType('upi')}
                          className={`py-2 px-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                            selectedType === 'upi'
                              ? 'bg-indigo-600 text-white shadow-sm'
                              : 'text-slate-400 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <CreditCard className="w-3.5 h-3.5" /> UPI Pay
                        </button>
                      </div>
                    </div>

                    {/* 2. Dynamic Input Fields based on type */}
                    <div className="mt-5 space-y-4 text-left">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">2. CONFIGURE QR DATA</span>
                      
                      {selectedType === 'url' && (
                        <div className="space-y-2">
                          <label className="text-[11px] text-slate-300 font-semibold block">Website URL or Text Payload</label>
                          <input
                            type="text"
                            value={urlInput}
                            onChange={(e) => setUrlInput(e.target.value)}
                            placeholder="e.g. https://yourbrand.com/review"
                            className="w-full px-3.5 py-2.5 bg-[#07070D] border border-[#1E1E34] rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          />
                        </div>
                      )}

                      {selectedType === 'wifi' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-[11px] text-slate-300 font-semibold block">Network SSID (WiFi Name)</label>
                            <input
                              type="text"
                              value={wifiSsid}
                              onChange={(e) => setWifiSsid(e.target.value)}
                              placeholder="My_Home_WiFi"
                              className="w-full px-3.5 py-2.5 bg-[#07070D] border border-[#1E1E34] rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[11px] text-slate-300 font-semibold block">Password</label>
                            <input
                              type="password"
                              value={wifiPassword}
                              onChange={(e) => setWifiPassword(e.target.value)}
                              placeholder="Password"
                              className="w-full px-3.5 py-2.5 bg-[#07070D] border border-[#1E1E34] rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            />
                          </div>
                          <div className="col-span-1 sm:col-span-2 space-y-2">
                            <label className="text-[11px] text-slate-300 font-semibold block">Security Protocol</label>
                            <select
                              value={wifiEncryption}
                              onChange={(e) => setWifiEncryption(e.target.value)}
                              className="w-full px-3.5 py-2.5 bg-[#07070D] border border-[#1E1E34] rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            >
                              <option value="WPA">WPA/WPA2 Personal</option>
                              <option value="WEP">WEP</option>
                              <option value="nopass">No password (Unsecured)</option>
                            </select>
                          </div>
                        </div>
                      )}

                      {selectedType === 'upi' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-[11px] text-slate-300 font-semibold block">UPI Address ID</label>
                            <input
                              type="text"
                              value={upiId}
                              onChange={(e) => setUpiId(e.target.value)}
                              placeholder="recipient@okaxis"
                              className="w-full px-3.5 py-2.5 bg-[#07070D] border border-[#1E1E34] rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[11px] text-slate-300 font-semibold block">Payee Name</label>
                            <input
                              type="text"
                              value={upiName}
                              onChange={(e) => setUpiName(e.target.value)}
                              placeholder="Recipient Name"
                              className="w-full px-3.5 py-2.5 bg-[#07070D] border border-[#1E1E34] rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            />
                          </div>
                          <div className="col-span-1 sm:col-span-2 space-y-2">
                            <label className="text-[11px] text-slate-300 font-semibold block">Request Amount (INR - Optional)</label>
                            <input
                              type="number"
                              value={upiAmount}
                              onChange={(e) => setUpiAmount(e.target.value)}
                              placeholder="e.g. 500"
                              className="w-full px-3.5 py-2.5 bg-[#07070D] border border-[#1E1E34] rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* 3. Style Configurations */}
                    <div className="mt-6 space-y-4 text-left">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">3. LIVE AESTHETICS & DESIGNS</span>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Dots design */}
                        <div className="space-y-2">
                          <label className="text-[11px] text-slate-300 font-semibold">Dot Pattern Style</label>
                          <div className="grid grid-cols-2 gap-2">
                            {[
                              { name: 'Rounded', id: 'rounded' },
                              { name: 'Circular', id: 'dots' },
                              { name: 'Classy', id: 'classy' },
                              { name: 'Classic', id: 'square' }
                            ].map((d) => (
                              <button
                                key={d.id}
                                onClick={() => setDotsStyle(d.id as any)}
                                className={`py-1.5 px-2 rounded-lg text-[10px] font-semibold text-center border transition-all ${
                                  dotsStyle === d.id
                                    ? 'bg-[#1F1F3D] border-indigo-500 text-white font-extrabold'
                                    : 'bg-[#07070D] border-[#1A1A2E] text-slate-400 hover:text-white'
                                }`}
                              >
                                {d.name}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Corner Squares design */}
                        <div className="space-y-2">
                          <label className="text-[11px] text-slate-300 font-semibold">Corner Eye Style</label>
                          <div className="grid grid-cols-2 gap-2">
                            {[
                              { name: 'Smooth', id: 'extra-rounded' },
                              { name: 'Bespoke', id: 'dot' },
                              { name: 'Standard', id: 'square' }
                            ].map((c) => (
                              <button
                                key={c.id}
                                onClick={() => setCornersStyle(c.id as any)}
                                className={`py-1.5 px-2 rounded-lg text-[10px] font-semibold text-center border transition-all ${
                                  cornersStyle === c.id
                                    ? 'bg-[#1F1F3D] border-indigo-500 text-white font-extrabold'
                                    : 'bg-[#07070D] border-[#1A1A2E] text-slate-400 hover:text-white'
                                }`}
                              >
                                {c.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Colors selectors */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        <div className="space-y-2">
                          <label className="text-[11px] text-slate-300 font-semibold block">Foreground Color</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={fgColor}
                              onChange={(e) => setFgColor(e.target.value)}
                              className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border border-slate-700 overflow-hidden"
                            />
                            <div className="flex flex-wrap gap-1">
                              {['#4F46E5', '#EC4899', '#10B981', '#F59E0B', '#000000'].map((hex) => (
                                <button
                                  key={hex}
                                  onClick={() => setFgColor(hex)}
                                  className="w-5 h-5 rounded-full border border-white/10 transition-transform hover:scale-110 shadow-xs"
                                  style={{ backgroundColor: hex }}
                                />
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-[11px] text-slate-300 font-semibold block">Background Color</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={bgColor}
                              onChange={(e) => setBgColor(e.target.value)}
                              className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border border-slate-700 overflow-hidden"
                            />
                            <div className="flex flex-wrap gap-1">
                              {['#FFFFFF', '#F8FAFC', '#0F172A', '#080812'].map((hex) => (
                                <button
                                  key={hex}
                                  onClick={() => setBgColor(hex)}
                                  className="w-5 h-5 rounded-full border border-white/10 transition-transform hover:scale-110 shadow-xs"
                                  style={{ backgroundColor: hex }}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Workspace Action Button */}
                  <div className="pt-4 border-t border-[#1C1C2F] flex flex-col sm:flex-row gap-3 items-center">
                    <button
                      onClick={() => {
                        setIsUniversalModalOpen(false);
                        onEnter(); // redirects to advanced designer studio
                      }}
                      className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-purple-900/20 transition-all hover:scale-[1.01] flex items-center justify-center gap-1.5 animate-pulse"
                    >
                      <Sparkles className="w-3.5 h-3.5" /> Open in Designer Studio
                    </button>
                    <p className="text-[10px] text-slate-500 text-center sm:text-left leading-tight">
                      Edit further with professional luxury frames, dynamic analytics tracking, and print templates!
                    </p>
                  </div>
                </div>

                {/* Right Column: Live Mockup Stand / Premium Preview Frame */}
                <div className="lg:col-span-5 flex items-center justify-center">
                  <div className="w-full max-w-[340px] bg-gradient-to-b from-[#1C1C2F] to-[#0D0D19] border border-[#2D2D49] rounded-2xl p-5 shadow-2xl flex flex-col justify-between items-center text-center relative group">
                    
                    {/* Visual Glass Accent */}
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-t-2xl"></div>
                    
                    {/* Scanning Device Border Backdrop */}
                    <div className="w-full mb-4 pt-3">
                      <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#131322] border border-[#2A2A42] text-[9px] text-indigo-400 font-bold uppercase tracking-widest mb-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        Live Scan Safe
                      </div>
                      
                      {/* Real Live QR Code Container */}
                      <div className="bg-white rounded-xl p-3 shadow-2xl inline-block border border-[#2A2A42]">
                        <div ref={qrRef} className="mx-auto flex items-center justify-center overflow-hidden rounded-lg min-h-[180px] min-w-[180px]" />
                      </div>
                    </div>

                    {/* Info & Download CTAs */}
                    <div className="space-y-3 w-full">
                      <div className="text-center">
                        <h4 className="font-syne font-extrabold text-white text-sm">
                          {selectedType === 'url' && 'Universal Link QR'}
                          {selectedType === 'wifi' && `${wifiSsid || 'WiFi'} Hotspot`}
                          {selectedType === 'upi' && `UPI Request`}
                        </h4>
                        <p className="text-[10px] text-slate-400 mt-1 truncate max-w-[240px] mx-auto font-mono">
                          {getLiveQRString()}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={downloadLiveQR}
                          className="flex-1 py-2.5 bg-[#131322] hover:bg-slate-900 border border-[#2C2C47] hover:border-slate-700 text-white text-[11px] font-bold rounded-lg transition-all flex items-center justify-center gap-1.5"
                        >
                          <Download className="w-3.5 h-3.5" /> Export PNG
                        </button>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(getLiveQRString());
                            alert('QR payload copied!');
                          }}
                          className="px-3 py-2.5 bg-[#131322] hover:bg-slate-900 border border-[#2C2C47] hover:border-slate-700 text-white rounded-lg transition-all flex items-center justify-center"
                          title="Copy QR Payload String"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
