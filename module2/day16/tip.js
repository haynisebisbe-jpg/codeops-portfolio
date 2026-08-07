'use strict';
const billRaw = "480";
const bill = Number(billRaw);
const partySize = 4;
const paymentMethod = 'telebirr';
const tipRate = bill > 300 ? 0.10 : 0.05;
const tip = bill * tipRate;
let feeRate;
switch (paymentMethod) {
case 'telebirr':
    feeRate = 0.005;
    break;
case 'cbebirr':
    feeRate = 0.01;
    break;
default:
    feeRate = 0.02;
}
const serviceFee = bill * feeRate;
const total = bill + tip + serviceFee;
const perPerson = total / partySize;
console.log(`Subtotal: ${bill} ETB | Tip: ${tip} ETB | Fee: ${serviceFee} ETB`);
console.log(`Total: ${total} ETB, ${perPerson} ETB each for a party of ${partySize}.`);