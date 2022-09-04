import { useEffect, Fragment } from 'react';
import Loader from '../Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductsAction } from '../../redux/actions/productAction';
import { clearErrorAction } from '../../redux/actions/appAction';
import './Products.css';
import ProductCard from '../Home/ProductCard';

const Products = () => {
    const dispatch = useDispatch();
    const { isLoading, error } = useSelector((state) => state.appState)
    const { products, productCount } = useSelector(state => state.productState);

    useEffect(() => {
        dispatch(getAllProductsAction())
    }, [dispatch]);


    return (
        <Fragment>
            {isLoading ? <Loader /> :
                <Fragment>
                    <h2 className="products-heading">Products</h2>
                    <div className="products">
                        {products && products.map(product => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                </Fragment>}
        </Fragment>
    );
}

export default Products;