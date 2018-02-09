/* User service */
const axios = require('axios');

const getUser = async (token) => {
    return axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/user/account`, {
        headers: { 'Authorization': 'Bearer ' + token }
    }).then(res => res.data);
}

export default {
    getUser
}