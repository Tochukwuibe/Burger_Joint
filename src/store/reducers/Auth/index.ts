import { connect } from 'react-redux';
import { AuthActions } from '../../actions/auth';




const stateToProps = ({ auth }) => {
    const { authenticated, authData  , loading, error, authRedirect } = auth;
    return {
        authenticated,
        loading,
        error,
        authData,
        authRedirect
    }
}


const actionsToProps = (dispatch) => {
    return {
        signIn: (data) => dispatch(AuthActions.sign_in(data)),
        signUp: (data) => dispatch(AuthActions.sign_up(data)),
        resetAuthRedirect: () => dispatch(AuthActions.setRedirectPath('/'))
    }
}



export default connect(stateToProps, actionsToProps)


