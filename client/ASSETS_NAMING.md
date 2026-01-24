# Assets Naming Convention

This document describes the professional naming convention used for all assets in the Kattraan LMS project.

## Naming Rules

1. **Lowercase with hyphens**: All file names use lowercase letters and hyphens (kebab-case)
2. **Descriptive names**: Names clearly describe the asset's purpose
3. **Grouped by type**: Assets are organized into logical folders
4. **Consistent pattern**: Similar assets follow the same naming pattern

## Asset Structure

### Hero Section Assets
Located in: `src/assets/`

- `hero-background.png` - Main background image for hero section
- `hero-decoration-left.png` - Left decorative element
- `hero-decoration-right-top.png` - Top-right decorative element
- `hero-decoration-right-bottom.png` - Bottom-right decorative element

### Navigation Assets
Located in: `src/assets/`

- `logo.png` - Main logo image
- `nav-decoration.png` - Navigation decorative element

### Course Images
Located in: `src/assets/courses/`

- `course-midjourney-design.png` - Midjourney design course thumbnail
- `course-chatgpt-basics.png` - ChatGPT basics course thumbnail
- `course-web-design-ui-ux.png` - Web design UI/UX course thumbnail
- `course-business-analytics.png` - Business analytics course thumbnail
- `course-placeholder.png` - Placeholder course image

## Import Examples

### Hero Section
```javascript
import heroBackground from '../../assets/hero-background.png'
import heroDecorationLeft from '../../assets/hero-decoration-left.png'
import heroDecorationRightBottom from '../../assets/hero-decoration-right-bottom.png'
import heroDecorationRightTop from '../../assets/hero-decoration-right-top.png'
```

### Courses
```javascript
import courseMidjourneyDesign from '../../assets/courses/course-midjourney-design.png'
import courseChatGPTBasics from '../../assets/courses/course-chatgpt-basics.png'
import courseWebDesignUIUX from '../../assets/courses/course-web-design-ui-ux.png'
import courseBusinessAnalytics from '../../assets/courses/course-business-analytics.png'
```

### Logo
```javascript
import logo from '../../assets/logo.png'
```

## Benefits of This Naming Convention

1. **Clear and Self-Documenting**: File names explain their purpose
2. **Easy to Search**: Consistent naming makes files easy to find
3. **Professional**: Follows industry best practices
4. **Maintainable**: Easy to understand and modify
5. **Scalable**: Pattern can be extended for new assets

