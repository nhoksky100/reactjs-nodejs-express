import axios from 'axios';
import React, { Component } from 'react';
import Pagination from 'react-js-pagination';

import { NavLink } from 'react-router-dom';

import ReadMore from '../../ReadMore/ReadMoreContent';
import { stringtoslug } from '../../stringtoslug';
import { connect } from 'react-redux';
import { t } from 'i18next';

const getDataBlog = () => axios.get('/getdata_blog').then((res) => res.data);

class Blog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataBlog: null,
            dataLength: 0,
            // pagination
            currentPage: 1,
            newsPerPage: 5, // show 5 pt
            pageNumbers: [],
        }
    }
    componentDidMount() {
        if (!this.state.dataBlog) {
            getDataBlog().then((res) => {
                this.setState({
                    dataBlog: res,
                    dataLength: res.length,
                })
            })
        }
    }

    currentTodos = () => {
        const { currentPage, newsPerPage } = this.state; // trang hiện tại acti  //cho trang tin tức mỗi trang
        const indexOfLastNews = currentPage * newsPerPage; // lấy vị trí cuối cùng của trang ,của data
        const indexOfFirstNews = indexOfLastNews - newsPerPage; // lấy vị trí đầu tiên  của trang ,của data
        return this.state.dataBlog.slice(indexOfFirstNews, indexOfLastNews); // lấy dữ liệu ban đầu và cuối gán cho các list
    }

    // pagination
    handlePageChange(currentPage) {
        this.setState({
            currentPage: currentPage,
        });
    }

    // get content
    detailContent = (idBlog) => {
        // console.log('click');
        // var { dataBlog } = this.state;
        // var dataFil = [];
        // dataFil = dataBlog.filter((item) => item.ID === idBlog);
        sessionStorage.setItem('idBlogContent', idBlog);
       
    }

    showDataBlog = () => {
        // console.log(this.props.location.pathname);
        if (this.state.dataBlog) {
            const currentTodos = this.currentTodos();
            currentTodos.sort((a, b) => parseInt(b.dateTime) - parseInt(a.dateTime)).reverse();
            return currentTodos.map((value, key) => {

                return (

                    <div className="item" key={key}>
                        <div className="item-header">
                            <NavLink onClick={() => this.detailContent(value.ID)} to={'/blog-content/' + stringtoslug(value.title) + ".html"}>
                                <span className="comment-tag">
                                    <i className="fa fa-eye" />
                                    {value.comment}
                                    <i />
                                </span>
                                <span className="read-more-wrapper">
                                    {/* <span className="read-more">
                                        <NavLink to='/blog-content/:slug:id.html'>Read full</NavLink>
                                        <i />
                                    </span> */}
                                </span>

                                <img src={value.fileImage} alt=''/>
                            </NavLink>
                        </div>
                        <div className="item-content">

                            <h2>
                                <NavLink onClick={() => this.detailContent(value.ID)} to={"/blog-content/" + stringtoslug(value.title) + ".html"}>
                                    {value.title}

                                </NavLink>
                            </h2>
                            <span className="item-meta">
                                <span className='mr20' >
                                    <i className="fa fa-eye" />
                                    {value.comment}
                                </span>
                                <span  >
                                    <i className="fa fa-clock-o" />
                                    {value.dateTime}
                                </span>
                            </span>

                            <div>

                                <ReadMore
                                    text={value.painted}
                                    length={350}
                                    color={'#45b7f9'}
                                />

                            </div>

                        </div>

                    </div>
                )
            })
        }
    }

    showForm = () => {
        // console.log(this.props.match.params);
        // console.log(this.props.location.pathname);
        return (
            <div id='blog' className="content-panel">
                <div className="content-panel-title">
                    <NavLink to="/blog" className="right">
                        {!this.props.location.pathname ? 'Read all articles' : ''}

                    </NavLink>
                    <h2>{t("new-post")}</h2>
                </div>
                <div className='row'>
                    <div className="content-panel-body article-list">

                        {this.showDataBlog()}
                        <div className="pagination">

                            <Pagination
                                activePage={this.state.currentPage}
                                itemsCountPerPage={this.state.newsPerPage}
                                totalItemsCount={
                                    this.state.dataBlog !== null
                                        ? this.state.dataLength
                                        : 0
                                }
                                pageRangeDisplayed={5} // show page
                                // firstPageText ={'Đầu'}
                                onChange={this.handlePageChange.bind(this)}
                            />

                        </div>
                    </div>

                </div>

            </div>
        )
    }
    render() {
        return (
            <div className='container'>
                <div className='row'>

                    {this.showForm()}

                </div>
            
            </div>

        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        languageValue: state.languageValue,
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {

      
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Blog)
