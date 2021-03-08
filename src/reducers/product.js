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
            // payload.map(item => {
            //     newProducts.push(item.product);
            // });
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