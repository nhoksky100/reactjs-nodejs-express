import React, { Component } from 'react';
import axios from 'axios';
import html from 'react-inner-html';
import ShowStar from '../../RatingStar/ShowStar';
import { connect } from 'react-redux';
import CommentFormNode from './CommentFormNode';
import LoginFacebook from '../../Header/HeaderTop/Account_customer/LoginFacebook';
import LoginGoogle from '../../Header/HeaderTop/Account_customer/LoginGoogle';

import RatingStar from '../../RatingStar/RatingStar';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import ReadMore from '../../ReadMore/ReadMore'; // read more text
import { t } from 'i18next';



const getDataProduct = () => axios.get('/getdata_product_rating').then((res) => res.data)

class ProductTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataTab: null,

            prizeStatus: false,
            ratingStar: 0,
            pointsStar: [],
            IdDetailsProduct: null,
            //star status
            starStatus: false,
            //comment
            statusComment: false,
            // emoji
            emoji: '', statusEmoji: false,
            chosenEmoji: '1f60a',
            // readmore content
            isRadMoreContent: false,
            isStar: true,

        }
    }

    componentDidMount() {
        var { ID } = this.props;

        this.dataProduct(ID)

    }
    dataProduct = (ID) => {

        var dataFil = [];
        var pushPointsStar = '';
        getDataProduct().then((res) => {
            if (res) {
                dataFil = res.filter((item) => item.ID === ID);
                dataFil.map((value) => {
                    pushPointsStar = value.points_star;
                    return dataFil
                })
                if (pushPointsStar) {

                    pushPointsStar = pushPointsStar.split(',')
                    this.setState({
                        dataTab: dataFil,
                        pointsStar: pushPointsStar,
                        IdDetailsProduct: ID

                    })
                }
            }

        })

    }
    componentDidUpdate(prevProps, prevState) {
        var idLocalUpdate = sessionStorage.getItem('ID_details_product');

        if (prevState.IdDetailsProduct !== idLocalUpdate) {

            this.dataProduct(idLocalUpdate);
            this.setState({ IdDetailsProduct: idLocalUpdate })

        }
    }

    // onEmojiClick = (emojiObject) => {
    //     // console.log('emj:', emojiObject);
    //     this.setState({ chosenEmoji: emojiObject })

    // };
    Content = (content) => <div {...html(content)}></div>;
    ShowPrize = () => {
        this.setState({
            prizeStatus: !this.state.prizeStatus,
        })

    }

    setEmoji = (emoji) => {

        this.setState({ statusEmoji: !this.state.statusEmoji })
        //  emoji = <Emoji

        //     size="25" />

    }
    // read more content 
    isRadMoreContent = (isStatus) => {

        this.setState({
            isRadMoreContent: isStatus
        })
    }
    //comment
    statusComment = () => {
        this.setState({ statusComment: !this.state.statusComment })
    }
    // star form


    Show_tab = () => {

        if (this.state.dataTab !== null) {
            return this.state.dataTab.map((value, key) => {

                return (


                    <div className="tab-content" key={key}>
                        <div id="technical" className="tab-pane  show" role="tabpanel">
                            <div className="product-description">
                                <ReadMore
                                    text={value.productDescribe}
                                    length={5500}
                                    color={'#45b7f9'}
                                />
                                {/* {this.Content(value.product_describe)} */}

                            </div>
                        </div>
                        <div id="content-information" className="tab-pane" role="tabpanel">
                            <div className="product-details-manufacturer">
                                {
                                    this.state.isRadMoreContent &&
                                    this.Content(value.productContent)
                                }




                            </div>
                        </div>
                        <div id="reviews" className="tab-pane active" role="tabpanel">
                            <div className="product-reviews">
                                <div className="product-details-comment-block">
                                    {/* star */}
                                    <div className="comment-review">
                                        <span>{t("rating-level")}</span>
                                        <ShowStar star={Math.round(value.ratingStar)} />

                                        <ul className="rating">
                                            <li><i className="fa fa-star" aria-hidden="true" /></li>
                                            <li><i className="fa fa-star" aria-hidden="true" /></li>
                                            <li><i className="fa fa-star" aria-hidden="true" /></li>
                                            <li ><i className="fa fa-star" aria-hidden="true" /></li>
                                            <li ><i className="fa fa-star" aria-hidden="true" /></li>
                                            <li style={{ marginLeft: '30px' }} > <label>{t("voted")} {this.state.pointsStar[0]} {t("people")}</label> </li>
                                        </ul><br />
                                        <ul className="rating">
                                            <li><i className="fa fa-star" aria-hidden="true" /></li>
                                            <li><i className="fa fa-star" aria-hidden="true" /></li>
                                            <li><i className="fa fa-star" aria-hidden="true" /></li>
                                            <li ><i className="fa fa-star" aria-hidden="true" /></li>
                                            <li style={{ marginLeft: '35px' }} > <label>{t("voted")} {this.state.pointsStar[1]} {t("people")}</label> </li>

                                        </ul><br />
                                        <ul className="rating">
                                            <li><i className="fa fa-star" aria-hidden="true" /></li>
                                            <li><i className="fa fa-star" aria-hidden="true" /></li>
                                            <li><i className="fa fa-star" aria-hidden="true" /></li>
                                            <li style={{ marginLeft: '40px' }} > <label>{t("voted")} {this.state.pointsStar[2]} {t("people")}</label> </li>


                                        </ul><br />
                                        <ul className="rating">
                                            <li><i className="fa fa-star" aria-hidden="true" /></li>
                                            <li><i className="fa fa-star" aria-hidden="true" /></li>
                                            <li style={{ marginLeft: '50px' }} > <label>{t("voted")} {this.state.pointsStar[3]} {t("people")}</label> </li>



                                        </ul><br />
                                        <ul className="rating">
                                            <li><i className="fa fa-star" aria-hidden="true" /></li>
                                            <li style={{ marginLeft: '55px' }} > <label>{t("voted")} {this.state.pointsStar[4]} {t("people")}</label> </li>
                                        </ul>
                                    </div>

                                    {/* rating vote */}

                                    <div style={{ height: '80px', margin: '2%' }} className="review-btn">
                                        <div className='row'>


                                            {
                                                localStorage.getItem('tokenIdCustomer')
                                                    ? (<a href='#Vote' onClick={() => this.ShowPrize()} className="review-links" style={{ cursor: 'pointer' }} >

                                                        {this.state.prizeStatus ? t("close") : t("rating-vote")}
                                                    </a>
                                                    )
                                                    : (
                                                        <div className="dropdown ">
                                                            {/* <button className=" btn btn-default dropdown-toggle ht-currency-trigger" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            Login vote
                                                            <span className="caret" />
                                                        </button> */}
                                                            <ul style={{ width: '0%' }} className="dropdown-menu log" id='log' aria-labelledby="dropdownMenu3">
                                                                <li><LoginGoogle /></li>
                                                                <li><i className="fa fa-facebook" aria-hidden="true" /><LoginFacebook /></li>
                                                            </ul>
                                                        </div>
                                                    )
                                            }

                                            <div style={{ marginTop: '1%' }}>{this.state.prizeStatus ? <RatingStar /> : ''}</div>
                                        </div>
                                    </div>

                                    <CommentFormNode idProduct={this.state.IdDetailsProduct} />

                                </div>
                            </div>
                        </div>

                    </div >

                )
            })
        }

    }

    render() {
        if (!sessionStorage.getItem('ID_details_product')) {
            return <Redirect to='/' />
        }
        return (

            <div className="product-area pt-35" >

                <div className="container " >
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="li-product-tab" id='product_tab'>
                                <ul style={{ borderTop: 'none' }} className="nav li-product-menu">
                                    <li onClick={() => this.isRadMoreContent(false)} className='li_tab'>
                                        <a className="active" data-toggle="tab" href="#reviews">
                                            <span className='span-tab-detail'>{t("comment")}</span>
                                        </a>
                                    </li>
                                    <li onClick={() => this.isRadMoreContent(true)} className='li_tab'>
                                        <a data-toggle="tab" href="#content-information">
                                            <span className='span-tab-detail'>{t("information&content")}</span>
                                        </a>
                                    </li>
                                    <li onClick={() => this.isRadMoreContent(false)} className='li_tab'>
                                        <a data-toggle="tab" href="#technical">
                                            <span className='span-tab-detail'>{t("parameter")}</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>
                    {this.Show_tab()}

                </div>

            </div>

        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        iconEmoji: state.iconEmoji,
        comment: state.comment,
        commentStatus: state.commentStatus,
        commentChild: state.commentChild,
        commentStatusChild: state.commentStatusChild,
        commentChildMore: state.commentChildMore,
        starStatus: state.star_status,
        languageValue: state.languageValue,
        isUpdateDataComment: state.isUpdateDataComment
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        // UpdateStarStatus: (act_status_star) => {
        //     dispatch({ type: 'star_status', act_status_star })
        // }

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductTab)
