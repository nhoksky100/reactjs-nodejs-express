// import React, { Component } from 'react';

// class Pay extends Component {
//     prevent=(e)=>{
//         e.preventDefault();
//     }
//     render() {
//         return (
//             <div className="container-fluid px-0" id="bg-div">
//                 <div className="row justify-content-center">
//                     <div className="col-lg-9 col-12">
//                         <div className="card card0">
//                             <div className="d-flex" id="wrapper">
//                                 {/* Sidebar */}
//                                 <div className="bg-light border-right" id="sidebar-wrapper">
//                                     <div className="sidebar-heading pt-5 pb-4"><strong>PAY WITH</strong></div>
//                                     <div className="list-group list-group-flush">
//                                         <a data-toggle="tab" href="#menu1" id="tab1" className="tabs list-group-item bg-light">
//                                             <div className="list-div my-2">
//                                                 <ion-icon name="globe-outline" />&nbsp; Bank
//                                             </div>
//                                         </a>
//                                         <a data-toggle="tab" href="#menu2" id="tab2" className="tabs list-group-item active1">
//                                             <div className="list-div my-2">
//                                                 <ion-icon name="wallet-outline" />&nbsp; Card
//                                             </div>
//                                         </a>
//                                         <a data-toggle="tab" href="#menu3" id="tab3" className="tabs list-group-item bg-light">
//                                             <div className="list-div my-2">
//                                                 <ion-icon name="qr-code-outline" />&nbsp; Visa QR <span id="new-label">NEW</span>
//                                             </div>
//                                         </a>
//                                         <a data-toggle="tab" href="#menu4" id="tab4" className="tabs list-group-item bg-light">
//                                             <div className="list-div my-2">
//                                                 <ion-icon name="qr-code-outline" />&nbsp; MoMo QR <span id="new-label">NEW</span>
//                                             </div>
//                                         </a>
//                                     </div>
//                                 </div> {/* Page Content */}
//                                 <div id="page-content-wrapper">
//                                     <div className="row pt-3" id="border-btm">
//                                         {/* <div className="col-4"> 
//                                         <button className="btn btn-success mt-4 ml-3 mb-3" id="menu-toggle">
//                                             <div className="bar4" />
//                                             <div className="bar4" />
//                                             <div className="bar4" />
//                                         </button> </div> */}
//                                         <div className="col-8 pay_cart2">
//                                             <div className="row justify-content-right">
//                                                 <div className="col-12">
//                                                     <p className="mb-0 mr-4 mt-4 text-right">customer@email.com</p>
//                                                 </div>
//                                             </div>
//                                             <div className="row justify-content-right">
//                                                 <div className="col-12">
//                                                     <p className="mb-0 mr-4 text-right">Pay <span className="top-highlight">$ 100</span> </p>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="row justify-content-center">
//                                         <div className="text-center" id="test">Pay</div>
//                                     </div>
//                                     <div className="tab-content">
//                                         <div id="menu1" className="tab-pane in">
//                                             <div className="row justify-content-center">
//                                                 <div className="col-11">
//                                                     <div className="form-card">
//                                                         <h3 className="mt-0 mb-4 text-center">Enter bank details to pay</h3>
//                                                         <form onSubmit={(e)=>this.prevent(e)}>
//                                                             <div className="row">
//                                                                 <div className="col-12">
//                                                                     <div className="input-group"> <input type="text" id="bk_nm" placeholder="BBB Bank" /> <label>BANK NAME</label> </div>
//                                                                 </div>
//                                                             </div>
//                                                             <div className="row">
//                                                                 <div className="col-12">
//                                                                     <div className="input-group"> <input type="text" name="ben_nm" id="ben-nm" placeholder="John Smith" /> <label>BENEFICIARY NAME</label> </div>
//                                                                 </div>
//                                                                 <div className="col-12">
//                                                                     <div className="input-group"> <input type="text" name="scode" placeholder="ABCDAB1S" className="placeicon" minLength={8} maxLength={11} /> <label>SWIFT CODE</label> </div>
//                                                                 </div>
//                                                             </div>
//                                                             <div className="row">
//                                                                 <div className="col-md-12"> <input type="submit" defaultValue="Pay $ 100" className="btn btn-success placeicon" /> </div>
//                                                             </div>
//                                                             <div className="row">
//                                                                 <div className="col-md-12">
//                                                                     <p className="text-center mb-5" id="below-btn"><a href="#">Use a test card</a></p>
//                                                                 </div>
//                                                             </div>
//                                                         </form>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div id="menu2" className="tab-pane in active">
//                                             <div className="row justify-content-center">
//                                                 <div className="col-11">
//                                                     <div className="form-card">
//                                                         <h3 className="mt-0 mb-4 text-center">Enter your card details to pay</h3>
//                                                         <form onSubmit={(e)=>this.prevent(e)}>
//                                                             <div className="row">
//                                                                 <div className="col-12">
//                                                                     <div className="input-group"> <input type="text" id="cr_no" placeholder="0000 0000 0000 0000" minLength={19} maxLength={19} /> <label>CARD NUMBER</label> </div>
//                                                                 </div>
//                                                             </div>
//                                                             <div className="row">
//                                                                 <div className="col-6">
//                                                                     <div className="input-group"> <input type="text" name="exp" id="exp" placeholder="MM/YY" minLength={5} maxLength={5} /> <label>CARD EXPIRY</label> </div>
//                                                                 </div>
//                                                                 <div className="col-6">
//                                                                     <div className="input-group"> <input type="password" name="cvcpwd" placeholder="●●●" className="placeicon" minLength={3} maxLength={3} /> <label>CVV</label> </div>
//                                                                 </div>
//                                                             </div>
//                                                             <div className="row">
//                                                                 <div className="col-md-12"> <input type="submit" defaultValue="Pay $ 100" className="btn btn-success placeicon" /> </div>
//                                                             </div>
//                                                             <div className="row">
//                                                                 <div className="col-md-12">
//                                                                     <p className="text-center mb-5" id="below-btn"><a href="#">Use a test card</a></p>
//                                                                 </div>
//                                                             </div>
//                                                         </form>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div id="menu3" className="tab-pane in">
//                                             <div className="row justify-content-center">
//                                                 <div className="col-11">
//                                                     <h3 className="mt-0 mb-4 text-center">Scan the QR code to pay Visa</h3>
//                                                     <div className="row justify-content-center">
//                                                         <div id="qr"> <img src="https://i.imgur.com/DD4Npfw.jpg" width="200px" height="200px" /> </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div id="menu4" className="tab-pane in">
//                                             <div className="row justify-content-center">
//                                                 <div className="col-11">
//                                                     <h3 className="mt-0 mb-4 text-center">Scan the QR code to pay Momo</h3>
//                                                     <div className="row justify-content-center">
//                                                         <div id="qr"> <img src="https://i.imgur.com/DD4Npfw.jpg" width="200px" height="200px" /> </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//         );
//     }
// }

// export default Pay;