import {
    GET_ROLES,
    GET_ROLES_FAIL
} from '../actions/types';

const INITIAL_STATE = {
    roles: null,
    error: null,
    setLoading: true
}

const newRoles = []

export default function (state = INITIAL_STATE, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_ROLES:
            // merge count into topic object
            payload.map((item, i) => {
                Object.assign(item.role, item.count);
                delete item.count;
            });
            payload.map(item => {
                newRoles.push(item.role);
            });
            return {
                ...state,
                roles: newRoles,
                setLoading: false
            }
        case GET_ROLES_FAIL:
            return {
                ...state,
                error: payload,
                setLoading: false
            }
        default: return state;
    }
}