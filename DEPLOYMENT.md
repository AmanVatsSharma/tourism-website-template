# 🚀 Deployment Guide - Shiv Yatra Tourism Website

Complete guide to deploying the Adi Kailash tourism website to production.

---

## 📋 Pre-Deployment Checklist

### 1. Content Review
- [ ] All placeholder text replaced with final content
- [ ] Unsplash images replaced with real photos
- [ ] Contact information verified (+91-7302937532)
- [ ] Company details updated in `organization_schema.json`
- [ ] All meta tags reviewed
- [ ] Hindi translations verified by native speaker

### 2. Technical Review
- [ ] All pages load without errors
- [ ] Mobile responsive on all devices
- [ ] Forms work correctly
- [ ] WhatsApp links tested on mobile
- [ ] All internal links work
- [ ] 404 page tested
- [ ] Blog posts render correctly

### 3. SEO & Performance
- [ ] Lighthouse score 95+ (all categories)
- [ ] All images optimized (WebP format)
- [ ] Meta tags on all pages
- [ ] Schema markup validated
- [ ] Sitemap generated
- [ ] Robots.txt configured

### 4. Security
- [ ] HTTPS enabled
- [ ] Environment variables secured
- [ ] No sensitive data in code
- [ ] CORS configured if needed

---

## 🔧 Build for Production

### Step 1: Install Dependencies
```bash
cd /home/sonuram/Desktop/DevOPS/tourism-website-template
pnpm install
```

### Step 2: Run Production Build
```bash
pnpm run build
```

This creates an optimized static site in the `/dist` directory.

### Step 3: Preview Production Build (Optional)
```bash
pnpm run preview
```

Visit `http://localhost:4321` to test the production build locally.

---

## 🌐 Deployment Options

### Option 1: Vercel (Recommended - Easiest)

**Pros:** Zero config, automatic HTTPS, great performance, free tier

**Steps:**

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy**
```bash
vercel --prod
```

4. **Configure Custom Domain**
   - Go to Vercel Dashboard → Project → Settings → Domains
   - Add `shivyatratourism.com`
   - Update DNS records as instructed

**vercel.json Configuration:**
```json
{
  "buildCommand": "pnpm run build",
  "outputDirectory": "dist",
  "framework": "astro",
  "redirects": [
    {
      "source": "/hi/",
      "destination": "/hi",
      "permanent": true
    }
  ]
}
```

---

### Option 2: Netlify

**Pros:** Easy deployment, form handling, good CDN

**Steps:**

1. **Install Netlify CLI**
```bash
npm i -g netlify-cli
```

2. **Login to Netlify**
```bash
netlify login
```

3. **Initialize Site**
```bash
netlify init
```

4. **Deploy**
```bash
netlify deploy --prod
```

**netlify.toml Configuration:**
```toml
[build]
  command = "pnpm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
```

---

### Option 3: GitHub Pages

**Pros:** Free, integrated with GitHub

**Steps:**

1. **Install gh-pages**
```bash
pnpm add -D gh-pages
```

2. **Add Deploy Script to package.json**
```json
{
  "scripts": {
    "deploy": "pnpm run build && gh-pages -d dist"
  }
}
```

3. **Deploy**
```bash
pnpm run deploy
```

4. **Configure in GitHub**
   - Settings → Pages → Source: gh-pages branch

---

### Option 4: Traditional Hosting (cPanel, Shared Hosting)

**Steps:**

1. **Build Site**
```bash
pnpm run build
```

2. **Upload dist/ Folder**
   - Use FTP/SFTP client (FileZilla, Cyberduck)
   - Upload everything from `/dist` to `/public_html` or web root

3. **Configure .htaccess (for Apache)**
```apache
# Force HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Handle SPAs (if needed)
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>

# Caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

---

## 🔒 SSL Certificate Setup

### For Vercel/Netlify:
- Automatic! HTTPS enabled by default

### For cPanel:
1. Go to cPanel → SSL/TLS
2. Install Let's Encrypt (free) or upload certificate
3. Enable "Force HTTPS Redirect"

### For VPS/Dedicated Server:
```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d shivyatratourism.com -d www.shivyatratourism.com

# Auto-renewal (cron job)
sudo crontab -e
# Add: 0 0 * * * certbot renew --quiet
```

---

## 📊 Post-Deployment Setup

### 1. Google Search Console

1. Visit [Google Search Console](https://search.google.com/search-console)
2. Add property: `shivyatratourism.com`
3. Verify ownership (DNS or HTML file)
4. Submit sitemap: `https://shivyatratourism.com/sitemap.xml`

### 2. Google Analytics (Optional)

1. Create property at [analytics.google.com](https://analytics.google.com)
2. Add tracking code to `BaseLayout.astro`:
```astro
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 3. Google My Business

1. Create/claim business listing
2. Add location: Dharchula, Uttarakhand
3. Add phone: +91-7302937532
4. Upload photos
5. Verify business

### 4. Social Media Setup

**Facebook Page:**
- Create page for Shiv Yatra Tourism
- Add website link
- Enable messaging (links to WhatsApp)

**Instagram:**
- Create business account
- Post gallery photos
- Add website to bio

### 5. WhatsApp Business Setup

1. Download WhatsApp Business app
2. Register with +91-7302937532
3. Set up:
   - Business profile
   - Greeting message
   - Away message
   - Quick replies for common questions

---

## 🔍 SEO Post-Launch Tasks

### Week 1:
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Verify all pages indexed
- [ ] Check for crawl errors

### Week 2-4:
- [ ] Monitor search performance
- [ ] Fix any technical SEO issues
- [ ] Start link building
- [ ] Create Google My Business posts

### Ongoing:
- [ ] Publish new blog posts monthly
- [ ] Update seasonal content (best time to visit)
- [ ] Monitor and respond to reviews
- [ ] Track keyword rankings

---

## 📈 Performance Monitoring

### Tools to Use:

1. **Google Lighthouse**
   - Run monthly audits
   - Target: 95+ all metrics

2. **Google PageSpeed Insights**
   - Test mobile and desktop
   - Fix Core Web Vitals issues

3. **GTmetrix**
   - Monitor loading speed
   - Check CDN performance

4. **Uptime Monitoring**
   - Use UptimeRobot (free)
   - Get alerts if site goes down

---

## 🐛 Troubleshooting

### Site Not Loading After Deployment:
1. Check DNS propagation (use whatsmydns.net)
2. Verify build completed successfully
3. Check server logs for errors
4. Clear CDN cache

### Images Not Showing:
1. Verify image paths are correct
2. Check image formats are supported
3. Test CDN delivery
4. Check CORS headers

### Hindi Pages Not Working:
1. Verify Astro i18n routing
2. Check translation files loaded
3. Test language toggle links
4. Verify Hindi fonts loading

### Form Not Working:
1. Check form action endpoint
2. Verify CORS settings
3. Test WhatsApp fallback
4. Check console for JavaScript errors

---

## 🔄 Continuous Deployment

### Automatic Deployments with Git:

**For Vercel:**
```bash
# Connect GitHub repo in Vercel dashboard
# Pushes to main branch auto-deploy
```

**For Netlify:**
```bash
# Connect GitHub repo in Netlify dashboard
# Configure build settings
```

**Git Workflow:**
```bash
# Make changes
git add .
git commit -m "Update content"
git push origin main

# Automatic deployment triggered!
```

---

## 📞 Support

### Need Help?

**Documentation:**
- Astro Docs: https://docs.astro.build
- Vercel Docs: https://vercel.com/docs
- Netlify Docs: https://docs.netlify.com

**Community:**
- Astro Discord: https://astro.build/chat
- Stack Overflow: Tag `astro`

---

## ✅ Launch Day Checklist

**Final Steps:**

- [ ] Run final Lighthouse audit (95+ score)
- [ ] Test all pages on mobile devices
- [ ] Test WhatsApp links on real phones
- [ ] Verify contact form works
- [ ] Test in multiple browsers (Chrome, Firefox, Safari)
- [ ] Check all images load correctly
- [ ] Verify SSL certificate active
- [ ] Test site on slow 3G connection
- [ ] Submit sitemap to Google
- [ ] Share launch announcement on social media
- [ ] Monitor analytics for first 24 hours

---

**🎉 Ready to Launch!**

Your website is now live and ready to bring pilgrims to Adi Kailash!

**Har Har Mahadev!** 🕉️

---

**Last Updated:** January 2025  
**Version:** 1.0  
**Author:** Shiv Yatra Tourism Development Team

