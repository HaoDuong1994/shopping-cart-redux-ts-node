import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "./productSlice";

interface ICartItem extends IProduct {
  quantity: number;
}

interface ICartState {
  cartItem: ICartItem[];
}

const initialState: ICartState = {
  cartItem: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action: PayloadAction<ICartItem>) => {
      const newState = [...state.cartItem];
      const isItemExist = newState.find((item) => {
        return item._id === action.payload._id;
      });
      if (isItemExist) {
        isItemExist.quantity += 1;
      } else {
        state.cartItem.push(action.payload);
      }
    },
    deleteItem: (state, action: PayloadAction<string | number>) => {
      state.cartItem = state.cartItem.filter((item) => {
        return item._id != action.payload;
      });
    },
    increaseQuantity: (state, action: PayloadAction<string | number>) => {
      let currentItem = state.cartItem.find((item) => {
        return item._id === action.payload;
      });
      if (currentItem) {
        currentItem.quantity += 1;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<string | number>) => {
      let currentItem = state.cartItem.find((item) => {
        return item._id === action.payload;
      });
      if (currentItem && currentItem.quantity > 1) {
        currentItem.quantity -= 1;
      }
    },
  },
});
export const { addCart, deleteItem, increaseQuantity, decreaseQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
