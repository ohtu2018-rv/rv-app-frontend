import React from 'react';
import { shallow } from 'enzyme';
import DangerBtn from './DangerBtn';
import Loader from './../loaders/Loader';

describe.only('<DangerBtn />', () => {
    it('renders text correctly', () => {
        const data = {
            text: 'Hello world'
        };

        const dangerBtnComponent = shallow(<DangerBtn>{data.text}</DangerBtn>);
        const contentDiv = dangerBtnComponent.find('.btnContent');
        expect(contentDiv.text()).toContain(data.text);
    });

    it('shows loader correctly', () => {
        const dangerBtnComponent = shallow(<DangerBtn loader={true} />);
        expect(dangerBtnComponent.contains(<Loader />)).toBe(true);
    });

    it('onClick event works correctly', () => {
        const data = {
            text: 'Hello world'
        };

        const mockHandler = jest.fn();

        const dangerBtnComponent = shallow(<DangerBtn onClick={mockHandler} />);

        const button = dangerBtnComponent.find('button');

        expect(mockHandler.mock.calls.length).toBe(0);
        button.simulate('click');
        expect(mockHandler.mock.calls.length).toBe(1);
    });
});
