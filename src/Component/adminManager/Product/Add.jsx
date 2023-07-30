import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import CKEditor from "react-ckeditor-component";
import { FormatNumber } from '../../FormatNumber.jsx';
import FormtitleArea from '../titleAreaFrom/FormtitleArea.jsx';
import { randomId } from '../RandomId/randomId.jsx';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min.js';
// import { NavLink } from 'react-router-dom/cjs/react-router-dom.js';
const getDataCategory = () => axios.get('/getdata_category').then((res) => res.data)

class Add extends Component {
    constructor(props) {
        super(props);

        this.state = {
            productName: '', productAmount: 1, productDescribe: '', productImage: '', productImageList: [], productCategory: [],
            productReducedPrice: [], productReducedPrices: [], productContent: '', productGuarantee: '', productCategoryCode: '', productTitle: '', productKeyword: '',
            fileImage: '', file: [], listFile: [], flag: false, imageUrl: '',

            // productSize
            productSizes: '', pushSize: [],
            // select thể loại:
            checkboxStatusSelect: [], selectDataCatagory: null, selectPushCategory: [],
            // color
            colors: { red: false, blue: false, black: false, pink: false, silver: false, white: false, yellow: false, green: false },
            pushColors: [],
            //price
            productComplatePrice: [], pushPrice: [], pushReducedPrice: [], productPrice: [], productPrices: [],
            // disabled
            disabled: [],
            //configuration addtab
            tabCount: 1, isActive: 'active', index: 0, productStorageCapacity: '', productStorageCapacitys: [],
            isComback: false

        }
        this.checkboxColor = this.checkboxColor.bind(this);
        // this.formPrice = this.formPrice.bind(this);
        // this.isChange = this.isChange.bind(this);
    }


    componentDidMount() {
        if (this.state.selectDataCatagory === null) {
            getDataCategory().then((res) => {
                this.setState({ selectDataCatagory: res })
            })
        }

    }



    handleClick = () => {

        // var reWhiteSpace = new RegExp("\\s+"); // white-spalce


        var { productName, productAmount, productPrice, productPrices, productComplatePrice, productDescribe, productImage, productImageList,
            productCategory, productSizes, productReducedPrice, productContent, productGuarantee, productCategoryCode, productTitle,
            productKeyword, pushSize, productStorageCapacity, productStorageCapacitys, productReducedPrices } = this.state
        var flagPrice = false

        for (let i = 0; i < productComplatePrice.length; i++) {
            if (productPrices[i] <= 0 || isNaN(productPrices[i]) || productPrices[i] == '' ||
                productComplatePrice[i] <= 0 ||
                productReducedPrices[i] < 0 || productReducedPrices[i] > 99) { flagPrice = true }
            if (pushSize[i] === undefined) {
                pushSize[i] = null
            }
            if (productStorageCapacitys[i] === undefined) { productStorageCapacitys[i] = null }
        }
        // is not white- splace & empty & 1 array >0
        if (productName !== '' && productImage !== '' &&
            productCategory !== '' && productImageList.length !== 0 && pushSize.length !== 0 &&
            productPrices.length !== 0 && !flagPrice) {

            const id = randomId();
            const listImage = [];
            const count = productImageList.length;

            for (let i = 0; i < productImageList.length; i++) {

                const formData = new FormData();
                formData.append("avatarProduct", productImageList[i]);
                const config = {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                }



                axios.post('/avatarProduct', formData, config).then(res => {
                    //  console.log('RES', res.data.fileNameInServer);
                    const filePath = res.data.fileNameInServer;
                    // list_image = Array.prototype.join.call(filePath); // tách 1 array => nhiều array

                    listImage.push(filePath.slice(40)); // bỏ ký tự từ 0 ->14 và thêm nó vào vùng chứa chung 1 vùng




                    if (i === count - 1) {

                        this.setState({
                            // imageUrl: '/view-image/' + filePath,
                            productImageList: listImage.join('-Arraylist') // nối tất cả phần tử sau khi push lại cùng vs nhau phân biệt điều kiện
                        })
                        var { productImageList } = this.state

                        // productSize price
                        if (pushSize.length !== 0) {
                            productSizes = pushSize.join("#")
                            productStorageCapacity = productStorageCapacitys.join("#")
                            //push price array cv string
                            productPrice = productPrices.join(",")
                            productReducedPrice = productReducedPrices.join(",")
                            productComplatePrice = productComplatePrice.join(",")

                        }


                        //UpdateDateTime
                        var firstDateTime = new Date();
                        var dateTime = firstDateTime

                        //colors set
                        var colors = Object.keys(this.state.colors)
                            .filter((name) => this.state.colors[name])
                            .join(", ");

                        axios.post('/add_product', {
                            id, productName, productAmount, productPrice, productComplatePrice, productDescribe, productImage, productImageList, productCategory,
                            productReducedPrice, productContent, productGuarantee, productCategoryCode, productTitle, productKeyword,
                            firstDateTime, dateTime, colors, productSizes, productStorageCapacity
                        }).then(resp => {

                            if (resp.data.status) {
                                //    true add file
                                toast(<div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" />
                                    <i>{resp.data.message}</i></div>)
                                this.setState({ isComback: true })
                                // this.reSetState()
                            } else {


                                toast(<div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" />
                                    <i>Có lỗi xảy ra, kiểm tra lại!</i></div>)
                            }


                        })




                    } //end if

                }) // close axios avatar

            } // end for


        }//end if
        else {
            if (flagPrice) {
                toast(<div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" />
                    <i>Điền thông tin Giá sai!</i></div>)

            } else {
                toast(<div className="advertise"><i className="fa fa-minus-circle" aria-hidden="true" />
                    <i>Trường hợp bắt buộc (*), không được để trống!</i></div>)

            }
        }
    }
    reSetState = () => {

        this.setState({
            productName: '', productPrice: [], productComplatePrice: [], productDescribe: '', productImage: '', productImageList: [],
            productCategory: [], productReducedPrice: [], productContent: '', productGuarantee: '', productCategoryCode: '', pushColors: [],
            colors: { red: false, blue: false, black: false, pink: false, silver: false, white: false, yellow: false, green: false },
            productTitle: '', productKeyword: '', fileImage: '', file: [], listFile: [], flag: false, imageUrl: '',
            productSizes: '', pushSize: [], productPrices: [], productReducedPrices: [], imageListTemp: [],
            productStorageCapacity: '', productStorageCapacitys: []

        })


    }

    componentWillUnmount() {
        // this.reSetState()
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

        if (productPrice !== '' && productReducedPrice !== '' && !isNaN(productPrice)
            && productPrice !== prevState.productPrice || productReducedPrice !== prevState.productReducedPrice) {

            const percentage = 100; //100% percent
            productReducedPrices[index] = productReducedPrice.length <= 0 ? productReducedPrices[index] : productReducedPrice

            productPrices[index] = productPrice.length <= 0 ? productPrices[index] : productPrice

            prevState.productComplatePrice[index] = productPrices[index] - ((productReducedPrices[index] / percentage) * productPrices[index])


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
            if (isNaN(productPrices[index])) {
                productPrices[index] = 0
            }
            if (isNaN(productComplatePrice[index])) {
                productComplatePrice[index] = 0
            }



        }


    }


    // productContent
    onChange = (e) => {
        var value = e.editor.getData();
        this.setState({
            productContent: value

        })
    }

    onChangeDescribe = (e) => {
        var value = e.editor.getData();
        this.setState({
            productDescribe: value
        })
    }
    //get value
    isChange = (event) => {

        var name = event.target.name;
        var value = event.target.value;
        // if (typingtimeoutRef.current) {
        //     clearTimeout(typingtimeoutRef.current)
        // }

        // typingtimeoutRef.current = setTimeout(() => {
        if (name === 'productPrice') {
            value = parseFloat(value)
            // var num = Format_number(value);

        }

        this.setState({
            [name]: value,
        });


        // }, 300);




    }

    isChangeSelected = (event) => {
        var name = event.target.name;
        var value = event.target.value;

        // if (typingtimeoutRef.current) {
        //     clearTimeout(typingtimeoutRef.current)
        // }
        // typingtimeoutRef.current = setTimeout(() => {
        this.setState({
            [name]: value,
        });
        // }, 300);
    }
    // key up productSize



    getFile = () => {
        // const ffile = e.target.files[0].name; // lay ten file
        var filesImg = this.refs.file.files[0];

        if (filesImg !== undefined) {

            var reader = new FileReader();
            reader.readAsDataURL(filesImg);

            reader.onloadend = function (e) {
                this.setState({
                    file: [reader.result],
                    productImage: [reader.result]
                })
                // console.log('ten file :'+ this.state.product_image);
            }.bind(this);
        }
        // else {
        //     this.setState({
        //         file: this.state.fileImage
        //     })

        // }


    }
    getFiles = (e) => {
        //    const ffile = e.target.files[0].name; // lay ten file
        const files = e.target.files;
        // var files_s = [];
        // files_s = this.refs.files.files[0];

        if (files.length > 0) {

            var reader = []; var arpush = [], pushFile = [];

            for (let i = 0; i < files.length; i++) {
                pushFile.push(files[i])

                reader[i] = new FileReader();
                reader[i].readAsDataURL(files[i]);

                reader[i].onloadend = function (e) {

                    arpush.push([reader[i].result]);

                    this.setState({
                        listFile: arpush,
                        productImageList: pushFile,

                    })

                }.bind(this);

            }

        }
        // else {

        //     this.setState({
        //         listFile: [],

        //     })

        // }
    }
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
    showImage = () => {
        // console.log(this.state.list_file);
        var { listFile } = this.state

        if (listFile.length !== 0) {
            for (let i = 0; i < listFile.length; i++) {
                return this.state.listFile.map((value, key) => {
                    return (

                        <img className='url_img_product' src={value} key={key} alt='' />
                    )
                })
            }
        } else {
            return ''
        }
    }

    formPrice = (index) => {
        var { productComplatePrice, } = this.state
        var pushFormPrice = []

        pushFormPrice.push(


            <div key={index} className="formRow">



                <label className="formLeft" htmlFor="param_price">
                    Giá ban đầu :
                    <span className="req">*</span>
                </label>

                <span className="oneFour">
                    <input onChange={(event) => { this.isChange(event) }} name="productPrice"
                        // ref={'productPrice'}
                        id="param_price" className="format_number validateNumber" _autocheck="true" type="text"
                    />
                </span>

                <div name="price_error" className="clear error" />

                <label className="formLeft" htmlFor="param_price">
                    Giá giảm (%):
                </label>

                <span className="oneFour">
                    <input onChange={(event) => { this.isChange(event) }} name="productReducedPrice"
                        // ref={'productReducedPrice'}
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
        var pushOption = []
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
        var { selectDataCatagory } = this.state
        var isPushcatalog = [], PushcatalogOption = [], pushcodeName = [], pushCatalog = [], isCatalog = false, pushName = []

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



    // configuration 
    // addtab
    addTab = () => {
        var { pushSize, productStorageCapacitys,
            productPrice, tabCount, productPrices, } = this.state;
        var reWhiteSpace = new RegExp("\\s+"); // white-spalce
        var specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|<>\/?]+/; //specialChars
        var flag = false

        for (let i = 0; i < tabCount; i++) {

            if (
                reWhiteSpace.test(productPrices[i]) || //white-spalce
                productPrices.length === 0 ||
                productPrices[i] === '' ||
                // pushSize[i] === undefined || pushSize[i] === '' ||// is underfined empty
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
                productPrice: [],
                productReducedPrice: [],

            }));
        }






    }

    showTabsConfiguration = () => {
        var { tabCount, pushSize, productStorageCapacitys } = this.state
        var pushTab = []

        for (let i = 0; i < tabCount; i++) {
            pushTab.push(
                <div key={i} id={'viewtab' + i} className={"tab-pane  show "}
                    role="tabpanel">
                    <div className="">
                        <h1>#{i + 1}</h1>
                        <div className="formRow">

                            <label className='formLeft'>  kích thước:<span className="req">*</span></label>
                            <span className="oneFour"><input onChange={(event) => { this.isChange(event) }}
                                className='' name="productSizes" ref='productSizes' id="param_warranty" type="text" />
                            </span>
                            <div className="clear" />
                        </div>

                        <div className="formRow">

                            <label className='formLeft'>  Dung lượng:<span className="req">*</span></label>
                            <span className="oneFour"><input onChange={(event) => { this.isChange(event) }}
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
            // isActive: '',
            index: index
        })
    }
    renderTabs = () => {
        const { tabCount } = this.state;
        const tabs = [];

        for (let i = 0; i < tabCount; i++) {
            tabs.push(
                <a onClick={() => this.isTabActive(i)} key={i} name="" id="" className="btn btn-primary" data-toggle="tab" href={'#viewtab' + i} role="button">
                    <span>Cấu hình {i + 1}</span>
                </a>
            );
        }

        return tabs;
    }

    render() {
        if (this.state.isComback) return <Redirect to="product.html" />
        return (
            <div>

                {<FormtitleArea
                    managerTitle={'Sản phẩm'}
                    managerName={'Quản lý sản phẩm'}
                    urlRating={'/admin/rating-product.html'}
                    imageRating={'./images/icons/control/16/feature.png'}
                    urlList={'/admin/product.html'}
                    imageList={'./images/icons/control/16/list.png'}
                />}
                <div className="line" />
                {/* Message */}
                {/* Main content wrapper */}
                <div className="wrapper">
                    {/* Form */}
                    <form className="form" id="form">
                        <fieldset>
                            <div className="widget">
                                <div className="title">
                                    <img src="images/icons/dark/add.png" className="titleIcon" alt='' />
                                    <h6>Thêm mới Sản phẩm</h6>
                                </div>

                                <div className="tab_container">
                                    <div id="tab1" className="tab_content pd0">
                                        <div className="formRow">
                                            <label className="formLeft" htmlFor="param_name">Tên:<span className="req">*</span></label>
                                            <div className="formRight">
                                                <span className="oneTwo"><input onChange={(event) => { this.isChange(event) }} value={this.state.productName}
                                                    name="productName" id="param_name" type="text" /></span>
                                                <span name="name_autocheck" className="autocheck" />
                                                <div name="name_error" className="clear error" />
                                            </div>
                                            <div className="clear" />
                                        </div>

                                        <div className="formRow">

                                            <label htmlFor="image" type="file" className="formLeft">Hình ảnh:<span className="req">*</span></label>
                                            <div className="formRight">
                                                <div className="left"><input onChange={() => this.getFile()} type="file" id="image" name="productImage" accept="/admin/*" ref='file' /></div>
                                                {this.state.productImage !== '' &&
                                                    <img className="url_img_product" src={this.state.file[0]} alt='' />
                                                }

                                                <div name="image_error" className="clear error" />
                                            </div>
                                            <div className="clear" />
                                        </div>

                                        <div className="formRow">
                                            <label className="formLeft">Ảnh kèm theo:<span className="req">*</span></label>
                                            <div className="formRight">
                                                <div className="left image-list">
                                                    <input onChange={(e) => this.getFiles(e)} type="file" id="image_list" name="productImageList" accept="/admin/images/*" ref='files' multiple />
                                                </div>

                                                {this.showImage()}
                                                <div name="image_list_error" className="clear error" />
                                            </div>
                                            <div className="clear" />
                                        </div>
                                        {/* Amount */}
                                        <div className="formRow">
                                            <label className="formLeft" htmlFor="productAmount">Số lượng:<span className="req"></span></label>
                                            <div className="formRight">
                                                <span className="oneTwo"><input onChange={(event) => { this.isChange(event) }} value={this.state.productAmount} style={{ width: '100px' }}
                                                    name="productAmount" id="productAmount" _autocheck="true" type="text" /></span>
                                                <span name="name_autocheck" className="autocheck" />
                                                <div name="name_error" className="clear error" />
                                            </div>
                                            <div className="clear" />
                                        </div>



                                        <div className="formRow">
                                            <label className="formLeft" htmlFor="param_cat">Thể loại hãng sản phẩm:<span className="req">*</span></label>

                                            <div className="formRight">

                                                <select onChange={(event) => { this.isChangeSelected(event) }} ref={'productCategory'} data-placeholder="Add Category"
                                                    name="productCategory" _autocheck="true" id="param_cats" className="left">
                                                    <option value={' '}>---</option>
                                                    <option value={'All'}>All</option>

                                                    {this.categorySelect()}
                                                </select>


                                            </div>
                                            <span name="cat_autocheck" className="autocheck" />
                                            <div name="cat_error" className="clear error" />
                                            {/* text select */}
                                            <div className="clear" />

                                        </div>
                                        {/* warranty */}
                                        <div className="formRow">
                                            <label htmlFor="check-box">Color: </label>
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
                                            <label className="formLeft" htmlFor="param_warranty">
                                                Bảo hành : </label>
                                            <div className="formRight">
                                                <span className="oneFour"><input onChange={(event) => { this.isChange(event) }} className='validateNumber'
                                                    name="productGuarantee" id="param_warranty" type="text" ref={'productGuarantee'} value={this.state.productGuarantee} /></span>
                                                <span name="warranty_autocheck" className="autocheck" />
                                                <img className="tipS" title="Bảo hành tính theo tháng"
                                                    style={{ marginTop: '8px' }} src="crown/images/icons/notifications/information.png" alt='' />

                                                <div name="warranty_error" className="clear error" />
                                            </div>
                                            <div className="clear" />
                                        </div>

                                        <div className="formRow">
                                            <label className="formLeft" htmlFor="product_category_code">Mã giảm giá:</label>
                                            <div className="formRight">
                                                <span className="oneTwo"><input onChange={(event) => { this.isChange(event) }} name="productCategoryCode" id="product_category_code" rows={4} cols='' defaultValue={""} /></span>
                                                <span name="sale_autocheck" className="autocheck" />
                                                <div name="sale_error" className="clear error" />
                                            </div>
                                            <div className="clear" />
                                        </div>
                                    </div>
                                    <div id="tab2" className="tab_content pd0">
                                        <div className="formRow">
                                            <label className="formLeft" htmlFor="param_site_title">Tiêu đề:</label>
                                            <div className="formRight">
                                                <span className="oneTwo">
                                                    <textarea onChange={(event) => { this.isChange(event) }}
                                                        maxLength={300} name="productTitle" id="param_site_title" ref={'productTitle'} value={this.state.productTitle}
                                                        rows={3} cols='' />
                                                </span>
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
                                            <label className="formLeft" htmlFor="param_meta_key">Meta keywords:</label>
                                            <div className="formRight">
                                                <span className="oneTwo"><textarea onChange={(event) => { this.isChange(event) }}
                                                    name="productKeyword" id="param_meta_key" rows={4} cols='' value={this.state.productKeyword} /></span>
                                                <span name="meta_key_autocheck" className="autocheck" />
                                                <div name="meta_key_error" className="clear error" />
                                            </div>
                                            <div className="clear" />
                                        </div>
                                        <div className="formRow hide" />
                                    </div>
                                    <div id="tab3" className="tab_content pd0">
                                        <div className="formRow">
                                            <label htmlFor='param_content' className="formLeft">Bài viết (đánh giá):</label>
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
                                </div>{/* End tab_container*/}

                                <div className="formSubmit">

                                    <input type="reset" onClick={(() => this.reSetState())} value="Làm mới" className="basic button" />
                                    <input onClick={() => this.handleClick()} type="button" value="Thêm mới" className="redB button" />

                                </div>
                                <div className="clear" />
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div >


        );
    }
}
export default Add;