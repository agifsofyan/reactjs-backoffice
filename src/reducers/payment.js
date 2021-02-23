import {
    GET_PAYMENTS_COUNT,
    GET_PAYMENTS_COUNT_FAIL,
    DELETE_PAYMENT_MANY,
    DELETE_PAYMENT_MANY_FAIL
} from '../actions/types';

const INITIAL_STATE = {
    payment_methods: null,
    delete_payment_many: null,
    error: null,
    setLoading: true
}

const newPaymentsCount = []

export default function (state = INITIAL_STATE, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_PAYMENTS_COUNT:
            // merge count into payment_method object
            payload.map((item, i) => {
                Object.assign(item.payment_method, item.count);
                delete item.count;
            });
            payload.map(item => {
                newPaymentsCount.push(item.payment_method);
            });
            return {
                ...state,
                payment_methods: newPaymentsCount,
                setLoading: false
            }
        case GET_PAYMENTS_COUNT_FAIL:
            return {
                ...state,
                error: payload,
                setLoading: false
            }
        case DELETE_PAYMENT_MANY:
            return {
                ...state,
                delete_payment_many: payload,
                setLoading: false
            }
        case DELETE_PAYMENT_MANY_FAIL:
            return {
                ...state,
                error: payload,
                setLoading: false
            }
        default: return state;
    }
}