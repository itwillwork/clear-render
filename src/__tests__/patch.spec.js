import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import SimpleComponent from './components/SimpleComponent';
import patch from '../patch';

it('changed state', () => {
  const PatchedSimpleComponent = patch(SimpleComponent, 'test-name', console);

  const checkbox = shallow(
    <PatchedSimpleComponent labelOn="On" labelOff="Off" />
  );

  expect(checkbox.text()).toEqual('Off');

  checkbox.find('input').simulate('change');

  expect(checkbox.text()).toEqual('On');

  checkbox.setProps({ labelOn: 'Off' });
});
