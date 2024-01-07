var express = require('express');
var router = express.Router();
var body = require('body-parser');
// var uuidv4 = require('uuid/v4');
var multer = require('multer');
// var mongoose = require('mongoose');
/* GET home page. */
var mysql = require('mysql');
var fs = require('fs');
var path = require('path');
var jwt = require('jsonwebtoken');
// const { get } = require('https');
var bcrypt = require('bcryptjs');



var conn = mysql.createConnection({
    host: 'localhost',
    user: 'reactuser',
    password: '',
    database: 'ishop_reactjs'
});
conn.connect(function(err) {
    if (err) console.log(err);

    console.log("Connected!");
});







// node comment
var COMMENTS_FILE_PARENT = path.join(__dirname, "../../src/Component/Content/Detail_product/node_Comment_Parent.json");
router.get('/nodeCommentParent', function(req, res) {
    fs.readFile(COMMENTS_FILE_PARENT, function(err, data) {
        if (err) { /* Print error to console */ }
        // res.json(JSON.parse(data));
        res.send(data)
    });
});
router.post('/nodeCommentParent', function(req, res) {
    fs.readFile(COMMENTS_FILE_PARENT, function(err, data) {

        var { idComment, idProduct, profile, message, dateTime, } = req.body;

        if (err) { /* Print error to console */ }
        var comments = JSON.parse(data);

        var newComment = {
            idParent: idComment,
            date: Date.now(),
            dateTime: dateTime,
            tokenId: profile.id,
            idProduct: idProduct,
            message: message,
            name: profile.name,
            email: profile.email,
            image: profile.image,
            edited: false


        };
        comments.push(newComment);
        comments.sort((a, b) => parseInt(a.date) - parseInt(b.date)).reverse();
        fs.writeFile(COMMENTS_FILE_PARENT, JSON.stringify(comments, null, 8), function(err) {
            if (err) { /* Print error to console */ }
            // res.json(comments);
            res.send(comments)
        });
    });
});

//node comment child
var COMMENTS_FILE_CHILD = path.join(__dirname, "../../src/Component/Content/Detail_product/node_Comment_Child.json");
router.get('/nodeCommentChild', function(req, res) {
    fs.readFile(COMMENTS_FILE_CHILD, function(err, data) {
        if (err) { /* Print error to console */ }
        // res.json(JSON.parse(data));
        res.send(data)
    });
});
router.post('/nodeCommentChild', function(req, res) {
    fs.readFile(COMMENTS_FILE_CHILD, function(err, data) {

        var {
            idComment,
            idProduct,
            profile,
            message,
            dateTime,
            replyKeyParent = '',
            replyStatus,
            replyEmail = '',
            replyName = '',
            replyDate = ''
        } = req.body;
        if (err) { /* Print error to console */ }
        var comments = JSON.parse(data);

        var newComment = {
            // child
            idChild: idComment,
            date: Date.now(),
            dateTime: dateTime,
            tokenId: profile.id,
            idProduct: idProduct,
            message: message,
            name: profile.name,
            email: profile.email,
            image: profile.image,
            edited: false,
            // reply parent
            replyKeyParent: replyKeyParent,
            replyStatus: replyStatus,
            replyEmail: replyEmail,
            replyName: replyName,
            replyDate: replyDate,


        };
        comments.push(newComment);
        comments.sort((a, b) => parseInt(b.date) - parseInt(a.date)).reverse();
        fs.writeFile(COMMENTS_FILE_CHILD, JSON.stringify(comments, null, 4), function(err) {
            if (err) { /* Print error to console */ }
            // res.json(comments);
            res.send(comments)
        });
    });
});
// remove comment parent
router.post('/removeCommentParent', function(req, res) {
    fs.readFile(COMMENTS_FILE_PARENT, function(err, data) {

        if (err) { console.log(err); }
        var { deleteDataCommentParent } = req.body;
        fs.writeFile(COMMENTS_FILE_PARENT, JSON.stringify(deleteDataCommentParent, null, 4), function(err) {
            if (err) { console.log(err); }
            // res.json(comments);
            res.send(deleteDataCommentParent)
        });
    });
});
router.post('/removeCommentChild', function(req, res) {
    fs.readFile(COMMENTS_FILE_CHILD, function(err, data) {

        if (err) { console.log(err); }
        var { deleteDataCommentChild } = req.body;
        fs.writeFile(COMMENTS_FILE_CHILD, JSON.stringify(deleteDataCommentChild, null, 4), function(err) {
            if (err) { console.log(err); }
            // res.json(comments);
            res.send(deleteDataCommentChild)
        });
    });
});
// edit comment parent
router.post('/editCommentParent', function(req, res) {
    fs.readFile(COMMENTS_FILE_PARENT, function(err, data) {

        if (err) { console.log(err); }
        var { editComment } = req.body;
        var comments = JSON.parse(data);
        comments.map((value) => {
            if (value.idParent.includes(editComment.idParent)) {
                value.message = editComment.message
                value.dateTime = editComment.dateTime
                value.edited = true
            }
        })

        fs.writeFile(COMMENTS_FILE_PARENT, JSON.stringify(comments, null, 4), function(err) {
            if (err) { console.log(err); }
            // res.json(comments);
            res.send(comments)
        });
    });
});
// edit comment child
router.post('/editCommentChild', function(req, res) {
    fs.readFile(COMMENTS_FILE_CHILD, function(err, data) {

        if (err) { console.log(err); }
        var { editComment } = req.body;
        var comments = JSON.parse(data);
        comments.map((value) => {
            if (value.idChild.includes(editComment.idChild)) {
                value.message = editComment.message
                value.dateTime = editComment.dateTime
                value.edited = true
            }
        })
        fs.writeFile(COMMENTS_FILE_CHILD, JSON.stringify(comments, null, 4), function(err) {
            if (err) { console.log(err); }
            // res.json(comments);
            res.send(comments)
        });
    });
});
// like comment
var LIKE_COMMENTS_CHILD = path.join(__dirname, "../../src/Component/Content/Detail_product/Like_Comment_Child.json");
router.post('/likeCommentChild', function(req, res) {
    fs.readFile(LIKE_COMMENTS_CHILD, function(err, data) {

        if (err) { console.log(err); }
        var { idChild, idProduct, email, likes = 0 } = req.body;
        var dataLikeList = {
            idChild: idChild,
            idProduct: idProduct,
            email: email,
            likes: likes,
        }
        var pushDataLikes = []
        pushDataLikes.push(dataLikeList)
        fs.writeFile(LIKE_COMMENTS_CHILD, JSON.stringify(pushDataLikes, null, 4), function(err) {
            if (err) { console.log(err); }
            // res.json(comments);
            res.send(pushDataLikes)
        });
    });
});
var LIKE_COMMENTS_PARENT = path.join(__dirname, '../../src/Component/Content/Detail_product/Like_Comment_Parent.json');
router.post('/likeCommentParent', function(req, res) {
    fs.readFile(LIKE_COMMENTS_PARENT, function(err, data) {

        if (err) { console.log(err); }
        var { idParent, idProduct, email, likes = 0 } = req.body;
        var dataLikeList = {
            idParent: idParent,
            idProduct: idProduct,
            email: email,
            likes: likes,
        }
        var pushDataLikes = []
        pushDataLikes.push(dataLikeList)
        fs.writeFile(LIKE_COMMENTS_PARENT, JSON.stringify(pushDataLikes, null, 4), function(err) {
            if (err) { console.log(err); }
            // res.json(comments);
            res.send(pushDataLikes)
        });
    });
});


// sales json 
var StatisticsSales = path.join(__dirname, '../../src/Component/adminManager/StatisticsData/StatisticsSales.json');
router.get('/salesDate', function(req, res) {
    fs.readFile(StatisticsSales, function(err, data) {
        if (err) { /* Print error to console */ }
        // res.json(JSON.parse(data));
        res.send(data)
    });
});
router.post('/salesDate', function(req, res) {
    fs.readFile(StatisticsSales, function(err, data) {

        var { priceDayTeamp, priceMonth, priceYear, priceTotal } = req.body;
        var salesDateData = JSON.parse(data);

        if (err) { /* Print error to console */ }

        var newDateData = {
            priceDay: 0,
            priceMonth: priceMonth,
            priceYear: priceYear,
            priceTotal: priceTotal,
            priceDayTeamp: priceDayTeamp

        };
        salesDateData = newDateData;

        fs.writeFile(StatisticsSales, JSON.stringify(salesDateData, null, 6), function(err) {
            if (err) { /* Print error to console */ }
            // res.json(comments);
            res.send(salesDateData)
        });
    });
});


router.post('/removeDataRecovery', function(req, res) {
    fs.readFile(DATARECOVERY_FILE, function(err, data) {

        if (err) { console.log(err); }
        var { dataRecovery } = req.body;
        fs.writeFile(DATARECOVERY_FILE, JSON.stringify(dataRecovery, null, 4), function(err) {
            if (err) { console.log(err); }
            // res.json(comments);
            res.send(dataRecovery)
        });
    });
});

// recovery data 
var DATARECOVERY_FILE = path.join(__dirname, '../../src/Component/adminManager/Product/RecoveryData.json');
router.get('/dataRecovery', function(req, res) {
    fs.readFile(DATARECOVERY_FILE, function(err, data) {
        if (err) { /* Print error to console */ }

        res.send(data)
    });
});

router.post('/dataRecovery', function(req, res) {
    fs.readFile(DATARECOVERY_FILE, function(err, data) {
        var { dataRecovery } = req.body;

        var dataRecoveryPush = JSON.parse(data)
        var recoveryDataList = {}
        if (err) { console.log(err); }
        //  save product delete
        recoveryDataList = {
            id: dataRecovery[0].id,
            productName: dataRecovery[0].productName,
            productAmount: dataRecovery[0].productAmount,
            productPrice: dataRecovery[0].productPrice,
            productComplatePrice: dataRecovery[0].productComplatePrice,
            productDescribe: dataRecovery[0].productDescribe,
            productImage: dataRecovery[0].productImage,
            productImageList: dataRecovery[0].productImageList,
            productCategory: dataRecovery[0].productCategory,
            productReducedPrice: dataRecovery[0].productReducedPrice,
            productContent: dataRecovery[0].productContent,
            productGuarantee: dataRecovery[0].productGuarantee,
            productCategoryCode: dataRecovery[0].productCategoryCode,
            productTitle: dataRecovery[0].productTitle,
            productKeyword: dataRecovery[0].productKeyword,
            firstDateTime: dataRecovery[0].firstDateTime,
            dateTime: dataRecovery[0].dateTime === null ?
                dataRecovery[0].firstDateTime : dataRecovery[0].dateTime,
            colors: dataRecovery[0].colors,
            productSizes: dataRecovery[0].productSizes,
            productStorageCapacity: dataRecovery[0].productStorageCapacity
        }
        dataRecoveryPush.push(recoveryDataList);


        fs.writeFile(DATARECOVERY_FILE, JSON.stringify(dataRecoveryPush, null, 4), function(err) {
            if (err) { err }
            // res.json(comments);
            return res.send({
                status: true,
                message: 'Sao luu!',
                // fileNameInServer: product_image_list,
            })

        });
    });
});


//cart product
var CART_FILE = path.join(__dirname, '../../src/Component/Header/CartProduct/Cart.json');
router.get('/dataCart', function(req, res) {
    fs.readFile(CART_FILE, function(err, data) {
        if (err) { /* Print error to console */ }
        // res.json(JSON.parse(data));
        res.send(data)
    });
});

router.post('/dataCart', function(req, res) {
    fs.readFile(CART_FILE, function(err, data) {

        var { color, dayShipping, quantity, emailCustomer, dataCart, indexPrice = 0 } = req.body;

        if (err) { /* Print error to console */ }
        var dataCartPush = JSON.parse(data)

        var dataPushList = {
            productId: dataCart.id,
            price: dataCart.productComplatePrice.split(",")[indexPrice],
            color: color,
            dayShipping: dayShipping,
            quantity: quantity,
            productName: dataCart.productName,
            productCategory: dataCart.productCategory,
            productGuarantee: dataCart.productGuarantee,
            emailCustomer: emailCustomer,
            image: dataCart.productImage,
            productSizes: dataCart.productSizes.split("#")[indexPrice],
            productCategoryCode: dataCart.productCategoryCode,
            productReducedPrice: dataCart.productReducedPrice.split(",")[indexPrice],
        };
        dataCartPush.push(dataPushList);
        // comments.sort((a, b) => parseInt(a.date) - parseInt(b.date)).reverse();
        fs.writeFile(CART_FILE, JSON.stringify(dataCartPush, null, 4), function(err) {
            if (err) { /* Print error to console */ }
            // res.json(comments);
            res.send(dataCartPush)
        });
    });
});

//check out product
var CheckOutProduct = path.join(__dirname, '../../src/Component/Header/CartProduct/CheckOutProduct.json');
router.get('/checkout', function(req, res) {
    fs.readFile(CheckOutProduct, function(err, data) {
        if (err) { /* Print error to console */ }
        // res.json(JSON.parse(data));
        res.send(data)
    });
});
//cart product

router.post('/checkout', function(req, res) {
    fs.readFile(CheckOutProduct, function(err, data) {
        var { dataCheckOut, formality, payment } = req.body;
        var dataCartPush = new Array;
        if (data.length === 0) {
            data = new Array;
        } else {
            dataCartPush = JSON.parse(data);
        }
        if (payment) {
            payment = 'Đã thanh toán';
        } else {
            payment = 'Chưa thanh toán';
        }

        for (let i = 0; i < dataCheckOut.length; i++) {
            var dataList = {
                id: dataCheckOut[i].id,
                tradingCode: dataCheckOut[i].tradingCode,
                emailCustomer: dataCheckOut[i].emailCustomer,
                nameCheckout: dataCheckOut[i].nameCheckout,
                emailCheckout: dataCheckOut[i].emailCheckout,
                phoneCheckout: dataCheckOut[i].phoneCheckout,
                addressCheckout: dataCheckOut[i].addressCheckout,
                city: dataCheckOut[i].city,
                state: dataCheckOut[i].state,
                zip: dataCheckOut[i].zip,
                image: dataCheckOut[i].image,
                price: dataCheckOut[i].price,
                totalPrice: dataCheckOut[i].totalPrice,
                totalPriceSingle: dataCheckOut[i].totalPriceSingle,
                currencyRate: dataCheckOut[i].currencyRate,
                quantity: dataCheckOut[i].quantity,
                color: dataCheckOut[i].color,
                note: dataCheckOut[i].note,
                productSizes: dataCheckOut[i].productSizes,
                dayShipping: dataCheckOut[i].dayShipping,
                productName: dataCheckOut[i].productName,
                profile: dataCheckOut[i].image,
                statusPayment: dataCheckOut[i].statusPayment,
                order: 'Chờ xử lý', //'cho xu ly'
                transaction: 'Chờ xử lý', // payment ==>
                payment: payment,
                formality: formality,
                dateTime: dataCheckOut[i].dateTime

            }
            dataCartPush.push(dataList)

        }
        fs.writeFile(CheckOutProduct, JSON.stringify(dataCartPush, null, 4), function(err) {
            if (err) { /* Print error to console */ }
            res.send(dataCartPush)
        });
    });
});
// order update adminManager
router.post('/updateOrder', function(req, res) {
    fs.readFile(CheckOutProduct, function(err, data) {
        var { dataCheckOut, amount, idUpdateAmount } = req.body;
        var sql = "UPDATE all_product set productAmount =? WHERE id =?";
        conn.query(sql, [amount, idUpdateAmount]);

        // comments.sort((a, b) => parseInt(a.date) - parseInt(b.date)).reverse();
        fs.writeFile(CheckOutProduct, JSON.stringify(dataCheckOut, null, 4), function(err) {
            if (err) { /* Print error to console */ }
            // res.json(comments);
            res.send(dataCheckOut)
        });
    });
});
router.post('/removeDataCart', function(req, res) {
    fs.readFile(CART_FILE, function(err, data) {


        if (err) { /* Print error to console */ }
        var dataCart = req.body.data;


        // comments.sort((a, b) => parseInt(a.date) - parseInt(b.date)).reverse();
        fs.writeFile(CART_FILE, JSON.stringify(dataCart, null, 4), function(err) {
            if (err) { /* Print error to console */ }
            // res.json(comments);
            res.send(dataCart)
        });
    });
});
// This snippet of code is probably the most important
//////
router.get('/', function(req, res, next) {});

router.get('/getdata_product', function(req, res, next) {

    conn.query('SELECT * FROM all_product', (error, response) => {
            if (error) {
                console.log(error);
            } else {
                res.send(response)
            }
        })
        //list product data
});

router.get('/getdata_blog', function(req, res, next) {

    conn.query('SELECT * FROM blog', (error, response) => {
            if (error) {
                console.log(error);
            } else {
                res.send(response)
            }
        })
        //list product data
});
// select data support
router.get('/support', function(req, res, next) {

    conn.query('SELECT * FROM support', (error, response) => {
            if (error) {
                console.log(error);
            } else {
                res.send(response)
            }
        })
        //list product data
});
// product join rating
router.get('/getdata_product_rating', function(req, res, next) {

    conn.query('SELECT * FROM all_product INNER JOIN rating ON all_product.ID = rating.ID', (error, response) => {
            if (error) {
                console.log(error);
            } else {
                res.send(response)
            }
        })
        //list product join rating data
});
router.get('/getdata_category', function(req, res, next) {

    conn.query('SELECT * FROM category', (error, response) => {
            if (error) {
                console.log(error);
            } else {
                res.send(response)
            }
        })
        //list category data
});
router.get('/getdata_slide', function(req, res, next) {

    conn.query('SELECT * FROM slide', (error, response) => {
            if (error) {
                console.log(error);
            } else {
                res.send(response)
            }
        })
        // list slide data
});
// slide pages
router.get('/getdata_pages', function(req, res, next) {

    conn.query('SELECT * FROM pages', (error, response) => {
            if (error) {
                console.log(error);
            } else {
                res.send(response)
            }
        })
        // list slide data
});

// show data_rating
router.get('/getdata_rating', function(req, res, next) {

    conn.query('SELECT * FROM rating', (error, response) => {
            if (error) {
                console.log(error);
            } else {
                return res.send(response)
            }
        })
        //list category data
});


// check rating vote json
var checkVote = path.join(__dirname, '../../src/Component/RatingStar/ratingCheckvote.json');
router.get('/checkvote', function(req, res) {
    fs.readFile(checkVote, function(err, data) {
        if (err) { /* Print error to console */ }
        // res.json(JSON.parse(data));
        res.send(data)
    });
});


router.post('/checkvote', function(req, res) {
    fs.readFile(checkVote, function(err, data) {
        var { email, idProduct, selectStar } = req.body;
        var flag = false,
            dataPush = new Array;
        // var pushIdProduct = new Array;

        //check tokenid ? pushvote: datapush.push(data)

        if (data.length !== 0) {
            dataPush = JSON.parse(data);
            var pushIdProduct = new Array;
            var pushStar = new Array;
            for (let i = 0; i < dataPush.length; i++) {
                if (dataPush[i].email === email) {
                    // push idproduct
                    pushIdProduct = dataPush[i].idProduct;
                    pushIdProduct.push(idProduct);
                    dataPush[i].idProduct = pushIdProduct
                        // push star
                    pushStar = dataPush[i].selectStar;
                    pushStar.push(selectStar);
                    dataPush[i].selectStar = pushStar
                    flag = true;
                }

            }
        }

        if (!flag) { //false
            var pushIdProduct = new Array;
            var pushStar = new Array;
            pushIdProduct.push(idProduct)
            pushStar.push(selectStar)
            var dataVote = {
                email: email,
                selectStar: pushStar,
                idProduct: pushIdProduct,
            }
            dataPush.push(dataVote)

        }
        // console.log(dataCheckOut);
        fs.writeFile(checkVote, JSON.stringify(dataPush, null, 4), function(err) {
            if (err) { /* Print error to console */ }
            res.send(dataPush)
        });
    });
});


router.get('/getdata_admin_member', function(req, res, next) {

    conn.query('SELECT * FROM admin_manager', (error, response) => {

            if (error) {
                console.log(error);
            } else {
                return res.send(response)
            }
        })
        // list login

});


// json file admin member login

var loginMemberJson = path.join(__dirname, '../../src/Component/adminManager/adminMember/PermissionLogin.json');
router.get('/login_member_json', function(req, res) {
    fs.readFile(loginMemberJson, function(err, data) {
        if (err) { /* Print error to console */ }
        // res.json(JSON.parse(data));
        res.send(data)
    });
});
//login member

router.post('/login_member_json', function(req, res) {
    fs.readFile(loginMemberJson, function(err, data) {
        var { id, permission, tokenId } = req.body;
        if (err) {
            console.log(err);
        } else {

            var dataMemberLogin = new Array;

            dataMemberLogin = {
                id: id,
                permission: permission,
                tokenId: tokenId,
            }
            fs.writeFile(loginMemberJson, JSON.stringify(dataMemberLogin, null, 4), function(err) {
                if (err) { /* Print error to console */ }
                res.send(dataMemberLogin)
            });

        }
    });
});


router.post('/login_admin_member', function(req, res, next) {

    conn.query('SELECT * FROM admin_manager', (error, response) => {


            // var hash = bcrypt.hashSync(password, 10);
            // password = hash;


            if (error) {
                console.log(error);
            } else {
                var { setData, password, username } = req.body;
                bcrypt.compare(password, setData.password, function(err, resIsLogin) {
                    // res === true
                    if (resIsLogin && (setData.username === username || username === setData.email)) {
                        var tokenId = jwt.sign({
                            id: setData.ID,

                        }, 'password')
                        return res.send({
                            id: setData.ID,
                            // status: true,
                            message: 'Đăng nhập thành công',
                            token: tokenId,
                            isLogin: true
                        })


                    } else {
                        return res.send({

                            // status: false,
                            message: 'Đăng nhập không thành công',
                            token: '',
                            isLogin: false
                        })
                    }

                });

                // console.log(dataValue);


            }
        })
        // list login jwt token

});
router.get('/account_customer', function(req, res, next) {

    conn.query('SELECT * FROM account_customer', (error, response) => {
            if (error) {
                console.log(error);
            } else {
                res.send(response)
            }
        })
        // list account_customer

});

//get rating
router.get('/getrating', function(req, res, next) {

    conn.query('SELECT * FROM rating', (error, response) => {
            if (error) {
                console.log(error);
            } else {
                res.send(response)
            }
        })
        //list product data
});


router.get('/add_product', function(req, res, next) {
    res.render('add_product', {})
});
router.post('/add_product', function(req, res, next) {

    // add all_product category
    var {
        id,
        productName,
        productAmount,
        productPrice,
        productComplatePrice,
        productDescribe,
        productImage,
        productCategory,
        productReducedPrice,
        productContent,
        productGuarantee,
        productCategoryCode,
        productTitle,
        productKeyword,
        dateTime,
        colors,
        productSizes,
        productStorageCapacity,
    } = req.body;
    conn.query("INSERT INTO all_product (id,productName,productAmount,productPrice,productComplatePrice,productDescribe,productImage," +
            "productCategory,productReducedPrice,productContent,productGuarantee,productCategoryCode,productTitle,productKeyword,firstDateTime,dateTime,colors,productSizes,productStorageCapacity) VALUES ('" +
            id + "','" + productName + "','" + productAmount + "', '" + productPrice + "','" + productComplatePrice + "','" + productDescribe + "','" + productImage +
            "','" + productCategory + "','" + productReducedPrice + "','" + productContent +
            "','" + productGuarantee + "','" + productCategoryCode + "','" + productTitle + "','" + productKeyword +
            "','" + dateTime + "','" + dateTime + "','" + colors + "','" + productSizes + "','" + productStorageCapacity + "')",
            (err, response) => {
                if (err) {

                    return res.send({
                        err: err,
                        status: false,
                        message: err,
                    });
                    // res.send(0); 
                } else {
                    return res.send({
                        status: true,
                        message: 'Thêm sản phẩm thành công!',
                        // fileNameInServer: product_image_list,
                    })
                }
            })
        // add rating
    var heart_like = 0,
        rating_star = 0,
        // point vote
        points_star = [0, 0, 0, 0, 0, 0],
        view = 0,
        buy = 0;
    conn.query("INSERT INTO rating (ID,heart_like, rating_star, points_star,view,buy) VALUES ('" +
        id + "','" + heart_like + "','" + rating_star + "','" + points_star + "'," + view + ",'" + buy + "')")

});
// add category
router.post('/add_category', function(req, res, next) {
    var { id, name, catalogs } = req.body;

    conn.query("INSERT INTO category (ID,name,catalog,total) VALUES ('" +
        id + "','" + name + "','" + catalogs + "')",
        (err, response) => {
            if (err) {
                res.send(err);

            } else {

                return res.send({
                    status: true,
                    // message: 'file add success',
                    // fileNameInServer: product_image_list,
                })
            }
        })
});
// add blog
router.post('/add_blog', function(req, res, next) {

    var { id, title, blogFileImage, content, catalog, company, painted, dateTime } = req.body

    conn.query("INSERT INTO blog (ID,title,painted,fileImage,content,catalog,company,dateTime,dateTimeFix,comment) VALUES ('" +
        id + "','" + title + "','" + painted + "','" + blogFileImage + "','" + content + "','" + catalog + "','" + company + "','" + dateTime + "','" + dateTime + "','" + 0 + "')",
        (err, response) => {
            if (err) {
                console.log(err);
                // res.send(0);
            } else {
                return res.send({
                    status: true,
                    message: 'file add success',
                    // fileNameInServer: product_image_list,
                })
            }
        })
});
// add blog
const imageUploader_blog = multer({ dest: '../public/admin/upload/news' }); // (**) // tao ra 1 thư mục chứa file or nếu có sẳn file chứa bỏ vào
router.post('/news', imageUploader_blog.single('news'), (req, res) => {
    const processedFileBlog = req.file || {}; // MULTER xử lý và gắn đối tượng FILE vào req
    //  console.log(processedFile);
    let orgName = processedFileBlog.originalname || ''; // Tên gốc trong máy tính của người upload
    orgName = orgName.trim().replace(/ /g, "-")
    const fullPathInServ = processedFileBlog.path; // Đường dẫn đầy đủ của file vừa đc upload lên server
    // Đổi tên của file vừa upload lên, vì multer đang đặt default ko có đuôi file
    // console.log(fullPathInServ);
    const newFullPath = `${fullPathInServ}-${orgName}`;
    fs.renameSync(fullPathInServ, newFullPath);
    res.send({
        status: true,
        message: 'file uploaded',
        fileNameInServer: newFullPath,
    })
});

// add video
router.post('/add_pages', function(req, res, next) {

    var { id, slideImage, checkedCategory, title, dataTime } = req.body

    conn.query("INSERT INTO pages (ID,slide_pages,category,title,dataTime) VALUES ('" +
        id + "','" + slideImage + "','" + checkedCategory + "','" + title + "','" + dataTime + "')",
        (err, response) => {
            if (err) {
                console.log(err);
                // res.send(0);
            } else {
                return res.send({
                    status: true,
                    message: 'file add success',
                    // fileNameInServer: product_image_list,
                })
            }
        })
});
// add upload slide pages
const uploader_pages = multer({ dest: '../public/admin/upload/pages' }); // (**) // tao ra 1 thư mục chứa file or nếu có sẳn file chứa bỏ vào
router.post('/page', uploader_pages.single('page'), (req, res) => {
    const processedFilePages = req.file || {}; // MULTER xử lý và gắn đối tượng FILE vào req
    //  console.log(processedFile);
    let orgName = processedFilePages.originalname || ''; // Tên gốc trong máy tính của người upload
    orgName = orgName.trim().replace(/ /g, "-")
    const fullPathInServ = processedFilePages.path; // Đường dẫn đầy đủ của file vừa đc upload lên server
    // Đổi tên của file vừa upload lên, vì multer đang đặt default ko có đuôi file

    const newFullPath = `${fullPathInServ}-${orgName}`;
    fs.renameSync(fullPathInServ, newFullPath);
    res.send({
        status: true,
        message: 'file uploaded',
        fileNameInServer: newFullPath,
    })
});


//add user-admin
router.post('/add_user', function(req, res, next) {
    var { id, name, username, password, email, permission, phone, address, code, dateTime } = req.body;

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    password = hash;
    // console.log(hash);

    conn.query("INSERT INTO admin_manager (ID,name,username,password,email,permission,phone,address,code,dateTime) VALUES ('" +
        id + "','" + name + "','" + username + "','" + password + "','" + email + "','" + permission + "'," + phone + ",'" + address + "','" + code + "','" + dateTime + "')",
        (err, response) => {
            if (err) {
                // res.send(err);
                // res.send(0);
                console.log(err);
            } else {

                return res.send({
                    status: true,
                    message: 'file add success'

                })
            }
        })
});

router.post('/support', function(req, res, next) {
    var { ID, name, email, dateTime, selectSupport, noteSupport, contactFileImage } = req.body;
    // console.log(name);
    conn.query("INSERT INTO support (ID,name,email,contact_image,category_support,content,datetime) VALUES ('" +
        ID + "','" + name + "','" + email + "','" + contactFileImage + "','" + selectSupport + "','" + noteSupport + "','" + dateTime + "')",
        (err, response) => {
            if (err) {
                res.send(err);
                // res.send(0);
                console.log(err);
            } else {

                return res.send({
                    status: true,
                    message: 'file add success'

                })
            }
        })
});
// add contact support 

const imageUploader_contact = multer({ dest: '../public/admin/upload/supportImage' }); // (**) // tao ra 1 thư mục chứa file or nếu có sẳn file chứa bỏ vào
router.post('/contactImage', imageUploader_contact.single('contactImage'), (req, res) => {
    const processedFile = req.file || {}; // MULTER xử lý và gắn đối tượng FILE vào req
    //  console.log(processedFile);
    let orgName = processedFile.originalname || ''; // Tên gốc trong máy tính của người upload
    orgName = orgName.trim().replace(/ /g, "-")
    const fullPathInServ = processedFile.path; // Đường dẫn đầy đủ của file vừa đc upload lên server
    // Đổi tên của file vừa upload lên, vì multer đang đặt default ko có đuôi file
    // console.log(fullPathInServ);
    const newFullPath = `${fullPathInServ}-${orgName}`;
    fs.renameSync(fullPathInServ, newFullPath);
    res.send({
        status: true,
        message: 'file uploaded',
        fileNameInServer: newFullPath,
    })
});


//add slide
router.post('/add_slide', function(req, res, next) {


    // product_image_list.push(req.body.product_image_list);
    var { id, slideImage, checkedCategory, title } = req.body;

    conn.query("INSERT INTO slide (ID,image_slide,category,title) VALUES ('" + id + "','" + slideImage + "','" + checkedCategory + "','" + title + "')",
        (err, response) => {
            if (err) {
                res.send(err);
                // res.send(0);
            } else {
                return res.send({
                    status: true,
                    message: 'file add success',
                    // fileNameInServer: product_image_list,
                })
            }
        })
});
// add slide
const imageUploader_slide = multer({ dest: '../public/admin/upload/slide' }); // (**) // tao ra 1 thư mục chứa file or nếu có sẳn file chứa bỏ vào
router.post('/slide', imageUploader_slide.single('slide'), (req, res) => {
    const processedFile = req.file || {}; // MULTER xử lý và gắn đối tượng FILE vào req
    //  console.log(processedFile);
    let orgName = processedFile.originalname || ''; // Tên gốc trong máy tính của người upload
    orgName = orgName.trim().replace(/ /g, "-")
    const fullPathInServ = processedFile.path; // Đường dẫn đầy đủ của file vừa đc upload lên server
    // Đổi tên của file vừa upload lên, vì multer đang đặt default ko có đuôi file
    // console.log(fullPathInServ);
    const newFullPath = `${fullPathInServ}-${orgName}`;
    fs.renameSync(fullPathInServ, newFullPath);
    res.send({
        status: true,
        message: 'file uploaded',
        fileNameInServer: newFullPath,
    })
});



// delete product

router.post('/delete_product', function(req, res, next) {
        var { productId } = req.body;

        conn.query('DELETE FROM all_product WHERE ID=  "' + productId + '" ', (error, response) => {
            if (error) {
                console.log(error);
            } else {
                res.send(response);
            }
        })
        conn.query('DELETE FROM rating WHERE ID=  "' + productId + '" ')
    })
    //delete category 
router.post('/delete_category', function(req, res, next) {
        var { ID } = req.body;

        conn.query('DELETE FROM category WHERE ID=  "' + ID + '" ', (error, response) => {
            if (error) {
                console.log(error);
            } else {
                res.send(response);
            }
        })
    })
    // delete pages
router.post('/delete_pages', function(req, res, next) {
        var { id } = req.body;

        conn.query('DELETE FROM pages WHERE ID=  "' + id + '" ', (error, response) => {
            if (error) {
                console.log(error);
            } else {
                res.send(response);
            }
        })

    })
    //delete slide
router.post('/delete_slide', function(req, res, next) {
        var { id } = req.body;

        conn.query('DELETE FROM slide WHERE ID=  "' + id + '" ', (error, response) => {
            if (error) {
                console.log(error);
            } else {
                res.send(response);
            }
        })
    })
    // delete blog 
router.post('/delete_blog', function(req, res, next) {
    var { id } = req.body;

    conn.query('DELETE FROM blog WHERE ID=  "' + id + '" ', (error, response) => {
        if (error) {
            console.log(error);
        } else {
            res.send(response);
        }
    })

})

// delete user_admin
router.post('/delete_admin_member', function(req, res, next) {
        var { ID } = req.body;
        conn.query('DELETE FROM admin_manager WHERE ID=  "' + ID + '" ', (error, response) => {
            if (error) {
                console.log(error);
            } else {
                res.send(response);
            }
        })
    })
    // delete acctount customer
router.post('/delete_account_customer', function(req, res, next) {
        var { ID } = req.body;
        conn.query('DELETE FROM account_customer WHERE ID=  "' + ID + '" ', (error, response) => {
            if (error) {
                console.log(error);
            } else {
                res.send(response);
            }
        })
    })
    //delete support
router.post('/deleteSupport', function(req, res, next) {
        var { idSupport } = req.body;
        conn.query('DELETE FROM support WHERE ID=  "' + idSupport + '" ', (error, response) => {
            if (error) {
                console.log(error);
            } else {
                res.send(response);
            }
        })
    })
    // update rating
router.post('/update_rating_star', function(req, res, next) {
    var { Id, selectStar, pointsStar } = req.body;

    var sql = "UPDATE rating set rating_star =?, points_star=? WHERE ID =?";
    conn.query(sql, [selectStar, pointsStar, Id], function(err, result) {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    })

})

// update rating view buy
router.post('/update_rating_view', function(req, res, next) {
    var { ID, view, buy } = req.body;
    view || view !== undefined ? view : 0
    buy || buy !== undefined ? buy : 0

    var sql = "UPDATE rating set view =?, buy=? WHERE ID =?";
    conn.query(sql, [view, buy, ID], function(err, result) {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    })

})

router.post('/edit_blog', function(req, res, next) {
        var { Id, title, painted, content, catalog, company, dateTimeFixt } = req.body;

        var sql = "UPDATE blog set title =?, painted=?, content=? , catalog=?, company=?, dateTime=? WHERE ID =?";
        conn.query(sql, [title, painted, content, catalog, company, dateTimeFixt, Id], function(err, result) {
            if (err) {
                res.send(err)
            } else {
                res.send(result)
            }
        })

    })
    // update view blog content
router.post('/updateViewsBlog', function(req, res, next) {
    var { views, idBLogContent } = req.body;

    var sql = "UPDATE blog set views=? WHERE ID =?";
    conn.query(sql, [views, idBLogContent], function(err, result) {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    })

})




//edit category
router.post('/edit_category', function(req, res, next) {
        var { ID, categoryName, catalog } = req.body;
        var codeCatalog = categoryName + "#" + catalog

        // { category } = req.body,
        // { total } = req.body;
        var sql = "UPDATE category set name =? ,catalog =?, codeCatalog=? WHERE ID =?";
        conn.query(sql, [categoryName, catalog, codeCatalog, ID], function(err, result) {
            if (err) {
                res.send(err)
            } else {
                res.send(result)
            }
        })

    })
    // edit adminMember
router.post('/edit_admin_member', function(req, res, next) {
        var { id, name, username, password, email, permission, phone, address, code, dateTimeFix } = req.body;
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password, salt);
        password = hash;
        var sql = "UPDATE admin_manager set name =? , username=? , password=? , email=? , permission=? , phone=? , address=? , code=? , dateTime=? WHERE ID =?";
        conn.query(sql, [name, username, password, email, permission, phone, address, code, dateTimeFix, id], function(err, result) {
            if (err) {
                res.send(err)
            } else {
                res.send(result)
            }
        })

    })
    // edit support
router.post('/edit_support', function(req, res, next) {
    var { ID, permission, block } = req.body;

    var sql = "UPDATE support set permission=? , block=? WHERE ID =?";
    conn.query(sql, [permission, block, ID], function(err, result) {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    })

})

//edit product
router.post('/edit_product', function(req, res, next) {

    // add all_product category
    var {
        id,
        productName,
        productAmount,
        productPrice,
        productComplatePrice,
        productDescribe,
        productImage,
        productCategory,
        productReducedPrice,
        productContent,
        productGuarantee,
        productCategoryCode,
        productTitle,
        productKeyword,
        dateTime,
        pushColors,
        productSizes,
        productStorageCapacity
    } = req.body;




    var sql = "UPDATE all_product set productName =? ,productAmount =? , productPrice =? , productComplatePrice=? , productDescribe =? ," +
        "productImage =? , productCategory =? , productReducedPrice =? , productContent =? , productGuarantee =? ," +
        "productCategoryCode =? , productTitle =? , productKeyword =? , dateTime =?, colors=?, productSizes=?, productStorageCapacity=?  WHERE id = ?";

    conn.query(sql, [productName, productAmount, productPrice, productComplatePrice, productDescribe, productImage, productCategory,
        productReducedPrice, productContent, productGuarantee, productCategoryCode, productTitle,
        productKeyword, dateTime, pushColors, productSizes, productStorageCapacity, id
    ], function(err, result) {
        // console.log("Record Updated!!");
        // console.log(result);
        if (err) {

            return res.send({
                err: err,
                status: false,
                message: err,
            });
            // res.send(0);
        } else {
            return res.send({
                status: true,
                message: 'Sửa thành công!',
                // fileNameInServer: product_image_list,
            })
        }
    });

})


// upload file product
var listImage = path.join(__dirname, '../../src/Component/adminManager/Product/ListImageProduct.json');
router.get('/updateListImage', function(req, res) {
    fs.readFile(listImage, function(err, data) {
        if (err) { /* Print error to console */ }
        // res.json(JSON.parse(data));
        res.send(data)
    });
});
router.post('/updateListImage', function(req, res) {
    fs.readFile(listImage, function(err, data) {

        var { id, listFileImage, isDeleteImageList = false } = req.body;
        // productId =fe2971f7-ca
        var dataListImage = JSON.parse(data);
        var dataFilImage = dataListImage.filter((item) => item.id !== id)

        if (err) { /* Print error to console */ }

        if (!isDeleteImageList) {
            var newDataListImage = {
                id: id,
                listFileImage: listFileImage,

            }
            dataFilImage.push(newDataListImage);
        }

        fs.writeFile(listImage, JSON.stringify(dataFilImage, null, 4), function(err) {
            if (err) { /* Print error to console */ }
            // res.json(comments);
            res.send(dataFilImage)
        });
    });
});

router.get('/:name', (req, res) => {
    const fileName = req.params.name;
    // console.log('fileName', fileName);
    if (!fileName) {
        return res.send({
            status: false,
            message: 'no filename specified',
        })
    }
    res.sendFile(path.resolve(`./public/images/${fileName}`));
});

module.exports = router;