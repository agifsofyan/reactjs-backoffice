import {
    GET_ORDERS,
    GET_ORDERS_FAIL
} from '../actions/types';

const INITIAL_STATE = {
    orders: null,
    error: null,
    setLoading: true
}

export default function (state = INITIAL_STATE, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_ORDERS:
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
        default: return state;
    }
}