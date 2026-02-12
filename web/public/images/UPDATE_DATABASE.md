# Image Path Updates - SQL Commands

Run these SQL commands in your Supabase SQL Editor to update all accommodation images:

```sql
-- Update Tiny Cabana
UPDATE stays 
SET image_url = '/images/accommodations/Cabanas/FB_IMG_1758901622842-2.jpg'
WHERE title = 'Tiny Cabana';

-- Update Cave Room
UPDATE stays 
SET image_url = '/images/accommodations/cave room/FB_IMG_1758163900988.jpg'
WHERE title = 'Cave Room';

-- Update RockHaven Tree House
UPDATE stays 
SET image_url = '/images/accommodations/tree house/FB_IMG_1758901778716.jpg'
WHERE title LIKE '%Tree House%' OR title LIKE '%Treehouse%' OR title = 'RockHaven Tree House';

-- Update Day Outing / Couple Dayout
UPDATE stays 
SET image_url = '/images/accommodations/nature pool/FB_IMG_1758901811732.jpg'
WHERE title LIKE '%Dayout%' OR title LIKE '%Day Outing%' OR title = 'Couple Dayout';
```

## Verify the Updates

After running the SQL, verify with:

```sql
SELECT title, image_url FROM stays ORDER BY title;
```

Expected results:
- Tiny Cabana → `/images/accommodations/Cabanas/FB_IMG_1758901622842-2.jpg`
- Cave Room → `/images/accommodations/cave room/FB_IMG_1758163900988.jpg`
- RockHaven Tree House → `/images/accommodations/tree house/FB_IMG_1758901778716.jpg`
- Couple Dayout → `/images/accommodations/nature pool/FB_IMG_1758901811732.jpg`
