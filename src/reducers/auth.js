import {
    ME,
    ME_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT
} from '../actions/types';

const INITIAL_STATE = {
    token: localStorage.getItem('token'),
    is_authenticated: null,
    user: null,
    error: null,
    setLoading: true
}

export default function (state = INITIAL_STATE, action) {
    const { type, payload } = action;

    switch (type) {
        case ME:
            return {
                ...state,
                is_authenticated: true,
                user: payload,
                setLoading: false
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.accessToken);
            return {
                ...state,
                ...payload,
                is_authenticated: true,
                setLoading: false
            }
        case LOGIN_FAIL:
            return {
                ...state,
                error: payload,
                setLoading: false
            }
        case ME_ERROR:
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                is_authenticated: false,
                user: null,
                setLoading: false
            }
        default: return state;
    }
}