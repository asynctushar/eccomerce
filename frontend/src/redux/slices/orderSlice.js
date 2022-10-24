import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    orders: []
}

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        createNewOrder: (state, action) => {
            state.orders.push(action.payload);
        }
    }
});

export default orderSlice;