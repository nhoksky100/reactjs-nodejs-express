import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import { connect } from 'react-redux';
import { t } from 'i18next';
// import ViewTop from './ViewTop';

const getSlideList = () => axios.get('/getdata_slide').then((res) => res.data)
const settings = {

    dots: false,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                initialSlide: 1
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]

};
class HeaderSlide extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSlide: null

        }
    }
    componentDidMount() {
        if (this.state.dataSlide === null) {
            getSlideList().then((res) => {
                if (res) {
                    this.setState({ dataSlide: res })
                }
            })
        }
    }
    showSlice = () => {
        if (this.state.dataSlide !== null) {
            return this.state.dataSlide.map((value, key) => {
                return (
                    <div className="col-sm-4 col-md-3 product" key={key}>

                        <div className="body">
                            <div className="content">

                                {value.image_slide !== '' &&
                                    <img src={value.image_slide} alt="Background" className="background " />
                                }
                                {/* {value.image_slide.indexOf('data:image') !== -1 */}
                                {/* <img src={value.image_slide} alt="Background" className="background visible-sm" /> */}
                                {/* <img src={value.image_slide} alt="Background" className="background visible-xs" /> */}

                                <div className="outside-content">
                                    <div className="inside-content">
                                        <div className="container align-right">


                                            <hr className="offset-md" />
                                            <NavLink to={"./store/" + value.category} rel="nofollow" className="btn btn-primary btn-lg black">
                                                {t(value.category.toLowerCase())}
                                            </NavLink>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                )
                // image_s.push(value.image_slide)
            })
        }


    }
    render() {
        var image_s = [];
        if (this.state.dataSlide !== null) {
            this.state.dataSlide.map((value) => {
                image_s.push(value.image_slide)
                return this.state.dataSlide
            })
        }

        return (
            <div className='container slid'>
                <div className='row'>

                    <div className='slide'>
                        <div className="items">

                            <div className="product-active">
                                <Slider {...settings}>
                                    {this.showSlice()}
                                </Slider>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-4 banner_slider text-center pt-xs-30"></div>
                </div>
            </div>


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

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(HeaderSlide)
