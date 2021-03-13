import {
    GET_ORDERS,
    GET_ORDERS_FAIL,
    GET_ORDER_DETAIL,
    GET_ORDER_DETAIL_FAIL
} from './types';

import api from '../utils/api';

export const fetchOrders = () => async dispatch => {
    try {
        const res = await api.get('/orders/list');
        dispatch({ type: GET_ORDERS, payload: res.data.data });
    } catch (error) {
        console.log(`[order.fetchOrder] error: ${error}`);
        dispatch({ type: GET_ORDERS_FAIL, payload: error.response.data });
    }
}

export const fetchOrder = (id) => async dispatch => {
    try {
        const res = await api.get(`/orders/${id}/detail`);
        dispatch({ type: GET_ORDER_DETAIL, payload: res.data.data });
    } catch (error) {
        console.log(`[order.fetchOrder] error: ${error}`);
        dispatch({ type: GET_ORDER_DETAIL_FAIL, payload: error.response.data });
    }
}