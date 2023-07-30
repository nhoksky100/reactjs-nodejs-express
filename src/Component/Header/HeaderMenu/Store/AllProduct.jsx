import React, { Component } from 'react';

import { connect } from 'react-redux';
import { stringtoslug } from '../../../stringtoslug.js';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

import { FormatNumber } from '../../../FormatNumber.jsx';

import InfiniteScroll from "react-infinite-scroll-component";
import ShowStar from '../../../RatingStar/ShowStar.jsx';
import ReadMore from '../../../ReadMore/ReadMoreContent.jsx';
import { sorting } from './SortingTagName.jsx';
import { ExChangeRate } from '../../HeaderTop/ExChangeRate.jsx';
import { toast } from 'react-toastify';
import { t } from 'i18next';
import { addDays } from 'date-fns';
// import Detail_product from '../../Content/Detail_product/Detail_product';

const getJoinData = () => axios.get('/getdata_product_rating').then((res) => res.data)

class AllProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {

            dataJoin: null,
            items: [],
            hasMore: true,
            lengthCount: 18,
            loading: 'Loading...',
            rating: 5,
            disabled: false

        }
    }



    componentDidMount() {

        if (this.state.dataJoin === null) {
            // console.log(this.props.sortHash,'hash');
            this.checkCategoryValue();

        }


    }
    componentWillUnmount() {
        this.setState({
            dataJoin: null,
            items: []

        })
    }
    checkCategoryValue = () => {
        var pushData = [], pushItem = [], count = 9;
        getJoinData().then((res) => {
            if (res) {
                // pushData = res.reverse();
                pushData = res.sort(() => Math.random() - Math.random()); //random product
                pushData.map((value) => {
                    if (count > 0) {
                        pushItem.push(value);
                        count--;
                    }
                    return pushData
                })
                this.setState({
                    dataJoin: pushData,
                    items: pushItem

                })
            }
        })
    }

    componentDidUpdate(prevProps, prevState) {
        var valSortName = this.props.valSortName

        if (prevProps.valSortName !== valSortName) {
            var { dataJoin } = this.state;
            dataJoin = sorting(valSortName, dataJoin);
            this.setState({ items: dataJoin })

        }

    }


    getDetailsProductSingle = (IdProductDetails) => {
        sessionStorage.setItem('ID_details_product', IdProductDetails);

    }
    // send show cart

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

    // infinitescroll
    fetchMoreData = () => {
        // a fake async api call like which sends
        // 9 more records in 1 secs
        var { dataJoin, lengthCount, items } = this.state;



        if (items.length >= dataJoin.length) {
            this.setState({ hasMore: false, loading: '' });
            return;
        }

        var pushData = [];
        var availableProduct = 9;
        if (dataJoin !== null) {

            var count_product = dataJoin.length - items.length;

            dataJoin.map((value) => {
                if (count_product <= availableProduct) {
                    pushData.push(value)
                } else {
                    if (lengthCount > 0) {
                        pushData.push(value);
                        lengthCount--;
                    }
                }
                return dataJoin
            })
        }
        setTimeout(() => {
            this.setState({
                items: pushData,
                // concat(Array.from({ length: 9 }))
                // 9 product show
                lengthCount: this.state.lengthCount + availableProduct
            });
        }, 1000);
    };

    showAllProduct = () => {
        if (this.state.dataJoin !== null) {
            var { currencyDefault, currencyRate } = this.props;

            return (

                <InfiniteScroll
                    dataLength={this.state.items.length}
                    next={this.fetchMoreData}
                    hasMore={true}
                    loader={<h4>{this.state.loading}</h4>}
                // endMessage={
                //     <p style={{ textAlign: "center" }}>
                //         <b>Yay! You have seen it all</b>
                //     </p>
                // }
                >



                    {this.state.items.map((value, index) => (

                        <div className="col-sm-6 col-md-3 product" key={index}>
                            <div className="body">

                                <NavLink to={'/detail-product/' + stringtoslug(value.productName) + ".html"}>
                                    <img onClick={() => this.getDetailsProductSingle(value.id)} src={value.productImage} alt={value.productName} title={value.productName} />
                                </NavLink>
                                <div className="content">

                                    <ShowStar star={value.rating_star} />
                                    <h1 className="h5" title={value.productName} >
                                        <ReadMore
                                            text={value.productName ? value.productName : ' '}
                                            length={28}
                                            color={'#45b7f9'}
                                        />
                                    </h1>
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
                                        <button onClick={() => this.getDetailsProductSingle(value.id)} className="btn btn-link">
                                            <i className="ion-android-open" />{t("detail")}
                                        </button>
                                    </NavLink>
                                    <button onClick={() => this.addToCart(value)} disabled={this.state.disabled}
                                        className="btn btn-primary btn-sm rounded"> <i className="ion-bag" />{t("add-to-cart")}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </InfiniteScroll>
            )
        }

    }
    render() {

        return (
            <div className="products">
                <div className="row">

                    {this.showAllProduct()}
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        valSortName: state.valSortName,
        currencyDefault: state.currencyDefault,
        currencyRate: state.currencyRate,
        languageValue: state.languageValue,
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {

        IMG_NUMBER_CART: (cart_ac) => {
            dispatch({ type: 'cart_animate_number', cart_ac })
        },

        PRODUCT_CART: (cart_product_ac) => {
            dispatch({ type: 'product_cart', cart_product_ac })
        },
        CART_ADD_STATUS: (cart_add_status) => {
            dispatch({ type: 'cart_add_status', cart_add_status })
        },



    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AllProduct)