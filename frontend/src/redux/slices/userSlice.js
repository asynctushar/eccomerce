import { createSlice, } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    isAuthenticated: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user;
            state.isAuthenticated = action.payload.success;
        },
        register: (state, action) => {
            state.user = action.payload.user;
            state.isAuthenticated = action.payload.success;
        }
    }

});

export default userSlice;