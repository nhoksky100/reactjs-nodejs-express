import React, { Component, Fragment } from 'react';
import HeaderTop from './HeaderTop/HeaderTop';
import HeaderMenu from './HeaderMenu/HeaderMenu';
import HeaderMid from './HeaderMid/HeaderMid';
import HeaderMobileMenu from './HeaderMobileMenu';
import CartProduct from './CartProduct/CartProduct';
import { connect } from 'react-redux';
// import { t } from 'i18next';
// import { Trans } from 'react-i18next';
class Header extends Component {
    isShow = () => {
      var  pathname = window.location.pathname
        
      
        if (pathname.indexOf('/admin') === -1 && pathname.indexOf('/login-manager') === -1 && this.props.isNotPage){
           
            return (
                <Fragment>
                    <HeaderTop/>
                    <HeaderMid />
                    <HeaderMenu />

                    <HeaderMobileMenu />
                    <CartProduct />
                </Fragment>
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
        // languageValue: state.languageValue
        isNotPage: state.isNotPage
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)
