# Updates Needed

## 1. Testimonials - ✅ COMPLETED

- Added 6 testimonials to data/testimonials.json
- Updated about page to show all 6 testimonials in 2 rows (3 per row)

## 2. Remove Border Radius from Admin Panel

Need to remove all `rounded` classes from:

- app/admin/properties/page.tsx
- app/admin/agents/page.tsx
- app/admin/testimonials/page.tsx
- app/admin/hero/page.tsx
- app/admin/gallery/page.tsx (already done via terminal)
- app/admin/layout.tsx

## 3. Add Search/Filter to Admin Pages

Need to add search functionality to:

- Properties (search by title, location, type)
- Agents (search by name, role)
- Testimonials (search by name, role)
- Hero Slides (search by title)

## 4. Fix Acres Display

- Properties showing "sqft" but should show acres for land
- Need to check PropertyCard component and property display pages
