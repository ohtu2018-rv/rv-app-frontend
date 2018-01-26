import React from 'react';
import ReactDOM from 'react-dom';
import { ContentRight } from '../components/sections/ContentRight';
import Enzyme from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ContentRight />, div);
});