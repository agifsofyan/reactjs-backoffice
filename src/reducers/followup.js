import {
    GET_FOLLOWUPS,
    GET_FOLLOWUPS_FAIL
} from '../actions/types';

const INITIAL_STATE = {
    followups: null,
    error: null,
    setLoading: true
}

export default function (state = INITIAL_STATE, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_FOLLOWUPS:
            return {
                ...state,
                followups: payload,
                setLoading: false
            }
        case GET_FOLLOWUPS_FAIL:
            return {
                ...state,
                error: payload,
                setLoading: false
            }
        default: return state;
    }
}