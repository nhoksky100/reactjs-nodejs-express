import axios from 'axios';
import React, { Component } from 'react';
import Slider from "react-slick";

const getDataImageListProduct = () => axios.get('/updateListImage').then((res) => res.data)
class ImgSingleProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nav1: null,
            nav2: null,
            listFileImage: []
        }
    }
   
    
    componentDidMount() {
        this.setState({
            nav1: this.slider1,
            nav2: this.slider2
        });
        this.dataImageProduct()
    }
    dataImageProduct =()=>{
        getDataImageListProduct().then((res) => {
            var { id } = this.props
            if (id) {
                var dataImages = res.filter((item) => item.id === id);
                this.setState({ listFileImage: dataImages[0].listFileImage })
            }
        })
    }
    componentDidUpdate(prevProps, prevState) {
        var {id}=this.props
        if(prevProps.id !==id){
            this.dataImageProduct()
        }
    }
    imageListSingle = (classNameList) => {
        var {listFileImage}=this.state
        var pushImageSingle = [];
        if (listFileImage) {
        pushImageSingle.push(<img key={0} className={classNameList} src={this.props.top_product} alt='' />)
      
            listFileImage.map((value, key) => {

                pushImageSingle.push(<img key={key + 1} className={classNameList} src={ value} alt='' />)
                return listFileImage
            })

            return pushImageSingle
        }
    }

    ImgDetailProductSlick = () => {

        return (

            <div className='row slick-img-cont'>
                <div className='img_big'>
                    <Slider
                        asNavFor={this.state.nav2}
                        ref={slider => (this.slider1 = slider)}

                    >
                        {this.imageListSingle('img-big')}
                    </Slider>
                </div>

                <div className='row' id='thumb'>

                    <div className='thumb-img'>
                        <Slider
                            asNavFor={this.state.nav1}
                            ref={slider => (this.slider2 = slider)}
                            slidesToShow={3}
                            swipeToSlide={true}
                            focusOnSelect={true}
                        >

                            {this.imageListSingle('img-thumb')}

                        </Slider>


                        {/* <button type="button" data-role="none" className="slick-arrow slick-next next" style={{ display: 'block' }}> Next</button> */}
                    </div>
                </div>
            </div>
        )
    }
    render() {
        return (
            <div>
                {this.ImgDetailProductSlick()}
            </div>
        );
    }
}

export default ImgSingleProduct;