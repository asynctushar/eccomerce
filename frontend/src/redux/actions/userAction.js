import userSlice from "../slices/userSlice";
import appSlice from "../slices/appSlice";
import axios from 'axios';

const { login, register } = userSlice.actions;
const { setLoader, setError, } = appSlice.actions;

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

