
import './App.css';
import React, { Component } from 'react';
import Header from './Header/Header';
import { BrowserRouter as Router } from "react-router-dom";
import UrlRoute from '../Router/UrlRoute';
import Home from './Home';
import Footer from './Footer/Footer';
import { ToastContainer } from 'react-toastify';

class App extends Component {

  render() {
  
    return (

      <Router>
        <Header />
        <UrlRoute>
          <Home />
        </UrlRoute>
        <Footer />
      
        <ToastContainer/>
      </Router>
    );
  }
}

export default App
