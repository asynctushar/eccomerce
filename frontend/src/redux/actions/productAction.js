import productSlice from "../slices/productSlice";
import appSlice from "../slices/appSlice";
import axios from 'axios';

const { updateProducts } = productSlice.actions;
const { setLoader, setError } = appSlice.actions;

export const updateProductsAction = () => async (dispatch) => {
    try {
        const { data } = await axios.get('/api/v1/products');
        dispatch(updateProducts(data));
        dispatch(setLoader(false))

    } catch (err) {
        dispatch(setError(err));
        dispatch(setLoader(false));
    }
}