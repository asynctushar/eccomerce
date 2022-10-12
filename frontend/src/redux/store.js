import { configureStore } from '@reduxjs/toolkit';
import productSlice from './slices/productSlice';
import appSlice from './slices/appSlice';
import userSlice from './slices/userSlice';
import cartSlice from './slices/cartSlice';

const reducer = {
    productState: productSlice.reducer,
    appState: appSlice.reducer,
    userState: userSlice.reducer,
    cartState: cartSlice.reducer
}

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
})

export default store;
