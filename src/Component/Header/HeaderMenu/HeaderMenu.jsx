
import React, { Component, Fragment } from 'react';

import { NavLink } from 'react-router-dom';

// import Search from '../HeaderMid/Search.jsx';
import { t } from 'i18next';
import { connect } from 'react-redux';
import ScrollToggleMenu from './Store/ScrollToggleMenu.jsx';
// import axios from 'axios';

// const getDataCategory = () => axios.get('/getdata_category').then((res) => res.data)

class HeaderMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectDataCatagory: null,
            countProduct: 1, statusActive: false,
            statusCatalog: true, pushCatalog: []

        }
    }




    countProductUp = () => {
        if (this.state.countProduct >= 1) {
            this.setState({ countProduct: this.state.countProduct + 1 })
        }
    }
    countProductDown = () => {
        if (this.state.countProduct > 1) {
            this.setState({ countProduct: this.state.countProduct - 1 })
        }
    }
    removeCart = (dataCart, removeKey) => {
        var cart = 'cart' + removeKey;
        var removeElement = document.getElementById(cart);
        removeElement.remove();


        var dataFil = [];
        // setTimeout(() => {
        dataFil = dataCart.filter((item, key) => key !== removeKey);
        if (dataCart.length === 1) {
            dataFil = [];
        }
        // sessionStorage.setItem('PRODUCT_CART', JSON.stringify(dataFil))

        dataCart = dataFil;


        sessionStorage.setItem('PRODUCT_CART', JSON.stringify(dataCart))
        sessionStorage.setItem('PRODUCT_CART_STATUS', 'onSave')
        this.props.CART_REMOVE_SAVE(dataCart)


    }
    // listCart = () => {
    //     var dataCart = [];
    //     if (sessionStorage.getItem('PRODUCT_CART') !== null || sessionStorage.getItem('PRODUCT_CART') !== '' || sessionStorage.getItem('PRODUCT_CART') !== undefined) {
    //         dataCart = JSON.parse(sessionStorage.getItem('PRODUCT_CART'));

    //     }


    //     if (dataCart !== null) {
    //         return dataCart.map((value, key) => {

    //             return (

    //                 <li id={'cart' + key} key={key}>
    //                     <a href="#" className="minicart-product-image">
    //                         <img src={value.image} alt="cart products" />
    //                     </a>
    //                     <div className="minicart-product-details">
    //                         <h6><a href="#">{value.name}</a></h6>



    //                         <div className="quantity">

    //                             <div className="cart-plus-minus">
    //                                 <span className='cart-span-price'> {value.price}</span>
    //                                 <input className="cart-plus-minus-box" defaultValue={this.state.countProduct} type="text" />
    //                                 <div onClick={() => this.countProductDown()} name='down' className="dec qtybutton"><i className="fa fa-angle-down" /></div>
    //                                 <div onClick={() => this.countProductUp()} name='up' className="inc qtybutton"><i className="fa fa-angle-up" /></div>
    //                             </div>
    //                         </div>



    //                     </div>
    //                     <button onClick={() => this.removeCart(dataCart, key)} className="close" title="Remove">

    //                         <i className="fa fa-close" />
    //                     </button>
    //                 </li>

    //             )
    //         })

    //     }

    // }


    //menu respon
    // toggleMenu = () => {

    //     this.setState({ statusActive: !this.state.statusActive })
    // }
    showFormMenu = () => {
        return (
            <div id="site-header" className="header-bottom header-nav header-sticky d-none d-lg-block d-xl-block container">


                <nav className="nav-bar">


                    <div className="row">
                        <div className="col-lg-12">
                            {/* Begin Header Bottom Menu Area */}
                            <div className="hb-menu navbar nav-wrap">

                                <div className="nav-button" >
                                    <a href='#menu-responsive' id="nav-toggle" className="">
                                        <span className="before"></span>
                                    </a>
                                   
                                </div>
                               
                                <ScrollToggleMenu formMenuToggle={this.showFormMenuScroll()} />
                                <ul id='menuStart' className= 
                                    {
                                        this.state.statusActive ? ' nav-menu active top_nav' : 'nav-menu top_nav'
                                    }>
                                    <li className="nav-item"><NavLink className={'nav-link'} to="/">{t("home")}</NavLink></li>
                                    <li className="dropdown-holder nav-item">
                                        <NavLink to="/store">{t("shop")}</NavLink>
                                        <ul className="hb-dropdown sub-nav">

                                            <li className="sub-dropdown-holder "><NavLink to='/store/laptop'>{t("laptop")}</NavLink>
                                                <ul className="hb-dropdown hb-sub-dropdown sub-nav">

                                                    <li><NavLink to='/store/laptop/dell'>Dell</NavLink></li>
                                                    <li><NavLink to='/store/laptop/asus'>Asus</NavLink></li>
                                                    <li><NavLink to='/store/laptop/hp'>Hp</NavLink></li>
                                                    <li><NavLink to='/store/laptop/toshiba'>Tosiba</NavLink></li>
                                                    <li><NavLink to='/store/laptop/apple'>Apple</NavLink></li>
                                                    <li><NavLink to='/store/laptop/lg'>LG</NavLink></li>

                                                </ul>
                                            </li>
                                            <li className="sub-dropdown-holder nav-item"><NavLink className={'nav-link'} to="/store/Smartphone">{t("smartphone")}</NavLink>
                                                <ul className="hb-dropdown hb-sub-dropdown sub-nav">

                                                    <li><NavLink to='/store/smartphone/apple'>Iphone</NavLink></li>
                                                    <li><NavLink to='/store/smartphone/samsung'>Samsung</NavLink></li>
                                                    <li><NavLink to='/store/smartphone/oppo'>Oppo</NavLink></li>
                                                    <li><NavLink to='/store/smartphone/redmi'>Redmi</NavLink></li>
                                                    <li><NavLink to='/store/smartphone/xiaomi'>Xiaomi</NavLink></li>
                                                    <li><NavLink to='/store/smartphone/huawei'>Huawei</NavLink></li>

                                                </ul>
                                            </li>
                                            <li className="sub-dropdown-holder nav-item"><NavLink className={'nav-link'} to="/store/tvaudio">{t("tvaudio")}</NavLink>
                                                <ul className="hb-dropdown hb-sub-dropdown sub-nav">

                                                    <li><NavLink to='/store/tvaudio/sony'>Sony</NavLink></li>
                                                    <li><NavLink to='/store/tvaudio/samsung'>Samsung</NavLink></li>
                                                    <li><NavLink to='/store/tvaudio/lg'>LG</NavLink></li>
                                                    <li><NavLink to='/store/tvaudio/falcon'>Falcon</NavLink></li>
                                                    <li><NavLink to='/store/tvaudio/tcl'>TCL</NavLink></li>
                                                    <li><NavLink to='/store/tvaudio/xiaomi'>Xiaomi</NavLink></li>

                                                </ul>
                                            </li>
                                            <li className="sub-dropdown-holder nav-item"><NavLink className={'nav-link'} to="/store/tablet">{t("tablet")}</NavLink>
                                                <ul className="hb-dropdown hb-sub-dropdown sub-nav">

                                                    <li><NavLink to='/store/tablet/ipad'>Ipad</NavLink></li>
                                                    <li><NavLink to='/store/tablet/samsung'>Samsung</NavLink></li>
                                                    <li><NavLink to='/store/tablet/redmi'>Redmi</NavLink></li>
                                                    <li><NavLink to='/store/tablet/lenovo'>Lenovo</NavLink></li>

                                                </ul>
                                            </li>

                                            <li className="sub-dropdown-holder nav-item"><NavLink className={'nav-link'} to="/store/smartwatch">{t("smartwatch")}</NavLink>
                                                <ul className="hb-dropdown hb-sub-dropdown sub-nav">

                                                    <li><NavLink to='/store/smartwatch/apple'>Apple</NavLink></li>
                                                    <li><NavLink to='/store/smartwatch/samsung'>Samsung</NavLink></li>
                                                    <li><NavLink to='/store/smartwatch/xiaomi'>Xiaomi</NavLink></li>
                                                    <li><NavLink to='/store/smartwatch/huawei'>Huawei</NavLink></li>
                                                    <li><NavLink to='/store/smartwatch/oppo'>Oppo</NavLink></li>

                                                </ul>
                                            </li>
                                            <li className="sub-dropdown-holder nav-item"><NavLink className={'nav-link'} to="/store/accessories">{t("accessories")}</NavLink> </li>
                                        </ul>
                                    </li>
                                    <li className="dropdown-holder  nav-item">
                                        <NavLink className={'nav-link'} to="/blog">{t("footer-news")}</NavLink>
                                        <ul className="hb-dropdown sub-nav">
                                            <li className="sub-dropdown-holder "><NavLink to="/blog">{t("product-news")}</NavLink>
                                                <ul className='hb-dropdown hb-sub-dropdown sub-nav'>
                                                    <li><NavLink to="/blog/laptop.html">{t("laptop")}</NavLink></li>
                                                    <li><NavLink to="/blog/smartphone.html">{t("smartphone")}</NavLink></li>
                                                    <li><NavLink to="/blog/tv-audio.html">{t("tvaudio")}</NavLink></li>
                                                    <li><NavLink to="/blog/smartwatch.html">{t("smartwatch")}</NavLink></li>
                                                    <li><NavLink to="/blog/tablet.html">{t("tablet")}</NavLink></li>
                                                    <li><NavLink to="/blog/accessories.html">{t("accessories")}</NavLink></li>

                                                </ul>
                                            </li>
                                            <li className='product-company '><NavLink to="/blog">{t("product-company-news")}</NavLink>
                                                <ul className='hb-dropdown hb-sub-dropdown sub-nav'>
                                                    <li><NavLink to="/blog/apple.html">Apple</NavLink></li>
                                                    <li><NavLink to="/blog/samsung.html">Samsung</NavLink></li>
                                                    <li><NavLink to="/blog/oppo.html">Oppo</NavLink></li>
                                                    <li><NavLink to="/blog/xiaomi.html">Xiaomi</NavLink></li>
                                                    <li><NavLink to="/blog/redmi.html">Redmi</NavLink></li>
                                                    <li><NavLink to="/blog/huawei.html">Huawei</NavLink></li>
                                                    <li><NavLink to="/blog/lenovo.html">Lenovo</NavLink></li>
                                                    <li><NavLink to="/blog/sony.html">Sony</NavLink></li>
                                                    <li><NavLink to="/blog/nokia.html">Nokia</NavLink></li>
                                                    <li><NavLink to="/blog/acus.html">Acus</NavLink></li>
                                                    <li><NavLink to="/blog/dell.html">Dell</NavLink></li>
                                                    <li><NavLink to="/blog/tosiba.html">Tosiba</NavLink></li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className=" sub-dropdown-holder   nav-item"><NavLink className={'nav-link'} to="/pages">{t("footer-page-category")}</NavLink></li>
                                    <li className='nav-item'><NavLink className={'nav-link'} to="/contact">{t("contact")}</NavLink></li>
                                    <li className='nav-item'><NavLink className={'nav-link'} to="/store/smartwatch">{t("smartwatch")}</NavLink></li>
                                    <li className='nav-item'><NavLink className={'nav-link'} to="/store/accessories">{t("accessories")}</NavLink></li>
                                </ul>




                            </div>




                        </div>
                    </div>
                </nav>

            </div>
        )
    }

    showFormMenuScroll = () => {
        return (
            <div id='menuScroll' className="scroll-toggle">
                <span style={{ display: 'contents' }}
                    className='scroll-toggle__button scroll-toggle__button--left'>
                    <i style={{ padding: '15px', marginLeft: '55px' }}
                        className="fa fa-arrow-left " aria-hidden="true" />
                </span>
                {/* <button className="scroll-toggle__button scroll-toggle__button--left">
                    Scroll Left
                </button> */}
                <ul className="scroll-toggle__list ">
                    <li className="nav-item scroll-toggle__list-item"><NavLink className={'nav-link'} to="/">{t("home")}</NavLink></li>
                    <li className="nav-item scroll-toggle__list-item menu-dropdown">
                        <NavLink className={'nav-link'} to="/store">{t("shop")}</NavLink>

                    </li>
                    <li className="dropdown-holder  nav-item scroll-toggle__list-item menu-dropdown">
                        <NavLink className={'nav-link'} to="/blog">{t("footer-news")}</NavLink>

                    </li>

                    <li className=" sub-dropdown-holder   nav-item scroll-toggle__list-item"><NavLink className={'nav-link'} to="/pages">{t("footer-page-category")}</NavLink></li>

                    <li className='nav-item scroll-toggle__list-item'><NavLink className={'nav-link'} to="/contact">{t("contact")}</NavLink></li>
                    <li className='nav-item scroll-toggle__list-item'><NavLink className={'nav-link'} to="/store/smartwatch">{t("smartwatch")}</NavLink></li>
                    <li className='nav-item scroll-toggle__list-item'><NavLink className={'nav-link'} to="/store/accessories">{t("accessories")}</NavLink></li>

                </ul>
                <i
                    className="fa fa-arrow-right scroll-toggle__button scroll-toggle__button--right" aria-hidden="true" />
                {/* <button className="scroll-toggle__button scroll-toggle__button--right">
                    Scroll Right
                </button> */}
            </div>

        )
    }
    render() {


        return (
            <Fragment>
                {this.showFormMenu()}


            </Fragment>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        languageValue: state.languageValue,
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(HeaderMenu)
