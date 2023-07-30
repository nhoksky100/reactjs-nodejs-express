import axios from 'axios';
import React, { Component } from 'react';
import reactInnerHTML from 'react-inner-html';
import Footer from '../../Footer/Footer';



const getDataBlog = () => axios.get('/getdata_blog').then((res) => res.data);

class BlogContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataBlog: null,
            idBLogContent: ''
        }

    }

    componentDidMount() {
        if (!this.state.dataBlog) {
            var idBLogContent = sessionStorage.getItem('idBlogContent');
            getDataBlog().then((res) => {
                if (res) {
                    this.setState({
                        dataBlog: res,
                        idBLogContent: idBLogContent
                    })
                }
            })
        }

    }

    Content = (content) => <div {...reactInnerHTML(content)}></div>;
    showFromDetail = () => {
        var { dataBlog, idBLogContent } = this.state;
        var dataDetail = [];
        // console.log(dataBlog);
        if (dataBlog) {

            dataDetail = dataBlog.filter((item) => item.ID === idBLogContent);

            return dataDetail.map((value, key) => {
                return (
                    <div className="detail-content" key={key}>
                        {this.Content(value.content)}
                    </div>
                )


            })
        }
    }

    render() {
        return (
            <div className='container'>
                <div className="header-content">

                    {this.showFromDetail()}
                </div>
                <Footer />
            </div>
        );
    }
}

export default BlogContent;