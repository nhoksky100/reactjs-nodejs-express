import { t } from 'i18next';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
// import { GoogleLogin, GoogleLogout } from 'react-google-login';

class AccountCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            position: 0
        }
    }


    logOut = () => {
       
        localStorage.removeItem('tokenOutCustomer')
        // localStorage.removeItem('ID_customer')
        localStorage.removeItem('data_customer')
        // localStorage.removeItem('email_customer')
        localStorage.removeItem('loginCustomerToken');
        localStorage.removeItem('loginCustomerEmail');

        localStorage.removeItem('tokenProfileCustomer');
        localStorage.removeItem('userCustomer');
        localStorage.removeItem('tokenIdCustomer');
       
        window.location.reload()
        // this.props.is_status_login();

    }

    // componentDidMount() {
    //     setTimeout(() => {

    //         return this.props.is_status_login();

    //     }, 10000)
    // }

    render() {
        var { proFile } = this.props;
        return (

            <div className="dropdown customer">
                <span className='' style={{ marginLeft: '35px', paddingRight: '15px' }}>{t("welcom")}: </span>
                <span className="btn  dropdown-toggle hv" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                    aria-expanded="false">

                    <span style={{cursor:'pointer',fontSize:'16px'}} className='icon_customer'>
                        {
                            proFile.email ? proFile.email : proFile.name
                        }
                        <ion-icon name="caret-down-outline" /> </span>
                  
                </span>

                <ul className="dropdown-menu acti_drop_m" aria-labelledby="dropdownMenuButton">
                    <li>  <NavLink to='/customer-follow-orders-well.html' className="dropdown-item">{t("follow-up-on-delivery")}</NavLink></li>

                    <li> <NavLink className="dropdown-item" to="/Contact">{t("send-support")}</NavLink></li>
                    {/* <h6 className="dropdown-header">{t("logout")}</h6> */}
                    <li onClick={() => this.logOut()}>  <a href='#logout'  className="dropdown-item" style={{ cursor: 'pointer' }} >{t("logout")}</a></li>

                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        status_login: state.status_login,
        languageValue: state.languageValue,
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {

        is_status_login: (log_customer_act) => {
            dispatch({ type: 'is_status_login', log_customer_act })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AccountCustomer)
