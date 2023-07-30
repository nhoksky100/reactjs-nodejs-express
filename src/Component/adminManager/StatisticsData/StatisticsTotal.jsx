import axios from 'axios';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

const getdataAdminMember = () => axios.get('/getdata_admin_member').then((res) => res.data)
const getDataSupport = () => axios.get('/support').then((res) => res.data)
const getDataProduct = () => axios.get('/getdata_product_rating').then((res) => res.data)
const getDataBlog = () => axios.get('/getdata_blog').then((res) => res.data)

class StatisticsTotal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalProduct: null,
            totalMember: null,
            totalSupport: null,
            totalBlog: null,
        }
    }

    componentDidMount() {
        if (!this.state.dataAdminMember) {
            getdataAdminMember().then((res) => {
                if (res) {
                    this.setState({

                        totalMember: res.length
                    })
                }
            })
        }
        if (!this.state.totalSupport) {
            getDataSupport().then((res) => {
                if (res) {
                    this.setState({
                        totalSupport: res.length
                    })
                }
            })
        }
        if (!this.state.totalProduct) {
            getDataProduct().then((res) => {
                if (res) {
                    this.setState({
                        totalProduct: res.length
                    })
                }
            })
        }
        if (!this.state.totalBlog) {
            getDataBlog().then((res) => {
                if (res) {
                    this.setState({
                        totalBlog: res.length
                    })
                }
            })
        }
    }

    statisticsData = () => {
        // total data deal
        var { totalDeal } = this.props;
        var { totalSupport, totalMember, totalProduct, totalBlog } = this.state;


        // // counttotalPayment
        // dataDeal.map((value) => {
        //     if (value.payment === 'đã thanh toán') {
        //         totalDeal++;
        //     }
        // })

        return (

            <div className="widget">
                <div className="title">
                    <img src="../admin/images/icons/dark/users.png" className="titleIcon" />
                    <h6>Thống kê dữ liệu</h6>
                </div>
                <table cellPadding={0} cellSpacing={0} width="100%" className="sTable myTable">
                    <tbody>
                        <tr>
                            <td>
                                <div className="left">Tổng số gia dịch</div>
                                <div className="right f11"><NavLink to="/admin/deal.html">Chi tiết</NavLink></div>
                            </td>
                            <td className="textC webStatsLink">
                                {totalDeal ? totalDeal : ''}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="left">Tổng số sản phẩm</div>
                                <div className="right f11"><NavLink to="/admin/product.html">Chi tiết</NavLink></div>
                            </td>
                            <td className="textC webStatsLink">
                                {totalProduct}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="left">Tổng số bài viết</div>
                                <div className="right f11"><NavLink to="/admin/blog.html">Chi tiết</NavLink></div>
                            </td>
                            <td className="textC webStatsLink">
                                {totalBlog}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="left">Tổng số thành viên</div>
                                <div className="right f11"><NavLink to="/admin/member.html">Chi tiết</NavLink></div>
                            </td>
                            <td className="textC webStatsLink">
                                {totalMember}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="left">Tổng số liên hệ</div>
                                <div className="right f11"><NavLink to="/admin/support.html">Chi tiết</NavLink></div>
                            </td>
                            <td className="textC webStatsLink">
                                {totalSupport}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        )
    }
    render() {
        return (
            <div className="oneTwo">
                {this.statisticsData()}
            </div>
        );
    }
}

export default StatisticsTotal;