import React, { Component } from 'react';
import { Header } from '../sections/Header';
import Content from '../sections/Content';

import { connect } from 'react-redux';

import { logout } from './../../reducers/authenticationReducer';

import {
    successMessage,
    errorMessage,
    addProductToNotification,
    clearProductsFromNotification
} from './../../reducers/notificationReducer';

import userService from '../../services/userService';

class MainPage extends Component {
    constructor(props) {
        /* REMOVE contructer after demo 1 */

        super(props);
        this.state = {
            user: {
                username: '',
                full_name: '',
                email: '',
                account_balance: 0
            },
            timeoutHandler: null,
            balance: null
        };
        this.buy = this.buy.bind(this);
        this.store = this.store.bind(this);
    }

    handleKeyPress = event => {
        switch (event.keyCode) {
            case 13:
                this.props.logout();
                break;
            default:
                console.log(event.keyCode);
        }
    };

    componentDidMount() {
        document.addEventListener('keypress', this.handleKeyPress);
        userService.getUser(this.props.token).then(user => {
            this.setState({ user: user });
        });
    }

    componentWillUnmount() {
        document.removeEventListener('keypress', this.handleKeyPress);
    }

    /**
     * Buys a product.
     */
    async buy(product) {
        try {
            var newBalance = await userService.reduceBalance(
                this.props.token,
                product.price
            );

            // If timeout is set, clear it to prevent notification from disappearing
            if (this.state.timeoutHandler) {
                clearTimeout(this.state.timeoutHandler);
                this.setState({ timeoutHandler: null });
            }

            let user = Object.assign(this.state.user);
            user.account_balance = newBalance;
            this.setState({ user: user });

            // Add product to notification
            this.props.addProductToNotification(product);

            // Create a new timeout
            const timeoutHandler = setTimeout(
                () => this.props.clearProductsFromNotification(),
                this.props.purchaseNotificationTimeout
            );
            this.setState({
                timeoutHandler
            });
        } catch (error) {
            this.props.errorMessage('Virhe ostamisessa');
        }
    }

    async store(product) {
        try {
            var newBalance = await userService.increaseBalance(
                this.props.token,
                product.price
            );

            let user = Object.assign(this.state.user);
            user.account_balance = newBalance;
            this.setState({ user: user });
            this.props.successMessage(
                'Talletettu RV-tilille ' +
                    parseFloat(product.price / 100).toFixed(2) +
                    ' €'
            );
        } catch (error) {
            this.props.errorMessage('Virhe tallettamisessa');
        }
    }

    render() {
        return (
            <div>
                <Header
                    logout={this.props.logout}
                    user={this.state.user}
                    buy={this.buy}
                    store={this.store}
                />
                <Content balance={this.state.balance} />
            </div>
        );
    }
}

const mapDispatchToProps = {
    successMessage,
    errorMessage,
    logout,
    addProductToNotification,
    clearProductsFromNotification
};

const mapStateToProps = state => {
    return {
        token: state.authentication.access_token,
        purchaseNotificationTimeout:
            state.notification.purchaseNotificationTimeout
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
