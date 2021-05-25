import {
    GET_ORDERS,
    GET_ORDERS_FAIL,
    GET_ORDER_DETAIL,
    GET_ORDER_DETAIL_FAIL,
    GET_FOLLOWUPS,
    GET_FOLLOWUPS_FAIL,
    POST_FOLLOWUP,
    POST_FOLLOWUP_FAIL,
    PUT_TRANSFER_CONFIRMS,
    PUT_TRANSFER_CONFIRMS_FAIL
} from '../actions/types';

const INITIAL_STATE = {
    orders: null,
    order: null,
    followups: null,
    error: null,
    setLoading: true
}

export default function (state = INITIAL_STATE, action) {
    const { type, payload } = action;
    let subtotal = 0

    switch (type) {
        case GET_ORDERS:
            payload.map(item => {
                // Details
                item.details = item

                subtotal = 0
                item.items.map(row => {
                    subtotal += row.product_info.sale_price
                })
                item.grand_total = subtotal
            });
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
        case GET_FOLLOWUPS:
            return {
                ...state,
                followups: payload,
                setLoading: false
            }
        case GET_FOLLOWUPS_FAIL:
            return {
                ...state,
                error: payload,
                setLoading: false
            }
        default: return state;
    }
}