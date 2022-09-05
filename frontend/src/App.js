import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WebFont from 'webfontloader';
import { useEffect } from 'react';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import Home from './components/Home/Home';
import ProductDetails from './components/ProductDetails/ProductDetails';
import { useSelector } from 'react-redux';
import Products from './components/Products/Products';
import Search from './components/Search/Search';

function App() {
    const isLoading = useSelector((state) => state.appState.isLoading);

    useEffect(() => {
        WebFont.load({
            google: {
                families: ['Roboto', 'Droid Sans', 'Droid Serif']
            }
        })
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
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
