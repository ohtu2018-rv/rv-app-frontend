import React from 'react';
import './styles/PurchaseNotification.css';
import SuccessNotification from './SuccessNotification';

const PurchaseNotificationProduct = ({ product }) => {
    return (
        <div className="product" key={product.barcode}>
            {product.quantity} x {product.product_name}{' '}
            <b>
                {parseFloat(product.price / 100 * product.quantity).toFixed(2)}{' '}
                &euro;
            </b>
        </div>
    );
};

/**
 * Purchase notification.
 */
const PurchaseNotification = ({ products, shadow }) => {
    return (
        <SuccessNotification shadow={shadow}>
            <div className="products">
                {products.map(product => (
                    <PurchaseNotificationProduct
                        product={product}
                        key={product.barcode}
                    />
                ))}
            </div>
        </SuccessNotification>
    );
};

export default PurchaseNotification;
