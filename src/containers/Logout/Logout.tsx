import * as React from 'react';
import { AuthActions } from '../../store/actions/auth';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';


class Logout extends React.PureComponent<any> {

    public componentDidMount = () => this.props.logout()
    public render = () => <Redirect to="/builder" />;

}



const mapActionsToProps = (dispatch) => {
    return {
        logout: () => dispatch(AuthActions.sign_out())
    }
}

export default connect(null, mapActionsToProps)(Logout);