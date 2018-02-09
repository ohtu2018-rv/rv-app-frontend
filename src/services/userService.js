/* User service */

const axios = require('axios');

const getUser = async (token) => {
    return axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/user/account`, {
        headers: { 'Authorization': 'Bearer ' + token }
    }).then(res => res.data);
}

const reduceBalance = async (token, amount) => {
    return axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/user/account/debit`, {
        amount: amount
    }, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }).then(res => res.data.account_balance);
}

const increaseBalance = async (token, amount) => {
    return axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/user/account/credit`, {
        amount: amount
    }, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }).then(res => res.data.account_balance);
}

export default {
    getUser, reduceBalance, increaseBalance
}