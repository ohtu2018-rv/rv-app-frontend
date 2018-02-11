/* User service */

const axios = require('axios');

/**
 * Fetches user information from backend.
 * @param {string} token access token
 */
const getUser = async token => {
    return axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/user/account`, {
            headers: { Authorization: 'Bearer ' + token }
        })
        .then(res => res.data);
};

/**
 * Reduces a user's account balance.
 * @param {string} token access token
 * @param {integer} amount amount to reduce
 */
const reduceBalance = async (token, amount) => {
    return axios
        .post(
            `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/account/debit`,
            {
                amount: amount
            },
            {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }
        )
        .then(res => res.data.account_balance);
};

/**
 * Increases a user's account balance.
 * @param {string} token access token
 * @param {integer} amount amount to increase
 */
const increaseBalance = async (token, amount) => {
    return axios
        .post(
            `${process.env.REACT_APP_BACKEND_URL}/api/v1/user/account/credit`,
            {
                amount: amount
            },
            {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }
        )
        .then(res => res.data.account_balance);
};

export default {
    getUser,
    reduceBalance,
    increaseBalance
};
