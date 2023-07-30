// import axios from 'axios';
// import React, { Component } from 'react';

// import { connect } from 'react-redux';
// import { toast } from 'react-toastify';
// const getDataAccountCustomer = () => axios.get('/account_customer').then((res) => res.data)
// class FormProfile extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             dataAccountCustomer: null,
//             nextUp: false,
//             file: '',
//             profileImage: '',
//             ID: ''
//         }
//     }

//     componentDidMount() {
//         var IdCustomer = sessionStorage.getItem('ID_customer');

//         var filId = new Array;
//         if (this.state.dataAccountCustomer === null) {
//             getDataAccountCustomer().then((res) => {
//                 filId = res.filter((item) => item.ID === IdCustomer);
//                 this.setState({ dataAccountCustomer: filId, ID: IdCustomer })

//             })
//         }

//     }

//     UNSAFE_componentWillUpdate(nextProps, nextState) {

//         nextState.nextUp = this.props.statusUpdateData;
//         if (nextState.nextUp === true) {
//             var IdCustomer = sessionStorage.getItem('ID_customer');

//             var filId = new Array;
//             if (this.state.dataAccountCustomer !== null) {
//                 getDataAccountCustomer().then((res) => {
//                     filId = res.filter((item) => item.ID === IdCustomer);
//                     this.setState({ dataAccountCustomer: filId, ID: IdCustomer })
//                 })
//             }
//         }

//         //update profile
//         if (nextState.profileImage !== '') {
//             var { ID } = this.state;
//             var profileImage = nextState.profileImage;
//             //    update_customer_profile_img
//             axios.post('/update_customer_profile_img', { profileImage, ID }).then((res) => {
//                 toast(<div className="advertise"><ion-icon name="ban-outline" />
//                     <i>Profile Update successfully !</i></div>);
//             })
//         }

//     }
//     componentDidUpdate(prevProps, prevState) {

//         prevState.nextUp = this.props.statusUpdateData
//         if (prevState.nextUp) {
//             this.setState({ nextUp: false })
//             this.props.UpdateDataCustomer(false);
//         }

//     }
//     getFile = (e) => {
//         // const ffile = e.target.files[0].name; // lay ten file
//         var files_s = this.refs.file.files[0];

//         var file1 = e.target.files[0];

//         if (files_s !== undefined) {

//             var reader = new FileReader();
//             var url = reader.readAsDataURL(files_s);

//             reader.onloadend = function (e) {
//                 this.setState({
//                     file: file1,
//                     profileImage: [reader.result]
//                 })
//                 // console.log('ten file :'+ this.state.product_image);
//             }.bind(this);
//         } else {
//             this.setState({
//                 file: this.state.profileImage
//             })

//         }
//     }

//     ShowProfile = () => {
//         if (this.state.dataAccountCustomer !== null) {
//             return this.state.dataAccountCustomer.map((value, key) => {
//                 return (
//                     <table key={key} cellPadding={0} cellSpacing={0} width="100%" id='table-form-profile' className="sTable myTable">

//                         <tbody>
//                             <tr >
//                                 <td style={{ padding: '0 25px' }} className="fontB blue f13">
//                                     <div className="row profile_image" id="profile_image">
//                                         {
//                                             this.state.profileImage === ''
//                                                 ? < img src={value.profile} />
//                                                 : < img src={this.state.profileImage[0]} />
//                                         }
//                                     </div>
//                                     <div className="form-group update_profile">
//                                         <label htmlFor="imageUpload" type="file" className="btn btn-up btn-primary  btn-outlined"> Update profile
//                                             <i className="fa fa-file-image-o" aria-hidden="true" /></label>
//                                         <input className="block form-control" type="file" onChange={(e) => this.getFile(e)} name="file" id="imageUpload" accept="img/*" ref="file"  placeholder="title" aria-describedby="noteedit" />

//                                     </div>
//                                 </td>
//                                 <td >
//                                     <table>
//                                         <tbody>

//                                             <tr>
//                                                 <td style={{ padding: '0 25px' }} className="fontB blue f13">Username</td>
//                                                 <td className="textR webStatsLink red" style={{ width: '400px' }}>{value.username}</td>
//                                             </tr>
//                                             <tr>
//                                                 <td style={{ padding: '0 25px' }} className="fontB blue f13">Password</td>
//                                                 <td className="textR webStatsLink red" style={{ width: '400px' }}>{'*********'}</td>
//                                             </tr>
//                                             <tr>
//                                                 <td style={{ padding: '0 25px' }} className="fontB blue f13">Email</td>
//                                                 <td className="textR webStatsLink red" style={{ width: '400px' }}>{value.email}</td>
//                                             </tr>
//                                             <tr>
//                                                 <td style={{ padding: '0 25px' }} className="fontB blue f13">Phone</td>
//                                                 <td className="textR webStatsLink red" style={{ width: '400px' }}>{value.phone}</td>
//                                             </tr>
//                                             <tr>
//                                                 <td style={{ padding: '0 25px' }} className="fontB blue f13">Address</td>
//                                                 <td className="textR webStatsLink red" style={{ width: '400px' }}>
//                                                     {value.address}
//                                                 </td>
//                                             </tr>

//                                         </tbody>
//                                     </table>

//                                 </td>
//                             </tr>
//                         </tbody>
//                     </table>
//                 )
//             })
//         }
//     }
//     render() {
//         return (
//             <div className="oneTwo" id='form-profile'>
//                 <div className="widget">
//                     <div className="title">
//                         <img src="../admin/images/icons/dark/money.png" className="titleIcon" />
//                         <h6>Profile</h6>
//                     </div>
//                     {this.ShowProfile()}
//                 </div>
//             </div>
//         );
//     }
// }
// const mapStateToProps = (state, ownProps) => {
//     return {
//         statusUpdateData: state.status_update_data_customer,
//         // admin_url: state.admin_url
//     }
// }
// const mapDispatchToProps = (dispatch, ownProps) => {
//     return {
//         UpdateDataCustomer: (act_status) => {
//             dispatch({ type: 'update_data_customer', act_status })
//         }
//     }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(FormProfile)
