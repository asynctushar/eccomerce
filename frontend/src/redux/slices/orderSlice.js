import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    orders: [],
    order: {}
}

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        createNewOrder: (state, action) => {
            // state.orders.push(action.payload);
            console.log(action.payload)
        },
        getMyOrders: (state, action) => {
            state.orders = action.payload;
        },
        getSingleOrder: (state, action) => {
            state.order = action.payload;
        }
    }
});

export default orderSlice;