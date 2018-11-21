import { connect } from 'react-redux';
import { AuthActions } from '../../actions/auth';




const stateToProps = ({ auth }) => {
    const { authenticated, authData  , loading, error } = auth;
    return {
        authenticated,
        loading,
        error,
        authData
    }
}


const actionsToProps = (dispatch) => {
    return {
        signIn: (data) => dispatch(AuthActions.sign_in(data)),
        signUp: (data) => dispatch(AuthActions.sign_up(data))
    }
}



export default connect(stateToProps, actionsToProps)


