# Market Sniper Shopify Theme

## Overview

Clean, maintainable Shopify theme with zero inline CSS/JS. All styles and scripts are externalized into organized asset files following best practices.

**Core Principles:**
- No inline `<style>` or `<script>` tags in sections/templates
- Clean, descriptive asset naming
- Single consolidated theme stylesheet
- Predictable load order
- Modular JavaScript architecture

## File Structure

```
layout/
  theme.liquid              # Main layout; renders header/footer sections, loads assets

sections/
  header.liquid             # Navigation markup only
  footer.liquid             # Footer markup only
  hero.liquid               # Hero section
  features.liquid           # Features grid
  indicators.liquid         # Indicators showcase
  pricing.liquid            # Pricing cards
  trading-bot.liquid        # Trading bot section
  what-you-get.liquid       # Benefits section
  testimonials.liquid       # Testimonials slider
  contact-form.liquid       # Contact form
  faq.liquid                # FAQ accordion
  (other sections...)       # All markup-only

assets/
  CSS:
    reset.css               # Modern CSS reset
    theme.css               # Consolidated: variables, layout, components, all section styles
    header.css              # Header/navbar specific styles
    footer.css              # Footer specific styles
    animations.css          # Animation keyframes

  JavaScript:
    utils.js                # Utility functions: throttle, debounce, smoothScroll
    animations.js           # Scroll animations, parallax, stat counters, background alternation
    main.js                 # Site-wide: mobile menu, smooth scroll, FAQ, navbar, CTA interactions
    header.js               # Header/mobile menu navigation logic
    testimonials.js         # Testimonials slider functionality
    cart.js                 # Cart page: remove items, TradingView validation, notifications
    product.js              # Product page: plan switcher, add to cart
    auth.js                 # Login/register form toggle
    faq.js                  # FAQ accordion (standalone)
    subscription-handler.js # Shopify cart/subscription integration

  Media:
    *.jpg, *.mp4            # Product images, videos, logo
```

## Asset Load Order

**CSS** (loaded in `<head>` via `layout/theme.liquid`):
1. `reset.css` - Modern CSS reset
2. `theme.css` - Consolidated theme styles (variables, layout, components, sections)
3. `animations.css` - Animation keyframes
4. `header.css` - Header/navbar (loaded in `sections/header.liquid`)
5. `footer.css` - Footer (loaded in `sections/footer.liquid`)

**JS** (loaded before `</body>` with `defer`):
1. `utils.js` - Utility functions (throttle, debounce, etc.)
2. `animations.js` - Scroll animations, parallax, background alternation
3. `main.js` - Site-wide interactions
4. Section-specific: `header.js`, `testimonials.js`, `cart.js`, `product.js`, `auth.js` (loaded in their sections)

## Best Practices

### Sections & Templates
- **Zero inline CSS/JS**: All styles go in `assets/theme.css` or dedicated CSS files
- **Markup only**: Sections should only contain HTML/Liquid markup
- **Asset references**: Use `{{ 'filename.ext' | asset_url }}` for all images/scripts/styles
- **CSS variables**: Use vars from `theme.css` (e.g., `var(--primary)`, `var(--spacing-lg)`)

### Adding New Features
- **New component**: Add styles to `theme.css` under a clear comment banner
- **Section-specific styles**: Only if substantial (100+ lines); otherwise add to `theme.css`
- **New script**: Add to `main.js` if site-wide, or create `feature-name.js` if section-specific

### Asset Naming
Clean, descriptive names organized by purpose (Shopify requires flat `assets` folder):
- **Core CSS**: `reset.css`, `theme.css`, `animations.css`
- **Section CSS**: `header.css`, `footer.css`
- **Core JS**: `utils.js`, `animations.js`, `main.js`
- **Section JS**: `header.js`, `cart.js`, `product.js`, `auth.js`, `testimonials.js`
- **Feature JS**: `faq.js`, `subscription-handler.js`
- **Media**: `logo.jpg`, `sharp-shooter-candles.jpg`, `*.mp4`

## Utility Classes

Available in `theme.css` for templates/content pages:
- `hero-compact` - Shorter hero (60vh instead of 100vh)
- `features-soft-bg` - Subtle background tint
- `note-card` - Vertical spacing for info cards
- `list-unstyled` - Remove bullets and padding
- `mb-3`, `mt-4`, `mt-16` - Margin utilities
- `link-primary` - Primary colored links
- `max-w-800` - Max width 800px with auto margins
- `page-content` - Standard page padding (6rem vertical)

## Development Notes

- **No duplication**: Removed old `variables.css`, `layout.css`, `components.css` (merged into `theme.css`)
- **Consistent z-index**: Use CSS variables (`--z-fixed`, `--z-modal`, etc.)
- **Mobile-first**: Responsive breakpoints at 640px, 768px, 968px, 1024px
- **Performance**: Scripts use `defer`, animations use `will-change` sparingly
- **Clean naming**: Descriptive filenames organize assets clearly

## Reorganization Impact

**Before:**
- 3 separate CSS files (variables, layout, components) with duplication
- 5,482 lines of inline `<style>` and `<script>` across 29 files
- Hard to maintain: change button style in 12+ places
- Sections ranged from 150-600 lines each with embedded styles

**After:**
- 1 consolidated `theme.css` (all variables + layout + components + sections)
- Zero inline CSS/JS - all externalized to asset files
- Easy maintenance: change component once, affects everywhere
- Sections average 50-150 lines of clean markup
- 15 organized CSS/JS assets (5 CSS, 10 JS)

**Net Result:** Removed 5,360 lines of duplicated/inline code ✨


