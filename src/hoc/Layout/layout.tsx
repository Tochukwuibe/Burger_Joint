import * as React from 'react';
import Toolbar from '../../components/navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/navigation/SideDrawer/SideDrawer';
import  styles from './layout.module.css';

export default class extends React.Component {

    public state = {
        showSideNav: false
    };


    public setSidenav(val: boolean) {
        return () => this.setState({ showSideNav: val });
    }


    public render() {
        return (<div className={styles.Container}>
            <Toolbar open={this.setSidenav(true)} />
            <SideDrawer show={this.state.showSideNav} close={this.setSidenav(false)} />
            <main className={styles.Content}>
                {this.props.children}
            </main>
        </div>
        );
    }
}



