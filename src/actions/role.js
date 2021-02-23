import {
    GET_ROLES,
    GET_ROLES_FAIL
} from './types';

import api from '../utils/api';

export const fetchRole = () => async dispatch => {
    try {
        const res = await api.get('/roles');
        dispatch({ type: GET_ROLES, payload: res.data.data });
    } catch (error) {
        console.log(`[role.fetchRole] error: ${error}`);
        dispatch({ type: GET_ROLES_FAIL, payload: error.response.data });
    }
}