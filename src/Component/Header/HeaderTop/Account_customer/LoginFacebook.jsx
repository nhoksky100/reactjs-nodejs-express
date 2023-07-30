import React, { Component, Fragment } from 'react';
import FacebookLogin from 'react-facebook-login';
import Cookies from 'universal-cookie';
// import TiSocialFacebookCircular from 'react-icons/lib/ti/social-facebook-circular';
class LoginFacebook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false,
            checkLogin: false
        }
    }
    setCookie = (username, token) => {
        var cookie = new Cookies();
        var minutes = 1140; // 1140m 1 day

        var d = new Date();
        d.setTime(d.getTime() + (minutes * 60 * 1000));
        cookie.set(username, token, { path: "/", expires: d })
        var tokenLoginCustomer = cookie.get(username)
        localStorage.setItem('userCustomer', username)
        localStorage.setItem('tokenIdCustomer', tokenLoginCustomer)

    };

    responseFacebook = (response) => {
      
            if (response.status === 'unknown') {
                return response.status = 'connected'
            }
            if (response !== '' || response) {
                console.log(response);
                var tokenId = response.accessToken;
                var profileObj = {
                    id: tokenId,
                    email: response.email,
                    name: response.name,
                    image: response.picture.data.url,
                    expiresIn: response.expiresIn,
                    graphDomain: response.graphDomain,
                    dateTime: response.data_access_expiration_time

                }
                localStorage.setItem('tokenProfileCustomer', JSON.stringify(profileObj))
                this.setCookie('loginCustomer', tokenId)
                this.setState({ isLogin: true })
                window.location.reload()
            } else {
                this.setState({ isLogin: false })
            }
            return response
        
    }
   
    render() {
        return (
            <Fragment>
                {!this.state.isLogin &&
                    (< FacebookLogin
                        appId="764638158270001"
                        textButton='Facebook'
                        autoLoad={false}
                        fields="name,email,picture"
                        // onClick={this.componentClicked}
                        callback={this.responseFacebook}
                        cssClass="button-facebook"
                        icon="fa-facebook"
                    // isDisabled = {this.responseFacebook}

                    />)

                }
            </Fragment>
        );
    }
}

export default LoginFacebook;