import React from 'react';
import './styles/Content.css';
import { Grid, Col, Row } from 'react-flexbox-grid';
import FeaturedProducts from './FeaturedProducts';
import Deposit from './Deposit';
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
                <Grid style={{ width: '100%' }}>
                    <Row>
                        <Col xs={12}>
                            <FeaturedProducts />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={2} />
                        <Col xs={8}>
                            <Terminal deposit={this.props.deposit} />
                        </Col>
                        <Col xs={2} />
                    </Row>
                    <Deposit />
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
