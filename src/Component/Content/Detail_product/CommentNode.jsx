import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import RatingStar from '../../RatingStar/RatingStar';
import Comment from './Comment';
import { toast } from 'react-toastify';
import ReadMore from '../../ReadMore/ReadMore';
import { t } from 'i18next';
import axios from 'axios';
const dataRemoveCommentParent = () => axios.get('/nodeCommentParent').then((res) => res.data)
const dataRemoveCommentChild = () => axios.get('/nodeCommentChild').then((res) => res.data)
class NodeComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            replyStatus: false,
            statusOverStar: false,
            isLiked: false,
            blueLiked: '',
            likes: 0,
            dataParent: [],
            dataChild: []
        }
    }


    componentDidMount() {
        this.dataCommentParent()
        this.dataCommentChild()
    }

    dataCommentParent = () => {
        var { idProduct } = this.props
        var pushData = []
        dataRemoveCommentParent().then((res) => {

            res.map((value) => {
                if (idProduct === value.idProduct) {
                    pushData.push(value)
                }
                return res
            })
            this.setState({ dataParent: pushData })

        })

    }
    dataCommentChild = () => {
        var { idProduct } = this.props
        var pushData = []
        dataRemoveCommentChild().then((res) => {
            if (res) {
                res.map((value) => {
                    if (idProduct === value.idProduct) {
                        pushData.push(value)
                    }
                    return res
                })
                this.setState({ dataChild: pushData })
            }

        })

    }

    componentDidUpdate(prevProps, prevState) {
        var { closeComment } = this.props;
        if (closeComment) {
            this.setState({ replyStatus: false })
            this.props.CLOSE_COMMENT(false);
        }

    }

    replyComment = () => {
        if (localStorage.getItem('tokenIdCustomer')) {
            this.setState({ replyStatus: !this.state.replyStatus })

        } else {
            toast(<div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" />
                <i> {t("login-to-comment")}!</i></div>);
        }

    }



    // delete comment
    deleteComment = (indexChild, data) => {

        // var { dataChild, dataParent } = this.state
        var { dataNodeComment = [], dataNodeCommentChild = [] } = this.props
        if (dataNodeCommentChild.length !== 0 || dataNodeComment.length !== 0) {


            var deleteDataCommentParent = [], deleteDataCommentChild = []

            if (indexChild) {

                // child remove
                deleteDataCommentChild = dataNodeCommentChild.filter((item, key) => item.idChild !== data.idChild);
                if (dataNodeCommentChild.length === 1) {
                    deleteDataCommentChild = []
                }

                // this.props.dataUpdateDataCommentChild(deleteDataComment)
                // this.props.dataUpdateDataCommentParent(dataParent)
                axios.post('/removeCommentChild', { deleteDataCommentChild })
                    .then((res) => {
                        toast(<div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" />
                            <i>{t("comment-deleted-successfully")}!</i></div>)
                        // this.setState({ dataChild: deleteDataCommentChild })
                    })



            } else {
                // remove  index comment parent

                var dateParent = [], dataChildInParent = []


                deleteDataCommentParent = dataNodeComment.filter((item, key) => item.idParent !== data.idParent); //check parent remove

                if (dataNodeComment.length === 1) {

                    deleteDataCommentParent = []
                }

                dateParent = dataNodeComment.filter((item, key) => item.date === data.date); //index

                axios.post('/removeCommentParent', { deleteDataCommentParent })
                    .then((res) => {
                        toast(<div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" />
                            <i>{t("comment-deleted-successfully")}!</i></div>)

                    })
                // this.setState({ dataParent: deleteDataCommentParent })



                if (dataNodeComment.length !== 0 && dataNodeCommentChild.length !== 0) {
                    dataChildInParent = dataNodeCommentChild.filter((item, key) => item.replyDate !== dateParent[0].date);
                    if (dataNodeComment.length === 1) {
                        dataChildInParent = []
                    }
                    // update child in parent delete
                    // this.setState({ dataChild: dataChildInParent })

                    deleteDataCommentChild = dataChildInParent
                    axios.post('/removeCommentChild', { deleteDataCommentChild })

                }

            }

            // update comment
            this.props.statusUpdateDataComment(true)
        }

    }
    // liked
    liked = () => {
        if (localStorage.getItem('tokenIdCustomer')) {
            if (!this.state.isLiked) {

                this.setState({
                    // likes: this.state.likes+1,
                    blueLiked: 'blue-liked'
                })
            } else {
                this.setState({
                    blueLiked: ''
                })
            }
            this.setState({
                isLiked: !this.state.isLiked,

            })
        }
    }
    //hover star
    voteStar = (voteStar) => {

        if (!voteStar && localStorage.getItem('tokenIdCustomer')) {
            this.setState({
                statusOverStar: !this.state.statusOverStar
            })
        }

    }
    //set day
    SetDay(dateOf) {

        var today = Date.now() // present 
        today = today.toString().slice(0, 10);
        dateOf = dateOf.toString().slice(0, 10);
        var secs = today - dateOf;

        var year = Math.floor(secs / (60 * 60 * 24 * 365.24));

        var divisor_month = secs % (60 * 60 * 24 * 365.24);
        var month = Math.floor(divisor_month / (60 * 60 * 24 * 30.44));

        var divisor_day = secs % (60 * 60 * 24 * 30.44);
        var day = Math.floor(divisor_day / (60 * 60 * 24));

        var divisor_hours = secs % (60 * 60 * 24);
        var hours = Math.floor(divisor_hours / (60 * 60));
        var divisor_for_minutes = secs % (60 * 60);
        var minutes = Math.floor(divisor_for_minutes / 60);

        var divisor_for_seconds = divisor_for_minutes % 60;
        var seconds = Math.ceil(divisor_for_seconds);
        var obj = {
            "y": year,
            "mo": month,
            "d": day,
            "h": hours,
            "m": minutes,
            "s": seconds
        };
        return obj;
    }

    nodeComment = () => {
        var { data = '', keyParent = '', keyChild = '', classChild = '', dataParent = '', voteStar = '', colorStar = '' } = this.props;
        var date = this.SetDay(data.date)
        if (voteStar !== '') {
            colorStar = 'colorStar'
        }
        var profile = JSON.parse(localStorage.getItem('tokenProfileCustomer')) ? JSON.parse(localStorage.getItem('tokenProfileCustomer')) : '';

        return (
            <Fragment>

                <div

                    className={'node-comment-parent ' + classChild}>

                    <div className="msg-all-cont">
                        <ul id='ul-comment' className="reset-c">
                            <li id="i-s-" className="t-h">
                                <div id="icon-h" className="reset-c">
                                    {/* <i className="fas fa-user fa-user-s" /> */}
                                    <img src={data.image} className='img-comment' alt='' />
                                </div>
                            </li>
                            <li id="-is-" className="t-h">
                                <div id="msg-h" className="reset-c">
                                    <div>
                                        <p id="msg-head" className="reset-c">{data.name}
                                            <span className="date text-black-50" title={data.dateTime}>
                                                {
                                                    date.y !== 0 ? date.y + t("year-ago")
                                                        : date.mo !== 0 ? date.mo + t(" month-ago")
                                                            : date.d !== 0 ? date.d + t("day-ago")
                                                                : date.h !== 0 ? date.h + t("hours-ago")
                                                                    : date.m !== 0 ? date.m + t("minutes-ago")
                                                                        : date.s !== 0 ? date.s + t("seconds-ago")
                                                                            : ''

                                                }
                                            </span>
                                        </p>

                                    </div>
                                    <p id="msg-txt" className="reset-c">
                                        <ReadMore
                                            text={
                                                data.message
                                            }
                                            length={200}
                                            color={'#c2ff08'}
                                        />
                                    </p>

                                </div>
                            </li>
                            <li className="t-h">

                                <div id="other-h" className="reset-c">
                                    {
                                        profile.email === data.email &&
                                        < i onClick={() => this.deleteComment(keyChild, data)}
                                            title={t("delete")}
                                            className="fa mb delete-comment fa-trash-o" aria-hidden="true"
                                        />

                                    }

                                    <i className={"fa mb fa-thumbs-up " + this.state.blueLiked} aria-hidden="true"
                                        onClick={() => this.liked()}
                                        title={t("liked-this-comment")}
                                    />
                                    <span className='point-like'></span>
                                    <span className='liked'>
                                        {
                                            this.state.isLiked && t("liked")
                                        }
                                    </span>
                                    {/* <i className="fas fa-heart fa-heart-s mb" title={t("liked-this-comment")} /> */}
                                    <i

                                        onClick={() => this.voteStar(voteStar)}
                                        title={t("rating-vote") + voteStar + '*'}
                                        className={"fas fa-star mb fa-star-s " + colorStar} >
                                    </i>

                                    {
                                        this.state.statusOverStar
                                            ? (<div className='vote-star '><RatingStar /></div>)
                                            : (<span className='point-star '> {voteStar} </span>)
                                    }

                                    <i onClick={() => this.replyComment()} className="fa fa-reply" aria-hidden="true" title={t("reply-comment")} />
                                    {/* <i className="fas fa-ellipsis-v mb fa-ellipsis-v-s" /> */}
                                </div>
                            </li>
                        </ul>

                    </div>
                </div>
                {
                    this.state.replyStatus &&
                    (<Comment
                        replyKeyParent={keyParent}
                        replyEmail={data.email}
                        replyName={data.name}
                        replyDate={dataParent ? dataParent.date : data.date}
                        replyStatus={this.state.replyStatus}

                    />)

                }

            </Fragment>
        )




    }

    render() {

        return (
            <Fragment >
                {this.nodeComment()}

            </Fragment>

        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        // commentStatus: state.commentStatus,
        closeComment: state.closeComment,
        iconEmoji: state.iconEmoji,
        languageValue: state.languageValue,

    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {

        CLOSE_COMMENT: (act_status_close) => {
            dispatch({ type: 'close_comment', act_status_close })
        },

        statusUpdateDataComment: (act_status_dataComment) => {
            dispatch({ type: 'statusUpdateComment', act_status_dataComment })
        },
        dataUpdateDataCommentChild: (act_dataCommentUpdateChild) => {
            dispatch({ type: 'act_dataCommentUpdateChild', act_dataCommentUpdateChild })
        },
        dataUpdateDataCommentParent: (act_dataCommentUpdateParent) => {
            dispatch({ type: 'dataUpdateCommentParent', act_dataCommentUpdateParent })
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NodeComment)
// export default NodeComment;