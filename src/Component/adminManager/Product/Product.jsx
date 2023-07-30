import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

import Pagination from "react-js-pagination";

import { FormatNumber } from '../../FormatNumber';

import FormtitleArea from '../titleAreaFrom/FormtitleArea.jsx';
import Search from './Search.jsx';
import { connect } from 'react-redux';
import { UpdateDateTime } from '../../UpdateDateTime';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';


const getProduct = () => axios.get('/getdata_product_rating').then((res) => res.data)
const deleteProduct = (productId) => (axios.post('/delete_product', { productId }).then((resp) => resp.data_sp)) // to mysql res
const permissionMember = () => axios.get('/login_member_json').then((res) => res.data)
class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProduct: null,
            dataTemp: null,
            productTotal: 0,
            // dataPermission: null,
            isPermission: false,
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
            //checkedCleanConfirm
            isToggle: true,


        }
    }

    componentDidMount() {
        if (this.state.dataProduct === null) {
            var pushRes = [];
            getProduct().then((res) => {
                pushRes = res.reverse();
                this.setState({
                    dataProduct: pushRes,
                    productTotal: res.length,
                    dataTemp: pushRes
                })
            })
        }

        if (sessionStorage.getItem('ID_product') === '' || sessionStorage.getItem('ID_product') === null) {
            sessionStorage.setItem('ID_product', '')
        }
        this.dataPermission()
    }
    dataPermission = () => {
        permissionMember().then((res) => {

            if (res.permission === 'admin') {
                this.setState({ isPermission: true })
            } else {
                this.setState({ isPermission: false })
            }
        })
    }
    currentTodos = () => {
        const { currentPage, newsPerPage } = this.state; // trang hiện tại acti  //cho trang tin tức mỗi trang
        const indexOfLastNews = currentPage * newsPerPage; // lấy vị trí cuối cùng của trang ,của data
        const indexOfFirstNews = indexOfLastNews - newsPerPage; // lấy vị trí đầu tiên  của trang ,của data
        return this.state.dataProduct.slice(indexOfFirstNews, indexOfLastNews); // lấy dữ liệu ban đầu và cuối gán cho các list
    }
    // checkedCleanConfirm
    checkedCleanConfirm = () => {
        this.setState({ isToggle: !this.state.isToggle })
    }

    currentPageProduct = () => {
        if (this.state.dataProduct !== null) {

            const currentTodos = this.currentTodos();

            // this.setState({ pageNumbers: pageNumbers })
            return currentTodos.map((value, key) => {
                return (
                    <tr className="row_9" key={key}>

                        {/* <td><input type="checkbox" name="id[]" defaultValue={value.ID} /></td> */}
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
                            {/* <a href='#commentView' title={'comment customer'} className="tipS verify_action">
                                <i className="fa fa-commenting-o" aria-hidden="true" />
                            </a> */}
                            <a href='#ViewDetail' onClick={() => this.Detail(value.id, this.state.detailStatus)} className="tipS verify_action" title="Xem chi tiết sản phẩm">
                                <img src="images/icons/color/view.png" alt='' />
                            </a>
                            <a href='#Edit' onClick={() => this.edit(value.id, this.state.editStatus)} title="Chỉnh sửa" className="tipS verify_action">
                                <img src="images/icons/color/edit.png" alt='' />
                            </a>
                            {/* {!this.state.isToggle */}
                            < a href='#delete' title="Xóa" name='productId' className="tipS verify_action ml5" onClick={() => this.delete(value.id)}>
                                <img src="images/icons/color/delete.png" alt='' /></a>

                            {/* } */}

                            {/* <div id={this.state.isToggle ? "myModal" : 'none'} className="modal fade">
                                <div className="modal-dialog modal-confirm">
                                    <div className="modal-content">

                                        <h4 className="modal-title w-100">Bạn có chắc chắn muốn xóa</h4>
                                        <label style={{ fontSize: '12px', margin: '10px' }}> Không hiển thị lần sau
                                            <input style={{ height: 'auto', cursor: 'pointer' }} type={'checkbox'} onClick={() => this.checkedCleanConfirm()} name='checkboxisShow' />
                                        </label>

                                        <div className="modal-footer justify-content-center">
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">hủy</button>
                                            <button  type="button" onClick={() => this.Delete(value.id)} data-dismiss="modal" className="btn btn-danger">Xóa</button>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </td>
                    </tr>
                )


            })

        }
    }
    // sort

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

    //xóa
    delete = (productId) => {
        // var pushItem = [];
        var deleteFill = [], dataRecovery = []
        var { dataTemp } = this.state
        //save data recovery 
        dataRecovery = dataTemp.filter((item) => item.id === productId);

        axios.post('/dataRecovery', { dataRecovery })
            .then((res) => {
                if (res.data.status) {
                    deleteProduct(productId).then((response) => {
                        deleteFill = dataTemp.filter((item) => item.id !== productId);
                        // pushItem.push(deleteFill);
                        this.setState({ dataProduct: deleteFill, dataTemp: deleteFill })

                        toast(<div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" />
                            <i>Xóa sản phẩm thành công!</i></div>)
                    })
                } else {
                    toast(<div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" />
                        <i>Xóa sản phẩm không thành công!</i></div>)
                }
            })
        // delete data



    }
    // sửa
    edit = (productId, editStatus) => {

        sessionStorage.setItem('ID_product', productId);

        sessionStorage.getItem('ID_product');
        // console.log(id);
        this.setState({ editStatus: !editStatus })


    }

    Detail = (productId, detailStatus) => {

        sessionStorage.setItem('ID_product', productId);

        this.state.dataTemp.filter((itemDetail) => itemDetail.ID === productId);

        this.setState({ detailStatus: !detailStatus })
    }

    resetCategory = () => {

        this.setState({
            selectValue: '',
            dataProduct: this.state.dataTemp,

        })
    }

    handlePageChange(currentPage) {
        this.setState({
            currentPage: currentPage,
        });
    }

    searchClick = () => {
        var { search_value } = this.props;
        if (search_value !== '') {
            this.setState({ dataProduct: search_value })
        }
    }

    showProduct = () => {

        return (

            <div id="rightSide">

                <FormtitleArea
                    managerTitle={'Sản phẩm'}
                    managerName={'Quản lý sản phẩm'}
                    urlAdd={'/admin/add-product.html'}
                    imageAdd={'images/icons/control/16/add.png'}
                    urlRating={'/admin/rating-product.html'}
                    imageRating={'./images/icons/control/16/feature.png'}
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
                                                        <Search dataProduct={this.state.dataTemp} />
                                                    </td>
                                                    <td style={{ display: 'table' }}>
                                                        <input onClick={(e) => this.searchClick()} type="button" className="button blueB" defaultValue="Tìm kiếm" />
                                                        <input onClick={() => this.resetCategory()} type="reset" className="basic button" value="phục hồi" />
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
                                    <td style={{ width: '120px' }}>Đơn giá</td>
                                    <td style={{ width: '75px' }}>Ngày tạo</td>
                                    <td style={{ width: '75px' }}>Ngày cập nhật</td>
                                    <td style={{ width: '120px' }}>Hành động</td>
                                </tr>
                            </thead>
                            <tfoot className="auto_check_pages">
                                <tr>
                                    <td colSpan={10}>
                                        <div className="list_action itemActions" >
                                            {this.state.isPermission &&
                                                <NavLink to='/admin/data-recovery.html' id="submit" className="button blueB" >
                                                    <span style={{ color: 'white' }}>Khôi phục dữ liệu <i className="fa fa-database" aria-hidden="true" /></span>
                                                </NavLink>
                                            }
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

                                {this.currentPageProduct()}
                            </tbody>
                        </table>

                    </div>
                </div>		<div className="clear mt30" />

            </div>

        );

    }
    render() {
        if (this.state.editStatus) {
            return (<Redirect to='/admin/edit-product.html' />)
        }
        else if (this.state.detailStatus) {
            return (<Redirect to='/admin/detail-product.html' />)
        }
        else return this.showProduct();

    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        search_value: state.search_value
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Product);