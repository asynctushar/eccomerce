import './Products.css';
import { useEffect, Fragment, useState } from 'react';
import Loader from '../Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductsAction } from '../../redux/actions/productAction';
import { clearErrorAction } from '../../redux/actions/appAction';
import ProductCard from './ProductCard';
import { useParams } from 'react-router-dom';
import { useAlert } from 'react-alert';
import Pagination from 'react-js-pagination';
import { Slider, Typography, Rating } from '@mui/material';

const categoryList = ['All', 'Laptop', 'PC', 'Mobile', 'Accessories', 'Games', 'Others'];

const Products = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [priceRange, setPriceRange] = useState([0, 200000]);
    const [category, setCategory] = useState('All');
    const [rating, setRating] = useState(null);

    const dispatch = useDispatch();
    const alert = useAlert();
    const keyword = useParams().keyword;
    const { isLoading, error } = useSelector((state) => state.appState)
    const { products, productCount, productPerPage, filteredProductCount } = useSelector(state => state.productState);


    useEffect(() => {
        dispatch(getAllProductsAction(keyword, currentPage, priceRange, category, rating));
    }, [dispatch, keyword, alert, currentPage, priceRange, category, rating]);

    if (error) {
        alert.show(error.message);
        dispatch(clearErrorAction());
    }

    const handlePageChange = (e) => {
        setCurrentPage(e)
    }

    const priceRangeHandler = (e, price) => {
        setPriceRange(price);
    }


    return (
        <Fragment>
            <h2 className="products-heading">Products</h2>

            {isLoading ? <Loader /> :
                <Fragment>
                    <div className="products">
                        {products && products.map(product => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>

                    {productPerPage <= filteredProductCount && <div className="products-footer">
                        <Pagination
                            activePage={currentPage}
                            itemsCountPerPage={productPerPage}
                            totalItemsCount={productCount}
                            pageRangeDisplayed={5}
                            onChange={handlePageChange}
                            prevPageText="Prev"
                            nextPageText="Next"
                            firstPageText="First"
                            lastPageText="Last"
                            itemClass="page-item"
                            linkClass="page-link"
                            activeClass="pageItemActive"
                            activeLinkClass="pageLinkActive"
                        />
                    </div>}
                </Fragment>}

            <div className="price-filter">
                <Typography>Price:</Typography>
                <Slider
                    size="small"
                    min={0}
                    max={100000}
                    value={priceRange}
                    aria-labelledby="range-slider"
                    valueLabelDisplay="auto"
                    onChange={priceRangeHandler}
                />
            </div>
            <div className="category">
                <Typography>Category:</Typography>
                <ul className="categoryBox">
                    {categoryList.map((c) => (
                        <li key={c} className={category === c ? 'category-link active' : 'category-link'} onClick={() => {
                            setCategory(c);
                            setCurrentPage(1);
                        }} >{c}</li>
                    ))}
                </ul>
            </div>
            <div className="rating-filter">
                <Typography component="legend">Rating:</Typography>
                <Rating
                    className="ratings"
                    name="simple-controlled"
                    value={rating}
                    onChange={(event, newValue) => {
                        setRating(newValue);
                    }}
                />
            </div>
        </Fragment>
    );
}

export default Products;