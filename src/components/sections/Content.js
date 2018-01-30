import React from "react";
import "./styles/Content.css";
import { Grid, Col, Row } from "react-flexbox-grid";
import PurchaseNotification from "./../notifications/PurchaseNotification";
import Centered from "./../helpers/Centered";

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
        {this.props.product && (
          <Centered>
            <PurchaseNotification
              price={this.props.product.price}
              shadow
              product={this.props.product.name}
            />
          </Centered>
        )}
      </main>
    );
  }
}
