import React, { Component } from 'react';
import FormtitleArea from '../titleAreaFrom/FormtitleArea';
import axios from 'axios';
import Pagination from "react-js-pagination";
import { FormatNumber } from '../../FormatNumber';
import { Redirect } from 'react-router-dom';

import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import SearchOrder from './SearchOrder';
import FilterTime from './FilterTime';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { UpdateDateTime } from '../../UpdateDateTime';
import { SearchDateProduct } from './SearchDateProduct';

// import { addDays } from 'date-fns';

const getDataCartFull = () => axios.get('/checkout').then((res) => res.data)
const getProduct = () => axios.get('/getdata_product_rating').then((res) => res.data)
class Deal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataCheckOut: [],
            dataTemp: [],
            dataLength: 0,
            // pagination
            currentPage: 1,
            newsPerPage: 5, // show 5 product
            pageNumbers: [],
            //edit
            statusEdit: false,
            dataEdit: [],
            //select
            transaction_status: '', status_order: '',
            // to shipping day
            created_to: '',
            //data details status
            statusDetailsOrder: false,
            // statusConfirm
            statusConfirm: false,
            checkedCleanConfirm: false,
            isToggle: true,
            // select to date
            selectedDateDefault: null,
            isSelectDate: false

        }

    }

    componentDidMount() {

        if (this.state.dataCheckOut.length === 0) {
            var pushDataCheckOut = []

            getDataCartFull().then((res) => {
                if (res) {
                    res.map((value, key) => {
                        pushDataCheckOut.push(value)

                        this.setState({
                            dataCheckOut: pushDataCheckOut,
                            dataTemp: pushDataCheckOut,
                            dataLength: pushDataCheckOut.length,

                        })

                    })

                    return res
                }
            })
            getProduct().then((res) => {
                if (res) {
                    this.setState({
                        dataProduct: res,

                    })
                }
            })
        }

    }
    resetState = () => {
        this.setState({
            dataCheckOut: [],
            dataTemp: [],
            dataLength: 0,
            // pagination
            currentPage: 1,
            newsPerPage: 5, // show 5 product
            pageNumbers: [],
            //edit
            statusEdit: false,
            dataEdit: [],
            //select
            transaction_status: '', status_order: '',
            // to shipping day
            created_to: '',
            //data details status
            statusDetailsOrder: false,
            // statusConfirm
            statusConfirm: false,
            checkedCleanConfirm: false,
            isToggle: true,

        })
    }
    componentWillUnmount() {
        this.resetState()
    }

    //page set
    currentTodos = () => {
        var { currentPage, newsPerPage, dataCheckOut } = this.state; // trang hiện tại acti  //cho trang tin tức mỗi trang
        var indexOfLastNews = currentPage * newsPerPage; // lấy vị trí cuối cùng của trang ,của data
        var indexOfFirstNews = indexOfLastNews - newsPerPage; // lấy vị trí đầu tiên  của trang ,của data
        return dataCheckOut.slice(indexOfFirstNews, indexOfLastNews); // lấy dữ liệu ban đầu và cuối gán cho các list
    }
    //
    handlePageChange(currentPage) {
        this.setState({
            currentPage: currentPage,
        });
    }
    //set product detail
    // getDetailsProductSingle = (IdProductDetails) => {
    //     localStorage.setItem('ID_details_product', IdProductDetails);

    // }

    /// show details order
    showDetails = (dataDetails) => {

        this.setState({ statusDetailsOrder: true })
        this.props.getDataOrderDetails(dataDetails)
    }
    //delete
    delete = (tradingCode) => {
        var deleteFill = [];
        var { dataCheckOut } = this.state;

        deleteFill = this.state.dataTemp.filter((item) => item.tradingCode !== tradingCode);
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
    // checkedCleanConfirm
    checkedCleanConfirm = () => {
        this.setState({ isToggle: !this.state.isToggle })
    }


    formDataOrder = () => {

        if (this.state.dataCheckOut.length !== 0) {
            var dataCheckOut = this.currentTodos();
            return dataCheckOut.map((value, key) => {


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
                        <td className="textC">{UpdateDateTime(value.dateTime)}</td>
                        <td className="textC option" style={{ width: '70px' }}>
                            <span onClick={() => this.editDeal(value)}
                                style={{
                                    cursor: 'pointer',
                                    position: 'relative',
                                    bottom: '2px', right: '5px',
                                    fontSize: '16px'
                                }}
                                title='Cập nhật' className="lightbox">
                                <i className="fa fa-arrow-circle-up" aria-hidden="true" />
                            </span>
                            <a href='#showDetails' onClick={() => this.showDetails(value)} style={{ cursor: 'pointer' }} title='Xem chi tiết' className="lightbox">
                                <img src="images/icons/color/view.png" alt='' />
                            </a>
                            {/* {!this.state.isToggle */}
                            < a href='#delete' title="Xóa" name='productId' className="tipS verify_action ml5" onClick={() => this.delete(value.tradingCode)}>
                                <img src="images/icons/color/delete.png" alt='' /></a>


                        </td>


                    </tr >

                )
            })
        }
    }
    //Edit Oder
    editDeal = (valueCheckUpdate) => {
        this.setState({
            dataEdit: valueCheckUpdate,
            statusEdit: true,
            isSelectDate: false
        })

    }
    //handleUpdate
    handleUpdate = (dataEdit) => {
        if (dataEdit.length !== 0) {
            var { dataCheckOut, status_order, transaction_status, selectedDateDefault, isSelectDate } = this.state;
            //check value
            if (transaction_status === '' || transaction_status === ' ') {
                transaction_status = dataEdit.transaction
            }
            if (status_order === '' || status_order === ' ') {
                status_order = dataEdit.order
            }


            var dataUpdate = {
                id: dataEdit.id,
                tradingCode: dataEdit.tradingCode,
                order: status_order,
                transaction: transaction_status,
                dayShipping: isSelectDate ? selectedDateDefault : dataEdit.dayShipping,
                dateTime: dataEdit.dateTime
            }

            dataCheckOut.map((value, key) => {
                if (value.id === dataUpdate.id && value.tradingCode === dataUpdate.tradingCode) {
                    dataCheckOut[key].id = dataUpdate.id
                    dataCheckOut[key].tradingCode = dataUpdate.tradingCode
                    dataCheckOut[key].order = dataUpdate.order
                    dataCheckOut[key].transaction = dataUpdate.transaction
                    dataCheckOut[key].dayShipping = dataUpdate.dayShipping
                    if (dataUpdate.transaction === 'Thành công' && dataUpdate.order === 'Đã gửi hàng' && !value.statisticsKey) {

                        dataCheckOut[key].statisticsKey = true
                        dataCheckOut[key].payment = 'Đã thanh toán'
                        dataCheckOut[key].dayShipping = new Date()
                    }

                }

                return dataCheckOut
            })

            //up
            // update order checkout
            var { dataProduct } = this.state;

            var amount = 0, idUpdateAmount = '';



            dataProduct.map((value) => {
                if (dataUpdate.transaction === 'Thành công' &&
                    dataUpdate.order === 'Đã gửi hàng' &&
                    parseInt(value.id) === parseInt(dataUpdate.id)) {
                    var dataFill = dataCheckOut.filter((item) => parseInt(item.id) === parseInt(value.id));
                    idUpdateAmount = value.id;
                    amount = value.productAmount - dataFill[0].quantity;
                }
                return dataProduct
            })



            axios.post('/updateOrder', { dataCheckOut, amount, idUpdateAmount }).then((res) => {
                toast(<div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" />
                    <i> Cập nhật thành công!</i>
                </div>);

            })
            this.setState({
                dataCheckOut: dataCheckOut,
                dataTemp: dataCheckOut,
                dataEdit: [],
                transaction_status: '',
                status_order: '',
                selectedDateDefault: null,
                isSelectDate: false,
                statusEdit: false
            })

            this.refs.transaction_status.value = '';
            this.refs.status_order.value = '';

        }


    }
    // date change
    handleDateChange = (date) => {
        // Khi người dùng chọn một ngày, cập nhật giá trị ngày vào state

        this.setState({
            selectedDateDefault: date,
            isSelectDate: true

        });
    };
    //reset
    reSet = () => {

        this.refs.transaction_status.value = '';
        this.refs.status_order.value = '';
        this.setState({
            dataEdit: [],
            statusEdit: false,
            selectedDateDefault: null,
            isSelectDate: false,
        })
    }
    //onchangevalue
    ChangeUpdate = (e) => {

        var value = e.target.value;
        var name = e.target.name;

        this.setState({ [name]: value })
    }

    // Form Update
    formUpdateOrder = () => {
        var { dataEdit, selectedDateDefault, statusEdit, isSelectDate } = this.state;
        selectedDateDefault = isSelectDate ? selectedDateDefault : new Date(dataEdit.dayShipping)

        if (statusEdit) {

            return (


                <tbody id='form-order'>
                    <tr>
                        <td className='items td-id'>
                            <label className='label-id' htmlFor="filter_id">Mã số: <b>{dataEdit.id}</b></label>
                        </td>
                    </tr>
                    <tr>


                        <td className="items td-tradingCode">
                            <input name="tradingCode" className='in-trading' defaultValue={dataEdit.tradingCode} id="filter_id" type="text" readOnly />
                            <label className='label-trading content-deal' htmlFor="filter_id">Mã hàng</label>
                        </td>




                        <td className="items td-order">
                            <label id='printing-css' className='label-order content-deal' htmlFor="filter_type"> Đơn hàng</label>
                            <select onChange={(e) => this.ChangeUpdate(e)} value={this.state.status_order}
                                className='select-transaction select-order content-deal' ref='status_order' name="status_order">
                                <option value={dataEdit.order} >{dataEdit.order !== undefined ? dataEdit.order : ''}</option>
                                <option value={'Chờ xử lý'}>Chờ xử lý</option>
                                <option value={'Đang vận chuyển'}>Đang vận chuyển</option>
                                <option value={'Đã gửi hàng'}>Đã gửi hàng</option>
                                <option value={'Hủy bỏ'}>Hủy bỏ</option>
                            </select>

                        </td>

                        <td className="items td-time-first">
                            <input name="created" defaultValue={dataEdit.dateTime && UpdateDateTime(dataEdit.dateTime)}
                                id="filter_created" type="text" className=" in-time-first" readOnly />
                            <label className='label-time-first content-deal' htmlFor="filter_created">Từ ngày</label>
                        </td>

                        <td className='td-form-submit' colSpan={2}>

                            <input onClick={() => this.handleUpdate(dataEdit)} type="button" className="button blueB" defaultValue="Cập nhật" />
                            <input type="reset" onClick={() => this.reSet()} className="basic button" value={'Ẩn đi'} />


                            <span id='print' className='print'> <ion-icon name="print-outline" className='invoice-print '></ion-icon></span>
                        </td>


                    </tr>
                    <tr>

                        <td colSpan={1} className="items td-member content-deal">
                            <label className='label-member' htmlFor="filter_user">Khách hàng</label>
                            <input name="user" readOnly
                                defaultValue={

                                    dataEdit.nameCheckout !== ''
                                        ? dataEdit.nameCheckout
                                        : dataEdit.emailCheckout !== ''
                                            ? dataEdit.emailCheckout
                                            : dataEdit.emailCustomer !== ''
                                                ? dataEdit.emailCustomer
                                                : ''
                                }
                                id="filter_user" className="tipS in-member" title="Khách hàng" type="text"
                            />
                        </td>

                        <td className="items td-transaction">
                            <label className='label-transaction content-deal' htmlFor="filter_status">Giao dịch</label>
                            <select onChange={(e) => this.ChangeUpdate(e)} value={this.state.transaction_status} className='select-transaction' ref='transaction_status' name="transaction_status">
                                <option value={dataEdit.transaction} >{dataEdit.transaction !== undefined ? dataEdit.transaction : ''}</option>
                                <option value={'Chờ xử lý'}>Chờ xử lý</option>
                                <option value={'Thành công'}>Thành công</option>
                                <option value={'Hủy bỏ'}>Hủy bỏ</option>
                            </select>
                        </td>

                        <td className="items td-time-last td-member">
                            <label className='label-time-last content-deal' htmlFor="filter_created_to">Đến ngày</label>
                            <DatePicker
                                id="datepicker"
                                selected={selectedDateDefault}
                                onChange={this.handleDateChange}
                                dateFormat="dd/MM/yyyy" // Định dạng ngày tháng

                            />


                        </td>

                    </tr>
                </tbody>

            )
        }

    }
    resetSearch = () => {
        this.setState({
            selectValue: '',
            dataCheckOut: this.state.dataTemp,

        })
    }

    searchClick = () => {
        // get searchDate
        var { search_value, dateTimeStart, dateTimeEnd } = this.props;
        var { dataTemp } = this.state;
        var dataProductDate = [];
        if (search_value.length !== 0) {

            this.setState({ dataCheckOut: search_value })
            // search date + value


            dataProductDate = SearchDateProduct(search_value, dateTimeStart, dateTimeEnd);

            if (dataProductDate && dateTimeStart) {
                this.setState({ dataCheckOut: dataProductDate })
            }

        }
        else {
            //    search date
            dataProductDate = SearchDateProduct(dataTemp, dateTimeStart, dateTimeEnd);
            this.setState({ dataCheckOut: dataProductDate })
        }
    }
    showFormOder = () => {
        return (
            <div className="wrapper">
                <div className="widget">
                    <div className="title">
                        <span className="titleIcon"><img src="images/icons/tableArrows.png" alt='' /></span>
                        <h6>Danh sách giao dịch</h6>
                        <div className="num f12">Tổng giao dịch: <b>{this.state.dataLength}</b></div>
                    </div>
                    <table cellPadding={0} cellSpacing={0} width="100%" className="sTable mTable myTable" id="checkAll">

                        <thead className="filter">
                            <tr>
                                <td colSpan={10}>
                                    <form className="list_filter form" method="post">
                                        <table cellPadding={0} cellSpacing={0} width="100%">

                                            {this.formUpdateOrder()}

                                        </table>
                                    </form>
                                </td>
                            </tr>
                        </thead>
                        <thead className="filter">
                            <tr>
                                <td colSpan={10}>

                                    <table cellPadding={0} cellSpacing={0} width="80%">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <SearchOrder dataProduct={this.state.dataTemp} />
                                                </td>
                                                <td style={{ display: 'table' }}>
                                                    <input onClick={(e) => this.searchClick()} type="button" className="button blueB" defaultValue="Tìm kiếm" />
                                                    <input onClick={() => this.resetSearch()} type="reset" className="basic button" value="phục hồi" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <h3 className=" text-center">Tìm theo ngày</h3>
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
                                <td style={{ width: '60px' }}>Mã số</td>
                                <td style={{ width: '60px' }}>Mã hàng</td>
                                <td style={{ width: '80px' }}>Khách hàng</td>
                                <td style={{ width: '50px' }}>Số tiền</td>
                                <td style={{ width: '70px' }}>Hình thức</td>
                                <td style={{ width: '75px' }}>Giao dịch</td>
                                <td style={{ width: '75px' }}>Thanh toán</td>
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
                                                this.state.dataCheckOut !== null
                                                    ? this.state.dataCheckOut.length
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
                            {this.formDataOrder()}

                        </tbody>

                    </table>
                </div>
            </div>
        )
    }
    render() {

        if (this.state.statusDetailsOrder) {
            return <Redirect to='/admin/details-order-product.html' />
        }
        return (
            <div id="rightSide">

                <FormtitleArea dataExport={this.state.dataCheckOut}
                    managerTitle={'Giao dịch'}
                    managerName={'Quản lý Giao dịch'}
                    urlExcelFile={'/admin/product.html'}
                    imageExcelFile={'./images/excel.png'}
                />


                <div className="line" />

                {this.showFormOder()}

                <div className="clear" />

            </div>

        );
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
        getDataOrderDetails: (act_dataOrder) => {
            dispatch({ type: 'dataOrderDetails', act_dataOrder })
        },
        Search_value: (Search_value_ac) => {
            dispatch({ type: 'search_value', Search_value_ac })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Deal);
