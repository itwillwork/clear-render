import React from 'react';

import { render, fireEvent, cleanup } from 'react-testing-library'

// React class component with state
import Checkbox from './components/Checkbox';
// React class component without state
import Input from './components/Input';
// React function component, with hooks
import Counter from './components/Counter';

import Comparator from '../Comparator';

import patch from '../patch';

const defaultProps = {
  title: "ping",
  description: "text",
}

beforeEach(() => {

});

afterEach(() => {
  cleanup();
});

test('Checkbox, detect changed state', () => {
  // Arrange
  const fakeLogger = {
    printInit: jest.fn(),
    printComparisonsResults: jest.fn(),
  };
  const comparator = new Comparator(fakeLogger);
  const PatchedCheckbox = patch(Checkbox, comparator);

  // Act
  const { getByTestId } = render(<PatchedCheckbox {...defaultProps} />);

  fireEvent.click(getByTestId('checkbox'));

  // Assert
  expect(fakeLogger.printInit.mock.calls.length).toBe(1);
  expect(fakeLogger.printComparisonsResults.mock.calls.length).toBe(1);
  expect(fakeLogger.printComparisonsResults.mock.calls[0]).toEqual(
    [[], [{"key": "isChecked", "nextValue": true, "oldValue": false, "type": "boolean"}]]
  );
  expect(getByTestId('state-isChecked').textContent).toBe('1');
});

test('Checkbox, detect changed props', () => {
  // Arrange
  const fakeLogger = {
    printInit: jest.fn(),
    printComparisonsResults: jest.fn(),
  };
  const comparator = new Comparator(fakeLogger);
  const PatchedCheckbox = patch(Checkbox, comparator);

  // Act
  const { rerender, getByTestId } = render(<PatchedCheckbox {...defaultProps} />);

  rerender(<PatchedCheckbox {...defaultProps} title='pong' />);

  // Assert
  expect(fakeLogger.printInit.mock.calls.length).toBe(1);
  expect(fakeLogger.printComparisonsResults.mock.calls.length).toBe(1);
  expect(fakeLogger.printComparisonsResults.mock.calls[0]).toEqual(
    [[{"key":"title","type":"string","oldValue":"ping","nextValue":"pong"}],[]]
  );

  expect(getByTestId('props-title').textContent).toBe('pong');
});

test('Counter, detect changed props re-render', () => {
  // Arrange
  const fakeLogger = {
    printInit: jest.fn(),
    printComparisonsResults: jest.fn(),
  };
  const comparator = new Comparator(fakeLogger);
  const PatchedCounter= patch(Counter, comparator);

  // Act
  const { rerender, getByTestId } = render(<PatchedCounter {...defaultProps} />);

  rerender(<PatchedCounter {...defaultProps} title='pong' />);

  // Assert
  expect(fakeLogger.printInit.mock.calls.length).toBe(1);
  expect(fakeLogger.printComparisonsResults.mock.calls.length).toBe(1);
  expect(fakeLogger.printComparisonsResults.mock.calls[0]).toEqual(
    [[{"key":"title","type":"string","oldValue":"ping","nextValue":"pong"}],[]]
  );
  expect(getByTestId('props-title').textContent).toBe('pong');
});

test('Counter, used hooks', () => {
  // Arrange
  const fakeLogger = {
    printInit: jest.fn(),
    printComparisonsResults: jest.fn(),
  };
  const comparator = new Comparator(fakeLogger);
  const PatchedCounter= patch(Counter, comparator);

  // Act
  const { rerender, getByTestId } = render(<PatchedCounter {...defaultProps} />);

  fireEvent.click(getByTestId('button'));

  // Assert
  expect(fakeLogger.printInit.mock.calls.length).toBe(1);
  expect(fakeLogger.printComparisonsResults.mock.calls.length).toBe(1);
});

test('Input, detect changed props re-render', () => {
  // Arrange
  const fakeLogger = {
    printInit: jest.fn(),
    printComparisonsResults: jest.fn(),
  };
  const comparator = new Comparator(fakeLogger);
  const PatchedInput= patch(Input, comparator);

  const inputDefaultProps = {
    ...defaultProps,
    value: "",
    onChange: () => {},
  }
  // Act
  const { rerender, getByTestId } = render(<PatchedInput {...inputDefaultProps} />);

  rerender(<PatchedInput {...inputDefaultProps} value='i type ...' />);

  // Assert
  expect(fakeLogger.printInit.mock.calls.length).toBe(1);
  expect(fakeLogger.printComparisonsResults.mock.calls.length).toBe(1);
  expect(fakeLogger.printComparisonsResults.mock.calls[0]).toEqual(
    [[{"key":"value","type":"string","oldValue":"","nextValue":"i type ..."}],[]]
  );
});