import React from 'react';
import './styles/Content.css';
import { Grid, Col, Row } from 'react-flexbox-grid';
import PurchaseNotification from './../notifications/PurchaseNotification';
import Centered from './../helpers/Centered';
import FeaturedProducts from './FeaturedProducts';
import ShoppingCart from './ShoppingCart';

export class Content extends React.Component {
    render() {
        return (
            <main>
                <Grid>
                    <Row>
                        <Col xs={6}>
                            <FeaturedProducts />
                        </Col>
                        <Col xs={6}>
                            <ShoppingCart />
                        </Col>
                    </Row>
                </Grid>
                {this.props.product && (
                    <Centered>
                        <PurchaseNotification
                            price={this.props.product.price}
                            shadow
                            product={this.props.product.name}
                            deposit={this.props.product.name === 'deposit'}
                        />
                    </Centered>
                )}
            </main>
        );
    }
}
