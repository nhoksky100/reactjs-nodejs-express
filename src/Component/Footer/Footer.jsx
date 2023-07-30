import React, { Component, Fragment } from 'react';
import { t } from 'i18next';
// import { Trans } from 'react-i18next';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
// import { toast } from 'react-toastify';
import LanguageForm from '../Header/HeaderTop/LanguageForm';
import CurrencyForm from '../Header/HeaderTop/CurrencyForm';

class Footer extends Component {



    isChange = (e) => {
        var value = e.target.value;
        // var name = e.target.name;
        // console.log(value);
        value = value.split(',')
        this.props.getCurrencyRate(value);
        this.setState({ rateDefault: value })
    }
    isShow = () => {
        const pathname = window.location.pathname

        if (pathname.indexOf('/login-manager') === - 1 && pathname.indexOf('/admin') === -1 && this.props.isNotPage) {


            return (
                // <Trans i18nKey="translation" count={this.props.languageValue}>
                <div>
                    <hr className="offset-lg" />
                    <hr className="offset-sm" />
                    <footer>
                        <div className="about">
                            <div className="container">
                                <div className="row">
                                    <hr className="offset-md" />
                                    <div className="col-xs-6 col-sm-3">
                                        <div className="item">
                                            <i className="ion-ios-telephone-outline" />
                                            <h1>24/7<br /> <span>{t("footer-support")}</span></h1>
                                        </div>
                                    </div>
                                    <div className="col-xs-6 col-sm-3">
                                        <div className="item">
                                            <i className="ion-ios-star-outline" />
                                            <h1>{t("footer-price")} <br /> <span>{t("footer-guaranteed")}</span></h1>
                                        </div>
                                    </div>
                                    <div className="col-xs-6 col-sm-3">
                                        <div className="item">
                                            <i className="ion-ios-gear-outline" />
                                            <h1> {t("footer-products")} <br /> <span>{t("footer-guaranteed")}</span></h1>
                                        </div>
                                    </div>
                                    <div className="col-xs-6 col-sm-3">
                                        <div className="item">
                                            <i className="ion-ios-loop" />
                                            <h1>{t("footer-full-refund")} <br /> <span>{t("footer-guaranteed")}</span> </h1>
                                        </div>
                                    </div>
                                    <hr className="offset-md" />
                                </div>
                            </div>
                        </div>
                        <div className="subscribe">
                            <div className="container align-center">
                                <hr className="offset-md" />
                                <h1 className="h3 upp">{t("footer-join-the-newsletter")}</h1>
                                <p>{t("footer-get-more-information")}</p>
                                <hr className="offset-sm" />
                                <div className='formRow'>
                                    <div style={{ margin: '0 auto', width: '35%' }} className="input-group">
                                        <input type="email" name="email" defaultValue={''} placeholder="E-mail" required className="input-email-send" />
                                        <span className="input-group-btn SubscribeEmail">
                                            <button style={{ marginLeft: '35%' }} className="btn btn-primary ml15"> {t("footer-send")} <i className="ion-android-send" /> </button>
                                        </span>
                                    </div>{/* /input-group */}
                                </div>
                                <hr className="offset-lg" />
                                <hr className="offset-md" />
                                <div className="social">
                                    <a href="#facebook"><i className="ion-social-facebook" /></a>
                                    <a href="#twitter"><i className="ion-social-twitter" /></a>
                                    <a href="#googleplus"><i className="ion-social-googleplus-outline" /></a>
                                    <a href="#instagram"><i className="ion-social-instagram-outline" /></a>
                                    <a href="#linkedin"><i className="ion-social-linkedin-outline" /></a>
                                    <a href="#youtube"><i className="ion-social-youtube-outline" /></a>
                                </div>
                                <hr className="offset-md" />
                                <hr className="offset-md" />
                            </div>
                        </div>
                        <div className="container">
                            <hr className="offset-md" />
                            <div className="row menu">
                                <div className="col-sm-3 col-md-2">
                                    <h1 className="h4">{t("footer-information")} <i className="ion-plus-round hidden-sm hidden-md hidden-lg" /> </h1>
                                    <div className="list-group">
                                        <NavLink to='/blog' className="list-group-item">{t("footer-news")}</NavLink>
                                        <NavLink to='/pages' className="list-group-item">{t("footer-page-category")}</NavLink>
                                        <NavLink to='/store' className="list-group-item">{t("footer-order")}</NavLink>
                                        <NavLink to='/faq' className="list-group-item">{t("footer-transport")}</NavLink>
                                    </div>
                                </div>
                                <div className="col-sm-3 col-md-2">
                                    <h1 className="h4">{t("footer-products")} <i className="ion-plus-round hidden-sm hidden-md hidden-lg" /> </h1>
                                    <div className="list-group">
                                        <NavLink to='/store/laptop' className="list-group-item">{t("laptop")}</NavLink>
                                        <NavLink to='/store/tablet' className="list-group-item">{t("tablet")}</NavLink>
                                        <NavLink to="/store/smartphone" className='list-group-item'>{t("smartphone")}</NavLink>
                                        <NavLink to="/store/tvaudio" className='list-group-item'>{t("tv&audio")}</NavLink>
                                        <NavLink to="/store/smartwatch" className='list-group-item'>{t("smartwatch")}</NavLink>
                                        <NavLink to="/store/accessories" className='list-group-item'>{t("accessories")}</NavLink>

                                    </div>
                                </div>
                                <div className="col-sm-3 col-md-2">
                                    <h1 className="h4">{t("footer-support")} <i className="ion-plus-round hidden-sm hidden-md hidden-lg" /> </h1>
                                    <div className="list-group">

                                        <NavLink to="/faq" className="list-group-item">{t("faq")}</NavLink>
                                        <NavLink to="/contact" className="list-group-item">{t("contact")}</NavLink>
                                    </div>
                                </div>
                                <div className="col-sm-3 col-md-2">
                                    <h1 className="h4">{t("footer-location")}</h1>
                                    <LanguageForm />
                                    <hr className="offset-xs" />
                                    <CurrencyForm />

                                </div>
                                <div className="col-sm-3 col-md-3 col-md-offset-1 align-right hidden-sm hidden-xs">
                                    <h1 className="h4">Website Pro, Inc.</h1>
                                    <address>
                                        <br />Nha Trang Khanh Hoa<br />zipcode 650000<br />
                                        <abbr title="Phone">P:</abbr> (123) 456-7890
                                    </address>
                                    <address>
                                        <strong>{t("footer-support")}</strong><br />
                                        <a href="mailto:#">nhoksky100@gmail.com</a>
                                    </address>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-8 col-md-9 payments">
                                    <p>{t("footer-pay-your-orders-in-a-convenient-way")}</p>
                                    <div className="payment-icons">
                                        <img src="../assets/img/payments/paypal.svg" alt="paypal" />
                                        <img src="../assets/img/payments/visa.svg" alt="visa" />
                                    </div>
                                    <br />
                                </div>
                                <div className="col-sm-4 col-md-3 align-right align-center-xs">
                                    <hr className="offset-sm hidden-sm" />
                                    <hr className="offset-sm" />
                                    <p>Website Pro © 2023 <br /><i>{t("footer-designed-by-i-shop")}</i></p>
                                    <hr className="offset-lg visible-xs" />
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
                // </Trans>
            )
        }
    }

    render() {
        return (
            <Fragment>
                {this.isShow()}
            </Fragment>

        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        languageValue: state.languageValue,
        isNotPage: state.isNotPage
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {

        getCurrencyRate: (ac_currencyRate) => {
            dispatch({ type: 'currencyRate', ac_currencyRate })
        },
        getCurrencyDefault: (ac_currencyDefault) => {
            dispatch({ type: 'currencyDefault', ac_currencyDefault })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Footer)

