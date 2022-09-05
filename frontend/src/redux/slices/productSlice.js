import { createSlice, } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  productCount: 0,
  product: {},
  productPerPage: 5
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    getAllProducts: (state, action) => {
      state.products = action.payload.products;
      state.productCount = action.payload.productCount;
      state.productPerPage = action.payload.resultPerPage
    },
    getProductDetails: (state, action) => {
      state.product = action.payload
    }
  }

});

export default productSlice;