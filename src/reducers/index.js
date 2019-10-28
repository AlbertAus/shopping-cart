import { combineReducers } from 'redux';
import * as types from '../constants/actionTypes';
const initialState = {
    cart: [
        {
            product: 'bread 700g',
            quantity: 2,
            unitCost:90
        },
        {
            product: 'milk 500ml',
            quantity: 1,
            unitCost:47
        },
        {
            product: 'Chocalote',
            quantity: 5,
            unitCost: 5.00
        }
    ]
}

export function cartReducer(state=initialState, action) {
    switch (action.type) {
        case types.ADD_TO_CART:{
            return {
                ...state,
                cart:[...state.cart, action.payload]
            }
        }
        case types.UPDATE_CART:{
            return {
                ...state,
                cart: state.cart.map(item => item.product === action.payload.product ? action.payload : item)
            }
        }
        case types.DELETE_FROM_CART:{
            return {
                ...state,
                cart:state.cart.filter(item => item.product !== action.payload.product)
            }
        }

        default:
            return state;
    }
}

export function productsReducer(state=[], action){
    return state;
}

const allReducers ={
    products: productsReducer,
    shoppingCart: cartReducer
}

const rootReducer=combineReducers(allReducers);

export default rootReducer;