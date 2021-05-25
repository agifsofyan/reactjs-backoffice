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
} from './types';

import api from '../utils/api';

export const fetchOrders = () => async dispatch => {
    try {
        const res = await api.get('/orders/list');
        dispatch({ type: GET_ORDERS, payload: res && res.data && res.data.data });
    } catch (error) {
        console.log(`[order.fetchOrder] error: ${error}`);
        dispatch({ type: GET_ORDERS_FAIL, payload: error });
    }
}

export const fetchOrder = (id) => async dispatch => {
    try {
        const res = await api.get(`/orders/${id}/detail`);
        dispatch({ type: GET_ORDER_DETAIL, payload: res && res.data && res.data.data });
    } catch (error) {
        console.log(`[order.fetchOrder] error: ${error}`);
        dispatch({ type: GET_ORDER_DETAIL_FAIL, payload: error });
    }
}
// https://api.laruno.id/api/v1/orders/60a36130f0b192001c2e05e5?status=PENDING

export const putOrders = (id) => async dispatch => {
    try {
        await api.put('/orders/' + id + '?status=PAID');
        const res = await api.get('/orders/list');
        dispatch({ type: GET_ORDERS, payload: res && res.data && res.data.data });
    } catch (error) {
        console.log(`[order.fetchOrder] error: ${error}`);
        dispatch({ type: GET_ORDERS_FAIL, payload: error });
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

export const putFollowUpsSetTemplate = (id, template, nomor) => async dispatch => {
    try {
        await api.put(`/followups/set-template?title=followup` + nomor, {template});
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
        dispatch({ type: GET_ORDERS, payload: res && res.data && res.data.data });
        // dispatch({ type: GET_FOLLOWUPS, payload: res.data });
    } catch (error) {
        console.log(`[order.followUps] postFollowUp: ${error}`);
        dispatch({ type: GET_FOLLOWUPS_FAIL, payload: error });
    }
}

export const putTransferConfirms = (invoice_number) => async dispatch => {
    try {
        const res2 = await api.put('/transfer_confirms/' + invoice_number);
        try {
            const res = await api.get('/orders/list');
            dispatch({ type: GET_ORDERS, payload: res && res.data && res.data.data });
        } catch (error) {
            console.log(`[order.fetchOrder] error: ${error}`);
            dispatch({ type: GET_ORDERS_FAIL, payload: error });
        }
    } catch (error) {
        console.log(`[payment.deleteManyPayment] error: ${error}`);
        dispatch({ type: PUT_TRANSFER_CONFIRMS_FAIL, payload: error.response.data });
    }
}

export const putOrdersAddBonus = (invoice_number, body) => async dispatch => {
    try {
        const res2 = await api.put(`/orders/${invoice_number}/add-bonus`, body);
        try {
            const res = await api.get('/orders/list');
            dispatch({ type: GET_ORDERS, payload: res && res.data && res.data.data });
        } catch (error) {
            console.log(`[order.fetchOrder] error: ${error}`);
            dispatch({ type: GET_ORDERS_FAIL, payload: error });
        }
    } catch (error) {
        console.log(`[payment.deleteManyPayment] error: ${error}`);
    }
}