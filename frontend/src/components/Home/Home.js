import './Home.css';
import { CgMouse } from 'react-icons/cg';
import { Fragment, useEffect } from 'react';
import Product from './Product';
import Helmet from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { updateProductsAction } from '../../redux/actions/productAction';
import Loader from '../Loader/Loader';

const Home = () => {
    const products = useSelector((state) => state.productState.products);
    const isLoading = useSelector((state) => state.appState.isLoading);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(updateProductsAction());
    }, [dispatch]);

    return (
        <Fragment>

            {isLoading  ? <Loader /> :
                <Fragment>
                    <Helmet title="Ecommerce" />

                    <div className="banner">
                        <p>Welcome to Ecommerce</p>
                        <h1>Find Amazing Products Below</h1>
                        <a href="#container">
                            <button>
                                Scroll <CgMouse />
                            </button>
                        </a>
                    </div>

                    <h2 className="homeHeading">Feature Products</h2>
                    <div className="container" id="container">
                        {products && products.map(product => (
                            <Product key={product._id} product={product} />
                        ))}
                    </div>
                </Fragment>
            }
        </Fragment>
    );
}

export default Home;