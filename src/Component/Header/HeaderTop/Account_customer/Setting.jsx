// import React, { Component, createRef } from 'react';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import validator from 'validator';
// import { connect } from 'react-redux';
// const typingtimeoutRef = createRef(null);
// const getDataAccountCustomer = () => axios.get('/account_customer').then((res) => res.data)
// class Setting extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             DataAccountCustomer: null, IdCustomer: null,
//             chengeValue: '', chengeId: '', active: '',
//             nextUp: false,
//             regexp: /^[0-9\b]+$/

//         }
//     }

//     componentDidMount() {
//         var IdCustomer = sessionStorage.getItem('ID_customer');

//         var filId =new Array;
//         if (this.state.DataAccountCustomer === null) {
//             getDataAccountCustomer().then((res) => {
//                 filId = res.filter((item) => item.ID === IdCustomer);
//                 this.setState({ DataAccountCustomer: filId })

//             })
//         }

//     }

//     UNSAFE_componentWillUpdate(nextProps, nextState) {
//         if (nextState.nextUp === true) {
//             var IdCustomer = sessionStorage.getItem('ID_customer');

//             var filId =new Array;
//             if (this.state.DataAccountCustomer !== null) {
//                 getDataAccountCustomer().then((res) => {
//                     filId = res.filter((item) => item.ID === IdCustomer);
//                     this.setState({ DataAccountCustomer: filId })
//                 })
//             }
//         }
//     }
//     componentDidUpdate(prevProps, prevState) {
//         if (prevState.nextUp) {
//             this.setState({ nextUp: false })
//         }
//     }


//     On_Change = (e) => {
//         if (typingtimeoutRef.current) {
//             clearTimeout(typingtimeoutRef.current)
//         }
//         typingtimeoutRef.current = setTimeout(() => {
//             const name = e.target.name;
//             const value = e.target.value;
//             console.log('name', name);
//             console.log('value', value);
//             this.setState({
//                 [name]: value,
//             })

//         }, 300);
//     }
//     handleClick = () => {


//         if (this.state.DataAccountCustomer !== null) {
//             var { new_password, changeId } = this.state;
//             this.state.DataAccountCustomer.map((value) => {

//                 var { username, password, email, phone, address, ID } = value;
              
//                 switch (changeId) {
//                     case 'username':
//                         var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
//                         if ((this.state.username === '' || this.state.username === ' ' || this.state.username === undefined)) {
//                             toast(<div className="advertise"><ion-icon name="ban-outline" />
//                                 <i>Do not leave blank!</i></div>);
//                         } else if ((this.state.username.length < 7)) {
//                             this.setState({ username: '' })
//                             toast(<div className="advertise"><ion-icon name="ban-outline" />
//                                 <i>At least 6 characters or more!</i></div>);  // ít nhất 6 kí tự trở lên

//                         } else if ((format.test(this.state.username))) {
//                             this.setState({ username: '' })
//                             toast(<div className="advertise"><ion-icon name="ban-outline" />
//                                 <i> Special characters are not allowed!</i></div>); // kiêm tra không được đặt có kí tự đặt biệt

//                         } else if (this.state.regexp.test(this.state.username)) {
//                             this.setState({ username: '' })
//                             toast(<div className="advertise"><ion-icon name="ban-outline" />
//                                 <i> Not allowed to set number!</i></div>);   // kiểm tra không được đặt số

//                         } else if (this.state.regexp.test(this.state.username.charAt(0))) {
//                             this.setState({ username: '' })
//                             toast(<div className="advertise"><ion-icon name="ban-outline" />
//                                 <i> The first character is not numeric!</i></div>); // kiểm tra kí tự đầu k được dặt số

//                         }
//                         else {
//                             var { username } = this.state;
//                             axios.post('/update_customer_setting', { username, password, email, phone, address, ID }).then((res) => {
//                                 this.setState({ username: '', nextUp: true })
//                                 this.props.UpdateDataCustomer(true)
//                                 toast(<div className="advertise"><ion-icon name="ban-outline" />
//                                     <i>Username changed successfully !</i></div>);
//                             })
//                         }
//                         return;
//                     case 'password':
//                         if ((new_password === '' || new_password === ' ') || (password === '' || password === ' ') ||
//                             (new_password === undefined || new_password === undefined) ||
//                             (password === undefined || password === undefined)

//                         ) {
//                             toast(<div className="advertise"><ion-icon name="ban-outline" />
//                                 <i>Do not leave blank!</i></div>);
//                         }
//                         else if (value.password !== password) {
//                             this.setState({ password: '', new_password: '' })
//                             toast(<div className="advertise"><ion-icon name="ban-outline" />
//                                 <i>Wrong old password !</i></div>);

//                         } else if (value.password === new_password) {
//                             this.setState({ password: '', new_password: '' })
//                             toast(<div className="advertise"><ion-icon name="ban-outline" />
//                                 <i>Do not set the same old password !</i></div>);

//                         } else {
//                             axios.post('/update_customer_setting', { username, new_password, email, phone, address, ID }).then((res) => {
//                                 this.setState({ password: '', new_password: '', nextUp: true })
//                                 this.props.UpdateDataCustomer(true)
//                                 toast(<div className="advertise"><ion-icon name="ban-outline" />
//                                     <i>Password changed successfully !</i></div>);
//                             })
//                         }
//                         return;
//                     case 'phone':

//                         if ((this.state.phone === '' || this.state.phone === ' ' || this.state.phone === undefined)) {
//                             toast(<div className="advertise"><ion-icon name="ban-outline" />
//                                 <i>Do not leave blank!</i></div>);

//                         } else if (!this.state.regexp.test(this.state.phone)) {
//                             this.setState({ phone: '' })
//                             toast(<div className="advertise"><ion-icon name="ban-outline" />
//                                 <i>Enter numbers only !</i></div>);
//                         }
//                         else if (this.state.phone.length > 13 || this.state.phone.length < 10) {
//                             this.setState({ phone: '' })
//                             toast(<div className="advertise"><ion-icon name="ban-outline" />
//                                 <i>Wrong phone number !</i></div>);
//                         }
//                         else {
//                             var { phone } = this.state;
//                             axios.post('/update_customer_setting', { username, password, email, phone, address, ID }).then((res) => {
//                                 this.setState({ phone: '', nextUp: true })
//                                 this.props.UpdateDataCustomer(true)
//                                 toast(<div className="advertise"><ion-icon name="ban-outline" />
//                                     <i>Phone changed successfully !</i></div>);
//                             })
//                         }
//                         return;
//                     case 'email':

//                         if ((this.state.email === '' || this.state.email === ' ' || this.state.email === undefined)) {
//                             toast(<div className="advertise"><ion-icon name="ban-outline" />
//                                 <i>Do not leave blank!</i></div>);

//                         } else if (!validator.isEmail(this.state.email)) {
//                             this.setState({ email: '', nextUp: true })
//                             toast(<div className="advertise"><ion-icon name="ban-outline" />
//                                 <i>Incorrect email format !</i></div>);
//                         }

//                         else {

//                             var { email } = this.state;
//                             axios.post('/update_customer_setting', { username, password, email, phone, address, ID }).then((res) => {
//                                 this.setState({ email: '' })
//                                 this.props.UpdateDataCustomer(true)
//                                 toast(<div className="advertise"><ion-icon name="ban-outline" />
//                                     <i>Email changed successfully !</i></div>);
//                             })
//                         }
//                         return;
//                     case 'address':

//                         if ((this.state.address === '' || this.state.address === ' ' || this.state.address === undefined)) {
//                             toast(<div className="advertise"><ion-icon name="ban-outline" />
//                                 <i>Do not leave blank!</i></div>);
//                         }
//                         else {

//                             var { address } = this.state;
//                             axios.post('/update_customer_setting', { username, password, email, phone, address, ID }).then((res) => {
//                                 this.setState({ address: '', nextUp: true })
//                                 this.props.UpdateDataCustomer(true)
//                                 toast(<div className="advertise"><ion-icon name="ban-outline" />
//                                     <i>Address changed successfully !</i></div>);
//                             })
//                         }
//                         return;
//                     default:
//                         break;
//                 }
//             })
//         }

//     }
//     //click get change
//     ClickChange = (e) => {
//         const chengeValue = e.target.innerText;
//         const changeId = e.target.id;
//         this.setState({
//             chengeValue: chengeValue,
//             changeId: changeId,
//             active: 'active'
//         })

//     }
//     keyup = (e) => {
//         if (e.keyCode === 13) {
//             return this.handleClick();
//         }
//     }
//     //Chenge form
//     ChengeForm = () => {
//         return (
//             <div id={this.state.changeId} className={"tab-pane " + this.state.active}>
//                 <div className="row justify-content-center">
//                     <div className="col-11">
//                         <div className="form-card col-md-6 form-change">
//                             <h3 className="mt-0 mb-4 text-center">{this.state.chengeValue}</h3>
//                             <form className='form'>

//                                 <div className="form-group">
//                                     <input onChange={(e) => this.On_Change(e)}
//                                         onKeyUp={(e) => this.keyup(e)}
//                                         type="text" name={this.state.changeId} id={this.state.changeId} className="form-control"

//                                         placeholder={
//                                             this.state.changeId === 'password'
//                                                 ? 'Old-Password'
//                                                 : this.state.chengeValue
//                                         } />
//                                 </div>
//                                 <div className="form-group">
//                                     {
//                                         this.state.changeId === 'password'
//                                             ? < input onKeyUp={(e) => this.keyup(e)} onChange={(e) => this.On_Change(e)} name='new_password' type="text" id="new_password" className="form-control" placeholder="New Password" minLength={8} maxLength={125} />
//                                             : ''
//                                     }
//                                 </div>

//                                 <div className="clear" />

//                                 <div className="form-group">
//                                     <input onClick={() => this.handleClick()} className="btnSubmit" type='reset' value="Change" />
//                                 </div>

//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div >
//         )
//     }

//     render() {
//         return (
//             <div className="container-fluid px-0" id="bg-div-setting">
//                 <div className="row justify-content-center">
//                     <div className="col-lg-9 col-12">
//                         <div className="card card0">
//                             <div className="d-flex" id="wrapper">
//                                 {/* Sidebar */}
//                                 <div className="bg-light border-right setting_sidebar" id="sidebar-wrapper">
//                                     {/* <div className="sidebar-heading pt-5 pb-4"><strong>PAY WITH</strong></div> */}
//                                     <div className="list-group list-group-flush">
//                                         <a onClick={e => this.ClickChange(e)} data-toggle="tab" name='username' href="#username" id="username" className="tabs list-group-item bg-light">
//                                             <div className="list-div my-2" id='username' >
//                                                 <i className="fa fa-user-o" aria-hidden="true" />&nbsp; Update Username
//                                             </div>
//                                         </a>
//                                         <a onClick={e => this.ClickChange(e)} data-toggle="tab" name='phone' href="#phone" id="phone" className="tabs list-group-item bg-light">
//                                             <div className="list-div my-2" id='phone' >
//                                                 <ion-icon name="phone-portrait-outline" />&nbsp; Change Phone
//                                             </div>
//                                         </a>
//                                         <a onClick={e => this.ClickChange(e)} name='changepassword' data-toggle="tab" href="#password" id="password" className="tabs list-group-item active1">
//                                             <div className="list-div my-2" id='password'>
//                                                 <ion-icon name="wallet-outline" />&nbsp; Change Password
//                                             </div>
//                                         </a>
//                                         <a onClick={e => this.ClickChange(e)} name='changeemail' data-toggle="tab" href="#email" id="email" className="tabs list-group-item bg-light">
//                                             <div className="list-div my-2" id='email'>
//                                                 <ion-icon name="mail-outline" />&nbsp; Change Email
//                                             </div>
//                                         </a>
//                                         <a onClick={e => this.ClickChange(e)} name='changeaddress' data-toggle="tab" href="#address" id="address" className="tabs list-group-item bg-light">
//                                             <div className="list-div my-2" id='address'>
//                                                 <ion-icon name="location-outline" />&nbsp; Change Address
//                                             </div>
//                                         </a>

//                                     </div>
//                                 </div> {/* Page Content */}
//                                 <div id="page-content-wrapper">

//                                     <div className="tab-content">
//                                         {this.ChengeForm()}

//                                     </div>

//                                 </div>
//                             </div>
//                         </div>
//                     </div>

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
//         UpdateDataCustomer: (act_status) => {
//             dispatch({ type: 'update_data_customer', act_status })
//         }
//     }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(Setting)
