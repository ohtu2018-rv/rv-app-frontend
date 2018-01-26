import React from 'react';
import ReactDOM from 'react-dom';
import { Header } from '../components/sections/Header';
import Enzyme from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Header />, div);
});