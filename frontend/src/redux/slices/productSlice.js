import { createSlice , } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  productCount: 0
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
      updateProducts: (state, action) => {
        state.products = action.payload.products;
        state.productCount = action.payload.productCount;
        }
    }

});

export default productSlice;