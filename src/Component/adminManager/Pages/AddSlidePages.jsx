import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { randomId } from '../RandomId/randomId';
import axios from 'axios';
import FormtitleArea from '../titleAreaFrom/FormtitleArea';

class AddSlide extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataCategory: null,
            slideStatus: false,
            file: '',
            statusForm: true,
            slideImage: '',
            checkedCategory: '',
            title: '',
        }
    }


    addSlidePages = () => {
        //id random

        const id = randomId();
        var { slideImage, checkedCategory, title, statusForm } = this.state
        var dataTime = new Date();
        if (statusForm) {

            if
                (slideImage !== '' && checkedCategory !== '' && title !== '') {
                var { slideImage, checkedCategory, title, dataTime } = this.state;
                axios.post('/add_pages', { id, slideImage, checkedCategory, title, dataTime }).then(res => {
                    toast(<div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" />
                        <i>Thêm slide thành công!</i></div>)
                    this.reSet()
                    this.setState({ slideStatus: true })

                })
            }

            else {

                toast(<div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" />
                    <i>không được bỏ trống!</i></div>)
            }
        }//end if
        else {

            //url
            if (slideImage !== '' && slideImage !== undefined && checkedCategory !== '' && title !== '') {
                var { slideImage, checkedCategory, title, statusForm } = this.state;
                axios.post('/add_pages', { id, slideImage, checkedCategory, title, dataTime }).then(res => {
                    toast(<div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" />
                        <i>Thêm slide url thành công!</i></div>)
                    this.reSet()
                    this.setState({ slideStatus: true })
                })

            }
            else {
                toast(<div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" />
                    <i>Không được bỏ trống!</i></div>)
            }
        }

    }


    showFormCategory = () => {
        return (
            <div className='row' >
                <div className="formRow" >
                    <label className="formLeft" htmlFor="title">
                        Chọn thể loại
                    </label>
                    <div className="form-group slide_category">
                        <label htmlFor="store"></label>
                        <input type="radio" defaultValue={'store'} onChange={(e) => this.isChange(e)}
                            ref='checkedCategory' className="" name="checkedCategory" id="Store" placeholder="Store" />
                        <small id="helpId" className="form-text ">Store</small>
                    </div>
                    <div className="form-group slide_category">
                        <label htmlFor="Blog"></label>
                        <input type="radio" defaultValue={'blog'} onChange={(e) => this.isChange(e)}
                            ref='checkedCategory' className="" name="checkedCategory" id="Blog" placeholder="Blog" />
                        <small id="helpId" className="form-text ">Blog</small>
                    </div>
                    <div className="form-group slide_category">
                        <label htmlFor="Contact"></label>
                        <input type="radio" defaultValue={'contact'} onChange={(e) => this.isChange(e)}
                            ref='checkedCategory' className="" name="checkedCategory" id="Contact" placeholder="Contact" />
                        <small id="helpId" className="form-text ">Contact</small>
                    </div>
                    <div className="form-group slide_category">
                        <label htmlFor="FAQ"></label>
                        <input type="radio" defaultValue={'faq'} onChange={(e) => this.isChange(e)}
                            ref='checkedCategory' className="" name="checkedCategory" id="FAQ" placeholder="FAQ" />
                        <small id="helpId" className="form-text ">FAQ</small>
                    </div>

                </div>
                <div className="formRow" >
                    <div className="formLeft">
                        <label className="formLeft" htmlFor="title">
                            Tiêu dề slide
                        </label>
                        <span className="oneFour"><input onChange={(e) => this.isChange(e)} ref='title' name="title" id="title" type="text" /></span>
                        <span name="warranty_autocheck" className="autocheck" />
                        <div name="warranty_error" className="clear error" />
                    </div>
                    <div className="clear" />
                </div>
            </div>
        )
    }
    showFormSlide = () => {
        return (
            <Fragment>

                <div className="formRow">


                    <div className="form-group div_inline">
                        <label htmlFor="imageUpload" type="file" className="btn btn-primary btn-block btn-outlined"> Lấy slide từ máy tính
                            <i className="fa fa-file-image-o" aria-hidden="true" /></label>
                        <input style={{ display: 'none' }} className="block form-control" type="file" onChange={(e) => this.getFile(e)}
                            name="slideImage" id="imageUpload" accept="img/*" ref="file" placeholder="title" aria-describedby="noteedit" />
                        <div className="row images_list" id="images_list">
                            {this.state.slideImage !== '' &&
                                < img src={this.state.slideImage} className="url_img_slide" alt='' />
                            }
                        </div>
                    </div>

                    <div className="clear" ></div>

                </div>

            </Fragment>
        )
    }

    showImageUrl = () => {
        var { slideImage, isLoadSrc } = this.state

        if (slideImage !== '') {

            return (
                <div className="row images_list">
                    < img src={slideImage} className="url_img_slide" alt='' />

                </div>
            )

        }
    }
    showFormUrl = () => {
        return (
            <div className="tab_container">
                <div className="formRow ">
                    <label className="formLeft" htmlFor="param_slide">
                        URL:

                    </label>
                    <div className="form-group div_inline">
                        <span>
                            <input onChange={(e) => { this.isChange(e) }} name="slideImage" value={this.state.slideImage} style={{ width: '700px' }} id="param_slide" type="text" />

                        </span>
                        <div className="row images_list tab_content" id="images_list">
                            {this.showImageUrl()}
                        </div>
                        <span name="discount_autocheck" className="autocheck" > </span>
                        <div name="discount_error" className="clear error" ></div>

                    </div>
                    <div className="clear" ></div>
                </div>

            </div>
        )
    }
    getFile = () => {
        // const ffile = e.target.files[0].name; // lay ten file
        var filesImg = this.refs.file.files[0];

        if (filesImg !== undefined) {

            var reader = new FileReader();
            reader.readAsDataURL(filesImg);

            reader.onloadend = function (e) {
                this.setState({
                    file: [reader.result],
                    slideImage: [reader.result]
                })
                // console.log('ten file :'+ this.state.product_image);
            }.bind(this);
        }
        // else {
        //     this.setState({
        //         file: ''

        //     })

        // }


    }
    //reset
    reSet = () => {
        this.setState({
            file: '',
            slideImage: '',
            title: '',
            checkedCategory: ''
        })
        // this.refs.file.value = "";
        this.refs.title.value = "";
        this.refs.checkedCategory.value = "";
    }
    statusPc = () => {
        this.setState({ statusForm: true })
    }
    statusUrl = () => {
        this.setState({ statusForm: false })
    }
    showFormPc = () => {
        return (
            <div className="tab_container">
                <div id="tab1" className="tab_content pd0">
                    {this.showFormSlide()}

                </div>
            </div>
        )
    }
    isChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        this.setState({
            [name]: value
        })
    }


    render() {

        if (this.state.slideStatus) {
            return <Redirect to="/admin/pages.html" />
        }
        return (

            <Fragment>
                <div id="rightSide">
                    <FormtitleArea
                        managerTitle={'Add pages'}
                        managerName={'Quản lý add pages'}
                        urlList={'/admin/pages.html'}
                        imageList={'images/icons/control/16/list.png'}
                    />

                    <div className="wrapper">
                        {/* Form */}
                        <form className="form" id="form" action="" method="post" encType="multipart/form-data">
                            <div className="widget">
                                <fieldset>
                                    <div className="title">
                                        <img src="images/icons/dark/edit.png" className="titleIcon" alt='' />
                                        <h6>Thêm slide pages</h6>
                                    </div>


                                    <div className="content">

                                        <ul className="nav nav-pills" role="tablist">
                                            <li className="nav-item">
                                                <a onClick={() => this.statusPc()} className="nav-link active" data-toggle="pill" href="#add-slide">Lấy từ máy tính</a>
                                            </li>
                                            <li className="nav-item">
                                                <a onClick={() => this.statusUrl()} className="nav-link" data-toggle="pill" href="#url">Lấy URL</a>
                                            </li>
                                        </ul>
                                        {/* Tab panes */}
                                        <div className="tab-content">
                                            <div id="add-slide" className="container tab-pane active">

                                                {this.showFormPc()}

                                            </div>
                                            <div id="url" className="container tab-pane fade">
                                                {this.showFormUrl()}
                                            </div>
                                            <div className='container' >
                                                {this.showFormCategory()}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="formSubmit">

                                        <input type="reset" onClick={() => this.reSet()} value="Làm mới" className="basic button" />
                                        <input onClick={() => this.addSlidePages()} type="button" value="Thêm mới" className="redB button" />

                                    </div>
                                    <div className="clear" />
                                </fieldset>
                            </div>
                        </form>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default AddSlide;