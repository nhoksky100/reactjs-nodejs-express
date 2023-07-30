import React, { Component, Fragment } from 'react';
import { PayPalScriptProvider, PayPalButtons, } from '@paypal/react-paypal-js';
import { toast } from 'react-toastify';
import axios from 'axios';
import { connect } from 'react-redux';
import { t } from 'i18next';
import { SendEmailCheckout } from '../../SendEmail/SendEmailCheckout';

class CheckOutPaypal extends Component {
    checkout = () => {
        var { address = '', fullname = '', city = '', state = '', zip = '', totalPrice, dataCheckOut, currencyDefault, } = this.props;
        // set price vnd to usd ;
        // var totalPrice = this.props.totalPrice;
        // console.log(dataCheckOut[1].totalPriceSingle);



       
        totalPrice /= currencyDefault[1]; // rate vnd default

        var setPrice = totalPrice.toFixed(2);

        var currency = "USD"; //currencyDefault usd
        var profile = JSON.parse(localStorage.getItem('tokenProfileCustomer'))

        return (
            <div className='container'>
                <PayPalScriptProvider deferScript={true} options={{ "client-id": "AY6B8RkpC-Df2ULO4-uzYaz8-nuP2ZA67z6pBxj36uFnRiknopbIme0qLoxBr7BXzAUHjqKSt2H8sMGt" }} >
                    {/* login text checkoutpaypal: email: sb-0ctrr1585134-1@personal.example.com : paswaord : checkout */}
                    <a href='#isPaypal'
                        className={
                            totalPrice ?
                                'btn btn-primary btn-lg'
                                : 'btn btn-primary btn-lg disabled'
                        }
                    >

                        <PayPalButtons
                            // Xử lý tạo order
                            //  style={{ layout: "horizontal", }}
                            createOrder={(data, actions) => {

                                return actions.order.create({

                                    purchase_units: [
                                        {
                                            amount: {
                                                currency: currency,
                                                value: setPrice,


                                            },

                                            "shipping": {
                                                "name": {
                                                    "full_name": profile.name ? profile.name : fullname,
                                                },
                                                "address": {
                                                    "address_line_1": address,
                                                    "admin_area_2": city,
                                                    "admin_area_1": state,
                                                    "postal_code": zip,
                                                    "country_code": "VN"
                                                }
                                            }
                                        }
                                    ]
                                });


                            }}

                            // Xử lý khi giao dịch được xác nhận
                            onApprove={(data, actions) => {
                                return actions.order.capture().then((details) => {
                                    var formality = 'PayPal';
                                    var payment = true;
                                    axios.post('/checkout', { dataCheckOut, formality, payment }).then((res) => {
                                        this.props.getDataCheckOut(dataCheckOut);
                                        this.props.statusCloseCart(true)
                                        SendEmailCheckout(dataCheckOut);
                                        toast(
                                            <div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" />
                                                <i>{t("order-success")}</i>
                                            </div>
                                        )
                                        

                                    })
                                    // const fullnamePP = profile.name ? profile.name : profile.email;
                                    //  const name = details.payer.name.given_name;

                                    // alert(`Transaction completed by ${fullnamePP}`);

                                });

                            }}
                            onCancel={(data) => {
                                toast(
                                    <div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" />
                                        <i>{t("transaction-failed")}</i>
                                    </div>
                                )
                                // Xử lý khi giao dịch bị hủy
                            }}
                        />

                    </a>
                </PayPalScriptProvider>
            </div>
        )




    }



    render() {


        return (
            <Fragment>
                {this.checkout()}

            </Fragment>
        );

    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        languageValue: state.languageValue,
        currencyDefault: state.currencyDefault,
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getDataCheckOut: (act_data_checkout) => {
            dispatch({ type: 'datacheckout', act_data_checkout })
        },
        statusCloseCart: (act_status_close_cart) => {
            dispatch({ type: 'statusclosecart', act_status_close_cart })
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CheckOutPaypal)
