import {
    GET_COUPONS,
    GET_COUPONS_FAIL,
    DELETE_COUPON,
    DELETE_COUPON_FAIL,
    DELETE_COUPON_MANY,
    DELETE_COUPON_MANY_FAIL
} from './types';

import api from '../utils/api';

export const fetchCoupon = () => async dispatch => {
    try {
        const res = await api.get('/coupons');
        dispatch({ type: GET_COUPONS, payload: res.data.data });
    } catch (error) {
        console.log(`[coupon.fetchCoupon] error: ${error}`);
        dispatch({ type: GET_COUPONS_FAIL, payload: error.response.data });
    }
}

export const deleteOneCoupon = (id) => async dispatch => {
    try {
        const res = await api.delete('/coupons', {
            params: {
                id
            }
        });
        dispatch({ type: DELETE_COUPON, payload: res.data });
    } catch (error) {
        console.log(`[coupon.deleteOneCoupon] error: ${error}`);
        dispatch({ type: DELETE_COUPON_FAIL, payload: error.response.data });
    }
}

export const deleteManyCoupon = (ids) => async dispatch => {
    const data = { id: ids }
    try {
        const res = await api.delete('/coupons/delete/multiple', { data });
        dispatch({ type: DELETE_COUPON_MANY, payload: res.data });
    } catch (error) {
        console.log(`[coupon.deleteManyCoupon] error: ${error}`);
        dispatch({ type: DELETE_COUPON_MANY_FAIL, payload: error.response.data });
    }
}