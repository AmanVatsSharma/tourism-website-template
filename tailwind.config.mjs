/** @type {import('tailwindcss').Config} */

/**
 * Tailwind CSS Configuration for Shiv Yatra Tourism
 * 
 * Brand Colors:
 * - Saffron Orange (#FF6B35): Primary brand color, spiritual energy
 * - Deep Blue (#2C3E50): Secondary color, Himalayan mountains
 * - Golden (#F39C12): Accent color, divinity
 * - WhatsApp Green (#25D366): WhatsApp integration
 */

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			// Brand color palette
			colors: {
				primary: {
					50: '#FFF5F2',
					100: '#FFE8E0',
					200: '#FFD4C7',
					300: '#FFB8A0',
					400: '#FF9469',
					500: '#FF6B35', // Main saffron orange
					600: '#F04F1A',
					700: '#C73D0F',
					800: '#A43310',
					900: '#872E14',
				},
				secondary: {
					50: '#F5F7FA',
					100: '#E4E9F0',
					200: '#CBD4E3',
					300: '#A8B8CD',
					400: '#7F96B2',
					500: '#5F7998',
					600: '#4B617F',
					700: '#3D4F67',
					800: '#2C3E50', // Main deep blue
					900: '#28354A',
				},
				accent: {
					50: '#FEF8E8',
					100: '#FDEFC2',
					200: '#FCE398',
					300: '#FBD76E',
					400: '#FACE4E',
					500: '#F39C12', // Main golden
					600: '#E08E0B',
					700: '#C07C08',
					800: '#A06A05',
					900: '#805402',
				},
				whatsapp: {
					DEFAULT: '#25D366',
					dark: '#1fb855',
				},
			},
			
			// Custom font families
			fontFamily: {
				sans: ['Poppins', 'sans-serif'],
				hindi: ['"Noto Sans Devanagari"', 'sans-serif'],
				heading: ['Poppins', 'sans-serif'],
			},
			
			// Custom animations
			animation: {
				'fade-in': 'fadeIn 0.6s ease-out forwards',
				'fade-in-delay': 'fadeIn 0.8s ease-out 0.3s forwards',
				'slide-up': 'slideUp 0.6s ease-out forwards',
				'slide-in-right': 'slideInRight 0.5s ease-out forwards',
				'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
				'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
				'scale-in': 'scaleIn 0.4s ease-out forwards',
			},
			
			// Animation keyframes
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				slideUp: {
					'0%': { opacity: '0', transform: 'translateY(40px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				slideInRight: {
					'0%': { opacity: '0', transform: 'translateX(100px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' },
				},
				bounceSubtle: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				pulseGlow: {
					'0%, 100%': { boxShadow: '0 0 20px rgba(255, 107, 53, 0.5)' },
					'50%': { boxShadow: '0 0 40px rgba(255, 107, 53, 0.8)' },
				},
				scaleIn: {
					'0%': { opacity: '0', transform: 'scale(0.9)' },
					'100%': { opacity: '1', transform: 'scale(1)' },
				},
			},
			
			// Custom spacing for consistent layouts
			spacing: {
				'128': '32rem',
				'144': '36rem',
			},
			
			// Custom container sizes
			container: {
				center: true,
				padding: {
					DEFAULT: '1rem',
					sm: '2rem',
					lg: '4rem',
					xl: '5rem',
					'2xl': '6rem',
				},
			},
			
			// Custom box shadows
			boxShadow: {
				'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
				'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
				'xl-orange': '0 20px 25px -5px rgba(255, 107, 53, 0.3)',
			},
			
			// Custom border radius
			borderRadius: {
				'4xl': '2rem',
			},
			
			// Typography settings
			fontSize: {
				'xs': ['0.75rem', { lineHeight: '1rem' }],
				'sm': ['0.875rem', { lineHeight: '1.25rem' }],
				'base': ['1rem', { lineHeight: '1.5rem' }],
				'lg': ['1.125rem', { lineHeight: '1.75rem' }],
				'xl': ['1.25rem', { lineHeight: '1.75rem' }],
				'2xl': ['1.5rem', { lineHeight: '2rem' }],
				'3xl': ['1.875rem', { lineHeight: '2.25rem' }],
				'4xl': ['2.25rem', { lineHeight: '2.5rem' }],
				'5xl': ['3rem', { lineHeight: '1' }],
				'6xl': ['3.75rem', { lineHeight: '1' }],
				'7xl': ['4.5rem', { lineHeight: '1' }],
			},
		},
	},
	plugins: [],
}

