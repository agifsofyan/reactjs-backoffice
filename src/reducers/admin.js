import {
    GET_ADMINS,
    GET_ADMINS_FAIL,
    DELETE_ADMIN_MANY,
    DELETE_ADMIN_MANY_FAIL
} from '../actions/types';

const INITIAL_STATE = {
    admins: null,
    delete_admin_many: null,
    error: null,
    setLoading: true
}

export default function (state = INITIAL_STATE, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_ADMINS:
            return {
                ...state,
                admins: payload,
                setLoading: false
            }
        case GET_ADMINS_FAIL:
            return {
                ...state,
                error: payload,
                setLoading: false
            }
        case DELETE_ADMIN_MANY:
            return {
                ...state,
                delete_admin_many: payload,
                setLoading: false
            }
        case DELETE_ADMIN_MANY_FAIL:
            return {
                ...state,
                error: payload,
                setLoading: false
            }
        default: return state;
    }
}