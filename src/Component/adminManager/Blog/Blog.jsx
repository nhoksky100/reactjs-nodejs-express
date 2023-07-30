import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import Pagination from "react-js-pagination";

// import { FormatNumber } from '../../FormatNumber';
import ReadMore from '../../ReadMore/ReadMoreContent.jsx';
import FormtitleArea from '../titleAreaFrom/FormtitleArea.jsx';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min.js';



const getDataBlog = () => axios.get('/getdata_blog').then((res) => res.data)
const deleteBlog = (id) => (axios.post('/delete_blog', { id }).then((res) => res.data_sp)) // to mysql res

class Blog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataBlog: null,
            dataTemp: null,
            productTotal: 0,

            searchValueId: '',
            searchValueName: '',

            selectValue: '',
            //edit
            editStatus: false,
            //detail
            detailStatus: false,
            // pagination
            currentPage: 1,
            newsPerPage: 5, // show 5 pt
            pageNumbers: [],


        }
    }

    componentDidMount() {
        if (this.state.dataBlog === null) {
            var pushRes = [];
            getDataBlog().then((res) => {
                if (res) {
                    pushRes = res.reverse();
                    this.setState({
                        dataBlog: pushRes,
                        productTotal: res.length,
                        dataTemp: pushRes
                    })
                }
            })
        }

        if (sessionStorage.getItem('ID_blog') === '' || sessionStorage.getItem('ID_blog') === null) {
            sessionStorage.setItem('ID_blog', '')
        }


    }
    currentTodos = () => {
        const { currentPage, newsPerPage } = this.state; // trang hiện tại acti  //cho trang tin tức mỗi trang
        const indexOfLastNews = currentPage * newsPerPage; // lấy vị trí cuối cùng của trang ,của data
        const indexOfFirstNews = indexOfLastNews - newsPerPage; // lấy vị trí đầu tiên  của trang ,của data
        return this.state.dataBlog.slice(indexOfFirstNews, indexOfLastNews); // lấy dữ liệu ban đầu và cuối gán cho các list
    }


    currentPageBlog = () => {
        if (this.state.dataBlog !== null) {

            const currentTodos = this.currentTodos();


            return currentTodos.map((value, key) => {
                return (
                    <tr className="row_9" key={key}>

                        {/* <td><input type="checkbox" name="id[]" defaultValue={value.ID} /></td> */}
                        <td className="textC">{value.ID}</td>
                        <td>
                            <div className="image_thumb">
                                <img src={value.fileImage} height={50} alt='' />
                                <div className="clear" />
                            </div>
                            <span className="tipS" title={value.title} target="_blank">
                                <b>{value.title}</b>
                            </span>

                        </td>
                        <td className="textC">
                            <ReadMore
                                text={value.painted ? value.painted : ' '}
                                length={40}
                                color={'#45b7f9'}
                            />
                        </td>


                        <td className="textC">{value.dateTime}</td>
                        <td className="textC">{value.dateTimeFix}</td>
                        <td className="textC">{value.catalog}</td>
                        <td className="option textC">
                            <a href='#comment' title={'số lượng bình luận khách'} className="tipS verify_action sup">
                                <span className='comment-amount'>{value.comment}</span>
                                <i className="fa fa-eye" />
                            </a>
                            <NavLink to='/admin/detail-blog.html' onClick={() => this.Detail(value.ID)} className="tipS verify_action" title="Xem chi tiết nội dung">
                                <img src="images/icons/color/view.png" alt='' />
                            </NavLink>
                            <NavLink to='/admin/edit-blog.html' onClick={() => this.Edit(value.ID)} title="Chỉnh sửa" className="tipS verify_action">
                                <img src="images/icons/color/edit.png" alt='' />
                            </NavLink>
                            <a href='#delete' onClick={() => this.Delete(value.ID)} title="Xóa" name='id' className="tipS verify_action">
                                <img src="images/icons/color/delete.png" alt='' />
                            </a>
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


    //xóa
    Delete = (blogId) => {

        var filDelete = [];

        deleteBlog(blogId).then((res) => {
            filDelete = this.state.dataBlog.filter((item) => item.ID !== blogId); // lọc danh sách khác với id đã chọn 
            this.setState({ dataBlog: filDelete }) // cập nhật lại danh sách đã lọc
            toast(<div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" />
                <i>Xóa blog thành công!</i></div>)
        })

    }
    // sửa
    Edit = (id, editStatus) => {

        sessionStorage.setItem('ID_blog', id);

        id = sessionStorage.getItem('ID_blog');
        // console.log(id);
        this.setState({ editStatus: !editStatus })


    }

    Detail = (id) => {
        sessionStorage.setItem('ID_blog', id);

    }

    resetCategory = () => {

        this.setState({
            selectValue: '',
            dataBlog: this.state.dataTemp,

        })
    }

    handlePageChange(currentPage) {
        this.setState({
            currentPage: currentPage,
        });
    }



    showBlog = () => {

        return (

            <div id="rightSide">

                <FormtitleArea
                    managerTitle={'BLog'}
                    managerName={'Quản lý blog'}
                    urlAdd={'/admin/add-blog.html'}
                    imageAdd={'images/icons/control/16/add.png'}
                    urlRating={''}
                    imageRating={''}
                    urlList={'/admin/blog.html'}
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

                            <thead>
                                <tr>
                                    <td style={{ width: '120px' }}>Mã số</td>
                                    <td>Tiêu Đề</td>
                                    <td>Mô tả</td>

                                    <td style={{ width: '75px' }}>Ngày tạo</td>
                                    <td style={{ width: '75px' }}>Ngày sửa</td>
                                    <td style={{ width: '75px' }}>Loại</td>
                                    <td style={{ width: '120px' }}>Hành động</td>
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
                                                    this.state.dataBlog !== null
                                                        ? this.state.dataBlog.length
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

                                {this.currentPageBlog()}
                            </tbody>
                        </table>

                    </div>
                </div>		<div className="clear mt30" />

            </div>

        );

    }
    render() {

        return this.showBlog();

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
export default connect(mapStateToProps, mapDispatchToProps)(Blog);