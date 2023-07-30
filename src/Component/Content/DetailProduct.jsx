import React, { Component } from 'react';
 import ProductOrder from './Detail_product/ProductOrder';
import ProductTab from './Detail_product/ProductTab';
import SingleProduct from './Detail_product/SingleProduct';

class DetailProduct extends Component {
    render() {
     var ID=  sessionStorage.getItem('ID_details_product')
        return (

            <div>
                
                <SingleProduct ID={ID} />
                <ProductTab ID={ID} />
                <ProductOrder ID={ID} />
                
            </div>

        );
    }
}

export default DetailProduct;