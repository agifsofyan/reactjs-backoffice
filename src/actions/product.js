import {
    GET_PRODUCTS,
    GET_PRODUCTS_FAIL,
    DELETE_PRODUCT,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_MANY,
    DELETE_PRODUCT_MANY_FAIL
} from './types';

import api from '../utils/api';

export const fetchProduct = () => async dispatch => {
    try {
        const res = await api.get('/products');
        dispatch({ type: GET_PRODUCTS, payload: res.data.data });
    } catch (error) {
        console.log(`[product.fetchProduct] error: ${error}`);
        dispatch({ type: GET_PRODUCTS_FAIL, payload: error.response.data });
    }
}

export const deleteOneProduct = (id) => async dispatch => {
    try {
        const res = await api.delete('/products', {
            params: {
                id
            }
        });
        dispatch({ type: DELETE_PRODUCT, payload: res.data });
    } catch (error) {
        console.log(`[product.deleteOneProduct] error: ${error}`);
        dispatch({ type: DELETE_PRODUCT_FAIL, payload: error.response.data });
    }
}

export const deleteManyProduct = (ids) => async dispatch => {
    const data = { id: ids }
    try {
        const res = await api.delete('/products/delete/multiple', { data });
        dispatch({ type: DELETE_PRODUCT_MANY, payload: res.data });
    } catch (error) {
        console.log(`[product.deleteManyProduct] error: ${error}`);
        dispatch({ type: DELETE_PRODUCT_MANY_FAIL, payload: error.response.data });
    }
}