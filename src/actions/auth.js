import {
    ME,
    ME_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT
} from './types';

import api from '../utils/api';

export const me = () => async dispatch => {
    try {
        const res = await api.get('/admins/me');
        dispatch({ type: ME, payload: res.data.data });
    } catch (error) {
        console.log(`[auth.me] error: ${error}`);
        dispatch({ type: ME_ERROR });
    }
}

export const login = (data) => async dispatch => {
    try {
        const res = await api.post('/admins/login', data);
        dispatch({ type: LOGIN_SUCCESS, payload: res.data.result });
        dispatch(me());
    } catch (error) {
        console.log(`[auth.login] error: ${error.response.data.message}`);
        dispatch({ type: LOGIN_FAIL, payload: error.response.data });
    }
}

export const logout = () => dispatch => {
    dispatch({ type: LOGOUT });
}