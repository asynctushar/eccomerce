import { createSlice, } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  productCount: 0,
  product: {}
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    getAllProducts: (state, action) => {
      state.products = action.payload.products;
      state.productCount = action.payload.productCount;
    },
    getProductDetails: (state, action) => {
      state.product = action.payload
    }
  }

});

export default productSlice;