import React from 'react';
import ReactDOM from 'react-dom';
import { Content } from '../components/sections/Content';
import Enzyme from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Content />, div);
})