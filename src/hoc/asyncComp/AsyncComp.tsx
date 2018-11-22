import * as React from 'react';


export const asyncComp = (comp) => {
    return class extends React.Component {
        state = { component: null };

        public componentDidMount = async () => {
            const cmp = await comp();
            this.setState({ component: cmp.default })
        }

        public render = () => {
            const C = this.state.component
            return !!C ? <C {...this.props} /> : null;
     }

    }
}