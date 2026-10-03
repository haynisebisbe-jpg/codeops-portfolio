# Day 34 Performance Profile

## Measurement

I used React's built-in Profiler in development mode to measure rendering performance.

## Search Interaction — Before Optimization

When typing one letter into the menu search:

- DishList actual duration: 48.7 ms
- DishList base duration: 48.0 ms
- Many unchanged Dish components also rendered.

The search state changed in the Menu component, which caused the dish list and its unchanged Dish components to render again.

## Optimization

I wrapped the Dish component with `React.memo`.

`React.memo` allows a component to skip rendering when its props have not changed.

## Search Interaction — After Optimization

After using `React.memo`:

- DishList actual duration: 4.1 ms
- DishList base duration: 11.2 ms
- Unchanged Dish components no longer re-rendered.

## Result

The measured DishList update duration decreased from 48.7 ms to 4.1 ms.

This is approximately a 91.6% reduction in the measured development-mode update duration.

The purpose of the optimization was to prevent unchanged dish components from re-rendering when the Menu search state changes.

## Cart Measurement

When adding a dish:

- CartBadge updated because the cart count changed.
- DishList did not need to update.
- The individual unchanged Dish components did not need to update.

This confirmed that the cart update was localized appropriately.

## Important Note

These timings were measured in development mode. Development-mode timings can vary between runs, so they should be treated as measurements of this test rather than guaranteed production performance.

## Production Build

I ran:

```bash
npm run build
```
