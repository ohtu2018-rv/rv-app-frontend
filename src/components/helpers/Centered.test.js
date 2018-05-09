import React from 'react';
import { shallow } from 'enzyme';
import Centered from './Centered';
import renderer from 'react-test-renderer';

describe.only('<Centered />', () => {
    it('renders correctly', () => {
        const cmpnt = renderer.create(<Centered />).toJSON();
        expect(cmpnt).toMatchSnapshot();
    });
});
