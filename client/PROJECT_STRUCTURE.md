# Project Structure

## Kattraan LMS - Professional Folder Architecture

```
lms/
├── assets/                          # Original assets (root level)
│   ├── hero-background.png
│   ├── hero-decoration-left.png
│   ├── hero-decoration-right-bottom.png
│   ├── hero-decoration-right-top.png
│   ├── logo.png
│   ├── nav-decoration.png
│   └── courses/
│       ├── course-midjourney-design.png
│       ├── course-chatgpt-basics.png
│       ├── course-web-design-ui-ux.png
│       ├── course-business-analytics.png
│       └── course-placeholder.png
│
├── src/                             # Source code
│   ├── assets/                      # Assets used in the application
│   │   ├── hero-background.png
│   │   ├── hero-decoration-left.png
│   │   ├── hero-decoration-right-bottom.png
│   │   ├── hero-decoration-right-top.png
│   │   ├── logo.png
│   │   ├── nav-decoration.png
│   │   └── courses/
│   │       ├── course-midjourney-design.png
│   │       ├── course-chatgpt-basics.png
│   │       ├── course-web-design-ui-ux.png
│   │       ├── course-business-analytics.png
│   │       └── course-placeholder.png
│   │
│   ├── components/                  # React components
│   │   ├── common/                  # Reusable/common components
│   │   │   └── .gitkeep
│   │   ├── layout/                  # Layout components
│   │   │   └── Navbar.jsx          # Navigation bar component
│   │   └── sections/                # Page sections
│   │       ├── HeroSection.jsx      # Hero section component
│   │       └── TrendingCourses.jsx  # Trending courses section
│   │
│   ├── pages/                       # Page components
│   │   └── LandingPage.jsx         # Main landing page
│   │
│   ├── hooks/                       # Custom React hooks
│   │   └── useWindowSize.js        # Window size hook
│   │
│   ├── utils/                       # Utility functions
│   │   ├── constants.js            # App constants
│   │   └── index.js                # Utility functions
│   │
│   ├── styles/                      # Additional stylesheets
│   │   └── .gitkeep
│   │
│   ├── App.jsx                      # Main App component
│   ├── main.jsx                     # Application entry point
│   └── index.css                    # Global styles
│
├── .eslintrc.cjs                    # ESLint configuration
├── .gitignore                       # Git ignore rules
├── index.html                       # HTML template
├── package.json                     # Project dependencies
├── postcss.config.js                # PostCSS configuration
├── tailwind.config.js               # Tailwind CSS configuration
├── vite.config.js                   # Vite configuration
├── PROJECT_STRUCTURE.md             # This file
└── README.md                        # Project documentation
```

## Component Organization

### Layout Components (`components/layout/`)
- **Navbar.jsx**: Fixed navigation bar with logo, menu items, and search functionality
  - Responsive design (mobile menu toggle)
  - Smooth animations
  - Dropdown support

### Section Components (`components/sections/`)
- **HeroSection.jsx**: Main hero section with:
  - Gradient background
  - Banner text
  - Main heading
  - Subtitle
  - CTA button
  - Decorative elements with animations
  
- **TrendingCourses.jsx**: Courses showcase section
  - Grid layout (responsive)
  - Course cards with hover effects
  - View all button

### Pages (`pages/`)
- **LandingPage.jsx**: Combines all sections into a complete landing page

## Features Implemented

✅ **Professional Folder Structure**
- Organized by feature/type
- Scalable architecture
- Clear separation of concerns

✅ **Responsive Design**
- Mobile (< 640px)
- Tablet (640px - 1024px)
- Desktop (1024px - 1280px)
- Large Desktop (> 1280px)

✅ **Animations**
- Framer Motion for smooth transitions
- Hover effects
- Scroll-triggered animations
- Floating decorative elements

✅ **Modern Styling**
- Tailwind CSS utility classes
- Custom gradient backgrounds
- Glow effects
- Dark theme

✅ **Accessibility**
- Semantic HTML
- Proper alt tags for images
- Keyboard navigation support

## Future Enhancements

- Add more sections (Features, Testimonials, Footer)
- Implement routing (React Router)
- Add course detail pages
- Implement authentication
- Add search functionality
- Create reusable Button, Card components
- Add loading states
- Implement API integration

