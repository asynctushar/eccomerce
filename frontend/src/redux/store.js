import { configureStore } from '@reduxjs/toolkit';
import productSlice from './slices/productSlice';
import appSlice from './slices/appSlice';

const reducer = {
    productState: productSlice.reducer,
    appState: appSlice.reducer
}

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
})

export default store;
