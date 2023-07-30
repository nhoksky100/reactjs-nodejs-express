import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { randomId } from '../RandomId/randomId';

import FormtitleArea from '../titleAreaFrom/FormtitleArea';
// import { UpdateDateTime } from '../../UpdateDateTime';
const permissionMember = () => axios.get('/login_member_json').then((res) => res.data)

class AddAdminMember extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userAdminStatus: false,
            enabled: '',
            isShowHidePass: false,
            valueMember: '',
            name: '', username: '', password: '', email: '', permission: 'user', phone: '', address: '', code: ''
        }
    }
    componentDidMount() {
        this.permissionData()
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
    handleClick = () => {
        var id = randomId();
        var { name, username, password, email, permission, phone, address, code } = this.state;
        var reWhiteSpace = new RegExp("\\s+"); // white-spalce
        parseInt(phone);
        if (name === '' || username === '' || password === '' || email === '' ||
            permission === '' || phone === '' || address === '' || code === '' ||
            (reWhiteSpace.test(username) || reWhiteSpace.test(password) || reWhiteSpace.test(email) ||
                reWhiteSpace.test(phone) || reWhiteSpace.test(code))) {
            toast(<div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" />
                <i>không được để trống!</i></div>)
        }
        else if (password.length < 6) {
            toast(<div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" />
                <i>Mật khẩu phải trên 6 kí tự!</i></div>)
        }
        else {
            var dateTime = new Date()
            axios.post('/add_user', { id, name, username, password, email, permission, phone, address, code, dateTime }).then(res => {
                toast(<div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" />
                    <i>Thêm thành công!</i></div>)

            })
        }
    }




    handleShowHidePassword = () => {
        this.setState({ isShowHidePass: !this.state.isShowHidePass })
    }
    showFormAdd = () => {
        return (
            <Fragment>
                <div className="formRow">
                    <label className="formLeft" htmlFor="param_name">
                        Họ tên
                    </label>
                    <div className="formRight">
                        <span className="oneFour"><input onChange={(event) => { this.isChange(event) }} name="name" id="param_name" type="text" /></span>
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
                        <span className="oneFour"><input onChange={(event) => { this.isChange(event) }} name="username" id="param_Username" type="text" /></span>
                        <span name="warranty_autocheck" className="autocheck" />
                        <div name="warranty_error" className="clear error" />
                    </div>
                    <div className="clear" />
                </div>
                <div className="formRow">
                    <label className="formLeft" htmlFor="param_Password">
                        Mật khẩu
                    </label>
                    <div className="formRight">
                        <span className="oneFour"><input onChange={(event) => { this.isChange(event) }} name="password" id="param_Password" type={
                            this.state.isShowHidePass ? 'text' : 'password'
                        } />
                        </span>
                        {this.state.isShowHidePass ?
                            <i style={{ cursor: 'pointer', position: 'absolute', top: '37%', fontSize: '18px' }}
                                onClick={() => this.handleShowHidePassword()} className="fa fa-eye" title='Ẩn đi' />
                            : <i style={{ cursor: 'pointer', position: 'absolute', top: '37%', fontSize: '18px' }}
                                onClick={() => this.handleShowHidePassword()} className="fa fa-eye-slash" title='Hiển thị' />

                        }
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
                        <span className="oneFour"><input onChange={(event) => { this.isChange(event) }} name="email" id="param_Email" type="text" /></span>
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

                        <select className="form-control oneFour" name="permission" onChange={(event) => { this.isChange(event) }} style={{ width: '170px' }} id="param_Permission">
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
                        <span className="oneFour"><input onChange={(event) => { this.isChange(event) }} name="phone" id="param_Phone" type="text" /></span>
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
                        <span className="oneFour"><input onChange={(event) => { this.isChange(event) }} style={{ width: '500px' }} name="address" id="param_Address" type="text" /></span>
                        <span name="warranty_autocheck" className="autocheck" />
                        <div name="warranty_error" className="clear error" />
                    </div>
                    <div className="clear" />
                </div>
                <div className="formRow">
                    <label className="formLeft" htmlFor="param_Code">
                        mã thành viên
                    </label>
                    <div className="formRight">
                        <span className="oneFour"><input onChange={(event) => { this.isChange(event) }} name="code" id="param_Code" type="text" /></span>
                        <span name="warranty_autocheck" className="autocheck" />
                        <div name="warranty_error" className="clear error" />
                    </div>
                    <div className="clear" />
                </div>

                <div className="formRow hide" ></div>

            </Fragment>
        )
    }
    render() {
        if (this.state.userAdminStatus) {
            return <Redirect to="/admin/member.html" />
        }
        return (

            <Fragment>
                <div id="rightSide">
                    <FormtitleArea
                        managerTitle={'Thành viên'}
                        managerName={'Quản lý thành viên'}

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
                                        <h6>Thêm thành viên</h6>
                                    </div>

                                    <div className="tab_container">
                                        <div id="tab1" className="tab_content pd0">
                                            {this.showFormAdd()}

                                        </div>
                                    </div>{/* End tab_container*/}

                                    <div className="formSubmit">

                                        <input type="reset" value="Làm mới" className="basic button" />
                                        <input onClick={() => this.handleClick()} type="button" value="Thêm mới" className="redB" />

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

export default AddAdminMember;