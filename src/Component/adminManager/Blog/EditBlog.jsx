import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';
import FormtitleArea from '../titleAreaFrom/FormtitleArea';
import CKEditor from "react-ckeditor-component";
import { UpdateDateTime } from '../../UpdateDateTime';
const getDataBlog = () => axios.get('/getdata_blog').then((res) => res.data);


class EditBlog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataBlog: null,


            title: '',
            painted: '',
            content: '',
            catalog: ' ',
            blogStatus: false,
        }
    }
    componentDidMount() {
        var id = null;
        id = sessionStorage.getItem('ID_blog');


        var filBlog = [];

        if (this.state.dataBlog === null) {

            getDataBlog().then((res) => {

                filBlog = res.filter((item) => item.ID === id)
                    this.setState({
                        dataBlog: filBlog,
                        title: filBlog[0].title,
                        painted: filBlog[0].painted,
                        content: filBlog[0].content
                    })
               

            })

        }
    }
    statusBack = () => {
        this.setState({ blogStatus: true })
    }
    isChange = (event) => {
        var name = event.target.name;
        var value = event.target.value;
        this.setState({ [name]: value })
    }
    handleClick = () => {
        var ID = sessionStorage.getItem('ID_Blog');
        

        var { title, painted, content, catalog, } = this.state;
        if (title.indexOf(' ') >= 0 || painted.indexOf(' ') >= 0 || !content) {
            toast(<div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" />
                <i> Cố khoảng trống ! hoặc chưa nhập vào kí tự</i></div>)

        }

        else {
            var dateTimeFix = UpdateDateTime();
            axios.post('/edit_blog', { ID, title, painted, content, catalog, dateTimeFix }).then(res => {
                toast(<div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" />
                    <i>Sửa thành công!</i></div>)
                this.setState({ blogStatus: true })
            })
        }
    }
    // content
    onChange = (e) => {
        var value = e.editor.getData();
        console.log(value);
        this.setState({
            content: value
        })
    }

    FormBox = () => {
        return (
            <div className="formRow" >
                <label className="formLeft" htmlFor="title">
                    Chọn thể loại
                </label>
                <div className="form-group slide_category">
                    <label htmlFor="laptop"></label>
                    <input type="radio" defaultValue={'laptop'} onChange={(event) => this.isChange(event)}
                        ref='catalog' className="" name="catalog" id="laptop" placeholder="Laptop" />
                    <small id="helpId" className="form-text ">Laptop</small>
                </div>
                <div className="form-group slide_category">
                    <label htmlFor="smartphone"></label>
                    <input type="radio" defaultValue={'smartphone'} onChange={(event) => this.isChange(event)}
                        ref='catalog' className="" name="catalog" id="smartphone" placeholder="Smartphone" />
                    <small id="helpId" className="form-text ">Smartphone</small>
                </div>
                <div className="form-group slide_category">
                    <label htmlFor="tvaudio"></label>
                    <input type="radio" defaultValue={'tv&audio'} onChange={(event) => this.isChange(event)}
                        ref='catalog' className="" name="catalog" id="tvaudio" placeholder="TV&Audio" />
                    <small id="helpId" className="form-text ">TV&Audio</small>
                </div>
                <div className="form-group slide_category">
                    <label htmlFor="tablet"></label>
                    <input type="radio" defaultValue={'tablet'} onChange={(event) => this.isChange(event)}
                        ref='catalog' className="" name="catalog" id="tablet" placeholder="Tablet" />
                    <small id="helpId" className="form-text ">Tablet</small>
                </div>
                <div className="form-group slide_category">
                    <label htmlFor="smartwatch"></label>
                    <input type="radio" defaultValue={'smartwatch'} onChange={(event) => this.isChange(event)}
                        ref='catalog' className="" name="catalog" id="smartwatch" placeholder="Smartwatch" />
                    <small id="helpId" className="form-text ">Smartwatch</small>
                </div>
                <div className="form-group slide_category">
                    <label htmlFor="accessories"></label>
                    <input type="radio" defaultValue={'accessories'} onChange={(event) => this.isChange(event)}
                        ref='catalog' className="" name="catalog" id="accessories" placeholder="Accessories" />
                    <small id="helpId" className="form-text ">Accessories</small>
                </div>
            </div>
        )
    }


    showEdit = () => {

        if (this.state.dataBlog) {
            return this.state.dataBlog.map((value, key) => {
                return (
                    <Fragment key={key}>
                        <div className="formRight">

                            <label className="formLeft">Mã ID:<input disabled defaultValue={value.ID} name="ID" className="req" />  </label>
                        </div>

                        <div className="formRow">

                            <label className="formLeft" htmlFor="param_title">Tiêu đề:</label>
                            <div className="formRight">
                                <span className="oneTwo"><input onChange={(event) => { this.isChange(event) }} name="title" id="param_title" _autocheck="true" defaultValue={value.title} type="text" /></span>
                                <span name="name_autocheck" style={{ color: 'red' }} className="autocheck">{this.state.checkError}</span> {/*check error*/}
                                <div name="name_error" className="clear error" ></div>
                            </div>
                            <div className="clear" ></div>
                        </div>

                        <div className="formRow">

                            <label className="formLeft" htmlFor="param_painted">Mô tả:</label>
                            <div className="formRight">
                                <span className="oneTwo"><input onChange={(event) => { this.isChange(event) }} name="painted" id="param_painted" _autocheck="true" defaultValue={value.painted} type="text" /></span>
                                <span name="name_autocheck" style={{ color: 'red' }} className="autocheck"></span> {/*check error*/}
                                <div name="name_error" className="clear error" ></div>
                            </div>
                            <div className="clear" ></div>
                        </div>
                        {this.FormBox()}
                        <div className="formRow">
                            <label htmlFor='param_content' className="formLeft">Bài viết:</label>
                            <div className="formRight">

                                <CKEditor
                                    activeClass="p10"
                                    content={this.state.content}
                                    events={{
                                        // "blur": this.onBlur,
                                        // "afterPaste": this.afterPaste,
                                        "change": this.onChange
                                    }}
                                    onChange={(e) => this.onChange(e)}
                                />
                                <div name="content_error" className="clear error" />
                            </div>
                            <div className="clear" />
                        </div>
                        <div className="formRow hide" ></div>

                    </Fragment>
                )
            })
        }
    }

    render() {
        if (this.state.blogStatus) {
            return <Redirect to="/admin/blog.html" />
        }

        return (

            <Fragment>
                <div id="rightSide">
                    {/* title form */}
                    {<FormtitleArea
                        managerTitle={'Blog'}
                        managerName={'Quản lý Blog'}
                        urlAdd={'/admin/add-blog.html'}
                        imageAdd={'./images/icons/control/16/add.png'}

                        urlList={'/admin/blog.html'}
                        imageList={'./images/icons/control/16/list.png'}
                    />}

                    <div className="wrapper">
                        {/* Form */}
                        <form className="form" id="form" action="" method="post" encType="multipart/form-data">
                            <div className="widget">
                                <fieldset>
                                    <div className="title">
                                        <img src="images/icons/dark/edit.png" className="titleIcon" alt='' />
                                        <h6>Sửa danh mục</h6>
                                    </div>

                                    <div className="tab_container">
                                        <div id="tab1" className="tab_content pd0">

                                            {this.showEdit()}


                                        </div>
                                    </div>{/* End tab_container*/}

                                    <div className="formSubmit">

                                        <input type="button" onClick={() => this.statusBack()} value="Hủy bỏ" className="basic" />
                                        <input onClick={() => this.handleClick()} type="button" value="Cập nhật" className="redB" />

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

export default EditBlog;