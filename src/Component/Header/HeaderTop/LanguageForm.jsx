
import i18n, { t } from "i18next";
import React, { Component } from 'react';

import { connect } from "react-redux";

class LanguageForm extends Component {
    isChangeLanguage = (e) => {
        var languageValue = e.target.value
        i18n.changeLanguage(languageValue)
        if (languageValue === 'vn') {
            this.props.getLanguage(0)
        } else {
            this.props.getLanguage(1)
        }

    }

    render() {
        return (
            <div id="div-language" className="selector-wrapper">
                <span className="language-selector-wrapper ">{t("language")} :</span>
                <select onChange={(e) => this.isChangeLanguage(e)} style={{ width: 'auto', border: 'none', cursor: 'pointer' }} className="selectpicker" data-width="fit">
                    <option value={'vn'} data-content='<span className="flag-icon flag-icon-vn"></span> VietNam'>Tiếng Việt</option>
                    <option value={'en'} data-content='<span className="flag-icon flag-icon-us"></span> English'>English</option>
                </select>
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

        getLanguage: (ac_language) => {
            dispatch({ type: 'languageValue', ac_language })
        },

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LanguageForm)


