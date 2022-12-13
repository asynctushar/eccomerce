import "./ProcessOrder.css";
import { Fragment, useEffect, useState } from "react";
import MetaData from "../../layout/MetaData";
import { Link, useParams } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import { useSelector, useDispatch } from "react-redux";
import { Button, Typography } from '@mui/material';
import { useAlert } from "react-alert";
import { AccountTree } from "@mui/icons-material";
import { clearUpdateOrderStatusAction, getSingleOrderAction, updateOrderAction } from '../../../redux/actions/orderAction';
import { clearErrorAction } from '../../../redux/actions/appAction';

const ProcessOrder = () => {
    const [status, setStatus] = useState("");
    const { order, updateOrderStatus } = useSelector((state) => state.orderState);
    const { error } = useSelector((state) => state.appState);
    const dispatch = useDispatch();
    const alert = useAlert();
    const { id } = useParams();

    useEffect(() => {
        if (updateOrderStatus) {
            alert.success('Order Updated Successfully.');
            dispatch(clearUpdateOrderStatusAction())
        }

        dispatch(getSingleOrderAction(id));
    }, [dispatch, id, updateOrderStatus]);

    if (error) {
        alert.error(error.response.data.message);
        dispatch(clearErrorAction());
    }

    const updateOrderSubmitHandler = (e) => {
        e.preventDefault();

        dispatch(updateOrderAction(status, id));
    }

    return (
        <Fragment>
            <MetaData title="Process Order -- Admin" />
            <div className="dashboard">
                <SideBar />
                <div className="processorder-container">

                    <div
                        className="order-details-page"
                    style={{
                        display: order.orderStatus === "Delivered" ? "block" : "grid",
                    }}
                    >
                        <div>
                            <div className="process-shipping-area">
                                <Typography>Shipping Info</Typography>
                                <div className="process-shipping-area-box">
                                    <div>
                                        <p>Name:</p>
                                        <span>{order.user && order.user.name}</span>
                                    </div>
                                    <div>
                                        <p>Phone:</p>
                                        <span>
                                            {order.shippingInfo && order.shippingInfo.phoneNo}
                                        </span>
                                    </div>
                                    <div>
                                        <p>Address:</p>
                                        <span>
                                            {order.shippingInfo &&
                                                `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                                        </span>
                                    </div>
                                </div>

                                <Typography>Payment</Typography>
                                <div className="process-shipping-area-box">
                                    <div>
                                        <p
                                            className={
                                                order.paymentInfo &&
                                                    order.paymentInfo.status === "succeeded"
                                                    ? "green-color"
                                                    : "red-color"
                                            }
                                        >
                                            {order.paymentInfo &&
                                                order.paymentInfo.status === "succeeded"
                                                ? "PAID"
                                                : "NOT PAID"}
                                        </p>
                                    </div>

                                    <div>
                                        <p>Amount:</p>
                                        <span>{order.totalPrice && order.totalPrice}</span>
                                    </div>
                                </div>

                                <Typography>Order Status</Typography>
                                <div className="process-shipping-area-box">
                                    <div>
                                        <p
                                            className={
                                                order.orderStatus && order.orderStatus === "Delivered"
                                                    ? "green-color"
                                                    : "red-color"
                                            }
                                        >
                                            {order.orderStatus && order.orderStatus}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="process-cart-items">
                                <Typography>Your Cart Items:</Typography>
                                <div className="process-cart-items-container">
                                    {order.orderItems &&
                                        order.orderItems.map((item) => (
                                            <div key={item.product}>
                                                <img src={item.image} alt="Product" />
                                                <Link to={`/product/${item.product}`}>
                                                    {item.name}
                                                </Link>{" "}
                                                <span>
                                                    {item.quantity} X ₹{item.price} ={" "}
                                                    <b>₹{item.price * item.quantity}</b>
                                                </span>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                        {/*  */}
                        <div
                            style={{
                                display: order.orderStatus === "Delivered" ? "none" : "block",
                            }}
                        >
                            <form
                                className="processorder-form"
                                onSubmit={updateOrderSubmitHandler}
                            >
                                <h1>Process Order</h1>

                                <div>
                                    <AccountTree />
                                    <select onChange={(e) => setStatus(e.target.value)} required>
                                        <option value="">Choose Status</option>
                                        {order.orderStatus === "Processing" && (
                                            <option value="Shipped">Shipped</option>
                                        )}

                                        {order.orderStatus === "Shipped" && (
                                            <option value="Delivered">Delivered</option>
                                        )}
                                    </select>
                                </div>

                                <Button
                                    className="processorder-btn"
                                    type="submit"
                                >
                                    Process Order
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default ProcessOrder;