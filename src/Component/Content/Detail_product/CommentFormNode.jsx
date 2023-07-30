import React, { Component, Fragment } from 'react';

import axios from 'axios';
import CommentNode from './CommentNode.jsx';
import Comment from './Comment.jsx';
import { connect } from 'react-redux';
// import LoginFacebook from '../../Header/HeaderTop/Account_customer/LoginFacebook.jsx';
// import LoginGoogle from '../../Header/HeaderTop/Account_customer/LoginGoogle.jsx';
import { t } from 'i18next';
import Pagination from 'react-js-pagination';

// import { toast } from 'react-toastify';

const dataRatingVote = () => axios.get('/checkvote').then((res) => res.data)


const dataNodeComment = () => axios.get('/nodeCommentParent').then((res) => res.data)
const dataNodeCommentChild = () => axios.get('/nodeCommentChild').then((res) => res.data)
// const typingtimeoutRef = createRef(null);

class CommentFormNode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataNode: '',
            dataNodeComment: [],
            dataNodeCommentChild: [],
            message: '',
            commentCount: '',
            //vote rating
            dataVote: [],
            //more item
            itemShow: 3,
            itemShowChild: 3,
            statusMore: false,
            CountCommentChildMore: 3,

            statusMoreChild: false,
            statusCommentMoreFull: false,
            statusCommentMoreChild: false,
            loading: '',
            // id token cus
            tokenId: '',

            // pagination
            activePage: 15,
            currentPage: 1,
            newsPerPage: 5,
        }

    }
    componentDidMount() {
        var tokenId = localStorage.getItem('tokenIdCustomer');
        // dataComment
        this.dataChild();
        this.dataParent();
        // vote rating
        this.dataVote()

        this.setState({
            tokenId: tokenId,
        })

    }
    dataChild = () => {
        setTimeout(() => {
            var { idProduct } = this.props;


            var pushData = []
            dataNodeCommentChild().then((res) => {
                if (res) {
                    res.map((value) => {

                        if (idProduct === value.idProduct) {
                            pushData.push(value)
                        }
                        return res
                    })
                    this.setState({ dataNodeCommentChild: pushData })
                }
            })
        }, 1000);
    }
    dataParent = () => {
        setTimeout(() => {
            var { idProduct } = this.props;
            var pushData = []
            dataNodeComment().then((res) => {
                if (res) {
                    res.map((value) => {
                        if (idProduct === value.idProduct) {
                            pushData.push(value)
                        }
                        return res
                    })

                    this.setState({ dataNodeComment: pushData, })
                }
            })
        }, 1000);

    }
    componentDidUpdate(prevProps, prevState) {
        var { isUpdateDataComment, commentStatus, comment,
            commentStatusChild, commentChild, idProduct } = this.props;
        if (isUpdateDataComment) {
            this.dataChild()
            this.dataParent()
            this.props.statusUpdateDataComment(false)

        }
        if (commentStatus) {
            var pusdataParent = []
            for (let i = 0; i < comment.length; i++) {
                if (idProduct === comment[i].idProduct) {
                    pusdataParent.push(comment[i])
                }

            }
            this.setState({ dataNodeComment: pusdataParent })
            this.props.COMMENT_STATUS(false)
        } else if (commentStatusChild) {
            var pusdataChild = []
            for (let i = 0; i < commentChild.length; i++) {
                if (idProduct === commentChild[i].idProduct) {
                    pusdataChild.push(commentChild[i])
                }

            }
            this.setState({ dataNodeCommentChild: pusdataChild })
            this.props.COMMENTCHILD_STATUS(false)
        }

    }

    dataVote = () => {
        dataRatingVote().then((res) => {
            this.setState(prevState => ({ dataVote: res }))

        })
    }


    handlePageChange(currentPage) {
        this.setState({
            currentPage: currentPage,
        });
    }
    //set pagination
    currentTodos = (dataNodeComment) => {
        var { currentPage, newsPerPage } = this.state; // trang hiện tại acti  //cho trang tin tức mỗi trang
        var indexOfLastNews = currentPage * newsPerPage; // lấy vị trí cuối cùng của trang ,của data
        var indexOfFirstNews = indexOfLastNews - newsPerPage; // lấy vị trí đầu tiên  của trang ,của data
        return dataNodeComment.slice(indexOfFirstNews, indexOfLastNews); // lấy dữ liệu ban đầu và cuối gán cho các list
    }

    //show comment more
    showMoreComment = (e) => {

        this.setState({ loading: '...', statusMore: false })
        setTimeout(() => {
            var item = this.state.itemShow += 3
            this.setState({
                itemShow: item,
                statusMore: true,

            })
        }, 2000);


    }
    //show comment child more
    showMoreCommentChild = () => {

        this.setState({ loading: '...', statusMoreChild: false })
        setTimeout(() => {

            this.setState({
                CountCommentChildMore: this.state.CountCommentChildMore + 3,
                statusMoreChild: true,

            })
        }, 2000);

    }

    nodeComment = () => {
        // props 
        var { idProduct } = this.props;
        var { dataNodeComment, dataNodeCommentChild, dataVote, } = this.state;



        var pushDataComment = [];
        var countComment = 0;
        var voteStar = '';
        // var ShowComment = 0;
        var pushDataMore = [];
        // var pushDataChild = [];
        if (dataNodeComment.length !== 0) {

            dataNodeComment = this.currentTodos(dataNodeComment)
            dataNodeComment.map((value, key) => {
                sessionStorage.setItem('countComment', countComment++)
                dataVote.map((valueVote) => {
                    //vote
                    for (let i = 0; i < valueVote.idProduct.length; i++) {

                        if (valueVote.idProduct[i] === idProduct) {
                            if (valueVote.email === value.email) {
                                voteStar = valueVote.selectStar[i]

                            }
                        }

                    }
                    return dataVote
                })
                pushDataComment.push(
                    <div key={key}>
                        <CommentNode
                            idProduct={idProduct}
                            data={value}
                            keyParent={key}
                            voteStar={voteStar}
                            dataNodeComment={dataNodeComment}

                        />
                    </div>
                )

                // child
                if (dataNodeCommentChild.length !== 0) {
                    // var { commentChildMore } = this.props;
                    var { CountCommentChildMore } = this.state;
                    var FirstCount = 0;

                    dataNodeCommentChild.map((valueChild, keyChild) => {
                        // console.log('childParent',valueChild.idProduct );
                        if (valueChild.idProduct === idProduct) {

                            dataVote.map((valueVote) => {
                                for (let i = 0; i < valueVote.idProduct.length; i++) {

                                    if (valueVote.idProduct[i] === idProduct) {
                                        if (valueVote.email === valueChild.email) {
                                            voteStar = valueVote.selectStar[i]

                                        }
                                    }

                                }
                                return dataVote
                            })
                            if (valueChild.replyDate === value.date) {
                                FirstCount++;
                                sessionStorage.setItem('countComment', countComment++)
                                if (FirstCount <= CountCommentChildMore) {
                                    pushDataComment.push(
                                        <div key={keyChild + 'child'}>


                                            <CommentNode
                                                idProduct={idProduct}
                                                keyChild={valueChild.replyDate}
                                                classChild={'reply-child'}
                                                data={valueChild}
                                                keyParent={key}
                                                dataParent={value}
                                                voteStar={voteStar}
                                                dataNodeCommentChild={dataNodeCommentChild}

                                            />

                                            {FirstCount === CountCommentChildMore

                                                ? (
                                                    <button className="custom-btn btn-more" style={{ width: '20%', marginLeft: '24%' }}
                                                        onClick={(e) => this.showMoreCommentChild(e)}>
                                                        {t("see-more")} {!this.state.statusMoreChild ? this.state.loading : ''}
                                                    </button>
                                                ) : ''
                                            }
                                        </div>
                                    )


                                }
                            }


                        } //end if
                        return dataNodeCommentChild
                    })
                } //end if

                return dataNodeComment

            })
        }


        return pushDataComment;
    }
    render() {
        return (
            <Fragment >



                <Comment />
                <div>
                    {/*                     
                    {<div id='comment-count'>
                        <span>
                           {sessionStorage.getItem('countComment')}
                        </span> {t("a-comment")}</div>
                    } */}
                    {this.nodeComment()}
                    {this.state.dataNodeComment.length !== 0 &&
                        < div style={{ float: 'left' }} className="pagination">

                            <Pagination
                                activePage={this.state.currentPage}
                                itemsCountPerPage={this.state.newsPerPage}
                                totalItemsCount={this.state.dataNodeComment.length}
                                pageRangeDisplayed={5} // show page
                                // firstPageText ={'Đầu'}
                                onChange={this.handlePageChange.bind(this)}

                            />

                        </div>
                    }
                </div>
            </Fragment >
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        // iconEmoji: state.iconEmoji,
        comment: state.comment,
        commentStatus: state.commentStatus,
        commentChild: state.commentChild,
        commentStatusChild: state.commentStatusChild,
        commentChildMore: state.commentChildMore,
        languageValue: state.languageValue,
        isUpdateDataComment: state.isUpdateDataComment,
        // dataUpdateCommentChild:state.dataUpdateCommentChild,
        // dataUpdateCommentParent:state.dataUpdateCommentParent
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        statusUpdateDataComment: (act_status_dataComment) => {
            dispatch({ type: 'statusUpdateComment', act_status_dataComment })
        },
        COMMENT_STATUS: (act_status_comment) => {
            dispatch({ type: 'comment_status', act_status_comment })
        },
        COMMENTCHILD_STATUS: (act_status_comment_child) => {
            dispatch({ type: 'commentchild_status', act_status_comment_child })
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CommentFormNode)
