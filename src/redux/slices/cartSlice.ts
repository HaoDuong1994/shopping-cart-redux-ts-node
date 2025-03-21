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
      const isItemExist = state.cartItem.find((item) => {
        return item.id == action.payload.id;
      });
      if (isItemExist) {
        isItemExist.quantity += 1;
      } else {
        state.cartItem.push({ ...action.payload, quantity: 1 });
      }
    },
  },
});
