import {
    GET_FOLLOWUPS,
    GET_FOLLOWUPS_FAIL
} from './types';

import api from '../utils/api';

export const fetchFollowUps = () => async dispatch => {
    try {
        const res = await api.get('/followups');
        dispatch({ type: GET_FOLLOWUPS, payload: res.data.data });
    } catch (error) {
        console.log(`[followup.fetchFollowUps] error: ${error}`);
        dispatch({ type: GET_FOLLOWUPS_FAIL, payload: error.response.data });
    }
}