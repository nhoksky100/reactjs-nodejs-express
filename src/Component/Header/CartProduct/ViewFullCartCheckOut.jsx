import React, { Component, Fragment } from 'react';
// import { NavLink, Redirect } from 'react-router-dom';
import axios from 'axios';
import Pagination from "react-js-pagination";
import { FormatNumber } from '../../FormatNumber';
// import dateTime from '../../UpdateDateTime.jsx';
import CheckOut from '../CartProduct/CheckOut';
import { connect } from 'react-redux';
import { ExChangeRate } from '../HeaderTop/ExChangeRate';
import { t } from 'i18next';


const getDataCartFull = () => axios.get('/dataCart').then((res) => res.data)

class ViewFullCartCheckOut extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataCart: null,
            productTotal: 0,

            // pagination
            activePage: 15,
            currentPage: 1,
            newsPerPage: 5,
            pageNumbers: [],

            // quantity
            totalPrice: 0,
            Price: [],
            quantity: [],

            //show hide checkout    
            statusCheckOut: true,
            note: '',
            //show hide form list cart
            statusListCart: false,
            //poppup
            depth: '',
            fade: '',
            // checkbox product
            idCheckbox: true,
            isChecked: false,

            idCheckboxs: [],


        }
        // this.showProduct = this.showProduct.bind()
    }
    dataFullCart = () => {
        var profile = JSON.parse(localStorage.getItem('tokenProfileCustomer'));

        if (profile) {
            var pushPrice = [];
            var pushquantity = [];
            var dataCartNew = [];
            var countPrice = 0;
            var idCheckboxs = []
            getDataCartFull().then((res) => {
                res.map((value, key) => {
                    if (value.emailCustomer === profile.email) {
                        dataCartNew.push(value);
                        pushPrice.push(value.price)
                        pushquantity.push(value.quantity)
                        countPrice += parseInt(value.price * value.quantity) // initial total

                    }
                    idCheckboxs[key] = true
                    return res
                })

                this.setState({
                    dataCart: dataCartNew,
                    productTotal: dataCartNew.length,
                    totalPrice: countPrice,
                    Price: pushPrice,
                    quantity: pushquantity,
                    idCheckboxs: idCheckboxs


                })
            })
        }
    }
    componentDidMount() {
        this.dataFullCart()
    }
    componentDidUpdate(prevProps, prevState) {
        var statuCartCheckout = this.props.statuCartCheckout;

        if (statuCartCheckout) {
            this.dataFullCart()
            this.props.StatusUpdateCartCheckout(false);
        }



    }

    handlePageChange(currentPage) {

        this.setState({
            currentPage: currentPage,
        });
    }
    //set pagination
    currentTodos = (dataCart) => {
        var { currentPage, newsPerPage } = this.state; // trang hiện tại acti  //cho trang tin tức mỗi trang
        var indexOfLastNews = currentPage * newsPerPage; // lấy vị trí cuối cùng của trang ,của data
        var indexOfFirstNews = indexOfLastNews - newsPerPage; // lấy vị trí đầu tiên  của trang ,của data
        return dataCart.slice(indexOfFirstNews, indexOfLastNews); // lấy dữ liệu ban đầu và cuối gán cho các list
    }
    //quantity

    updatequantity = (e, index, targetChecked) => {
        var { Price, quantity, idCheckboxs } = this.state;
        var countquantity = quantity;
        var total = 0



        var el = parseInt(e.target.id.split("_")[1], 10);
        countquantity[el] = parseInt(e.target.value, 10);

        if (idCheckboxs[index]) {


            for (let i = 0; i < countquantity.length; i++) {



                if (countquantity[i] <= 0) {
                    countquantity[i] = 1

                }
                if (countquantity[i] > 0) {
                    total += parseInt(Price[i] * countquantity[i])

                }

            }

            this.setState({
                quantity: countquantity,
                totalPrice: total,
                // statusCheckOut: !this.state.statusCheckOut

            });
        }
    }

    onChangeNote = (e) => {
        var name = e.target.name;
        this.setState({
            [name]: e.target.value
        })
    }

    // refesh data
    refresh = () => {
        this.dataFullCart()
    }
    removeProduct = (dataCart, removeKey) => {
        var data = dataCart.filter((item, key) => key !== removeKey);
        axios.post('/removeDataCart', { data }).then((res) => {
            setTimeout(() => {
                this.dataFullCart()

            }, 500);
            // update cart
            this.props.StatusUpdateCartCheckout(true)
        })

    }

    //remove product
    isCheckboxId = (e, index) => {
        // var name = e.target.name
        var { idCheckboxs, totalPrice, Price, quantity } = this.state


        idCheckboxs[index] = e.target.checked
        if (!idCheckboxs[index]) {
            // false
            totalPrice = totalPrice - (Price[index] * quantity[index])
            this.setState({
                totalPrice: totalPrice
            })
        } else {
            if (quantity[index] <= 0) {
                quantity[index] = 1
            }
            totalPrice = totalPrice + ((Price[index] * quantity[index]))
            this.setState({
                totalPrice: totalPrice
            })
        }

        this.setState({
            idCheckboxs: idCheckboxs,
        })
    }

    showProduct = () => {
        var { dataCart, idCheckboxs } = this.state;

        if (dataCart) {
            var currentTodos = this.currentTodos(dataCart);

            currentTodos.sort((a, b) => a.ID - b.ID); //rating id

            return currentTodos.map((value, key) => {

                return (
                    <tr className="row_9" key={key} >

                        <td><input

                            checked={idCheckboxs[key]}
                            // checked={this.state.idCheckbox}

                            type="checkbox" onChange={(e) => this.isCheckboxId(e, key)} name={"idCheckbox" + key} />
                        </td>
                        <td className="textC">{value.productId && value.productId}</td>
                        <td>
                            <div className="image_thumb">
                                <img src={value.image} height={50} alt='' />
                                <div className="clear" />
                            </div>
                            <span className="tipS" title={value.productName}>
                                <b>{value.productName}</b>
                            </span>

                        </td>
                        <td className="textC" >
                            {/* <div className='controls'> */}

                            <div className="" style={{ margin: '0 auto' }}>

                                <input type="number"
                                    className="form-control input-sm" placeholder="Qty"
                                    style={{ textAlign: 'center', margin: '0', padding: '0', width: 'auto' }}
                                    onChange={(e) => this.updatequantity(e, key)}
                                    value={this.state.quantity[key] || value.quantity}
                                    id={"product_" + key}
                                //   readOnly
                                />

                            </div>



                            {/* </div> */}

                        </td>
                        <td className="textC">
                            {FormatNumber(value.price)}
                        </td>
                        <td className=" textC">
                            {value.color}

                        </td>
                        <td className=" textC">
                            {value.productSizes}

                        </td>
                        <td className=" textC">
                            {value.productReducedPrice && - value.productReducedPrice + '%'}

                        </td>
                        <td className="textC ">
                            <a href='#removeCart' onClick={() => this.removeProduct(dataCart, key)} style={{ cursor: 'pointer' }}> <i className="ion-trash-b" /> {t("delete")} </a>
                        </td>
                    </tr >


                )


            })

        }
    }

    // check all checkbox total price quantity
    checkAll = (e) => {
        var { idCheckboxs, idCheckbox, quantity, Price } = this.state
        var total = 0
        for (let i = 0; i < idCheckboxs.length; i++) {
            idCheckboxs[i] = !idCheckbox
            if (e.target.checked) {
                if (quantity[i] <= 0) {
                    quantity[i] = 1
                }
                total += quantity[i] * Price[i]
            }

        }
        if (!e.target.checked) {
            this.setState({
                totalPrice: 0
            })
        } else {
            this.setState({
                totalPrice: total
            })
        }
        this.setState({
            idCheckbox: !idCheckbox,
            idCheckboxs: idCheckboxs
        })

    }
    showFormProduct = () => {
        if (this.state.statusListCart) {
            var { currencyDefault, currencyRate } = this.props;
            return (

                <div id="rightSide">

                    <div className="wrapper" id="main_product" style={{ padding: '11px' }}>
                        <div className="widget">
                            <div className="title" >
                                <span className="titleCheckbox"><input
                                    onChange={(e) => this.checkAll(e)}
                                    checked={this.state.idCheckbox}
                                    type="checkbox" id="titleCheck" name="titleCheck" />
                                </span>
                                <h6>
                                    {t("ordered-product-list")}
                                </h6>
                                <div className="num f12">{t("total-quantity")}: <b>{this.state.productTotal}</b> |
                                    <i onClick={() => this.refresh()} style={{ cursor: 'pointer' }} className="fa fa-refresh" aria-hidden="true" />
                                </div>
                            </div>
                            <table cellPadding={0} cellSpacing={0} width="100%" className="sTable mTable myTable" id="checkAll">

                                <thead>
                                    <tr>
                                        <td id='checkProduct' style={{ width: '21px', cursor: 'pointer' }}></td>
                                        <td>{t("code")}</td>
                                        <td>{t("product")}</td>
                                        <td >{t("quantity")}</td>
                                        <td>{t("unit-price")}</td>
                                        <td style={{ width: '100px' }}>{t("color")}</td>
                                        <td style={{ width: '100px' }}>{t("size")}</td>
                                        <td style={{ width: '100px' }}>{t("reduced-price")}</td>
                                        <td style={{ width: '50px' }} >{t("act")}</td>
                                    </tr>
                                </thead>


                                <tbody className="list_item">

                                    {this.showProduct()}
                                    <tr>
                                        <td className="textC" colSpan={9}>
                                            <h6 >
                                                {t("note")}
                                            </h6>
                                        </td>

                                    </tr>
                                    <tr>
                                        <td className="textC" colSpan={9}>
                                            <form>

                                                <textarea style={{ fontSize: '22px' }} name='note' ></textarea>
                                            </form>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td colSpan={10}>
                                            <table>
                                                <tbody>
                                                    <tr>

                                                        <td>
                                                            {t("total-payment")}:
                                                            <h6>
                                                                {FormatNumber(ExChangeRate(this.state.totalPrice, currencyDefault, currencyRate))}
                                                                {currencyRate ? currencyRate[0] : currencyDefault[0]}

                                                            </h6>
                                                        </td>

                                                    </tr>

                                                </tbody>
                                            </table>

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

    }
    //from check out
    formCheckOut = () => {

        if (this.state.statusCheckOut) {
            var { quantity, totalPrice, dataCart, note, idCheckboxs } = this.state;
            var profile = JSON.parse(localStorage.getItem('tokenProfileCustomer'))
            var pushDataCheckout = [], pushQuantity = []

            if (totalPrice > 0) {
                // lọc danh sách đã chọn sản phẩm của khách hàng
                for (let i = 0; i < idCheckboxs.length; i++) {
                    if (idCheckboxs[i]) {
                        pushDataCheckout.push(dataCart[i])
                        pushQuantity.push(quantity[i])
                    }

                }
                // console.log(dataCart);

                //update isCheckbox product
                return <CheckOut
                    quantity={pushQuantity}
                    totalPrice={totalPrice}
                    dataCart={pushDataCheckout}
                    note={note}
                    profile={profile}

                />





            }
        }


    }


    //button show hide form 
    statusShowHideListCart = () => {
        var { statusListCart } = this.state;
        this.setState({
            statusListCart: !statusListCart
        })
    }
    statusShowHideCheckOut = () => {
        var { statusCheckOut } = this.state;
        this.setState({
            statusCheckOut: !statusCheckOut
        })
    }
    buttonShowHide = () => {
        return (
            <Fragment>
                <div type="button" onClick={() => this.statusShowHideListCart()} className="press-effect button-2">
                    {this.state.statusListCart
                        ? t("hide-list-cart")
                        : t("show-list-cart")
                    }
                </div>
                <div type="button" onClick={() => this.statusShowHideCheckOut()} className="press-effect button-2">
                    {this.state.statusCheckOut
                        ? t("hide-checkOut")
                        : t("show-checkOut")
                    }
                </div>
            </Fragment>
        )
    }


    render() {

        // if (!localStorage.getItem('tokenProfileCustomer') && this.state.productTotal <= 0) {
        //     return <Redirect to='/' />
        // }
        return (
            <Fragment>
                <div id="rightSide">
                    {this.buttonShowHide()}
                    <div className="line" />

                    {this.showFormProduct()}


                    {this.formCheckOut()}



                </div>


            </Fragment >
        )

    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        statuCartCheckout: state.statuCartCheckout,
        currencyDefault: state.currencyDefault,
        currencyRate: state.currencyRate,
        languageValue: state.languageValue
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {

        StatusUpdateCartCheckout: (act_statusCartCheckout) => {
            dispatch({ type: 'status_updateCart_Checkout', act_statusCartCheckout })
        },
        dataCartCheckout: (act_dataCartCheckout) => {
            dispatch({ type: 'datacartcheckout', act_dataCartCheckout })
        },

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewFullCartCheckOut)
