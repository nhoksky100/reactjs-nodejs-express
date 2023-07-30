import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Pagination from 'react-js-pagination';
import FormtitleArea from '../titleAreaFrom/FormtitleArea';
import { NavLink } from 'react-router-dom';

const getDataCategory = () => axios.get('/getdata_category').then((res) => res.data) // get data category
const deleteCategory = (ID) => (axios.post('/delete_category', { ID }).then((res_c) => res_c.data_c)) // delete ID data row
class Catalog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataCategory: null,
            allCountCategory: 0,
            //Pagination
            activePage: 15,
            currentPage: 1,
            newsPerPage: 5,
        
            sort: false,
          
        }
    }




    componentDidMount() {
        if (this.state.dataCategory === null) {
            getDataCategory().then((res) => {
                this.setState({
                    dataCategory: res.reverse(),
                    allCountCategory: res.length
                })

            })

        }
        if (sessionStorage.getItem('ID_category') === '' || sessionStorage.getItem('ID_category') === null) {
            sessionStorage.setItem('ID_category', '')
        }

    }
    Filter = () => {
        this.setState({ sort: !this.state.sort })
    }
    handlePageChange(currentPage) {
        // console.log(`active page is ${currentPage}`);
        this.setState({
            currentPage: currentPage,
        });
    }

    currentTodos = () => {
        const { currentPage, newsPerPage } = this.state; // trang hiện tại acti  //cho trang tin tức mỗi trang
        const indexOfLastNews = currentPage * newsPerPage; // lấy vị trí cuối cùng của trang ,của data
        const indexOfFirstNews = indexOfLastNews - newsPerPage; // lấy vị trí đầu tiên  của trang ,của data
        return  this.state.dataCategory.slice(indexOfFirstNews, indexOfLastNews); // lấy dữ liệu ban đầu và cuối gán cho các list
    }
    showCategory = () => {

        if (this.state.dataCategory !== null) {
            const currentTodos = this.currentTodos();
            if (this.state.sort) {
                currentTodos.reverse()

            }
            return currentTodos.map((value, key) => {

                return (
                    <tr className="row_18" key={key}>
                        {/* <td><input type="checkbox" name="id[]" defaultValue={value.ID} /></td> */}
                        <td>{value.name}</td>
                        <td>{value.catalog}</td>
                        {/* <td>{value.total}</td> */}
                        <td  className="option">
                            <NavLink to='/admin/catalog-edit.html' onClick={() => this.Edit(value.ID)} 
                                 
                            title="Chỉnh sửa" className="tipS verify_action"  style={{marginRight:'15px'}}>
                                <img src="images/icons/color/edit.png" alt='' />
                            </NavLink>
                            <a href='#delete' onClick={() => this.Delete(value.ID)} 
                            title="Xóa" name='ID' className="tipS verify_action">
                                <img src="images/icons/color/delete.png" alt='' />
                            </a>
                        </td>
                    </tr>
                )
            })

        }

    }
    Edit = (categoryId) => {
        sessionStorage.setItem('ID_category', categoryId);

    }
    //delete
    Delete = (categoryId) => {
        var filCategoryDelete = [];
        // truyền id đã chọn vào hàm delete sau đó chuyển dữ liệu xuống node . node thông qua thuộc tính name của phần tử đã chọn tiếng hành câu lệnh truy vấn XÓA phần tử đã chọn 
        deleteCategory(categoryId).then((res) => {
            filCategoryDelete = this.state.dataCategory.filter((item) => item.ID !== categoryId); // lọc danh sách khác với id đã chọn 
            this.setState({ dataCategory: filCategoryDelete }) // cập nhật lại danh sách đã lọc
            // console.log(this.state.data_category); 
            toast(<div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" />
                <i>Xóa danh mục thành công!</i></div>)
        })

    }
    render() {
     
        return (
            <div id="rightSide">
                {<FormtitleArea
                    managerTitle={'Danh mục'}
                    managerName={'Quản lý thể loại'}
                    urlAdd={'/admin/catalog-add.html'}
                    imageAdd={'./images/icons/control/16/add.png'}
                   
                />}
                <div className="line" />
                {/* Message */}
                {/* Main content wrapper */}
                <div className="wrapper">
                    {/* Static table */}
                    <div className="widget" id="main_content">
                        <div className="title">
                            {/* <span className="titleIcon"><input type="checkbox" id="titleCheck" name="titleCheck" /></span> */}
                            <h6>Danh sách Danh mục</h6>
                            <div className="num f12">Tổng tất cả: <b>{this.state.allCountCategory}</b></div>
                        </div>
                        <table cellPadding={0} cellSpacing={0} width="100%" className="sTable mTable myTable taskWidget" id="checkAll">
                            <thead>
                                <tr>
                                    {/* <td onClick={() => this.Filter()} style={{ width: '21px', cursor: 'pointer' }}><img src="images/icons/tableArrows.png" /></td> */}
                                    <td>Tên hãng</td>
                                    <td>Loại</td>
                                    {/* <td>Tổng số</td> */}
                                    <td style={{ width: '150px' }}>Hành động</td>
                                </tr>
                            </thead>
                            <tfoot className="auto_check_pages">
                                <tr>

                                    <td colSpan={10}>
                                        <div className="pagination">

                                            <Pagination
                                                activePage={this.state.currentPage}
                                                itemsCountPerPage={this.state.newsPerPage}
                                                totalItemsCount={this.state.allCountCategory} //all category
                                                pageRangeDisplayed={5} // show page
                                                // firstPageText ={'Đầu'}
                                                onChange={this.handlePageChange.bind(this)}
                                            />

                                        </div>


                                    </td>

                                </tr>
                            </tfoot>
                            <tbody>
                                {this.showCategory()}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        );
    }
}

export default Catalog;