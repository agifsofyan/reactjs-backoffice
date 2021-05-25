import {
    GET_AGENTS,
    GET_AGENTS_FAIL
} from './types';

import api from '../utils/api';

export const fetchAgent = () => async dispatch => {
    try {
        const res = await api.get('/agents');
        dispatch({ type: GET_AGENTS, payload: res && res.data && res.data.data });
    } catch (error) {
        console.log(`[agent.fetchAgent] error: ${error}`);
        dispatch({ type: GET_AGENTS_FAIL, payload: error && error.response && error.response.data });
    }
}