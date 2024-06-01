import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import AllProducts from './pages/AllProducts';
import ProductPage from './pages/ProductPage';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <Switch>
                    <Route path="/" exact component={AllProducts} />
                    <Route path="/product/:id" component={ProductPage} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
