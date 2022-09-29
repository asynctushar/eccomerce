import { createSlice, } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    isAuthenticated: false,
    isUpdated: null
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
        },
        updateUser: (state, action) => {
            state.user = action.payload.updatedUser;
            state.isUpdated = true;
        },
        resetUpdateStatus: (state, action) => {
            state.isUpdated = null;
        }
    }
});

export default userSlice;