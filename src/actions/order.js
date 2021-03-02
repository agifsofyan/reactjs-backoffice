import {
    GET_ORDERS,
    GET_ORDERS_FAIL
} from './types';

import api from '../utils/api';

export const fetchOrder = () => async dispatch => {
    try {
        const res = await api.get('/orders/list');
        dispatch({ type: GET_ORDERS, payload: res.data.data });
    } catch (error) {
        console.log(`[order.fetchOrder] error: ${error}`);
        dispatch({ type: GET_ORDERS_FAIL, payload: error.response.data });
    }
}