import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { stringtoslug } from '../../stringtoslug';
import axios from 'axios';
import { t } from 'i18next';
// import { Trans } from 'react-i18next';
const getDataProduct = () => axios.get('/getdata_product').then((res) => res.data)
const getDataCategory = () => axios.get('/getdata_category').then((res) => res.data)
// const typingtimeoutRef = createRef(null);
class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProduct: null,
            // search_status_all: false, search_status_one: false
            searchValue: '', selectSearch: '', isSearchValue: false,
            dataSearch: [],
            selectDataCatagory: null,
        }
    }
    componentDidMount() {


        getDataProduct().then((res) => {

            this.setState({ dataProduct: res })
        })
        // select search 
        if (this.state.selectDataCatagory === null) {
            getDataCategory().then((res) => {
                this.setState({ selectDataCatagory: res })
            })
        }


    }


    pushOption = (codeCatalog, catalog, pushName) => {
        var pushOption = []
        for (let i = 0; i < codeCatalog.length; i++) {
            if (codeCatalog[i].includes(catalog)) {
                pushOption.push(<option className='opt-pointer' key={i} value={codeCatalog[i]}>{pushName[i]}</option>)
            }
        }
        return pushOption
        // console.log(value,'value');
    }
    // category
    categorySelect = () => {
        var { selectDataCatagory } = this.state
        var isPushcatalog = [], PushcatalogOption = [], pushcodeName = [], pushCatalog = [], isCatalog = false, pushName = []

        if (selectDataCatagory) {
            selectDataCatagory.reverse()
            selectDataCatagory.sort((a, b) => parseInt(a.catalog) - parseInt(b.catalog)).reverse()
            selectDataCatagory.map((value, key) => {
                isPushcatalog.push(value.catalog)
                pushcodeName.push(value.codeCatalog)
                pushName.push(value.name)
                for (let j = 0; j <= key; j++) {

                    if (value.catalog === isPushcatalog[j + 1]) {
                        if (pushCatalog.includes(value.catalog)) { // check duplicate in array

                            break
                        } else {
                            pushCatalog.push(value.catalog)
                            isCatalog = true
                        }

                    }

                }
                return selectDataCatagory
            })

            if (isCatalog) {
                for (let i = 0; i < pushCatalog.length; i++) {

                    PushcatalogOption.push(
                        <optgroup key={i} label={t(pushCatalog[i].toLocaleLowerCase())}>
                            {this.pushOption(pushcodeName, pushCatalog[i], pushName)}

                        </optgroup>
                    )


                }
            }

        }
        return PushcatalogOption
    }


    searchValue = (event) => {

        // if (typingtimeoutRef.current) {
        // clearTimeout(typingtimeoutRef.current)
        // }

        // typingtimeoutRef.current = setTimeout(() => {
        var name = event.target.name;
        var searchValue = event.target.value;

        var pushItem = [];
        var { dataProduct } = this.state;
        if (dataProduct) {

            dataProduct.map((value) => {
                if (name === 'searchValue') {
                    if ((stringtoslug(value.productName).indexOf(searchValue) !== -1) ||
                        (value.productName.toUpperCase().indexOf(searchValue) !== -1) ||
                        (value.productName.indexOf(searchValue) !== -1) ||
                        (value.productName.toLowerCase().indexOf(searchValue) !== -1)) {
                        pushItem.push(value);

                    }
                }
                else if (name === 'selectSearch' && searchValue === 'All') {
                    pushItem.push(value);

                }
                else if (name === 'selectSearch') {

                    if ((stringtoslug(value.productCategory).indexOf(searchValue) !== -1) ||
                        (value.productCategory.toUpperCase().indexOf(searchValue) !== -1) ||
                        (value.productCategory.indexOf(searchValue) !== -1) ||
                        (value.productCategory.toLowerCase().indexOf(searchValue) !== -1)) {
                        pushItem.push(value);
                    }
                }

                return dataProduct
            })
        }

        this.setState({ dataSearch: pushItem });
        // }, 300);



    }



    //enter
    keyup = (e) => {
        if (e.keyCode === 13) {
            this.setState({ isSearchValue: true })
            return this.searchClick();
        }
    }
    searchClick = () => {
        this.formClear();

        var dataSearchValue = this.state.dataSearch;

        this.props.Search_value_status(true);
        // this.props.Select_search(dataSelectSearch)
        this.props.Search_value(dataSearchValue);

        sessionStorage.setItem('SearchValue', JSON.stringify(dataSearchValue))
        // sessionStorage.setItem('SelectSearch', JSON.stringify(dataSelectSearch))
    }

    formClear = () => {
        this.refs.searchValue.value = "";    // clear value input affter click
        this.refs.selectSearch.value = ""; //clear select affter click 

    }

    searchForm = () => {
        return (

            <div className="hm-searchbox row" id='form_link'>

                <select onChange={(event) => this.searchValue(event)} defaultValue={' '} name='selectSearch' ref='selectSearch' className="nice-select select-search-category">
                    <option className='opt-pointer' value={''}>--{t("select")}--</option>
                    <option className='opt-pointer' value={"All"}>{t("all")}</option>
                    {this.categorySelect()}

                </select>
                {/* <Trans i18nKey="translation" count={this.props.languageValue} > */}
                <input onKeyUp={(e) => this.keyup(e)} onChange={(event) => this.searchValue(event)} name='searchValue' type="text" ref="searchValue"
                    placeholder={t("search-enter-your-search-key")} />
                {/* </Trans> */}
                <NavLink to='/search-product.html' onClick={() => this.searchClick()} name='searchValueClick' id='search_form' ref="searchValueClick"
                    className="li-btn"><i className="fa fa-search" />
                </NavLink>
            </div>

        )

    }
    render() {

        return (

            <div id='search-product' className='search-sm search-lg'>
                {this.searchForm()}
               
            </div>


        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {

        search_value_status: state.search_value_status,
        search_value: state.search_value,
        languageValue: state.languageValue

    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        Select_search: (Search_act) => {
            dispatch({ type: 'select_search', Search_act })
        },
        Search_value_status: (Search_value_status_ac) => {
            dispatch({ type: 'search_value_status', Search_value_status_ac })
        },
        Search_value: (Search_value_ac) => {
            dispatch({ type: 'search_value', Search_value_ac })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Search);
