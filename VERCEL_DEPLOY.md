# 🚀 Vercel Deployment Guide - Shiv Yatra Tourism

This guide covers deploying your Adi Kailash Tourism website to Vercel using **npm** or **bun**.

---

## 📋 Prerequisites

- Vercel account (free at [vercel.com](https://vercel.com))
- Git repository (GitHub, GitLab, or Bitbucket)
- Node.js 18+ installed locally

---

## 🎯 Quick Deploy (Recommended)

### Option 1: Deploy via Vercel Dashboard (Easiest)

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import on Vercel:**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import Project"
   - Select your GitHub repository
   - Vercel will **auto-detect** Astro framework
   - Click "Deploy"

**Done!** ✅ Vercel will automatically:
- Detect npm (if `package-lock.json` exists) or bun (if `bun.lockb` exists)
- Run `npm install` or `bun install`
- Run `npm run build` or `bun run build`
- Deploy to a live URL

---

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel
# or
bun install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

---

## 🔧 Package Manager Selection

Vercel **automatically detects** which package manager to use:

### Use npm (Default - Configured):
- Keep `package-lock.json` in your repo
- Delete `bun.lockb` if it exists
- Vercel will use: `npm install` and `npm run build`

### Use bun (Faster):
```bash
# Generate bun lockfile
bun install

# Delete npm lockfile (optional)
rm -f package-lock.json

# Commit bun lockfile
git add bun.lockb
git commit -m "Switch to bun"
git push
```
- Vercel will auto-detect `bun.lockb`
- Vercel will use: `bun install` and `bun run build`

### Use pnpm:
```bash
# Generate pnpm lockfile
pnpm install

# Delete other lockfiles
rm -f package-lock.json bun.lockb

# Commit
git add pnpm-lock.yaml
git commit -m "Switch to pnpm"
git push
```

---

## ⚙️ Configuration Files Explained

### `vercel.json` (Auto-configured)
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "framework": "astro"
}
```

**Note:** Vercel ignores these commands if it auto-detects the framework. It will use the appropriate package manager automatically.

### `package.json` Build Scripts
```json
{
  "scripts": {
    "build": "astro build",
    "vercel-build": "npm run build"
  }
}
```

Both scripts work with npm and bun.

---

## 🌍 Environment Variables (If Needed)

If you need environment variables:

1. **Local development:**
   ```bash
   cp .env.example .env
   ```

2. **Vercel Dashboard:**
   - Go to Project Settings → Environment Variables
   - Add variables:
     - `PUBLIC_PHONE_NUMBER` = 917302937532
     - `PUBLIC_SITE_URL` = https://yourdomain.com

---

## 📊 Build Settings in Vercel Dashboard

**Framework Preset:** Astro  
**Build Command:** `npm run build` (auto-detected)  
**Output Directory:** `dist` (auto-detected)  
**Install Command:** `npm install` (auto-detected)  
**Node Version:** 18.x (specified in `.nvmrc`)

---

## 🔍 Vercel Auto-Detection Logic

Vercel checks files in this order:

1. **bun.lockb** → Uses `bun`
2. **pnpm-lock.yaml** → Uses `pnpm`
3. **yarn.lock** → Uses `yarn`
4. **package-lock.json** → Uses `npm`

**Your project:** Currently configured for **npm** (package-lock.json exists)

---

## ✅ Deployment Checklist

Before deploying:

- [x] Build succeeds locally: `npm run build`
- [x] Preview works: `npm run preview`
- [x] All pages load correctly
- [x] Mobile menu works
- [x] Hindi pages work
- [x] WhatsApp button works
- [x] Images load (placeholders for now)
- [x] Sitemap generated (`/sitemap-index.xml`)
- [x] Robots.txt exists
- [ ] Custom domain added (optional)
- [ ] Analytics added (optional)

---

## 🚀 Post-Deployment Steps

### 1. **Verify Deployment**
Visit your live URL and check:
- Home page loads
- All navigation links work
- Hindi toggle works
- WhatsApp button opens correctly
- Mobile responsive works

### 2. **Add Custom Domain (Optional)**
```bash
# Via Vercel CLI
vercel domains add yourdomain.com

# Or via Vercel Dashboard:
# Project Settings → Domains → Add Domain
```

### 3. **Enable Analytics (Optional)**
- Go to Project Settings → Analytics
- Enable Vercel Analytics (free)
- Add to `BaseLayout.astro`:
```astro
---
import { inject } from '@vercel/analytics';
inject();
---
```

---

## 🔄 Continuous Deployment

**Automatic Deployments:**
- Every `git push` to `main` branch → Production deployment
- Every `git push` to other branches → Preview deployment
- Pull requests → Automatic preview URLs

**Manual Deployments:**
```bash
# Deploy current directory
vercel

# Deploy to production
vercel --prod

# Deploy with custom name
vercel --name my-custom-name
```

---

## 🐛 Troubleshooting

### Build Fails on Vercel

**1. Check build logs:**
- Go to Vercel Dashboard → Deployments → Click failed deployment
- Scroll to build logs
- Look for error messages

**2. Common issues:**

**Error: "Cannot find module"**
```bash
# Solution: Ensure all dependencies are in package.json
npm install
git add package.json package-lock.json
git commit -m "Fix dependencies"
git push
```

**Error: "Build exceeded time limit"**
```bash
# Solution: Optimize build (already done in this project)
# Build time: ~22 seconds (well within limit)
```

**Error: "Out of memory"**
```bash
# Solution: Contact Vercel support for memory upgrade
# Or optimize images/reduce bundle size
```

### Build Succeeds but Site Doesn't Work

**1. Check 404 errors:**
- Ensure `vercel.json` has correct routes
- Check that `dist/` folder has all HTML files

**2. Check console errors:**
- Open browser DevTools (F12)
- Look for JavaScript errors
- Check Network tab for failed requests

**3. Verify environment:**
```bash
# Test production build locally
npm run build
npm run preview
```

---

## 📈 Performance Optimization (Already Configured)

✅ **Enabled:**
- Static HTML generation
- CSS minification (lightningcss)
- Image optimization (astro:assets)
- Gzip compression (automatic on Vercel)
- CDN distribution (automatic on Vercel)
- Cache headers (configured in vercel.json)

**Expected Lighthouse Score:** 95+ 🎯

---

## 🔐 Security Headers (Already Configured)

```json
{
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "strict-origin-when-cross-origin"
}
```

---

## 💰 Vercel Pricing (Free Tier Limits)

**Hobby (Free):**
- Unlimited deployments
- 100 GB bandwidth/month
- 6,000 build minutes/month
- Automatic HTTPS
- Custom domains

**Your usage:**
- Build time: ~22 seconds per deployment
- Site size: ~180 KB (HTML)
- Bandwidth: Depends on traffic

**Estimated:** Can handle **10,000+ visits/month** on free tier!

---

## 🎉 Success!

Your site should now be live at:
- `https://your-project.vercel.app`
- Custom domain (if added)

**Share it:**
```
🙏 Adi Kailash Yatra 2025
✨ Sacred Pilgrimage to Lord Shiva's Abode
🌐 https://your-domain.com
📱 WhatsApp: +91-7302937532
```

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Astro on Vercel](https://docs.astro.build/en/guides/deploy/vercel/)
- [Vercel CLI Reference](https://vercel.com/docs/cli)
- [Custom Domains](https://vercel.com/docs/concepts/projects/domains)

---

## 🆘 Need Help?

**Vercel Support:**
- [Vercel Discord](https://vercel.com/discord)
- [Vercel GitHub](https://github.com/vercel/vercel)
- Email: support@vercel.com

**Project Issues:**
- Check console logs
- Test locally first: `npm run build && npm run preview`
- Review this deployment guide

---

**Happy Deploying! 🚀**

**Har Har Mahadev! 🙏**

