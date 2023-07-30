import React, { Component, Fragment } from 'react';
// import Slider from "react-slick";
import axios from 'axios';
import { connect } from 'react-redux';
import { stringtoslug } from '../../stringtoslug';
import { FormatNumber } from '../../FormatNumber';
import { ExChangeRate } from '../../Header/HeaderTop/ExChangeRate';
import { NavLink } from 'react-router-dom';
// import ShowStar from '../../RatingStar/ShowStar';
// import ReadMore from '../../ReadMore/ReadMoreContent';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import Pagination from 'react-js-pagination';
import { t } from 'i18next';
import { toast } from 'react-toastify';
import { addDays } from 'date-fns';


const dataProduct = () => axios.get('/getdata_product_rating').then((res) => res.data)

class ProductOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataOrder: null,
            IdUpdate: '',
            currentPage: 1,
            newsPerPage: 5, // show 5 product
            pageNumbers: [],
            disabled: false,
            isID: false
        }
    }
    componentDidMount() {
        if (this.state.dataOrder === null) {

            this.dataProductOrder()
        }


    }
    dataProductOrder = () => {
        var id = sessionStorage.getItem('ID_details_product');

        var category = [], detailId = [];
        if (id !== 'null' && id !== null) {


            dataProduct().then((res) => {

                detailId = res.filter((itemDetail) => itemDetail.id === id);

                if (detailId[0].productCategory === undefined) {
                    detailId[0].productCategory = ' '
                }
                if (detailId[0].productCategory !== 'Accessories') {
                    // var categoryOne = detailId[0].product_category;
                    // categoryOne = categoryOne.split('#');

                    category = res.filter((itemDetail) =>
                        itemDetail.productCategory.includes(detailId[0].productCategory) && itemDetail.id !== id
                        // tìm sản phẩm có thể loại bằng thể loại của sản phẩm chi tiết và kkhông trùng sản phẩm chi tiết đó
                    );

                } else {
                    category = res.filter((itemDetail) => itemDetail.productCategory === 'Accessories' && itemDetail.id !== id);
                }
                this.setState({
                    dataOrder: category,
                    IdUpdate: id
                    // detailId: detailId
                })
            })
        } else { this.setState({ isID: true }) }
    }
    componentDidUpdate(prevProps, prevState) {
        var { IdUpdate } = this.state
        var id = sessionStorage.getItem('ID_details_product');
        if (IdUpdate !== id) {
            this.setState({ IdUpdate: id })
            this.dataProductOrder()
        }

    }

    //curent
    currentTodos = (dataOrder) => {
        if (dataOrder) {
            const { currentPage, newsPerPage } = this.state; // trang hiện tại acti  //cho trang tin tức mỗi trang
            const indexOfLastNews = currentPage * newsPerPage; // lấy vị trí cuối cùng của trang ,của data
            const indexOfFirstNews = indexOfLastNews - newsPerPage; // lấy vị trí đầu tiên  của trang ,của data
            return dataOrder.slice(indexOfFirstNews, indexOfLastNews); // lấy dữ liệu ban đầu và cuối gán cho các list
        }

    }
    //pageChange
    handlePageChange(currentPage) {
        this.setState({
            currentPage: currentPage,
        });
    }
    // set id product
    getDetailsProductSingle = (dataDatailProductSingle) => {
        sessionStorage.setItem('ID_details_product', dataDatailProductSingle.id);
    }

    //send database cart 
    sendShowCart = (dataCart, color, emailCustomer) => {
        var dayShipping = addDays(new Date(), 14), quantity = 1 // 14 ngày sau | số lượng mặt định 11
        setTimeout(() => {
            axios.post('/dataCart',
                {
                    dataCart, color, dayShipping, quantity, emailCustomer,
                })
                .then((res) => {


                    this.props.PRODUCT_CART(res.data);
                    this.props.CART_ADD_STATUS(true);
                    toast(<div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" />
                        <i>{t("add-to-cart-successfully")}!</i></div>)
                    this.setState({ disabled: false })
                })
        }, 1500)
        this.setState({ disabled: true })
    }
    //add cart
    addToCart = (dataCart) => {


        const color = ' ';
        const tokenIdCustomer = localStorage.getItem('tokenIdCustomer');
        if (tokenIdCustomer) {


            var profileEmail = JSON.parse(localStorage.getItem('tokenProfileCustomer'));
            // console.log(profileEmail.email);
            if (profileEmail) {


                this.sendShowCart(dataCart, color, profileEmail.email)
            }
        } else {
            toast(<div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" />
                <i>{t("sign-in-to-buy-products")}!</i></div>)
        }
    }

    showOderProduct = () => {


        var { dataOrder } = this.state
        if (dataOrder) {
            var { currencyDefault, currencyRate } = this.props;
            const dataCureent = this.currentTodos(dataOrder);
            return dataCureent.map((value, key) => (
                <div className="col-sm-6 col-md-3 product" key={key}>
                    <div className="body">
                        {/* <a href="#favorites" className="favorites" data-favorite="inactive"><i className="ion-ios-heart-outline" /></a> */}
                        <NavLink to={'/detail-product/' + stringtoslug(value.productName) + ".html"}>
                            <img onClick={() => this.getDetailsProductSingle(value)} src={value.productImage} alt={value.productName} title={value.productName} />
                        </NavLink>
                        <div className="content">
                            <h1 className="h3" title={value.productName}>{value.productName}</h1>
                            <div className="price-box pt-20">
                                <span className="new-price new-price-2">
                                    {FormatNumber(ExChangeRate(value.productComplatePrice, currencyDefault, currencyRate))}
                                    {currencyRate ? currencyRate[0] : currencyDefault[0]}
                                </span>
                                {
                                    value.productReducedPrice.split(",")[0] !== '0' && value.productReducedPrice.split(",")[0] !== ''
                                        ? <span className="old-price">
                                            {FormatNumber(ExChangeRate(value.productPrice, currencyDefault, currencyRate))}
                                            {currencyRate ? currencyRate[0] : currencyDefault[0]}
                                        </span>

                                        : ''
                                }
                                {
                                    value.productReducedPrice.split(",")[0] !== '0' && value.productReducedPrice.split(",")[0] !== ''
                                        ? <span className="discount-percentage">{'-' + value.productReducedPrice.split(",")[0] + '%'}</span>
                                        : ''
                                }
                            </div>
                            <label>{value.productCategory}</label>

                            <NavLink to={'/detail-product/' + stringtoslug(value.productName) + ".html"}>
                                <button onClick={() => this.getDetailsProductSingle(value.id)} className="btn btn-link">
                                    <i className="ion-android-open" /> {t("detail")}
                                </button>
                            </NavLink>
                            <button onClick={() => this.addToCart(value)} disabled={this.state.disabled}
                                className="btn btn-primary btn-sm rounded"> <i className="ion-bag" /> {t("add-to-cart")}
                            </button>
                        </div>
                    </div>
                </div>
            ))

        }

    }
    render() {
        if (this.state.isID) {
            return <Redirect to='/' />
        }
        return (
            <Fragment>

                <div className="products">
                    <div className='row'>
                        <h2>{t("related-products")}</h2>
                    </div>
                    <div className="row">
                        {this.showOderProduct()}
                        <div className="pagination">
                            {
                                this.state.dataOrder !== null && this.state.dataOrder.length > 4 &&

                                < Pagination
                                    activePage={this.state.currentPage}
                                    itemsCountPerPage={this.state.newsPerPage}
                                    totalItemsCount={
                                        this.state.dataOrder !== null
                                            ? this.state.dataOrder.length
                                            : 0
                                    }
                                    pageRangeDisplayed={4} // show page
                                    // firstPageText ={'Đầu'}
                                    onChange={this.handlePageChange.bind(this)}
                                />
                            }

                        </div>
                    </div>
                </div>

            </Fragment>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        // valSortName: state.valSortName,
        currencyDefault: state.currencyDefault,
        currencyRate: state.currencyRate,
        languageValue: state.languageValue,
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        PRODUCT_CART: (cart_product_ac) => {
            dispatch({ type: 'product_cart', cart_product_ac })
        },
        CART_ADD_STATUS: (cart_add_status) => {
            dispatch({ type: 'cart_add_status', cart_add_status })
        },
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(ProductOrder)
