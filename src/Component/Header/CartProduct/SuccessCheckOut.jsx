import { t } from 'i18next';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';

class successCheckOut extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: {}, seconds: 30
        }
        this.timer = 30;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
    }
    componentDidMount() {

        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({ time: timeLeftVar });

    }

    startTimer() {
        if (this.timer === 30 && this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }

    }
    secondsToTime(secs) {
        let hours = Math.floor(secs / (60 * 60));

        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);

        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);

        let obj = {
            // "h": hours,
            // "m": minutes,
            "s": seconds
        };
        return obj;
    }
    countDown() {
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds - 1;
        this.setState({
            time: this.secondsToTime(seconds),
            seconds: seconds,
        });

        // Check if we're at zero.
        if (seconds === 0) {
            clearInterval(this.timer);
            this.props.statusCloseCart(false)
        }
    }
    showForm = () => {

        var { senDataCheckout } = this.props;
        // console.log(dataCheckout);
        var profile = JSON.parse(localStorage.getItem('tokenProfileCustomer'));

        if (senDataCheckout.length > 0) {

            return (
                <div className='row'>
                    <div id='success-checkout'>
                        <img style={{ marginLeft: '50%' }} src="https://img.icons8.com/color/50/000000/checked-2.png" alt='' />
                        <p style={{ color: 'green' }}>{t("order-success")},
                            {t("your-order-will-be-shipped-within") + senDataCheckout[0].dayShipping} !</p>
                        <p style={{ color: 'black' }}>{t("you-can-check-your-email-to-see-the-progress")}: <span style={{ color: 'yellow' }}>
                            {profile.email !== ''
                                ? profile.email : ''
                            }
                        </span > {t("or-click-here-to")}: <NavLink to='/customer-follow-orders-well.html'><i>{t("see-progress")}</i></NavLink>. <br />
                            <span style={{ color: 'black' }}>{t("code-orders")}: <i style={{ color: 'blueviolet' }}>{senDataCheckout[0].tradingCode}</i> </span>
                        </p>
                        <div className="container ">

                            <span id='timerStar'>{this.startTimer()}</span>
                            <span>{this.state.time.s}</span>

                        </div>

                    </div >
                </div>
            )
        } else {
            return <Redirect to='/store' />
        }

    }
    render() {

        return (
            <div className='container' >
                {this.showForm()}
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        senDataCheckout: state.senDataCheckout,
        languageValue: state.languageValue,
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        statusCloseCart: (act_status_close_cart) => {
            dispatch({ type: 'statusclosecart', act_status_close_cart })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(successCheckOut)
