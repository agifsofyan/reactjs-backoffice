import {
    GET_ADMINS,
    GET_ADMINS_FAIL,
    DELETE_ADMIN,
    DELETE_ADMIN_FAIL,
    DELETE_ADMIN_MANY,
    DELETE_ADMIN_MANY_FAIL
} from './types';

import api from '../utils/api';

export const fetchAdmin = () => async dispatch => {
    try {
        const res = await api.get('/admins');
        dispatch({ type: GET_ADMINS, payload: res.data.data });
    } catch (error) {
        console.log(`[admin.fetchAdmin] error: ${error}`);
        dispatch({ type: GET_ADMINS_FAIL, payload: error.response.data });
    }
}

export const deleteOneAdmin = (id) => async dispatch => {
    try {
        const res = await api.delete(`/admins/${id}/delete`);
        dispatch({ type: DELETE_ADMIN, payload: res.data });
    } catch (error) {
        console.log(`[admin.deleteOneAdmin] error: ${error}`);
        dispatch({ type: DELETE_ADMIN_FAIL, payload: error.response.data });
    }
}

export const deleteManyAdmin = (ids) => async dispatch => {
    const data = { id: ids }
    try {
        const res = await api.delete('/admins/delete/multiple', { data });
        dispatch({ type: DELETE_ADMIN_MANY, payload: res.data });
    } catch (error) {
        console.log(`[admin.deleteManyAdmin] error: ${error}`);
        dispatch({ type: DELETE_ADMIN_MANY_FAIL, payload: error.response.data });
    }
}