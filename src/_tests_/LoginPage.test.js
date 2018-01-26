import React from 'react';
import ReactDOM from 'react-dom';
import { LoginPage } from '../components/pages/LoginPage';
import Enzyme from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LoginPage />, div);
});