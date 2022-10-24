import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WebFont from 'webfontloader';
import { useEffect, useState } from 'react';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import Home from './components/Home/Home';
import ProductDetails from './components/ProductDetails/ProductDetails';
import { useDispatch, useSelector } from 'react-redux';
import Products from './components/Products/Products';
import Search from './components/Search/Search';
import Cart from './components/Cart/Cart';
import Shipping from './components/Shipping/Shipping.js';
import Auth from './components/Auth/Auth';
import Account from './components/Account/Account';
import { loadUserAction } from './redux/actions/userAction';
import ProtectedRoute from './components/route/ProtectedRoute';
import UpdateAccount from './components/Account/UpdateAccount/UpdateAccount';
import UpdatePassword from './components/Account/UpdatePassword/UpdatePassword';
import ForgotPassword from './components/Auth/ForgotPassword/ForgotPassword';
import ResetPassword from './components/Auth/ResetPassword/ResetPassword';
import ConfirmOrder from './components/Shipping/ConfirmOrder/ConfirmOrder';
import axios from 'axios';
import Payment from './components/Payment/Payment';
import OrderSuccess from './components/Payment/OrderSuccess';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';


const App = () => {
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state) => state.userState);
    const { isLoading } = useSelector((state) => state.appState);
    const [stripeApiKey, setStripeApiKey] = useState("");

    const getStripeApiKey = async () => {
        const { data } = await axios.get('/api/v1/stripeapikey');
        setStripeApiKey(data.stripeApiKey);
    }

    useEffect(() => {
        WebFont.load({
            google: {
                families: ['Roboto', 'Droid Sans', 'Droid Serif']
            }
        });

        dispatch(loadUserAction());
        getStripeApiKey();
    }, []);

    return (
        <Router>
            <div className="app">
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/:keyword" element={<Products />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/login" element={<Auth />} />
                    <Route path="/password/forgot" element={<ForgotPassword />} />
                    <Route path="/password/reset/:token" element={<ResetPassword />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/account" element={
                        <ProtectedRoute isAuthenticated={isAuthenticated} isLoading={isLoading}>
                            <Account />
                        </ProtectedRoute>} />
                    <Route path="/me/update" element={
                        <ProtectedRoute isAuthenticated={isAuthenticated} isLoading={isLoading}>
                            <UpdateAccount />
                        </ProtectedRoute>} />
                    <Route path="/password/update" element={
                        <ProtectedRoute isAuthenticated={isAuthenticated} isLoading={isLoading}>
                            <UpdatePassword />
                        </ProtectedRoute>} />
                    <Route path="/shipping" element={
                        <ProtectedRoute isAuthenticated={isAuthenticated} isLoading={isLoading}>
                            <Shipping />
                        </ProtectedRoute>} />
                    <Route path="/order/confirm" element={
                        <ProtectedRoute isAuthenticated={isAuthenticated} isLoading={isLoading}>
                            <ConfirmOrder />
                        </ProtectedRoute>} />
                    <Route path="/process/payment" element={
                        <ProtectedRoute isAuthenticated={isAuthenticated} isLoading={isLoading}>
                            {stripeApiKey && <Elements stripe={loadStripe(stripeApiKey)}>
                                <Payment />
                            </Elements>
                            }
                        </ProtectedRoute>} />
                    <Route path="/payment/success" element={
                        <ProtectedRoute isAuthenticated={isAuthenticated} isLoading={isLoading}>
                            <OrderSuccess />
                        </ProtectedRoute>} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
