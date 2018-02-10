import React, { Component } from 'react';
import { Header } from '../sections/Header';
import Content from '../sections/Content';
import NotificationDrawer from '../helpers/NotificationDrawer';

import SuccessNotification from './../notifications/SuccessNotification';
import ErrorNotification from './../notifications/ErrorNotification';
import PurchaseNotification from './../notifications/PurchaseNotification';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { connect } from 'react-redux';

import { logout } from './../../reducers/authenticationReducer';

import {
    successMessage,
    errorMessage,
    addProductToNotification,
    clearProductsFromNotification
} from './../../reducers/notificationReducer';

import userService from '../../services/userService';

const SlideIn = ({ children, ...props }) => (
    <CSSTransition
        {...props}
        timeout={200}
        classNames="slide"
        unmountOnExit={true}
        mountOnEnter={true}
    >
        {children}
    </CSSTransition>
);

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
            products: [],
            timerRunning: false,
            productTimeout: 2500,
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
            console.log(this.state.user);
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

            let user = Object.assign(this.state.user);
            user.account_balance = newBalance;
            this.setState({ user: user });
            this.props.addProductToNotification(product);
            this.setState({
                timeoutHandler: setTimeout(
                    () => this.props.clearProductsFromNotification(),
                    this.state.productTimeout
                )
            });
            console.log(this.state.user);
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
            console.log(this.state.user);
        } catch (error) {
            this.props.errorMessage('Virhe tallettamisessa');
        }
    }

    render() {
        return (
            <div>
                <NotificationDrawer>
                    <TransitionGroup
                        transitionName="notification"
                        transitionEnterTimeout={200}
                        transitionLeaveTimeout={200}
                    >
                        {this.props.notifications.map(
                            (notification, id) =>
                                notification.messageType === 'SUCCESS' ? (
                                    <SlideIn key={id}>
                                        <SuccessNotification
                                            message={notification.message}
                                            shadow
                                        />
                                    </SlideIn>
                                ) : (
                                    <SlideIn key={id}>
                                        <ErrorNotification
                                            message={notification.message}
                                            shadow
                                        />
                                    </SlideIn>
                                )
                        )}
                        {this.props.products &&
                            this.props.products.length > 0 && (
                                <SlideIn>
                                    <PurchaseNotification
                                        shadow
                                        products={this.props.products}
                                    />
                                </SlideIn>
                            )}
                    </TransitionGroup>
                </NotificationDrawer>
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
        notifications: state.notification.notifications,
        products: state.notification.purchasedItems,
        token: state.authentication.access_token
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
