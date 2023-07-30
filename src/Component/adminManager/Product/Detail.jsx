import React, { Component } from 'react';
import axios from 'axios';
import { FormatNumber } from '../../FormatNumber';
import { Fragment } from 'react';
import html from 'react-inner-html'; // cover read more content

import ReactReadMoreReadLess from "react-read-more-read-less"; // read more title
import ReadMore from '../../ReadMore/ReadMore'; // read more describe
import ReadMoreContent from '../../ReadMore/ReadMoreContent'; // read more describe

import FormtitleArea from '../titleAreaFrom/FormtitleArea';

const showAllProduct = () => axios.get('/getdata_product').then((res) => res.data)
class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProduct: null,
            length: 20,
            //isSizePrice
            indexPrice: 0,
           
            index: 0,
            isCapacity: null

        }
    }

    componentDidMount() {

        if (this.state.dataProduct === null) {
            showAllProduct().then((res) => {
                this.setState({ dataProduct: res })
            })

        }

    }
    // productSizes  option
    optionProductSize = (productSizes) => {
        var { indexPrice, isCapacity } = this.state
        if (productSizes !== undefined && productSizes !== 0 && productSizes !== null) {
            var pushSize = []
            productSizes = productSizes.split('#')

            for (let i = 0; i < productSizes.length; i++) {
                pushSize.push(
                    <option
                        style={{ textAlign: 'center' }}
                        value={i} key={i} title={productSizes[i]} >
                        {
                            !isCapacity ? productSizes[i] :
                                isCapacity ? productSizes[indexPrice] :
                                    productSizes[i]
                        }

                    </option>
                    // <option style={{ textAlign: 'center' }} value={i} key={i} title={productSizes} >{productSizes[i]}</option>
                )

            }
        }
      
        return pushSize
    }
    optionProductStorageCapacity = (productStorageCapacity) => {
        var { indexPrice, isCapacity } = this.state
        if (productStorageCapacity !== undefined && productStorageCapacity !== 0 && productStorageCapacity !== null) {
            var pushProductStorageCapacity = []
            productStorageCapacity = productStorageCapacity.split('#')

            for (let i = 0; i < productStorageCapacity.length; i++) {
                pushProductStorageCapacity.push(
                    <option
                        style={{ textAlign: 'center' }}
                        value={i} key={i} title={productStorageCapacity[i]} >
                        {
                            isCapacity ? productStorageCapacity[i] :
                                !isCapacity ? productStorageCapacity[indexPrice] :
                                    productStorageCapacity[i]
                        }
                    </option>
                    // <option style={{ textAlign: 'center' }} value={i} key={i} title={productStorageCapacity} >{productStorageCapacity[i]}</option>
                )

            }
        }
        return pushProductStorageCapacity
    }
    isChangeSizePrice = (e) => {
        var value = e.target.value;
        var name = e.target.name;

        if (name = 'productPrices') {
            this.setState({
                indexPrice: parseInt(value)
            })
        }
        if (name === 'productStorageCapacity') {
            this.setState({
                isCapacity: true,
                indexPrice: parseInt(value)
            })
        }
        else if (name === 'productSizes') {
            this.setState({
                isCapacity: false,
                indexPrice: parseInt(value)
            })
        }

    }
    Content = (content) => <div {...html(content)}></div>;
    showDetailProduct = () => {

        var regex = /(<([^>]+)>)/gi;
        // const result = longText.replace(regex, "");

        var detailId = [];
        var id = sessionStorage.getItem('ID_product');
        // id = parseInt(id);
        if (this.state.dataProduct !== null) {
            detailId = this.state.dataProduct.filter((itemDetail) => itemDetail.id === id);

        }


        if (detailId !== null) {
            return detailId.map((value, key) => {
                return (
                    <Fragment key={key}>
                        <tr className="row_9">

                            <td className="textC">{value.id}</td>
                            <td className="textR" style={{ width: '160px', textAlign: 'center' }}>
                                <div className="image_thumb">
                                    <img src={value.productImage} height={50} alt='' />
                                    <div className="clear" />
                                </div>
                                <span className="tipS" title={value.productName} target="_blank">
                                    <b >{value.productName}</b>
                                </span>
                                <div className="f11">
                                    Đã bán: 0					  | Xem: 					</div>
                            </td>
                            <td className="textR">

                                <ReactReadMoreReadLess
                                    charLimit={100}
                                    readMoreText={"Xem thêm ▼"}
                                    readLessText={"Thu gọn ▲"}
                                    readMoreClassName="read-more-less--more"
                                    readLessClassName="read-more-less--less"

                                >
                                    {value.productTitle.replace(regex, "")}
                                </ReactReadMoreReadLess>

                            </td>

                            <td className="textC">{FormatNumber(value.productComplatePrice.split(",")[this.state.indexPrice])} ₫</td>
                            <td className="textC">
                                {
                                    value.productReducedPrice.split(",")[this.state.indexPrice] !== '0' && value.productReducedPrice.split(",")[this.state.indexPrice] !== ''
                                        ? <span className="textC"><span style={{ textDecoration: 'line-through' }} className="old-price">
                                            {FormatNumber(value.productPrice.split(",")[this.state.indexPrice])} ₫</span>
                                        </span>

                                        : <span className="textC">0</span>
                                }
                                {
                                    value.productReducedPrice.split(",")[this.state.indexPrice] !== '0' && value.productReducedPrice.split(",")[this.state.indexPrice] !== ''
                                        ? <span style={{ display: 'block' }} className="discount-percentage">{'-' + value.productReducedPrice.split(",")[this.state.indexPrice] + '%'}</span>
                                        : null
                                }
                            </td>

                            <td className="textC">{value.productCategory}</td>

                            <td className="textC">{value.productGuarantee}</td>
                            <td className="textC">{value.colors}</td>
                            <td className="textC">
                                <select
                                    onMouseOut={() => this.setState({ isCapacity: false })} onClick={() => this.setState({ isCapacity: false })}
                                    style={{ width: 'auto', border: 'none', background: 'none' }}
                                    onChange={(e) => this.isChangeSizePrice(e)}
                                    
                                    defaultValue={value.productSizes.split("#")[0]} name='productSizes' >
                                        
                                    {this.optionProductSize(value.productSizes)}
                                </select>
                                {/* {value.productSizes} */}
                            </td>
                            <td className="textC">
                                <select
                                    onMouseOut={() => this.setState({ isCapacity: true })} onClick={() => this.setState({ isCapacity: true })}
                                    style={{ width: 'auto', border: 'none', background: 'none' }}
                                    onChange={(e) => this.isChangeSizePrice(e)}
                                    defaultValue={value.productStorageCapacity.split("#")[0]} name='productStorageCapacity' >
                                    {this.optionProductStorageCapacity(value.productStorageCapacity)}
                                </select>
                                {/* {value.productSizes} */}
                            </td>


                        </tr>

                        <tr >
                            <td colSpan={10} style={{ textAlign: 'center', fontWeight: 'bold' }}>
                                Mô tả
                            </td>
                        </tr>
                        <tr>
                            <td id='td-box-orient-describe' colSpan={10} className="textC orient-describe" style={{ textAlign: 'center' }}>
                                <ReadMore
                                    text={value.productDescribe}
                                    length={5500}
                                    color={'#45b7f9'}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td colSpan={10} style={{ textAlign: 'center', fontWeight: 'bold' }}>
                                Nội dung
                            </td>
                        </tr>
                        <tr>
                            <td id='td-box-orient-content' colSpan={10} style={{ textAlign: 'center' }} className="textC orient-content">

                                {this.Content(value.productContent)}
                            </td>
                        </tr>


                    </Fragment>
                )
            })
        }
    }

    render() {
        return (
            <div id="rightSide">

                <FormtitleArea
                    managerTitle={'Sản phẩm'}
                    managerName={'Chi tiết sản phẩm'}
                    urlAdd={'/admin/add-product.html'}
                    imageAdd={'images/icons/control/16/add.png'}
                    urlRating={'/admin/rating-product.html'}
                    imageRating={'./images/icons/control/16/feature.png'}
                    urlList={'/admin/product.html'}
                    imageList={'./images/icons/control/16/list.png'}
                />
                <div className="line" />
                {/* Message */}
                {/* Main content wrapper */}
                <div className="wrapper" id="main_product">
                    <div className="widget">

                        <table cellPadding={0} cellSpacing={0} width="100%" className="sTable mTable myTable" id="checkAll">

                            <thead>
                                <tr>

                                    <td style={{ width: '60px' }}>Mã số</td>
                                    <td>Tên</td>
                                    <td>Tiêu đề</td>
                                    <td>Giá hiện thực</td>
                                    <td>Giá ban đầu/giảm(%)</td>
                                    <td>Mã thể loại</td>
                                    <td>bảo hành/tháng</td>
                                    <td style={{ width: '120px' }}>Màu loại</td>
                                    <td>Kích Thước</td>
                                    <td>Dung lượng</td>

                                </tr>
                            </thead>


                            <tbody className="list_item">
                                {this.showDetailProduct()}

                            </tbody>
                        </table>
                    </div>
                </div>		<div className="clear mt30" />

            </div>

        );
    }
}


export default Detail