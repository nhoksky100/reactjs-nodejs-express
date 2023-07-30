import React, { Component } from 'react';

import { stringtoslug } from '../../../stringtoslug.js';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { FormatNumber } from '../../../FormatNumber.jsx';
import InfiniteScroll from "react-infinite-scroll-component";
import ReadMore from '../../../ReadMore/ReadMoreContent.jsx';
import { connect } from 'react-redux';
import { sorting } from './SortingTagName.jsx';
import ShowStar from '../../../RatingStar/ShowStar.jsx';
import { ExChangeRate } from '../../HeaderTop/ExChangeRate.jsx';
import { toast } from 'react-toastify';
import { t } from 'i18next';
import { addDays } from 'date-fns';

const getDataProduct = () => axios.get('/getdata_product_rating').then((res) => res.data)
class CategoryProductTablet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProduct: null,
            items: [],
            hasMore: true,
            lengthCount: 18,
            loading: 'Loading...',

            slugStatus: false,
            parthSlug: '',
            categoryStatus: '',
            disabled: false


        }
    }

    componentDidMount() {
        if (this.state.dataProduct === null) {
            this.checkCategoryValue();
        }

    }

    componentDidUpdate(prevProps, prevState) {
        var valSortName = this.props.valSortName
        var { dataProduct } = this.state;
        if (prevState.parthSlug !== this.props.parth_slug) {
            this.checkCategoryValue()
        }
        if (prevProps.valSortName !== valSortName) {

            dataProduct = sorting(valSortName, dataProduct);
            this.setState({ items: dataProduct })

        }

    }
    checkCategoryValue = () => {
        var { category, parth_slug, category_status } = this.props;
        var pushData = [], pushItem = [], pushDataTemp = [], count = 9, availableProduct = 9;
        getDataProduct().then((res) => {
            if (res) {
                // catelgory = status boolean
                pushData = res.sort(() => Math.random() - Math.random()); //random product
                pushData.map((value) => {
                    if (category_status) {
                        if (
                            (stringtoslug(value.productCategory).indexOf(category) !== -1) ||
                            (value.productCategory.toUpperCase().indexOf(category) !== -1) ||
                            (value.productCategory.indexOf(category) !== -1) ||
                            (value.productCategory.toLowerCase().indexOf(category) !== -1)

                        ) {

                            pushDataTemp.push(value)
                        }
                    } else {
                        if (
                            (stringtoslug(value.productCategory).indexOf(parth_slug + category) !== -1) ||
                            (value.productCategory.toUpperCase().indexOf(parth_slug + category) !== -1) ||
                            (value.productCategory.indexOf(parth_slug + category) !== -1) ||
                            (value.productCategory.toLowerCase().indexOf(parth_slug + category) !== -1)
                        ) {
                            pushDataTemp.push(value)
                        }
                    }
                    return pushData
                })

                if (pushDataTemp.length > availableProduct) {

                    pushDataTemp.map((item) => {
                        if (count >= 1) {
                            pushItem.push(item);
                            count--;
                        }
                        return pushDataTemp
                    })

                    this.setState({
                        items: pushItem
                    })
                } else {
                    this.setState({
                        items: pushDataTemp,
                    })
                }

                this.setState({
                    dataProduct: pushDataTemp,
                    //update
                    parthSlug: parth_slug,
                    categoryStatus: category_status
                })
            }
        })
    }


    getDetailsProductSingle = (IdProductDetails) => {
        sessionStorage.setItem('ID_details_product', IdProductDetails);

    }
    fetchMoreData = () => {

        var { dataProduct, lengthCount, items } = this.state;


        if (items.length >= dataProduct.length) {
            this.setState({ hasMore: false, loading: '' });
            return;
        }

        var pushData = [];
        var availableProduct = 9;
        if (dataProduct !== null) {

            var count_product = dataProduct.length - items.length;

            dataProduct.map((value, key) => {
                if (count_product <= availableProduct) {
                    pushData.push(value)
                } else {
                    if (lengthCount > 0) {
                        pushData.push(value);
                        lengthCount--;
                    }
                }
                return dataProduct
            })
        }
        setTimeout(() => {
            this.setState({
                items: pushData,
                // concat(Array.from({ length: 9 }))
                lengthCount: lengthCount + availableProduct
            });
        }, 1000);
    };


    //send  cart 
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

    showProduct = () => {
        // var { parth_slug, category } = this.props;
        if (this.state.dataProduct !== null) {
            var { currencyDefault, currencyRate } = this.props;
            return (
                <InfiniteScroll
                    dataLength={this.state.items.length}
                    next={this.fetchMoreData}
                    hasMore={true}
                    loader={<h4>{this.state.loading}</h4>}

                >
                    {
                        this.state.items.map((value, key) => {
                            return (

                                <div className="col-sm-6 col-md-3 product" key={key}>
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
                            )

                        })
                    }

                </InfiniteScroll>
            )
        }
    }
    render() {

        return (
            <div className="products">
                <div className="row">
                    {this.showProduct()}

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

        getValueSortingName: (value_action) => {
            dispatch({ type: 'valueSorttingName', value_action })
        },
        PRODUCT_CART: (cart_product_ac) => {
            dispatch({ type: 'product_cart', cart_product_ac })
        },
        CART_ADD_STATUS: (cart_add_status) => {
            dispatch({ type: 'cart_add_status', cart_add_status })
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CategoryProductTablet)

