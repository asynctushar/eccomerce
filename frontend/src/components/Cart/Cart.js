import './Cart.css';
import { Fragment } from 'react';
import CartItemCard from './CartItemCard/CartItemCard';
import { useSelector, useDispatch } from 'react-redux';
import { addCartItemAction, removeCartItemAction } from '../../redux/actions/cartAction';

const Cart = () => {
    const { cartItems } = useSelector(state => state.cartState);
    const dispatch = useDispatch();

    const increaseQuantity = (id, quantity, stock) => {
        const newQuantity = quantity + 1;
        if (newQuantity >= stock) return;

        dispatch(addCartItemAction(newQuantity, id));
    }

    const decreaseQuantity = (id, quantity) => {
        const newQuantity = quantity - 1;
        if (newQuantity <= 0) return;

        dispatch(addCartItemAction(newQuantity, id));
    }

    const deleteCartItem = (id) => {
        dispatch(removeCartItemAction(id));
    }

    return (
        <Fragment>
            {cartItems.length <= 0 ? "cart item not exist" :
                <Fragment >
                    <div className="cart">
                        <div className="cart-header">
                            <p>Product</p>
                            <p>Quantity</p>
                            <p>Subtotal</p>
                        </div>

                        {cartItems && cartItems.map(item => (
                            <div className="cart-container" key={item.product}>
                                <CartItemCard item={item} deleteCartItem={deleteCartItem} />
                                <div className="cart-input">
                                    <button onClick={() => decreaseQuantity(item.product, item.quantity)}>-</button>
                                    <input type="number" value={item.quantity} readOnly />
                                    <button onClick={() => increaseQuantity(item.product, item.quantity, item.stock)}>+</button>
                                </div>
                                <p className="cart-subtotal">{`${item.price * item.quantity} taka`}</p>
                            </div>
                        ))}
                        <div className="cart-gross-profit">
                            <div></div>
                            <div className="cart-gross-profitbox">
                                <p>Gross Total</p>
                                <p>{`${cartItems.reduce((acc, item) => {
                                    return acc + item.price * item.quantity
                                }, 0)
                                    } taka`}</p>
                            </div>
                            <div></div>
                            <div className="checkout-btn">
                                <button>Check Out</button>
                            </div>
                        </div>
                    </div>
                </Fragment>
            }
        </Fragment>
    );
}

export default Cart;