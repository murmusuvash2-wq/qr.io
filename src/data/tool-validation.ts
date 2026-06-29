// ═══════════════════════════════════════════════════════════════════
//  TOOL VALIDATION — Field-specific validation rules
//  Each tool type gets its own validation logic
// ═══════════════════════════════════════════════════════════════════

export const VALIDATION_RULES: Record<string, {
  validate: (value: string) => string | null;  // null = valid, string = error message
  formatExample?: string;
}> = {
  url: {
    validate: (value: string) => {
      if (!value.startsWith('http://') && !value.startsWith('https://')) 
        return 'URL should start with http:// or https://';
      try { new URL(value); return null; }
      catch { return 'Please enter a valid URL'; }
    },
    formatExample: 'https://example.com/page'
  },
  
  email: {
    validate: (value: string) => {
      if (!value.includes('@') || !value.includes('.')) 
        return 'Please enter a valid email (e.g., name@domain.com)';
      return null;
    },
    formatExample: 'name@domain.com'
  },
  
  phone: {
    validate: (value: string) => {
      const cleaned = value.replace(/[\s\-\+\(\)]/g, '');
      if (cleaned.length < 10) return 'Phone number must be at least 10 digits';
      if (!/^\d+$/.test(cleaned)) return 'Phone number should contain only digits';
      return null;
    },
    formatExample: '+91 9876543210'
  },
  
  wifi_ssid: {
    validate: (value: string) => {
      if (value.length < 1) return 'WiFi name is required';
      if (value.length > 32) return 'WiFi name should be under 32 characters';
      return null;
    },
    formatExample: 'My Home WiFi'
  },
  
  wifi_password: {
    validate: (value: string) => {
      if (value.length < 8) return 'WiFi password should be at least 8 characters';
      if (value.length > 63) return 'WiFi password should be under 63 characters';
      return null;
    },
    formatExample: 'password123'
  },
  
  upi: {
    validate: (value: string) => {
      if (!value.includes('@')) return 'UPI ID should be like: name@upi (e.g., user@paytm)';
      const parts = value.split('@');
      if (parts[0].length < 1) return 'UPI ID should have a username before @';
      return null;
    },
    formatExample: 'username@paytm'
  },
  
  crypto_address: {
    validate: (value: string) => {
      if (!value.startsWith('0x') && !value.startsWith('1') && !value.startsWith('3') && !value.startsWith('bc1'))
        return 'Crypto address should start with 0x, 1, 3, or bc1';
      if (value.length < 26) return 'Crypto address seems too short';
      return null;
    },
    formatExample: '0x742d35Cc6634C0532925a3b844Bc4a1f8f1c5b3c'
  },
  
  date: {
    validate: (value: string) => {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return 'Date should be in YYYY-MM-DD format';
      const d = new Date(value);
      if (isNaN(d.getTime())) return 'Please enter a valid date';
      return null;
    },
    formatExample: '2026-12-31'
  },
  
  hex: {
    validate: (value: string) => {
      if (!/^#[0-9A-Fa-f]{6}$/.test(value)) return 'Color should be hex format: #FF5733';
      return null;
    },
    formatExample: '#FF5733'
  },
  
  number: {
    validate: (value: string) => {
      if (isNaN(Number(value))) return 'Please enter a valid number';
      return null;
    },
    formatExample: '100'
  },
  
  text: {
    validate: (value: string) => {
      if (value.length > 500) return 'Text is too long (max 500 characters)';
      return null;
    },
    formatExample: 'Your text here'
  }
};

export function validateFieldValue(field: { validation?: { type: string } }, value: string): string | null {
  if (!field.validation?.type) return null; // no validation needed
  if (!value || value.trim() === '') return null; // empty optional field
  const rule = VALIDATION_RULES[field.validation.type];
  if (!rule) return null;
  return rule.validate(value);
}
