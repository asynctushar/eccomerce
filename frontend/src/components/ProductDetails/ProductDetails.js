import './ProductDetails.css';
import { useSelector, useDispatch } from 'react-redux';
import { Fragment, useEffect } from 'react';
import { getProductDetailsAction } from '../../redux/actions/productAction';
import { useParams } from 'react-router';
import ReactStars from 'react-rating-stars-component';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ReviewCard from "./ReviewCard";
import Loader from '../Loader/Loader';
import { clearErrorAction } from '../../redux/actions/appAction';
import { useAlert } from 'react-alert';

const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const product = useSelector((state) => state.productState.product);
    const isLoading = useSelector((state) => state.appState.isLoading);
    const error = useSelector((state) => state.appState.error);
    const alert = useAlert();

    useEffect(() => {
        dispatch(getProductDetailsAction(id));
    }, [dispatch, id]);

    if (error) {
        alert.show(error.message);
        dispatch(clearErrorAction());
    }

    const options = {
        key: product.ratings,
        edit: false,
        color: "rgba(20, 20, 20, .1)",
        activeColor: 'tomato',
        size: window.innerWidth < 600 ? 20 : 25,
        value: product.ratings,
        isHalf: true
    }

    return (
        <Fragment >
            {isLoading ? <Loader /> : (
                <Fragment>
                    <div className="product-details">
                        <div className="images-block">
                            <Carousel autoPlay infiniteLoop>
                                {product.images && product.images.map((item, i) => (
                                    <img src={item.url} alt={i} key={i} className="product-image" />
                                ))}
                            </Carousel>
                        </div>
                        <div>
                            <div className="details-block-1">
                                <h2>{product.name}</h2>
                                <p>Product #{product._id}</p>
                            </div>
                            <div className="details-block-2">
                                <ReactStars {...options} />
                                <span>({product.noOfReviews} Reviews)</span>
                            </div>
                            <div className="details-block-3">
                                <h1>{`${product.price} taka`}</h1>
                                <div className="details-block-3-1">
                                    <div className="details-block-3-1-1">
                                        <button>-</button>
                                        <input type="number" disabled defaultValue={1} />
                                        <button>+</button>
                                    </div>
                                    {"  "}
                                    <button>Add to Cart</button>
                                </div>

                                <p className={product.stock < 1 ? "red-color" : "green-color"}>
                                    {product.stock < 1 ? "OutOfStock" : "InStock"}
                                </p>
                            </div>
                            <div className="details-block-4">
                                Description: <p>{product.description}</p>
                            </div>
                            <button className="submit-review">Submit Review</button>
                        </div>
                    </div>

                    <h3 className="reviews-heading"> Reviews </h3>

                    {product.reviews && product.reviews[0] ? (
                        <div className="reviews">
                            {product.reviews.map((review, i) => <ReviewCard key={i} review={review} />)}
                        </div>
                    ) : (
                        <p className="no-reviews">No Reviews Yet</p>
                    )}
                </Fragment>
            )}
        </Fragment>

    );
}

export default ProductDetails;