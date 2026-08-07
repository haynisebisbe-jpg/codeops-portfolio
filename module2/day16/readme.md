# Day 16 In-Class Exercise: TeleBirr Tip & Split Calculator

## Requirements
1. Declare input variables for `bill` and `partySize`.
2. Ensure `bill` is converted to a number using `Number()`.
3. Add a tiered tip:
   - 10% tip if the bill is over 300 ETB.
   - 5% tip if the bill is 300 ETB or less.
4. Use a `switch` statement to handle payment service fees:
   - `'telebirr'`: 0.5% (0.005)
   - `'cbebirr'`: 1.0% (0.01)
   - default: 2.0% (0.02)
5. Calculate:
   - `tip` amount
   - `serviceFee` amount
   - `total` bill (bill + tip + serviceFee)
   - `perPerson` amount (total / partySize)
6. Output the formatted result using template literals to match `expected.txt`.

## Self-Check List
- [ ] Uses `const` by default and `let` where values change.
- [ ] Uses strict mode (`'use strict'`).
- [ ] Output matches `expected.txt` when run with Node.js.