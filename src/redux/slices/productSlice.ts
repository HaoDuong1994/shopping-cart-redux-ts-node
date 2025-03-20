import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
interface IProduct {
  id: number;
  productCode: string;
  buyPrice: number;
  description: string;
  img: string;
  productType: "backpack" | "pant" | "shoes" | "shirt" | "racket";
  imgDetail: { url: string }[];
}

interface IInitialValue {
  products: IProduct[];
  loading: boolean;
  error: string | null;
}

const initialState: IInitialValue = {
  products: [],
  loading: false,
  error: null,
};

const API_URL = "http://localhost:3000/product";

export const fetchProducts = createAsyncThunk<IProduct[]>(
  "products/fetchProducts",
  async () => {
    const response = await axios.get(API_URL);
    return response.data;
  }
);
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
        state.error = "Error loading products";
      });
  },
});
export default productSlice.reducer;
