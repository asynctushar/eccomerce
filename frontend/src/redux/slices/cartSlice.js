import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCartItem: (state, action) => {
            const item = action.payload;
            const { cartItems } = current(state)

            const isItemExist = cartItems.find((i) => i.product === item.product);

            if (isItemExist) {
                state.cartItems = cartItems.map((i) => i.product === isItemExist.product ? item : i);

            } else {
                state.cartItems = [...cartItems, item];
            }
        },
        removeCartItem: (state, action) => {
        const {cartItems} = current(state);

            state.cartItems = cartItems.filter((i) => i.product !== action.payload);
        },

    }
});

export default cartSlice;