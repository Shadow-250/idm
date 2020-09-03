const cookieSignature = require('cookie-signature');
const config = require('../config');
const secretKey = config.SECRET_KEY_SIGN_COOKIE
const axios = require('axios');

const signin = (req, res) => {
    const { name, password } = req.body;

    axios({
        method: 'POST',
        url: `${config.idm_server_api}/auth/tokens`,
        headers: {
            'Content-Type': 'application/json',
        },
        data: req.body
    }).then(response0 => {
        var access_token = response0.headers['x-subject-token'];
        // res.json('GET TOKEN SUCCESS');
        axios({
            method: 'GET',
            url: `${config.idm_server_api}/auth/tokens`,
            headers: {
                'x-auth-token': access_token,
                'x-subject-token': access_token
            }
        }).then(response1 => {
            // console.log(response1)
            // res.json('ahah')
            // res.writeHead({access_token: cookieSignature.sign(access_token, secretKey)});
            res.cookie('access_token', access_token, {
                expires: new Date(Date.now() + 1 * 3600000), // cookie will be removed after 1 hours
                secure: true
            })
            // res.set(
                // 'access_token', cookieSignature.sign(access_token, secretKey)
            // )
            res.json({
                status: 'LOGIN SUCCESS',
                User: response1.data.User
            });           
        }).catch(err => {
            res.json(err);
            // console.log(err);
            // console.log(err.respon);
        })
    }).catch(error => {
        res.json(error);
    });
}

const signup = (req, res) => {
    const { user : { username, email, password }} = req.body;

    axios({
        method: 'POST',
        url: `${config.idm_server_api}/auth/tokens`,
        headers: {
            'Content-Type': 'application/json',
        },
        data: {
            'name' : 'admin@test.com',
            'password': '1234'
        }
    }).then((response) => {
        response.json('GET TOKEN SUCCESS')
        axios({
            method: 'POST',
            url: `${config.idm_server_api}/users`,
            data: req.body,
            headers: {
                'x-auth-token': response.headers['x-subject-token']
            }
        }).then(res => {
            res.json('SIGNUP SUCCESS');
               
        }).catch(error => {
            res.json({status: 'SIGNUP ERROR', error: error});
        });
    })
}

module.exports = {signin, signup}