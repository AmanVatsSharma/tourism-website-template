<!-- 4cb2851a-911a-45f7-9c81-fa1bca385af0 4d53efe7-9857-468c-8531-baa69609f236 -->
# Build Complete Adi Kailash Tourism Website

## Phase 1: Project Foundation & Dependencies

### Install Required Dependencies

```bash
pnpm add @astrojs/tailwind tailwindcss @astrojs/sitemap papaparse
pnpm add -D @astrojs/react react react-dom alpinejs @alpinejs/intersect
```

### Configure Astro (`astro.config.mjs`)

- Add Tailwind, Sitemap, and React integrations
- Configure i18n with English (default) and Hindi locales
- Set site URL and image optimization settings
- Enable View Transitions for smooth page navigation

### Create Tailwind Config

- Set up custom colors (Saffron Orange #FF6B35, Deep Blue #2C3E50, Golden #F39C12)
- Add Google Fonts: Poppins (English) and Noto Sans Devanagari (Hindi)
- Configure custom animations and transitions

## Phase 2: Core Infrastructure

### Data Utilities (`src/utils/`)

- **dataLoader.ts**: Functions to load and parse CSV/JSON files from `/data`
  - `loadCSV()` using papaparse
  - `loadJSON()` for JSON files
  - `loadContent()` to structure content.csv into nested objects
- **translations.ts**: i18n utility functions
  - Translation loader for en/hi JSON files
  - `useTranslation()` hook for accessing translations
- **whatsapp.ts**: WhatsApp link generator with pre-filled messages

### Base Layouts (`src/layouts/`)

- **BaseLayout.astro**: Main layout with:
  - SEO meta tags component
  - ViewTransitions enabled
  - Header, Footer, WhatsAppButton
  - Schema markup injection
  - Global styles and scripts
- **BlogLayout.astro**: Blog post layout with:
  - Article schema markup
  - Author info and publish date
  - Social sharing buttons
  - Related posts section

### Content Collections Setup (`src/content/config.ts`)

- Define blog collection with zod schema (title, description, pubDate, author, image, tags)
- Create 12 blog posts as markdown files from `blog_outlines.json`

## Phase 3: Reusable Components

### UI Components (`src/components/ui/`)

- **Button.astro**: Primary, secondary, outline variants
- **Card.astro**: Reusable card with hover effects
- **AnimatedSection.astro**: Intersection Observer scroll animations
- **Badge.astro**: Difficulty levels, tags
- **Modal.astro**: Image lightbox for gallery

### Layout Components (`src/components/layout/`)

- **Header.astro**: Logo, navigation menu, language toggle, mobile hamburger
- **Footer.astro**: Company info, quick links, social media, schema markup
- **Navigation.astro**: Dynamic nav from sitemap.json with active states

### Feature Components (`src/components/`)

- **WhatsAppButton.astro**: Floating button with pulse animation (+91-7302937532)
- **LanguageToggle.astro**: EN ↔ HI switcher with flag icons
- **SEO.astro**: Meta tags from `meta_tags.json`
- **SchemaMarkup.astro**: JSON-LD injection (FAQ, Organization, Local Business)
- **PhoneLink.astro**: Click-to-call component
- **ContactForm.astro**: Form with validation (placeholder for backend) + WhatsApp options

### Section Components (`src/components/sections/`)

- **Hero.astro**: Full-screen hero with parallax, gradient overlays, CTAs
- **Stats.astro**: Animated counters (25,000+ pilgrims, years experience)
- **Features.astro**: Why Choose Adi Kailash grid
- **Testimonials.astro**: Carousel with ratings
- **PackageCard.astro**: Tour package display with pricing
- **ItineraryDay.astro**: Expandable day-by-day breakdown
- **FAQ.astro**: Accordion with FAQ schema
- **Gallery.astro**: Image grid with lightbox

## Phase 4: Main Pages (English)

All pages load content dynamically from data files and include:

- SEO meta tags from `meta_tags.json`
- Schema markup where applicable
- Animated sections
- Mobile-responsive design

### Core Pages (`src/pages/`)

1. **index.astro** - Home

   - Hero section with Adi Kailash peak image
   - Why Choose section (3 key benefits)
   - Sacred sites preview
   - Stats section
   - Testimonials
   - CTA to packages

2. **about.astro** - About Adi Kailash

   - Introduction and mythology
   - Historical significance
   - Religious importance
   - Location and geography
   - Company info (Shiv Yatra Tourism)

3. **packages.astro** - Tour Packages

   - Display all 3 packages from itinerary_5day.json and content.csv
   - 5-Day Express, 9-Day Complete, 14-Day Grand Circuit
   - Pricing cards with inclusions/exclusions
   - WhatsApp booking buttons

4. **itinerary.astro** - Detailed Itinerary

   - Day-by-day breakdown from itinerary_5day.json
   - Altitude charts
   - Distance and duration info
   - Activities and meals
   - Accommodation details

5. **permits.astro** - Inner Line Permit Guide

   - What is ILP
   - Required documents list
   - Application process step-by-step
   - SDM office contact info
   - Processing time and fees

6. **how-to-reach.astro** - Travel Guide

   - By Air (Pantnagar Airport)
   - By Rail (Kathgodam)
   - By Road (from Delhi, Dehradun)
   - Distance tables
   - Route maps (embed Google Maps)
   - Transport options

7. **accommodation.astro** - Stay Options

   - Hotels in Dharchula
   - Guesthouses in Gunji
   - Camps at Jolingkong
   - Booking information
   - Facilities available

8. **preparation.astro** - Trip Preparation Guide

   - Fitness requirements
   - Packing checklist from image_manifest
   - Medical precautions
   - Altitude acclimatization tips
   - What to expect

9. **gallery.astro** - Photo Gallery

   - Image grid using image_manifest.csv
   - Placeholder images from Unsplash/Pexels
   - Categories: Peaks, Villages, Temples, Journey
   - Lightbox modal

10. **faq.astro** - Frequently Asked Questions

    - 20 FAQs from `faq_schema.json`
    - Accordion UI
    - FAQ schema markup in head

11. **contact.astro** - Contact Us

    - Contact form (frontend only, placeholder for backend)
    - WhatsApp quick message buttons (4-5 pre-filled options)
    - Phone number: +91-7302937532
    - Email and address
    - Embedded map (Dharchula office)

### Blog Pages (`src/pages/blog/`)

12. **blog/index.astro** - Blog listing page

    - Grid of all 12 blog posts
    - Filter by tags
    - Search functionality
    - Pagination (if needed)

13. **blog/[slug].astro** - Dynamic blog post page

    - Render markdown content
    - Article schema markup
    - Share buttons
    - Related posts

## Phase 5: Hindi Pages (`src/pages/hi/`)

Create complete Hindi versions of all pages:

- `/hi/index.astro`
- `/hi/about.astro`
- `/hi/packages.astro`
- `/hi/itinerary.astro`
- `/hi/permits.astro`
- `/hi/how-to-reach.astro`
- `/hi/accommodation.astro`
- `/hi/preparation.astro`
- `/hi/gallery.astro`
- `/hi/faq.astro`
- `/hi/contact.astro`
- `/hi/blog/index.astro`
- `/hi/blog/[slug].astro`

### Translation Implementation

- Create `public/locales/en.json` and `public/locales/hi.json`
- Populate from content.csv Hindi content
- Apply `lang="hi"` attribute for proper font rendering

## Phase 6: Blog Content Creation

Create 12 full blog posts from `blog_outlines.json` as markdown files in `src/content/blog/`:

1. `adi-kailash-complete-guide-2025.md` - Comprehensive guide
2. `om-parvat-natural-om-symbol.md` - Om Parvat significance
3. `adi-kailash-vs-mount-kailash.md` - Comparison article
4. `inner-line-permit-guide.md` - Permit process
5. `best-time-visit-adi-kailash.md` - Seasonal guide
6. `fitness-preparation-high-altitude.md` - Training tips
7. `packing-checklist-adi-kailash.md` - Gear guide
8. `gunji-village-last-indian-settlement.md` - Village profile
9. `panch-kailash-explained.md` - Five Kailash overview
10. `adi-kailash-itinerary-5-9-14-days.md` - Itinerary comparison
11. `photography-tips-himalayan-pilgrimage.md` - Photo guide
12. `spiritual-significance-adi-kailash.md` - Religious aspects

Each post includes:

- Front matter with all metadata
- Structured content with H2/H3 headings
- Keywords from keywords.csv
- Images references
- Internal links to related pages

## Phase 7: Styling & Animations

### Global Styles (`src/styles/global.css`)

- Import Tailwind base, components, utilities
- Load Google Fonts (Poppins, Noto Sans Devanagari)
- CSS custom properties for brand colors
- Custom component classes (btn-primary, card, container)
- Smooth scroll behavior
- Animation keyframes (fade-in, slide-in, pulse-glow)

### Animations Implementation

- **View Transitions**: Page navigation
- **Scroll Animations**: Intersection Observer on sections
- **Hero Parallax**: Background image scroll effect
- **Counter Animation**: Stats with Alpine.js
- **Hover Effects**: Cards, buttons, images
- **WhatsApp Button**: Pulse and bounce animations
- **Loading States**: Skeleton screens

### Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Hamburger menu for mobile
- Touch-friendly buttons (min 44px)
- Optimized images for mobile

## Phase 8: SEO & Performance

### SEO Implementation

- **Meta Tags**: Dynamic from `meta_tags.json` on all pages
- **Schema Markup**: Organization, FAQ, LocalBusiness, Article
- **Sitemap**: Generate from `sitemap.json` at `/sitemap.xml`
- **Robots.txt**: Allow all crawlers
- **Canonical URLs**: Proper canonicalization for en/hi pages
- **Open Graph**: Social media preview tags
- **Twitter Cards**: Twitter-specific meta tags

### Image Optimization

- Set up image structure: `/public/images/` with subfolders
- Use placeholder images from Unsplash/Pexels API
- Image categories: hero/, gallery/, thumbnails/, blog/
- Add alt text from `image_manifest.csv`
- Lazy loading for below-fold images
- WebP format with fallbacks

### Performance Optimizations

- Minimal JavaScript (Astro zero-JS by default)
- Inline critical CSS
- Defer non-critical scripts
- Optimize font loading (font-display: swap)
- Compress images
- Enable View Transitions caching

## Phase 9: WhatsApp Integration

### WhatsApp Features

- **Floating Button**: Fixed bottom-right, pulse animation, opens WhatsApp with pre-filled message
- **Contact Form Integration**: Submit → redirect to WhatsApp with form data
- **Quick Message Buttons**: 4-5 options on contact page:
  - "I want to book 5-day package"
  - "Need help with Inner Line Permit"
  - "Request custom itinerary"
  - "Ask about group discounts"
  - "General inquiry"
- **Package CTAs**: Each package card has WhatsApp button with package name pre-filled
- **Phone Number**: +91-7302937532 (clickable on mobile)

## Phase 10: Documentation & Testing

### Documentation Files

- **README.md**: Project setup, development, build instructions
- **DEPLOYMENT.md**: Deployment guide for Vercel/Netlify
- **CONTENT_UPDATE.md**: How to update content in data files
- **IMAGE_GUIDE.md**: How to replace placeholder images
- **docs/FLOWCHART.md**: Visual flowchart of user journey
- **docs/COMPONENT_LIBRARY.md**: Component usage guide

### Code Documentation

- JSDoc comments on all utility functions
- Inline comments explaining complex logic
- Console logs for debugging (development mode only)
- Error handling with try-catch blocks
- Detailed console messages for data loading

### Module Documentation

Create docs in respective component folders:

- `src/components/README.md` - Component overview
- `src/utils/README.md` - Utility function docs
- `src/layouts/README.md` - Layout usage guide

### Flowcharts

Create visual flowcharts for:

- User booking journey (landing → package → WhatsApp)
- Data loading flow
- i18n switching logic
- Content management process

## Phase 11: Final Touches

### Testing Checklist

- All internal links work
- Language toggle on all pages
- WhatsApp links open correctly on mobile/desktop
- Images load with proper alt text
- Forms validate properly
- Responsive on mobile, tablet, desktop
- Accessibility: keyboard navigation, ARIA labels
- Cross-browser testing (Chrome, Firefox, Safari, Edge)

### Content Review

- Replace [DOMAIN] placeholders in meta tags
- Verify all data files are loaded correctly
- Check Hindi translations render properly
- Ensure consistent tone and branding
- Proofread all content

### Performance Audit

- Run Lighthouse (target 95+ on all metrics)
- Check page load times
- Verify lazy loading works
- Test on 3G connection
- Optimize any bottlenecks

### Pre-Launch Setup

- Add favicon and touch icons
- Create 404 error page
- Set up robots.txt
- Generate sitemap.xml
- Add Google Analytics placeholder (commented out)
- Add meta verification tags (Google/Bing)

---

## Implementation Todos

The implementation will follow these phases sequentially, ensuring proper error handling, extensive console logging for debugging, and comprehensive documentation throughout.

### To-dos

- [ ] Install dependencies and configure Astro with Tailwind, i18n, and integrations
- [ ] Create data loading utilities (dataLoader.ts, translations.ts, whatsapp.ts)
- [ ] Build BaseLayout and BlogLayout with SEO and schema markup
- [ ] Create reusable UI components (Button, Card, AnimatedSection, Badge, Modal)
- [ ] Build Header, Footer, Navigation with language toggle and mobile menu
- [ ] Create WhatsApp button, SEO component, SchemaMarkup, ContactForm
- [ ] Build section components (Hero, Stats, Features, Testimonials, PackageCard, FAQ, Gallery)
- [ ] Create all 11 main pages in English with dynamic content loading
- [ ] Create 12 full blog post markdown files from blog_outlines.json
- [ ] Build blog index and dynamic [slug] pages with content collections
- [ ] Create en.json and hi.json translation files from content.csv
- [ ] Create complete Hindi versions of all pages in /hi/ directory
- [ ] Create global.css with Tailwind config, custom animations, and responsive styles
- [ ] Implement View Transitions, scroll animations, parallax, and interactive effects
- [ ] Implement meta tags, schema markup, sitemap.xml, robots.txt, and Open Graph tags
- [ ] Set up image structure and add placeholder images from Unsplash/Pexels
- [ ] Implement floating button, quick messages, and package-specific WhatsApp CTAs
- [ ] Create comprehensive docs (README, deployment guide, flowcharts, component library)
- [ ] Test all features, run Lighthouse audit, fix issues, and prepare for launch