import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import SuccessCheckOut from './SuccessCheckOut';
import ViewFullCartCheckOut from './ViewFullCartCheckOut';
import { t } from 'i18next';

class PopUpCheckout extends Component {
    //popup status
    constructor(props) {
        super(props);
        this.state = {
            // popup checkout
            depth: '',
            fade: '',
            statusFade: false,
        }
    }

    closePopUp() {
        this.setState({
            statusFade: false,
            depth: 'above',
        })

    }
    openPopUp() {
        if (localStorage.getItem('tokenProfileCustomer')) {
            this.setState({
                depth: 'below',
                statusFade: true,


            });
            this.props.StatusUpdateCartCheckout(true);
        } else {

            toast(<div className="advertise"><i className="fa fa-exclamation-triangle" aria-hidden="true" />
                <i>{t("sign-in-to-buy-products")}!</i></div>)
        }

    }
    render() {
        return (
            <div className='container'>

                <div className='row'>

                    <div className="minicart-button ">

                        {/* <NavLink to="/view-full-cart-check-out.html" className="li-button li-button-fullwidth block">
                        <span>Checkout</span>
                    </NavLink> */}

                        <a href='#Popup' id={this.state.depth} onClick={() => this.openPopUp()} style={{ cursor: 'pointer' }} className=" li-button li-button-fullwidth block ">
                            <span>{t("checkout")}</span></a>
                        <div id='pop-container' className='container'>


                            <section id="pop-up-checkout"
                                className={
                                    this.state.statusFade
                                        ? 'animate-in pop-scroll' : 'animate-out'
                                }>
                                <div id="inner-pop-up"

                                    className={
                                        this.state.statusFade
                                            ? 'fade-in' : 'fade-out'
                                    }>
                                    <span className="close-popup" onClick={() => this.closePopUp()}>X</span>

                                    {this.props.statusCloseCart ?
                                        <SuccessCheckOut /> : <ViewFullCartCheckOut />
                                    }
                                </div>
                            </section>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {

        statusCloseCart: state.statusCloseCart,
        languageValue: state.languageValue

    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        StatusUpdateCartCheckout: (act_statusCartCheckout) => {
            dispatch({ type: 'status_updateCart_Checkout', act_statusCartCheckout })
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PopUpCheckout)
