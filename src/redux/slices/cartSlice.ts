import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "./productSlice";

//

interface ICartItem extends IProduct {
  quantity: number;
}

interface ICartState {
  cartItem: ICartItem[];
}
const localStorageCart = (): ICartItem[] => {
  const data = localStorage.getItem("cart");
  return data ? JSON.parse(data) : [];
};
const initialState: ICartState = {
  cartItem: localStorageCart(),
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action: PayloadAction<ICartItem>) => {
      let newState = [...state.cartItem];
      const isItemExist = newState.find((item) => {
        return item._id === action.payload._id;
      });
      if (isItemExist) {
        isItemExist.quantity += 1;
      } else {
        newState.push(action.payload);
      }
      state.cartItem = newState;
      console.log("after push", state.cartItem);
      localStorage.setItem("cart", JSON.stringify(newState));
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
      localStorage.setItem("cart", JSON.stringify(state.cartItem));
    },
    decreaseQuantity: (state, action: PayloadAction<string | number>) => {
      let currentItem = state.cartItem.find((item) => {
        return item._id === action.payload;
      });
      if (currentItem && currentItem.quantity > 1) {
        currentItem.quantity -= 1;
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItem));
    },
  },
});
export const { addCart, deleteItem, increaseQuantity, decreaseQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
