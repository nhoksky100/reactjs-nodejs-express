import React, { Component, Fragment } from 'react';
import { Route, Switch } from "react-router-dom";
import NotPage404 from '../Component/NotPage404';
import ScrollToTop from './ScrollToTop';

import Home from '../Component/Home';
import ProductStore from '../Component/Header/HeaderMenu/Store/ProductStore';
import AdminManager from '../Component/adminManager/AdminManager';
import Login from '../Component/adminManager/Login/Login';
// import DetailManagerCustomer from '../Component/Header/HeaderTop/Account_customer/DetailManagerCustomer';
import DetailProduct from '../Component/Content/DetailProduct';
import SearchProduct from '../Component/Header/HeaderMid/SearchProduct';
import ViewFullCartCheckOut from '../Component/Header/CartProduct/ViewFullCartCheckOut';
import SuccessCheckOut from '../Component/Header/CartProduct/SuccessCheckOut';
import Contact from '../Component/Header/HeaderMenu/Contact'
import FollowOrders from '../Component/Header/HeaderTop/Account_customer/FollowOrders';
import Blog from '../Component/Header/Blog/Blog';
import BlogCategory from '../Component/Header/Blog/BlogCategory';
import BlogContent from '../Component/Header/Blog/BlogContent';
import FAQ from '../Component/Header/HeaderMenu/FAQ';
import Pages from '../Component/Header/Pages/Pages';




class UrlRoute extends Component {
    render() {

        return (
            <Fragment>
                <ScrollToTop />


                    <Route exact path='/' component={Home} />
                <Switch>
                    <Route exact path='/' />
                    {/* admin */}
                    <Route exact path="/login-manager" component={Login} />
                    <Route exact path='/admin/' component={AdminManager} />
                    <Route exact path='/admin/product.html' component={AdminManager} />
                    <Route exact path='/admin/order-product.html' component={AdminManager} />
                    <Route exact path='/admin/details-order-product.html' component={AdminManager} />
                    <Route exact path='/admin/deal.html' component={AdminManager} />

                    <Route exact path='/admin/blog.html' component={AdminManager} />
                    <Route exact path='/admin/add-blog.html' component={AdminManager} />
                    <Route exact path='/admin/edit-blog.html' component={AdminManager} />
                    <Route exact path='/admin/detail-blog.html' component={AdminManager} />

                    <Route exact path='/admin/member.html' component={AdminManager} />
                    <Route exact path='/admin/member-add.html' component={AdminManager} />
                    <Route exact path='/admin/member-edit.html' component={AdminManager} />
                    <Route exact path='/admin/account-customer.html' component={AdminManager} />



                    <Route exact path='/admin/support.html' component={AdminManager} />
                    <Route exact path='/admin/support/reply.html' component={AdminManager} />
                    <Route exact path='/admin/slide.html' component={AdminManager} />
                    <Route exact path='/admin/add-product.html' component={AdminManager} />
                    <Route exact path='/admin/edit-product.html' component={AdminManager} />
                    <Route exact path='/admin/detail-product.html' component={AdminManager} />
                    <Route exact path='/admin/rating-product.html' component={AdminManager} />
                    <Route exact path='/admin/catalog.html' component={AdminManager} />
                    <Route exact path='/admin/catalog-edit.html' component={AdminManager} />
                    <Route exact path='/admin/catalog-add.html' component={AdminManager} />
                    <Route exact path='/admin/slide-add.html' component={AdminManager} />
                    <Route exact path='/admin/pages.html' component={AdminManager} />
                    <Route exact path='/admin/add-pages.html' component={AdminManager} />
                    <Route exact path='/admin/data-recovery.html' component={AdminManager} />
                    {/* end admin manager */}
                    {/* customer */}
                    {/* <Route exact path='/customer-pay.html' component={DetailManagerCustomer} /> */}
                    <Route exact path='/customer-follow-orders-well.html' component={FollowOrders} />
                    {/* <Route exact path='/customer-setting.html' component={DetailManagerCustomer} /> */}
                    {/* <Route exact path='/customer-Signinup.html' component={DetailManagerCustomer} /> */}
                    {/* <Route exact path='/customer-form-setting-profile.html' component={DetailManagerCustomer} /> */}
                    {/* detail_product */}

                    <Route exact path='/detail-product/:slug.html' component={DetailProduct} />
                    {/* cart check out */}
                    <Route exact path='/view-full-cart-check-out.html' component={ViewFullCartCheckOut} />
                    <Route exact path='/success-checkout.html' component={SuccessCheckOut} />

                    <Route exact path='/store' component={ProductStore} />
                    <Route exact path='/store/allproduct' component={ProductStore} />
                    <Route exact path='/store/smartphone' component={ProductStore} />
                    <Route exact path='/store/smartphone/:slug' component={ProductStore} />
                    <Route exact path='/store/laptop' component={ProductStore} />
                    <Route exact path='/store/laptop/:slug' component={ProductStore} />
                    <Route exact path='/store/tablet' component={ProductStore} />
                    <Route exact path='/store/tablet/:slug' component={ProductStore} />
                    <Route exact path='/store/tvaudio' component={ProductStore} />
                    <Route exact path='/store/tvaudio/:slug' component={ProductStore} />
                    <Route exact path='/store/smartwatch' component={ProductStore} />
                    <Route exact path='/store/smartwatch/:slug' component={ProductStore} />
                    <Route exact path='/store/accessories' component={ProductStore} />
                    {/* contact */}
                    <Route exact path='/contact' component={Contact} />
                    {/* blog */}
                    <Route exact path='/blog' component={Blog} />
                    <Route exact path='/blog/:slug.html' component={BlogCategory} />
                    <Route exact path='/blog-content/:slug.html' component={BlogContent} />
                    {/* pages */}
                    <Route exact path='/pages' component={Pages} />

                    {/* search */}
                    <Route exact path='/search-product.html' component={SearchProduct} />
                    {/* FAQ */}
                    <Route exact path='/faq' component={FAQ} />
                    {/* checkout */}
                    <Route exact path='/checkout.html' component={ViewFullCartCheckOut} />
                    {/* setting */}

                    <Route component={NotPage404} />
                </Switch>
            </Fragment>
        );
    }
}

export default UrlRoute;