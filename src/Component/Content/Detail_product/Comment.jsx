import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UpdateDateTime } from '../../UpdateDateTime';
// import PickerEmoji from './PickerEmoji';
import { t } from 'i18next';
import { toast } from 'react-toastify';
import EmojiPicker from 'emoji-picker-react';
import { randomId } from '../../adminManager/RandomId/randomId';
// import DocumentTitle from 'react-document-title';
// const typingtimeoutRef = createRef(null);

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            statusEmoji: false,
            keyArea: '',
            countCommnet: 0,
            iconEmoji: '',
            emoji: ''
        }
    }


    isChange = (event) => {
        // if (typingtimeoutRef.current) {
        //     clearTimeout(typingtimeoutRef.current)
        // }
        // typingtimeoutRef.current = setTimeout(() => {
        var name = event.target.name;
        var value = event.target.value;

        this.setState({
            [name]: value,


        })
        // console.log('message:', value);

        // }, 300);
    }
    keyUp = (e) => {
        if (e.keyCode === 13) {
            return this.postComment();
        }
    }
    componentDidUpdate(prevProps, prevState) {
        var { message, emoji } = this.state
        if (prevState.emoji !== emoji) {
            var updateComment = message + emoji
            this.setState({ message: updateComment })
        }
    }

    // emoji on off
    statusEmoji = () => {


        this.setState({
            statusEmoji: !this.state.statusEmoji,
            emoji: ''
        })

    }

    postComment = () => {
        var idProduct = sessionStorage.getItem('ID_details_product');
        var profile = JSON.parse(localStorage.getItem('tokenProfileCustomer'));
        if (profile) {
            var { replyStatus } = this.props;

            var { message, emoji } = this.state;
            var idComment = randomId()
            this.refs.message.value = '';
            var dateTime = UpdateDateTime();
            if (message && !replyStatus) {
                message = emoji !== undefined && emoji !== '' ? message + emoji : message

                axios.post('/nodeCommentParent', { idComment, idProduct, profile, message, dateTime })
                .then((res) => {
                    
                    this.props.COMMENT(res.data)
                    this.props.COMMENT_STATUS(true)
                })

            }
            else if (replyStatus && message) {
                var { replyKeyParent, replyEmail, replyName, replyDate } = this.props; // reply | children
                message = emoji !== undefined && emoji !== '' ? message + emoji : message
                message = replyName + " " + message
                axios.post('/nodeCommentChild', { idComment, idProduct, profile, message, dateTime, replyKeyParent, replyStatus, replyEmail, replyName, replyDate })
                .then((res) => {
                    this.props.COMMENTCHILD(res.data)
                    this.props.COMMENTCHILD_STATUS(true)
                })
                this.props.CLOSE_COMMENT(true);

            }
            // this.props.statusUpdateDataComment(true)
            this.setState({ message: '' })
        } else {

            toast(<div className="advertise"><i className="fa fa-exclamation-triangle" aria-hidden="true" />
                <i> {t("login-to-comment")}</i></div>)

        }
    }
    onEmojiClick = (emojiObject) => {
        this.setState({ emoji: emojiObject.emoji })

    };
    formComment = () => {

        return (
            <div className="post-center">
                <div className="post-comment">

                    <textarea required onChange={(event) => this.isChange(event)} id={'text-area'} name="message" ref='message' placeholder={t("a-message") + "..."}
                        onKeyUp={(e) => this.keyUp(e)}
                        value={
                            this.state.message
                        }
                    />
                    {

                        <div className="emoji" onClick={() => this.statusEmoji()}>
                            <span id='icon-emoji'

                            >🙂</span>

                            {
                                this.state.statusEmoji &&
                                (
                                    <div id="emoji-picker">
                                        <EmojiPicker
                                            onEmojiClick={this.onEmojiClick} disableAutoFocus={true} native
                                            skinTonesDisabled={true} width={250} height={400} theme='dark' emojiStyle={'native'} lazyLoadEmojis={true}

                                        />
                                    </div>
                                )
                            }
                        </div>
                    }

                </div>
                <button onClick={() => this.postComment()} className="btn btn-primary btn-comment" type="reset">{t("a-comment")}</button>
            </div>
        )
    }
    render() {

        return (
            this.formComment()
        );
    }
}



const mapStateToProps = (state, ownProps) => {
    return {
        // iconEmoji: state.iconEmoji,
        languageValue: state.languageValue,
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        COMMENT: (act_comment) => {
            dispatch({ type: 'comment', act_comment })
        },
        COMMENT_STATUS: (act_status_comment) => {
            dispatch({ type: 'comment_status', act_status_comment })
        },
        COMMENTCHILD: (act_comment_child) => {
            dispatch({ type: 'commentchild', act_comment_child })
        },
        COMMENTCHILD_STATUS: (act_status_comment_child) => {
            dispatch({ type: 'commentchild_status', act_status_comment_child })
        },
        CLOSE_COMMENT: (act_status_close) => {
            dispatch({ type: 'close_comment', act_status_close })
        },
        statusUpdateDataComment: (act_status_dataComment) => {
            dispatch({ type: 'statusUpdateComment', act_status_dataComment })
        },

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Comment)
