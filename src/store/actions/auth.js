import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};
export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token,
        userId
    };
};
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};
export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    };
};
export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};
export const authRedirectPath = (path) => {
    return {
        type: actionTypes.AUTH_REDIRECT_PATH,
        path
    };
};
export const auth = (email, password, signedUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email,
            password,
            returnSecureToken: true
        };
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAwUq_bgClc09OEDMXilbZxiCxsqBuN25w';
        if (!signedUp) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAwUq_bgClc09OEDMXilbZxiCxsqBuN25w';
        }
        axios.post(url, authData)
            .then(response => {
                console.log(response);
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(error => {
                console.log(error);
                dispatch(authFail(error.response.data.error));
            })

    }
};
export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else { 
                const userId = localStorage.getItem('userId');
            dispatch(authSuccess(token, userId));
            dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    }
}