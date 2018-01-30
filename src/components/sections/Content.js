import React from "react";
import "./styles/Content.css";
import { Grid, Col, Row } from "react-flexbox-grid";
export class Content extends React.Component {
  render() {
    return (
      <main>
        <Grid>
          <Row>
            <Col xs={8}>Featured products</Col>
            <Col xs={3}>Shopping cart</Col>
          </Row>
        </Grid>
      </main>
    );
  }
}
