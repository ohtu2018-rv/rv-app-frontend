import React from 'react';
import './styles/Content.css';
import { Grid, Col, Row } from 'react-flexbox-grid';
import PurchaseNotification from './../notifications/PurchaseNotification';
import Centered from './../helpers/Centered';
import FeaturedProducts from './FeaturedProducts';
import ShoppingCart from './ShoppingCart';

import { connect } from 'react-redux';

import {
    successMessage,
    errorMessage
} from './../../reducers/notificationReducer';

class Content extends React.Component {
    render() {
        return (
            <main>
                <button
                    onClick={() =>
                        this.props.successMessage('Success message test')
                    }
                >
                    Trigger success
                </button>
                <button
                    onClick={() =>
                        this.props.errorMessage('Error message test')
                    }
                >
                    Trigger error
                </button>
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
            </main>
        );
    }
}

const mapDispatchToProps = {
    successMessage,
    errorMessage
};

const mapStateToProps = state => {
    return {
        success: state.notification.success,
        error: state.notification.error
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);
