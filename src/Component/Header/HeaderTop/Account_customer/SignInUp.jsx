// import axios from 'axios';
// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { toast, ToastContainer } from 'react-toastify';
// import validator from 'validator';
// import Cookies from 'universal-cookie';
// const getDataAccountCustomer = () => axios.get('/account_customer').then((res) => res.data)

// class SignInUp extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             DataAccountCustomer: null,

//             username: '', passowrd: '', re_password: '', email: '', address: '', Re: false,
//         }
//     }
//     componentDidMount() {
        
//         if (this.state.DataAccountCustomer === null) {
//             getDataAccountCustomer().then((res) => {
//                 this.setState({ DataAccountCustomer: res })
//             })
//         }

//     }
//     //set cookie
//     setCookie = (email, token, url) => {
//         var cookie = new Cookies();
//         var minutes = 1140; // 1140m 1 day

//         var d = new Date();
//         d.setTime(d.getTime() + (minutes * 60 * 1000));
//         cookie.set(email, token, { path: "/", expires: d })
//         sessionStorage.setItem('loginCustomerToken', token);
//         sessionStorage.setItem('loginCustomerEmail', email);
//     };
//     //Sign In
//     submitFormSignIn = () => {
//         var flag = false;
//         var { email, password } = this.state;
//         if ((email !== '' && email !== undefined) && (password !== '' && password !== undefined)) {
//             this.state.DataAccountCustomer.map((value) => {
//                 if (email === value.email && password === value.password) {
//                     var id = value.ID;
//                     axios.post('/login_customer', { id }).then((res) => {
//                         this.setCookie(email, res.data.token)
//                     })
//                     // dang nhap chinh xac tai khoan luu lai id nguoi dung tren store
//                     var profileCustomer = {
//                         username: value.username,
//                         profile: value.profile,
//                         phone: value.phone,
//                         email: value.email,
//                         address: value.address,
//                         checkvote: value.checkvote
//                     }
//                     sessionStorage.setItem('ID_customer', value.ID);
//                     sessionStorage.setItem('email_customer', value.email);
//                     sessionStorage.setItem('data_customer', JSON.stringify(profileCustomer));
//                     this.props.is_status_login(true);
//                     flag = true;

//                     toast(<div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" />
//                         <i> Success!</i></div>);
//                     window.history.back();
//                     // return this.setState({ is_Redirect: true })
//                 }

//             })
//             if (flag === false) {
//                 toast(<div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" />
//                     <i> False username or password!</i></div>);
//             }
//         } else {
//             toast(<div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" />
//                 <i>Do not leave blank!</i></div>);
//         }


//     }


//     //Sign Up
//     submitFormSignup = () => {
//         var flag = true;
//         var { password, re_password, email } = this.state;
//         if (password !== '' && re_password !== '' && email !== '') {
//             if (password === re_password && validator.isEmail(email) && (password.length > 7 || re_password.length > 7)) {
//                 //true
//                 if (this.state.DataAccountCustomer !== null) {
//                     this.state.DataAccountCustomer.map((value) => {
//                         if (value.email === email) {
//                             flag = false;
//                             toast(<div className="advertise"><ion-icon name="mail-outline" />
//                                 <i>Email exist!</i></div>)
//                         }
//                     })
//                 } if (flag === true) {

//                     axios.post('/add_account_customer', { password, email }).then((res) => {
//                         toast(<div className="advertise"><ion-icon name="checkmark-outline" />
//                             <i>Success!</i></div>)
//                         // window.history.back();
//                         return this.setState({ password: '', email: '', Re: true })
//                     })
//                 }
//             }
//             //false
//             else if (password.length < 7 || re_password.length < 7) {
//                 toast(<div className="advertise"><ion-icon name="ban-outline" />
//                     <i>Password with at least 8 characters!</i></div>)
//             }
//             else if (password !== re_password) {
//                 toast(<div className="advertise"><ion-icon name="ban-outline" />
//                     <i>Wrong format password!</i></div>)
//             }
//             else {
//                 // in ra email không đúng dạng
//                 toast(<div className="advertise"><ion-icon name="mail-outline" />
//                     <i>Incorrect email format!</i></div>)
//             }
//         }
//         else {
//             toast(<div className="advertise"><ion-icon name="ban-outline" />
//                 <i>Do not leave blank!</i></div>)

//         }
//     }

//     // keyup login
//     keyupSignIn = (e) => {
//         if (e.keyCode === 13) {
//             return this.submitFormSignIn();
//         }
//     }
//     keyupSignUp = (e) => {
//         if (e.keyCode === 13) {
//             return this.submitFormSignup();
//         }
//     }
//     onChange = (e) => {
//         const value = e.target.value;
//         const name = e.target.name;
//         this.setState({ [name]: value })
//     }

//     ShowForm = () => {
//         return (
//             <div className='formRow'>
//                 {/* SIGN IN */}
//                 <div className="col-md-6 login-form-1">
//                     <h3>Sign In</h3>
//                     <form>
//                         <div className="form-group">
//                             <input onKeyUp={(e) => this.keyupSignIn(e)} onChange={(e) => this.onChange(e)} name='email'
//                                 type="text" className="form-control" placeholder="Your Email *" />
//                         </div>
//                         <div className="form-group">
//                             <input onKeyUp={(e) => this.keyupSignIn(e)} onChange={(e) => this.onChange(e)} name='password' type="password"
//                                 className="form-control" placeholder="Your Password *" />
//                         </div>
//                         <div className="form-group">
//                             <a onClick={() => this.submitFormSignIn()} name='submit'
//                                 className="btnSubmit" defaultValue="Login" >Sign In</a>
//                         </div>
//                         <div className="form-group">
//                             <a href="#" className="ForgetPwd">Forget Password?</a>
//                         </div>

//                     </form>
//                     <div className="clear" />
//                 </div>

//                 {/* SIGN UP */}

//                 <div className="col-md-6 login-form-2">
//                     <h3>Sign Up</h3>
//                     <form>
//                         <div className="form-group">

//                             <input onKeyUp={(e) => this.keyupSignUp(e)} onChange={(e) => this.onChange(e)} name='email'
//                                 type="text" id='email' className="form-control" placeholder="Your Email *" />
//                         </div>
//                         <div className="form-group">

//                             <input onKeyUp={(e) => this.keyupSignUp(e)} onChange={(e) => this.onChange(e)} name='password'
//                                 type="password" id='psw' className="form-control" placeholder="Your Password *" />
//                         </div>
//                         <div className="form-group">

//                             <input onKeyUp={(e) => this.keyupSignUp(e)} onChange={(e) => this.onChange(e)} name='re_password'
//                                 type="password" id='re-psw' className="form-control" placeholder="Your Password *" />
//                         </div>
//                         <div className="form-group">
//                             <a onClick={() => this.submitFormSignup()} className="btnSubmit" defaultValue="Sign Up" >Sign Up</a>
//                         </div>
//                         <div className="form-group">

//                             <p style={{ color: 'white' }}><i className="fa fa-exclamation-triangle" aria-hidden="true" /> password with at least 8 characters</p>


//                         </div>

//                     </form>
//                     <div className="clear" />
//                 </div>
//             </div>
//         )
//     }
//     render() {
//         return (
//             // in

//             <div className="container sign-container">
//                 <div className="row" id='signin-up'>
                 
//                     {this.ShowForm()}
//                 </div>
//                 <ToastContainer />
//             </div>


//         );
//     }
// }
// const mapStateToProps = (state, ownProps) => {
//     return {

//     }
// }
// const mapDispatchToProps = (dispatch, ownProps) => {
//     return {
//         is_status_login: (log_customer_act) => {
//             dispatch({ type: 'is_status_login', log_customer_act })
//         }
//     }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(SignInUp)