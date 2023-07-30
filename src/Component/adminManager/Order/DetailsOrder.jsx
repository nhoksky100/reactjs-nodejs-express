import React, { Component } from 'react';
import FormtitleArea from '../titleAreaFrom/FormtitleArea';
import { FormatNumber } from '../../FormatNumber';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { stringtoslug } from '../../stringtoslug';
class DetailsOrder extends Component {

    //set product detail
    getDetailsProductSingle = (IdProductDetails) => {
        sessionStorage.setItem('ID_details_product', IdProductDetails);

    }


    formDataOder = () => {
        var { dataDetailsOrder } = this.props;
        if (dataDetailsOrder.length !== 0) {
          
            return (
                <tr className="row_20" >
                    <td className="textC">{dataDetailsOrder.id}</td>
                    <td className="textC">{dataDetailsOrder.tradingCode}</td>
                    <td>
                        <div className="image_thumb">
                            <NavLink onClick={() => this.getDetailsProductSingle(dataDetailsOrder.id)} to={'/detail-product/' + stringtoslug(dataDetailsOrder.productName) + ".html"} target="_blank">
                                <img src={dataDetailsOrder.image} height={50} alt='' />
                            </NavLink>
                            <div className="clear" />
                        </div>
                        <NavLink onClick={() => this.getDetailsProductSingle(dataDetailsOrder.id)} to={'/detail-product/' + stringtoslug(dataDetailsOrder.productName) + ".html"}
                            className="tipS" title={dataDetailsOrder.productName} target="_blank">
                            <b>{dataDetailsOrder.productName}</b>
                        </NavLink>
                    </td>
                    <td className="textC">
                        {dataDetailsOrder.color +" | "+ dataDetailsOrder.productSizes}
                        {/* <p style={{ textDecoration: 'line-through' }}>10,000,000 đ</p> */}
                    </td>

                    <td style={{ width: '100px' }} className="textC">{dataDetailsOrder.totalPriceSingle + " " + dataDetailsOrder.currencyRate}</td>

                    <td className="status textC">
                        <span className="pending">
                            {
                                dataDetailsOrder.phoneCheckout !== ''
                                    ? dataDetailsOrder.phoneCheckout
                                    : dataDetailsOrder.phoneCustomer
                            }
                        </span>
                    </td>
                    <td className="textC">{dataDetailsOrder.dateTime}</td>
                    <td className="textC" style={{ width: '70px' }}>
                        {dataDetailsOrder.dayShipping}
                    </td>

                </tr >

            )

        }
    }







    showFormOder = () => {
        var { dataDetailsOrder } = this.props;
        return (
            <div className="wrapper">
                <div className="widget">
                    <div className="title">
                        <span className="titleIcon"><img src="images/icons/tableArrows.png" alt='' /></span>
                        <h6>Danh sách Đơn hàng sản phẩm</h6>
                        <div className="num f12"> Sản phẩm: <b>{dataDetailsOrder.length}</b></div>
                    </div>
                    <table cellPadding={0} cellSpacing={0} width="100%" className="sTable mTable myTable" id="checkAll">



                        <thead>
                            <tr>
                                <td style={{ width: '60px' }}>Mã số</td>
                                <td style={{ width: '60px' }}>Mã giao dịch</td>
                                <td>Sản phẩm</td>
                                <td style={{ width: '80px' }}>Màu | size</td>
                                <td style={{ width: '70px' }}>Tổng số tiền Thanh toán</td>

                                <td style={{ width: '75px' }}>số điện thoại</td>
                                <td style={{ width: '75px' }}>Ngày tạo</td>
                                <td style={{ width: '75px' }}>Ngày dự kiến giao hàng</td>
                            </tr>
                        </thead>

                        <tbody className="list_item">
                            {this.formDataOder()}

                            <tr>
                                <td className="textL" colSpan={8}>
                                    <h6>Địa chỉ</h6>

                                    <p>
                                        <i>Số nhà:</i>  <b> {
                                            dataDetailsOrder.addressCheckout !== ''
                                                ? dataDetailsOrder.addressCheckout
                                                : dataDetailsOrder.addressCustomer
                                        }</b>
                                    </p>

                                    <p> <i>Tỉnh thành: </i> <b>{dataDetailsOrder.city}</b></p>
                                    <p><i> State: </i> <b>{dataDetailsOrder.state} </b></p>
                                    <p> <i>Zip:</i> <b>{dataDetailsOrder.zip}</b></p>



                                </td>
                            </tr>
                            <tr>
                                <td className="textL" colSpan={8}>
                                    <h6 >Ghi chú</h6>
                                    <form>
                                        <input type='text' readOnly style={{ fontSize: '22px' }} defaultValue={dataDetailsOrder.note} name='note' />
                                    </form>
                                </td>
                            </tr>



                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
    render() {

        return (
            <div id="rightSide">

                <FormtitleArea
                    managerTitle={'Đơn hàng sản phẩm'}
                    managerName={'Quản lý đơn hàng'}
                    urlList={'/admin/order-product.html'}
                    imageList={'./images/icons/control/16/list.png'}
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
        dataDetailsOrder: state.dataDetailsOrder
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DetailsOrder);
