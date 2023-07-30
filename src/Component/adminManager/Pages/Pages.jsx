import React, { Component, Fragment } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import FormtitleArea from '../titleAreaFrom/FormtitleArea';
const getdataPages = () => axios.get('/getdata_pages').then((res) => res.data)
const getDataDeletePages = (id) => (axios.post('/delete_pages', { id }).then((res) => res.data)) // send mysql res
class Pages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataPages: null,
            editStatus: false

        }
    }

    componentDidMount() {
        if (this.state.dataPages === null) {
            getdataPages().then((res) => {
                this.setState({ dataPages: res })
            })
        }
    }

    showSlide = () => {
        // var urlSrc = "./upload/pages/";
        if (this.state.dataPages !== null) {
            return this.state.dataPages.map((value, key) => {


                return (
                    <Fragment key={key}>

                        <div className="item col-lg-3 col-sm-4 col-xs-6">
                            <div id="loadOverlay" ></div>
                            <div key={key} className="btn01">

                                <img className='img' src={value.slide_pages} width="280px" alt='' />
                                <div className="ovrly" />
                                <div className="buttons">
                                    <span onClick={() => this.Delete(value.ID)} title="Xóa" name='ID' className="overf tipS verify_action_slide">
                                        <img src="images/icons/color/delete.png" style={{ width: '20px' }} alt='' />
                                    </span>

                                </div>
                            </div>
                        </div>

                    </Fragment>
                )
            })
        }
    }
    //delete
    Delete = (slidePagesId) => {

        var filDelete = [];

        getDataDeletePages(slidePagesId).then((res) => {
            filDelete = this.state.dataPages.filter((item) => item.ID !== slidePagesId); // lọc danh sách khác với id đã chọn 
            this.setState({ dataPages: filDelete }) // cập nhật lại danh sách đã lọc
            toast(<div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" />
                <i>Xóa slidePages thành công!</i></div>)
        })

    }
    render() {

        return (
            <Fragment>

                <FormtitleArea
                    managerTitle={'Pages'}
                    managerName={'Quản lý Pages'}
                    urlAdd={'/admin/add-pages.html'}
                    imageAdd={'images/icons/control/16/add.png'}
                />
                <div className="line" />

                {/* Main content wrapper */}
                <div className="wrapper">
                    <div className="widget">
                        <div className="title">
                            <img src="images/icons/dark/dialog.png" className="titleIcon" alt='' />
                            <h6>
                                Danh sách slide Pages</h6>
                        </div>
                        <div className="gallery">
                            <ul>
                                {this.showSlide()}

                            </ul>
                            <div className="clear" style={{ height: '20px' }} />
                        </div>
                    </div>
                </div>

            </Fragment>

        );
    }
}

export default Pages;