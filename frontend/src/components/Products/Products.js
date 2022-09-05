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

const Products = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const dispatch = useDispatch();
    const alert = useAlert();
    const keyword = useParams().keyword;
    const { isLoading, error } = useSelector((state) => state.appState)
    const { products, productCount, productPerPage } = useSelector(state => state.productState);


    useEffect(() => {
        dispatch(getAllProductsAction(keyword, currentPage));
    }, [dispatch, keyword, error, alert, currentPage]);

    if (error) {
        alert.show(error.message);
        dispatch(clearErrorAction());
    }

    const handlePageChange = (e) => {
        setCurrentPage(e)
    }


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

                    <div className="products-footer">
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
                    </div>
                </Fragment>}
        </Fragment>
    );
}

export default Products;