import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    };
};
export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    };
};
export const setIngredients = (ingredients) => {
    return{
        type: actionTypes.SET_INGREDIENTS,
        ingredients
    };
};
export const fetchFailed = () => {
    return{
        type: actionTypes.FETCH_FAILED
    };
};
export const initIngredients = () => {
    return dispatch => {
        axios.get('https://my-burger-f08f7.firebaseio.com/ingredients.json')
        .then(res => {
            dispatch(setIngredients(res.data));
        })
        .catch(error => {
         dispatch(fetchFailed());
        });
    };
};