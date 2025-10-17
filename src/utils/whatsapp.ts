/**
 * WhatsApp Integration Utilities
 * 
 * This module provides functions to generate WhatsApp links with pre-filled messages
 * for seamless customer communication and booking inquiries.
 * 
 * Key Features:
 * - Generate WhatsApp chat links
 * - Pre-filled message templates
 * - Package-specific inquiries
 * - Contact form integration
 * - Phone number formatting
 * 
 * @module whatsapp
 */

/**
 * Company WhatsApp contact number
 * Format: Country code + number without spaces or special characters
 */
export const WHATSAPP_NUMBER = '917302937532'; // +91-7302937532

/**
 * Display format of phone number
 */
export const PHONE_NUMBER_DISPLAY = '+91-7302937532';

/**
 * Message templates for different scenarios
 */
export const MESSAGE_TEMPLATES = {
  // General inquiry
  general: `Hi Shiv Yatra Tourism, I'm interested in learning more about your Adi Kailash pilgrimage packages. Please share details.`,
  
  // Package-specific inquiries
  package5Day: `Hi, I'm interested in the 5-Day Express Adi Kailash Package from Dharchula. Please share pricing, availability, and booking details.`,
  
  package9Day: `Hi, I'm interested in the 9-Day Complete Adi Kailash Yatra from Kathgodam. Please share pricing, availability, and booking details.`,
  
  package14Day: `Hi, I'm interested in the 14-Day Grand Kumaon Circuit from Delhi. Please share pricing, availability, and booking details.`,
  
  // Permit assistance
  permit: `Hi, I need help with Inner Line Permit (ILP) application for Adi Kailash Yatra. Can you assist?`,
  
  // Custom itinerary
  custom: `Hi, I'd like to discuss a customized Adi Kailash itinerary based on my requirements. Can we schedule a call?`,
  
  // Group booking
  group: `Hi, I'm planning a group pilgrimage to Adi Kailash. We are approximately [NUMBER] people. Please share group discount rates and arrangements.`,
  
  // Travel guide inquiry
  travel: `Hi, I need information about how to reach Adi Kailash from [CITY]. Please share travel options and route details.`,
  
  // Accommodation inquiry
  accommodation: `Hi, I'd like to know more about accommodation options during the Adi Kailash Yatra. Please share details.`,
  
  // Best time to visit
  timing: `Hi, when is the best time to visit Adi Kailash? What are the weather conditions and road status in [MONTH]?`,
  
  // Emergency contact
  emergency: `Hi, I need urgent assistance regarding my Adi Kailash booking. Please respond as soon as possible.`,
};

/**
 * Pre-defined WhatsApp messages (alias for MESSAGE_TEMPLATES)
 * Used by components for quick access
 */
export const whatsappMessages = {
  generalInquiry: MESSAGE_TEMPLATES.general,
  packageInquiry: (packageName: string) => `Hi Shiv Yatra Tourism, I'm interested in the ${packageName} package. Could you please share more details?`,
  bookingInquiry: "Hi Shiv Yatra Tourism, I'd like to book an Adi Kailash Yatra. Please guide me through the process.",
  callbackRequest: "Hi Shiv Yatra Tourism, I'd like to request a callback to discuss Adi Kailash Yatra packages.",
};

/**
 * Generate WhatsApp chat URL
 * 
 * Creates a WhatsApp web/app link that opens with a pre-filled message
 * 
 * @param message - Pre-filled message text
 * @param phoneNumber - WhatsApp number (defaults to company number)
 * @returns WhatsApp URL
 * 
 * @example
 * const url = generateWhatsAppURL('Hello, I need information');
 * console.log(url); // https://wa.me/917302937532?text=...
 */
export function generateWhatsAppURL(
  message: string,
  phoneNumber: string = WHATSAPP_NUMBER
): string {
  console.log(`[WhatsApp] Generating WhatsApp URL with message preview: ${message.substring(0, 50)}...`);
  
  // URL encode the message
  const encodedMessage = encodeURIComponent(message);
  
  // Construct WhatsApp URL (wa.me format)
  const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  
  console.log(`[WhatsApp] ✓ Generated URL (${url.length} chars)`);
  
  return url;
}

/**
 * Generate WhatsApp URL with options (Modern API)
 * 
 * @param options - Configuration object
 * @returns WhatsApp URL
 * 
 * @example
 * const url = getWhatsAppUrl({ message: 'Hi!', packageInterest: '5-Day Package' });
 */
export function getWhatsAppUrl(options: {
  phoneNumber?: string;
  message?: string;
  packageInterest?: string;
} = {}): string {
  const {
    phoneNumber = WHATSAPP_NUMBER,
    message = MESSAGE_TEMPLATES.general,
    packageInterest
  } = options;
  
  let finalMessage = message;
  
  if (packageInterest) {
    finalMessage = `Hi Shiv Yatra Tourism, I'm interested in the ${packageInterest} package. Could you please share more details?`;
  }
  
  return generateWhatsAppURL(finalMessage, phoneNumber);
}

/**
 * Generate WhatsApp link for package inquiry
 * 
 * @param packageName - Name of the tour package
 * @param packagePrice - Price range (optional)
 * @param duration - Package duration (optional)
 * @returns WhatsApp URL
 * 
 * @example
 * const url = getPackageInquiryURL('5-Day Express Package', '₹15,000-₹20,000', '5 Days / 4 Nights');
 */
export function getPackageInquiryURL(
  packageName: string,
  packagePrice?: string,
  duration?: string
): string {
  console.log(`[WhatsApp] Creating package inquiry for: ${packageName}`);
  
  let message = `Hi Shiv Yatra Tourism, I'm interested in the ${packageName}.`;
  
  if (packagePrice) {
    message += ` I saw it's priced at ${packagePrice}.`;
  }
  
  if (duration) {
    message += ` Duration: ${duration}.`;
  }
  
  message += ` Please share detailed itinerary, inclusions, and booking process. Thank you!`;
  
  return generateWhatsAppURL(message);
}

/**
 * Generate WhatsApp link for permit assistance
 * 
 * @param userCity - User's city (optional)
 * @param travelDate - Planned travel date (optional)
 * @returns WhatsApp URL
 * 
 * @example
 * const url = getPermitAssistanceURL('Delhi', '2025-05-15');
 */
export function getPermitAssistanceURL(
  userCity?: string,
  travelDate?: string
): string {
  console.log(`[WhatsApp] Creating permit assistance inquiry`);
  
  let message = MESSAGE_TEMPLATES.permit;
  
  if (userCity) {
    message += ` I am from ${userCity}.`;
  }
  
  if (travelDate) {
    message += ` Planning to travel around ${travelDate}.`;
  }
  
  message += ` Please guide me on the application process and required documents.`;
  
  return generateWhatsAppURL(message);
}

/**
 * Generate WhatsApp link for custom itinerary request
 * 
 * @param groupSize - Number of people
 * @param duration - Preferred duration
 * @param specialRequests - Any special requirements
 * @returns WhatsApp URL
 * 
 * @example
 * const url = getCustomItineraryURL(6, '7-8 days', 'Need vegetarian meals, elderly-friendly pace');
 */
export function getCustomItineraryURL(
  groupSize?: number,
  duration?: string,
  specialRequests?: string
): string {
  console.log(`[WhatsApp] Creating custom itinerary request`);
  
  let message = MESSAGE_TEMPLATES.custom;
  
  if (groupSize) {
    message += ` We are ${groupSize} people.`;
  }
  
  if (duration) {
    message += ` Looking for ${duration} duration.`;
  }
  
  if (specialRequests) {
    message += ` Special requirements: ${specialRequests}.`;
  }
  
  message += ` Please contact me to discuss further. Thank you!`;
  
  return generateWhatsAppURL(message);
}

/**
 * Generate WhatsApp link from contact form data
 * 
 * @param formData - Form submission data
 * @returns WhatsApp URL
 * 
 * @example
 * const url = getContactFormURL({
 *   name: 'John Doe',
 *   email: 'john@example.com',
 *   phone: '9876543210',
 *   message: 'I need package information'
 * });
 */
export function getContactFormURL(formData: {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  subject?: string;
}): string {
  console.log(`[WhatsApp] Creating contact form WhatsApp message`);
  
  let message = `Hi Shiv Yatra Tourism,\n\n`;
  
  if (formData.name) {
    message += `Name: ${formData.name}\n`;
  }
  
  if (formData.email) {
    message += `Email: ${formData.email}\n`;
  }
  
  if (formData.phone) {
    message += `Phone: ${formData.phone}\n`;
  }
  
  if (formData.subject) {
    message += `Subject: ${formData.subject}\n`;
  }
  
  message += `\nMessage:\n${formData.message || 'I would like to inquire about Adi Kailash packages.'}\n\n`;
  message += `Thank you!`;
  
  return generateWhatsAppURL(message);
}

/**
 * Get predefined template URL
 * 
 * @param templateKey - Key of the message template
 * @returns WhatsApp URL
 * 
 * @example
 * const url = getTemplateURL('package5Day');
 */
export function getTemplateURL(
  templateKey: keyof typeof MESSAGE_TEMPLATES
): string {
  console.log(`[WhatsApp] Using template: ${templateKey}`);
  
  const message = MESSAGE_TEMPLATES[templateKey];
  return generateWhatsAppURL(message);
}

/**
 * Format phone number for display
 * 
 * @param number - Raw phone number
 * @param includeCountryCode - Include +91 prefix
 * @returns Formatted phone number
 * 
 * @example
 * const formatted = formatPhoneNumber('917302937532');
 * console.log(formatted); // +91-7302937532
 */
export function formatPhoneNumber(
  number: string = WHATSAPP_NUMBER,
  includeCountryCode: boolean = true
): string {
  // Remove all non-digit characters
  const digits = number.replace(/\D/g, '');
  
  // Extract parts (assuming Indian number starting with 91)
  if (digits.startsWith('91') && digits.length >= 12) {
    const countryCode = '91';
    const mobile = digits.slice(2);
    
    if (includeCountryCode) {
      return `+${countryCode}-${mobile}`;
    }
    return mobile;
  }
  
  // Fallback: return as-is with +91 if needed
  return includeCountryCode ? `+${digits}` : digits;
}

/**
 * Generate call link for mobile devices
 * 
 * @param number - Phone number to call
 * @returns tel: link
 * 
 * @example
 * const callLink = getCallLink();
 * // Returns: tel:+917302937532
 */
export function getCallLink(number: string = WHATSAPP_NUMBER): string {
  const formatted = formatPhoneNumber(number, true);
  return `tel:${formatted.replace(/-/g, '')}`;
}

/**
 * Check if device/browser supports WhatsApp
 * This is a client-side function (use in <script> tags)
 * 
 * @returns True if WhatsApp is likely supported
 */
export function supportsWhatsApp(): boolean {
  // WhatsApp Web/App is supported on most modern browsers
  // Mobile devices should always support it
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
  
  // On mobile, always return true (WhatsApp app or web)
  if (isMobile) return true;
  
  // On desktop, WhatsApp Web is supported on most browsers
  return true;
}

/**
 * Quick message options for contact page
 * Returns array of message options with labels and URLs
 * 
 * @returns Array of message options
 * 
 * @example
 * const options = getQuickMessageOptions();
 * options.forEach(opt => {
 *   console.log(opt.label, opt.url);
 * });
 */
export function getQuickMessageOptions() {
  console.log(`[WhatsApp] Generating quick message options`);
  
  return [
    {
      id: 'package-5day',
      label: 'Book 5-Day Package',
      icon: '📦',
      url: getTemplateURL('package5Day'),
    },
    {
      id: 'permit-help',
      label: 'Need Help with Permit',
      icon: '📋',
      url: getTemplateURL('permit'),
    },
    {
      id: 'custom-itinerary',
      label: 'Request Custom Itinerary',
      icon: '✏️',
      url: getTemplateURL('custom'),
    },
    {
      id: 'group-booking',
      label: 'Group Booking Inquiry',
      icon: '👥',
      url: getTemplateURL('group'),
    },
    {
      id: 'general',
      label: 'General Inquiry',
      icon: '💬',
      url: getTemplateURL('general'),
    },
  ];
}

// Export all functions and constants
export default {
  WHATSAPP_NUMBER,
  PHONE_NUMBER_DISPLAY,
  MESSAGE_TEMPLATES,
  generateWhatsAppURL,
  getPackageInquiryURL,
  getPermitAssistanceURL,
  getCustomItineraryURL,
  getContactFormURL,
  getTemplateURL,
  formatPhoneNumber,
  getCallLink,
  getQuickMessageOptions,
};

