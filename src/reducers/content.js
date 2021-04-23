import {
    GET_CONTENTS,
    GET_CONTENTS_FAIL,
    GET_CONTENT_DETAIL,
    GET_CONTENT_DETAIL_FAIL
} from '../actions/types';

const INITIAL_STATE = {
    contents: null,
    content: null,
    error: null,
    setLoading: true
}

export default function (state = INITIAL_STATE, action) {
    const { type, payload } = action;
    console.log('action',action)

    switch (type) {
        case GET_CONTENTS:
            return {
                ...state,
                contents: payload,
                setLoading: false
            }
        case GET_CONTENTS_FAIL:
            return {
                ...state,
                error: payload,
                setLoading: false
            }
        case GET_CONTENT_DETAIL:
            return {
                ...state,
                content: payload,
                setLoading: false
            }
        case GET_CONTENT_DETAIL_FAIL:
            return {
                ...state,
                error: payload,
                setLoading: false
            }
        default: return state;
    }
}