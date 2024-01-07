import React, { Component, Fragment, createRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';
import CKEditor from "react-ckeditor-component";
import { FormatNumber } from '../../FormatNumber.jsx';

import 'react-toastify/dist/ReactToastify.css';
import FormtitleArea from '../titleAreaFrom/FormtitleArea.jsx';


const getDataCategory = () => axios.get('/getdata_category').then((res) => res.data)
const getDataProduct = () => axios.get('/getdata_product').then((res) => res.data)
const getDataImageListProduct = () => axios.get('/updateListImage').then((res) => res.data)

class EditProduct extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: null, productName: '', productAmount: 1, productDescribe: '', productImage: '', productCategory: [],
            productReducedPrice: [], productReducedPrices: [], productContent: '', productGuarantee: '', productCategoryCode: '', productTitle: '', productKeyword: '',
            fileImage: '', file: [], listFileImage: [], flag: false, imageUrl: '',
            // select thể loại:
            checkboxStatusSelect: [], selectDataCatagory: null, selectPushCategory: [],
            // productSize
            productSize: '', productSizes: [], pushSize: [], sizeValues: [], isArrow: false,
            // color
            colors: { red: false, blue: false, black: false, pink: false, silver: false, white: false, yellow: false, green: false },
            pushColors: [], flagImageList: false, imageListTemp: [],
            //price
            productComplatePrice: [], productPriceTemp: null, productPrice: [], productPrices: [],
            // data product
            dataEdit: null,
            // true-rev-product
            prevStatus: false,
            // disabled
            disabled: [], keyPrice: null, isComplatePrice: false,
            // productStorageCapacity
            productStorageCapacity: '', productStorageCapacitys: [], index: 0,
            // data imageList
            dataImageList: []

        }
        this.typingTimeoutRef = createRef();
        this.readers = []
        this.formPrice = this.formPrice.bind(this);
    }



    componentDidMount() {

        if (this.state.selectDataCatagory === null) {
            getDataCategory().then((res) => {
                this.setState({ selectDataCatagory: res })
            })
        }
        if (this.state.dataEdit === null) {

            let getId = sessionStorage.getItem('ID_product');

            getDataProduct().then((res) => {

                let editFill = res.filter((item_edit) => item_edit.id === getId);

                this.setState({
                    productName: editFill[0].productName,
                    // productPrice: editFill[0].product_price.split(","),
                    productPrices: editFill[0].productPrice.split(","),
                    productComplatePrice: editFill[0].productComplatePrice.split(","),
                    productDescribe: editFill[0].productDescribe,
                    productImage: editFill[0].productImage,

                    productCategory: editFill[0].productCategory,
                    // productReducedPrice: editFill[0].product_reduced_price.split(","),
                    productReducedPrices: editFill[0].productReducedPrice.split(","),
                    productGuarantee: editFill[0].productGuarantee,
                    productContent: editFill[0].productContent,
                    productCategoryCode: editFill[0].productCategoryCode,
                    productTitle: editFill[0].productTitle,
                    productKeyword: editFill[0].productKeyword,
                    pushColors: editFill[0].colors,

                    pushSize: editFill[0].productSizes.split("#")
                        ? editFill[0].productSizes.split("#") : [],

                    productStorageCapacitys: editFill[0].productStorageCapacity
                        ? editFill[0].productStorageCapacity.split("#") : [],
                    dataEdit: editFill
                })
                this.setState({

                    tabCount: this.state.productComplatePrice.length
                })
                getDataImageListProduct().then((res) => {
                    let dataImages = res.filter((item) => item.id === getId);

                    this.setState({ listFileImage: dataImages[0].listFileImage })
                })

            })
        } //end if
    }

    reSetState = () => {
        this.setState({
            productName: '', productPrice: [], productComplatePrice: [], productDescribe: '', productImage: '',
            productCategory: [], productReducedPrice: [], productContent: '', productGuarantee: '', productCategoryCode: '', pushColors: [],
            colors: { red: false, blue: false, black: false, pink: false, silver: false, white: false, yellow: false, green: false },
            productTitle: '', productKeyword: '', fileImage: '', file: [], listFileImage: [], flag: false, imageUrl: '',
            productSizes: '', pushSize: [], productPrices: [], productReducedPrices: [], imageListTemp: [],
            productStorageCapacity: '', productStorageCapacitys: []

        })
    }

    //calculator price


    handleUpdateClick = () => {

        let reWhiteSpace = new RegExp("\\s+"); // white-spalce
        let { productName, productAmount, productPrice, productComplatePrice, productDescribe, productImage,
            productCategory, productStorageCapacity, productStorageCapacitys,
            productReducedPrice, productReducedPrices, productContent, productGuarantee, productCategoryCode,
            productTitle, productKeyword, pushSize, productPrices, imageListTemp, listFileImage, productSizes, colors, pushColors } = this.state;
        let flagPrice = false

        for (let i = 0; i < productComplatePrice.length; i++) {
            if (
                (isNaN(productComplatePrice[i]) || productComplatePrice[i] <= 0) ||
                isNaN(productPrices[i]) || productPrices[i] <= 0 || productPrices[i] === '' || reWhiteSpace.test(productPrices[i])) {
                flagPrice = true

            }

        }

        if (productName !== '' && productImage !== '' &&
            productCategory !== '' && (imageListTemp !== '' || listFileImage.length > 0) &&
            pushSize.length !== 0 && !flagPrice) {
            let id = sessionStorage.getItem('ID_product');


            let dateTime = new Date();
            const favColors = Object.keys(colors)
                .filter((name) => colors[name])
                .join(", ");
            if (favColors !== '') {
                pushColors = favColors;
            }



            productSizes = pushSize.join("#")
            productStorageCapacity = productStorageCapacitys.join("#")
            productPrice = productPrices.join(",")
            productReducedPrice = productReducedPrices.join(",")
            productComplatePrice = productComplatePrice.join(",")





            axios.post('/edit_product', {
                id, productName, productAmount, productPrice, productComplatePrice, productDescribe, productImage, productCategory,
                productReducedPrice, productContent, productGuarantee, productCategoryCode, productTitle, productKeyword, dateTime, pushColors, productSizes,
                productStorageCapacity
            }).then(resp => {

                if (resp.data.status) {
                    //    true edit file
                    axios.post('/updateListImage', { id, listFileImage })
                    toast(<div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" />
                        <i>{resp.data.message}</i></div>)
                    this.setState({ prevStatus: true })
                    // this.reSetState()
                } else {
                    // this.reSetState();
                    toast(<div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" />
                        <i>{resp.data.err.sqlMessage}</i></div>)
                }
            })



        }//end if
        else {
            if (flagPrice) {
                toast(<div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" />
                    <i>Điền thông tin cấu hình không đúng!</i></div>)

            } else {
                toast(<div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" />
                    <i>Trường hợp bắt buộc (*), không được để trống!</i></div>)

            }

        }
    }
    //calculator price


    componentDidUpdate(prevProps, prevState) {
        // productSize calculate price
        var { productPrice, productComplatePrice, productReducedPrice, productReducedPrices,
            productSizes, pushSize, productSizes, index,
            productPrices, productStorageCapacity, productStorageCapacitys } = this.state;

        if (productSizes !== prevState.productSizes) {
            pushSize[index] = productSizes

            this.setState({ pushSize: pushSize })
        }
        if (productStorageCapacity !== prevState.productStorageCapacity) {
            productStorageCapacitys[index] = productStorageCapacity

            this.setState({ productStorageCapacitys: productStorageCapacitys })
        }


        if (productPrice !== prevState.productPrice || productReducedPrice !== prevState.productReducedPrice) {

            const percentage = 100; //100% percent

            prevState.productReducedPrices[index] = productReducedPrice < 0 ? productReducedPrices[index] : productReducedPrice || 0

            productPrices[index] = productPrice.length < 0 ? productPrices[index] : productPrice || 0

            prevState.productComplatePrice[index] = productPrices[index] - ((parseFloat(productReducedPrices[index] / percentage) * productPrices[index]))


            this.setState({
                productComplatePrice: productComplatePrice,
                productPrices: productPrices,
                productReducedPrices: productReducedPrices,
                // isComplatePrice: true,

            })
            if (isNaN(productReducedPrices[index])) {
                productReducedPrices[index] = 0
                productComplatePrice[index] = productPrices[index]
                this.setState({ productReducedPrices: productReducedPrices })

            }
            if (isNaN(productPrice)) {
                productPrices[index] = 0
                productComplatePrice[index] = 0
                this.setState({
                    productPrice: [],
                    productPrices: productPrices,
                    productComplatePrice: productComplatePrice
                })
            }
            if (isNaN(productComplatePrice[index])) {
                productComplatePrice[index] = 0
            }



        }

    }


    componentWillUnmount() {
        // Kiểm tra và thu hồi Object URL trước khi component bị hủy
        this.revokeObjectURL();
        this.revokeObjectURLs();
    }
    //product_content
    onChange = (e) => {
        if (this.typingTimeoutRef.current) {
            clearTimeout(this.typingTimeoutRef.current);
        }
        this.typingTimeoutRef.current = setTimeout(() => {
            let value = e.editor.getData();
            this.setState({
                productContent: value
            })
        }, 500); // Khoảng thời gian 0.5 giây
    }

    isChange = (event, i) => {
        let name = event.target.name;
        let value = event.target.value;
        // if (this.typingTimeoutRef.current) {
        // clearTimeout(this.typingTimeoutRef.current);
        // }
        // this.typingTimeoutRef.current = setTimeout(() => {
        if (name === 'productPrice') {
            value = parseInt(value)
            // let num = Format_number(value);

        }
        this.setState({
            [name]: value,
            keyPrice: i,
        });

        if (name === 'productSize')
            this.setState({ keyPrice: null })
        // }, 500); // Khoảng thời gian 0.5 giây


    }
    //select
    isChangeSelected = (event) => {

        let name = event.target.name;
        let value = event.target.value;
        this.setState({
            [name]: value,

        });

    }

    //check color
    checkboxColor = (e) => {
        const name = e.target.name;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

        this.setState({
            [name]: value
        });
        switch (name) {
            case 'red':
                if (value) {

                    this.state.colors.red = value
                } else {
                    this.state.colors.red = value
                }
                return;
            case 'blue':
                if (value) {
                    this.state.colors.blue = value
                } else {
                    this.state.colors.blue = value
                }
                return;
            case 'black':
                if (value) {
                    this.state.colors.black = value
                } else {
                    this.state.colors.black = value
                }
                return;
            case 'pink':
                if (value) {
                    this.state.colors.pink = value
                } else {
                    this.state.colors.pink = value
                }
                return;
            case 'silver':
                if (value) {
                    this.state.colors.silver = value
                } else {
                    this.state.colors.silver = value
                }
                return;
            case 'white':
                if (value) {
                    this.state.colors.white = value
                } else {
                    this.state.colors.white = value
                }
                return;
            case 'yellow':
                if (value) {
                    this.state.colors.yellow = value
                } else {
                    this.state.colors.yellow = value
                }
                return;
            case 'green':
                if (value) {
                    this.state.colors.green = value
                } else {
                    this.state.colors.green = value
                }
                return;
            default:
                return;
        }


    }


    revokeObjectURL = () => {
        const { productImage } = this.state;
        if (productImage) {
            URL.revokeObjectURL(productImage[0]);
        }
    }
    revokeObjectURLs = () => {
        const { listFileImage } = this.state;
        listFileImage.forEach((image) => {
            URL.revokeObjectURL(image[0]);
        });
    }
    getFile = (e) => {
        const filesImg = e.target.files[0]; // lay ten file


        if (filesImg !== undefined) {
            let reader = new FileReader();
            reader.readAsDataURL(filesImg);
            reader.onloadend = function (e) {
                // Thu hồi Object URL cũ trước khi cập nhật state
                this.revokeObjectURL();
                this.setState({
                    productImage: [reader.result],

                })

            }.bind(this);
        }

    }
    getFiles = (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            const arpush = [];

            for (let i = 0; i < files.length; i++) {
                this.readers[i] = new FileReader();
                this.readers[i].readAsDataURL(files[i]);

                this.readers[i].onloadend = (e) => {
                    const newImage = [this.readers[i].result];
                    arpush.push(newImage);

                    this.setState({
                        listFileImage: arpush,
                    });
                };
            }
        }
    }
    // productDescribe
    onChangeDescribe = (e) => {
        if (this.typingTimeoutRef.current) {
            clearTimeout(this.typingTimeoutRef.current);
        }
        this.typingTimeoutRef.current = setTimeout(() => {
            let value = e.editor.getData();
            this.setState({
                productDescribe: value
            })
        }, 500); // Khoảng thời gian 0.5 giây

    }
    showImage = () => {
        let { listFileImage } = this.state

        if (listFileImage) {
            return listFileImage.map((image, key) => {
                return <img className='url_img_product' src={image} key={key} alt='' title={image} />
            })

        }

    }




    // delete tab
    deleteTab = () => {
        let { productPrices, productComplatePrice, productReducedPrices, index, tabCount,
            pushSize, productStorageCapacitys } = this.state

        let fillPushSizes = pushSize.filter((item, key) => key !== index)
        let fillProductStorageCapacitys = productStorageCapacitys.filter((item, key) => key !== index)
        let fillProductPrices = productPrices.filter((item, key) => key !== index)
        let fillproductReducedPrices = productReducedPrices.filter((item, key) => key !== index)
        let fillproductComplatePrice = productComplatePrice.filter((item, key) => key !== index)

        this.setState({
            pushSize: fillPushSizes,
            productStorageCapacitys: fillProductStorageCapacitys,
            productPrices: fillProductPrices,
            productReducedPrices: fillproductReducedPrices,
            productComplatePrice: fillproductComplatePrice,
            tabCount: tabCount - 1
        })
    }


    // addtab
    addTab = () => {
        let { pushSize, productPrice, tabCount, productPrices, } = this.state;
        let reWhiteSpace = new RegExp("\\s+"); // white-spalce
        let specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|<>\/?]+/; //specialChars
        let flag = false

        for (let i = 0; i < tabCount; i++) {

            if (

                reWhiteSpace.test(productPrices[i]) || //white-spalce
                productPrices.length === 0 ||
                productPrices[i] === '' ||
                // pushSize[i] === undefined || pushSize[i] === '' ||// is underfined empty
                pushSize.length === 0 ||
                specialChars.test(pushSize[i]) || //specialChars
                isNaN(productPrice) || productPrices[i] <= 0
            ) {
                flag = true
                break
            }
        }
        if (flag) {
            toast(<div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" />
                <i>Điền thông tin sai kiểm tra lại!</i></div>)
        } else {

            this.setState((prevState) => ({
                tabCount: prevState.tabCount + 1,


            }));
        }

    }

    showTabsConfiguration = () => {
        let { tabCount, pushSize, productStorageCapacitys } = this.state
        let pushTab = []

        for (let i = 0; i < tabCount; i++) {
            pushTab.push(
                <div key={i} id={'viewtab' + i} className={"tab-pane  show "}
                    role="tabpanel">
                    <div className="">
                        <h1 style={{ margin: '2%' }}>#{i + 1}
                            <i style={{ cursor: 'pointer', marginLeft: '10px' }} onClick={() => this.deleteTab()} className="fa fa-trash-o" title={"Xóa cấu hình " + (i + 1)} aria-hidden="true" />
                        </h1>
                        <div className="formRow">

                            <label className='formLeft'>  kích thước:<span className="req">*</span></label>
                            <span className="oneFour"><input value={pushSize[i]} onChange={(event) => { this.isChange(event) }}
                                className='' name="productSizes" ref='productSizes' id="param_warranty" type="text" />
                            </span>
                            <div className="clear" />
                        </div>

                        <div className="formRow">

                            <label className='formLeft'>  Dung lượng:<span className="req">*</span></label>
                            <span className="oneFour"><input value={productStorageCapacitys[i]} onChange={(event) => { this.isChange(event) }}
                                className='' name="productStorageCapacity" ref='productStorageCapacity' id="" type="text" />
                            </span>
                            <div className="clear" />

                        </div>
                        {this.formPrice(i)}
                        {/* logic */}

                    </div>
                </div >


            )

        }
        return pushTab

    }
    isTabActive = (index) => {
        this.setState({
            index: index
        })
    }
    renderTabs = () => {
        const { tabCount } = this.state;
        const tabs = [];

        for (let i = 0; i < tabCount; i++) {
            tabs.push(

                <a key={i} onClick={() => this.isTabActive(i)} name="" id="" className="btn btn-primary" data-toggle="tab" href={'#viewtab' + i} role="button">
                    <span>Cấu hình {i + 1}</span>
                </a>
            );
        }

        return tabs;
    }


    formPrice = (index) => {
        let { productComplatePrice, productReducedPrices, productPrices } = this.state
        let pushFormPrice = []

        pushFormPrice.push(


            <div key={index} className="formRow">



                <label className="formLeft" htmlFor="param_price">
                    Giá ban đầu :
                    <span className="req">*</span>
                </label>

                <span className="oneFour">
                    <input onChange={(event) => { this.isChange(event) }} defaultValue={productPrices[index]} name="productPrice"
                        // disabled={(disabled[i]) ? "disabled" : ""}
                        id="param_price" className="format_number validateNumber" _autocheck="true" type="text"
                    />
                </span>

                <div name="price_error" className="clear error" />

                <label className="formLeft" htmlFor="param_price">
                    Giá giảm (%):
                </label>

                <span className="oneFour">
                    <input onChange={(event) => { this.isChange(event) }} defaultValue={productReducedPrices[index]} name="productReducedPrice"
                        // disabled={(disabled[i]) ? "disabled" : ""}
                        id="param_reduced_price" className="format_number validateNumber" type="text"
                    />
                </span>

                <div name="discount_error" className="clear error" />

                <label className="formLeft" htmlFor="param_price">
                    Giá kết thúc :

                    <span className="req">*</span>
                </label>

                <span className="oneFour">
                    <input disabled value={FormatNumber(productComplatePrice[index])} name="productCompletePrice"
                        id="param_complete_price" className="format_number" type="text" />

                </span>
                <div className="clear" />
            </div>


        )

        // }
        return pushFormPrice
    }
    // push catalog option
    pushOption = (codeCatalog, catalog, pushName) => {
        let pushOption = []
        for (let i = 0; i < codeCatalog.length; i++) {
            if (codeCatalog[i].includes(catalog)) {
                pushOption.push(<option key={i} value={codeCatalog[i]}>{pushName[i]}</option>)
            }
        }
        return pushOption
        // console.log(value,'value');
    }
    // category
    categorySelect = () => {
        let { selectDataCatagory } = this.state
        let isPushcatalog = [], PushcatalogOption = [], pushcodeName = [], pushCatalog = [], isCatalog = false, pushName = []

        if (selectDataCatagory) {
            selectDataCatagory.reverse()
            selectDataCatagory.sort((a, b) => parseInt(a.catalog) - parseInt(b.catalog)).reverse()
            selectDataCatagory.map((value, key) => {
                isPushcatalog.push(value.catalog)
                pushcodeName.push(value.codeCatalog)
                pushName.push(value.name)
                for (let j = 0; j <= key; j++) {

                    if (value.catalog === isPushcatalog[j + 1]) {
                        if (pushCatalog.includes(value.catalog)) { // check duplicate in array

                            break
                        } else {
                            pushCatalog.push(value.catalog)
                            isCatalog = true
                        }

                    }

                }
                return selectDataCatagory
            })

            if (isCatalog) {
                for (let i = 0; i < pushCatalog.length; i++) {

                    PushcatalogOption.push(
                        <optgroup key={i} label={pushCatalog[i]}>
                            {this.pushOption(pushcodeName, pushCatalog[i], pushName)}

                        </optgroup>
                    )


                }
            }

        }
        return PushcatalogOption
    }

    showEdit = () => {

        if (this.state.dataEdit !== null) {

            return this.state.dataEdit.map((value, key) => {


                return (
                    <Fragment key={key}>
                        <div className="formRight">

                            <label className="formLeft">Mã ID:<input disabled defaultValue={value.id} name="id" className="req" />  </label>
                        </div>

                        <div className="formRow">

                            <label className="formLeft" >Tên:<span className="req">*</span></label>
                            <div className="formRight">
                                <span className="oneTwo"><input onChange={(event) => { this.isChange(event) }} name="productName" id="param_name" _autocheck="true" defaultValue={value.productName} type="text" /></span>
                                <span name="name_autocheck" className="autocheck"></span> {/*check error*/}
                                <div name="name_error" className="clear error" ></div>
                            </div>
                            <div className="clear" ></div>
                        </div>
                        <div className="formRow">

                            <label type="file" className="formLeft">Hình ảnh:<span className="req">*</span></label>
                            <div className="formRight">
                                <div className="left"><input onChange={(e) => this.getFile(e)} type="file" id="image" name="productImage" accept="/admin/*" ref='file' /></div>
                                {this.state.productImage !== '' &&
                                    <img className="url_img_product" src={this.state.productImage} alt='' />
                                   
                                }
                                <div name="image_error" className="clear error" ></div>
                            </div>
                            <div className="clear" ></div>
                        </div>

                        <div className="formRow">
                            <label className="formLeft">Ảnh kèm theo:</label>
                            <div className="formRight">
                                <div className="left">
                                    <input onChange={(e) => this.getFiles(e)} type="file" id="image_list" name="listFileImage" accept="/admin/images/*" ref='files' multiple />
                                </div>
                                {this.showImage()}
                                <div name="image_list_error" className="clear error" ></div>
                            </div>
                            <div className="clear" ></div>
                        </div>
                        {/* productAmount */}
                        <div className="formRow">
                            <label className="formLeft" >Số lượng:<span className="req"></span></label>
                            <div className="formRight">
                                <span className="oneTwo"><input onChange={(event) => { this.isChange(event) }} name="productAmount" id="productAmount" _autocheck="true" defaultValue={value.productAmount} type="text" /></span>
                                <span name="name_autocheck" className="autocheck"></span> {/*check error*/}
                                <div name="name_error" className="clear error" ></div>
                            </div>
                            <div className="clear" ></div>
                        </div>

                        <div className="formRow">
                            <label className="formLeft" htmlFor="param_warranty">
                                Cấu hình : </label>
                            <div className="formRight">

                                <div className="container " >
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="" id=''>


                                                {this.renderTabs()}
                                                <span style={{ cursor: 'pointer', marginLeft: '1%' }} onClick={() => this.addTab()}>
                                                    <img src="images/icons/control/16/add.png" className="titleIcon" alt='' title='thêm cấu hình' />
                                                </span>

                                            </div>

                                        </div>
                                    </div>
                                    <div className="tab-content-add">

                                        {this.showTabsConfiguration()}
                                    </div>

                                </div>



                                <div name="warranty_error" className="clear error" />
                            </div>
                            <div className="clear" />
                        </div>

                        <div className="formRow">
                            <label className="formLeft" htmlFor="param_cat">Thể loại hãng sản phẩm:<span className="req">*</span></label>

                            <div className="formRight">

                                <select onChange={(event) => { this.isChangeSelected(event) }} defaultValue={value.productCategory} name="productCategory" _autocheck="true" id="param_cats" className="left">
                                    <option value={' '}>---</option>
                                    <option value={'All'}>All</option>
                                    {this.categorySelect()}
                                </select>
                                {/* {this.IsShow_selected_check()} */}



                            </div>

                            <div className="formRow">
                                <label htmlFor="check-box">Colors: </label>
                                <div className="formRight check_color">
                                    <input value={this.state.colors.red} onChange={(e) => this.checkboxColor(e)} name='red' type="checkbox" className="checked checked-red" id="check-in-box1" />
                                    <label className='check-label-red' htmlFor="check-in-box1"> Red</label>
                                    <input value={this.state.colors.blue} onChange={(e) => this.checkboxColor(e)} name='blue' type="checkbox" className=" checked checked-blue" id="check-in-box2" />
                                    <label className='check-label-blue' htmlFor="check-in-box2"> Blue</label>
                                    <input value={this.state.colors.black} onChange={(e) => this.checkboxColor(e)} name='black' type="checkbox" className=" checked checked-black" id="check-in-box3" />
                                    <label className='check-label-black' htmlFor="check-in-box3"> Black</label>
                                    <input value={this.state.colors.pink} onChange={(e) => this.checkboxColor(e)} name='pink' type="checkbox" className="checked checked-pink" id="check-in-box4" />
                                    <label className='check-label-pink' htmlFor="check-in-box4"> Pink</label>
                                    <input value={this.state.colors.silver} onChange={(e) => this.checkboxColor(e)} name='silver' type="checkbox" className="checked checked-silver" id="check-in-box5" />
                                    <label className='check-label-silver' htmlFor="check-in-box5">Silver</label>
                                    <input value={this.state.colors.white} onChange={(e) => this.checkboxColor(e)} name='white' type="checkbox" className="checked checked-white" id="check-in-box6" />
                                    <label className='check-label-white' htmlFor="check-in-box6"> White</label>
                                    <input value={this.state.colors.yellow} onChange={(e) => this.checkboxColor(e)} name='yellow' type="checkbox" className="checked checked-yellow" id="check-in-box7" />
                                    <label className='check-label-yellow' htmlFor="check-in-box7"> Yellow</label>
                                    <input value={this.state.colors.green} onChange={(e) => this.checkboxColor(e)} name='green' type="checkbox" className="checked checked-green" id="check-in-box8" />
                                    <label className='check-label-green' htmlFor="check-in-box8"> Green</label>
                                </div>

                                <div className="clear" />
                                <div className="row">
                                    { }
                                    <span className='colors-pick'><label > Màu đã chọn trước: [ {this.state.pushColors} ]</label></span>
                                </div>
                            </div>
                            <span name="cat_autocheck" className="autocheck" />
                            <div name="cat_error" className="clear error" />
                            {/* text select */}
                            <div className="clear" />

                        </div>
                        {/* warranty */}
                        <div className="formRow">
                            <label className="formLeft" >
                                Bảo hành :
                            </label>
                            <div className="formRight">
                                <span className="oneFour"><input onChange={(event) => { this.isChange(event) }} className='validateNumber' name="productGuarantee"
                                    id="param_warranty" defaultValue={value.productGuarantee} type="text" /></span>
                                <span name="warranty_autocheck" className="autocheck" />
                                <div name="warranty_error" className="clear error" />
                            </div>
                            <div className="clear" />
                        </div>
                        <div className="formRow">
                            <label className="formLeft" >Mã Loại sản phẩm:</label>
                            <div className="formRight">
                                <span className="oneTwo"><input onChange={(event) => { this.isChange(event) }} name="productCategoryCode"
                                    id="product_category_code" defaultValue={value.productCategoryCode} type="text" /></span>
                                <span name="sale_autocheck" className="autocheck" />
                                <div name="sale_error" className="clear error" />
                            </div>
                            <div className="clear" />
                        </div>					         <div className="formRow hide" />

                        <div id="tab2" className="tab_content pd0">
                            <div className="formRow">
                                <label className="formLeft">Tiêu đề:</label>
                                <div className="formRight">
                                    <span className="oneTwo"><textarea onChange={(event) => { this.isChange(event) }} name="productTitle"
                                        id="param_site_title" _autocheck="true" rows={4} cols='' defaultValue={value.productTitle} /></span>
                                    <span name="site_title_autocheck" className="autocheck" />
                                    <div name="site_title_error" className="clear error" />
                                </div>
                                <div className="clear" />
                            </div>
                            <div className="formRow">
                                <label className="formLeft" htmlFor="param_meta_desc">Mô tả:</label>
                                <div className="formRight">
                                    <CKEditor
                                        activeClass="p09"
                                        content={this.state.productDescribe}
                                        events={{
                                            // "blur": this.onBlur,
                                            // "afterPaste": this.afterPaste,
                                            "change": this.onChangeDescribe
                                        }}
                                        onChange={(e) => this.onChangeDescribe(e)}
                                    />
                                    {/* <span className="oneTwo"><textarea onChange={(event) => { this.isChange(event) }} name="product_describe" id="param_meta_desc" _autocheck="true" rows={4} cols='' defaultValue={""} /></span> */}
                                    <span name="meta_desc_autocheck" className="autocheck" />
                                    <div name="meta_desc_error" className="clear error" />
                                </div>
                                <div className="clear" />
                            </div>
                            <div className="formRow">
                                <label className="formLeft" >Meta keywords:</label>
                                <div className="formRight">
                                    <span className="oneTwo"><textarea onChange={(event) => { this.isChange(event) }} name="productKeyword" ref={'productKeyword'}
                                        id="param_meta_key" _autocheck="true" rows={4} cols='' defaultValue={value.productKeyword} /></span>
                                    <span name="meta_key_autocheck" className="autocheck" />
                                    <div name="meta_key_error" className="clear error" />
                                </div>
                                <div className="clear" />
                            </div>

                            <div className="formRow hide" />
                        </div>
                        <div id="tab3" className="tab_content pd0">
                            <div className="formRow">
                                <label className="formLeft">Bài viết (đánh giá):</label>
                                <div className="formRight">
                                    <CKEditor
                                        activeClass="p10"
                                        content={this.state.productContent}

                                        events={{
                                            // "blur": this.onBlur,
                                            // "afterPaste": this.afterPaste,
                                            "change": this.onChange
                                        }}
                                        onChange={(e) => this.onChange(e)}
                                    />


                                    <div name="content_error" className="clear error" />
                                </div>
                                <div className="clear" />
                            </div>
                            <div className="formRow hide" />
                        </div>
                    </Fragment>
                )
            })

        }



    }



    render() {

        if (this.state.prevStatus) {
            return <Redirect to="product.html" />
        }
        return (
            <div>
                <FormtitleArea
                    managerTitle={'Sản phẩm'}
                    managerName={'Quản lý sản phẩm'}
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
                <div className="wrapper">
                    {/* Form */}
                    <form className="form" id="form" action="" method="post" encType="multipart/form-data">
                        <div className="widget">
                            <fieldset>
                                <div className="title">
                                    <img src="images/icons/dark/edit.png" className="titleIcon" alt='' />
                                    <h6>Sửa Sản phẩm</h6>
                                </div>

                                <div className="tab_container">
                                    <div id="tab1" className="tab_content pd0">

                                        {this.showEdit()}


                                    </div>
                                </div>{/* End tab_container*/}

                                <div className="formSubmit">


                                    <input type="reset" onClick={(() => this.reSetState())} value="Làm mới" className="basic button" />
                                    <input onClick={() => this.handleUpdateClick()} type="button" value="Cập nhật" className="redB button" />

                                </div>
                                <div className="clear" />
                            </fieldset>
                        </div>
                    </form>
                </div>


            </div>

        );
    }
}

export default EditProduct;