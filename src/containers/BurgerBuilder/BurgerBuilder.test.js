import { BurgerBuilder } from './BurgerBuilder';
import * as React from 'react';
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';


configure({ adapter: new Adapter() });

describe('<Burger />', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder fetchIngredients={() => {}} />)
    });

    it('should render build controls', () => {
        wrapper.setProps({
            ingredients: {
                salad: 0
            }
        })

        expect(wrapper.find(BuildControls)).toHaveLength(1);
    })

});
