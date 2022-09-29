import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WebFont from 'webfontloader';
import { useEffect } from 'react';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import Home from './components/Home/Home';
import ProductDetails from './components/ProductDetails/ProductDetails';
import { useDispatch, useSelector } from 'react-redux';
import Products from './components/Products/Products';
import Search from './components/Search/Search';
import Cart from './components/Cart/Cart';
import Auth from './components/Auth/Auth';
import Account from './components/Account/Account';
import { loadUserAction } from './redux/actions/userAction';
import ProtectedRoute from './components/route/ProtectedRoute';

const App = () => {
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state) => state.userState);
    const { isLoading } = useSelector((state) => state.appState);

    useEffect(() => {
        WebFont.load({
            google: {
                families: ['Roboto', 'Droid Sans', 'Droid Serif']
            }
        });

        dispatch(loadUserAction());
    }, []);

    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:keyword" element={<Products />} />
                <Route path="/search" element={<Search />} />
                <Route path="/login" element={<Auth />} />
                <Route path="/account" element={
                    <ProtectedRoute isAuthenticated={isAuthenticated} isLoading={isLoading}>
                        <Account />
                    </ProtectedRoute>} />
                <Route path="/cart" element={<Cart />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
