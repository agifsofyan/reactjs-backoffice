import {
    GET_IMAGES,
    GET_IMAGES_FAIL
} from './types';

import api from '../utils/api';

export const fetchImages = (path, val) => async dispatch => {
    try {
        const res = await api.get(`/uploads/media/list?fields=${path}&value=${val}`);
        dispatch({ type: GET_IMAGES, payload: res.data.data });
    } catch (error) {
        console.log(`[image.fetchImages] error: ${error}`);
        dispatch({ type: GET_IMAGES_FAIL, payload: error.response.data });
    }
}