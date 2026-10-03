export function cartReducer(state, action) {
  switch (action.type) {
    case "add": {
      const existingItem = state.items.find(
        (item) => item.id === action.dish.id
      );

      let newItems;

      if (existingItem) {
        newItems = state.items.map((item) =>
          item.id === action.dish.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...state.items, { ...action.dish, quantity: 1 }];
      }

      const total = newItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      return {
        ...state,
        items: newItems,
        total,
      };
    }

    case "remove": {
      const newItems = state.items.filter(
        (item) => item.id !== action.id
      );

      const total = newItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      return {
        ...state,
        items: newItems,
        total,
      };
    }

    case "clear":
      return {
        items: [],
        total: 0,
      };

    default:
      throw new Error("Unknown action: " + action.type);
  }
}