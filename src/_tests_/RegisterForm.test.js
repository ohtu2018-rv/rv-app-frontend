import React from 'react';
import ReactDOM from 'react-dom';
import RegisterForm from '../components/forms/RegisterForm';
import configureStore from 'redux-mock-store';
import initialState from './initialState.js';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

describe('RegisterForm component', () => {
    const mockStore = configureStore();
    let store;
    beforeEach(() => {
        store = mockStore(initialState);
    });

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<RegisterForm store={store} />, div);
    });

    describe('Password validation', () => {
        it('submit is disabled by default', () => {
            const registerForm = mount(<RegisterForm store={store} />);
            const submit = registerForm.find('.btn');
            expect(submit.props().disabled).toEqual(true);
        });

        it('if passwords dont match submit is disabled', () => {
            const registerForm = mount(<RegisterForm store={store} />);

            const username = registerForm.find('#registerUsername');
            const email = registerForm.find('#registerEmail');
            const realname = registerForm.find('#registerRealname');
            const password = registerForm.find('#registerPassword');
            const passwordCheck = registerForm.find('#registerPasswordConfirm');
            const submit = registerForm.find('.btn');
            /*TODO
            username.instance().value = 'test';
            username.simulate('change', { target: { value: 'Changed' } });
            console.log(username.instance().value);
            username.simulate('change');  
            console.log(username.html());

            console.log(username.value);
            expect(submit.props().disabled).toEqual(false);
            */
        });

        it('if passwords match submit is enabled', () => {
            const registerForm = mount(<RegisterForm store={store} />);

            const username = registerForm.find('#registerUsername');
            const email = registerForm.find('#registerEmail');
            const realname = registerForm.find('#registerRealname');
            const password = registerForm.find('#registerPassword');
            const passwordCheck = registerForm.find('#registerPasswordConfirm');
            const submit = registerForm.find('.btn');
            /*TODO
            username
                .simulate('change', { target: { value: 'test' } });

            console.log(submit.props().disabled);
            */
        });
    });
});
