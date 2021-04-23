import {
    GET_CONTENTS,
    GET_CONTENTS_FAIL,
    GET_ORDER_DETAIL,
    GET_ORDER_DETAIL_FAIL
} from './types';

import api from '../utils/api';

export const fetchContents = () => async dispatch => {
    try {
        const res = await api.get('/contents');
        dispatch({ type: GET_CONTENTS, payload: res && res.data && res.data.data });
    } catch (error) {
        console.log(`[order.fetchContents] error: ${error}`);
        dispatch({ type: GET_CONTENTS_FAIL, payload: error });
    }
}

export const fetchContent = (id) => async dispatch => {
    try {
        const res = await api.get(`/contents/${id}`);
        dispatch({ type: GET_ORDER_DETAIL, payload: res.data.data });
    } catch (error) {
        console.log(`[order.fetchContent] error: ${error}`);
        dispatch({ type: GET_ORDER_DETAIL_FAIL, payload: error });
    }
}