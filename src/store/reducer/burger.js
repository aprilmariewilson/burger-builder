import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
};
const INGREDIENT_PRICES = {
    salad: 0.25,
    bacon: 0.7,
    cheese: 0.75,
    tomato: 0.25,
    meat: 1.25
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
                building: true
            }
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
                building: true
            }
            case actionTypes.SET_INGREDIENTS:
                return{
                    ...state,
                    ingredients:{
                        tomato: action.ingredients.tomato,
                        salad: action.ingredients.salad,
                        bacon: action.ingredients.bacon,
                        cheese: action.ingredients.cheese,
                        meat: action.ingredients.meat,
                    },
                    building: false,
                    totalPrice: 4,
                    error: false
                };
                case actionTypes.FETCH_FAILED:
                    return{
                        ...state,
                        error: true
                };
        default:
            return state;
    }
};

export default reducer;