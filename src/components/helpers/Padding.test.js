import React from 'react';
import { shallow } from 'enzyme';
import Padding from './Padding';
import renderer from 'react-test-renderer';

describe.only('<Padding />', () => {
    it('renders correctly', () => {
        const cmpnt = renderer.create(<Padding />).toJSON();
        expect(cmpnt).toMatchSnapshot();
    });
});
