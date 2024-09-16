import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  _id: string;
  title: string;
  imageUrl: string;
  price: number;
  stockQuantity: number;
}

interface CartState {
  items: CartItem[];
  totalItem: number;
}

const initialState: CartState = {
  items: [],
  totalItem: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<CartItem>) => {
      const existingCartItem = state.items.find(
        (item) => item._id === action.payload._id
      );
      if (existingCartItem) {
        existingCartItem.stockQuantity += 1;
      } else {
        state.items.push({ ...action.payload, stockQuantity: 1 });
      }
      state.totalItem += 1;
    },
    removeItemFromCart: (state, action: PayloadAction<string>) => {
      const existingCartItem = state.items.find(
        (item) => item._id === action.payload
      );
      if (existingCartItem) {
        state.totalItem -= existingCartItem.stockQuantity;
        state.items = state.items.filter((item) => item._id !== action.payload);
      }
    },
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item._id === action.payload);
      if (item) {
        item.stockQuantity += 1;
        state.totalItem += 1;
      }
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item._id === action.payload);
      if (item && item.stockQuantity > 1) {
        item.stockQuantity -= 1;
        state.totalItem -= 1;
      } else if (item && item.stockQuantity === 1) {
        state.items = state.items.filter((i) => i._id !== action.payload);
        state.totalItem -= 1;
      }
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
