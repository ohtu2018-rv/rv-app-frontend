import React from 'react';
import ReactDOM from 'react-dom';
import { ContentLeft } from '../components/sections/ContentLeft';
import Enzyme from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ContentLeft />, div);
})