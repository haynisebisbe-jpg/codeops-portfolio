# PERF.md — Addis Eats Performance Budget

## 1. Performance targets

| Metric | Target |
|---|---:|
| Largest Contentful Paint (LCP) | Under 2.5 seconds |
| Cumulative Layout Shift (CLS) | Under 0.1 |
| First Load JS for `/menu` | Under 120 kB |
| Largest image | Under 150 kB |
| Lighthouse Performance score | 90 or higher |

These are target budgets, not confirmed measurements.

## 2. Rendering strategy

- `/`: Static landing page where appropriate.
- `/menu`: Incremental Static Regeneration with a 3600-second revalidation interval.
- `/menu/[id]`: Static generation using `generateStaticParams`.
- `/cart`: Client-side cart interactions.
- `/checkout`: Dynamic server rendering and server-side validation.
- `/orders` and `/kitchen`: Dynamic pages requiring authenticated session data.

## 3. Optimization approach

- Use Next.js image optimization where appropriate.
- Compress and resize food images.
- Prefer modern image formats when supported.
- Avoid unnecessary client components.
- Keep client-side JavaScript small.
- Use server components for content that does not require browser interaction.
- Use loading and error boundaries where appropriate.
- Avoid layout shifts by reserving image dimensions.
- Keep API responses small and avoid unnecessary requests.

## 4. Measurement procedure

1. Run `npm run build`.
2. Run `npm run start` to test the production build.
3. Open the application in Chrome.
4. Open Developer Tools and run Lighthouse on the menu page.
5. Record LCP, CLS, Performance score, and image sizes.
6. Measure the `/menu` JavaScript bundle using the production build output.
7. Compare measured results with the targets above.

## 5. Current status

The production build completed successfully. The project includes static menu generation and a one-hour revalidation interval.

The performance targets have not yet been verified with Lighthouse or bundle-size measurements. Record actual results here after testing; do not mark a target as passed without measurement.

## 6. Follow-up improvements

- Optimize the largest food images.
- Review client bundle size for `/menu`.
- Run Lighthouse against the production server.
- Investigate Edge Runtime deprecation and static-generation warnings.
- Repeat measurements after performance changes.
