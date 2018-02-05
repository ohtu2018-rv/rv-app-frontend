import React from 'react';
import './styles/Content.css';
import { Grid, Col, Row } from 'react-flexbox-grid';
import PurchaseNotification from './../notifications/PurchaseNotification';
import BalanceNotification from './../notifications/BalanceNotification';
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
                {this.props.products &&
                    this.props.products.length > 0 && (
                        <Centered>
                            <PurchaseNotification
                                shadow
                                products={this.props.products}
                            />
                        </Centered>
                    )}
                {this.props.balance && (
                    <Centered>
                        <BalanceNotification
                            amount={this.props.balance}
                            shadow
                        />
                    </Centered>
                )}
            </main>
        );
    }
}
