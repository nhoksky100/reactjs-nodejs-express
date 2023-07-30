// import axios from 'axios';
import React, { Component } from 'react';
// import { NavLink } from 'react-router-dom';
import AccountCustomer from './Account_customer/AccountCustomer';
import Cookies from 'universal-cookie';

// import LoginGoogle from './Account_customer/LoginGoogle';
// import LoginFacebook from './Account_customer/LoginFacebook';
import LoginForm from './LoginForm';
import CurrencyForm from './CurrencyForm';
import LanguageForm from './LanguageForm';


// const getDataAccountCustomer = () => axios.get('/account_customer').then((res) => res.data)




class HeaderTop extends Component {

    LoginAccountStatus = () => {

        var cookie = new Cookies();
        var userCustomer = localStorage.getItem('userCustomer');
        const tokenIdCustomer = cookie.get(userCustomer);
        if (tokenIdCustomer) {
            var proFile = JSON.parse(localStorage.getItem('tokenProfileCustomer'))

            return <AccountCustomer proFile={proFile} />
        }

        else {

            localStorage.removeItem('tokenProfileCustomer');
            localStorage.removeItem('tokenIdCustomer');
            localStorage.removeItem('userCustomer');
            return this.iShow();
        }
    }

    iShow = () => {
        return (


            <LoginForm />

        )
    }
    render() {
        return (
           


                <div className="header-top">
                    <div className="container">
                        <div className="row">

                        
                           
                                <div className="header-top-right">
                                    <ul className="ht-menu">
                                        <li>
                                            {/* Language */}
                                            <LanguageForm />
                                        </li>


                                        <li>
                                            {/* Currency */}
                                            <CurrencyForm />
                                        </li>

                                        <li className='li-last' style={{ marginLeft: '20px' }}>
                                            {this.LoginAccountStatus()}
                                        </li>

                                    </ul>
                                </div>
                           

                        </div>
                    </div>
                </div>
        );
    }
}
export default HeaderTop
