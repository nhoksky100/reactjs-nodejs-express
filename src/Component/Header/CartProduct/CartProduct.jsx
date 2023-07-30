import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { FormatNumber } from '../../FormatNumber';
import PopUpCheckout from './PopUpCheckout';
import axios from 'axios';
import { ExChangeRate } from '../HeaderTop/ExChangeRate';
import { t } from 'i18next';
import ReadMore from '../../ReadMore/ReadMoreContent';

const getDataCart = () => axios.get('/dataCart').then((res) => res.data)
class CartProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataCart: null,
            totalProductCart: 0,
            statusCart: false,
            removeKey: null,

        }

    }

    CartCustomer = () => {
        var profile = JSON.parse(localStorage.getItem('tokenProfileCustomer'));
        if (profile) {

            var pushData = [];
            getDataCart().then((res) => {

                res.map((value) => {
                    if (value.emailCustomer === profile.email) {
                        pushData.push(value);
                    }
                    return res
                })
                this.setState({
                    dataCart: pushData,
                    totalProductCart: pushData.length,

                })
            })
        }

    }
    componentDidMount() {
        this.CartCustomer()

    }
    refresh = () => {
        this.CartCustomer()
    }

    componentDidUpdate(prevProps, prevState) {
        var { cart_add_status, statuCartCheckout } = this.props;


        // kiem tra update them cart
        if (cart_add_status) {
            this.CartCustomer()
            this.props.CART_ADD_STATUS(false);
            // this.props.is_status_login(false);

        }
        if (statuCartCheckout) {
            this.CartCustomer()
            setTimeout(() => {
                this.props.StatusUpdateCartCheckout(false)
            }, 1000);
        }


    }


    removeProductNew = (dataCart, removeKey) => {
        var data = dataCart.filter((item, key) => key !== removeKey);
        axios.post('/removeDataCart', { data }).then((res) => {
            this.setState({
                dataCart: data,
                totalProductCart: this.state.totalProductCart - 1
            })
            this.props.StatusUpdateCartCheckout(true)
        })

    }
    cartProduct = () => {
        var { currencyDefault, currencyRate } = this.props;
        var { dataCart } = this.state;
        if (dataCart) {

            return dataCart.map((value, key) => {

                return (
                    <div id={'cart' + key} className="media" key={key}>
                        <div className="media-left">
                            <span >
                                <img className="media-object" src={value.image} alt="HP Chromebook 11" />
                            </span>
                        </div>
                        <div className="media-body">
                            <h6 className="media-heading">
                                <ReadMore
                                    text={value.productName ? value.productName : ' '}
                                    length={50}
                                    color={'#45b7f9'}
                                />
                            </h6>
                            <label>
                                {
                                    value.category
                                    //.replace('#', '-')
                                }
                            </label>
                            <p className="price">
                                {FormatNumber(ExChangeRate(value.price, currencyDefault, currencyRate))}
                                {currencyRate ? currencyRate[0] : currencyDefault[0]}</p>
                        </div>
                        <div className="controls">
                            <div className="input-group">

                                <input type="text" className="form-control input-sm" placeholder="Qty"
                                    value={t("quantity") + ": " + value.quantity}
                                    style={{ color: 'black', }}
                                    readOnly
                                />

                            </div>{/* /input-group */}
                            <a href='#removeCart' style={{ cursor: 'pointer' }} onClick={() => this.removeProductNew(dataCart, key)} > <i className="ion-trash-b" /> {t("delete")} </a>
                        </div>
                    </div>



                )

            })
        }

    }




    isShow = () => {

        return (


            <div className='cart'
                data-toggle='inactive'
                style={{ zIndex: 100000 }}>
                <div className="label">
                    <i className="ion-bag" >
                        <span></span>
                        {this.state.totalProductCart}</i>
                </div>
                <div className="overlay" />
                <div className="window">
                    <div className="title">
                        <button type="button" className="close"><i className="ion-android-close" /></button>
                        <h4>{t("cart")}
                            <span style={{ marginLeft: '10px' }}><i onClick={() => this.refresh()} style={{ cursor: 'pointer' }} title='refresh' className="fa fa-refresh" aria-hidden="true" /></span>
                        </h4>
                    </div>
                    <div id='content-cart' className="content">
                        {
                            this.cartProduct()
                        }

                    </div>
                    <PopUpCheckout />
                </div>
            </div>
        )
    }
    render() {
        // console.log('cart_product', this.props.cart_product);
        return (
            <Fragment>

                {this.isShow()}

            </Fragment>


        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        cart_add_status: state.cart_add_status,
        status_login: state.status_login,
        statuCartCheckout: state.statuCartCheckout,
        currencyDefault: state.currencyDefault,
        currencyRate: state.currencyRate,
        languageValue: state.languageValue
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {

        CART_ADD_STATUS: (cart_add_status) => {
            dispatch({ type: 'cart_add_status', cart_add_status })
        },
        is_status_login: (log_customer_act) => {
            dispatch({ type: 'is_status_login', log_customer_act })
        },
        StatusUpdateCartCheckout: (act_statusCartCheckout) => {
            dispatch({ type: 'status_updateCart_Checkout', act_statusCartCheckout })
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CartProduct)
