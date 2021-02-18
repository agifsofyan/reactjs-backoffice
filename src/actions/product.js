import {
    GET_PRODUCTS,
    GET_PRODUCTS_FAIL,
    DELETE_PRODUCT,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_MANY,
    DELETE_PRODUCT_MANY_FAIL
} from './types';

import api from '../utils/api';

export const fetch = () => async dispatch => {
    try {
        const res = await api.get('/products/list/count');
        dispatch({ type: GET_PRODUCTS, payload: res.data.data });
    } catch (error) {
        console.log(`[product.fetch] error: ${error}`);
        dispatch({ type: GET_PRODUCTS_FAIL, payload: error.response.data });
    }
}

export const deleteOne = (id) => async dispatch => {
    try {
        const res = await api.delete('/products', {
            params: {
                id
            }
        });
        dispatch({ type: DELETE_PRODUCT, payload: res.data });
    } catch (error) {
        console.log(`[product.deleteOne] error: ${error}`);
        dispatch({ type: DELETE_PRODUCT_FAIL, payload: error.response.data });
    }
}

export const deleteMany = (ids) => async dispatch => {
    const data = { id: ids }
    try {
        const res = await api.delete('/products/delete/multiple', data);
        dispatch({ type: DELETE_PRODUCT_MANY, payload: res.data });
    } catch (error) {
        console.log(`[product.deleteMany] error: ${error}`);
        dispatch({ type: DELETE_PRODUCT_MANY_FAIL, payload: error.response.data });
    }
}