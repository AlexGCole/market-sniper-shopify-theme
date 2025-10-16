# Features Page Setup Instructions

## Issue
The features page isn't showing content other than header and footer.

## Most Likely Cause
The "Features" page either doesn't exist in Shopify or isn't assigned to use the correct template.

## Solution Steps

### 1. Check if the page exists
1. Log into your Shopify Admin
2. Go to **Online Store > Pages**
3. Look for a page called "Features" (or with handle "features")

### 2. If the page doesn't exist, create it:
1. Click "Add page"
2. Title: **Features**
3. Content: Leave blank or add placeholder text
4. On the right sidebar, under "Theme template", select **page.features**
5. Click "Save"

### 3. If the page exists but has no content:
1. Open the "Features" page
2. On the right sidebar, check the "Theme template" section
3. Make sure it's set to **page.features** (not just "page" or "Default page")
4. Click "Save"

### 4. View the page
- Navigate to: `https://your-store.myshopify.com/pages/features`
- Or click the "View page" button in Shopify Admin

## Template File Details
- Template: `templates/page.features.json`
- Sections used:
  - `hero` - Hero section with title and CTA
  - `trading-bot` - Bot features grid
  - `indicators` - Indicators showcase
  - `what-you-get` - Benefits section

## If it still doesn't work

Check for Liquid errors:
1. In Shopify Admin, go to **Online Store > Themes**
2. Click **Customize** on your active theme
3. Use the template selector to view the "Features" page
4. Check the browser console (F12) for any JavaScript errors
5. Check if sections are rendering but hidden (use browser inspector)

## Alternative: Preview with Shopify CLI

```bash
shopify theme dev
```

Then navigate to `/pages/features` in the preview URL.

