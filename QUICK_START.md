# Quick Start Guide

## Installation & Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   - Navigate to `http://localhost:5173`
   - The landing page should be visible with all animations and responsive design

## Project Overview

This is a modern LMS (Learning Management System) landing page built with:

- **React 18** - Latest React features
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icons

## What's Included

✅ Professional folder structure
✅ Responsive navigation bar
✅ Hero section with gradient background
✅ Trending courses showcase
✅ Mobile-friendly design
✅ Smooth animations and transitions
✅ Dark theme with gradient effects

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Customization

### Colors
Edit `tailwind.config.js` to customize colors:
```javascript
colors: {
  primary: {
    dark: '#0a0a0a',
    green: '#0d1f14',
    purple: '#8b5cf6',
    pink: '#ec4899',
  },
}
```

### Fonts
The Satoshi font is already configured via Google Fonts in `index.html`. To use a local font, update the font imports.

### Breakpoints
Responsive breakpoints are configured in `tailwind.config.js`:
- xs: 475px
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1536px

## File Structure Highlights

```
src/
├── components/
│   ├── layout/          # Navigation and layout components
│   └── sections/        # Page sections (Hero, Courses, etc.)
├── pages/               # Full page components
├── assets/              # Images and static assets
├── hooks/               # Custom React hooks
└── utils/               # Helper functions and constants
```

## Next Steps

1. Add more sections (Features, Testimonials, Footer)
2. Implement routing for course pages
3. Add authentication
4. Connect to backend API
5. Add course filtering and search

For detailed project structure, see `PROJECT_STRUCTURE.md`

