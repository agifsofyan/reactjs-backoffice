import {
    GET_COUPONS,
    GET_COUPONS_FAIL,
    DELETE_COUPON_MANY,
    DELETE_COUPON_MANY_FAIL
} from '../actions/types';

const INITIAL_STATE = {
    coupons: null,
    delete_coupon_many: null,
    error: null,
    setLoading: true
}

export default function (state = INITIAL_STATE, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_COUPONS:
            return {
                ...state,
                coupons: payload,
                setLoading: false
            }
        case GET_COUPONS_FAIL:
            return {
                ...state,
                error: payload,
                setLoading: false
            }
        case DELETE_COUPON_MANY:
            return {
                ...state,
                delete_coupon_many: payload,
                setLoading: false
            }
        case DELETE_COUPON_MANY_FAIL:
            return {
                ...state,
                error: payload,
                setLoading: false
            }
        default: return state;
    }
}