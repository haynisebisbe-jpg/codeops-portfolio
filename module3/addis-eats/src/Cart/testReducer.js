import { cartReducer } from "./cartReducer";

const initialState = {
  items: [],
  total: 0,
};

const dish = {
  id: 1,
  name: "Shiro",
  price: 120,
};

console.log("Initial:", initialState);

const addedState = cartReducer(initialState, {
  type: "add",
  dish: dish,
});

console.log("After add:", addedState);

const removedState = cartReducer(addedState, {
  type: "remove",
  id: 1,
});

console.log("After remove:", removedState);

const clearedState = cartReducer(addedState, {
  type: "clear",
});

console.log("After clear:", clearedState);