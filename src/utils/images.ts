/**
 * Image Utilities for Website
 * 
 * Provides helper functions for image URLs, optimization, and Unsplash placeholders.
 * Replace Unsplash URLs with real images before production launch!
 * 
 * @module images
 */

/**
 * Unsplash image IDs for placeholders
 * These are high-quality Himalayan/mountain photos
 * Replace with real Adi Kailash photos!
 */
export const UNSPLASH_IMAGES = {
  // Hero Section
  hero: {
    adiKailashPeak: '1506905925346-21bda4d32df4', // Snow-capped mountain
    omParvat: '1519904981063-b0cf448d479e', // Mountain landscape
    himalaya: '1454391304352-2bf4678b1a7a', // Himalayan range
  },
  
  // Gallery - Peaks
  peaks: [
    '1506905925346-21bda4d32df4', // Peak 1
    '1519904981063-b0cf448d479e', // Peak 2
    '1454391304352-2bf4678b1a7a', // Peak 3
    '1464822257823-4b6eab3c20c4', // Peak 4
  ],
  
  // Gallery - Villages
  villages: [
    '1566073771259-6a8506099945', // Village 1
    '1548013146-72479768bada', // Village 2
    '1564507592333-c60657eea523', // Village 3
  ],
  
  // Gallery - Temples
  temples: [
    '1512632578888-169bbbc64f33', // Temple 1
    '1548013146-72479768bada', // Temple 2
    '1524492412113-7e6e8b8b0e0f', // Temple 3
  ],
  
  // Gallery - Journey
  journey: [
    '1464822257823-4b6eab3c20c4', // Trail 1
    '1506905925346-21bda4d32df4', // Trail 2
    '1519904981063-b0cf448d479e', // Trail 3
  ],
  
  // Blog Featured Images
  blog: {
    guide: '1506905925346-21bda4d32df4',
    omParvat: '1519904981063-b0cf448d479e',
    permit: '1454391304352-2bf4678b1a7a',
  },
};

/**
 * Generate Unsplash image URL
 * 
 * @param imageId - Unsplash image ID
 * @param width - Image width in pixels
 * @param quality - Image quality (1-100)
 * @returns Optimized Unsplash URL
 * 
 * @example
 * const heroUrl = getUnsplashUrl('1506905925346-21bda4d32df4', 1920, 80);
 */
export function getUnsplashUrl(
  imageId: string,
  width: number = 1200,
  quality: number = 80
): string {
  return `https://images.unsplash.com/photo-${imageId}?w=${width}&q=${quality}&fm=webp&fit=crop`;
}

/**
 * Get hero image URL
 * 
 * @param variant - Hero variant ('adiKailashPeak', 'omParvat', 'himalaya')
 * @returns Hero image URL
 */
export function getHeroImage(variant: keyof typeof UNSPLASH_IMAGES.hero = 'adiKailashPeak'): string {
  const imageId = UNSPLASH_IMAGES.hero[variant];
  return getUnsplashUrl(imageId, 1920, 85);
}

/**
 * Get gallery image URL
 * 
 * @param category - Gallery category
 * @param index - Image index (0-based)
 * @returns Gallery image URL
 */
export function getGalleryImage(
  category: 'peaks' | 'villages' | 'temples' | 'journey',
  index: number
): string {
  const images = UNSPLASH_IMAGES[category];
  const imageId = images[index % images.length]; // Cycle through if index exceeds length
  return getUnsplashUrl(imageId, 1200, 75);
}

/**
 * Get blog featured image URL
 * 
 * @param slug - Blog post slug or key
 * @returns Blog featured image URL
 */
export function getBlogImage(slug: string): string {
  // Map blog slugs to image IDs
  const slugToImage: Record<string, string> = {
    'adi-kailash-yatra-complete-guide-2025': UNSPLASH_IMAGES.blog.guide,
    'om-parvat-natural-om-symbol': UNSPLASH_IMAGES.blog.omParvat,
    'inner-line-permit-guide-2025': UNSPLASH_IMAGES.blog.permit,
  };
  
  const imageId = slugToImage[slug] || UNSPLASH_IMAGES.hero.adiKailashPeak;
  return getUnsplashUrl(imageId, 1200, 80);
}

/**
 * Get responsive srcset for image
 * 
 * @param imageId - Unsplash image ID
 * @param baseWidth - Base width in pixels
 * @returns Srcset string for responsive images
 */
export function getResponsiveSrcset(imageId: string, baseWidth: number = 1200): string {
  const widths = [400, 800, 1200, 1600, 1920];
  
  return widths
    .filter(w => w <= baseWidth * 2) // Don't exceed 2x base width
    .map(w => `${getUnsplashUrl(imageId, w, 75)} ${w}w`)
    .join(', ');
}

/**
 * Image alt text templates
 * Improve SEO and accessibility
 */
export const ALT_TEXTS = {
  hero: {
    adiKailashPeak: 'Majestic Adi Kailash peak covered in snow during sunrise, sacred Himalayan mountain',
    omParvat: 'Om Parvat showing natural Om symbol formed by snow, divine mountain in Uttarakhand',
    himalaya: 'Panoramic view of Himalayan mountain range with snow-capped peaks and clear blue sky',
  },
  
  gallery: {
    peaks: (index: number) => `Adi Kailash mountain peak view ${index + 1}, sacred pilgrimage destination`,
    villages: (index: number) => `Traditional Himalayan village ${index + 1} along Adi Kailash yatra route`,
    temples: (index: number) => `Ancient temple ${index + 1} in Adi Kailash region, spiritual Hindu site`,
    journey: (index: number) => `Pilgrims on Adi Kailash yatra journey ${index + 1}, trekking through Himalayas`,
  },
  
  blog: {
    guide: 'Complete guide to Adi Kailash pilgrimage with mountain backdrop and trekking trail',
    omParvat: 'Close-up view of Om Parvat natural Om symbol, one of the main attractions of Adi Kailash yatra',
    permit: 'Inner Line Permit application process for Adi Kailash, travelers at SDM office',
  },
};

/**
 * Get alt text for image
 * 
 * @param type - Image type
 * @param variant - Image variant or category
 * @param index - Optional index for galleries
 * @returns Descriptive alt text
 */
export function getAltText(
  type: 'hero' | 'gallery' | 'blog',
  variant: string,
  index?: number
): string {
  if (type === 'hero') {
    return ALT_TEXTS.hero[variant as keyof typeof ALT_TEXTS.hero] || 'Adi Kailash mountain view';
  }
  
  if (type === 'gallery' && typeof index === 'number') {
    const category = variant as keyof typeof ALT_TEXTS.gallery;
    const generator = ALT_TEXTS.gallery[category];
    return generator ? generator(index) : `Adi Kailash ${variant} photo ${index + 1}`;
  }
  
  if (type === 'blog') {
    return ALT_TEXTS.blog[variant as keyof typeof ALT_TEXTS.blog] || `Blog post about ${variant}`;
  }
  
  return 'Adi Kailash pilgrimage photo';
}

/**
 * Check if image is from Unsplash (placeholder)
 * 
 * @param src - Image source URL
 * @returns True if Unsplash placeholder
 */
export function isPlaceholder(src: string): boolean {
  return src.includes('unsplash.com');
}

/**
 * Image loading priorities
 * Used for optimizing LCP and loading performance
 */
export const LOADING_PRIORITY = {
  eager: 'eager' as const, // Above the fold, critical
  lazy: 'lazy' as const, // Below the fold, defer loading
};

/**
 * Get loading priority for image
 * 
 * @param isAboveFold - Whether image is above the fold
 * @returns Loading attribute value
 */
export function getLoadingPriority(isAboveFold: boolean = false): 'eager' | 'lazy' {
  return isAboveFold ? LOADING_PRIORITY.eager : LOADING_PRIORITY.lazy;
}

/**
 * Image formats supported
 */
export const IMAGE_FORMATS = {
  webp: 'image/webp',
  jpeg: 'image/jpeg',
  png: 'image/png',
};

/**
 * Default image quality settings
 */
export const IMAGE_QUALITY = {
  hero: 85, // High quality for hero images
  gallery: 75, // Good quality for gallery
  thumbnail: 70, // Lower quality for thumbnails
  blog: 80, // Good quality for blog featured images
};

/**
 * Placeholder for missing images
 * SVG data URL for a simple mountain icon
 */
export const PLACEHOLDER_SVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect fill='%23ddd' width='400' height='300'/%3E%3Cpath fill='%23999' d='M100 200 L150 100 L200 150 L250 80 L300 200 Z'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' fill='%23666' font-family='Arial' font-size='16'%3EImage Placeholder%3C/text%3E%3C/svg%3E`;

/**
 * Get placeholder image
 * 
 * @param width - Placeholder width
 * @param height - Placeholder height
 * @returns Placeholder data URL
 */
export function getPlaceholderImage(width: number = 400, height: number = 300): string {
  return PLACEHOLDER_SVG.replace('400', width.toString()).replace('300', height.toString());
}

// Export all for easy importing
export default {
  getUnsplashUrl,
  getHeroImage,
  getGalleryImage,
  getBlogImage,
  getResponsiveSrcset,
  getAltText,
  isPlaceholder,
  getLoadingPriority,
  getPlaceholderImage,
  UNSPLASH_IMAGES,
  ALT_TEXTS,
  IMAGE_QUALITY,
};

