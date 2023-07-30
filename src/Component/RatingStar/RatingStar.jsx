import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { t } from 'i18next';

const DataRating = () => axios.get('/getrating').then((res) => res.data)
const CheckVote = () => axios.get('/checkvote').then((res) => res.data)
// const getDataAccountCustomer = () => axios.get('/account_customer').then((res) => res.data)

const Stars = ({ starId, marked }) => {
    return (
        <span 
            star-id={starId}
            role="button"
            style={{ color: "#ff9933", cursor: "pointer",fontSize:'22px' }}
        >
            {marked ? "\u2605" : "\u2606"}
        </span>
    );
};

class RatingStar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataRating: null,
            Id: null,
            rating: 0,
            selectStar: 0,
            pushPoint: '',
            pointsStar: '',
            key: 0,
            //customer
            dataCustomer: null,
            dataCheckVote: '',
            
            email: '',

        }
    }
    componentDidMount() {
        var Id = sessionStorage.getItem('ID_details_product');
        // var IdCustomer = sessionStorage.getItem('ID_customer');
      
        var profile = JSON.parse (localStorage.getItem('tokenProfileCustomer'))
        DataRating().then((res) => {
            var dataFil = res.filter((item_edit) => item_edit.ID === Id);
            this.setState({
                dataRating: dataFil,
                Id: Id
            })
        })
        CheckVote().then((res) => {
            this.setState({
                dataCheckVote: res,
               
                email: profile.email,

            })
        })


    }




    hoverOver = event => {
        let starId = 0;
        if (event && event.target && event.target.getAttribute("star-id")) {
            starId = event.target.getAttribute("star-id");
        }
        this.setState({ selectStar: starId });
    };

    PointStar = (selectStar, pointsStar) => {


        switch (selectStar) {
            case '5':
                pointsStar[0] += 1;
                return;
            case '4':
                pointsStar[1] += 1;
                return;
            case '3':
                pointsStar[2] += 1;
                return;
            case '2':
                pointsStar[3] += 1;
                return;
            case '1':
                pointsStar[4] += 1;
                return;

            default:
                return;
        }
    }
    setRating = () => {
        var { email, dataCheckVote, selectStar = '' } = this.state;
        // var checkvote = new Array, status_vote = false;
        var idProduct = sessionStorage.getItem('ID_details_product');
        var statusVote = false;
        if (dataCheckVote) {
            dataCheckVote.map((value, key) => {
                // console.log(value);

                if (value.email === email) {
                    for (let i = 0; i < value.idProduct.length; i++) {
                        if (value.idProduct[i] === idProduct) {
                            toast(<div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" />
                                <i>{t("this-product-has-been-vote")}!</i></div>)
                            statusVote = true;

                        }

                    }

                }
                return dataCheckVote
            })
        }

        if (!statusVote) {
            axios.post('/checkvote', { email, idProduct, selectStar })
            // //rating star
            var { Id, pointsStar, dataRating } = this.state;
            //update

            var pushPoint = '';

            if (dataRating) {
                dataRating.map((value) => {
                    pushPoint = value.points_star;
                    return dataRating
                })
            }

            pushPoint = pushPoint.split(',') // chuuyển value thành 1 mảng

            var times_point_all = 0, point = 0;
            // điểm 5 4 3 2 1 / sao
            var countPoint = 5, pointtemp = [0, 0, 0, 0, 0, 0];

            for (let i = 0; i < pushPoint.length; i++) {
                times_point_all += parseInt(pushPoint[i]); // số lần đánh giá
                point += countPoint * parseInt(pushPoint[i]);
                pointtemp[i] = parseInt(pushPoint[i]);
                countPoint--;

            }

            point += parseInt(selectStar)
            point /= times_point_all + 1;

            this.PointStar(selectStar, pointtemp)
            pointsStar = pointtemp.toString();

            selectStar = point.toFixed(2);
            axios.post('/update_rating_star', {
                Id, selectStar, pointsStar
            }).then(resp => {
                this.setState({
                    points_star: ''
                })
                toast(<div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" />
                    <i>{t("submitted-a-review")}!</i></div>)


            })

            this.setState({
                rating: this.state.selectStar,
            })
            this.props.UpdateStarStatus(true)
        } //end if
       
    }


    render() {

        return (
            <div key={1}
                onMouseOver={this.hoverOver}
                onMouseOut={() => this.hoverOver(null)}
                onClick={event => this.setRating(event.target.getAttribute("star-id"))}

            >

                {
                    Array.from({ length: 5 }, (v, i) => (
                        <Stars key={i+1} starId={i + 1} marked={this.state.selectStar ? this.state.selectStar > i : this.state.rating > i} />
                    ))
                }
            </div >
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        languageValue: state.languageValue,
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        UpdateStarStatus: (act_status_star) => {
            dispatch({ type: 'star_status', act_status_star })
        }

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(RatingStar)
