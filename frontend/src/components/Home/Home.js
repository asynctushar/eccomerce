import './Home.css';
import { CgMouse } from 'react-icons/cg';
import { Fragment } from 'react';
import Product from './Product';

const product = {
    name: "Blue T-Shirt",
    price: "350 Taka",
    _id: "1",
    image: [{ url: "https://i.ibb.co/DRST11n/1.webp" }]
}

const Home = () => {
    return (
        <Fragment>

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
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
            </div>
        </Fragment>
    );
}

export default Home;