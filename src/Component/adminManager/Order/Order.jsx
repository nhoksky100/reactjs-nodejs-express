import React, { Component } from 'react';
import FormtitleArea from '../titleAreaFrom/FormtitleArea';
import axios from 'axios';
import Pagination from "react-js-pagination";
import { FormatNumber } from '../../FormatNumber';
import { NavLink, Redirect } from 'react-router-dom';
import { stringtoslug } from '../../stringtoslug';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import SearchOrder from './SearchOrder';
import { UpdateDateTime } from '../../UpdateDateTime';
import FilterTime from './FilterTime';
import DatePicker from 'react-datepicker';
import { SearchDateProduct } from './SearchDateProduct';

// import { ExportReactCSV } from './ExportReactCSV';
const getDataCartFull = () => axios.get('/checkout').then((res) => res.data)

class Order extends Component {
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
            // checkconfirm
            isToggle: true,
            // change date

            selectedDateDefault: null,
            isSelectDate: false

        }
    }

    componentDidMount() {

        if (this.state.dataCheckOut.length === 0) {
            var pushDataCheckOut = [];
            getDataCartFull().then((res) => {
                res.map((value) => (
                    pushDataCheckOut.push(value)

                ))
                this.setState({
                    dataCheckOut: pushDataCheckOut,
                    dataTemp: pushDataCheckOut,
                    dataLength: pushDataCheckOut.length
                })
                return res
            })
        }
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
    getDetailsProductSingle = (IdProductDetails) => {
        sessionStorage.setItem('ID_details_product', IdProductDetails);

    }

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
                <i>Xóa sản phẩm thành công!</i></div>)

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
            var { dataCheckOut } = this.state;
            dataCheckOut = this.currentTodos();
            return dataCheckOut.map((value, key) => {

                return (
                    <tr className="row_20" key={key}>
                        <td className="textC">{value.id}</td>
                        <td className="textC">{value.tradingCode}</td>
                        <td>
                            <div className="image_thumb">
                                <NavLink onClick={() => this.getDetailsProductSingle(value.id)} to={'/detail-product/' + stringtoslug(value.productName) + ".html"}>
                                    <img src={value.image} height={50} alt='' />
                                </NavLink>
                                <div className="clear" />
                            </div>
                            <NavLink onClick={() => this.getDetailsProductSingle(value.id)} to={'/detail-product/' + stringtoslug(value.productName) + ".html"}
                                className="tipS" title={value.productName} target="_blank">
                                <b>{value.productName}</b>
                            </NavLink>
                        </td>
                        <td className="textC" style={{ width: '120px' }}>
                            {FormatNumber(value.price) + " " + 'VND'}
                            {/* <p style={{ textDecoration: 'line-through' }}>10,000,000 đ</p> */}
                        </td>
                        <td className="textC">{value.quantity}</td>
                        <td className="textC" style={{ width: '100px' }}>{value.totalPriceSingle + " " + value.currencyRate}</td>
                        <td className="status textC">
                            <span className="pending">
                                {value.order}
                            </span>
                        </td>
                        <td className="status textC">
                            <span className="pending">
                                {value.transaction}
                            </span>
                        </td>
                        <td className="textC">{UpdateDateTime(value.dateTime)}</td>
                        <td className="textC option" style={{ width: '70px' }}>
                            <span onClick={() => this.editOder(value)}
                                style={{
                                    cursor: 'pointer',
                                    position: 'relative',
                                    bottom: '2px', right: '5px',
                                    fontSize: '16px'
                                }}
                                title='Cập nhật' className="lightbox">
                                <i className="fa fa-arrow-circle-up" aria-hidden="true" />
                            </span>
                            <span onClick={() => this.showDetails(value)} style={{ cursor: 'pointer' }} title='Xem chi tiết' className="lightbox">
                                <img src="images/icons/color/view.png" alt='' />
                            </span>
                            {/* {!this.state.isToggle */}
                            < span title="Xóa" name='productId' className="tipS verify_action ml5" onClick={() => this.delete(value.tradingCode)}>
                                <img src="images/icons/color/delete.png" alt='' /></span>

                            {/* // } */}
                            {/* <div id={this.state.isToggle ? "myModal" : 'none'} className="modal fade">
                                <div className="modal-dialog modal-confirm">
                                    <div className="modal-content">

                                        <h4 className="modal-title w-100">Bạn có chắc chắn muốn xóa</h4>
                                        <label style={{ fontSize: '12px', margin: '10px' }}> Không hiển thị lần sau
                                            <input style={{ height: 'auto', cursor: 'pointer' }} type={'checkbox'} onClick={() => this.checkedCleanConfirm()} name='checkboxisShow' />
                                        </label>

                                        <div className="modal-footer justify-content-center">
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">hủy</button>
                                            <button type="button" onClick={() => this.Delete(value.id)} data-dismiss="modal" className="btn btn-danger">Xóa</button>
                                        </div>
                                    </div>
                                </div>
                            </div> */}

                        </td>

                    </tr >

                )
            })
        }
    }
    //Edit Oder
    editOder = (valueCheckUpdate) => {
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
                        dataCheckOut[key].payment = 'Đã thanh toán'
                        dataCheckOut[key].statisticsKey = true
                        dataCheckOut[key].dayShipping = new Date()
                    }
                }
                return dataCheckOut
            })
            //up
            // var pushData = [];

            // update order checkout

            axios.post('/updateOrder', { dataCheckOut }).then((res) => {
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
            statusEdit:false,
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
                            <label className='label-trading' htmlFor="filter_id">Mã đơn hàng</label>
                        </td>




                        <td className="items td-order">
                            <label className='label-order' htmlFor="filter_type"> Đơn hàng</label>
                            <select onChange={(e) => this.ChangeUpdate(e)} defaultValue={dataEdit.order} className='select-transaction select-order' ref='status_order' name="status_order">
                                <option value={dataEdit.order} >{dataEdit.order !== undefined ? dataEdit.order : ''}</option>

                                <option value={'Chờ xử lý'}>Chờ xử lý</option>
                                <option value={'Đang vận chuyển'}>Đang vận chuyển</option>
                                <option value={'Đã gửi hàng'}>Đã gửi hàng</option>
                                <option value={'Hủy bỏ'}>Hủy bỏ</option>
                            </select>

                        </td>

                        <td className="items td-time-first">
                            <input name="created" defaultValue={dataEdit.dateTime && UpdateDateTime(dataEdit.dateTime)} id="filter_created" type="text" className=" in-time-first" readOnly />
                            <label className='label-time-first' htmlFor="filter_created">Từ ngày</label>
                        </td>
                        <td className='td-form-submit' colSpan={2}>
                            <input onClick={() => this.handleUpdate(dataEdit)} type="button" className="button blueB" defaultValue="Cập nhật" />
                            <input type="reset" onClick={() => this.reSet()} className="basic button" value="Ẩn đi" />
                        </td>
                    </tr>
                    <tr>

                        <td colSpan={1} className="items td-member">
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
                            <label className='label-transaction' htmlFor="filter_status">Giao dịch</label>
                            <select onChange={(e) => this.ChangeUpdate(e)} className='select-transaction' ref='transaction_status' name="transaction_status">
                                <option value={dataEdit.transaction} >{dataEdit.transaction !== undefined ? dataEdit.transaction : ''}</option>
                                <option value={'Chờ xử lý'}>Chờ xử lý</option>
                                <option value={'Thành công'}>Thành công</option>
                                <option value={'Hủy bỏ'}>Hủy bỏ</option>
                            </select>
                        </td>

                        <td className="items td-time-last">
                            <label className='label-time-last' htmlFor="filter_created_to">Đến ngày</label>
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
        var { search_value, dateTimeStart, dateTimeEnd } = this.props;
        var dataProductCard = [], dataProductDate = null;

        if (search_value.length !== 0) {

            this.setState({ dataCheckOut: search_value })
            // search date + value
            dataProductCard = search_value;
            dataProductDate = SearchDateProduct(dataProductCard, dateTimeStart, dateTimeEnd);

            if (dataProductDate && dateTimeStart) {
                this.setState({ dataCheckOut: dataProductDate })
            }

        }
        else {

            //    search date
            dataProductCard = this.state.dataTemp;
            dataProductDate = SearchDateProduct(dataProductCard, dateTimeStart, dateTimeEnd);

            this.setState({ dataCheckOut: dataProductDate })
        }
    }
    showFormOder = () => {
        return (
            <div className="wrapper">
                <div className="widget">
                    <div className="title">
                        <span className="titleIcon"><img src="images/icons/tableArrows.png" alt='' /></span>
                        <h6>Danh sách Đơn hàng sản phẩm</h6>
                        <div className="num f12">Tổng sản phẩm: <b>{this.state.dataLength}</b></div>
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
                                <td>Sản phẩm</td>
                                <td style={{ width: '80px' }}>Giá</td>
                                <td style={{ width: '50px' }}>Số lượng</td>
                                <td style={{ width: '70px' }}>Số tiền thanh toán</td>
                                <td style={{ width: '75px' }}>Đơn hàng</td>
                                <td style={{ width: '75px' }}>Giao dịch</td>
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
                    managerTitle={'Đơn hàng sản phẩm'}
                    managerName={'Quản lý đơn hàng'}
                    // urlExcelFile={'/admin/product.html'}
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
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Order);
