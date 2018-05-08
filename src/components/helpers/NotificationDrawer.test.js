import React from 'react';
import { shallow } from 'enzyme';
import NotificationDrawer from './NotificationDrawer';
import renderer from 'react-test-renderer';

describe.only('<NotificationDrawer />', () => {
    it('renders correctly', () => {
        const cmpnt = renderer.create(<NotificationDrawer />).toJSON();
        expect(cmpnt).toMatchSnapshot();
    });
});
