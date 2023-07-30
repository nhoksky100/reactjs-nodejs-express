import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { BrowserRouter as Link, Redirect, NavLink } from "react-router-dom";
import { Redirect, NavLink } from "react-router-dom";
import Catalog from './Catalog/Catalog';
import Deal from './Order/Deal';
import FormManager from './StatisticsData/FormManager';
import Order from './Order/Order';
import Product from './Product/Product';
import AdminMember from './adminMember/AdminMember';
import Support from './Support/Support';
import Slide from './Slide/Slide';
import AddSlide from './Slide/AddSlide';
import Add from './Product/Add';
import EditProduct from './Product/EditProduct';
import Detail from './Product/Detail';
import EditCatagory from './Catalog/Edit';
import AddCatalog from './Catalog/AddCatalog';
import AddAdminMember from './adminMember/AddAdminMember';
import EditAdminMember from './adminMember/EditAdminMember';
import Ratings from './Product/Ratings';
import ManagerAccountCustomer from './adminMember/ManagerAccountCustomer';
import Cookies from 'universal-cookie';
import DetailsOrder from './Order/DetailsOrder';
import SendFeedback from './Support/SendFeedback';
import Blog from './Blog/Blog';
import AddBlog from './Blog/AddBLog';
import EditBlog from './Blog/EditBlog';
import DetailContentComment from './Blog/DetailContentComment';
import Pages from './Pages/Pages';
import AddSlidePages from './Pages/AddSlidePages';
import DataRecovery from './Product/DataRecovery';

class AdminManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: '',
            isRedirect: false,
            getUser: '',
            permissionUser: '',
            username: '',
            tokenStatus: false,
            token: '',
            tokenCookie: '',
            countLogin: 0,
            //
            dataPermissionMember: [],
            // status nav menu
            stattusNavSidebar: false,
            classSibarNavMenu: '',
        }
    }




    componentDidMount() {
        
        const tokenId = localStorage.getItem('tokenId');
        const username = localStorage.getItem('loginManagerUsername')
        const permission = localStorage.getItem('permission')
        if (tokenId) {
            this.setState({
                username: username,
                permission: permission,
            })
        }
     
    }
    logOut = () => {

        localStorage.removeItem('tokenId');
        localStorage.removeItem('permission');
        localStorage.removeItem('loginManagerUsername');

        this.setState({ isLogin: false })

    }


    statusShowAdmin = () => {
        const pathUrl = this.props.match.path;

        if (sessionStorage.getItem('dataFeedback')) {
            if (pathUrl !== '/admin/support/reply.html') {
                sessionStorage.removeItem('dataFeedback');
            }
        }

      
        const username = localStorage.getItem('loginManagerUsername')
        const cookies = new Cookies();
        const tokenId = cookies.get(username)


        if (tokenId) {
            switch (pathUrl) {
                case '/admin/': case '/admin':
                    return (<FormManager />)

                case '/admin/product.html':
                    return (<Product add={pathUrl} />)

                case '/admin/order-product.html':
                    return (<Order />)
                case '/admin/details-order-product.html':
                    return (<DetailsOrder />)

                case '/admin/deal.html':
                    return (<Deal />)

                case '/admin/catalog.html':
                    return (<Catalog />)

                case '/admin/catalog-edit.html':
                    return (<EditCatagory />)

                case '/admin/catalog-add.html':
                    return (<AddCatalog />)

                case '/admin/member.html':
                    return (<AdminMember />)

                case '/admin/member-add.html':
                    return (<AddAdminMember />)

                case '/admin/member-edit.html':
                    return (<EditAdminMember />)

                case '/admin/account-customer.html':
                    return (<ManagerAccountCustomer />)

                case '/admin/support.html':
                    return (<Support />)
                case '/admin/support/reply.html':
                    return (<SendFeedback />)

                case '/admin/slide.html':
                    return (<Slide />)

                case '/admin/slide-add.html':
                    return (<AddSlide />)

                case '/admin/add-product.html':
                    return (<Add />)

                case '/admin/edit-product.html':
                    return (<EditProduct path={this.props.match} />)

                case '/admin/detail-product.html':
                    return (<Detail path={this.props.match} />)

                case '/admin/rating-product.html':
                    return (<Ratings path={this.props.match} />)
                case '/admin/data-recovery.html':
                    return (<DataRecovery  />)

                case '/admin/blog.html':
                    return (<Blog />)
                case '/admin/add-blog.html':
                    return (<AddBlog />)
                case '/admin/edit-blog.html':
                    return (<EditBlog />)
                case '/admin/detail-blog.html':
                    return (<DetailContentComment />)

                case '/admin/pages.html':
                    return (<Pages />)
                case '/admin/add-pages.html':
                    return (<AddSlidePages />)

                default:
                    break;
            }
        } else {
            localStorage.removeItem('tokenId');
            localStorage.removeItem('permission');
            localStorage.removeItem('loginManagerUsername');
            return <Redirect to='/login-manager' />

        }

    }

    render() {

        if (this.state.isLogin === false) {
            return <Redirect to='/login-manager' />
        }
      
        // console.log(' path url admin:'+this.props.match.path);
        return (
            <div>

                <div id="left_content">

                    <div id="leftSide" style={{ paddingTop: '30px' }}>
                        {/* Account panel */}
                        <div className="sideProfile">
                            <span title="/" className="profileFace"><img width={40} src="./images/user.png" alt='' /></span>
                            {/* <span>welcom: <strong>{this.state.permissionUser}!</strong></span> */}
                            <span>Xin chào: {this.state.username}</span>
                            <div className="clear" />
                        </div>
                        <div className="sidebarSep" />
                        {/* Left navigation */}
                        <ul id="menu" className="nav">


                            <li className="home">
                                <NavLink to="/admin/" className="active" id="current">
                                    <span>Bảng điều khiển</span>
                                    <strong />
                                </NavLink>
                            </li>
                            <li className="tran">
                                <a href="#Manager" className=" exp">
                                    <span>Quản lý bán hàng</span>
                                    <strong className='str_n' id='str_1'></strong>
                                </a>
                                <ul className="sub" id='ul_1'>
                                    <li>
                                        <NavLink to="/admin/deal.html">
                                            Giao dịch
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/admin/order-product.html">
                                            Đơn hàng sản phẩm
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>

                            <li className="product">
                                <a href="#Product" className=" exp">
                                    <span >Sản phẩm</span>
                                    <strong className='str_n' id='str_2'></strong>
                                </a>
                                <ul className="sub" id='ul_2'>
                                    <li>
                                        <NavLink to="/admin/product.html">
                                            Sản phẩm
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/admin/catalog.html">
                                            Danh mục
                                        </NavLink>
                                    </li>

                                </ul>
                            </li>
                            <li className="account">
                                <NavLink to="/admin/member.html" className=" exp">
                                    <span>Tài khoản</span>
                                    <strong className='str_n' id='str_3'></strong>
                                </NavLink>
                                <ul className="sub" id='ul_3'>

                                    <li>
                                        <NavLink to="/admin/member.html">
                                            Thành viên quản trị
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/admin/account-customer.html">
                                            Tài khoản khách hàng
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>
                            <li className="support">
                                <NavLink to="/admin/support.html" className=" exp">
                                    <span>Hỗ trợ và liên hệ</span>
                                    <strong className='str_n' id='str_4'></strong>
                                </NavLink>
                                <ul className="sub" id='ul_4'>
                                    <li>
                                        <NavLink to="/admin/support.html">
                                            Hỗ trợ
                                        </NavLink>
                                    </li>

                                </ul>
                            </li>
                            <li className="content">
                                <a href="#Content" className=" exp">
                                    <span>Nội dung</span>
                                    <strong className='str_n' id='str_5'></strong>
                                </a>
                                <ul className="sub" id='ul_5'>
                                    <li>
                                        <NavLink to="/admin/slide.html">
                                            Slide
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/admin/blog.html">
                                            Tin tức
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink to="/admin/pages.html">
                                            Pages
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div className="clear" />
                </div>
                <div id="rightSide">

                    <div className="topNav">
                        <div className="wrapper">
                            <div className="welcome">
                                <span>Chức vụ: <b>{this.state.permission}</b></span>



                            </div>
                            <div className="userNav">
                                <ul>
                                    <li><a href="#Home" target="_blank">
                                        <img style={{ marginTop: '7px' }} src="../admin/images/icons/light/home.png" alt='' />
                                        <span>Trang chủ</span>
                                    </a></li>
                                    {/* Logout */}
                                    <li onClick={() => this.logOut()}>
                                        <a href='#Logout' >
                                            <img src="../admin/images/icons/topnav/logout.png" alt="" />
                                            <span>Đăng xuất</span>
                                        </a></li>
                                </ul>
                            </div>
                            <div className="clear" ></div>
                        </div>
                    </div>

                    {this.statusShowAdmin()}
                </div>

               
            </div>

        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        cookieToken: state.cookieToken,
        // is_status_show_app: state.is_status_show_app,
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {

       

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AdminManager)

