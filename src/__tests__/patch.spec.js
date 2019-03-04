import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import Checkbox from './components/Checkbox';
import Counter from './components/Counter';

import patch from '../patch';

const noop = () => {};

const fakeLogger = {
  log: noop,
  group: noop,
  groupCollapsed: noop,
  groupEnd: noop,
};

it('patched checkbox working', () => {
  // Arrange
  const PatchedCheckbox = patch(Checkbox, 'test-name', fakeLogger);

  const checkbox = shallow(<PatchedCheckbox label="ping" />);

  // Act
  checkbox.find('input').simulate('change');
  checkbox.setProps({ label: 'pong' });

  // Assert
  expect(checkbox.find('label').text()).toEqual('On');
  expect(checkbox.find('span').text()).toEqual('pong');
});

it('patched counter working', () => {
  // Arrange
  // const PatchedCounter = patch(Counter, 'test-name', console);

  const counter = mount(<Counter label="ping" />);

  // Act
  counter.setProps({ label: 'pong' });
  counter.find('button').simulate('click');

  // Assert
  expect(counter.find('label').text()).toEqual('pong');
  expect(counter.find('button').text()).toEqual('1');
});
