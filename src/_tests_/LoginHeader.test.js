import React from 'react';
import ReactDOM from 'react-dom';
import LoginHeader from '../components/sections/LoginHeader';
import Enzyme from 'enzyme';
import renderer from 'react-test-renderer';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<LoginHeader />, div);
    const cmpnt = renderer.create(<LoginHeader />).toJSON();
    expect(cmpnt).toMatchSnapshot();
});
