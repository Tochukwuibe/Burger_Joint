import * as React from 'react';
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import Navitems from './Navitems';
import NavItem from '../NavItem/NavItem';




configure({ adapter: new Adapter() });

describe('<Navitems />', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Navitems />);
    })

    it('should render two navigation items if not auth', () => {
        expect(wrapper.find(NavItem)).toHaveLength(2);
    })

    it('should render three navigation items if auth', () => {
        wrapper.setProps({ authenticated: true });
        expect(wrapper.find(NavItem)).toHaveLength(3);
    })

    it('should render logout navigation items if auth', () => {
        wrapper.setProps({ authenticated: true });
        expect(wrapper.contains(<NavItem link='/logout'>Logout</NavItem>)).toEqual(true);
    })
});