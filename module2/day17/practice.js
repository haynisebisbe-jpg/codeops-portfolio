function calculate(a,b,operation){
    return operation(a,b);
}
function add(a,b){
    return a+b;
}
function subtract(a,b){
    return a-b;
}
console.log(calculate(10,5,add));
console.log(calculate(10,5,subtract));