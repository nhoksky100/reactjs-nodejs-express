import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import Pagination from "react-js-pagination";
import FormtitleArea from '../titleAreaFrom/FormtitleArea';

const getDataAccountCustomer = () => axios.get('/account_customer').then((res) => res.data)
const deleteAdminMember = (ID) => (axios.post('/delete_account_customer', { ID }).then((res) => res.data)) // send mysql res

class ManagerAccountCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataAccountCustomer: null,
      numberAccountCustomer: 0,
      editStatus: false,
      // pagination
      currentPage: 1,
      newsPerPage: 5, // show 5 product
      pageNumbers: [],

    }
  }



  componentDidMount() {

    if (this.state.dataAccountCustomer === null) {
      getDataAccountCustomer().then((res) => {


        this.setState({
          dataAccountCustomer: res,
          numberAccountCustomer: res.length
        })
      })
    }

  }
  // top active page
  handlePageChange(currentPage) {
    this.setState({
      currentPage: currentPage,
    });
  }
  currentTodos = () => {
    const { currentPage, newsPerPage } = this.state; // trang hiện tại acti  //cho trang tin tức mỗi trang
    const indexOfLastNews = currentPage * newsPerPage; // lấy vị trí cuối cùng của trang ,của data
    const indexOfFirstNews = indexOfLastNews - newsPerPage; // lấy vị trí đầu tiên  của trang ,của data
    return this.state.dataAccountCustomer.slice(indexOfFirstNews, indexOfLastNews); // lấy dữ liệu ban đầu và cuối gán cho các list
  }
  showAccountCustomer = () => {
    if (this.state.dataAccountCustomer !== null) {
      const currentTodos = this.currentTodos();
      return currentTodos.map((value, key) => {
        return (
          <tr key={key}>
            <td>
              <span>
                <img className='' style={{ width: '50px', borderRadius: '100%' }} src={value.profile} alt="" />

              </span>
              {/* <input type="checkbox" name="id" defaultValue={value.ID} /> */}
            </td>
            <td className="textC">
              {value.ID}
            </td>
            <td>
              <span title={value.username} className="tipS">
                {value.username}
              </span>
            </td>
            <td>
              <span title={value.email} className="tipS">
                {value.email}
              </span>
            </td>
            <td>
              {value.phone}
            </td>
            <td>
              {value.address}
            </td>
            <td className="option">

              <a href='#delete' onClick={() => this.Delete(value.ID)} title="Xóa" className="tipS verify_action">
                <img src="images/icons/color/delete.png" alt='' />
              </a>
            </td>
          </tr>
        )
      })
    }
  }

  Delete = (Id) => {

    var filDelete = [];
    deleteAdminMember(Id).then((res) => {
      filDelete = this.state.dataAccountCustomer.filter((item) => item.ID !== Id); // filter
      this.setState({ dataAccountCustomer: filDelete }) // update

      toast(<div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" />
        <i>Xóa tài khoản thành công!</i></div>)
    })


  }
  render() {
    if (this.state.editStatus) {
      return <Redirect to='/admin/member-edit.html' />
    }
    return (
      <div>
        <FormtitleArea
          managerTitle={'Tài khoản khách hàng'}
          managerName={'Quản lý tài khoản khách hàng'}
        
        />

        <div className="line" />
        {/* Message */}
        {/* Main content wrapper */}
        <div className="wrapper">
          <div className="widget">
            <div className="title">
              <h6>Danh sách Thành viên</h6>
              <div className="num f12">Tổng số: <b>{this.state.numberAccountCustomer}</b></div>
            </div>
            <form action="/" method="get" className="form" name="filter">
              <table cellPadding={0} cellSpacing={0} width="100%" className="sTable mTable myTable withCheck" id="checkAll">
                <thead>
                  <tr>
                    <td style={{ width: '10px' }}>Hình ảnh</td>
                    <td style={{ width: '80px' }}>Mã số</td>
                    <td>Tên đăng nhập</td>
                    <td>Email</td>
                    <td>Điện thoại</td>
                    <td>Địa chỉ</td>
                    <td style={{ width: '100px' }}>Hành động</td>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <td colSpan={7}>

                      <div className="pagination">

                        <Pagination
                          activePage={this.state.currentPage}
                          itemsCountPerPage={this.state.newsPerPage}
                          totalItemsCount={
                            this.state.dataAccountCustomer !== null
                              ? this.state.dataAccountCustomer.length
                              : 0
                          }
                          pageRangeDisplayed={5} // show page
                          // firstPageText ={'topPrev'}
                          onChange={this.handlePageChange.bind(this)}
                        />

                      </div>
                    </td>
                  </tr>
                </tfoot>
                <tbody>
                  {/* Filter */}
                  {this.showAccountCustomer()}
                </tbody>
              </table>
            </form>
          </div>
        </div>

      </div>

    );
  }
}

export default ManagerAccountCustomer;