import React, { Component, Fragment } from 'react';

import { toast } from 'react-toastify';

import { connect } from 'react-redux';
import { t } from 'i18next';
// import { Trans } from 'react-i18next';

class CurrencyForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataTagCurrencyCode: []
        }



    }

    componentDidMount() {

        this.displayCurrency();

    }

    isChange = (e) => {
        var value = e.target.value;
        // var name = e.target.name;
        // console.log(value);
        value = value.split(',')
        this.props.getCurrencyRate(value);
        this.setState({ rateDefault: value })
    }
    // handleChange(event) {
    //     const target = event.target;
    //     const value = target.value;
    //     const name = target.name;

    //     // add `...state` to avoid remove all your previous information
    //     this.setState({ [name]: value });
    // };


    // Currency api view 
    displayCurrency = () => {
        try {
            // const baseFlagsUrl = "https://wise.com/public-resources/assets/flags/rectangle";
            const currencyApiUrl = "https://open.er-api.com/v6/latest";

            const pushOption = [];


            fetch(currencyApiUrl).then(data => data.json())

                .then((data) => {

                    const entries = Object.entries(data.rates);

                    entries.forEach((item, key) => {
                        pushOption.push(<option key={key} value={item}>{item[0]}</option>)

                        if (item[0] === 'VND') {
                            // get rate vnd default
                            this.setState({ rateDefault: item })

                            this.props.getCurrencyDefault(item)
                        }
                    })
                    this.setState({ dataTagCurrencyCode: pushOption })
                })
        }
        catch (error) {

            toast(<div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" />
                <i> {t("disconnect")}!:{error}</i></div>);
        }

    }

    render() {


        return (
            <div id='form-currency ' className="selector-wrapper">
                {/* <Trans i18nKey="translation" count={this.props.languageValue} > */}
            {/* <div id='form-currency'> */}

            
                <span className="currency-selector-wrapper">{t("currency")} :</span>
                <div style={{display:'-webkit-inline-flex'}} className='div-currency'>

                    <select onChange={(e) => this.isChange(e)} value={this.state.rateDefault} name='currency' className='currency'>
                        {this.state.dataTagCurrencyCode}
                    </select>
                </div>
               
                {/* </Trans> */}
                {/* </div> */}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        languageValue: state.languageValue,
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
export default connect(mapStateToProps, mapDispatchToProps)(CurrencyForm)
