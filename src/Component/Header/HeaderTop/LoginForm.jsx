import React, { Component, Fragment } from 'react';
import LoginFacebook from './Account_customer/LoginFacebook';
import LoginGoogle from './Account_customer/LoginGoogle';
import { t } from 'i18next';

import { connect } from 'react-redux';



class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popupMenu: '',
            statusPopup: false
        }
    }

    handleClickForm = () => {
        this.setState({
            statusPopup: !this.state.statusPopup,
            popupMenu: 'popup-menu'
        })
    }
    loginForm = () => {
        return (
            <Fragment>
                <button className="popUpBtn custom-btn-login-customer btn-login-customer" data-modal="myModal1-login">{t("login")}</button>
                <div id="myModal1-login" className="modal">
                    {/* Modal content */}

                    <div className="modal-content">
                        <div className="modal-header">
                            <span className="close">×</span>
                            <h2>{t("login")}</h2>
                        </div>
                        <div className="modal-body login-modal">
                            <ul>

                                <li className='loginform'><LoginGoogle /></li>
                                <li className='loginform'><LoginFacebook /></li>
                            </ul>
                        </div>

                    </div>
                </div>
            </Fragment>
        )
    }
    render() {
        return (
            <div>
                {this.loginForm()}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        languageValue: state.languageValue
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
