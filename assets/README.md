# Assets Folder

This folder contains app icons and splash screens for Expo.

## Required Files

To make this app work with Expo Go, you need to add these image files:

1. **icon.png** - App icon (1024x1024 px)
2. **adaptive-icon.png** - Android adaptive icon (1024x1024 px)
3. **splash.png** - Splash screen (1284x2778 px for iPhone)
4. **favicon.png** - Web favicon (48x48 px or larger)

## Quick Solution

You can generate these assets automatically using:

```bash
npx expo prebuild --clean
```

Or download placeholder images from:
- https://placeholder.com/1024x1024
- https://via.placeholder.com/1024

## Temporary Workaround

For testing purposes, you can remove the icon/splash references from app.json temporarily.
