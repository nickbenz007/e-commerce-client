import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ProductCardProps } from "../types";

interface ProductState {
  products: ProductCardProps[];
  selectedProduct: ProductCardProps | null;
}

const initialState: ProductState = {
  products: [],
  selectedProduct: null,
};

export const fetchProductById = createAsyncThunk<ProductCardProps, string>(
  "product/fetchProductById",
  async (_id: string) => {
    const response = await axios.get(
      `http://localhost:3001/api/v1/products/product/${_id}`
    );
    return response.data.product;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<ProductCardProps[]>) {
      state.products = action.payload;
    },
    setProductDetails(state, action: PayloadAction<ProductCardProps>) {
      state.selectedProduct = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      state.selectedProduct = action.payload;
    });
  },
});

export const { setProductDetails, setProducts } = productSlice.actions;
export default productSlice.reducer;
