

import React, { Component } from 'react';

import axios from 'axios';
import { toast } from 'react-toastify';
import Pagination from "react-js-pagination";

import { FormatNumber } from '../../FormatNumber';
import FormtitleArea from '../titleAreaFrom/FormtitleArea.jsx';
import Search from './Search.jsx';
import { connect } from 'react-redux';
import { UpdateDateTime } from '../../UpdateDateTime';
import { SearchDateProduct } from '../Order/SearchDateProduct';
import FilterTime from '../Order/FilterTime';


const permissionMember = () => axios.get('/login_member_json').then((res) => res.data)

const getProduct = () => axios.get('/dataRecovery').then((res) => res.data)

class DataRecovery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProduct: null,
            dataPermission: null,
            isSearch: false,
            isRecoveryAll: false,
            dataTemp: null,
            productTotal: 0,
            isPermission: true,
            searchValueId: '',
            searchValueName: '',

            selectValue: '',
            //edit
            editStatus: false,
            //detail
            detailStatus: false,
            // pagination
            currentPage: 1,
            newsPerPage: 5, // show 5 product
            pageNumbers: [],

        }
    }

    componentDidMount() {

        this.dataPermission()
    }


    dataPermission = () => {
        if (!this.state.dataPermission) {
            permissionMember().then((res) => {
                if (res) {
                    if (res.permission === 'admin') {
                        if (this.state.dataProduct === null) {
                            var pushRes = [];
                            getProduct().then((res) => {
                                pushRes = res.reverse();
                                this.setState({
                                    dataProduct: pushRes,
                                    productTotal: res.length,
                                    dataTemp: pushRes,

                                })

                            })
                        }

                        if (sessionStorage.getItem('ID_product') === '' || sessionStorage.getItem('ID_product') === null) {
                            sessionStorage.setItem('ID_product', '')
                        }
                        this.setState({
                            dataPermission: res.permission,

                        })
                    } else {
                        this.setState({
                            isPermission: false
                        })
                    }
                }
            })
        }

    }

    currentTodos = () => {
        const { currentPage, newsPerPage } = this.state; // trang hiện tại acti  //cho trang tin tức mỗi trang
        const indexOfLastNews = currentPage * newsPerPage; // lấy vị trí cuối cùng của trang ,của data
        const indexOfFirstNews = indexOfLastNews - newsPerPage; // lấy vị trí đầu tiên  của trang ,của data
        return this.state.dataProduct.slice(indexOfFirstNews, indexOfLastNews); // lấy dữ liệu ban đầu và cuối gán cho các list
    }

    currentPageProduct = () => {

        if (this.state.dataProduct !== null && this.state.isPermission) {

            const currentTodos = this.currentTodos();

            // this.setState({ pageNumbers: pageNumbers })
            return currentTodos.map((value, key) => {
                return (
                    <tr className="row_9" key={key}>

                        {/* <td><input type="checkbox" name="id[]" defaultValue={value.id} /></td> */}
                        <td className="textC">{value.id}</td>
                        <td>
                            <div className="image_thumb">
                                <img src={value.productImage} height={50} alt='' />
                                <div className="clear" />
                            </div>
                            <span className="tipS" title={value.productName}>
                                <b>{value.productName}</b>
                            </span>
                            <div className="f11">
                                Đã bán: {value.buy}					  | Xem: {value.view}					</div>
                        </td>
                        <td className="textC">{value.productAmount}</td>
                        <td className="textC">{FormatNumber(value.productComplatePrice)} ₫</td>

                        <td className="textC">{UpdateDateTime(value.firstDateTime)}</td>
                        <td className="textC">{UpdateDateTime(value.dateTime)}</td>
                        <td className="option textC">

                            <a href='#recover' title="phục hồi dữ liệu" name='productId'
                                style={{ marginRight: '30px' }}
                                className="tipS verify_action" onClick={() => this.recovery(value, false)}>
                                <img src="images/icons/color/plus.png" alt='' /></a>
                            < a href='#delete' title="Xóa" name='productId' className="tipS verify_action ml5" onClick={() => this.delete(value.id, true)}>
                                <img src="images/icons/color/delete.png" alt='' /></a>


                        </td>
                    </tr>
                )


            })

        }
    }
    // search

    isChenge = (e) => {
        var name = e.target.name;
        var value = e.target.value;
        this.setState({
            [name]: value,
            searchValueId: value

        });
    }
    isChengeName = (e) => {

        var name = e.target.name;
        var value = e.target.value;
        this.setState({
            [name]: value,
            searchValueName: value

        });


    }
    // khôi phục
    recovery = (data, isRecovery) => {


        var { id, productName, productAmount, productPrice, productComplatePrice, productDescribe, productImage, productImageList, productCategory, productSizes,
            productReducedPrice, productContent, productGuarantee, productCategoryCode, productTitle, productKeyword, firstDateTime, colors, productStorageCapacity, } = data
        var dateTime = new Date()
        axios.post('/add_product', {
            id, productName, productAmount, productPrice, productComplatePrice, productDescribe, productImage, productImageList, productCategory,
            productReducedPrice, productContent, productGuarantee, productCategoryCode, productTitle, productKeyword,
            firstDateTime, dateTime, colors, productSizes, productStorageCapacity
        }).then((res) => {
            if (res.data.status) {
                if (!isRecovery && isRecovery !== null) {
                    // gọi từng phần tử khi click
                    this.delete(id, false)
                    toast(<div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" />
                        <i>Khôi phục thành công!</i></div>)
                } else if (isRecovery) {
                    // thêm phần tử cuối cùng rồi mới gọi
                    this.delete(id, false, isRecovery)
                    toast(<div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" />
                        <i>Khôi phục tất cả thành công!</i></div>)
                }
            }
        })



    }
    //xóa
    delete = (productId, isFlag, isRecovery) => {
        var dataRecovery = [];
        console.log(isRecovery);
        dataRecovery = this.state.dataTemp.filter((item) => item.id !== productId);
        if (isRecovery) { dataRecovery = [] }
        axios.post('/removeDataRecovery', { dataRecovery })
            .then((response) => {
                this.setState({
                    dataProduct: dataRecovery,
                    dataTemp: dataRecovery,
                    productTotal: dataRecovery.length
                })
                if (isFlag) {
                    toast(<div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" />
                        <i>Xóa vĩnh viễn thành công!</i></div>)
                }
            })

    }
    deleteRecoveryAll = () => {
        var { dataProduct } = this.state

        var isRecoveryAll = null
        dataProduct.map((value, key) => {
            if (dataProduct.length - 1 === key) {
                isRecoveryAll = true

            }
            this.recovery(value, isRecoveryAll)
        })
    }

    resetCategory = () => {
        var { isSearch } = this.state
        if (isSearch) {
            this.setState({
                selectValue: '',
                isSearch: false
                // dataProduct: this.state.dataTemp,

            })
        }
    }

    handlePageChange(currentPage) {
        this.setState({
            currentPage: currentPage,
        });
    }

    searchClick = () => {
        var { search_value, dateTimeStart, dateTimeEnd } = this.props;
        var dataProductSearch = [], dataProductDate = null;
        if (search_value.length !== 0) {

            this.setState({ dataProduct: search_value })
            // search date + value
            dataProductSearch = search_value;
            dataProductDate = SearchDateProduct(dataProductSearch, dateTimeStart, dateTimeEnd);

            if (dataProductDate && dateTimeStart) {
                this.setState({ dataProduct: dataProductDate, })
            }

        }
        else {
            //    search date
            dataProductSearch = this.state.dataTemp;
            dataProductDate = SearchDateProduct(dataProductSearch, dateTimeStart, dateTimeEnd);

            this.setState({ dataProduct: dataProductDate, })
        }
        if (dataProductDate !== null) {
            this.setState({ isSearch: true })
        } else {
            this.setState({ isSearch: false })
        }

    }

    showProduct = () => {

        return (

            <div id="rightSide">

                <FormtitleArea
                    managerTitle={'Phục hồi'}
                    managerName={'Quản lý phục hồi'}

                    urlList={'/admin/product.html'}
                    imageList={'./images/icons/control/16/list.png'}
                />
                <div className="line" />

                <div className="wrapper" id="main_product">
                    <div className="widget">
                        <div className="title">
                            {/* <span className="titleIcon"><input type="checkbox" id="titleCheck" name="titleCheck" /></span> */}
                            <h6>
                                Danh sách sản phẩm			</h6>
                            <div className="num f12">Tổng số lượng: <b>{this.state.productTotal}</b></div>
                        </div>
                        <table cellPadding={0} cellSpacing={0} width="100%" className="sTable mTable myTable" id="checkAll">
                            <thead className="filter">
                                <tr>
                                    <td colSpan={8}>
                                        <table cellPadding={0} cellSpacing={0} width="80%">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <Search dataProduct={this.state.dataTemp} isSearch={false} />
                                                    </td>
                                                    <td >
                                                        <input onClick={(e) => this.searchClick()} type="button" className="button blueB" defaultValue="Tìm kiếm" />
                                                        {/* <input onClick={() => this.resetCategory()} type="reset" className="basic button" value="Làm mới" /> */}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <h3 className=" text-center">Tìm theo ngày (Cập nhật)</h3>
                                                        {<FilterTime />}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </thead>
                            <thead>
                                <tr>
                                    <td style={{ width: '120px' }}>Mã số</td>
                                    <td>Tên</td>
                                    <td>Số lượng</td>
                                    <td>Đơn giá</td>
                                    <td style={{ width: '75px' }}>Ngày tạo</td>
                                    <td style={{ width: '85px' }}>Ngày cập nhật</td>
                                    <td style={{ width: '120px' }}>Hành động</td>
                                </tr>
                            </thead>
                            <tfoot className="auto_check_pages">
                                <tr>
                                    <td colSpan={10}>
                                        <div className="list_action itemActions" >

                                            <a onClick={() => this.deleteRecoveryAll()} href="#re-data" id="submit" className="button blueB " >
                                                <span style={{ color: 'white' }}>Khôi phục tất cả dữ liệu <i className="fa fa-database" aria-hidden="true" /></span>
                                            </a>

                                        </div>

                                        <div className="pagination">

                                            <Pagination
                                                activePage={this.state.currentPage}
                                                itemsCountPerPage={this.state.newsPerPage}
                                                totalItemsCount={
                                                    this.state.dataProduct !== null
                                                        ? this.state.dataProduct.length
                                                        : 0
                                                }
                                                pageRangeDisplayed={5} // show page
                                                // firstPageText ={'Đầu'}
                                                onChange={this.handlePageChange.bind(this)}
                                            />

                                        </div>


                                    </td>


                                </tr>
                            </tfoot>
                            <tbody className="list_item">
                                {this.state.isSearch &&
                                    this.currentPageProduct()
                                }

                            </tbody>
                        </table>

                    </div>
                </div>		<div className="clear mt30" />

            </div>

        );

    }
    render() {
        return this.showProduct();

    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        search_value: state.search_value,
        dateTimeStart: state.dateTimeStart,
        dateTimeEnd: state.dateTimeEnd,
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DataRecovery);


