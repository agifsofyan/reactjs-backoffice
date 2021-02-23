import {
    GET_TOPICS,
    GET_TOPICS_COUNT,
    GET_TOPICS_COUNT_FAIL,
    GET_TOPICS_FAIL,
    DELETE_TOPIC_MANY,
    DELETE_TOPIC_MANY_FAIL
} from '../actions/types';

const INITIAL_STATE = {
    topics: null,
    topic_list: null,
    delete_topic_many: null,
    error: null,
    setLoading: true
}

const newTopicsCount = []

export default function (state = INITIAL_STATE, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_TOPICS:
            return {
                ...state,
                topics: payload,
                setLoading: false
            }
        case GET_TOPICS_FAIL:
            return {
                ...state,
                error: payload,
                setLoading: false
            }
        case GET_TOPICS_COUNT:
            // merge count into topic object
            payload.map((item, i) => {
                Object.assign(item.topic, item.count);
                delete item.count;
            });
            payload.map(item => {
                newTopicsCount.push(item.topic);
            });
            return {
                ...state,
                topic_list: newTopicsCount,
                setLoading: false
            }
        case GET_TOPICS_COUNT_FAIL:
            return {
                ...state,
                error: payload,
                setLoading: false
            }
        case DELETE_TOPIC_MANY:
            return {
                ...state,
                delete_topic_many: payload,
                setLoading: false
            }
        case DELETE_TOPIC_MANY_FAIL:
            return {
                ...state,
                error: payload,
                setLoading: false
            }
        default: return state;
    }
}