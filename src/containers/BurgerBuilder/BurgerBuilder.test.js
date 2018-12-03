import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../components/BuildControls/BuildControls';


configure({ adapter: new Adapter() });

describe('<BurgerBuilder/>', ()=>{
  let wrapper;

  beforeEach(()=>{
    // componentDidMount 會執行props的onInitIngredients，如沒有加入將無法測試 !!
    wrapper = shallow(<BurgerBuilder onInitIngredients={()=>{}}/>)
  });

  it ('should render <BuildControls /> when receiving ingredinets', ()=> {
    wrapper.setProps({ings: { salad: 0 }});
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
})