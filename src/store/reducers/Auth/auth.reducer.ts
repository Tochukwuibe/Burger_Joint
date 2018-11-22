import { AuthActionTypes } from "../../actions/auth";


const initialState = {
    loading: false,
    error: null,
    authenticated: false,
    authData: null,
    authRedirect: '/'
}


export default (state = initialState, action) => {
    switch (action.type) {

        case AuthActionTypes.AUTHENTICATED: {
            console.log('updating authenticated', action)
            return { ...state, authenticated: true, authData: action.payload }
        }

        case AuthActionTypes.MANAGEUI: {
            return { ...state, ...action.payload }
        }

        case AuthActionTypes.SIGN_OUT: {
            return initialState
        }

        case AuthActionTypes.SET_REDIRECT_PATH: {
            return {...state, authRedirect: action.payload }
        }


        default: {
            return state;
        }
    }
}