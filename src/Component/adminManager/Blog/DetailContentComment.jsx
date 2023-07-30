import axios from 'axios';
import React, { Component, Fragment } from 'react';
import reactInnerHTML from 'react-inner-html';
import FormtitleArea from '../titleAreaFrom/FormtitleArea';
const getDataBlog = () => axios.get('/getdata_blog').then((res) => res.data)

class DetailContentComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataBlog: null,
        }
    }
    Content = (content) => <div {...reactInnerHTML(content)}></div>;
    componentDidMount() {
        if (this.state.dataBlog === null) {
            var pushRes = [];
            getDataBlog().then((res) => {

                pushRes = res.reverse();
                this.setState({
                    dataBlog: pushRes,


                })
            })
        }

        if (sessionStorage.getItem('ID_blog') === '' || sessionStorage.getItem('ID_blog') === null) {
            sessionStorage.setItem('ID_blog', '')
        }

    }
    showContentComment = () => {

        var dataDetail = [];
        var id = sessionStorage.getItem('ID_blog');
        if (this.state.dataBlog !== null) {
            dataDetail = this.state.dataBlog.filter((itemDetail) => itemDetail.ID === id);
        }


        if (dataDetail) {
            return dataDetail.map((value, key) => {
                return (
                    <Fragment>
                        <aside key={key} style={{ width: '90%', margin: '2% auto' }}>

                            {this.Content(value.content)}
                        </aside>
                        <aside>
                            {/* comment */}
                        </aside>
                    </Fragment>
                )
            })
        }
    }
    render() {
        return (
            <div id="rightSide">
                <FormtitleArea
                    managerTitle={'BLog'}
                    managerName={'Chi tiết blog'}
                    urlAdd={''}
                    imageAdd={''}
                    urlRating={''}
                    imageRating={''}
                    urlList={'/admin/blog.html'}
                    imageList={'./images/icons/control/16/list.png'}
                />
                <div className="line" />
                <div className="wrapper" id="main_product">
                    <div className="widget">
                        {this.showContentComment()}
                    </div>
                </div>
            </div>
        );
    }
}

export default DetailContentComment;