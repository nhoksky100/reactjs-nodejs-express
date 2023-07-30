
//import EditContent from './Component/EditContent';
var redux = require('redux');
const noteInitialState = {
    path: '',
    status_show_item: true,
    item_value: '',
    status_product: false, // hide show,
    status_login: false,
    img_number_cart: 'none',
    count_product: 0,
    //cart

    cart_product: [],
    total_price_cart: 0,
    cart_status: false,
    cart_remove: [],
    cart_add_status: false,

    cart_remove_status: false,
    //search
    select_search: [],
    search_value: [], // edit
    search_value_status: false,
    //star
    star_status: false,
    //customer
    status_update_data_customer: false,
    dateParent: false,
    //checkout
    senDataCheckout: [],
    statuCartCheckout: false,
    statusCloseCart: false,
    //order details  admin
    dataDetailsOrder: [],
    //comment
    comment: [],
    commentStatus: false,
    commentChild: [],
    commentStatusChild: false,
    closeComment: false,
    isUpdateDataComment:false,
    dataUpdateCommentChild:[],
    dataUpdateCommentParent:[],
    // support
    dataSupportReply: [],
    // sorting by name
    valSortName: '',
    // more comment child
    commentChildMore: 0,
    // emoji
    iconEmoji: [],
    // currencyRate
    currencyRate: 0,
    currencyCode: '',
    currencyDefault:'',
    // sear datetime
    dateTimeStart:'',
    dateTimeEnd:new Date(),
    // languageValue
    languageValue:0,
    // isAppShow | not page 404
    isNotPage:true

}
const Allrecuder = (state = noteInitialState, action) => {

    switch (action.type) {
        // admin manager  
        case 'Status_product':

            return { ...state, status_show_item: action.action_status }
        case 'Item_product':
            return { ...state, item_value: action.item_value }
        case 'is_status_show_product':
            return { ...state, status_product: !state.status_product }
        case 'dataSupport':
            return { ...state, dataSupportReply: action.act_data_support }

        // checkout
        // order details /admin
        case 'status_updateCart_Checkout': // --> cartProduct <---> ViewFullCartCheckout
            return { ...state, statuCartCheckout: action.act_statusCartCheckout }
        case 'statusclosecart': // --> cartProduct <---> ViewFullCartCheckout
            return { ...state, statusCloseCart: action.act_status_close_cart }
        case 'dataOrderDetails':
            return { ...state, dataDetailsOrder: action.act_dataOrder }
        case 'datacheckout':
            return { ...state, senDataCheckout: action.act_data_checkout }

        //cart
        case 'is_status_login':

            return { ...state, status_login: action.log_customer_act }
        case 'cart_animate_number':
            return { ...state, img_number_cart: action.cart_ac }
        // case 'cart_animate_count':
        //     return { ...state, count_product: action.cart_count }
        case 'price_product_cart':
            return { ...state, total_price_cart: action.cart_price }
        case 'product_cart':
            return { ...state, cart_product: action.cart_product_ac }
        case 'cart_status':
            return { ...state, cart_status: action.cart_status }
        case 'cart_add_status':
            return { ...state, cart_add_status: action.cart_add_status }
        case 'cart_remove':
            return { ...state, cart_remove: action.cart_remove }
        case 'cart_remove_status':
            return { ...state, cart_remove_status: action.cart_remove_status }
        //search
        case 'select_search':
            return { ...state, select_search: action.Search_act }
        case 'search_value_status':
            return { ...state, search_value_status: action.Search_value_status_ac }
        case 'search_value':
            return { ...state, search_value: action.Search_value_ac }
        //star
        case 'star_status':
            return { ...state, star_status: action.act_status_star }
        //customer
        case 'update_data_customer':
            return { ...state, status_update_data_customer: action.act_status }
        //comment
        case 'comment':
            return { ...state, comment: action.act_comment }
        case 'comment_status':
            return { ...state, commentStatus: action.act_status_comment }
        case 'commentchild':
            return { ...state, commentChild: action.act_comment_child }
        case 'commentchild_status':
            return { ...state, commentStatusChild: action.act_status_comment_child }
        case 'commentchildmore':
            return { ...state, commentChildMore: action.act_comment_child_more }
        case 'close_comment':
            return { ...state, closeComment: action.act_status_close }
        case 'statusUpdateComment':
            return { ...state, isUpdateDataComment: action.act_status_dataComment }
        case 'dataUpdateCommentChild':
            return { ...state, dataUpdateCommentChild: action.act_dataCommentUpdateChild }
        case 'dataUpdateCommentParent':
            return { ...state, dataUpdateCommentParent: action.act_dataCommentUpdateParent }
        // store sorting name
        case 'valueSorttingName':
            return { ...state, valSortName: action.value_action }
        // emoji
        case 'iconemoji':
            return { ...state, iconEmoji: action.ac_emoji }
        // currency rate
        case 'currencyRate':
            return { ...state, currencyRate: action.ac_currencyRate}
        case 'currencyDefault':
            return { ...state, currencyDefault: action.ac_currencyDefault}
            // search datetime
        case 'search_datetime_start':
            return { ...state, dateTimeStart: action.act_search_datetime}
        case 'search_datetime_end':
            return { ...state, dateTimeEnd: action.act_search_datetime}
            // languageValue
        case 'languageValue':
            return { ...state, languageValue: action.ac_language}
            // is no page 404
        case 'isAppShow':
            return { ...state, isNotPage: action.ac_isApp}
        default:
            return state
    }
}

var store = redux.createStore(Allrecuder);
// store.subscribe(function(){
//     console.log(JSON.stringify(store.getState()));

// })
export default store;