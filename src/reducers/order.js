import {
    GET_ORDERS,
    GET_ORDERS_FAIL,
    GET_ORDER_DETAIL,
    GET_ORDER_DETAIL_FAIL
} from '../actions/types';

const INITIAL_STATE = {
    orders: null,
    order: null,
    error: null,
    setLoading: true
}

export default function (state = INITIAL_STATE, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_ORDERS:
            // // Price
            // item.prices = {}
            // item.prices.price = item.price ? item.price.format() : 0
            // item.prices.sales_price = item.sales_price ? item.sales_price : 0
            return {
                ...state,
                orders: payload,
                setLoading: false
            }
        case GET_ORDERS_FAIL:
            return {
                ...state,
                error: payload,
                setLoading: false
            }
        case GET_ORDER_DETAIL:
            return {
                ...state,
                order: payload,
                setLoading: false
            }
        case GET_ORDER_DETAIL_FAIL:
            return {
                ...state,
                error: payload,
                setLoading: false
            }
        default: return state;
    }
}