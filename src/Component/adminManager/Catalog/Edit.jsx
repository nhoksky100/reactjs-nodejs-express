import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';
import FormtitleArea from '../titleAreaFrom/FormtitleArea';
const getDataCategory = () => axios.get('/getdata_category').then((res) => res.data);


class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataCategory: null,

            checkError: '',
            categoryName: '',
            catalog: '',
            total: '',

            catalogStatus: false,
        }
    }
    componentDidMount() {
        var id = null;
        id = sessionStorage.getItem('ID_category');


        var filCategory = [];

        if (this.state.dataCategory === null) {

            getDataCategory().then((res) => {

                filCategory = res.filter((item) => item.ID === id)
                this.setState({
                    dataCategory: filCategory,
                    categoryName: filCategory[0].name,
                    catalog: filCategory[0].catalog,
                    total: filCategory[0].total
                })

            })

        }
    }
    statusBack = () => {
        this.setState({ catalogStatus: true })
    }
    isChange = (event) => {
        var name = event.target.name;
        var value = event.target.value;
        this.setState({ [name]: value })
    }
    handleClick = () => {
        var ID = sessionStorage.getItem('ID_category');
        var regex = /^[a-zA-Z]/; //

        var { categoryName, catalog } = this.state;
        if (categoryName.indexOf(' ') >= 0 || catalog.indexOf(' ') >= 0) {
            toast(<div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" />
                <i> Cố khoảng trống ! hoặc chưa nhập vào kí tự</i></div>)

        }
        else if (!categoryName.match(regex) || !catalog.match(regex)) (
            toast(<div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" />
                <i> không được nhập số</i></div>)
        )
        else {

            axios.post('/edit_category', { ID, categoryName, catalog }).then(res => {
                toast(<div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" />
                    <i>Sửa danh mục thành công!</i></div>)
                this.setState({ catalogStatus: true })
            })
        }
    }
    showEdit = () => {


        if (this.state.dataCategory) {
            return this.state.dataCategory.map((value, key) => {
                return (
                    <Fragment key={key}>
                        <div className="formRight">

                            <label className="formLeft">Mã ID:<input disabled defaultValue={value.ID} name="ID" className="req" />  </label>
                        </div>

                        <div className="formRow">

                            <label className="formLeft" htmlFor="param_name">Tên hãng:</label>
                            <div className="formRight">
                                <span className="oneTwo"><input required onChange={(event) => { this.isChange(event) }} name="categoryName" id="param_name" _autocheck="true" defaultValue={value.name} type="text" /></span>


                            </div>
                            <div className="clear" ></div>
                        </div>

                        <div className="formRow">

                            <label className="formLeft" htmlFor="param_category">Thể loại:</label>
                            <div className="formRight">
                                <span className="oneTwo"><input onChange={(event) => { this.isChange(event) }} name="catalog" id="param_category" _autocheck="true" defaultValue={value.catalog} type="text" /></span>


                            </div>
                            <div className="clear" ></div>
                        </div>


                        <div className="formRow hide" ></div>

                    </Fragment>
                )
            })
        }
    }

    render() {
        if (this.state.catalogStatus) {
            return <Redirect to="/admin/catalog.html" />
        }

        return (

            <Fragment>
                <div id="rightSide">
                    {/* title form */}
                    {<FormtitleArea
                        managerTitle={'Danh mục'}
                        managerName={'Quản lý thể loại'}
                        urlAdd={'/admin/catalog-add.html'}
                        imageAdd={'./images/icons/control/16/add.png'}

                        urlList={'/admin/catalog.html'}
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

export default Edit;