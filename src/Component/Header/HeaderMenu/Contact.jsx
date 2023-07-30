import React, { Component, Fragment } from 'react';

import { UpdateDateTime } from '../../UpdateDateTime';

import axios from 'axios';
import { randomId } from '../../adminManager/RandomId/randomId.jsx';
import { toast } from 'react-toastify';
import validator from 'validator';
import { t } from 'i18next';
import { connect } from 'react-redux';
const dataSupport = () => axios.get('/support').then((res) => res.data)
class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSupport: null,
            name: '', email: '', selectSupport: 'Product Support', noteSupport: '', dateTime: '', file: '', fileTemp: '', contactFileImage: '',
            // isDisabled
            isDisabled: false
        }
    }

    isValue = (valueFeedback, gotoBack) => {

        if (gotoBack) {
            window.history.back()
        } else {
            toast(<div className="advertise"><i className="fa fa-exclamation-triangle" aria-hidden="true" />
                <i>{valueFeedback}!</i></div>)
        }


    }
    componentDidMount() {
        if (!this.state.dataSupport) {
            var email = JSON.parse(sessionStorage.getItem('tokenProfileCustomer')) ? JSON.parse(sessionStorage.getItem('tokenProfileCustomer')).email : ' ';
            dataSupport().then((res) => {

                this.setState({
                    dataSupport: res,
                    email: email
                })
            })
        }
    }

    sendFeedBack = () => {
        var flag = false;
        setTimeout(() => {


            if (this.state.dataSupport) {
                this.state.dataSupport.map((value) => {
                    //email block
                    if (value.block === '0' && value.email === this.state.email) {
                        this.isValue(t("email-blocked"))
                        flag = true;
                    }
                    return this.state.dataSupport
                })
            }

            if (!flag) {
                //email feedback

                this.clearForm()
                var ID = randomId();
                var { name, email, selectSupport, noteSupport, contactFileImage } = this.state;
                if (!validator.isEmail(email)) {
                    this.isValue(t("email-invalidate"))

                }
                else if (name && email && noteSupport) {
                    var dateTime = UpdateDateTime()


                    if (contactFileImage) {
                        var formData = new FormData();
                        formData.append("contactImage", this.state.file);
                        const config = {
                            headers: {
                                'content-type': 'multipart/form-data'
                            }
                        }
                        axios.post('/contactImage', formData, config);
                    }

                    axios.post('/support', { ID, name, email, dateTime, selectSupport, noteSupport, contactFileImage })
                    this.isValue(t("email-sent-successfully"))
                    this.isValue('', true)

                } else {
                    this.isValue(t("fields-cannot-be-left-blank") + '(*)')

                }
            }
            this.setState({ isDisabled: false })
        }, 4000);
        this.setState({ isDisabled: true })
    }
    getFile = (event) => {
        // const ffile = e.target.files[0].name; // lay ten file
        var files_s = this.refs.file.files[0];
        var { fileTemp, contactFileImage } = this.state;
        fileTemp = event.target.files[0];

        if (files_s) {

            var reader = new FileReader();
            reader.readAsDataURL(files_s);

            reader.onloadend = function (event) {
                this.setState({
                    file: fileTemp,
                    contactFileImage: [reader.result],
                    fileTemp: contactFileImage,
                })
                // console.log('ten file :' + this.state.blogFileImage);
            }.bind(this);
        }
    }

    clearForm = (e) => {
        this.refs.name.value = "";
        this.refs.email.value = "";
        this.refs.selectSupport.value = "Product Support";
        this.refs.noteSupport.value = "";
        this.refs.file.value = "";
        this.setState({
            name: '',
            email: '',
            selectSupport: 'Product Support',
            noteSupport: '',
            file: '',
            contactFileImage: ''

        })
    }
    isChange = (e) => {
        var value = e.target.value;
        var name = e.target.name;
        // console.log(value);
        this.setState({ [name]: value })
    }
    showForm = () => {

        return (
            <div id='contact-menu' className="hero fullscreen">
                <div className="hero-body">
                    <div className='container' style={{ margin: 'auto' }}>
                        <div className='row'>


                            <form className="frame p-0" method="post">
                                <div className="frame__body p-0">
                                    <div className="row p-0 level fill-height">
                                        <div className="col">
                                            <div className="space xlarge" />
                                            <div className="padded">
                                                <h1 className="u-text-center u-font-alt">{t("contact-us")}</h1>
                                                <div className="divider" />
                                                <div className="form-group"> <p className="u-text-center">{t("please-fill-in the-correct-information")}.</p></div>

                                                <div className="divider" />
                                                <div className="form-group">
                                                    <label className="form-group-label">
                                                        <span className="icon">
                                                            <i className="fa-wrapper far fa-user" />
                                                        </span>
                                                    </label>
                                                    <input
                                                        type="text" onChange={(e) => this.isChange(e)} className="form-group-input" name='name' ref={'name'} placeholder={t("enter-your-name") + "(*)"} />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-group-label">
                                                        <span className="icon">
                                                            <i className="fa-wrapper far fa-envelope" />
                                                        </span>
                                                    </label>
                                                    <input type="email" onChange={(e) => this.isChange(e)} className="form-group-input" name='email' ref={'email'}
                                                        defaultValue={this.state.email}
                                                        placeholder={t("enter-your-email") + "(*)"} />
                                                </div>
                                                <div className="form-section section-inline">
                                                    <div className="section-body row">
                                                        <div className="form-group col-6 pl-0">

                                                            <div className="left ipImgContack"><input onChange={(event) => this.getFile(event)} type="file" id="imageUpload" name="contactFileImage" accept="/admin/*" ref='file' /></div>
                                                            {/* <img className="url_img imgContact" src={this.state.contactFileImage} /> */}
                                                        </div>

                                                        <div className="form-group col-6 pr-0">
                                                            <label className="form-group-label">
                                                                <span className="icon">
                                                                    <i className="fa-wrapper fas fa-list" />
                                                                </span>
                                                            </label>
                                                            <select className="select form-group-input" onChange={(e) => this.isChange(e)} name='selectSupport' ref='selectSupport' placeholder="Choose one">
                                                                <option>{t("product-support")}</option>
                                                                <option>{t("payment-support")}</option>
                                                                <option>{t("other")}</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <textarea onChange={(e) => this.isChange(e)} name='noteSupport' ref={'noteSupport'}
                                                    placeholder={t("tell-us-what's-wrong") + "(*)"} defaultValue={""} />

                                                <div className="space" />
                                                <div onClick={() => this.sendFeedBack()} className="btn-group  u-pull-right">
                                                    <input disabled={this.state.isDisabled} type="button" role="send" value={t("footer-send")} />
                                                </div>
                                            </div>
                                            <div className="space xlarge" />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    render() {
      
        return (
            <Fragment>
                {this.showForm()}
               

            </Fragment>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        languageValue: state.languageValue
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Contact)
