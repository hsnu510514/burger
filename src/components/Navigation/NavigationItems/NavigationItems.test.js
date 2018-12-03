import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigaionItem';

// React使用enzyme需使用adapter
configure({adapter: new Adapter()});

// describe(兩個參數)，欲測試的內容、function
describe('<NavigationItems />', () => {
  let wrapper;
  // 在每次測試(it())前執行
  beforeEach(()=>{
    // 想測試的內容: shallow的<NavigationItems/>
    wrapper = shallow(<NavigationItems />);
  })

  // it(兩個參數)，想要呈現的結果
  it('should render two <NavigationItem /> elements if not authenticate', () => {
    // 希望得到的結果: NavigationItem function
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it('should render three <NavigationItem /> elements if authenticate', () => {
    // 將想要測試的props加入。法1:直接設定，法2:使用setProps()
    // wrapper = shallow(<NavigationItems isAuthenticated />);
    wrapper.setProps({isAuthenticated: true})
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });
  it('should an exact logout button', () =>{
    // contains 測試是否含有此內容
    wrapper.setProps({isAuthenticated: true})
    expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
  });
});
