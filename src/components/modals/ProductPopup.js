import React from 'react';
import './styles/ProductPopup.css';
import { connect } from 'react-redux';
import { closeModal } from '../../reducers/modalReducer';
import { buyProduct } from '../../reducers/productReducer';

export class ProductPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 1
        };

        this.changeQuantity = this.changeQuantity.bind(this);
    }

    changeQuantity(delta) {
        if (this.state.quantity + delta >= 1) {
            this.setState({
                quantity: this.state.quantity + delta
            });
        }
    }

    render() {
        const prod = this.props.product;

        return <div className="product-popup">
            <div className="product-info">
                <div className="product-name">
                    {prod.product_name}
                </div>
            </div>
            <div className="product-quantity">
                <div>Määrä:</div>
                <div className="quantity-picker">
                    <button onClick={() => this.changeQuantity(-1)}>-</button>
                    <span>{this.state.quantity} kpl</span>
                    <button onClick={() => this.changeQuantity(1)}>+</button>
                </div>
                <div className="total">
                    <div>Yhteensä</div>
                    <div className="sum">
                        {
                            ((prod.sellprice * this.state.quantity) / 100)
                                .toFixed(2).replace('.', ',')
                        } &euro;
                    </div>
                </div>
            </div>
            <div className="product-actions">
                <button 
                    className="cancel-btn"
                    onClick={() => this.props.closeModal()}
                >
                    Peruuta
                </button>
                <button 
                    className="purchase-btn"
                    onClick={() => {
                        this.props.buyProduct(prod, this.state.quantity);
                        this.props.closeModal();
                    }}
                >
                    Osta
                </button>
            </div>
        </div>;
    }
}

const mapDispatchToProps = {
    closeModal,
    buyProduct
};

export default connect(null, mapDispatchToProps)(ProductPopup);
