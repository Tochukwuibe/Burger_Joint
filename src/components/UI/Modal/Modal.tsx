import * as React from 'react';
import Backdrop from '../Backdrop/Backdrop';
import  styles from './modal.module.css';

export class Modal extends React.Component<any> {

    public shouldComponentUpdate(props, state) {
        return props.show !== this.props.show || props.loading !== this.props.loading;
    }

    public componentWillUpdate(nextProps, nextState) {
        console.log('modal component will update');
    }


    public render() {

        const { children, show, backDropClicked } = this.props;
        const style = {
            transform: show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: show ? '1' : '0'
        } as any;

        return (
            <>
                <Backdrop clicked={backDropClicked} show={show} />
                <div
                    className={styles.Modal}
                    style={style}>

                    {children}
                </div>
            </>

        );
    }

}