// ═══════════════════════════════════════════════════════════════════
//  QR DATA GENERATORS — Maps ToolJSON.qrType → QR data string
//  Extracted from forms.ts generateQRStringForTool()
//  Now type-based, not tool.id-based
// ═══════════════════════════════════════════════════════════════════

type GeneratorFn = (values: Record<string, string>) => string;

export const QR_GENERATORS: Record<string, GeneratorFn> = {
  url: (values) => {
    return values['target-url'] || values['url'] || values['link'] || '';
  },
  
  wifi: (values) => {
    const ssid = values['ssid'] || values['wifi-ssid'] || '';
    const pass = values['password'] || values['wifi-password'] || '';
    const sec = values['security'] || values['wifi-security'] || 'WPA';
    const hidden = values['hidden'] === 'true' ? 'true' : 'false';
    return `WIFI:S:${ssid};T:${sec};P:${pass};H:${hidden};;`;
  },
  
  vcard: (values) => {
    const name = values['name'] || values['vcard-name'] || '';
    const phone = values['phone'] || values['vcard-phone'] || '';
    const email = values['email'] || values['vcard-email'] || '';
    const company = values['company'] || '';
    const title = values['title'] || '';
    const website = values['website'] || '';
    return `BEGIN:VCARD\nVERSION:3.0\nFN:${name}\nORG:${company}\nTITLE:${title}\nTEL:${phone}\nEMAIL:${email}\nURL:${website}\nEND:VCARD`;
  },
  
  whatsapp: (values) => {
    const phone = values['phone'] || values['whatsapp-phone'] || '';
    const message = values['message'] || values['prefill-message'] || '';
    const cleaned = phone.replace(/[^0-9]/g, '');
    return `https://wa.me/${cleaned}${message ? '?text=' + encodeURIComponent(message) : ''}`;
  },
  
  email: (values) => {
    const to = values['email'] || values['to'] || '';
    const subject = values['subject'] ? '?subject=' + encodeURIComponent(values['subject']) : '';
    const body = values['body'] ? '&body=' + encodeURIComponent(values['body']) : '';
    return `mailto:${to}${subject}${body}`;
  },
  
  sms: (values) => {
    const phone = values['phone'] || values['sms-phone'] || '';
    const body = values['body'] || values['sms-body'] || '';
    return `sms:${phone}${body ? '?body=' + encodeURIComponent(body) : ''}`;
  },
  
  phone: (values) => {
    const phone = values['phone'] || values['tel'] || '';
    return `tel:${phone.replace(/[^0-9+]/g, '')}`;
  },
  
  geo: (values) => {
    const lat = values['lat'] || values['latitude'] || '';
    const lng = values['lng'] || values['longitude'] || '';
    return `geo:${lat},${lng}`;
  },
  
  crypto: (values) => {
    const address = values['address'] || values['crypto-address'] || '';
    const amount = values['amount'] || values['crypto-amount'] || '';
    return amount ? `${address}?amount=${amount}` : address;
  },
  
  event: (values) => {
    const title = values['event-name'] || values['title'] || '';
    const date = values['date'] || values['event-date'] || '';
    const time = values['time'] || values['event-time'] || '';
    const venue = values['venue'] || values['location'] || '';
    const description = values['description'] || '';
    return `BEGIN:VEVENT\nSUMMARY:${title}\nDTSTART:${date.replace(/-/g, '')}T${time?.replace(/:/g, '')}00\nLOCATION:${venue}\nDESCRIPTION:${description}\nEND:VEVENT`;
  },
  
  mecard: (values) => {
    const name = values['name'] || '';
    const phone = values['phone'] || '';
    const email = values['email'] || '';
    return `MECARD:N:${name};TEL:${phone};EMAIL:${email};;`;
  },
  
  text: (values) => {
    const text = values['text'] || values['plain-text'] || values['content'] || '';
    return text;
  },
  
  social: (values) => {
    const url = values['profile-url'] || values['url'] || values['link'] || '';
    return url;
  }
};

export function generateQRData(qrType: string, values: Record<string, string>): string {
  const generator = QR_GENERATORS[qrType];
  if (!generator) {
    // Fallback: first URL-like field value
    return values['url'] || values['target-url'] || values['link'] || Object.values(values).find(v => v.startsWith('http://') || v.startsWith('https://')) || '';
  }
  return generator(values);
}
