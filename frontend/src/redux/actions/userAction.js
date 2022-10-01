import userSlice from "../slices/userSlice";
import appSlice from "../slices/appSlice";
import axios from 'axios';

const { login, register, updateUser, updatePassword, resetUpdateStatus } = userSlice.actions;
const { setLoader, setError, } = appSlice.actions;

// Login User
export const loginAction = (email, password) => async (dispatch) => {
    try {
        dispatch(setLoader(true));
        const { data } = await axios.post('/api/v1/login', { email, password });
        dispatch(login(data));
        dispatch(setLoader(false))

    } catch (err) {
        dispatch(setError(err));
        dispatch(setLoader(false));
    }
}

// Register User
export const registerAction = (userInfo) => async (dispatch) => {
    try {
        dispatch(setLoader(true));
        const { data } = await axios.post('/api/v1/register', userInfo, { headers: { "Content-Type": "application/json" } });
        dispatch(register(data));
        dispatch(setLoader(false));

    } catch (err) {
        dispatch(setError(err));
        dispatch(setLoader(false));
    }
}

// Load user from cookies
export const loadUserAction = () => async (dispatch) => {
    try {
        dispatch(setLoader(true));
        const { data } = await axios.get('/api/v1/me');
        dispatch(login(data));
        dispatch(setLoader(false));

    } catch (err) {
        dispatch(setError(err));
        dispatch(setLoader(false));
    }
}

// LogOut User
export const logoutUserAction = () => async (dispatch) => {
    try {
        dispatch(setLoader(true));
        await axios.get('/api/v1/logout');
        dispatch(login({ user: null, isAuthenticated: false }));
        dispatch(setLoader(false));

    } catch (err) {
        dispatch(setError(err));
        dispatch(setLoader(false));
    }
}

// Update User
export const updateUserAction = (userData) => async (dispatch) => {
    try {
        dispatch(setLoader(true));
        const { data } = await axios.put('/api/v1/me/update', userData, { headers: { "Content-Type": "application/json" } });
        dispatch(updateUser(data));
        dispatch(setLoader(false));

    } catch (err) {
        dispatch(setError(err));
        dispatch(setLoader(false));
    }
}
// Update Passord
export const updatePasswordAction = (passwords) => async (dispatch) => {
    try {
        dispatch(setLoader(true));
        const { data } = await axios.put('/api/v1/password/update', passwords, { headers: { "Content-Type": "application/json" } });
        dispatch(updatePassword(data));
        dispatch(setLoader(false));

    } catch (err) {
        dispatch(setError(err));
        dispatch(setLoader(false));
    }
}

// reset update status while browsing into account page
export const resetUpdateStatusAction = () => dispatch => {
    dispatch(resetUpdateStatus());
}
