import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { FormatNumber } from '../../../FormatNumber';
import Pagination from 'react-js-pagination';
import { t } from 'i18next';
import { connect } from 'react-redux';
import { UpdateDateTime } from '../../../UpdateDateTime';
import { ExChangeRate } from '../ExChangeRate';
const getDataCartCheckout = () => axios.get('/checkout').then((res) => res.data)

class FollowOrders extends Component {



    constructor(props) {
        super(props);
        this.state = {
            //data
            dataCartCheckout: [],
            productTotal: 0,

            // pagination
            activePage: 15,
            currentPage: 1,
            newsPerPage: 5,
          

        }
        // this.showProduct = this.showProduct.bind()
    }
    componentDidMount() {
        this.orderDataCheckout()

    }
    componentDidUpdate(prevProps, prevState) {
        var { statuCartCheckout, StatusUpdateCartCheckout } = this.props
        if (statuCartCheckout) {
            this.orderDataCheckout()
            StatusUpdateCartCheckout(false)
        }
    }

    orderDataCheckout = () => {
        var profile = JSON.parse(localStorage.getItem('tokenProfileCustomer'));
        if (profile) {
            var pushData = [], flag = false;
            getDataCartCheckout().then((res) => {
                res.map((value) => {
                    if (value.emailCustomer === profile.email) {
                        pushData.push(value);
                        flag = true;

                    }
                    return res
                })
                if (flag) {
                    this.setState({
                        dataCartCheckout: pushData,
                        productTotal: pushData.length,
                    })
                }
            })
        }
    }
    handlePageChange(currentPage) {
        this.setState({
            currentPage: currentPage,
        });
    }
    //set pagination
    currentTodos = () => {
        var { currentPage, newsPerPage, dataCartCheckout } = this.state; // trang hiện tại acti  //cho trang tin tức mỗi trang
        var indexOfLastNews = currentPage * newsPerPage; // lấy vị trí cuối cùng của trang ,của data
        var indexOfFirstNews = indexOfLastNews - newsPerPage; // lấy vị trí đầu tiên  của trang ,của data
        return dataCartCheckout.slice(indexOfFirstNews, indexOfLastNews); // lấy dữ liệu ban đầu và cuối gán cho các list
    }
    refresh = () => {
        this.orderDataCheckout()
    }
    showProduct = () => {
        var { dataCartCheckout } = this.state;
        var { currencyDefault, currencyRate } = this.props;

        if (dataCartCheckout.length !== 0) {
            var currentTodos = this.currentTodos();

            // currentTodos.sort((a,b)=> a.ID - b.ID); //rating id

            return currentTodos.map((value, key) => {
                //    console.log(value);
                return (

                    <tr className="row_9" key={key} >


                        <td className="textC">{value.tradingCode}</td>
                        <td>
                            <div className="image_thumb">
                                <img src={value.image} height={50} alt='' />
                                <div className="clear" />
                            </div>
                            <span className="tipS" title={value.productName}>
                                <b>{value.productName}</b>
                            </span>

                        </td>
                        <td className="textC" style={{ width: '50px' }}>
                            {value.quantity}

                        </td>

                        <td className="textC">
                            {FormatNumber(ExChangeRate(value.price, currencyDefault, currencyRate)) + " "}
                            {currencyRate ? currencyRate[0] : currencyDefault[0]}
                        </td>
                        <td className="textC" style={{ width: '100px' }}>
                            {value.totalPriceSingle + " " + value.currencyRate}

                        </td>

                        <td className=" textC">
                            {UpdateDateTime(value.dateTime)}

                        </td>
                        <td className=" textC">
                            {UpdateDateTime(value.dayShipping)}

                        </td>
                        <td className=" textC">
                            {value.color + " | " + value.productSizes}





                        </td>
                        <td className="textC">
                            {value.order}
                        </td>
                    </tr>


                )


            })

        }
    }
    showFormProduct = () => {

        return (

            <div id="rightSide">

                <div className="wrapper" id="main_product" style={{ padding: '11px' }}>
                    <div className="widget">
                        <div className="title" >
                            {/* <span className="titleIcon"><input type="checkbox" id="titleCheck" name="titleCheck" /></span> */}
                            <h6>
                                {t("ordered-product-list")}
                            </h6>
                            <div className="num f12">{t("total-quantity")}: <b>{this.state.productTotal}</b> |
                                <i onClick={() => this.refresh()} style={{ cursor: 'pointer', marginLeft: '5px' }} className="fa fa-refresh" aria-hidden="true" />
                            </div>
                        </div>
                        <table cellPadding={0} cellSpacing={0} width="100%" className="sTable mTable myTable" id="checkAll">

                            <thead>
                                <tr>

                                    <td>{t("product-code")}</td>
                                    <td>{t("product")}</td>
                                    <td style={{ width: '90px' }}>{t("quantity")}</td>
                                    <td>{t("unit-price")}</td>
                                    <td>{t("payment")}</td>
                                    <td style={{ width: '160px' }}>{t("purchase-date")}</td>
                                    <td style={{ width: '160px' }}>{t("estimated-delivery-date")}</td>
                                    <td style={{ width: '160px' }}>{t("color") + " | " + t("size")}</td>
                                    <td style={{ width: '70px' }} >{t("status")}</td>
                                </tr>
                            </thead>


                            <tbody className="list_item">
                                {this.showProduct()}

                                <tr>
                                    <td colSpan={10}>

                                        <div className="pagination">

                                            <Pagination
                                                activePage={this.state.currentPage}
                                                itemsCountPerPage={this.state.newsPerPage}
                                                totalItemsCount={this.state.productTotal}
                                                pageRangeDisplayed={5} // show page
                                                // firstPageText ={'Đầu'}
                                                onChange={this.handlePageChange.bind(this)}
                                            />

                                        </div>

                                    </td>
                                </tr>


                            </tbody>
                        </table>

                    </div>
                </div>
                <div className="clear mt30" />

            </div>

        );


    }
    render() {

        return (
            <Fragment>
                {this.showFormProduct()}
            </Fragment>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        languageValue: state.languageValue,
        currencyDefault: state.currencyDefault,
        currencyRate: state.currencyRate,
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        StatusUpdateCartCheckout: (act_statusCartCheckout) => {
            dispatch({ type: 'status_updateCart_Checkout', act_statusCartCheckout })
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FollowOrders)
