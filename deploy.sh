#!/bin/bash

# 🚀 Vercel Deployment Script for Shiv Yatra Tourism
# Supports npm and bun

set -e

echo "🚀 Vercel Deployment Helper"
echo "=============================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Run this script from the project root."
    exit 1
fi

# Detect package manager
PACKAGE_MANAGER="npm"
if [ -f "bun.lockb" ]; then
    PACKAGE_MANAGER="bun"
elif [ -f "pnpm-lock.yaml" ]; then
    PACKAGE_MANAGER="pnpm"
fi

echo "📦 Detected package manager: $PACKAGE_MANAGER"
echo ""

# Function to run commands with detected package manager
run_command() {
    if [ "$PACKAGE_MANAGER" = "bun" ]; then
        bun "$@"
    elif [ "$PACKAGE_MANAGER" = "pnpm" ]; then
        pnpm "$@"
    else
        npm "$@"
    fi
}

# Menu
echo "Choose deployment method:"
echo "1) Test build locally"
echo "2) Deploy to Vercel (CLI)"
echo "3) Deploy to production"
echo "4) Switch to npm"
echo "5) Switch to bun"
echo "6) Install Vercel CLI"
echo "7) Exit"
echo ""
read -p "Enter choice [1-7]: " choice

case $choice in
    1)
        echo ""
        echo "🔨 Building project locally..."
        run_command run build
        echo ""
        echo "✅ Build successful! Starting preview server..."
        run_command run preview
        ;;
    2)
        echo ""
        echo "🚀 Deploying to Vercel (preview)..."
        vercel
        ;;
    3)
        echo ""
        echo "🚀 Deploying to Vercel (production)..."
        vercel --prod
        ;;
    4)
        echo ""
        echo "🔄 Switching to npm..."
        rm -f bun.lockb pnpm-lock.yaml
        npm install
        echo "✅ Switched to npm. Lockfile: package-lock.json"
        ;;
    5)
        echo ""
        echo "🔄 Switching to bun..."
        if ! command -v bun &> /dev/null; then
            echo "❌ Bun is not installed. Install it first:"
            echo "   curl -fsSL https://bun.sh/install | bash"
            exit 1
        fi
        rm -f package-lock.json pnpm-lock.yaml
        bun install
        echo "✅ Switched to bun. Lockfile: bun.lockb"
        ;;
    6)
        echo ""
        echo "📦 Installing Vercel CLI..."
        run_command install -g vercel
        echo "✅ Vercel CLI installed!"
        echo ""
        echo "Next steps:"
        echo "1. Run: vercel login"
        echo "2. Run: vercel --prod"
        ;;
    7)
        echo "👋 Goodbye!"
        exit 0
        ;;
    *)
        echo "❌ Invalid choice. Please run the script again."
        exit 1
        ;;
esac

echo ""
echo "✨ Done!"

