import * as React from 'react';
import { Modal } from '../../components/UI/Modal/Modal';
import { AxiosInstance } from 'axios';

export const withErrorHandler = (Component, axios: AxiosInstance) => {
    return class extends React.Component {

        private requestInterceptor: number;
        private responseInterceptor: number;

        public state = {
            error: null
        };

        public componentWillMount() {
            this.requestInterceptor = this.clearErrorState();
            this.responseInterceptor = this.listenForErrors();
        }


        public componentWillUnmount() {
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }

        private clearErrorState() {
            return axios.interceptors.request.use(
                (req) => {
                    this.setState({ error: null });
                    return req;
                }
            );
        }

        private listenForErrors() {
            return axios.interceptors.response.use(
                (res) => res,
                (error) => { this.setState({ error }); }
            );
        }

        private dismissError = () => {
            this.setState({ error: null });
        }

        private showModal() {
            return (
                <Modal backDropClicked={this.dismissError} show={this.state.error}>
                    {this.state.error ? (this.state.error as any).message : null}
                </Modal>
            );
        }

        public render() {
            return <>
                {this.showModal()}
                <Component {...this.props} />;
        </>;
        }
    };

};


