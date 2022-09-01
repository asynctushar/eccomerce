import productSlice from "../slices/productSlice";
import appSlice from "../slices/appSlice";
import axios from 'axios';

const { getAllProducts, getProductDetails } = productSlice.actions;
const { setLoader, setError } = appSlice.actions;

export const getAllProductsAction = () => async (dispatch) => {
    try {
        const { data } = await axios.get('/api/v1/products');
        dispatch(getAllProducts(data));
        dispatch(setLoader(false))

    } catch (err) {
        dispatch(setError(err));
        dispatch(setLoader(false));
    }
}

export const getProductDetailsAction = (id) => async (dispatch) => {
    try {
        const {data} = await axios.get(`http://localhost:4000/api/v1/product/${id}`);
        dispatch(getProductDetails(data.product));
        dispatch(setLoader(false))
    } catch (err) {
        dispatch(setError(err));
        dispatch(setLoader(false));
    }
}