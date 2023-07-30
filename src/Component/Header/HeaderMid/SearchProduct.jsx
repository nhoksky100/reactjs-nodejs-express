import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { stringtoslug } from '../../stringtoslug.js';
import { FormatNumber } from '../../FormatNumber.jsx';
import Pagination from 'react-js-pagination';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ExChangeRate } from '../HeaderTop/ExChangeRate.jsx';
import { addDays } from 'date-fns';
// import Footer from '../../Footer/Footer.jsx';


// const getdataSearch = () => axios.get('/search').then((res) => res.data);
class SearchProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProduct: null,
            dataCurrentPage: [],
            currentPage: 1,
            newsPerPage: 8, // show 8 product

        }
    }

    componentDidMount() {
        if (this.state.dataProduct === null) {
            // var dataSearch = this.props.search_value;
            var { search_value } = this.props;


            if (search_value.length === 0) {

                search_value = JSON.parse(sessionStorage.getItem('SearchValue'))
                this.setState({ dataProduct: search_value })

            } else {
                this.setState({ dataProduct: search_value })
            }

        }
        if (sessionStorage.getItem('ID_details_product') === '' || sessionStorage.getItem('ID_details_product') === 'undefined' ||
            sessionStorage.getItem('ID_details_product') === null || sessionStorage.getItem('ID_details_product') === ' ') {
            sessionStorage.setItem('ID_details_product', null);
        } else {
            sessionStorage.setItem('ID_details_product', null);
        }



    }


    componentDidUpdate(prevProps, prevState) {
        var { search_value, select_search } = this.props;
        if (search_value.length !== 0) {
            if (prevState.dataProduct !== search_value) {
                this.setState({ dataProduct: search_value })
            }
        } else if (select_search.length !== 0) {
            if (prevState.dataProduct !== select_search) {
                this.setState({ dataProduct: select_search })
            }
        }
    }

    getDetailsProductSingle = (IdProductDetails) => {
        sessionStorage.setItem('ID_details_product', IdProductDetails);
    }

    //curent
    currentTodos = (dataProduct) => {
        if (dataProduct) {
            const { currentPage, newsPerPage } = this.state; // trang hiện tại acti  //cho trang tin tức mỗi trang
            const indexOfLastNews = currentPage * newsPerPage; // lấy vị trí cuối cùng của trang ,của data
            const indexOfFirstNews = indexOfLastNews - newsPerPage; // lấy vị trí đầu tiên  của trang ,của data
            return this.state.dataProduct.slice(indexOfFirstNews, indexOfLastNews); // lấy dữ liệu ban đầu và cuối gán cho các list
        }

    }

    //pageChange
    handlePageChange(currentPage) {
        this.setState({
            currentPage: currentPage,
        });
    }

    //send database cart 
    sendShowCart = (dataCart, color, emailCustomer) => {
        var dayShipping = addDays(new Date(), 14), quantity = 1 // 14 ngày sau | số lượng mặt định 1
        axios.post('/dataCart',
            {
                dataCart, color, dayShipping, quantity, emailCustomer,
            })
            .then((res) => {
                setTimeout(() => {

                    this.props.PRODUCT_CART(res.data);
                    this.props.CART_ADD_STATUS(true);

                }, 1000)
            })

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
                <i>Đăng nhập để mua sản phẩm!</i></div>)
        }
    }

    showSearch = () => {

        var { dataProduct } = this.state;


        if (dataProduct) {
            var { currencyDefault, currencyRate } = this.props;
            const dataCureent = this.currentTodos(dataProduct);
            return dataCureent.map((value, key) => {



                //search_value

                return (

                    <div className="col-sm-6 col-md-3 product" key={key}>
                        <div className="body">
                            {/* <a href="#favorites" className="favorites" data-favorite="inactive"><i className="ion-ios-heart-outline" /></a> */}
                            <NavLink to={'/detail-product/' + stringtoslug(value.productName) + ".html"}>
                                <img onClick={() => this.getDetailsProductSingle(value.id)} src={value.productImage} alt={value.productName} />
                            </NavLink>
                            <div className="content">
                                <h1 className="h3">{value.productName}</h1>
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
                                        <i className="ion-android-open" /> Chi tiết
                                    </button>
                                </NavLink>
                                <button onClick={() => this.addToCart(value)} className="btn btn-primary btn-sm rounded"> <i className="ion-bag" /> Thêm vào giỏ</button>
                            </div>
                        </div>
                    </div>
                )






            })
        }
    }
    isShow = () => {
        var pathStore = this.props.match.path;

        if (pathStore === '/search-product.html') {
            return (
                <div className="container">

                    <div className="row">

                        {/* Filter */}

                        {/* /// */}
                        {/* Products */}
                        {/* <div className="col-sm-8 col-md-9"> */}
                        <hr className="offset-lg" />
                        {this.showSearch()}
                        {/* </div> */}
                        <div className="pagination">
                            {this.state.dataProduct !== null && this.state.dataProduct.length > 8 &&

                                < Pagination
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
                            }

                        </div>
                    </div>
                    {/* /// */}
                </div>
            )
        }
    }
    render() {
        return (
            <Fragment>


                <div className="products">
                    <div className="row">
                        {this.isShow()}

                    </div>
                </div>
                {/* <Footer /> */}
            </Fragment>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        select_search: state.select_search,
        search_value_status: state.search_value_status,
        search_value: state.search_value,
        currencyDefault: state.currencyDefault,
        currencyRate: state.currencyRate
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        Select_search: (Search_act) => {
            dispatch({ type: 'select_search', Search_act })
        },
        PRODUCT_CART: (cart_product_ac) => {
            dispatch({ type: 'product_cart', cart_product_ac })
        },
        CART_ADD_STATUS: (cart_add_status) => {
            dispatch({ type: 'cart_add_status', cart_add_status })
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchProduct);
