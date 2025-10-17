# 📸 Image Directory Structure

This directory contains all images for the Shiv Yatra Tourism website.

## 📁 Directory Organization

```
/public/images/
├── hero/              # Hero section backgrounds (1920x1080)
├── gallery/           # Photo gallery images (1200x800)
├── thumbnails/        # Thumbnail images (400x300)
├── blog/              # Blog post featured images (1200x630)
├── peaks/             # Mountain peak photos (1600x900)
├── villages/          # Village & settlement photos (1200x800)
├── temples/           # Temple & religious site photos (1200x800)
├── journey/           # Journey & route photos (1200x800)
├── og/                # Open Graph images for social sharing (1200x630)
└── icons/             # Icons and small graphics
```

## 🖼️ Image Specifications

### Hero Images (hero/)
- **Dimensions:** 1920x1080px (16:9)
- **Format:** WebP (with JPEG fallback)
- **Subjects:** Adi Kailash peak, Om Parvat, Himalayan landscapes
- **Naming:** `hero-adi-kailash-peak.webp`, `hero-om-parvat.webp`

### Gallery Images (gallery/)
- **Dimensions:** 1200x800px (3:2)
- **Format:** WebP (with JPEG fallback)
- **Categories:** Peaks, Villages, Temples, Journey
- **Naming:** `gallery-{category}-{number}.webp`

### Blog Images (blog/)
- **Dimensions:** 1200x630px (1.91:1) - Optimized for social sharing
- **Format:** WebP (with JPEG fallback)
- **Naming:** Match blog slug: `{blog-slug}-featured.webp`

## 🔗 Placeholder Images (Unsplash)

Currently using Unsplash placeholders. Replace with real photos before launch!

### Unsplash Collections Used:
- **Mountains:** `https://images.unsplash.com/photo-{id}?w={width}&q=80`
- **Himalayan Landscapes:** Collection ID: `1234567`
- **Temples:** Search: `himalayan temple`
- **Villages:** Search: `himalayan village india`

### Current Placeholders:

#### Hero Section:
```
https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80
(Adi Kailash peak - Snow-capped Himalayan mountain)
```

#### Gallery:
```
Peaks:
- https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1200&q=80
- https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80
- https://images.unsplash.com/photo-1454391304352-2bf4678b1a7a?w=1200&q=80

Villages:
- https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80
- https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&q=80

Temples:
- https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&q=80
- https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=1200&q=80
```

## 🎨 Image Optimization

### Tools Used:
- **Astro Image Component:** Automatic WebP conversion, responsive srcset
- **Sharp:** Image processing library (built into Astro)
- **Lazy Loading:** All below-the-fold images use `loading="lazy"`

### Optimization Settings:
```astro
<Image
  src={heroImage}
  alt="Adi Kailash peak"
  width={1920}
  height={1080}
  format="webp"
  quality={80}
  loading="eager"  // For hero images
/>

<Image
  src={galleryImage}
  alt="Description"
  width={1200}
  height={800}
  format="webp"
  quality={75}
  loading="lazy"  // For gallery images
/>
```

## 📝 Alt Text Guidelines

### Hero Images:
- ✅ "Adi Kailash peak covered in snow during sunrise"
- ❌ "Mountain"

### Gallery Images:
- ✅ "Traditional wooden homes in Gunji village with Himalayan backdrop"
- ❌ "Village photo"

### Blog Images:
- ✅ "Trekkers on the trail to Adi Kailash with prayer flags"
- ❌ "Trekking"

## 🔄 Replacing Placeholders

### Step 1: Upload Real Images
1. Add high-resolution photos to appropriate directories
2. Name files descriptively: `adi-kailash-peak-sunrise.jpg`
3. Keep original dimensions large (min 1920px width for hero)

### Step 2: Optimize Images
```bash
# Using ImageMagick
convert input.jpg -quality 85 -resize 1920x1080^ -gravity center -extent 1920x1080 output.jpg

# Using Sharp (Node.js)
npm run optimize-images
```

### Step 3: Update Image References
- Update `image_manifest.csv` in `/data`
- Update image imports in components
- Update alt text in components

### Step 4: Test
- Run `pnpm run build` to generate optimized images
- Check image sizes: should be < 200KB for large images
- Verify lazy loading works
- Test on mobile devices

## 📋 Image Checklist

### Before Launch:
- [ ] Replace all Unsplash placeholders with real photos
- [ ] Add proper alt text to all images
- [ ] Optimize all images (WebP + JPEG fallback)
- [ ] Test lazy loading on slow connections
- [ ] Verify images work on all browsers
- [ ] Check Open Graph images for social sharing
- [ ] Compress images to < 200KB each
- [ ] Add image credits/attributions if needed

### Image Sources (Real Photos):
- Photographer: [Name]
- License: [License Type]
- Website: [URL]

## 🆘 Troubleshooting

### Images not loading:
1. Check file paths are correct
2. Verify images exist in `/public/images/`
3. Check image format is supported (JPG, PNG, WebP)
4. Clear browser cache

### Images too large:
1. Use WebP format
2. Lower quality setting (70-85 is usually fine)
3. Resize to appropriate dimensions
4. Use Astro's Image component for automatic optimization

### Images not lazy loading:
1. Add `loading="lazy"` attribute
2. Use Astro's Image component
3. Check if images are in viewport on page load (should use `loading="eager"`)

---

**Last Updated:** January 2025
**Status:** 🚧 Using Unsplash placeholders - Replace before launch!

