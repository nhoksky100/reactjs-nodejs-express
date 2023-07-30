import React, { Component, Fragment } from 'react';
import { GoogleLogin } from 'react-google-login';
import Cookies from 'universal-cookie';
class LoginCusTomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusLogin: false
        }
    }
    componentDidMount() {
        var cookie = new Cookies();
        var username = localStorage.getItem('tokenProfileCustomer');
        var tokenIdCustomerCookie = cookie.get(username)
        if (tokenIdCustomerCookie) {
            this.setState({ statusLogin: true })
        }
    }
    setCookie = (username, token) => {
        var cookie = new Cookies();
        var minutes = 1140; // 1140m 1 day

        var d = new Date();
        d.setTime(d.getTime() + (minutes * 60 * 1000));
        cookie.set(username, token, { path: "/", expires: d })
        var tokenLoginCustomer = cookie.get(username)

        localStorage.setItem('tokenIdCustomer', tokenLoginCustomer)
        localStorage.setItem('userCustomer', username)

    };

    responseGoogle = (response) => {


        if (response.profileObj) {
            // console.log(response.profileObj);
            // console.log(response);
            var tokenId = response.tokenId;
            var profileObj = {
                id: response.tokenId,
                email: response.profileObj.email,
                name: response.profileObj.name,
                image: response.profileObj.imageUrl,
                expiresIn: response.tokenObj.expires_in,
                expiresAt: response.tokenObj.expires_at,
                firstIssuedAt: response.tokenObj.first_issued_at,
                graphDomain: response.tokenObj.idpId,
                dateTime: response.data_access_expiration_time

            }



            localStorage.setItem('tokenProfileCustomer', JSON.stringify(profileObj))
            this.setCookie('loginCustomer', tokenId)
            this.setState({ statusLogin: true })

            window.location.reload()

        } else {
            this.setState({ statusLogin: false })
        }

    }

    render() {
        return (
            <Fragment>

                <GoogleLogin
                    clientId='588217232596-pufnbf116c5orf5l2vnbudhe2kqf3bou.apps.googleusercontent.com'
                    buttonText="Google"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />

            </Fragment>
        );
    }
}

export default LoginCusTomer;