import ReactStars from "react-rating-stars-component";

const ProductReview = ({ review }) => {
    const options = {
        key: review.rating,
        edit: false,
        color: "rgba(20, 20, 20, .1)",
        activeColor: 'tomato',
        size: window.innerWidth < 600 ? 20 : 25,
        value: review.rating,
        isHalf: true
    }

    return (
        <div className="review-card">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThye7oEv-5iseoJ1f5VaW-aIczCLBiFsHdooySGmQ&s" alt={"profilePic"} />
            <p>{review.name}</p>
            <ReactStars {...options} />
            <span>{review.comment}</span>
        </div>
    );
}

export default ProductReview;