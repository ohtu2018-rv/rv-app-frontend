import React from 'react';
import './styles/Content.css';
import { Grid, Col, Row } from 'react-flexbox-grid';
import FeaturedProducts from './FeaturedProducts';
import Terminal from './Terminal';

export default class Content extends React.Component {
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
                            <Terminal />
                        </Col>
                        <Col xs={2} />
                    </Row>
                </Grid>
            </main>
        );
    }
}
