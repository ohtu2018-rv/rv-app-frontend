import axios from 'axios';
/* Product service */

const buyProduct = (barcode, quantity, token) => {
    return axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/product/purchase`,
        {
            barcode,
            quantity
        },
        {
            headers: { Authorization: 'Bearer ' + token }
        }
    );
};

export default { buyProduct };
