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

import { getProducts } from './../../reducers/productReducer';

import userService from '../../services/userService';


import Modal from './../modal/Modal';
import Deposit from './../sections/Deposit';


class MainPage extends Component {
    constructor(props) {
        /* REMOVE contructer after demo 1 */

        super(props);
        this.state = {
            timeoutHandler: null,
            notificationInterval: null,
            show: false
        };
        this.depositShow = this.depositShow.bind(this);
        this.buy = this.buy.bind(this);
        this.deposit = this.deposit.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleKeyPress(event) {
        switch (event.keyCode) {
        case 13:
            if (this.props.terminalInput === '') {
                this.props.resetUserData();
                this.props.logout();
            }
            break;
        case 100:
            
            break;
        default:
            console.log(event.keyCode);
        }
    }

    componentDidMount() {
        const notificationInterval = setInterval(() => {
            if (this.props.purchaseNotificationStartTime != null) {
                const delta =
                    new Date().getTime() -
                    this.props.purchaseNotificationStartTime.getTime();
                if (delta > this.props.purchaseNotificationTimeout) {
                    this.props.clearProductsFromNotification();
                }
            }
        }, 100);
        this.setState({ notificationInterval });
        document.addEventListener('keypress', this.handleKeyPress);
        this.props.getProducts();
    }

    componentWillUnmount() {
        clearInterval(this.state.notificationInterval);
        this.setState({ notificationInterval: null });
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

    // Make this a reducer function. If named store like before, breaks redux
    async deposit(product) {
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


    depositShow() {    
        this.setState({
            show: !this.state.show
        });
        
    }

    render() {
        return (
            <div>
                <Header
                    logout={this.props.logout}
                    user={this.props.user}
                    buy={this.buy}
                    deposit={this.deposit}
                    show={this.depositShow}
                />
                <Content balance={this.state.balance} deposit={this.deposit} />
                <Modal show={ this.state.show }>
                    <Deposit close={this.depositShow}/>
                </Modal>
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
    resetUserData,
    getProducts
};

const mapStateToProps = state => {
    return {
        token: state.authentication.access_token,
        purchaseNotificationTimeout:
            state.notification.purchaseNotificationTimeout,
        purchaseNotificationStartTime:
            state.notification.purchaseNotificationStartTime,
        user: state.user,
        terminalInput: state.terminal.terminalInput
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
