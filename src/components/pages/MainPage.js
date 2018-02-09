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
            token:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MTc5MTkxMjQsImRhdGEiOnsidXNlcm5hbWUiOiJub3JtYWxfdXNlciIsInJvbGVzIjpbInVzZXIiXX0sImlhdCI6MTUxNzgzNTI3M30.mxFF5lNbpOrVVDCm7djSTxVnsRXZrajFGt1lQeAyG5Q',
            products: [],
            timerRunning: false,
            productTimeout: 2500,
            timeoutHandler: null,
            balance: null
        };
        this.buy = this.buy.bind(this);
        this.store = this.store.bind(this);
    }

    getUser() {
        return fetch('https://rv-backend.herokuapp.com/api/v1/user/account', {
            headers: new Headers({
                Authorization: `Bearer ${
                    this.props.token
                }` /* HUOM fancyt ` -sulut, "hipsusulut" */
            })
        }).then(res => res.json());
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
        this.getUser().then(user => {
            this.setState({ user: user });
            console.log(this.state.user);
        });
    }

    componentWillUnmount() {
        document.removeEventListener('keypress', this.handleKeyPress);
    }

    reduceBalance(product) {
        return fetch(
            'https://rv-backend.herokuapp.com/api/v1/user/account/debit',
            {
                method: 'POST',
                headers: new Headers({
                    Authorization: `Bearer ${
                        this.props.token
                    }` /* HUOM fancyt ` -sulut, "hipsusulut" */,
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify({
                    amount: product.price
                })
            }
        ).then(res => res.json());
    }

    /**
     * Increases account balance.
     */
    increaseBalance(product) {
        return fetch(
            'https://rv-backend.herokuapp.com/api/v1/user/account/credit',
            {
                method: 'POST',
                headers: new Headers({
                    Authorization: `Bearer ${
                        this.props.token
                    }` /* HUOM fancyt ` -sulut, "hipsusulut" */,
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify({
                    amount: product.price
                })
            }
        ).then(res => res.json());
    }

    /**
     * Buys a product.
     */
    buy(product) {
        this.reduceBalance(product).then(updatedUser => {
            if (updatedUser.error_code) {
                this.props.errorMessage(updatedUser.message);
            } else {
                if (this.state.timeoutHandler) {
                    clearTimeout(this.state.timeoutHandler);
                    this.setState({ timeoutHandler: null });
                }
                let user = Object.assign(this.state.user);
                user.account_balance = updatedUser.account_balance;
                this.setState({ user: user });
                this.props.addProductToNotification(product);
                this.setState({
                    timeoutHandler: setTimeout(
                        () => this.props.clearProductsFromNotification(),
                        this.state.productTimeout
                    )
                });
            }
        });
    }

    store(product) {
        this.increaseBalance(product).then(updatedUser => {
            let user = Object.assign(this.state.user);
            user.account_balance = updatedUser.account_balance;
            this.setState({ user: user });
            this.props.successMessage(
                'Talletettu RV-tilille ' +
                    parseFloat(product.price / 100).toFixed(2) +
                    ' €'
            );
        });
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
        products: state.notification.purchasedItems
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
