import React, { Component } from 'react';
import { Header } from '../sections/Header';
import Content from '../sections/Content';
import Centered from '../helpers/Centered';

import SuccessNotification from './../notifications/SuccessNotification';
import { CSSTransitionGroup } from 'react-transition-group';

import { connect } from 'react-redux';

import {
    logout
} from './../../reducers/authenticationReducer';

import {
    successMessage,
    errorMessage
} from './../../reducers/notificationReducer';

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
            productTimeout: 3500,
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
            let user = Object.assign(this.state.user);
            user.account_balance = updatedUser.account_balance;
            this.setState({ user: user });
            this.addProduct(product);
            console.log(this.state.user);
        });
    }

    store(product) {
        this.increaseBalance(product).then(updatedUser => {
            let user = Object.assign(this.state.user);
            user.account_balance = updatedUser.account_balance;
            this.setState({ user: user });
            this.props.successMessage(
                'Talletettu ' +
                    parseFloat(product.price / 100).toFixed(2) +
                    ' €'
            );
            console.log(this.state.user);
        });
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
                <CSSTransitionGroup
                    transitionName="notification"
                    transitionEnterTimeout={200}
                    transitionLeaveTimeout={200}
                >
                    {this.props.success && (
                        <Centered>
                            <SuccessNotification
                                message={this.props.success}
                                shadow
                            />
                        </Centered>
                    )}
                    {this.props.error && (
                        <div>ERROR MESSAGE: {this.props.error}</div>
                    )}
                </CSSTransitionGroup>
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
        success: state.notification.success,
        error: state.notification.error
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
