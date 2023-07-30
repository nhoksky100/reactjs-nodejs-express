import React, { Component, Fragment } from 'react';
import axios from 'axios';

import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { randomId } from '../../adminManager/RandomId/randomId';

import CheckOutPaypal from './CheckOutPaypal';
import { SendEmailCheckout } from '../../SendEmail/SendEmailCheckout';
import { t } from 'i18next';
import { Redirect } from 'react-router-dom/cjs/react-router-dom';
import { ExChangeRate } from '../HeaderTop/ExChangeRate';
import { FormatNumber } from '../../FormatNumber';




// import Pay from './Pay';
// const typingtimeoutRef = createRef(null);
class CheckOut extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusCheckOut: false,
            //value form
            fullname: '', email: '', phone: '', address: '', city: '', state: ' ', zip: ' ',
            //check payment
            statusPayment: false,

        }
    }
    componentDidMount() {
        var tokenId = localStorage.getItem('tokenIdCustomer')
        var profile = JSON.parse(localStorage.getItem('tokenProfileCustomer'))

        if (tokenId && profile) {

            this.setState({
                fullname: profile.name,
                email: profile.email

            })
        }

    }

    onChangeValue = (e) => {
        // if (typingtimeoutRef.current) {
        //     clearTimeout(typingtimeoutRef.current)
        // }
        var value = e.target.value;
        var name = e.target.name;
        // typingtimeoutRef.current = setTimeout(() => {
        this.setState({ [name]: value })
        // }, 300);
    }
    // // change auto map
    // handleInputChange = (event) => {
    //     const value = event.target.value;
    //     this.setState({ inputValue: value });

    //     // Gửi yêu cầu tới API khi người dùng nhập vào ô tìm kiếm
    //     axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&types=restaurant&name=harbour&key=AIzaSyCMST7WB3_rS_kPKqvjqnDry-nUrgN5bd4`)
    //         .then((response) => {
    //             // Xử lý kết quả trả về từ API và cập nhật state places
    //             this.setState({ places: response.data.results });
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    // };
    //checkbox 
    radioBeforePayment = () => {
        var dataCheckOut = this.dataCheckOut();
        if (dataCheckOut.length > 0) {


            var { address, city, phone, email } = this.state;
            if (address !== '' && city !== '' && phone !== '' && email !== '') {

                this.setState({ statusPayment: false })
            } else {
                toast(<div className="advertise"><i className="fa fa-exclamation-triangle" aria-hidden="true" />

                    <i>{t("please-fill-in-the-fields")}(*)!</i></div>)
            }
        } else {

            toast(<div className="advertise"><i className="fa fa-exclamation-triangle" aria-hidden="true" />

                <i>{t("cart-is-empty") + t("or") + t("update-order")}!</i></div>)
        }
    }
    radioPaypalPayment = () => {
        var dataCheckOut = this.dataCheckOut();
        if (dataCheckOut.length > 0) {
            var { address, city, phone, email } = this.state;
            if (address !== '' && city !== '' && phone !== '' && email !== '') {

                this.setState({ statusPayment: true })
            } else {
                toast(<div className="advertise"><i className="fa fa-exclamation-triangle" aria-hidden="true" />

                    <i>{t("please-fill-in-the-fields")}(*)!</i></div>)
            }
        } else {

            toast(<div className="advertise"><i className="fa fa-exclamation-triangle" aria-hidden="true" />

                <i>{t("cart-is-empty") + t("or") + t("update-order")}!</i></div>)
        }
    }

    // payment card 
    // paymentCardForm = () => {
    //     var { statusPayment } = this.state;

    //     if (statusPayment === false) {
    //         return (
    //             <div className="col-50">
    //                 <h3>Payment</h3>
    //                 <label htmlFor="fname">Accepted Cards</label>
    //                 <div className="icon-container">
    //                     {/* paypal */}
    //                     <CheckOutPaypal totalPrice={this.props.totalPrice} />
    //                     {/* <Pay totalPrice={this.props.totalPrice} /> */}
    //                     <i className="fa fa-cc-visa" style={{ color: 'navy' }} />
    //                     <i className="fa fa-cc-amex" style={{ color: 'blue' }} />
    //                     <i className="fa fa-cc-mastercard" style={{ color: 'red' }} />
    //                     <i className="fa fa-cc-discover" style={{ color: 'orange' }} />
    //                 </div>
    //                 <label htmlFor="cname">Name on Card</label>
    //                 <input onChange={(e) => this.onChangeValue(e)} type="text" id="cname" name="cardname" placeholder="John More Doe" />
    //                 <label htmlFor="ccnum">Credit card number</label>
    //                 <input onChange={(e) => this.onChangeValue(e)} type="text" id="ccnum" name="cardnumber" placeholder="1111-2222-3333-4444" />
    //                 <label htmlFor="expmonth">Exp Month</label>
    //                 <input onChange={(e) => this.onChangeValue(e)} type="text" id="expmonth" name="expmonth" placeholder="September" />
    //                 <div className="row">
    //                     <div className="col-50">
    //                         <label htmlFor="expyear">Exp Year</label>
    //                         <input onChange={(e) => this.onChangeValue(e)} type="text" id="expyear" name="expyear" placeholder={2021} />
    //                     </div>
    //                     <div className="col-50">
    //                         <label htmlFor="cvv">CVV</label>
    //                         <input onChange={(e) => this.onChangeValue(e)} type="text" id="cvv" name="cvv" placeholder={222} />
    //                     </div>
    //                 </div>
    //             </div>
    //         )
    //     }
    // }
    dataCheckOut = () => {
        var dataCheckOut = [];
        var { fullname, email, phone, address, city, state, zip, statusPayment } = this.state;

        var { profile, quantity, totalPrice, dataCart, note, currencyRate, currencyDefault } = this.props;

        for (let i = 0; i < dataCart.length; i++) {
            dataCheckOut[i] = {
                id: dataCart[i].productId,
                tradingCode: randomId(),
                emailCustomer: profile.email,
                nameCheckout: fullname,
                emailCheckout: email,
                phoneCheckout: phone,
                addressCheckout: address,
                city: city,
                state: state,
                zip: zip,
                image: dataCart[i].image,
                price: dataCart[i].price,
                totalPrice: totalPrice,
                totalPriceSingle: FormatNumber(
                    ExChangeRate(quantity[i] * dataCart[i].price,
                        currencyDefault, currencyRate
                    )
                ),
                currencyRate: currencyRate ? currencyRate[0] : currencyDefault[0],
                quantity: quantity[i],
                color: dataCart[i].color,
                note: note,
                productSizes: dataCart[i].productSizes,
                dayShipping: dataCart[i].dayShipping,
                productName: dataCart[i].productName,
                profile: profile.image,
                statusPayment: statusPayment,
                order: 'Chờ xử lý', //
                transaction: 'Chờ xử lý', // 
                statisticsKey: false, //
                dateTime: new Date()

            }

        }
        return dataCheckOut;

    }
    //check out
    checkOut = () => {
        var dataCheckOut = this.dataCheckOut();
        //code payment
        if (this.props.dataCart.length !== 0) {

            var { email, phone, address, city, statusPayment } = this.state;

            if (dataCheckOut) {
                setTimeout(() => {
                    //Delivery before payment
                    if ((email !== '' && phone !== '' && address !== '' && city !== '') &&
                        (email !== ' ' && phone !== ' ' && address !== ' ' && city !== ' ') && statusPayment === false) {
                        this.setState({ statusCheckOut: true })


                        var formality = 'Thanh toán sau khi nhận hàng', payment = false
                        axios.post('/checkout', { dataCheckOut, formality, payment }).then((res) => {

                            // send email
                            SendEmailCheckout(dataCheckOut);
                            toast(<div className="advertise"><i className="fa fa-exclamation-triangle" aria-hidden="true" />
                                <i>{t("order-success")}!</i></div>)
                            this.props.getDataCheckOut(dataCheckOut);
                            this.props.statusCloseCart(true)


                        })

                    }


                    else {
                        toast(<div className="advertise"><i className="fa fa-exclamation-triangle" aria-hidden="true" />

                            <i>{t("please-fill-in-the-fields")}(*)!</i></div>)
                    }
                }, 1500);
            }
        }// end if datacheckout
        else {
            toast(<div className="advertise"><i className="fa fa-exclamation-triangle" aria-hidden="true" />

                <i>{t("cart-is-empty")}!</i></div>)
        }

    }
    showForm = () => {
        var dataCheckOut = this.dataCheckOut();


        return (
            <div id='checkout'>
                <h1> {t("payments")}</h1>
                <div className="row">
                    <div className="col-75">
                        <div className="container">
                            <form action="/action_page.php">
                                <div className="row">
                                    <div className="col-50">
                                        <h3>{t("information-to-fill-in")}</h3>
                                        <label htmlFor="fname"><i className="fa fa-user" /> {t("first-and-last-name")}</label>
                                        <input onChange={(e) => this.onChangeValue(e)} type="text" id="fname" defaultValue={this.state.fullname} name="fullname" placeholder="Mr Adam" />

                                        <label htmlFor="email"><i className="fa fa-envelope" /> Email</label><span className='obligatory req'>*</span>
                                        <input onChange={(e) => this.onChangeValue(e)} type="text" id="email" name="email" defaultValue={this.state.email} />

                                        <label htmlFor="adr"><i className="fa fa-address-card-o" /> {t("address")}</label><span className='obligatory req'>*</span>
                                        <input onChange={(e) => this.onChangeValue(e)} type="text" id="adr" name="address" placeholder="542 W. 15th Street" />

                                        <label htmlFor="phone"><i className="fas fa-mobile-alt" /> {t("mobile-number")}</label><span className='obligatory req'>*</span>
                                        <input onChange={(e) => this.onChangeValue(e)} type="text" id="phone" name="phone" placeholder="+1 987..." />

                                        <label htmlFor="city"><i className="fa fa-institution" /> {t("city")}</label><span className='obligatory req'>*</span>
                                        <input onChange={(e) => this.onChangeValue(e)} type="text" id="city" name="city" placeholder="Lon Don" />


                                        <div className="row">
                                            <div className="col-50">
                                                <label htmlFor="state">State</label><span className='obligatory'></span>
                                                <input onChange={(e) => this.onChangeValue(e)} type="text" id="state" name="state" placeholder="NY" />
                                            </div>
                                            <div className="col-50">
                                                <label htmlFor="zip">Zip</label><span className='obligatory'></span>
                                                <input onChange={(e) => this.onChangeValue(e)} type="text" id="zip" name="zip" placeholder={10001} />
                                            </div>
                                        </div>
                                    </div>
                                    {/* {this.paymentCardForm()} */}
                                    {this.state.statusPayment

                                        ? (<CheckOutPaypal
                                            totalPrice={this.props.totalPrice}
                                            address={this.state.address}
                                            email={this.state.email}
                                            phone={this.state.phone}
                                            fullname={this.state.fullname}
                                            city={this.state.city}
                                            zip={this.state.zip}
                                            state={this.state.state}
                                            dataCheckOut={dataCheckOut}
                                        />)
                                        : ''
                                    }
                                </div>
                                <div className="row">

                                    <label className='sell-pre-delivery'>
                                        <input type="radio" name="sameadr" defaultChecked={!this.state.statusPayment} onClick={() => this.radioBeforePayment()} />
                                        {t("delivery-before")} {t("payment")}
                                    </label>
                                    <label className='sell-pre-delivery'>
                                        <input type="radio" name="sameadr" onClick={() => this.radioPaypalPayment()} />
                                        {t("payment")} Paypal
                                    </label>
                                </div>
                                <a href='#checkout' onClick={() => this.checkOut()}
                                    className={this.state.statusPayment ? 'btn btn-primary btn-lg disabled' : 'btn dredB'}>
                                    {t("payment")}
                                </a>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
    render() {

        if (this.state.statusCheckOut) {
            return <Redirect to="/success-checkout.html" />
        }
        return (
            <Fragment>
                {this.showForm()}
              
                {/* <LocationSearch /> */}
            </Fragment>

        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        languageValue: state.languageValue,
        currencyDefault: state.currencyDefault,
        currencyRate: state.currencyRate,
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
export default connect(mapStateToProps, mapDispatchToProps)(CheckOut)
