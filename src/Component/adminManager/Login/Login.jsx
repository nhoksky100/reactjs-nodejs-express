import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Cookies from 'universal-cookie';
const getDataAdminMember = () => axios.get('/getdata_admin_member').then((res) => res.data)

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoginStatus: false,
            isRedirect: false,
            isStep: true,
            // login
            password: '',
            username: '',
            dataLogin: null,
            // radio: 'admin'

        }
    }
    componentDidMount() {
        this.props.is_status_app(true);

        if (localStorage.getItem('tokenId') !== null) {
            this.setState({ isLoginStatus: true })
        } else {
            this.dataLogin();


        }
    }

    setForm = (event) => {
        const name = event.target.name; // lay ten cua pt the
        const value = event.target.value; // lay gia tri pt the

        this.setState({ [name]: value }) // luu vao state 

    }
    keyup = (e) => {
        if (e.keyCode === 13) {
            return this.submitForm();
        }
    }
    //set cookie
    setCookie = (username, token) => {

        const cookies = new Cookies();
        const minutes = 1140; // 1140m =1 day

        const d = new Date();
        d.setTime(d.getTime() + (minutes * 60 * 1000));
        cookies.set(username, token, { path: '/', expires: d });
        const tokenId = cookies.get(username)

        localStorage.setItem('tokenId', tokenId);
        localStorage.setItem('loginManagerUsername', username);

    };
    dataLogin = () => {

        getDataAdminMember().then((res) => {
            // res.map((value) => {
            //     pushData.push(value)
            // })
            this.setState({ dataLogin: res })

        })

    }
    // hash=()=>{
    //     const bcrypt =require("")
    // }
    submitForm = () => {


        const { username, password, dataLogin } = this.state;
        let isLogin = false;
        // if (!username || !password) {
        //     // axios.post('/login_admin_member', { id, permission })
        //     toast(<div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" />
        //         <i> Nhập sai username hoặc mật khẩu </i></div>);

        // }


        if (username && password) {

            dataLogin.map((value) => {

                if ((username === value.username || username === value.email)) {


                    const setData = value
                    axios.post('/login_admin_member', { username, password, setData }).then((resCheckLogin) => {

                        if (resCheckLogin.data.isLogin) {
                            var id = setData.ID
                            const permission = value.permission;
                            const tokenId = resCheckLogin.data.token;
                            axios.post('/login_member_json', { id, permission, tokenId })
                            this.setCookie(username, resCheckLogin.data.token)
                            localStorage.setItem('permission', permission)
                            // localStorage.setItem('tokenId', tokenId);
                            // localStorage.setItem('loginManagerUsername', username);
                            // sessionStorage.setItem('permission', permission)
                            // sessionStorage.setItem('loginManagerUsername', username)
                            // sessionStorage.setItem('tokenId', tokenId)


                            this.setState({ isLoginStatus: true })
                            isLogin = true;
                            toast(<div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" />
                                <i> {resCheckLogin.data.message}!</i></div>);


                        }

                    })
                }
                return dataLogin

            })

        }
        setTimeout(() => {
            if (!isLogin) {
                toast(<div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" />
                    <i>Đăng nhập không thành công!</i></div>);

            }
        }, 1000);


    }


    render() {
        if (this.state.isLoginStatus) return <Redirect to='/admin/' />// nếu đã có dữ liệu đăng nhập trước đó không quá 24h thì trả về form admin 
        // đăng nhập quản trị admin nhoksky91 540282
        return (
            <div className="loginWrapper" style={{ top: '45%' }}>
                <div className="widget" id="admin_login" style={{ height: 'auto', margin: 'auto' }}>
                    <div className="title"><img src="admin/images/icons/dark/laptop.png" alt="" className="titleIcon" />
                        <h6>Đăng nhập</h6>
                    </div>
                    <form className="form" id="form" >
                        <fieldset>
                            <div className="formRow">
                                <label htmlFor="param_username">Tên tài khoản:</label>
                                <div className="loginInput"><input onKeyUp={(e) => this.keyup(e)} 
                                onChange={(event) => this.setForm(event)} type="text" name="username" id="param_username" placeholder="username or email" /></div>
                                <div className="clear" />
                            </div>
                            <div className="formRow">
                                <label htmlFor="param_password">Mật khẩu:</label>
                                <div className="loginInput"><input onKeyUp={(e) => this.keyup(e)} 
                                onChange={(event) => this.setForm(event)} type="password" name="password" id="param_password" placeholder="password" /></div>
                                <div className="clear" />
                            </div>



                            <div className="loginControl">

                                <input type="reset" style={{ marginTop: '10px' }} onClick={() => this.submitForm()} value="Login" className="dredB logMeIn button" />
                                <div className="clear" />
                            </div>

                        </fieldset>
                    </form>
                </div>

            </div>

        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {

    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        is_status_app: (act_app) => {
            dispatch({ type: 'is_status_app', act_app })
        },


    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)