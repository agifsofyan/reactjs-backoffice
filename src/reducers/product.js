import {
    GET_PRODUCTS,
    GET_PRODUCTS_FAIL,
    GET_PRODUCT_DETAIL,
    GET_PRODUCT_DETAIL_FAIL,
    ADD_PRODUCT,
    ADD_PRODUCT_FAIL,
    UPDATE_PRODUCT,
    UPDATE_PRODUCT_FAIL,
    DELETE_PRODUCT_MANY,
    DELETE_PRODUCT_MANY_FAIL
} from '../actions/types';

const INITIAL_STATE = {
    products: null,
    product: null,
    delete_product_many: null,
    error: null,
    setLoading: true
}

// const newProducts = [];

export default function (state = INITIAL_STATE, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_PRODUCTS:
            // merge count into product object
            // payload.map((item, i) => {
            //     Object.assign(item.product, item.count);
            //     delete item.count;
            // });
            Number.prototype.format = function(n, x) {
                var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
                return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&.');
            };
            
            payload.map(item => {
                // Details
                item.details = {}
                item.details.name = item.name ? item.name : ''
                item.details.slug = item.slug ? item.slug : ''
                item.details.code = item.code ? item.code : ''
                item.details.time_period = item.time_period ? item.time_period : 0
                item.details.topic = []
                item.topic.map(i => item.details.topic.push(i.name))
               
                // Price
                item.prices = {}
                item.prices.price = item.price ? item.price.format() : 0
                item.prices.sales_price = item.sales_price ? item.sales_price : 0

                // Status
                item.status = {}
                item.status.type = item.type ? item.type : ''
                item.status.visibility = item.visibility ? item.visibility : ''
                item.status.bump = item.bump.length == 0 ? 'Bump OFF' : 'Bump ON'
                item.status.inventory = item.type == 'ecommerce' ? item.ecommerce.stock : ''
            });
            return {
                ...state,
                products: payload,
                setLoading: false
            }
        case GET_PRODUCTS_FAIL:
            return {
                ...state,
                error: payload,
                setLoading: false
            }
        case GET_PRODUCT_DETAIL:
            return {
                ...state,
                product: payload,
                setLoading: false
            }
        case GET_PRODUCT_DETAIL_FAIL:
            return {
                ...state,
                error: payload,
                setLoading: false
            }
        case DELETE_PRODUCT_MANY:
            return {
                ...state,
                delete_product_many: payload,
                setLoading: false
            }
        case DELETE_PRODUCT_MANY_FAIL:
            return {
                ...state,
                error: payload,
                setLoading: false
            }
        case ADD_PRODUCT:
            return {
                ...state,
                product: payload,
                setLoading: false
            }
        case ADD_PRODUCT_FAIL:
            return {
                ...state,
                error: payload,
                setLoading: false
            }
        case UPDATE_PRODUCT:
            return {
                ...state,
                product: payload,
                setLoading: false
            }
        case UPDATE_PRODUCT_FAIL:
            return {
                ...state,
                error: payload,
                setLoading: false
            }
        default: return state;
    }
}