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

import {
    increaseBalance,
    decreaseBalance,
    resetUserData
} from './../../reducers/userReducer';

import userService from '../../services/userService';

class MainPage extends Component {
    constructor(props) {
        /* REMOVE contructer after demo 1 */

        super(props);
        this.state = {
            timeoutHandler: null
        };
        this.buy = this.buy.bind(this);
        this.store = this.store.bind(this);
    }

    handleKeyPress = event => {
        switch (event.keyCode) {
            case 13:
                this.props.resetUserData();
                this.props.logout();
                break;
            default:
                console.log(event.keyCode);
        }
    };

    componentDidMount() {
        document.addEventListener('keypress', this.handleKeyPress);
    }

    componentWillUnmount() {
        document.removeEventListener('keypress', this.handleKeyPress);
    }

    /**
     * Buys a product.
     */
    async buy(product) {
        try {
            await userService.reduceBalance(this.props.token, product.price);

            // If timeout is set, clear it to prevent notification from disappearing
            if (this.state.timeoutHandler) {
                clearTimeout(this.state.timeoutHandler);
                this.setState({ timeoutHandler: null });
            }

            this.props.decreaseBalance(product.price);

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
            const errorResponse = error.response;
            this.props.errorMessage(errorResponse.data.message);
        }
    }

    async store(product) {
        try {
            await userService.increaseBalance(this.props.token, product.price);
            this.props.increaseBalance(product.price);
            this.props.successMessage(
                'Talletettu RV-tilille ' +
                    parseFloat(product.price / 100).toFixed(2) +
                    ' €'
            );
        } catch (error) {
            const errorResponse = error.response;
            this.props.errorMessage(errorResponse.data.message);
        }
    }

    render() {
        return (
            <div>
                <Header
                    logout={this.props.logout}
                    user={this.props.user}
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
    clearProductsFromNotification,
    increaseBalance,
    decreaseBalance,
    resetUserData
};

const mapStateToProps = state => {
    return {
        token: state.authentication.access_token,
        purchaseNotificationTimeout:
            state.notification.purchaseNotificationTimeout,
        user: state.user
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
