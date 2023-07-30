import React, { Component } from 'react';
// import Slider from 'react-slick';
import CategoryProductLaptop from './Content/CategoryProductLaptop';
import CategoryProductSmartphone from './Content/CategoryProductSmartphone';
import CategoryProductTablet from './Content/CategoryProductTablet';
import CategoryProductTvaudio from './Content/CategoryProductTvaudio';
import CategoryProductWatch from './Content/CategoryProductWatch';
// import Footer from './Footer/Footer';


import HeaderSlide from './Header/HeaderBottom/HeaderSlide';



class Home extends Component {
  
    render() {
        
        return (
            <div>

                <HeaderSlide />
                <CategoryProductLaptop />
                <CategoryProductSmartphone />
                <CategoryProductTablet />
                <CategoryProductTvaudio />
                <CategoryProductWatch />
               {/* <Footer/> */}
              

            </div>
        );
    }
}

export default Home;