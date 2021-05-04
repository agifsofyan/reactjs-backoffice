import {
    GET_ORDERS,
    GET_ORDERS_FAIL,
    GET_ORDER_DETAIL,
    GET_ORDER_DETAIL_FAIL,
    GET_FOLLOWUPS,
    GET_FOLLOWUPS_FAIL,
    POST_FOLLOWUP,
    POST_FOLLOWUP_FAIL
} from './types';

import api from '../utils/api';

export const fetchOrders = () => async dispatch => {
    try {
        const res = await api.get('/orders/list');
        dispatch({ type: GET_ORDERS, payload: res.data.data });
    } catch (error) {
        console.log(`[order.fetchOrder] error: ${error}`);
        dispatch({ type: GET_ORDERS_FAIL, payload: error });
    }
}

export const fetchOrder = (id) => async dispatch => {
    try {
        const res = await api.get(`/orders/${id}/detail`);
        dispatch({ type: GET_ORDER_DETAIL, payload: res.data.data });
    } catch (error) {
        console.log(`[order.fetchOrder] error: ${error}`);
        dispatch({ type: GET_ORDER_DETAIL_FAIL, payload: error });
    }
}

export const fetchFollowUps = (id) => async dispatch => {
    try {
        const res = await api.get(`/followups/${id}`);
        dispatch({ type: GET_FOLLOWUPS, payload: res.data });
    } catch (error) {
        console.log(`[order.followUps] fetchFollowUps: ${error}`);
        dispatch({ type: GET_FOLLOWUPS_FAIL, payload: error });
    }
}

export const postFollowUp = (id, message) => async dispatch => {
    try {
        const res = await api.post(`/followups/${id}`, {message});
        res = await api.get('/orders/list');
        dispatch({ type: GET_ORDERS, payload: res.data.data });
        // dispatch({ type: GET_FOLLOWUPS, payload: res.data });
    } catch (error) {
        console.log(`[order.followUps] postFollowUp: ${error}`);
        dispatch({ type: GET_FOLLOWUPS_FAIL, payload: error });
    }
}