import React, { Component, Fragment } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import FormtitleArea from '../titleAreaFrom/FormtitleArea';
const getDataSlide = () => axios.get('/getdata_slide').then((res) => res.data)
const getDataDeleteSlide = (id) => (axios.post('/delete_slide', { id }).then((res) => res.data)) // send mysql res
class Slide extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSlide: null,
            editStatus: false

        }
    }

    componentDidMount() {
        if (this.state.dataSlide === null) {
            getDataSlide().then((res) => {
                this.setState({ dataSlide: res })
            })
        }
    }

    showSlide = () => {
        // var urlSrc = "./upload/slide/";
        if (this.state.dataSlide !== null) {
            return this.state.dataSlide.map((value, key) => {
                return (
                    <Fragment key={key}>
                     
                        <div className="item col-lg-3 col-sm-4 col-xs-6">
                            <div id="loadOverlay" ></div>
                            <div key={key} className="btn01">

                                <img className='img' src={value.image_slide} width="280px" alt=''/>
                                <div className="ovrly" />
                                <div className="buttons">
                                    <a href='#delete' onClick={() => this.Delete(value.ID)} title="Xóa" name='ID' className="overf tipS verify_action_slide">
                                        <img src="images/icons/color/delete.png" style={{ width: '20px' }} alt='' />
                                    </a>
                                  
                                </div>
                            </div>
                        </div>

                    </Fragment>
                )
            })
        }
    }
    //delete
    Delete = (slideId) => {

        var filDelete =[];
  
        getDataDeleteSlide(slideId).then((res) => {
            filDelete = this.state.dataSlide.filter((item) => item.ID !== slideId); // lọc danh sách khác với id đã chọn 
            this.setState({ dataSlide: filDelete }) // cập nhật lại danh sách đã lọc
            toast(<div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" />
                <i>Xóa slide thành công!</i></div>)
        })

    }
    render() {
       
        return (
            <Fragment>

                <FormtitleArea
                    managerTitle={'Slide'}
                    managerName={'Quản lý slide'}
                    urlAdd={'/admin/slide-add.html'}
                    imageAdd={'images/icons/control/16/add.png'}
                />
                <div className="line" />

                {/* Main content wrapper */}
                <div className="wrapper">
                    <div className="widget">
                        <div className="title">
                            <img src="images/icons/dark/dialog.png" className="titleIcon" alt='' />
                            <h6>
                                Danh sách Slide</h6>
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

export default Slide;