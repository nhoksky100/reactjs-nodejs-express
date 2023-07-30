import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import FormtitleArea from '../titleAreaFrom/FormtitleArea';
// import { UpdateDateTime } from '../../UpdateDateTime';
const permissionMember = () => axios.get('/login_member_json').then((res) => res.data)
const getDataAdminMember = () => axios.get('/getdata_admin_member').then((res) => res.data);
class EditAdminMember extends Component {
    constructor(props) {
        super(props);
        this.state = {
            adminMemberStatus: false,
            dataAdminMember: null,
            isDataEdit: null,
            name: '', username: '', password: '', email: '', permission: '', permissionTeamp: '', phone: '', address: '', code: '', id: '',
            // show hide password
            isShowHidePass: false,
            // new password
            confirmPassword: '',
            newPassword: '',
            isCheckNewPassword: true,
            // permissionLogin
            valueMember: ''

        }
    }

    componentDidMount() {
        var id = sessionStorage.getItem('ID_user_admin');
        var fil_user_admin = [];
        if (this.state.dataAdminMember === null) {
            getDataAdminMember().then((res) => {
                fil_user_admin = res.filter((item) => item.ID === id);
                this.setState({
                    id: fil_user_admin[0].ID,
                    name: fil_user_admin[0].name,
                    username: fil_user_admin[0].username,
                    usernameEdit: fil_user_admin[0].username,
                    email: fil_user_admin[0].email,
                    permission: fil_user_admin[0].permission,
                    permissionTeamp: fil_user_admin[0].permission,
                    phone: fil_user_admin[0].phone,
                    address: fil_user_admin[0].address,
                    code: fil_user_admin[0].code,
                    dataAdminMember: fil_user_admin,
                    isDataEdit: res
                });

            })
            this.permissionData()

        }


    }
    permissionData = () => {
        permissionMember().then((res) => {
            if (res.permission === 'admin') {
                this.setState({
                    valueMember: res.permission,

                })
            }
        })
    }
    isChange = (event) => {
        var name = event.target.name;
        var value = event.target.value;
        this.setState({ [name]: value })
    }
    handleClickEdit = () => {

        var { id, name, username, usernameEdit, password, newPassword, confirmPassword, email, permission,
            phone, address, code, isDataEdit, isCheckNewPassword } = this.state;

        phone = parseInt(phone);

        var reWhiteSpace = new RegExp("\\s+"); // white-spalce
        // console.log(name + username + password + email + permission + phone + address + code);

        if (name === '' || usernameEdit === '' || password === '' || email === '' ||
            permission === '' || phone === '' || address === '' || code === '' ||
            (reWhiteSpace.test(usernameEdit) || reWhiteSpace.test(password) || reWhiteSpace.test(email) ||
                reWhiteSpace.test(phone) || reWhiteSpace.test(code))) {
            toast(<div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" />
                <i>không được để trống!</i></div>)
        }
        else if (!isCheckNewPassword && (password.length < 6 || newPassword.length < 6 || confirmPassword.length < 6)) {
            toast(<div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" />
                <i>Mật khẩu phải trên 6 kí tự!</i></div>)
        }

        else {
            var setData = '', isPassword = false, isChangePassword = false
            if (!isCheckNewPassword) {
                if (newPassword === confirmPassword && newPassword !== '' && confirmPassword !== '' &&
                    !reWhiteSpace.test(newPassword) && !reWhiteSpace.test(confirmPassword)) {
                    isChangePassword = true

                } else {
                    toast(<div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" />
                        <i>Mật khẩu mới không khớp!</i></div>)
                    return ''
                }
            }
            isDataEdit.map((value) => {
                setData = value

                if (setData.ID === id) {
                    axios.post('/login_admin_member', { setData, password, username })
                        .then((resCheckLogin) => {
                            if (resCheckLogin.data.isLogin) {
                                // change password
                                if (isChangePassword) {
                                    password = confirmPassword
                                }
                                //update
                                var dateTimeFix = new Date()
                                var username = usernameEdit
                                axios.post('/edit_admin_member', { id, name, username, password, email, permission, phone, address, code, dateTimeFix }).then(res => {
                                    toast(<div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" />
                                        <i>Sửa thành công!</i></div>)
                                    isPassword = true
                                    this.setState({ adminMemberStatus: true })
                                })
                            }
                        })
                }
            })
            setTimeout(() => {
                if (!isPassword) {
                    toast(<div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" />
                        <i>Nhập mật khẩu xác thực không đúng!</i></div>)
                }
            }, 1000);



        }
    }
    keyup = (e) => {
        if (e.keyCode === 13) {
            return this.handleClickEdit();
        }
    }

    handleShowHide = () => {
        this.setState({ isShowHidePass: !this.state.isShowHidePass })
    }
    showFormEdit = () => {
        if (this.state.dataAdminMember !== null) {
            return this.state.dataAdminMember.map((value, key) => {
                return (
                    <Fragment key={key}>
                        <div className="formRight">

                            <label className="formLeft">Mã ID:<input disabled defaultValue={value.ID} name="ID" className="req" />  </label>
                        </div>
                        <div className="formRow">
                            <label className="formLeft" htmlFor="param_name">
                                Họ tên
                            </label>
                            <div className="formRight">
                                <span className="oneFour"><input onChange={(event) => { this.isChange(event) }}
                                    defaultValue={value.name} ref='name' name="name" id="param_name" type="text" /></span>
                                <span name="warranty_autocheck" className="autocheck" />
                                <div name="warranty_error" className="clear error" />
                            </div>
                            <div className="clear" />
                        </div>
                        <div className="formRow">
                            <label className="formLeft" htmlFor="param_Username">
                                Tên tài khoản
                            </label>
                            <div className="formRight">
                                <span className="oneFour"><input onChange={(event) => { this.isChange(event) }}
                                    defaultValue={value.username} name="usernameEdit" id="param_Username" type="text" /></span>
                                <span name="warranty_autocheck" className="autocheck" />
                                <div name="warranty_error" className="clear error" />
                            </div>
                            <div className="clear" />
                        </div>

                        {/* warranty */}
                        <div className="formRow">
                            <label className="formLeft" htmlFor="param_Email">
                                Email
                            </label>
                            <div className="formRight">
                                <span className="oneFour"><input onChange={(event) => { this.isChange(event) }}
                                    defaultValue={value.email} name="email" id="param_Email" type="text" /></span>
                                <span name="warranty_autocheck" className="autocheck" />
                                <div name="warranty_error" className="clear error" />
                            </div>
                            <div className="clear" />
                        </div>
                        <div className="formRow">
                            <label className="formLeft" htmlFor="param_Permission">
                                Quyền
                            </label>
                            <div className="formRight">

                                <select className="form-control oneFour"
                                    defaultValue={value.permission} name="permission" onChange={(event) => { this.isChange(event) }}
                                    style={{ width: '170px' }} id="param_Permission">

                                    <option value='user'>User</option>
                                    {
                                        this.state.valueMember === 'admin' && <option value={'admin'}>Admin</option>
                                    }
                                </select>

                                <span name="warranty_autocheck" className="autocheck" />
                                <div name="warranty_error" className="clear error" />
                            </div>
                            <div className="clear" />
                        </div>
                        <div className="formRow">
                            <label className="formLeft" htmlFor="param_Phone">
                                Số điện thoại
                            </label>
                            <div className="formRight">
                                <span className="oneFour"><input onChange={(event) => { this.isChange(event) }} defaultValue={value.phone} name="phone" id="param_Phone" type="text" /></span>
                                <span name="warranty_autocheck" className="autocheck" />
                                <div name="warranty_error" className="clear error" />
                            </div>
                            <div className="clear" />
                        </div>
                        <div className="formRow">
                            <label className="formLeft" htmlFor="param_Address">
                                Địa chỉ
                            </label>
                            <div className="formRight">
                                <span className="oneFour"><input onChange={(event) => { this.isChange(event) }} style={{ width: '500px' }} defaultValue={value.address} name="address" id="param_Address" type="text" /></span>
                                <span name="warranty_autocheck" className="autocheck" />
                                <div name="warranty_error" className="clear error" />
                            </div>
                            <div className="clear" />
                        </div>
                        <div className="formRow">
                            <label className="formLeft" htmlFor="param_Code">
                                Mã thành viên
                            </label>
                            <div className="formRight">
                                <span className="oneFour"><input onChange={(event) => { this.isChange(event) }} defaultValue={value.code} name="code" id="param_Code" type="text" /></span>
                                <span name="warranty_autocheck" className="autocheck" />
                                <div name="warranty_error" className="clear error" />
                            </div>
                            <div className="clear" />
                        </div>

                        <div className="formRow">
                            <label className="formLeft" htmlFor="param_Password">
                                <input onClick={() => this.setState({ isCheckNewPassword: !this.state.isCheckNewPassword })}

                                    style={{ position: 'relative', top: '25px', right: '15%', height: '25px', cursor: 'pointer' }}
                                    type="checkbox" name="checkboxPassword" id="onNewpassword" />

                                Đổi mật khẩu
                            </label>
                            <div className="formRight">
                                <label className="formLeft" htmlFor="new-password">Mật khẩu mới:</label>
                                <span className="oneFour">
                                    <input
                                        style={
                                            this.state.isCheckNewPassword ?
                                                { opacity: 0.2 } : { opacity: 1 }
                                        }
                                        disabled={this.state.isCheckNewPassword}
                                        onKeyUp={(e) => this.keyup(e)} onChange={(event) => { this.isChange(event) }}
                                        className='newPassword'
                                        defaultValue={''} name="newPassword" id="new-password" type={
                                            this.state.isShowHidePass ? 'text' : 'password'
                                        } />


                                </span>
                                <span name="warranty_autocheck" className="autocheck" />
                                <div name="warranty_error" className="clear error" />
                            </div>
                            <div className="formRight">
                                <label className="formLeft" htmlFor="confirm-password">Xác nhận mật khẩu mới:</label>
                                <span className="oneFour">
                                    <input
                                        style={
                                            this.state.isCheckNewPassword ?
                                                { opacity: 0.2 } : { opacity: 1 }
                                        }
                                        disabled={this.state.isCheckNewPassword}
                                        onKeyUp={(e) => this.keyup(e)} onChange={(event) => { this.isChange(event) }}
                                        className='newPassword'
                                        defaultValue={''} name="confirmPassword" id="confirm-password" type={
                                            this.state.isShowHidePass ? 'text' : 'password'
                                        } />


                                </span>

                                {this.state.isShowHidePass ?
                                    <i style={{ cursor: 'pointer', position: 'absolute', top: '37%', fontSize: '18px' }}
                                        onClick={() => this.handleShowHide()} className="fa fa-eye" title='Ẩn đi' />
                                    : <i style={{ cursor: 'pointer', position: 'absolute', top: '37%', fontSize: '18px' }}
                                        onClick={() => this.handleShowHide()} className="fa fa-eye-slash" title='Hiển thị' />

                                }

                                <span name="warranty_autocheck" className="autocheck" />
                                <div name="warranty_error" className="clear error" />
                            </div>
                            <div className="clear" />
                        </div>
                        <div className="formRow">
                            <label className="formLeft" htmlFor="param_Password">
                                Nhập mật khẩu lưu thông tin
                            </label>
                            <div className="formRight">
                                <span className="oneFour"><input onKeyUp={(e) => this.keyup(e)} onChange={(event) => { this.isChange(event) }}
                                    defaultValue={''} name="password" id="param_Password" type={
                                        this.state.isShowHidePass ? 'text' : 'password'
                                    } />


                                </span>
                                {this.state.isShowHidePass ?
                                    <i style={{ cursor: 'pointer', position: 'absolute', top: '37%', fontSize: '18px' }}
                                        onClick={() => this.handleShowHide()} className="fa fa-eye" title='Ẩn đi' />
                                    : <i style={{ cursor: 'pointer', position: 'absolute', top: '37%', fontSize: '18px' }}
                                        onClick={() => this.handleShowHide()} className="fa fa-eye-slash" title='Hiển thị' />

                                }

                                <span name="warranty_autocheck" className="autocheck" />
                                <div name="warranty_error" className="clear error" />
                            </div>
                            <div className="clear" />
                        </div>

                    </Fragment>
                )
            })
        }
    }
    render() {

        if (this.state.adminMemberStatus) {
            return <Redirect to="/admin/member.html" />
        }
        return (

            <Fragment>
                <div id="rightSide">
                    <FormtitleArea
                        managerTitle={'Thành viên'}
                        managerName={'Quản lý thành viên'}
                        urlAdd={'/admin/member-add.html'}
                        imageAdd={'images/icons/control/16/add.png'}

                        urlList={'/admin/member.html'}
                        imageList={'./images/icons/control/16/list.png'}
                    />


                    <div className="wrapper">
                        {/* Form */}
                        <form className="form" id="form" action="" method="post" encType="multipart/form-data">
                            <div className="widget">
                                <fieldset>
                                    <div className="title">
                                        <img src="images/icons/dark/edit.png" className="titleIcon" alt='' />
                                        <h6>Sửa thành viên</h6>
                                    </div>
                                    {/* <ul className=" nav nav-tabs">
                                <li className="nav-item "><a className="nav-link active">Thông tin chung</a></li>
                                <li className="nav-item "><a className="nav-link ">SEO Onpage</a></li>
                                <li className="nav-item "><a className="nav-link ">Bài viết</a></li>
                            </ul> */}
                                    <div className="tab_container">
                                        <div id="tab1" className="tab_content pd0">
                                            {this.showFormEdit()}



                                        </div>
                                    </div>{/* End tab_container*/}

                                    <div className="formSubmit">

                                        <input type="reset" value="Làm mới" className="basic button" />
                                        <input onClick={() => this.handleClickEdit()} type="button" value="Cập nhật" className="redB" />

                                    </div>

                                    <div className="clear" />
                                </fieldset>
                            </div>
                        </form>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default EditAdminMember;