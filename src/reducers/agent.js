import {
    GET_AGENTS,
    GET_AGENTS_FAIL
} from '../actions/types';

const INITIAL_STATE = {
    agents: null,
    error: null,
    setLoading: true
}

export default function (state = INITIAL_STATE, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_AGENTS:
            return {
                ...state,
                agents: payload,
                setLoading: false
            }
        case GET_AGENTS_FAIL:
            return {
                ...state,
                error: payload,
                setLoading: false
            }
        default: return state;
    }
}