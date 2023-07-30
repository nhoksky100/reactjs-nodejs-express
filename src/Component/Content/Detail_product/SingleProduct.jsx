import React, { Component } from 'react';

import axios from 'axios';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import ImgSingleProduct from './ImgSingleProduct';
import { FormatNumber } from '../../FormatNumber';
import html from 'react-inner-html';
import { ExChangeRate } from '../../Header/HeaderTop/ExChangeRate';
import { Redirect } from 'react-router-dom';
import ShowStar from '../../RatingStar/ShowStar';
import ReadMore from '../../ReadMore/ReadMore';
import { t } from 'i18next';
import { addDays } from 'date-fns';


const getDataProduct = () => axios.get('/getdata_product_rating').then((res) => res.data)
// const getDataRating = () => axios.get('/getrating').then((res) => res.data)

class SingleProduct extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataDatailProductSingle: null,
            //colors
            colors: { red: false, blue: false, black: false, pink: false, silver: false, white: false, yellow: false, green: false },

            //cart 
            sendtocart: 'none', dayShipping: 3, productSizes: '',
            isCartProduct: false, IdDetailsProduct: null,
            //quantity
            quantity: 1, isQuantity: false,
            // disabled
            disabled: false,
            // status
            isIdErr: false,
            viewCheckoutStatus: false,
            // price sizes
            indexPrice: 0,
            index: 0,
            isCapacity: null

        }
        this.checkboxColor = this.checkboxColor.bind(this);
        this.animateBtnCart = this.animateBtnCart.bind(this);
        //slick 

    }

    componentDidMount() {
        // var ID = sessionStorage.getItem('ID_details_product');
        var { isIdErr } = this.state;
        var { ID } = this.props;

        if (!ID || ID === null || ID === 'null' || ID === 'undefined' || ID === undefined || ID === ' ') {
            // !exist || err
            this.setState({ isIdErr: true })
            isIdErr = true;
        } else {

            this.setState({ IdDetailsProduct: ID })
            // this.updateViewProduct(ID);

        }
        if (!isIdErr) {
            //true 
            this.dataDatailProductSingle(ID);
            this.setState({ isID: ID })
        }

    }

    // updateViewProduct = (ID) => {

    //     getDataRating().then((res) => {
    //         //   update view product 
    //         var DataRating = res.filter((item) => item.ID === ID);


    //     })

    // }

    componentWillUnmount() {

        doSomethingAsync()
        async function doSomethingAsync() {
            try {
                // This async call may fail.
                function someAsyncCall() {
                    getDataProduct().then((res) => {
                        var ID = sessionStorage.getItem('ID_details_product');
                        var dataFil = [], view = 0, buy = 0;
                        dataFil = res.filter((item) => item.ID === ID)
                        dataFil = res.filter((item) => item.ID === ID)

                        if (dataFil.length !== 0) {
                            for (let i = 0; i < dataFil.length; i++) {
                                view += dataFil[i].view
                            }
                            view += 1

                            axios.post('/update_rating_view', { ID, view, buy })
                            // this.setState({
                            //     IdDetailsProduct: null,
                            //     dataDatailProductSingle: null,
                            //     ID: null
                            // })
                            sessionStorage.setItem('ID_details_product', null)
                        }

                    })
                }
                return await someAsyncCall()
            }
            catch (error) {

                return error
                // If it does we will catch the error here.
            }
        }

    }

    dataDatailProductSingle = (ID) => {
        var dataFil = [];
        getDataProduct().then((res) => {
            dataFil = res.filter((item) => item.ID === ID)
            this.setState({ dataDatailProductSingle: dataFil, ID: ID })

        })

    }

    componentDidUpdate(prevProps, prevState) {
        var idLocalUpdate = sessionStorage.getItem('ID_details_product');
        // var {productStorageCapacity,productSizes,indexPrice}=this.state
        if (prevState.IdDetailsProduct !== idLocalUpdate) {

            this.dataDatailProductSingle(idLocalUpdate);
            this.setState({ IdDetailsProduct: idLocalUpdate })

        }


    }


    sendShowCart = (dataCart, color, emailCustomer) => {


        var { dayShipping, quantity, indexPrice } = this.state;
        dayShipping = addDays(new Date(), dayShipping)
        setTimeout(() => {


            axios.post('/dataCart',
                {
                    dataCart, color, dayShipping, quantity, emailCustomer, indexPrice
                })
                .then((res) => {

                    // setTimeout(() => {
                    //     this.setState({
                    //         sendtocart: 'none',
                    //         // count: count + 1
                    //     })
                    //     this.props.IMG_NUMBER_CART('shake');
                    //     // this.props.IMG_COUNT_PRODUCT(count + 1);

                    //     this.props.PRODUCT_CART(res.data);
                    //     this.props.CART_ADD_STATUS(true);

                    //     setTimeout(() => {
                    //         this.props.IMG_NUMBER_CART('none');


                    //     }, 1500)
                    // }, 1000)


                    this.props.PRODUCT_CART(res.data);
                    this.props.CART_ADD_STATUS(true);
                    this.props.StatusUpdateCartCheckout(true)
                    toast(<div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" />
                        <i>{t("add-to-cart-successfully")}!</i></div>)

                    this.setState({
                        disabled: false,
                        isCartProduct: true
                    })
                })
        }, 1500);
        this.setState({ disabled: true })

    }
    animateBtnCart = (dataCart) => {
        const tokenIdCustomer = localStorage.getItem('tokenIdCustomer');
        if (tokenIdCustomer) {
            const favColors = Object.keys(this.state.colors)
                .filter((name) => this.state.colors[name])
                .join(", ");

            var profileEmail = JSON.parse(localStorage.getItem('tokenProfileCustomer'));
            // console.log(profileEmail.email);
            if (profileEmail) {

                // console.log(dataCart);
                this.sendShowCart(dataCart, favColors, profileEmail.email)
            }
        } else {
            toast(<div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" />
                <i>{t("sign-in-to-buy-products")}!</i></div>)
        }



    }

    // checkout click
    checkOut = (dataCart) => {



        if (!localStorage.getItem('tokenProfileCustomer')) {
            toast(<div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" />
                <i>{t("sign-in-to-buy-products")}!</i></div>)
        }
        else if (this.state.isCartProduct) {
            this.setState({ viewCheckoutStatus: true })

        }
        else {
            this.animateBtnCart(dataCart)
            this.setState({ viewCheckoutStatus: true })
        }
    }


    //quantity
    quantityPlus = () => {
        if (this.state.quantity >= 1) {
            this.setState({ quantity: this.state.quantity + 1 })
        }

    }
    quantityMinus = () => {
        if (this.state.quantity > 1) {
            this.setState({ quantity: this.state.quantity - 1 })
        }
    }
    isChange = (e) => {
        var value = e.target.value;
        var name = e.target.name;


        if (name === 'productStorageCapacity') {
            this.setState({
                isCapacity: true,
                indexPrice: parseInt(value)
            })
        }
        else if (name === 'productSizes') {
            this.setState({
                isCapacity: false,
                indexPrice: parseInt(value)
            })
        }
        this.setState({ [name]: value })
    }
    checkboxColor = (e) => {
        const name = e.target.name;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        this.setState({
            [name]: value
        });
        switch (name) {
            case 'red':
                if (value) {
                    this.state.colors.red = value
                } else {
                    this.state.colors.red = value
                }
                return;
            case 'blue':
                if (value) {
                    this.state.colors.blue = value
                } else {
                    this.state.colors.blue = value
                }
                return;
            case 'black':
                if (value) {
                    this.state.colors.black = value
                } else {
                    this.state.colors.black = value
                }
                return;
            case 'pink':
                if (value) {
                    this.state.colors.pink = value
                } else {
                    this.state.colors.pink = value
                }
                return;
            case 'silver':
                if (value) {
                    this.state.colors.silver = value
                } else {
                    this.state.colors.silver = value
                }
                return;
            case 'white':
                if (value) {
                    this.state.colors.white = value
                } else {
                    this.state.colors.white = value
                }
                return;
            case 'yellow':
                if (value) {
                    this.state.colors.yellow = value
                } else {
                    this.state.colors.yellow = value
                }
                return;
            case 'green':
                if (value) {
                    this.state.colors.green = value
                } else {
                    this.state.colors.green = value
                }
                return;
            default:
                return;
        }
    }

    Content = (content) => <div {...html(content)}></div>;


    //productSize option
    optionProductSize = (productSizes) => {
        var { indexPrice, isCapacity } = this.state
        if (productSizes !== undefined && productSizes !== 0 && productSizes !== null) {
            var pushSize = []
            productSizes = productSizes.split('#')

            for (let i = 0; i < productSizes.length; i++) {

                if (productSizes[i] !== '' && productSizes[i] !== undefined) {
                    pushSize.push
                        (
                            <option value={i} key={i} title={productSizes[i]} >
                                {
                                    !isCapacity ? productSizes[i] :
                                        isCapacity ? productSizes[indexPrice] :
                                            productSizes[i]
                                }

                            </option>
                        )

                }

            }
        }

        return pushSize
    }
    // ProductStorageCapacity
    optionProductStorageCapacity = (productStorageCapacity) => {
        var { indexPrice, isCapacity } = this.state


        if (productStorageCapacity !== undefined && productStorageCapacity !== 0 && productStorageCapacity !== null) {
            var pushProductStorageCapacity = []
            productStorageCapacity = productStorageCapacity.split('#')

            for (let i = 0; i < productStorageCapacity.length; i++) {

                pushProductStorageCapacity.push
                    (
                        <option value={i} key={i} title={productStorageCapacity[i]} >
                            {
                                isCapacity ? productStorageCapacity[i] :
                                    !isCapacity ? productStorageCapacity[indexPrice] :
                                        productStorageCapacity[i]
                            }
                        </option>
                    )

            }
        }
        return pushProductStorageCapacity
    }
    // point start view 
    starPoint = (arrayStar) => {
        var tatalpointStar = 0

        if (arrayStar !== null || arrayStar !== undefined) {
            arrayStar = arrayStar !== null && arrayStar.split(',')


            for (let i = 0; i < 6; i++) {
                tatalpointStar += parseInt(arrayStar[i]);

            }
        }
        return tatalpointStar
    }

    ShowFormSingleProduct = () => {
        var { dataDatailProductSingle } = this.state
        if (dataDatailProductSingle !== null) {
            var { currencyDefault, currencyRate } = this.props;
            var transportFee3 = FormatNumber(ExChangeRate(currencyDefault[1] * 2, currencyDefault, currencyRate)) // fee 2$
            var transportFee7 = FormatNumber(ExChangeRate(currencyDefault[1] * 1, currencyDefault, currencyRate)) // fee 2$

            return dataDatailProductSingle.map((value, key) => {
                var image_list_clean = value.productImageList.split('-Arraylist') // list-image
                var colors = value.colors !== null && value.colors !== '' ? value.colors.split(', ') : '';
                // var starPoint = value.points_star.split(', ');

                var starPoint = this.starPoint(value.points_star)
                return (

                    <div className="row single-product-area" key={key}>

                        <div className="col-lg-5 col-md-6">
                            <div className="container">
                                {/* <div className='row'> */}


                                <ImgSingleProduct image_list_slick={image_list_clean} top_product={value.productImage} />
                                {/* </div> */}
                                <div className='row'>
                                    <div className='product-img-additional'>
                                        <div className="product-additional-info pt-25">
                                            <a className="wishlist-btn" href="#wishlist"><i className="fa fa-heart-o" />{t("add-to-favorites")}</a>
                                            <div className="product-social-sharing pt-25">
                                                <ul>
                                                    <li className="facebook"><a href="#Facebook"><i className="fa fa-facebook" />Facebook</a></li>
                                                    <li className="twitter"><a href="#Twitter"><i className="fa fa-twitter" />Twitter</a></li>
                                                    <li className="google-plus"><a href="#Google+"><i className="fa fa-google-plus" />Google +</a></li>
                                                    <li className="instagram"><a href="#Instagram"><i className="fa fa-instagram" />Instagram</a></li>
                                                </ul>
                                            </div>


                                        </div>

                                        <div id='review' className="block-reassurance">
                                            <ul>
                                                <li>
                                                    <div className="reassurance-item">
                                                        <div className="reassurance-icon">
                                                            <i className="fa fa-check-square-o" />
                                                        </div>
                                                        <p>{t("security")}</p>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="reassurance-item">
                                                        <div className="reassurance-icon">
                                                            <i className="fa fa-truck" />
                                                        </div>
                                                        <p> {t("Guaranteed")}</p>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="reassurance-item">
                                                        <div className="reassurance-icon">
                                                            <i className="fa fa-exchange" />
                                                        </div>
                                                        <p> {t("return-goods-in-accordance-with-regulations")} </p>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-7 col-md-6">
                            <div className="product-details-view-content pt-60">
                                <div className="product-info">
                                    <h2>{value.productTitle}</h2>
                                    <span className="product-details-ref">{t("brand")}: {value.productCategory}</span>
                                    <div className="rating-box pt-20">
                                        <ul className="rating rating-with-review-item">
                                            <li><ShowStar star={value.rating_star} /></li>

                                            <li className="review-item"><a href="#review">{starPoint} {t("rating-vote")}</a></li>
                                            <li className="review-item"><a href="#review">{value.buy} {t("sold")}</a></li>
                                        </ul>
                                    </div>
                                    <div className="price-box pt-20">

                                        < span className="new-price new-price-2">
                                            {FormatNumber(ExChangeRate(value.productComplatePrice.split(",")[this.state.indexPrice], currencyDefault, currencyRate))}
                                            {currencyRate ? currencyRate[0] : currencyDefault[0]}
                                        </span>
                                        {
                                            value.productReducedPrice.split(",")[this.state.indexPrice] !== '0' && value.productReducedPrice.split(",")[this.state.indexPrice] !== ''
                                                ? <span className="old-price">
                                                    {FormatNumber(ExChangeRate(value.productPrice.split(",")[this.state.indexPrice], currencyDefault, currencyRate))}
                                                    {currencyRate ? currencyRate[0] : currencyDefault[0]}
                                                </span>

                                                : ''
                                        }
                                        {
                                            value.productReducedPrice.split(",")[this.state.indexPrice] !== '0' && value.productReducedPrice.split(",")[this.state.indexPrice] !== ''
                                                ? <span className="discount-percentage">{'-' + value.productReducedPrice.split(",")[this.state.indexPrice] + '%'}</span>
                                                : ''
                                        }
                                    </div>
                                    <span><i className="shopping-cart"></i></span>
                                    {value.colors !== '' &&

                                        < div className="product-variants">
                                            <div className="produt-variants-size">
                                                <label>{t("color")}</label>
                                                <div className="formRight check_color">
                                                    {

                                                        colors.map((value, key) => {

                                                            return (
                                                                <Fragment key={key}>
                                                                    <input defaultValue={value} onChange={(e) => this.checkboxColor(e)} name={value} type="checkbox" className={'checked ' + 'checked-' + value} id={"check-in-box" + value} />
                                                                    <label className={'check-label-' + value} htmlFor={"check-in-box" + value}><b>{t(value)}</b> </label>
                                                                </Fragment>

                                                            )

                                                        })
                                                    }
                                                </div>
                                            </div><span></span>
                                            <div className="clear" />
                                        </div>
                                    }
                                    <div className="product-variants size-type">
                                        <div className="produt-variants-size ">
                                            <label>{t("delivery-date")}</label>
                                            <select style={{ width: '22%' }} onChange={(e) => this.isChange(e)} defaultValue={this.state.dayShipping}
                                                name='dayShipping' className="nice-select">
                                                <option value={3} title="shipping in 3 days" >{t("shipping-in-3-days")}</option>
                                                <option value={7} title="shipping in 7 days">{t("shipping-in-7-days")}</option>
                                                <option value={14} title="shipping in 14 days">{t("shipping-in-14-days")}</option>
                                            </select>
                                            <span className="tipClick">
                                                <a href="#tooltip">®</a>
                                                <strong className="tooltipT">
                                                    <p> {t("shipping-in-3-days")} : {transportFee3}  {currencyRate ? currencyRate[0] : currencyDefault[0]} </p>
                                                    <p>  {t("shipping-in-7-days")} : {transportFee7} {currencyRate ? currencyRate[0] : currencyDefault[0]} </p>
                                                    <p>  {t("shipping-in-14-days")} :{t("free")} </p>
                                                    <span><a href="#closeTooltip">✕</a></span>
                                                    {/* <span className="arrow" /> */}
                                                </strong>

                                            </span>

                                        </div>

                                        {
                                            value.productSizes && value.productSizes !== '' && value.productSizes !== null && value.productSizes !== undefined &&
                                            <div className="produt-variants-size">

                                                <label>{t("size")}</label>
                                                <select onMouseOut={() => this.setState({ isCapacity: false })} onClick={() => this.setState({ isCapacity: false })}
                                                    style={{ width: '22%' }} onChange={(e) => this.isChange(e)}
                                                    value={this.state.productSizes}
                                                    name='productSizes' className="nice-select">
                                                    {this.optionProductSize(value.productSizes)}
                                                </select>
                                            </div>
                                        }
                                        {
                                            // value.productStorageCapacity !== null && value.productStorageCapacity !== undefined &&
                                            <div className="produt-variants-size">

                                                <label>{t("capacity")}</label>
                                                <select onMouseOut={() => this.setState({ isCapacity: true })} onClick={() => this.setState({ isCapacity: true })}
                                                    style={{ width: '22%' }} onChange={(e) => this.isChange(e)}
                                                    value={this.state.productStorageCapacity}
                                                    name='productStorageCapacity' className="nice-select">
                                                    {this.optionProductStorageCapacity(value.productStorageCapacity)}
                                                </select>
                                            </div>
                                        }

                                    </div>

                                    {/* <div className='controls'> */}
                                    <div className="qty-input">
                                        <button onClick={() => this.quantityMinus()} className="qty-count qty-count--minus" data-action="minus" type="button">-</button>
                                        <input className="product-qty" type="number" name="product-qty" min={1} max={10} onChange={(e) => this.isChange(e)} value={this.state.quantity} />
                                        <button onClick={() => this.quantityPlus()} className="qty-count qty-count--add" data-action="add" type="button">+</button>
                                    </div>



                                    {/* </div> */}
                                    <div className="single-add-to-cart">
                                        <div className="container ">
                                            <div className="row cart_button">
                                                {/* <div id="cart" className="cart" data-totalitems="0">
                                                     <i className="fas fa-shopping-cart"></i>
                                                </div> */}
                                                <div className="col-sm col-2-md">
                                                    <div className='cart-wrapper'>
                                                        <button onClick={() =>
                                                            this.animateBtnCart(value)} type='button' disabled={this.state.disabled}
                                                            id="addtocart" className={"btn-add btn-white btn-animate " + this.state.sendtocart}>
                                                            {t("add-to-cart")}
                                                            {/* <span className="cart-item"></span> */}

                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="col-sm col-2-md  checkout-wrapper">
                                                    <button onClick={() => this.checkOut(value)} type='button' className="btn-checkout btn-white btn-animate">{t("payment")}</button>

                                                </div>
                                                



                                            </div>
                                        </div>
                                    </div><br />
                                    
                                    <div className="product-desc">
                                        <div className='row'>

                                        <span className='specifications'>{t("specifications")}</span>
                                        </div>
                                        <ReadMore
                                            text={value.productDescribe}
                                            length={5500}
                                            color={'#45b7f9'}
                                        />

                                        {/* <div>{this.Content(value.product_describe)}</div> */}

                                    </div>


                                </div>
                            </div>
                        </div>

                    </div >
                )

            })
        } else return ''
    }
    render() {

        if (this.state.isIdErr) {
            return <Redirect to="/" />
        }
        if (this.state.viewCheckoutStatus) {
            return <Redirect to="/checkout.html" />
        }

        return (
            <div className="content-wraper">

                <div className="container">

                    {this.ShowFormSingleProduct()}
                </div>


            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        // img_cart: state.img_cart
        // is_status_show_app: state.is_status_show_app,
        // admin_url: state.admin_url
        cart_status: state.cart_status,
        cart_remove: state.cart_remove,
        cart_remove_status: state.cart_remove_status,
        currencyDefault: state.currencyDefault,
        currencyRate: state.currencyRate,
        languageValue: state.languageValue,


    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        // IMG_NUMBER_CART: (cart_ac) => {
        //     dispatch({ type: 'cart_animate_number', cart_ac })
        // },
        // IMG_COUNT_PRODUCT: (cart_count) => {
        //     dispatch({ type: 'cart_animate_count', cart_count })
        // },
        PRODUCT_CART: (cart_product_ac) => {
            dispatch({ type: 'product_cart', cart_product_ac })
        },
        CART_ADD_STATUS: (cart_add_status) => {
            dispatch({ type: 'cart_add_status', cart_add_status })
        },
        StatusUpdateCartCheckout: (act_statusCartCheckout) => {
            dispatch({ type: 'status_updateCart_Checkout', act_statusCartCheckout })
        },
        // CART_REMOVE_STATUS: (cart_remove_status) => {
        //     dispatch({ type: 'cart_remove_status', cart_remove_status })
        // },



    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);