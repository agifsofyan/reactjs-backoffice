import {
    GET_PRODUCTS,
    GET_PRODUCTS_FAIL,
    GET_PRODUCT_DETAIL,
    GET_PRODUCT_DETAIL_FAIL,
    ADD_PRODUCT,
    ADD_PRODUCT_FAIL,
    UPDATE_PRODUCT,
    UPDATE_PRODUCT_FAIL,
    DELETE_PRODUCT,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_MANY,
    DELETE_PRODUCT_MANY_FAIL
} from './types';

import Swal from 'sweetalert2';

import api from '../utils/api';

const Toast = Swal.mixin({
    toast: true,
    position: 'bottom',
    showCloseButton: true,
    showConfirmButton: false
});

export const fetchProducts = () => async dispatch => {
    try {
        const res = await api.get('/products');
        dispatch({ type: GET_PRODUCTS, payload: res.data.data });
    } catch (error) {
        console.log(`[product.fetchProducts] error: ${error}`);
        dispatch({ type: GET_PRODUCTS_FAIL, payload: error.response.data });
    }
}

export const fetchProduct = (id) => async dispatch => {
    try {
        const res = await api.get(`/products/${id}`);
        dispatch({ type: GET_PRODUCT_DETAIL, payload: res.data.data });
    } catch (error) {
        console.log(`[product.fetchProduct] error: ${error}`);
        dispatch({ type: GET_PRODUCT_DETAIL_FAIL, payload: error.response.data });
    }
}

export const addProduct = (form) => async dispatch => {
    try {
        const res = await api.post('/products', JSON.stringify(form));
        dispatch({ type: ADD_PRODUCT, payload: res.data });
    } catch (error) {
        console.log(`[product.addProduct] error: ${error}`);
        Toast.fire({
            icon: 'error',
            title: error.response.data.message[0]
        });
        dispatch({ type: ADD_PRODUCT_FAIL, payload: error.response.data });
    }
}

export const updateProduct = (id, form, history) => async dispatch => {
    try {
        const res = await api.put(`/products/${id}`, JSON.stringify(form));
        if (res.data.statusCode == 200) {
            Toast.fire({
                icon: 'success',
                title: res.data.message
            });
            history.push('/products');
        }
        dispatch({ type: UPDATE_PRODUCT, payload: res.data.data });
    } catch (error) {
        console.log(`[product.updateProduct] error: ${error}`);
        Toast.fire({
            icon: 'error',
            title: error.response.data.message[0]
        });
        dispatch({ type: UPDATE_PRODUCT_FAIL, payload: error.response.data });
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