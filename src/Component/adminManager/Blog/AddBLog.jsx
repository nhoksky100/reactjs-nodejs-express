import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { randomId } from '../RandomId/randomId';
import axios from 'axios';
import CKEditor from "react-ckeditor-component";
import FormtitleArea from '../titleAreaFrom/FormtitleArea';
import { UpdateDateTime } from '../../UpdateDateTime';
const getDataCategory = () => axios.get('/getdata_category').then((res) => res.data)

// const typingtimeoutRef = createRef(null);
class AddBlog extends Component {
    constructor(props) {
        super(props);
        this.state = {

            blogStatus: false,
            file: '', fileImage: [], blogFileImage: '', content: '', catalog: ' ', company: '', painted: '',
            title: '', fileTemp: ' ',
            // category
            selectDataCatagory: null

        }
    }

    componentDidMount() {
        if (this.state.selectDataCatagory === null) {
            getDataCategory().then((res) => {
                this.setState({ selectDataCatagory: res })
            })
        }
    }

    // category
    categorySelect = (isName) => {
        var { selectDataCatagory } = this.state
        var isPushcatalog = [], PushcatalogName = [], pushcodeName = [], pushCatalog = [], pushName = []

        if (selectDataCatagory) {
            selectDataCatagory.reverse()
            selectDataCatagory.sort((a, b) => parseInt(a.catalog) - parseInt(b.catalog)).reverse()
            selectDataCatagory.map((value, key) => {
                isPushcatalog.push(value.catalog)
                pushcodeName.push(value.codeCatalog)
                pushName.push(<option value={value.name.toLowerCase()}>{value.name}</option>)
                for (let j = 0; j <= key; j++) {

                    if (value.catalog === isPushcatalog[j + 1]) {
                        if (pushCatalog.includes(value.catalog)) { // check duplicate in array

                            break
                        } else {
                            pushCatalog.push(value.catalog)

                        }

                    }

                }
            })

            if (isName) {
                for (let i = 0; i < pushCatalog.length; i++) {

                    PushcatalogName.push(
                        <div className="form-group slide_category">
                            <label htmlFor={pushCatalog[i].toLowerCase()}></label>
                            <input type="radio" defaultValue={pushCatalog[i].toLowerCase()} onChange={(event) => this.isChange(event)}
                                ref='catalog' className="" name="catalog" id={pushCatalog[i].toLowerCase()} placeholder={pushCatalog[i]} />
                            <small id="helpId" className="form-text ">{pushCatalog[i]}</small>
                        </div>
                    )


                }
            } else {
                PushcatalogName = pushName
            }

        }
        return PushcatalogName
    }


    addBlog = () => {
        //id random

        var reWhiteSpace = new RegExp("\\s+"); // white-spalce
        var { blogFileImage, painted, content, title, company } = this.state
        if (!blogFileImage || !painted || !content || !title || !company ||
            reWhiteSpace.test(blogFileImage) || reWhiteSpace.test(painted) || reWhiteSpace.test(content) ||
            reWhiteSpace.test(title) || reWhiteSpace.test(company)
        ) {
            toast(<div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" />
                <i>không được để trống!</i></div>)
        }
        else {
            var id = randomId();
            // const image = [];
            var formData = new FormData();
            formData.append("news", this.state.file);
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            axios.post('/news', formData, config).then(res => {

                // var filePath = res.data.fileNameInServer;
                // image.push(filePath.slice(38)); // bỏ ký tự từ 0 ->14 và thêm nó vào vùng chứa chung 1 vùng
                // count++;



                // this.setState({
                //     file: image // nối tất cả phần tử sau khi push lại cùng vs nhau phân biệt điều kiện
                // })
                var { title, blogFileImage, content, catalog, company, painted } = this.state;

                var dateTime = UpdateDateTime();
                axios.post('/add_blog', { id, title, blogFileImage, content, catalog, company, painted, dateTime }).then(res => {
                    toast(<div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" />
                        <i>Thêm thành công!</i></div>)

                    this.setState({ blogStatus: true, file: '', blogFileImage: ' ' })
                })

            }) // close axios slide





        }



    }
    isChange = (event) => {

        var name = event.target.name;
        var value = event.target.value;
        // if (typingtimeoutRef.current) {
        //     clearTimeout(typingtimeoutRef.current)
        // }
        // console.log(value);
        // typingtimeoutRef.current = setTimeout(() => {
        this.setState({
            [name]: value,
        });


        // }, 300);




    }
    showForm = () => {
        return (
            <Fragment>
                <div className="formRow">
                    <label className="formLeft" htmlFor="title">Tiêu đề:<span className="req">*</span></label>
                    <div className="formRight">
                        <span className="oneTwo"><input onChange={(event) => { this.isChange(event) }} name="title" id="title" _autocheck="true" type="text" /></span>
                        <span name="name_autocheck" className="autocheck" />
                        <div name="name_error" className="clear error" />
                    </div>
                    <div className="clear" />
                </div>
                <div className="formRow">

                    <label htmlFor="imageUpload" type="file" className="formLeft">Hình ảnh:<span className="req">*</span></label>
                    <div className="formRight">
                        <div className="left"><input onChange={(event) => this.getFile(event)} type="file" id="imageUpload" name="blogFileImage" accept="/admin/*" ref='file' /></div>
                        {this.state.blogFileImage !== '' &&

                            <img className="url_img_product" src={this.state.blogFileImage} alt='' />
                        }

                        <div name="image_error" className="clear error" />
                    </div>
                    <div className="clear" />
                </div>
                <div className="formRow">
                    <label className="formLeft" htmlFor="painted">Mô tả:<span className="req">*</span></label>
                    <div className="formRight">
                        <span className="oneTwo"><input onChange={(event) => { this.isChange(event) }} name="painted" id="painted" _autocheck="true" type="text" /></span>
                        <span name="name_autocheck" className="autocheck" />
                        <div name="name_error" className="clear error" />
                    </div>
                    <div className="clear" />
                </div>
                {this.FormCategory()}
                {this.FormCompany()}
                <div className="formRow">
                    <label htmlFor='param_content' className="formLeft">Bài viết:<span className="req">*</span></label>
                    <div className="formRight">
                        <CKEditor
                            activeClass="p10"
                            content={this.state.content}
                            events={{
                                // "blur": this.onBlur,
                                // "afterPaste": this.afterPaste,
                                "change": this.onChange
                            }}
                            onChange={(event) => this.onChange(event)}
                        />


                        <div name="content_error" className="clear error" />
                    </div>
                    <div className="clear" />
                </div>
            </Fragment>
        )
    }
    // get content
    onChange = (event) => {
        var value = event.editor.getData();
        this.setState({
            content: value

        })
    }
    // getfile
    getFile = (event) => {
        // const ffile = e.target.files[0].name; // lay ten file
        var files_s = this.refs.file.files[0];
        var { fileTemp, blogFileImage } = this.state;
        fileTemp = event.target.files[0];

        if (files_s) {

            var reader = new FileReader();
            reader.readAsDataURL(files_s);

            reader.onloadend = function (event) {
                this.setState({
                    file: fileTemp,
                    blogFileImage: [reader.result],
                    fileTemp: blogFileImage,
                })
                // console.log('ten file :' + this.state.blogFileImage);
            }.bind(this);
        } else {
            this.setState({
                blogFileImage: '',
                file: ''
            })
        }
    }

    //reset
    reSet = () => {
        this.setState({
            file: '',
            blogFileImage: '',
            title: ''
        })
        this.refs.file.value = "";
        this.refs.title.value = "";
        this.refs.content.value = "";
        this.refs.catalog.value = "";
    }




    FormCategory = () => {
        return (
            <div className="formRow" >
                <label className="formLeft" htmlFor="title">
                    Chọn thể loại
                </label>
                {this.categorySelect(true)}

            </div>
        )
    }
    // company

    FormCompany = () => {
        return (
            <div className="formRow" >
                <label className="formLeft" htmlFor="company">
                    Chọn hãng
                </label>
                <div className="select-blog">
                    <select name='company' onChange={(event) => this.isChange(event)}>
                        <option value="*">Select</option>
                        {this.categorySelect(false)}

                    </select>
                </div>
            </div>
        )
    }

    render() {

        if (this.state.blogStatus) {
            return <Redirect to="/admin/blog.html" />
        }
        return (

            <Fragment>
                <div id="rightSide">
                    <FormtitleArea
                        managerTitle={'Blog'}
                        managerName={'Quản lý Blog'}
                        urlList={'/admin/blog.html'}
                        imageList={'images/icons/control/16/list.png'}
                    />

                    <div className="wrapper">
                        {/* Form */}
                        <form className="form" id="form" action="" method="post" encType="multipart/form-data">
                            <div className="widget">
                                <fieldset>
                                    <div className="title">
                                        <img src="images/icons/dark/edit.png" className="titleIcon" alt='' />
                                        <h6>Thêm blog</h6>
                                    </div>
                                    <div className="tab_container">
                                        <div id="tab1" className="tab_content pd0">
                                            {this.showForm()}
                                        </div>
                                    </div>
                                    <div className="formSubmit">

                                        <input type="reset" onClick={() => this.reSet()} value="Làm mới" className="basic button" />
                                        <input onClick={() => this.addBlog()} type="reset" value="Thêm mới" className="redB button" />

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

export default AddBlog;