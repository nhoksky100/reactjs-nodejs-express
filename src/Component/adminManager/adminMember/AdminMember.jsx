import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import FormtitleArea from '../titleAreaFrom/FormtitleArea';
import { NavLink } from 'react-router-dom/';
import { UpdateDateTime } from '../../UpdateDateTime';
const getdataAdminMember = () => axios.get('/getdata_admin_member').then((res) => res.data)
const deleteAdminMember = (ID) => (axios.post('/delete_admin_member', { ID }).then((res_c) => res_c.data_c)) // send mysql res
const permissionMember = () => axios.get('/login_member_json').then((res) => res.data)

class AdminMember extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataAdminMember: null,
      numberMember: 0,

      enabled: ''

    }
  }



  componentDidMount() {

    if (this.state.dataAdminMember === null) {
      getdataAdminMember().then((res) => {
        this.setState({
          dataAdminMember: res,
          numberMember: res.length
        })
      })
    }

    //set permission login admin
    permissionMember().then((res) => {
      if (res.permission === 'user') {

        this.setState({
          enabled: 'none',
          idPermission: res.id,
          isPermission: res.permission
        })
      }
      else if (res.permission === 'admin') {

        this.setState({
          enabled: '',
          idPermission: res.id,
          isPermission: res.permission
        })
      }

    })
    if (sessionStorage.getItem('ID_user_admin') === '' || sessionStorage.getItem('ID_user_admin') === null) {
      sessionStorage.setItem('ID_user_admin', '')
    }
  }
  showAdminMember = () => {

    if (this.state.dataAdminMember) {
      return this.state.dataAdminMember.map((value, key) => {


        return (
          <tr key={key}>
            {/* <td>
              <input type="checkbox" name="id" defaultValue={value.ID} />
            </td> */}
            <td className="textC">
              {value.ID}
            </td>
            <td>
              <span title={value.name} className="tipS">
                {value.name}
              </span>
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
            <td>
              {UpdateDateTime(value.dateTime)}
            </td>
            <td style={{ position: 'relative' }}>
              {value.permission}
              {
                value.permission === 'admin'
                  ? <img style={{ position: 'absolute', right: '30%', }} src="images/icons/control/32/user_item.png" alt='' />
                  : <img style={{ position: 'absolute', right: '40%' }} src="images/icons/control/32/user.png" alt='' />
              }

            </td>
            <td className="option"

              title={
                this.state.isPermission === 'user' &&
                  value.permission === 'user' && value.ID !== this.state.idPermission
                  ? 'Chỉ có admin mới vào phần này'
                  : this.state.isPermission === 'admin' &&
                    value.permission === 'admin' && value.ID !== this.state.idPermission ? 'admin không được thay đổi phần admin này' : ''
              }
            >
              {/* edit */}
              {
                this.state.isPermission === 'user' ?
                  <NavLink to='/admin/member-edit.html'
                    href='#delete'
                    style={
                      value.permission === 'user' && value.ID === this.state.idPermission ?
                        { pointerEvents: '' } : { pointerEvents: 'none' }
                    }

                    onClick={() => this.Edit(value.ID)} title="Sửa" className="tipS verify_action permission-edit">
                    <img src="images/icons/color/edit.png" alt='' />
                  </NavLink>

                  : this.state.isPermission === 'admin' &&
                  <NavLink to='/admin/member-edit.html'
                    href='#delete'
                    style={
                      value.permission === 'admin' && value.ID !== this.state.idPermission ?
                        { pointerEvents: 'none' } : { pointerEvents: '' }
                    }

                    onClick={() => this.Edit(value.ID)} title="Sửa" className="tipS verify_action permission-edit">
                    <img src="images/icons/color/edit.png" alt='' />
                  </NavLink>
              }

              {/* delete */}
              {
                this.state.isPermission === 'user' ?
                  < a
                    href='#delete'
                    style={
                      value.permission === 'user' && value.ID === this.state.idPermission ?
                        { pointerEvents: '' } : { pointerEvents: 'none' }
                    }

                    onClick={() => this.Delete(value.ID)} title="Xóa" className="tipS verify_action permission-delete">
                    <img src="images/icons/color/delete.png" alt='' />
                  </a>

                  : this.state.isPermission === 'admin' &&
                  < a
                    href='#delete'
                    style={
                      value.permission === 'admin' && value.ID !== this.state.idPermission ?
                        { pointerEvents: 'none' } : { pointerEvents: '' }
                    }

                    onClick={() => this.Delete(value.ID)} title="Xóa" className="tipS verify_action permission-delete">
                    <img src="images/icons/color/delete.png" alt='' />
                  </a>
              }

            </td>
          </tr >
        )
      })
    }
  }
  //edit
  Edit = (Id) => {
    sessionStorage.setItem('ID_user_admin', Id);

  }
  Delete = (Id) => {

    var filDelete = [];
    deleteAdminMember(Id).then((res) => {
      filDelete = this.state.dataAdminMember.filter((item) => item.ID !== Id); // filter
      this.setState({ dataAdminMember: filDelete }) // update

      toast(<div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" />
        <i>Xóa thành viên thành công!</i></div>)
    })


  }
  render() {

    return (
      <div>
        <FormtitleArea
          managerTitle={'Thành viên'}
          managerName={'Quản lý thành viên'}
          urlAdd={'/admin/member-add.html'}
          imageAdd={'images/icons/control/16/add.png'}
        />

        <div className="line" />

        {/* Main content wrapper */}
        <div className="wrapper">
          <div className="widget">
            <div className="title">
              {/* <span className="titleIcon"><input type="checkbox" id="titleCheck" name="titleCheck" /></span> */}
              <h6>Danh sách Thành viên</h6>
              <div className="num f12">Tổng số: <b>{this.state.numberMember}</b></div>
            </div>
            <form action="/" method="get" className="form" name="filter">
              <table cellPadding={0} cellSpacing={0} width="100%" className="sTable mTable myTable withCheck" id="checkAll">
                <thead>
                  <tr>
                    {/* <td style={{ width: '10px' }}><img src="images/icons/tableArrows.png" /></td> */}
                    <td style={{ width: '80px' }}>Mã số</td>
                    <td>Tên</td>
                    <td>Username</td>
                    <td>Email</td>
                    <td>Điện thoại</td>
                    <td>Địa chỉ</td>
                    <td>Ngày tạo</td>
                    <td>Phân quyền</td>
                    <td style={{ width: '100px' }}>Hành động</td>
                  </tr>
                </thead>
                {/* <tfoot>
                  <tr>
                    <td colSpan={7}>

                      <div className="pagination">
                      </div>
                    </td>
                  </tr>
                </tfoot> */}
                <tbody>
                  {/* Filter */}
                  {this.showAdminMember()}
                </tbody>
              </table>
            </form>
          </div>
        </div>

      </div>

    );
  }
}

export default AdminMember;