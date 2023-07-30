import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { send } from 'emailjs-com';
import axios from 'axios';
import FormtitleArea from '../titleAreaFrom/FormtitleArea';

class SendFeedback extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messageReply: ''
        }
    }
 

    dataForm = () => {
        var { dataSupportReply = '' } = this.props;
        if (window.location) {
            dataSupportReply = JSON.parse(sessionStorage.getItem('dataFeedback'))
        }
        if (dataSupportReply) {
            return (
                <Fragment>


                    <tr className="row_3">

                        <td>
                            <span className="wUserPic" title=''><img src="../images/user.png" width="60px" align="left" alt='' /></span>
                            <ul className="leftList">
                                <li><a href={"mailto:"+dataSupportReply.email}><strong>{dataSupportReply.email}</strong></a></li>
                                <li>{dataSupportReply.name}</li>
                            </ul>
                        </td>
                        <td>
                            <div className="image_thumb">
                                {dataSupportReply.contact_image ?
                                    <img src={dataSupportReply.contact_image} height={50} alt='' />
                                    : ''
                                }
                                <div className="clear" />
                            </div>

                        </td>
                        <td>{dataSupportReply.category_support}</td>

                        <td className="textC">{dataSupportReply.datetime}</td>

                    </tr>

                </Fragment>
            )
        }
    }
    onChange = (e) => {
        var value = e.target.value;
        var name = e.target.name;
        this.setState({
            [name]: value

        })
    }
    //send

    sendFeedback = () => {
        this.refs.messageReply.value = "";
        var { messageReply } = this.state;
        var { dataSupportReply } = this.props;

        if (messageReply && dataSupportReply) {

            var data = {
                to_email: dataSupportReply.email,
                from_name: dataSupportReply.category_support,
                to_name: dataSupportReply.name,
                message: messageReply,
                reply_to: 'nhoksky100@gmail.com', // send support admin
            };
            send('service_q2c9y4h', 'template_pq8hkcp', data, 'user_1Zgrt13xMD2pw9OVJI6E4')
            var permission = true;
            var { ID } = dataSupportReply;
            axios.post('/edit_support', { ID, permission })
            toast(<div className="advertise"><i className="fa fa-exclamation-triangle" aria-hidden="true" />
                <i>{'Email sent successfully!'}</i></div>)
            this.setState({ messageReply: '' })

        } else {
            toast(<div className="advertise"><i className="fa fa-exclamation-triangle" aria-hidden="true" />
                <i>{'Email sending failedrr!'}</i></div>)
        }

    }
    //from-reply
    formReply = () => {
        return (
            <div className="formRow">
                {/* <label htmlFor='param_content' className="formLeft">Nội dung phản hồi:</label> */}
                <div className="formRight">
                    <textarea onChange={(e) => this.onChange(e)} ref={'messageReply'} name='messageReply' />

                    <span className="button blueB" onClick={() => this.sendFeedback()}><span>Send</span></span>
                    <div name="content_error" className="clear error" />
                </div>
                <div className="clear" />
            </div>

        )
    }
    showForm = () => {

        return (
            <div className="wrapper">
                {/* Static table */}
                <div className="widget">
                    <div className="title">
                        <h6>Trả lời</h6>

                    </div>

                    <table cellPadding={0} cellSpacing={0} width="100%" className="sTable mTable myTable taskWidget" id="checkAll">
                        <thead>
                            <tr>

                                <td style={{ width: '240px' }}>Tên</td>
                                <td style={{ width: '240px' }}>Ảnh sản phẩm</td>
                                <td style={{ width: '90px' }}>Loại hổ trợ</td>

                                <td style={{ width: '90px' }}>Ngày tạo</td>

                            </tr>

                        </thead>

                        <tfoot className="auto_check_pages feedback-reply">
                            <tr>
                                <td colSpan={7}>
                                    Gửi phản hồi
                                    <div className='reply-content' style={{ marginRight: '15%' }}>

                                        {this.formReply()}
                                    </div>
                                </td>
                            </tr>
                        </tfoot>

                        <tbody>
                            {this.dataForm()}

                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={7}>Nội dung</td>
                            </tr>
                        </tfoot>

                        <tbody>

                            <tr>
                                <td colSpan={7} className="textL">{this.props.dataSupportReply.content}</td>
                            </tr>
                        </tbody>

                    </table>

                </div>
            </div>
        )

    }

    render() {

        return (
            <div id='rightSide'>
                     <FormtitleArea
                        managerTitle={'Phản hồi'}
                        managerName={'Quản lý phản hồi'}
                        urlAdd={''}
                        imageAdd={''}
                        urlRating={''}
                        imageRating={''}
                        urlList={'/admin/support.html'}
                        imageList={'../images/icons/control/16/list.png'}
                    />
                     <div className="line" />

                {/* Main content wrapper */}
                {this.showForm()}
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        dataSupportReply: state.dataSupportReply

    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {

        dataSupport: (act_data_support) => {
            dispatch({ type: 'dataSupport', act_data_support })
        },

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SendFeedback)
