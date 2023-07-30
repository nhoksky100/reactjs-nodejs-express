import React, { Component } from 'react';
import AllProduct from './AllProduct';
import CategoryProductSmartphone from './CategoryProductSmartphone';
import CategoryProductLaptop from './CategoryProductLaptop';
import CategoryProductTablet from './CategoryProductTablet';
import CategoryProductTvaudio from './CategoryProductTvaudio';
import CategoryProductAccessories from './CategoryProductAccessories';
import CategoryFormStore from './CategoryFormStore';

import { Fragment } from 'react';
import CategoryProductWatch from './CategoryProductWatch';
// import Footer from '../../../Footer/Footer';

class ProductStore extends Component {

    showAllProduct = () => {

        var parthItem = this.props.match.path;
        var categoryStatus = true, category = '';
        var parthSlug = '', pushParthItem = '';

        if (parthItem.indexOf(':slug') !== -1) {
            categoryStatus = false // case 2
            //get slug
            parthSlug = this.props.match.params.slug;
            pushParthItem = parthItem.split('/:slug'); // clear string index value

            //get url
            parthItem = pushParthItem[0];




        }
        //get category
        category = parthItem.slice(7); // clear 1 - 7 char

        switch (parthItem) {
            case '/store/allproduct': case '/store':

                return (<AllProduct sortHash={this.props.location.hash} />)

            case '/store/smartphone':

                return (<CategoryProductSmartphone category={category} parth_slug={parthSlug} category_status={categoryStatus} />)
            case '/store/laptop':
                return (<CategoryProductLaptop category={category} parth_slug={parthSlug} category_status={categoryStatus} />)
            case '/store/tablet':
                return (<CategoryProductTablet category={category} parth_slug={parthSlug} category_status={categoryStatus} />)
            case '/store/tvaudio':
                return (<CategoryProductTvaudio category={category} parth_slug={parthSlug} category_status={categoryStatus} />)
            case '/store/smartwatch':
                return (<CategoryProductWatch category={category} parth_slug={parthSlug} category_status={categoryStatus} />)
            case '/store/accessories':
                return (<CategoryProductAccessories />)
            default:
                return;
        }

    }
    iShow = () => {

        return (
            <div className="container">
                <div className="row">

                    {/* Products */}
                    {/* <div className="col-sm-8 col-md-9"> */}
                    <hr className="offset-lg" />
                    {this.showAllProduct()}
                    {/* </div> */}

                </div>
            </div>
        )

    }
    render() {
        // const { messages } = this.props;
        // console.log(this.props.match.path,'path');
        return (
            <Fragment  >

                <CategoryFormStore />
                {this.iShow()}
                {/* <Footer /> */}
            </Fragment >

        );
    }
}

export default ProductStore
