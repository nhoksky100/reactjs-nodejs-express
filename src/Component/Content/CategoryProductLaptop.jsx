import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { stringtoslug } from '../stringtoslug.js';
import axios from 'axios';
import ShowStar from '../RatingStar/ShowStar.jsx';
import { FormatNumber } from '../FormatNumber.jsx';
import ReadMore from '../ReadMore/ReadMoreContent.jsx';
import { ExChangeRate } from '../Header/HeaderTop/ExChangeRate.jsx';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { t } from 'i18next';
import { addDays } from 'date-fns';

const getDataProduct = () => axios.get('/getdata_product_rating').then((res) => res.data)
class CategoryProductLaptop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProduct: null,
            disabled: false
        }
    }

    componentDidMount() {
        if (this.state.dataProduct === null) {
            getDataProduct().then((res) => {
                this.setState({ dataProduct: res })

            })
        }

    }

    getDetailsProductSingle = (IdProductDetails) => {
        sessionStorage.setItem('ID_details_product', IdProductDetails);

    }


    //send database cart 
    sendShowCart = (dataCart, color, emailCustomer) => {
        var dayShipping = addDays(new Date(), 14), quantity = 1 // 14 ngày sau | số lượng mặt định 1
        setTimeout(() => {
            axios.post('/dataCart',
                {
                    dataCart, color, dayShipping, quantity, emailCustomer,
                })
                .then((res) => {


                    this.props.PRODUCT_CART(res.data);
                    this.props.CART_ADD_STATUS(true);
                    toast(<div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" />
                        <i>{t("add-to-cart-successfully")}!</i></div>)
                    this.setState({ disabled: false })
                })
        }, 1500)
        this.setState({ disabled: true })
    }
    //add cart
    addToCart = (dataCart) => {


        const color = ' ';
        const tokenIdCustomer = localStorage.getItem('tokenIdCustomer');
        if (tokenIdCustomer) {


            var profileEmail = JSON.parse(localStorage.getItem('tokenProfileCustomer'));
            // console.log(profileEmail.email);
            if (profileEmail) {


                this.sendShowCart(dataCart, color, profileEmail.email)
            }
        } else {
            toast(<div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" />
                <i>{t("sign-in-to-buy-products")}!</i></div>)
        }
    }



    isShow = () => {

        var product = [];
        if (this.state.dataProduct !== null) {
            var { currencyDefault, currencyRate } = this.props;
            var countProduct = 0;
            product = this.state.dataProduct.sort(() => Math.random() - Math.random()); //random product

            return product.map((value, key) => {

                if (
                    (stringtoslug(value.productCategory).indexOf('laptop') !== -1) ||
                    (value.productCategory.toUpperCase().indexOf('laptop') !== -1) ||
                    (value.productCategory.indexOf('laptop') !== -1) ||
                    (value.productCategory.toLowerCase().indexOf('laptop') !== -1)) {
                    if (countProduct++ < 8) {

                        return (
                            <div className="col-sm-6 col-md-3 product" key={key}>

                                <div className="body">
                                    {/* <a href="#favorites" className="favorites" data-favorite="inactive"><i className="ion-ios-heart-outline" /></a> */}
                                    <NavLink to={'/detail-product/' + stringtoslug(value.productName) + ".html"}>
                                        <img onClick={() => this.getDetailsProductSingle(value.id)}
                                            src={value.productImage} alt={value.productName} title={value.productName} />
                                    </NavLink>
                                    <div className="content">

                                        <ShowStar star={value.rating_star} />
                                        <h1 className="h5" title={value.productName} >
                                            <ReadMore
                                                text={value.productName}
                                                length={28}
                                                color={'#45b7f9'}
                                            />
                                        </h1>
                                        <hr className="offset-sm" />
                                        <div className="price-box pt-20">


                                            <span className="new-price new-price-2">
                                                {FormatNumber(ExChangeRate(value.productComplatePrice, currencyDefault, currencyRate))}
                                                {currencyRate ? currencyRate[0] : currencyDefault[0]}
                                            </span>
                                            {
                                                value.productReducedPrice.split(",")[0] !== '0' && value.productReducedPrice.split(",")[0] !== ''
                                                    ? <span className="old-price">
                                                        {FormatNumber(ExChangeRate(value.productPrice, currencyDefault, currencyRate))}
                                                        {currencyRate ? currencyRate[0] : currencyDefault[0]}
                                                    </span>

                                                    : ''
                                            }
                                            {
                                                value.productReducedPrice.split(",")[0] !== '0' && value.productReducedPrice.split(",")[0] !== ''
                                                    ? <span className="discount-percentage">{'-' + value.productReducedPrice.split(",")[0] + '%'}</span>
                                                    : ''
                                            }
                                        </div>
                                        <label>{value.productCategory}</label>


                                        <NavLink to={'/detail-product/' + stringtoslug(value.productName) + ".html"}>
                                            <button onClick={() => this.getDetailsProductSingle(value.ID)}
                                                className="btn btn-link"> <i className="ion-android-open" />{t("detail")}
                                            </button>
                                        </NavLink>
                                        <button onClick={() => this.addToCart(value)} disabled={this.state.disabled}
                                            className="btn btn-primary btn-sm rounded"> <i className="ion-bag" /> {t("add-to-cart")}
                                        </button>

                                    </div>
                                </div>
                            </div>
                        )
                    }
                } else { return '' }
            })
        }
    }
    render() {

        return (

            <div>
                <hr className="offset-lg" />
                <hr className="offset-md" />
                <section className="products">
                    <div className="container">
                        <h2 className="h2 upp align-center"> {t("laptop")} </h2>
                        <hr className="offset-lg" />
                        <div className="row">
                            {this.isShow()}
                        </div>
                        <div className="align-right align-center-xs">
                            <hr className="offset-sm" />
                            <NavLink to="/store/laptop"> <h5 className="upp">{t("see-more")}</h5> </NavLink>
                        </div>
                    </div>
                </section>
            </div>

        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        currencyDefault: state.currencyDefault,
        currencyRate: state.currencyRate,
        languageValue: state.languageValue,
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        PRODUCT_CART: (cart_product_ac) => {
            dispatch({ type: 'product_cart', cart_product_ac })
        },
        CART_ADD_STATUS: (cart_add_status) => {
            dispatch({ type: 'cart_add_status', cart_add_status })
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CategoryProductLaptop)
