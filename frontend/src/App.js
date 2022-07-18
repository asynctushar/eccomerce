import './App.css';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import { BrowserRouter as Router } from 'react-router-dom';
import WebFont from 'webfontloader';
import { useEffect } from 'react';

function App() {
    console.log(WebFont);
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
            <Footer />
        </Router>
    );
}

export default App;
