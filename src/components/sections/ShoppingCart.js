import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import './styles/ShoppingCart.css';

const placeholderCart = [
    {
        barcode: '0000000000001',
        product_name: 'Kahvi',
        price: 50,
        quantity: 1
    },
    {
        barcode: '0000000000005',
        product_name: 'Myslipatukka',
        price: 80,
        quantity: 2
    }
];

class ShoppingCartItem extends React.Component {
    render() {
        const item = this.props.item;

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
    }
}

export default class ShoppingCart extends React.Component {
    calculateCartTotal() {
        return placeholderCart
            .map(item => item.price * item.quantity)
            .reduce((sum, cur) => sum + cur, 0);
    }

    render() {
        const cartItems = placeholderCart.map(item => (
            <ShoppingCartItem item={item} />
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
