
# Day 43 — Performance and Environment

## Optimizations completed

- Replaced standard HTML image elements with Next.js `Image`.
- Added image width, height, and responsive `sizes` attributes.
- Configured the Inter font using `next/font/google`.
- Set `display: "swap"` to help text appear while the font loads.
- Added `.env.example` with placeholder values only.
- Confirmed `.env*` is listed in `.gitignore`.

## Third-party scripts

No third-party script usage was found in the `app` directory during the source search.

## Production build

- Command: `npm run build`
- Result: Passed.
- The menu is configured for revalidation every hour.

## Lighthouse measurements

- Device: Mobile
- Browser: Chrome
- Environment: Local production build
- IndexedDB warning: Lighthouse reported that stored browser data might affect the measurement.
- Performance score: Not recorded
- LCP: Not recorded
- CLS: Not recorded
- INP: Not recorded

Measurements are not recorded because a clean, reliable Lighthouse result was not obtained. No performance numbers have been estimated or invented.

## Follow-up

Run Lighthouse again after resolving the IndexedDB warning and record the actual Performance score, LCP, CLS, and INP values.
