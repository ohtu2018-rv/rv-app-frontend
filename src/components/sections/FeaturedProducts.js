import React from 'react';
import './styles/FeaturedProducts.css';
import { connect } from 'react-redux';
import { buyProduct } from '../../reducers/productReducer';
import Loader from '../loaders/Loader';

class FeaturedProductInfo extends React.Component {
    render() {
        const product = this.props.product;

        return (
            <li>
                <a
                    href="/"
                    role="button"
                    onClick={e => {
                        e.preventDefault();
                        this.props.buy();
                    }}
                >
                    <div className="featured-name">
                        {product.product_name}
                    </div>
                    <div className="featured-price">
                        {(product.sellprice / 100).toFixed(2).replace('.', ',')} &euro;
                    </div>
                </a>
            </li>
        );
    }
}

export class FeaturedProducts extends React.Component {
    getFeaturedProducts() {
        // these will some day come from backend, hardcoded for now
        const featuredProductIds = [54, 50, 52, 626, 344];
        return featuredProductIds
            .map(pid => Object.assign({}, this.props.products.find(p => p.product_id === pid)))
            .map(p => 
                <FeaturedProductInfo
                    key={p.product_id}
                    product={p}
                    buy={() => this.props.buyProduct(p, 1)}
                />
            );
    }

    render() {
        return (
            <div className="featured-products">
                <div className="featured-header">
                    <h2>Suositut tuotteet</h2>
                </div>
                {this.props.loading ? <Loader/> : <ul>{this.getFeaturedProducts()}</ul>}
            </div>
        );
    }
}

const mapDispatchToProps = {
    buyProduct
};

const mapStateToProps = state => ({
    products: state.products.products,
    loading: state.products.gettingProducts
});

export default connect(mapStateToProps, mapDispatchToProps)(FeaturedProducts);
