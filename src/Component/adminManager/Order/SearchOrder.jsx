import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { stringtoslug } from '../../stringtoslug.js';


// const typingtimeoutRef = createRef(null);
class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: '', selectSearch: ''
        }
    }




    searchValue = (event) => {

        // if (typingtimeoutRef.current) {
        // clearTimeout(typingtimeoutRef.current)
        // }
        // typingtimeoutRef.current = setTimeout(() => {
        var name = event.target.name;
        var searchValue = event.target.value;


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
                else if ((stringtoslug(value.id).indexOf(searchValue) !== -1) ||
                    (value.id.toUpperCase().indexOf(searchValue) !== -1) ||
                    (value.id.indexOf(searchValue) !== -1) ||
                    (value.id.toLowerCase().indexOf(searchValue) !== -1)) {
                    pushItem.push(value);

                }
                else if ((stringtoslug(value.tradingCode).indexOf(searchValue) !== -1) ||
                    (value.tradingCode.toUpperCase().indexOf(searchValue) !== -1) ||
                    (value.tradingCode.indexOf(searchValue) !== -1) ||
                    (value.tradingCode.toLowerCase().indexOf(searchValue) !== -1)) {
                    pushItem.push(value);

                }
                //    dateTime


                // var day = value.dateTime.filter((item)=> new Date(item.dateTime) - dateTimeStart > 0)


                return dataProduct

            })
        }
        else if (dataProduct !== null && name === 'selectSearch') {
            this.FormClearValue();
            dataProduct.map((value) => {
                // order?
                if ((stringtoslug(value.order).indexOf(searchValue) !== -1) ||
                    (value.order.toUpperCase().indexOf(searchValue) !== -1) ||
                    (value.order.indexOf(searchValue) !== -1) ||
                    (value.order.toLowerCase().indexOf(searchValue) !== -1)) {

                    pushItem.push(value);

                }
                // transaction?
                else if ((stringtoslug(value.transaction).indexOf(searchValue) !== -1) ||
                    (value.transaction.toUpperCase().indexOf(searchValue) !== -1) ||
                    (value.transaction.indexOf(searchValue) !== -1) ||
                    (value.transaction.toLowerCase().indexOf(searchValue) !== -1)) {

                    pushItem.push(value);

                }
                // payment?
                else if ((stringtoslug(value.payment).indexOf(searchValue) !== -1) ||
                    (value.payment.toUpperCase().indexOf(searchValue) !== -1) ||
                    (value.payment.indexOf(searchValue) !== -1) ||
                    (value.payment.toLowerCase().indexOf(searchValue) !== -1)) {

                    pushItem.push(value);

                }
                return dataProduct

            })
        }



        this.props.Search_value(pushItem);
        return pushItem

        // }, 300);
    }
    //clear
    FormClearSelect = () => {
        this.refs.selectSearch.value = ""; //clear select affter click
        this.props.Search_value("");
    }

    FormClearValue = () => {
        this.refs.searchValue.value = "";    // clear value input affter click
        this.props.Search_value("");
    }

    searchForm = () => {
        return (
            <Fragment>


                <form className="hm-searchbox" id='form_link'>
                    <select onChange={(event) => this.searchValue(event)} defaultValue={' '} name='selectSearch' ref='selectSearch' className="nice-select select-search-category">
                        <option value={''}>--Tìm--</option>
                        <optgroup label='Đơn hàng'>
                            <option value={'Chờ xử lý'}>Chờ xử lý</option>
                            <option value={'Đã gửi hàng'}>Đã gửi hàng</option>
                            <option value={'Hủy bỏ'}>Hủy bỏ</option>

                        </optgroup >
                        <optgroup label='Giao dịch'>
                            <option value={'Chờ xử lý'}>Chờ xử lý</option>
                            <option value={'Thành công'}>Thành công</option>
                            <option value={'Hủy bỏ'}>Hủy bỏ</option>
                        </optgroup >
                        <optgroup label='Tình trạng'>
                            <option value={'chưa thanh toán'}>Chưa thanh toán</option>
                            <option value={'đã thanh toán'}>Đã thanh toán</option>

                        </optgroup >


                    </select>
                    <input onChange={(event) => this.searchValue(event)} name='searchValue' type="text" ref="searchValue" placeholder="Tìm kiếm theo tên sản phẩm, mã..." />

                </form>
                {/* <FilterTime /> */}
            </Fragment>
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
        searchValue: state.searchValue,
        dateTimeStart: state.dateTimeStart,
        dateTimeEnd: state.dateTimeEnd,

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
