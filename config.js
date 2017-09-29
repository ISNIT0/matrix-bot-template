// For help getting USERNAME and ACCESSTOKEN, see this article: https://reeve.xyz/getting-started-with-matrix-bots-on-nodejs/

const config = {
    "production": {},
    "development": {
        "matrix": {
            "baseUrl": "https://matrix.org",
            "userId": "@USERNAMEHERE:matrix.org",
            "accessToken": "ACCESSTOKENHERE"
        }
    }
};


module.exports = config[process.env.NODE_ENV || 'development'];