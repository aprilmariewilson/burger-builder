
import authReducer from './auth';
import * as actionTypes from '../actions/actionTypes';


describe('auth reducer', () => {
let state;
    beforeEach(() => {
        state = {
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirect: '/'
        };
    });

    it('should return initial state', () => {
        expect(authReducer(undefined, {})).toEqual(state);
    });
    it('should store token upon login', () => {
        expect(authReducer(state,{
            type: actionTypes.AUTH_SUCCESS,
            token: 'some token',
            userId: 'some-user-id'
        })).toEqual({
            token: 'some token',
            userId: 'some-user-id',
            error: null,
            loading: false,
            authRedirect: '/'
        })
    })
});