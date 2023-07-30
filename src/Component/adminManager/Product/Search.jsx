import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { stringtoslug } from '../../stringtoslug.js';
import axios from 'axios';
const getDataCategory = () => axios.get('/getdata_category').then((res) => res.data)

// const typingtimeoutRef = createRef(null);
class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: '', selectSearch: '', selectDataCatagory: null,
        }
    }
    componentDidMount() {
        if (this.state.selectDataCatagory === null) {
            getDataCategory().then((res) => {
                if (res) {
                    this.setState({ selectDataCatagory: res })
                }
            })
        }

    }


    pushOption = (codeCatalog, catalog, pushName) => {
        var pushOption = []
        for (let i = 0; i < codeCatalog.length; i++) {
            if (codeCatalog[i].includes(catalog)) {
                pushOption.push(<option key={i} value={codeCatalog[i]}>{pushName[i]}</option>)
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
            })

            if (isCatalog) {
                for (let i = 0; i < pushCatalog.length; i++) {

                    PushcatalogOption.push(
                        <optgroup key={i} label={pushCatalog[i]}>
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
        //     clearTimeout(typingtimeoutRef.current)
        // }
        // typingtimeoutRef.current = setTimeout(() => {
        const name = event.target.name;
        const searchValue = event.target.value;

        var { dataProduct } = this.props;
        var pushItem = [];
        if (dataProduct !== null && name === 'searchValue') {
            this.FormClearSelect();
            dataProduct.map((value) => {
                if ((stringtoslug(value.productName).indexOf(searchValue) !== -1) ||
                    (value.productName.toUpperCase().indexOf(searchValue) !== -1) ||
                    (value.productName.indexOf(searchValue) !== -1) ||
                    (value.productName.toLowerCase().indexOf(searchValue) !== -1)) {
                    pushItem.push(value);
                }
                return dataProduct
            })
        }
        else if (dataProduct !== null && name === 'selectSearch') {

            this.FormClearValue();
            dataProduct.map((value) => {

                if (value.productCategory.indexOf(searchValue) !== -1) {
                    pushItem.push(value);

                }
                // if ((stringtoslug(value.product_category).includes(searchValue)) ||
                //     (value.product_category.toUpperCase().includes(searchValue)) ||
                //     (value.product_category.includes(searchValue) ) ||
                //     (value.product_category.toLowerCase().includes(searchValue))) {
                //     pushItem.push(value);
                // }
                return dataProduct
            })
        }

        this.props.Search_value(pushItem);

        // }, 300);
    }
    //clear
    FormClearSelect = () => {
        this.refs.selectSearch.value = ""; //clear select affter click 
    }

    FormClearValue = () => {
        this.refs.searchValue.value = "";    // clear value input affter click
    }

    searchForm = () => {

        return (
            <div className="hm-searchbox" id='form_link'>
                <select onChange={(event) => this.searchValue(event)} defaultValue={' '} name='selectSearch' ref='selectSearch' className="nice-select select-search-category">
                    <option value={''}>--Tìm thể loại--</option>
                    {this.categorySelect()}


                </select>
                <input onChange={(event) => this.searchValue(event)} name='searchValue' type="text" ref="searchValue" placeholder="Tìm kiếm tên sản phẩm..." />


            </div>
        )

    }
    render() {

        return (

            <Fragment>
                {this.searchForm()}

            </Fragment>


        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        searchValue: state.searchValue

    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        Search_value: (Search_value_ac) => {
            dispatch({ type: 'search_value', Search_value_ac })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Search);
