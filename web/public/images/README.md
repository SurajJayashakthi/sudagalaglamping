# Image Placement Guide

I've created the following folder structure for your images:

## Folder Structure

```
public/
└── images/
    ├── accommodations/    # For cabana, cave, treehouse images
    ├── hero/              # For main hero section background
    ├── about/             # For the About Us section image
    └── facilities/        # For facility-related images
```

## Images You Need to Add

### 1. Hero Section
**Folder**: `public/images/hero/`
- **File name**: `hero-main.jpg` or `hero-main.webp`
- **Description**: Main jungle/treehouse background image
- **Recommended size**: 1920x1080 or larger

### 2. About Us Section
**Folder**: `public/images/about/`
- **File name**: `jungle-canopy.jpg` or `nature-experience.jpg`
- **Description**: Jungle canopy or cabana image
- **Recommended size**: 1200x1600 (portrait orientation)

### 3. Accommodations
**Folder**: `public/images/accommodations/`
Add images for each accommodation type:
- `tiny-cabana.jpg` - Tiny Cabana exterior/interior
- `cave-room.jpg` - Cave Room with stone walls
- `treehouse.jpg` - RockHaven Tree House
- `day-outing.jpg` - Day outing setup

**Recommended size**: 1200x900 (landscape)

### 4. Facilities (Optional)
**Folder**: `public/images/facilities/`
- `spring-pool.jpg` - Natural spring pool
- `bbq-area.jpg` - BBQ setup area
- `nature-trail.jpg` - Jungle trail

## After You Add the Images

Once you've added the images to these folders, let me know and I'll:
1. Update the code to use local images instead of Supabase URLs
2. Add proper Next.js Image optimization
3. Ensure all paths are correct

## Current Image References

Right now, the site is using these Supabase URLs as placeholders:
- Hero: `accommodations/treehouse.jpg`
- About: `accommodations/explore.jpg`
- Accommodations: Various from Supabase storage

These will be replaced with your local images once you add them.
