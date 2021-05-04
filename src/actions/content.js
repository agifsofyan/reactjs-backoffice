import {
    GET_CONTENTS,
    GET_CONTENTS_FAIL,
    GET_CONTENT_DETAIL,
    GET_CONTENT_DETAIL_FAIL,
    ADD_CONTENT,
    ADD_CONTENT_FAIL
} from './types';
import Swal from 'sweetalert2';

import api from '../utils/api';

const Toast = Swal.mixin({
    toast: true,
    position: 'bottom',
    showCloseButton: true,
    showConfirmButton: false
});

export const fetchContents = () => async dispatch => {
    try {
        const res = await api.get('/contents');
        dispatch({ type: GET_CONTENTS, payload: res && res.data && res.data.data });
    } catch (error) {
        console.log(`[content.fetchContents] error: ${error}`);
        dispatch({ type: GET_CONTENTS_FAIL, payload: error });
    }
}

export const fetchContent = (id) => async dispatch => {
    try {
        const res = await api.get(`/contents/${id}`);
        dispatch({ type: GET_CONTENT_DETAIL, payload: res.data });
    } catch (error) {
        console.log(`[content.fetchContent] error: ${error}`);
        dispatch({ type: GET_CONTENT_DETAIL_FAIL, payload: error });
    }
}

export const addContent = (form, type = 'fulfillment') => async dispatch => {
    try {
        let _type = type || 'fulfillment';
        const res = await api.post('/contents/v2/' + _type, JSON.stringify(form));
        dispatch({ type: ADD_CONTENT, payload: res.data });
    } catch (error) {
        Toast.fire({
            icon: 'error',
            title: error.response.data.message[0]
        });
        dispatch({ type: ADD_CONTENT_FAIL, payload: error.response.data });
    }
}