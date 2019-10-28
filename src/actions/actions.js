import * as types from '../constants/actionTypes';

export function addToCart(product, quantity, unitCost) {
    return {
        type: types.ADD_TO_CART,
        payload: { product, quantity, unitCost }
    }
}

export function updateCart(product, quantity, unitCost) {
    return {
        type: types.UPDATE_CART,
        payload:{
            product,
            quantity,
            unitCost
        }
    }
}

export function deleteFromCart(product) {
    return {
        type: types.DELETE_FROM_CART,
        payload:{
            product
        }
    }
}
