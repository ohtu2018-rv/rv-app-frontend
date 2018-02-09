import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import './styles/ShoppingCart.css';

import { connect } from 'react-redux';

const ShoppingCartItem = ({ item }) => {
    return (
        <li>
            <Row>
                <Col xs={6}>{item.product_name}</Col>
                <Col xs={3} className="cart-item-quantity">
                    {item.quantity}
                </Col>
                <Col xs={3} className="cart-item-total">
                    {(item.quantity * item.price / 100).toFixed(2)} &euro;
                </Col>
            </Row>
        </li>
    );
};

class ShoppingCart extends React.Component {
    calculateCartTotal = () =>
        this.props.products
            .map(item => item.price * item.quantity)
            .reduce((sum, cur) => sum + cur, 0);

    render() {
        const cartItems = this.props.products.map(item => (
            <ShoppingCartItem key={item.barcode} item={item} />
        ));

        return (
            <div className="shopping-cart">
                <h2>Ostoskori</h2>
                <div className="cart-items-header">
                    <Row>
                        <Col xs={6} className="cart-item-header">
                            Tuote
                        </Col>
                        <Col xs={3} className="cart-item-quantity-header">
                            Määrä
                        </Col>
                        <Col xs={3} className="cart-item-total-header">
                            Hinta
                        </Col>
                    </Row>
                </div>
                <ul>{cartItems}</ul>
                <div className="cart-total">
                    <Row end="xs">
                        <Col xs={3}>Yhteensä</Col>
                        <Col xs={3} className="cart-total-price">
                            {(this.calculateCartTotal() / 100).toFixed(2)}{' '}
                            &euro;
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        products: state.shoppingCart.products
    };
};

export default connect(mapStateToProps, null)(ShoppingCart);
