import {
    GET_TOPICS,
    GET_TOPICS_COUNT,
    GET_TOPICS_COUNT_FAIL,
    GET_TOPICS_FAIL,
    DELETE_TOPIC,
    DELETE_TOPIC_FAIL,
    DELETE_TOPIC_MANY,
    DELETE_TOPIC_MANY_FAIL
} from './types';

import api from '../utils/api';

export const fetchTopic = () => async dispatch => {
    try {
        const res = await api.get('/topics');
        dispatch({ type: GET_TOPICS, payload: res && res.data && res.data.data });
    } catch (error) {
        console.log(`[topic.fetchTopic] error: ${error}`);
        dispatch({ type: GET_TOPICS_FAIL, payload: error && error.response && error.response.data });
    }
}

export const fetchTopicCount = () => async dispatch => {
    try {
        const res = await api.get('/topics/list/count');
        dispatch({ type: GET_TOPICS_COUNT, payload: res && res.data && res.data.data });
    } catch (error) {
        console.log(`[topic.fetchTopicCount] error: ${error}`);
        dispatch({ type: GET_TOPICS_COUNT_FAIL, payload: error && error.response && error.response.data });
    }
}

export const deleteOneTopic = (id) => async dispatch => {
    try {
        const res = await api.delete('/topics', {
            params: {
                id
            }
        });
        dispatch({ type: DELETE_TOPIC, payload: res.data });
    } catch (error) {
        console.log(`[topic.deleteOneTopic] error: ${error}`);
        dispatch({ type: DELETE_TOPIC_FAIL, payload: error && error.response && error.response.data });
    }
}

export const deleteManyTopic = (ids) => async dispatch => {
    const data = { id: ids }
    try {
        const res = await api.delete('/topics/delete/multiple', { data });
        dispatch({ type: DELETE_TOPIC_MANY, payload: res.data });
    } catch (error) {
        console.log(`[topic.deleteManyTopic] error: ${error}`);
        dispatch({ type: DELETE_TOPIC_MANY_FAIL, payload: error && error.response && error.response.data });
    }
}