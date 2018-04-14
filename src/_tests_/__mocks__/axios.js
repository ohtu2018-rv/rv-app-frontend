'use strict';

const BACKEND_URL = `${process.env.REACT_APP_BACKEND_URL}`;

const authMock = (data, resolve, reject) => {
    if (data.username === 'user' && data.password === 'pass') {
        resolve({
            data: {
                access_token: 'access token',
                status: 200,
                statusText: 'OK'
            }
        });
    } else {
        reject({
            response: {
                data: {
                    error_code: 'invalid_credentials'
                },
                status: 403,
                statusText: 'Forbidden'
            }
        });
    }
};

const userDataMock = (data, resolve, reject) => {
    resolve({
        data: {
            account_balance: 500,
            email: 'address@example.com',
            full_name: 'User',
            username: 'user'
        }
    });
};

const registerMock = (data, resolve, reject) => {
    if (data.username !== 'duplicate') {
        resolve({
            data: {}
        });
    } else {
        reject({
            response: {
                data: {
                    error: 'error'
                },
                status: 403,
                statusText: 'Forbidden'
            }
        });
    }
};

const productsMock = (data, resolve, reject) => {
    resolve({
        data: {
            products: [
                {
                    product_id: 123,
                    product_name: 'Test product',
                    product_barcode: '123456789012',
                    product_group: 1,
                    sellprice: 100,
                    buyprice: 80,
                    quantity: 100
                }
            ]
        }
    });
};

function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        if (url === `${BACKEND_URL}/api/v1/user/authenticate`) {
            authMock(data, resolve, reject);
        } else if (url === `${BACKEND_URL}/api/v1/user/register`) {
            registerMock(data, resolve, reject);
        } else {
            reject({
                data: {},
                status: 404,
                statusText: 'Not Found',
                headers: {},
                config: {},
                request: {}
            });
        }
    });
}

function get(url, data = {}) {
    return new Promise((resolve, reject) => {
        if (url === `${BACKEND_URL}/api/v1/user/account`) {
            userDataMock(data, resolve, reject);
        } else if (url === `${BACKEND_URL}/api/v1/user/products`) {
            productsMock(data, resolve, reject);
        }
        else {
            reject({
                data: {},
                status: 404,
                statusText: 'Not Found',
                headers: {},
                config: {},
                request: {}
            });
        }
    });
}

const axios = jest.genMockFromModule('axios');
axios.post = post;
axios.get = get;

module.exports = axios;
