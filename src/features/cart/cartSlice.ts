import { cart as CartState } from '../../types/order';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialState = {
  cart: CartState[];
};

const initialState: initialState = {
  cart: [
    {
      name: 'PIZZA',
      pizzaId: 12,
      quantity: 2,
      totalPrice: 32,
      unitPrice: 16,
    },
  ],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state: initialState, action: PayloadAction<CartState>) {
      // added a new pizza to order lists, it should be a pizza item in action
      state.cart.push(action.payload);
    },
    deleteItem(state: initialState, action: PayloadAction<number>) {
      // deleting a pizza from list needs that pizza id, and it's the action
      // we should delete exactly that id from list (using filter method)
      state.cart.filter((item: CartState) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state: initialState, action: PayloadAction<number>) {
      // For increasing special pizza we want it, we should have the id of that
      // find that pizza in cart and increase that's quantity and
      // absolutely increasing total price per quantity and unit of price
      const item = state.cart.find(
        (item: CartState) => item.pizzaId === action.payload
      );
      if (item) {
        item.quantity++;
        item.totalPrice = item.quantity * item.unitPrice;
      }
    },
    decreaseItemQuantity(state: initialState, action: PayloadAction<number>) {
      // Like increasing BUT in Opposite way
      const item = state.cart.find(
        (item: CartState) => item.pizzaId === action.payload
      );
      if (item && item.quantity > 1) {
        item.quantity--;
        item.totalPrice = item.quantity * item.unitPrice;
      }
    },
    clearCart(state: initialState) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
