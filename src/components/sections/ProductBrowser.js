import React from 'react';
import { connect } from 'react-redux';
import { showModal } from '../../reducers/modalReducer';
import ProductPopup from '../modals/ProductPopup';
import Loader from '../loaders/Loader';
import './styles/ProductBrowser.css';

export class ProductBrowser extends React.Component {
    createProductsList() {
        const productList = this.props.products.slice().sort(
            (a, b) => {
                const [aname, bname] = [
                    a.product_name.toLowerCase(),
                    b.product_name.toLowerCase()
                ];

                return aname < bname ? -1 : (aname === bname ? 0 : 1);
            }
        ).filter(p => p.product_group !== 65535).map(p => (
            <li key={p.product_id} className="product-list-item">
                <a
                    role="button"
                    href="/"
                    onClick={e => {
                        e.preventDefault();
                        this.props.showModal(ProductPopup, { 
                            product: p
                        });
                    }}>
                    <span className="product-list-item-name">{p.product_name}</span>
                    <span className="product-list-item-price">{
                        (p.sellprice / 100).toFixed(2).replace('.', ',')
                    } &euro;</span>
                </a>
            </li>
        ));

        return productList;
    }

    render() {
        return (
            <div className="product-browser-container">
                <div className="product-filter">
                    <select>
                        <option value="0">Kaikki tuotteet</option>
                        <option value="1">Kategoria 1</option>
                        <option value="2">Kategoria 2</option>
                    </select>
                    <input type="text" placeholder="Etsi tuote..."/>
                </div>
                <div className="product-browser-list">
                    { this.props.loading ? <Loader/> : <ul>{this.createProductsList()}</ul> }
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = {
    showModal
};

const mapStateToProps = state => ({
    products: state.products.products,
    loading: state.products.gettingProducts
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductBrowser);
