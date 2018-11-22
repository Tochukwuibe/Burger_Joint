import { auth } from "../../http/http";

export enum AuthActionTypes {
    SIGN_IN = 'SIGN_IN',
    SIGN_UP = 'SIGN_UP',
    AUTHENTICATED = 'Authenticated',
    SIGN_OUT = 'SIGN_OUT',
    MANAGEUI = 'MANAGEUI',
    SET_REDIRECT_PATH = 'SETREDIRECTPATH',
    FETCH_AUTH_DATA = 'FETCH_AUTH_DATA'
}


export const AuthActions = {
    sign_in: (body) => {
        return async (dispatch) => {
            try {

                dispatch(AuthActions.manage_ui({ loading: true }));
                const { data } = await auth.post('/verifyPassword', { ...body, returnSecureToken: true });

                const expirationData = new Date(new Date().getTime() + (data.expiresIn * 1000))
                const token = JSON.stringify(data)
                localStorage.setItem('authData', token);
                localStorage.setItem('expiration', `${expirationData}`);

                dispatch(AuthActions.authenticated(data));
                dispatch(AuthActions.manage_ui({ loading: false, error: false }));

            } catch (e) {
                console.log('the error ', e);
                dispatch(AuthActions.manage_ui({ loading: false, error: e.message }));

            }

        }
    },
    sign_up: (body) => {
        console.log('the data ', body);
        return async (dispatch) => {
            try {

                dispatch(AuthActions.manage_ui({ loading: true }));
                const { data } = await auth.post('/signupNewUser', { ...body, returnSecureToken: true });

                const expirationData = new Date(new Date().getTime() * (data.expiresIn * 1000))
                const token = JSON.stringify(data)
                localStorage.setItem('authData', token);
                localStorage.setItem('expiration', `${expirationData}`);

                dispatch(AuthActions.authenticated(data));
                dispatch(AuthActions.manage_ui({ loading: false }));
                dispatch(AuthActions.checkAuthTimeOut(data.expiresIn))
            } catch (e) {

                dispatch(AuthActions.manage_ui({ loading: false, error: e.message }));

            }

        }
    },
    fetchAuthData: () => {
        return (dispatch) => {
            const data = JSON.parse(localStorage.getItem('authData'));
            // const exp = JSON.parse(localStorage.getItem('expiration'));
            if(data) {
                dispatch(AuthActions.authenticated(data));
            } else {
                dispatch(AuthActions.sign_out())
            }
        }
    },
    authenticated: (data) => {
        return { type: AuthActionTypes.AUTHENTICATED, payload: data }
    },
    sign_out: () => {

        return (dispatch) => {

            localStorage.removeItem('authData');
            localStorage.removeItem('expiration');

            dispatch({ type: AuthActionTypes.SIGN_OUT });
        }
    },
    manage_ui: (data) => {
        return { type: AuthActionTypes.MANAGEUI, payload: data }
    },
    setRedirectPath: (path) => {
        return { type: AuthActionTypes.SET_REDIRECT_PATH, payload: path };
    },
    checkAuthTimeOut: (expiration) => {
        return (dispatch) => {
            setTimeout(() => {
                dispatch(AuthActions.sign_out())
            }, expiration * 1000);
        }
    }

}