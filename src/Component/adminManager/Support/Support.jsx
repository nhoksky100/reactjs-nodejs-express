import axios from 'axios';
import React, { Component } from 'react';
import Pagination from 'react-js-pagination';
import { connect } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReadMore from '../../ReadMore/ReadMore';

const dataSupport = () => axios.get('/support').then((res) => res.data)
class Support extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSupport: null,
            activeNoTab: 'activeTab',
            activeDoneTab: '',
            statusDoneTab: false,
            statusNoTab: true,
            statusActiveTab: true,
            dataLength: 0,
            //key
            statusKeyBlock: 0,
            block: '',
            // pagination
            currentPage: 1,
            newsPerPage: 5, // show 5 product
            pageNumbers: [],
        }
    }

    componentDidMount() {

        this.getDataSupport();

    }
    getDataSupport = () => {
        // if (!this.state.dataSupport) {

        dataSupport().then((res) => {
            this.setState({
                dataSupport: res,
                dataLength: res.length,
                statusKeyBlock: 0,
            })
        })
        // }
    }
    currentTodos = () => {
        const { currentPage, newsPerPage } = this.state; // trang hiện tại acti  //cho trang tin tức mỗi trang
        const indexOfLastNews = currentPage * newsPerPage; // lấy vị trí cuối cùng của trang ,của data
        const indexOfFirstNews = indexOfLastNews - newsPerPage; // lấy vị trí đầu tiên  của trang ,của data
        return this.state.dataSupport.slice(indexOfFirstNews, indexOfLastNews); // lấy dữ liệu ban đầu và cuối gán cho các list
    }
    //reply feedback
    replyFeedback = (value) => {
        this.props.dataSupport(value)
        sessionStorage.setItem('dataFeedback', JSON.stringify(value))
    }
    componentDidUpdate(prevProps, prevState) {

        if (prevState.statusKeyBlock !== this.state.statusKeyBlock) {
            this.getDataSupport();
        }

    }


    // key feedback
    keyPermission = (value) => {
        var { ID, permission, block } = value;
        if (!block || block === '0')
            block = '1';
        else
            block = '0';

        axios.post('/edit_support', { ID, permission, block })
        toast(<div className="advertise"><i className="fa fa-exclamation-triangle" aria-hidden="true" />
            <i>{'Update key success!'}</i></div>)
        this.setState({
            statusKeyBlock: 1,
        })

    }
    //delete
    delete = (idSupport) => {
        var deleteSupport = this.state.dataSupport.filter((item) => item.ID !== idSupport);
        axios.post('/deleteSupport', { idSupport }).then((res) => {
            this.setState({ dataSupport: deleteSupport })
            toast(<div className="advertise"><i className="fa fa-exclamation-triangle" aria-hidden="true" />
                <i>{'Delete success!'}</i></div>)
        })
    }

    handlePageChange(currentPage) {
        this.setState({
            currentPage: currentPage,
        });
    }

    dataForm = () => {
        var { dataSupport, statusActiveTab } = this.state;
        if (dataSupport) {
            const currentTodos = this.currentTodos();
            return currentTodos.map((value, key) => {
               
                if (!value.permission && statusActiveTab) {
                    return (
                        <tr key={key} className="row_3">
                            {/* <td><input type="checkbox" name="id[]" defaultValue={3} /></td> */}
                            <td>
                                <span className="wUserPic" title=''><img src="images/user.png" width="60px" align="left" alt='' /></span>
                                <ul className="leftList">
                                    <li><a href="mailto:hoang@gmail.com"><strong>{value.email}</strong></a></li>
                                    <li>{value.name}</li>
                                </ul>
                            </td>
                            <td>
                                <div className="image_thumb">
                                    {
                                        value.contact_image!==null &&
                                        <img className='toZoom' src={value.contact_image} width='100%' alt=''/>

                                    }
                                    <div className="idMyModal Zoom-modal">
                                        <span className="close-Zoom-modal">&times;</span>
                                        <img className="Zoom-modal-content" alt='' />
                                    </div>
                                    <div className="clear" />
                                </div>

                            </td>
                            <td>{value.category_support}</td>
                            <td>
                                <ReadMore
                                    text={value.content}
                                    length={200}
                                    color={'#45b7f9'}
                                />

                            </td>
                            <td className="textC">{value.datetime}</td>
                            <td className="option">
                                <span style={{ cursor: 'pointer' }} onClick={() => this.keyPermission(value)}

                                    title=
                                    {value.block !== '0' ? "Khóa phản hồi này" : 'Mở khóa phản hồi này'} className="tipS mr10" >
                                    {value.block !== '0'
                                        ? <img src="images/icons/color/block.png" alt='' /> : <img src="images/icons/color/unblock.png" alt='' />
                                    }


                                </span>
                                <NavLink onClick={() => this.replyFeedback(value)} to='/admin/support/reply.html' title="Trả lời phản hồi" className="tipS lightbox">
                                    <img src="images/icons/color/pencil.png" alt='' />
                                </NavLink>
                                <a href="#delete" onClick={() => this.delete(value.ID)} title="Xóa" className="tipS verify_action ml10">
                                    <img src="images/icons/color/delete.png" alt='' />
                                </a>
                            </td>
                        </tr >
                    )

                } else if (value.permission && !statusActiveTab) {
                    return (
                        //true reply
                        <tr key={key} className="row_3">
                            {/* <td><input type="checkbox" name="id[]" defaultValue={3} /></td> */}
                            <td>
                                <span className="wUserPic" title=''><img src="images/user.png" width="60px" align="left" alt='' /></span>
                                <ul className="leftList">
                                    <li><a href="mailto:nhoksky100@gmail.com"><strong>{value.email}</strong></a></li>
                                    <li>{value.name}</li>
                                </ul>
                            </td>
                            <td>
                                <div className="image_thumb">


                                    {
                                        value.contact_image!==null &&
                                        <img className='toZoom' src={value.contact_image} width='100%' alt=''/>
                                    }

                                    

                                    <div className="idMyModal Zoom-modal">
                                        <span className="close-Zoom-modal">&times;</span>
                                        <img className="modal-content" alt='' />
                                    </div>


                                    <div className="clear" />
                                </div>

                            </td>
                            <td>{value.category_support}</td>
                            <td>{value.content}</td>
                            <td className="textC">{value.datetime}</td>
                            <td className="option">
                                <span style={{ cursor: 'pointer' }} onClick={() => this.keyPermission(value)}


                                    title=
                                    {value.block !== '0' ? "Khóa phản hồi này" : 'Mở khóa phản hồi này'} className="tipS mr10 " >
                                    {value.block !== '0'
                                        ? <img src="images/icons/color/block.png" alt='' /> : <img src="images/icons/color/unblock.png" alt='' />
                                    }


                                </span>
                                {/* <NavLink onClick={() => this.replyFeedback(value)} to='/admin/support/reply.html' title="Trả lời phản hồi" className="tipS lightbox">
                                    <img src="images/icons/color/view.png" />
                                </NavLink> */}
                                <a href="#delete" onClick={() => this.delete(value.ID)} title="Xóa" className="tipS verify_action ml10">
                                    <img src="images/icons/color/delete.png" alt='' />
                                </a>
                            </td>
                        </tr >
                    )

                } else return ''
                // return dataSupport
            })
        }
    }
    doneTab = () => {
        this.setState({
            statusActiveTab: false,
        })
    }
    noTab = () => {
        this.setState({
            statusActiveTab: true,
        })
    }
    showForm = () => {

        return (
            <div className="wrapper">
                {/* Static table */}
                <div className="widget">
                    <div className="title">
                        {/* <span className="titleIcon"><input type="checkbox" id="titleCheck" name="titleCheck" /></span> */}
                        <h6>Danh sách Phản hồi</h6>
                        <div className="num f12"><b>{this.state.dataLength}</b> Phản hồi</div>
                    </div>
                    <ul className="tabs">
                        <li onClick={() => this.noTab()}
                            className={
                                this.state.statusActiveTab
                                    ? 'activeTab'
                                    : ''
                            }>
                            <a href='#!done' style={{ cursor: 'pointer' }}>Chưa kiểm duyệt</a>
                        </li>
                        <li onClick={() => this.doneTab()}
                            className={
                                !this.state.statusActiveTab
                                    ? 'activeTab'
                                    : ''
                            }>
                            <a href='#done' style={{ cursor: 'pointer' }}>
                                Đã kiểm duyệt
                            </a>
                        </li>
                    </ul>
                    <table cellPadding={0} cellSpacing={0} width="100%" className="sTable mTable myTable taskWidget" id="checkAll">
                        <thead>
                            <tr>
                                {/* <td style={{ width: '21px' }}><img src="images/icons/tableArrows.png" alt='' /></td> */}
                                <td style={{ width: '240px' }}>Tên</td>
                                <td style={{ width: '240px' }}>Ảnh sản phẩm</td>
                                <td style={{ width: '90px' }}>Loại hổ trợ</td>
                                <td>Nội dung</td>
                                <td style={{ width: '90px' }}>Ngày tạo</td>
                                <td style={{ width: '100px' }}>Hành động</td>
                            </tr>
                        </thead>
                        <tfoot className="auto_check_pages">
                            <tr>
                                <td colSpan={7}>
                                    <div className="pagination">

                                        <Pagination
                                            activePage={this.state.currentPage}
                                            itemsCountPerPage={this.state.newsPerPage}
                                            totalItemsCount={
                                                this.state.dataSupport !== null
                                                    ? this.state.dataSupport.length
                                                    : 0
                                            }
                                            pageRangeDisplayed={5} // show page
                                            // firstPageText ={'Đầu'}
                                            onChange={this.handlePageChange.bind(this)}
                                        />

                                    </div>
                                </td>
                            </tr>
                        </tfoot>
                        <tbody>
                            {this.dataForm()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
    render() {
        if (this.state.statusFeedbackReply) {
            return <Redirect to='/admin/support/reply.html' />
        }
        return (
            <div>
                <div className="titleArea">

                    <div className="wrapper" id="main_product">
                        <div className="pageTitle">
                            <h5>Phản hồi</h5>
                            <span>Quản lý phản hồi</span>
                        </div>
                        <div className="clear" />
                    </div>
                </div>
                <div className="line" />

                {/* Main content wrapper */}
                {this.showForm()}
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

        dataSupport: (act_data_support) => {
            dispatch({ type: 'dataSupport', act_data_support })
        },

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Support)
