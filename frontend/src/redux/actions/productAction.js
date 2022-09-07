import productSlice from "../slices/productSlice";
import appSlice from "../slices/appSlice";
import axios from 'axios';

const { getAllProducts, getProductDetails } = productSlice.actions;
const { setLoader, setError, } = appSlice.actions;

export const getAllProductsAction = (keyword = "", currentPage = 1, priceRange = [0, 100000], category, ratings) => async (dispatch) => {

    let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${priceRange[0]}&price[lte]=${priceRange[1]}`;

    if (category !== 'All') {
        link = link + `&category=${category}`;
    }

    if (ratings !== null) {
        link = link + `&ratings=${ratings}`;
    }

    try {
        dispatch(setLoader(true));
        const { data } = await axios.get(link);
        dispatch(getAllProducts(data));
        dispatch(setLoader(false))

    } catch (err) {
        dispatch(setError(err));
        dispatch(setLoader(false));
    }
}

export const getProductDetailsAction = (id) => async (dispatch) => {
    try {
        dispatch(setLoader(true));
        const { data } = await axios.get(`/api/v1/product/${id}`);
        dispatch(getProductDetails(data.product));
        dispatch(setLoader(false))
    } catch (err) {
        dispatch(setError(err));
        dispatch(setLoader());
    }
}