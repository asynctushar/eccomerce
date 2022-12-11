import { Rating } from "@mui/material";

const ProductReview = ({ review }) => {

    const options = {
        size: "large",
        value: review.rating,
        readOnly: true,
        precision: 0.5,
    };
    
    return (
        <div className="review-card">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThye7oEv-5iseoJ1f5VaW-aIczCLBiFsHdooySGmQ&s" alt={"profilePic"} />
            <p>{review.name}</p>
            <Rating {...options} />
            <span>{review.comment}</span>
        </div>
    );
}

export default ProductReview;