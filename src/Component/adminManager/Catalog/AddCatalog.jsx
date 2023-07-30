import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { randomId } from '../RandomId/randomId';
import FormtitleArea from '../titleAreaFrom/FormtitleArea';


class AddCatalog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            catalogStatus: false
        }
    }
    //  get value input
    isChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({ [name]: value })

    }
    //click add catalog 
    handleClick = () => {
        const id = randomId();
        var { name, catalogs, total } = this.state;
        if (name === undefined || catalogs === undefined || total === undefined) {
            toast(<div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" />
                <i>không được để trống!</i></div>)
        }
        else if (name === '' || catalogs === '' || total === '') {
            toast(<div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" />
                <i>không được để trống!</i></div>)
        }
        else if (name === ' ' || catalogs === ' ' || total === ' ') {
            toast(<div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" />
                <i>không được để trống!</i></div>)
        }
        else {
            axios.post('/add_category', { id, name, catalogs, total }).then(res => {
                toast(<div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" />
                    <i>Thêm danh mục thành công!</i></div>)
                this.setState({ catalogStatus: true })
            })
        }
    }
    showFormAdd = () => {
        return (
            <Fragment>

                <div className="formRow">

                    <label className="formLeft" htmlFor="param_name">Tên danh mục:</label>
                    <div className="formRight">
                        <span className="oneFour"><input onChange={(event) => { this.isChange(event) }} name="name" id="param_name" _autocheck="true" type="text" /></span>
                        <span name="name_autocheck" style={{ color: 'red' }} className="autocheck"></span> {/*check error*/}
                        <div name="name_error" className="clear error" ></div>
                    </div>
                    <div className="clear" ></div>
                </div>
                <div className="formRow">
                    <label className="formLeft" htmlFor="param_category">
                        Thể loại
                    </label>
                    <div className="formRight">
                        <span className="oneFour"><input onChange={(event) => { this.isChange(event) }} name="catalogs" id="param_category" type="text" /></span>
                        <span name="warranty_autocheck" className="autocheck" />
                        <div name="warranty_error" className="clear error" />
                    </div>
                    <div className="clear" />
                </div>


                {/* <div className="formRow">
                    <label className="formLeft" htmlFor="param_total">
                        Tổng số
                    </label>
                    <div className="formRight">
                        <span className="oneFour"><input onChange={(event) => { this.isChange(event) }} name="total" id="param_total" type="text" /></span>
                        <span name="warranty_autocheck" className="autocheck" />
                        <div name="warranty_error" className="clear error" />
                    </div>
                    <div className="clear" />
                </div> */}

                <div className="formRow hide" ></div>

            </Fragment>
        )
    }
    render() {
        if (this.state.catalogStatus) {
            return <Redirect to="/admin/catalog.html"/>
        }
        return (

            <Fragment>
                <div id="rightSide">
                    {<FormtitleArea
                        managerTitle={'Danh mục'}
                        managerName={'Quản lý thể loại'}
                       
                        urlList={'/admin/catalog.html'}
                        imageList={'./images/icons/control/16/list.png'}
                    />}

                    <div className="wrapper">
                        {/* Form */}
                        <form className="form" id="form" action="" method="post" encType="multipart/form-data">
                            <div className="widget">
                                <fieldset>
                                    <div className="title">
                                        <img src="images/icons/dark/edit.png" className="titleIcon" alt='edit' />
                                        <h6>Thêm danh mục</h6>
                                    </div>

                                    <div className="tab_container">
                                        <div id="tab1" className="tab_content pd0">
                                            {this.showFormAdd()}
                                        </div>
                                    </div>{/* End tab_container*/}

                                    <div className="formSubmit">

                                        <input type="reset" value="Hủy bỏ" className="basic button" />
                                        <input onClick={() => this.handleClick()} type="button" value="Thêm mới" className="redB" />

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

export default AddCatalog;