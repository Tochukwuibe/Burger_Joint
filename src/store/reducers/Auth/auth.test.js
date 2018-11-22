import reducer from './auth.reducer';
import { AuthActionTypes } from '../../actions/auth';


describe('auth reducer', () => {
    it('should return init state', () => {
        expect(reducer(undefined, { type: '' })).toEqual({
            loading: false,
            error: null,
            authenticated: false,
            authData: null,
            authRedirect: '/'
        })
    })

    it('should store token on auth ',  () => {
        expect(reducer({
            loading: false,
            error: null,
            authenticated: false,
            authData: null,
            authRedirect: '/'
        }, { type: AuthActionTypes.AUTHENTICATED, payload: 'token' })).toEqual({
            loading: false,
            error: null,
            authenticated: true,
            authData: 'token',
            authRedirect: '/'
        })
    })
})