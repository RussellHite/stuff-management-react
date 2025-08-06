# App Assets

This directory contains placeholder assets for the Stuff Happens app.

## Required Assets:

### Icons:
- **icon.png**: 1024x1024px - Main app icon
- **adaptive-icon.png**: 1024x1024px - Android adaptive icon (foreground)
- **favicon.png**: 48x48px - Web favicon

### Splash Screen:
- **splash.png**: 1284x2778px - Splash screen image (should work for most devices)

## Design Guidelines:

- **Primary Color**: #c8e6c9 (Light green)
- **Accent Color**: #095673 (Dark teal)
- **Icon Style**: Simple, clean lines representing inventory/list concept

## Generating Final Assets:

You can use the provided `icon.svg` as a base to generate PNG files using:
- Online converters like CloudConvert or Convertio
- Design tools like Figma, Sketch, or Adobe XD
- Command line tools like ImageMagick:
  ```bash
  convert -density 300 icon.svg -resize 1024x1024 icon.png
  ```

For now, the app will work with placeholder assets. Replace these with your final designs before production build.