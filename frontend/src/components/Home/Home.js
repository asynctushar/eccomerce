import './Home.css';
import { CgMouse } from 'react-icons/cg';
import { useEffect } from 'react';
import Helmet from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductsAction } from '../../redux/actions/productAction';
import { useAlert } from 'react-alert';
import Loader from '../Loader/Loader';
import { clearErrorAction } from '../../redux/actions/appAction';
import ProductCard from '../Products/ProductCard';

const Home = () => {
    const products = useSelector((state) => state.productState.products);
    const isLoading = useSelector((state) => state.appState.isLoading);
    const error = useSelector(state => state.appState.error);
    const dispatch = useDispatch()
    const alert = useAlert();

    useEffect(() => {
        dispatch(getAllProductsAction());
    }, [dispatch, alert]);

    if (error) {
        alert.show(error.message);
        dispatch(clearErrorAction());
    }

    return (
        <div>
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
            {isLoading ? <Loader /> :
                <div className="container" id="container">
                    {products && products.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            } 
        </div>
    );
}

export default Home;