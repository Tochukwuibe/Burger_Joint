import { auth } from "../../http/http";

export enum AuthActionTypes {
    SIGN_IN = 'SIGN_IN',
    SIGN_UP = 'SIGN_UP',
    AUTHENTICATED = 'Authenticated',
    SIGN_OUT = 'SIGN_OUT',
    MANAGEUI = 'MANAGEUI'
}


export const AuthActions = {
    sign_in: (body) => {
        console.log('the data ', body);
        return async (dispatch) => {
            try {

                dispatch(AuthActions.manage_ui({ loading: true }));
                const { data } = await auth.post('/verifyPassword', { ...body, returnSecureToken: true });
                console.log('the auth res ', data);
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
                console.log('the auth res ', data);
                dispatch(AuthActions.authenticated(data));
                dispatch(AuthActions.manage_ui({ loading: false }));
                dispatch(AuthActions.checkAuthTimeOut(data.expiresIn))
            } catch (e) {

                dispatch(AuthActions.manage_ui({ loading: false, error: e.message }));

            }

        }
    },
    authenticated: (data) => {
        return { type: AuthActionTypes.AUTHENTICATED, payload: data }
    },
    sign_out: () => {
        return { type: AuthActionTypes.SIGN_OUT }
    },
    manage_ui: (data) => {
        return { type: AuthActionTypes.MANAGEUI, payload: data }
    },
    checkAuthTimeOut: (expiration) => {
        return (dispatch) => {
            setTimeout(() => {
                dispatch(AuthActions.sign_out())
            }, expiration * 1000);
        }
    }

}