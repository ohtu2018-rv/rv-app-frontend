import React from 'react';
import './styles/Content.css';
import { Grid, Col, Row } from 'react-flexbox-grid';
import FeaturedProducts from './FeaturedProducts';
import ShoppingCart from './ShoppingCart';
import Terminal from './Terminal';

import { connect } from 'react-redux';

import {
    successMessage,
    errorMessage
} from './../../reducers/notificationReducer';

export class Content extends React.Component {
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
                <Grid style={{width: '100%'}}>
                    <Row>
                        <Col xs={6}>
                            <FeaturedProducts />
                        </Col>
                        <Col xs={6}>
                            <ShoppingCart />
                        </Col>
                    </Row>
                    <Row />
                    <Row>
                        <Terminal deposit={this.props.deposit} />
                    </Row>
                </Grid>
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
