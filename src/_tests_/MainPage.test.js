import React from 'react';
import ReactDOM from 'react-dom';
import { MainPage } from '../components/pages/MainPage';
import Enzyme from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MainPage />, div);
})