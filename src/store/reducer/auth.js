import * as actionTypes from '../actions/actionTypes';


const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirect: '/'
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                loading: true,
                error: null
            };
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                userId: null
            };
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                loading: null,
                error: action.error
            };
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                token: action.token,
                userId: action.userId,
                loading: false,
                error: null
            }
        case actionTypes.AUTH_REDIRECT_PATH:
            return {
                ...state,
                authRedirect: action.path
            }
        default:
            return state;
    };
};

export default authReducer;