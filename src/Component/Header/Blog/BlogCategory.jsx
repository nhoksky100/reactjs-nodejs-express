import axios from 'axios';
import React, { Component } from 'react';
import Pagination from 'react-js-pagination';
import { NavLink } from 'react-router-dom';
import ReadMore from '../../ReadMore/ReadMoreContent';
import { stringtoslug } from '../../stringtoslug';
import { t } from 'i18next';
import { connect } from 'react-redux';
const getDataBlog = () => axios.get('/getdata_blog').then((res) => res.data);
class BlogCategory extends Component {
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
                    dataBlog: res.reverse(),
                    dataLength: res.length,

                })
            })
        }
    }
   
    currentTodos = () => {
        const { currentPage, newsPerPage, } = this.state; // trang hiện tại acti  //cho trang tin tức mỗi trang
        const indexOfLastNews = currentPage * newsPerPage; // lấy vị trí cuối cùng của trang ,của data
        const indexOfFirstNews = indexOfLastNews - newsPerPage; // lấy vị trí đầu tiên  của trang ,của data
        var  pathName = this.props.location.pathname;
        var dataBlog = this.state.dataBlog.filter((item) => item.catalog.indexOf(pathName.slice(6, -5)) !== -1 || item.company.indexOf(pathName.slice(6, -5)) !== -1); // tìm pathname
        // console.log(dataBlog);
        return dataBlog.slice(indexOfFirstNews, indexOfLastNews); // lấy dữ liệu ban đầu và cuối gán cho các list
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
    showCategoryBLog = () => {
        var { dataBlog } = this.state;
       

        if (dataBlog) {
            const currentTodos = this.currentTodos();
            currentTodos.sort((a, b) => parseInt(b.dateTime) - parseInt(a.dateTime)).reverse();
            return currentTodos.map((value, key) => {
                // if (value.catalog.indexOf(pathName.slice(6, -5)) !== -1 ||
                //     value.company.indexOf(pathName.slice(6, -5)) !== -1
                // ) {

                return (

                    <div className="item" key={key}>
                        <div className="item-header">

                            <NavLink onClick={() => this.detailContent(value.ID)} to={'/blog-content/' + stringtoslug(value.title) + ".html"}>
                                <span className="comment-tag">
                                    <i className="fa fa-comment-o" />
                                    {value.comment}
                                    <i />
                                </span>
                                <span className="read-more-wrapper">

                                </span>
                                <img src={value.fileImage} alt='' />
                            </NavLink>
                        </div>
                        <div className="item-content">

                            <h2>
                                <NavLink onClick={() => this.detailContent(value.ID)} to={'/blog-content/' + stringtoslug(value.title) + ".html"}>
                                    {value.title}
                                    {/* <ReadMore
                                        text={value.title}
                                        length={80}
                                        color={'#45b7f9'}
                                    /> */}

                                </NavLink>
                            </h2>
                            <span className="item-meta">
                                <a href="post.html#comments">
                                    <i className="fa fa-comment-o" />
                                    {value.comment}
                                </a>
                                <a href="blog.html">
                                    <i className="fa fa-clock-o" />
                                    {value.dateTime}
                                </a>
                            </span>

                            <div>

                                <ReadMore
                                    text={value.content}
                                    length={500}
                                    color={'#45b7f9'}
                                />

                            </div>

                        </div>

                    </div>
                )
                // }
            })
        }


    }
    render() {

        return (
            <div id='blog' className="content-panel">
                <div className="content-panel-title">
                    <NavLink to="/blog" className="right">
                       {t("news-homepage")}

                    </NavLink>
                    <h2>{t("footer-news")} {this.props.location.pathname.slice(6, -5)}</h2>
                </div>
                <div className='row'>
                    <div className="content-panel-body article-list">

                        {this.showCategoryBLog()}
                        <div className="pagination">

                            <Pagination
                                activePage={this.state.currentPage}
                                itemsCountPerPage={this.state.newsPerPage}
                                totalItemsCount={
                                    this.state.dataBlog !== null
                                        ? this.state.dataBlog.length
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

export default connect(mapStateToProps, mapDispatchToProps)(BlogCategory)
