import React, { Component } from 'react';
import { Header } from '../sections/Header';
import Content from '../sections/Content';
import NotificationDrawer from '../helpers/NotificationDrawer';

import SuccessNotification from './../notifications/SuccessNotification';
import ErrorNotification from './../notifications/ErrorNotification';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { connect } from 'react-redux';

import {
    logout
} from './../../reducers/authenticationReducer';

import {
    successMessage,
    errorMessage
} from './../../reducers/notificationReducer';

import userService from '../../services/userService';

const SlideIn = ({ children, ...props }) => (
    <CSSTransition {...props} timeout={200} classNames="slide" unmountOnExit={true} mountOnEnter={true}>
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
            productTimeout: 3500,
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
            var newBalance = await userService.reduceBalance(this.props.token, product.price);

            let user = Object.assign(this.state.user);
            user.account_balance = newBalance;
            this.setState({ user: user });
            this.addProduct(product);
            console.log(this.state.user);
        }
        catch (error) {
            this.props.errorMessage('Virhe ostamisessa');
        }
    }

    async store(product) {
        try {
            var newBalance = await userService.increaseBalance(this.props.token, product.price);

            let user = Object.assign(this.state.user);
            user.account_balance = newBalance;
            this.setState({ user: user });
            this.props.successMessage(
                'Talletettu RV-tilille ' +
                    parseFloat(product.price / 100).toFixed(2) +
                    ' €'
            );
            console.log(this.state.user);
        }
        catch (error) {
            this.props.errorMessage('Virhe tallettamisessa');
        }
    }

    /**
     * Adds a product.
     */
    addProduct(addedProduct) {
        this.removeProductRemovalTimeout();
        const product = this.state.products.find(
            product => product.barcode === addedProduct.barcode
        );

        if (product) {
            const oldProducts = this.state.products.filter(
                product => product.barcode !== addedProduct.barcode
            );
            console.log('Old products: ', oldProducts);
            const newProducts = this.state.products.filter(
                product => product.barcode === addedProduct.barcode
            );
            const newProduct = newProducts[0];

            newProduct.quantity = newProduct.quantity + addedProduct.quantity;
            console.log('New product: ', newProduct);
            this.setState({ products: oldProducts.concat(newProduct) });
        } else {
            console.log('Added new product: ', addedProduct);
            const products = this.state.products;
            products.push(addedProduct);
            this.setState({ products });
        }
        this.setProductRemovalTimeout();
    }

    /**
     * Adds product removal timeout
     */
    setProductRemovalTimeout() {
        console.log('Items before timeout removal: ', this.state.products);
        const timeoutHandler = setTimeout(() => {
            this.setState({ products: [] });
        }, this.state.productTimeout);
        this.setState({ timeoutHandler });
    }

    /**
     * Removes product removal timeout
     */
    removeProductRemovalTimeout() {
        if (this.state.timeoutHandler !== null) {
            clearTimeout(this.state.timeoutHandler);
            this.setState({ timeoutHandler: null });
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
                    </TransitionGroup>
                </NotificationDrawer>
                <Header
                    logout={this.props.logout}
                    user={this.state.user}
                    buy={this.buy}
                    store={this.store}
                />
                <Content
                    products={this.state.products}
                    balance={this.state.balance}
                />
            </div>
        );
    }
}

const mapDispatchToProps = {
    successMessage,
    errorMessage,
    logout
};

const mapStateToProps = state => {
    return {
        notifications: state.notification.notifications,
        token: state.authentication.access_token
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
