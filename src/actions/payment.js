import {
    GET_PAYMENTS_COUNT,
    GET_PAYMENTS_COUNT_FAIL,
    DELETE_PAYMENT,
    DELETE_PAYMENT_FAIL,
    DELETE_PAYMENT_MANY,
    DELETE_PAYMENT_MANY_FAIL
} from './types';

import api from '../utils/api';

export const fetchPaymentCount = () => async dispatch => {
    try {
        const res = await api.get('/payments/method/list/count');
        dispatch({ type: GET_PAYMENTS_COUNT, payload: res.data.data });
    } catch (error) {
        console.log(`[payment.fetchPaymentCount] error: ${error}`);
        dispatch({ type: GET_PAYMENTS_COUNT_FAIL, payload: error.response.data });
    }
}

export const deleteOnePayment = (id) => async dispatch => {
    try {
        const res = await api.delete('/payments/method', {
            params: {
                id
            }
        });
        dispatch({ type: DELETE_PAYMENT, payload: res.data });
    } catch (error) {
        console.log(`[payment.deleteOnePayment] error: ${error}`);
        dispatch({ type: DELETE_PAYMENT_FAIL, payload: error.response.data });
    }
}

export const deleteManyPayment = (ids) => async dispatch => {
    const data = { id: ids }
    try {
        const res = await api.delete('/payments/method/delete/multiple', { data });
        dispatch({ type: DELETE_PAYMENT_MANY, payload: res.data });
    } catch (error) {
        console.log(`[payment.deleteManyPayment] error: ${error}`);
        dispatch({ type: DELETE_PAYMENT_MANY_FAIL, payload: error.response.data });
    }
}