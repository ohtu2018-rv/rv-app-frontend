import React from 'react';
import ReactDOM from 'react-dom';
import { Header } from '../components/sections/Header';
import Enzyme from 'enzyme';

/**
 * Mock
 */
const user = {
    full_name: 'John Doe',
    account_balance: 1000
};

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Header user={user} />, div);
});
