import React, { Component } from 'react';
// import { NavLink, Redirect } from 'react-router-dom';
import axios from 'axios';
import Pagination from "react-js-pagination";
import FormtitleArea from '../titleAreaFrom/FormtitleArea';


const getProduct = () => axios.get('/getdata_product_rating').then((res) => res.data)
class Ratings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProduct: null,
            productTotal: 0,

            // pagination
            activePage: 15,
            currentPage: 1,
            newsPerPage: 5,
            pageNumbers: [],

            //sort
            filTer: false,
            heartLike: false,
            buy: false,
            star: false


        }
    }

    componentDidMount() {
        if (this.state.dataProduct === null) {
            var pushData = [];
            getProduct().then((res) => {
                pushData = res.reverse();
                this.setState({
                    dataProduct: pushData,
                    productTotal: res.length,

                })
            })
        }
    }

    handlePageChange(currentPage) {
        // console.log(`active page is ${currentPage}`);
        this.setState({
            currentPage: currentPage,
        });
    }
    // Sort status
    //filter sort
    SortFilter = () => {
        this.setState({ filTer: !this.state.filTer })
    }
    SortHeartLike = () => {
        // status
        this.setState({ heartLike: !this.state.heartLike })

    }
    SortStar = () => {
        // status
        this.setState({ star: !this.state.star })

    }
    SortBuy = () => {
        // status
        this.setState({ buy: !this.state.buy })

    }
    // sort curren
    Sorts = (currentTodos) => {
        if (this.state.filTer) {
            currentTodos.reverse();
        }
        else if (this.state.heartLike) {
            currentTodos.sort((a, b) => parseInt(a.heart_like) - parseInt(b.heart_like)).reverse()
        }
        else if (this.state.star) {
            currentTodos.sort((a, b) => parseInt(a.rating_star) - parseInt(b.rating_star)).reverse()
        }
        else if (this.state.buy) {
            currentTodos.sort((a, b) => parseInt(a.buy) - parseInt(b.buy)).reverse()
        }
    }
    currentTodos = () => {
        const { currentPage, newsPerPage } = this.state; // trang hiện tại acti  //cho trang tin tức mỗi trang
        const indexOfLastNews = currentPage * newsPerPage; // lấy vị trí cuối cùng của trang ,của data
        const indexOfFirstNews = indexOfLastNews - newsPerPage; // lấy vị trí đầu tiên  của trang ,của data
        return this.state.dataProduct.slice(indexOfFirstNews, indexOfLastNews); // lấy dữ liệu ban đầu và cuối gán cho các list
    }

    showProduct = () => {
        if (this.state.dataProduct !== null) {

            const currentTodos = this.currentTodos();
            this.Sorts(currentTodos)
            // currentTodos.sort((a,b)=> a.ID - b.ID); //rating id

            return currentTodos.map((value, key) => {

                return (
                    <tr className="row_9" key={key}>

                        <td><input type="checkbox" name="id" defaultValue={value.id} /></td>
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
                                Đã bán: {value.buy}
                                | Xem: {value.view}
                            </div>
                        </td>
                        <td className="textR">
                            {value.heart_like}
                        </td>
                        <td className="textC">
                            {value.rating_star}
                        </td>
                        <td className="option textC">
                            {value.buy}
                        </td>
                    </tr>
                )


            })

        }
    }

    showFormProduct = () => {

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
                                Danh sách sản phẩm
                            </h6>
                            <div className="num f12">Tổng số lượng: <b>{this.state.productTotal}</b></div>
                        </div>
                        <table cellPadding={0} cellSpacing={0} width="100%" className="sTable mTable myTable" id="checkAll">

                            <thead>
                                <tr>
                                    <td onClick={() => this.SortFilter()} id='sort' style={{ width: '21px', cursor: 'pointer' }}><img src="images/icons/tableArrows.png" alt='' /></td>
                                    <td style={{ width: '60px' }}>Mã số</td>
                                    <td>Sản phẩm</td>
                                    <td>Lượt bình luận</td>
                                    <td style={{ width: '75px' }}>Số sao</td>
                                    <td style={{ width: '120px' }}>Số lượng mua</td>
                                </tr>
                            </thead>
                            <tfoot className="auto_check_pages">
                                <tr>
                                    <td colSpan={10}>
                                        <div className="list_action itemActions" >
                                            <a onClick={() => this.SortHeartLike()} href="#sort" id="submit" className="button blueB rating-like" url="admin/product/del_all.html">
                                                <span style={{ color: 'white' }}>Xếp hạng bình luận <i className="fa fa-commenting-o" aria-hidden="true" /></span>
                                            </a>
                                        </div>
                                        <div className="list_action itemActions">
                                            <a onClick={() => this.SortStar()} href="#sort" id="submit" className="button blueB rating-star" url="admin/product/del_all.html">
                                                <span style={{ color: 'white' }}>Xếp hạng sao <i className="fa fa-star-half-o" aria-hidden="true" /></span>
                                            </a>
                                        </div>
                                        <div className="list_action itemActions">
                                            <a onClick={() => this.SortBuy()} href="#sort" id="submit" className="button blueB rating-money" url="admin/product/del_all.html">
                                                <span style={{ color: 'white' }}>Xếp hạng mua <i className="fa fa-money" aria-hidden="true" /></span>
                                            </a>
                                        </div>
                                        {/*  */}
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
                            </tfoot>
                            <tbody className="list_item">

                                {this.showProduct()}
                            </tbody>
                        </table>

                    </div>
                </div>		<div className="clear mt30" />

            </div>

        );

    }
    render() {
        return this.showFormProduct();

    }
}

export default Ratings