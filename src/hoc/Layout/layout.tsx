import * as React from 'react';
import Toolbar from '../../components/navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/navigation/SideDrawer/SideDrawer';
import  styles from './layout.module.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { AuthActions } from '../../store/actions/auth';

 class Layout  extends React.Component<any> {

    public state = {
        showSideNav: false
    };

    public componentDidMount = () => this.props.fetchAuthData()
    


    public setSidenav(val: boolean) {
        return () => this.setState({ showSideNav: val });
    }


    public render() {
        console.log('the layout props ', this.props);
        return (<div className={styles.Container}>
            <Toolbar open={this.setSidenav(true)} authenticated={this.props.authenticated} />
            <SideDrawer show={this.state.showSideNav} authenticated={this.props.authenticated} close={this.setSidenav(false)} />
            <main className={styles.Content}>
                {this.props.children}
            </main>
        </div>
        );
    }
}

const stateToProps = ({ auth }) => {
    return {
        authenticated: auth.authenticated
    }
}

const actionsToProps = (dispatch) => {
    return {
        fetchAuthData: () => dispatch(AuthActions.fetchAuthData())
    }
}



export default withRouter(connect(stateToProps, actionsToProps)(Layout) as any);

