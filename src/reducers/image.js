import {
    GET_IMAGES,
    GET_IMAGES_FAIL,
} from '../actions/types';

const INITIAL_STATE = {
    images: null,
    error: null,
    setLoading: true
}

export default function (state = INITIAL_STATE, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_IMAGES:
            return {
                ...state,
                images: payload,
                setLoading: false
            }
        case GET_IMAGES_FAIL:
            return {
                ...state,
                error: payload,
                setLoading: false
            }
        default: return state;
    }
}