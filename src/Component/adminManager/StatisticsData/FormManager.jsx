import axios from 'axios';
import React, { Component } from 'react';
import Pagination from 'react-js-pagination';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { FormatNumber } from '../../FormatNumber';
import { toast } from 'react-toastify';
import StatisticsTotal from './StatisticsTotal';
import Sales from './Sales';
import { UpdateDateTime } from '../../UpdateDateTime';

const getDataCartFull = () => axios.get('/checkout').then((res) => res.data)
class FormManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataDeal: [],
            dataTemp: [],
            dataLength: 0,
            // pagination
            currentPage: 1,
            newsPerPage: 5, // show 5 product
            pageNumbers: [],


            //data details status
            statusDetailsOrder: false,
        }
    }
    componentDidMount() {


        if (this.state.dataDeal.length === 0) {
            var pushDataDeal = [];
            getDataCartFull().then((res) => {
                res.map((value) => {
                    pushDataDeal.push(value)
                    return res

                })
                this.setState({
                    dataDeal: pushDataDeal,
                    dataTemp: pushDataDeal,
                    dataLength: pushDataDeal.length
                })

            })
        }
    }

    componentWillUnmount() {
        this.setState({
            dataDeal: [],
            dataTemp: [],
        })
    }

    //page set
    currentTodos = () => {
        var { currentPage, newsPerPage, dataDeal } = this.state; // trang hiện tại acti  //cho trang tin tức mỗi trang
        var indexOfLastNews = currentPage * newsPerPage; // lấy vị trí cuối cùng của trang ,của data
        var indexOfFirstNews = indexOfLastNews - newsPerPage; // lấy vị trí đầu tiên  của trang ,của data
        return dataDeal.slice(indexOfFirstNews, indexOfLastNews); // lấy dữ liệu ban đầu và cuối gán cho các list
    }
    handlePageChange(currentPage) {
        this.setState({
            currentPage: currentPage,
        });
    }

    /// show details order
    showDetails = (dataDetails) => {
        // console.log('chi tiet:', dataDetails);
        this.setState({ statusDetailsOrder: true })
        this.props.getDataOrderDetails(dataDetails)
    }

    //delete
    Delete = (productId) => {
        var deleteFill = [];
        var { dataCheckOut } = this.state;
        console.log(productId);
        deleteFill = this.state.dataTemp.filter((item) => item.id !== productId);
        dataCheckOut = deleteFill;
        axios.post('/updateOrder', { dataCheckOut }).then((res) => {
            toast(<div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" />
                <i>Xóa thành công!</i></div>)

        })
        this.setState({
            dataCheckOut: deleteFill,
            dataTemp: deleteFill
        })

    }

    formDataDeal = () => {
        if (this.state.dataDeal.length !== 0) {
            var dataDeal = this.currentTodos();
            return dataDeal.map((value, key) => {

                return (
                    <tr className="row_20" key={key}>
                        <td className="textC">{value.id}</td>
                        <td className="textC">{value.tradingCode}</td>
                        <td>
                            {value.nameCheckout ? value.nameCheckout : value.emailCheckout}
                        </td>
                        <td className="textR">
                            {FormatNumber(value.price)}
                            {/* <p style={{ textDecoration: 'line-through' }}>10,000,000 đ</p> */}
                        </td>
                        <td className="textC">{value.formality}</td>

                        <td className="status textC">
                            <span className="pending">
                                {value.transaction}
                            </span>
                        </td>
                        <td className="status textC">
                            <span className="pending">
                                {value.payment}
                            </span>
                        </td>
                        <td className="status textC">
                            <span className="pending">
                                {value.order}
                            </span>
                        </td>
                        <td className="textC">{UpdateDateTime(value.dateTime)}</td>
                        <td className="textC" style={{ width: '70px' }}>

                            <span onClick={() => this.showDetails(value)} style={{ cursor: 'pointer' }} title='Xem chi tiết' className="lightbox">
                                <img src="images/icons/color/view.png" alt='' />
                            </span>
                            <span onClick={() => this.Delete(value.ID)} title="Xóa" name='productId' className="tipS verify_action ml10">
                                <img src="images/icons/color/delete.png" alt='' />
                            </span>
                        </td>


                    </tr >

                )
            })
        }
    }

    formSales = () => {
        return (
            <div>

                < Sales dataDeal={this.state.dataDeal ? this.state.dataDeal : null} />
                <StatisticsTotal totalDetal={this.state.dataLength} />
            </div>

        )
    }

    //
    showForm = () => {

        return (

            <div id="rightSide">
                <div className="titleArea">
                    <div className="wrapper">
                        <div className="pageTitle">
                            <h5>Bảng điều khiển</h5>
                            <span>Trang quản lý hệ thống</span>
                        </div>
                        <div className="clear" />
                    </div>
                </div>
                <div className="line" />
                <div className="wrapper">
                    <div className="widgets">
                        {this.formSales()}
                        <div className="clear" />
                        {/* Giao dich thanh cong gan day nhat */}
                        <div className="widget">
                            <div className="title">
                                {/* <span className="titleIcon"><input type="checkbox" id="titleCheck" name="titleCheck" /></span> */}
                                <h6>Danh sách Giao dịch</h6>
                            </div>
                            <table cellPadding={0} cellSpacing={0} width="100%" className="sTable mTable myTable" id="checkAll">
                                <thead>
                                    <tr>
                                        <td style={{ width: '60px' }}>Mã số</td>
                                        <td style={{ width: '60px' }}>Mã giao dịch</td>

                                        <td style={{ width: '80px' }}>Khách hàng</td>
                                        <td style={{ width: '50px' }}>Số tiền</td>
                                        <td style={{ width: '70px' }}>Hình thức</td>
                                        <td style={{ width: '75px' }}>Giao dịch</td>
                                        <td style={{ width: '75px' }}>Thanh toán</td>
                                        <td style={{ width: '75px' }}>Đơn hàng</td>
                                        <td style={{ width: '75px' }}>Ngày tạo</td>
                                        <td style={{ width: '55px' }}>Hành động</td>
                                    </tr>
                                </thead>
                                <tfoot className="auto_check_pages">
                                    <tr>
                                        <td colSpan={10}>

                                            <div className="pagination">

                                                <Pagination
                                                    activePage={this.state.currentPage}
                                                    itemsCountPerPage={this.state.newsPerPage}
                                                    totalItemsCount={
                                                        this.state.dataDeal !== null
                                                            ? this.state.dataDeal.length
                                                            : 0
                                                    }
                                                    pageRangeDisplayed={5} // show page
                                                    // firstPageText ={'first'}
                                                    onChange={this.handlePageChange.bind(this)}
                                                />

                                            </div>


                                        </td>
                                    </tr>
                                </tfoot>
                                <tbody className="list_item">
                                    {this.formDataDeal()}
                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>
                <div className="clear mt30" />


            </div>


        )

    }
    render() {
        if (this.state.statusDetailsOrder) {
            return <Redirect to='/admin/details-order-product.html' />
        }
        return (
            <div>
                {this.showForm()}

            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        //  is_status_show_app: state.is_status_show_app,
        // admin_url: state.admin_url
        // status_product: state.status_product
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getDataOrderDetails: (act_dataOrder) => {
            dispatch({ type: 'dataOrderDetails', act_dataOrder })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FormManager)
