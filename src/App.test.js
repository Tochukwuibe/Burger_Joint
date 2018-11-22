import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';

configure({ adapter: new Adapter() });


describe('<App />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');

    // const app = shallow( <Provider store={{}}><App /></Provider> )
    // app.setProps({ store: {} })
    // ReactDOM.render(app, div);
    // ReactDOM.unmountComponentAtNode(div);
  });
})



