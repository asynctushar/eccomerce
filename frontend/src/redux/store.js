import { configureStore } from '@reduxjs/toolkit';
import productSlice from './slices/productSlice';
import appSlice from './slices/appSlice';
import userSlice from './slices/userSlice';

const reducer = {
    productState: productSlice.reducer,
    appState: appSlice.reducer,
    userState: userSlice.reducer
}

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
})

export default store;
