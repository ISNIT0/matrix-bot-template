const config = {
    "production": {},
    "development": {
        "mysqldb": {
            "connectionLimit": 5,
            "host": "localhost",
            "user": "dev",
            "password": "password",
            "multipleStatements": true
        },
        "matrix": {
            "baseUrl": "https://matrix.org",
            "userId": "@tadhackbot:matrix.org",
            "accessToken": "MDAxOGxvY2F0aW9uIG1hdHJpeC5vcmcKMDAxM2lkZW50aWZpZXIga2V5CjAwMTBjaWQgZ2VuID0gMQowMDI5Y2lkIHVzZXJfaWQgPSBAdGFkaGFja2JvdDptYXRyaXgub3JnCjAwMTZjaWQgdHlwZSA9IGFjY2VzcwowMDIxY2lkIG5vbmNlID0gOStZY2FuQEdZPVFucUdJMwowMDJmc2lnbmF0dXJlIHrdIqlMCpsihJ89rOoXc2y2fRdS8ZiGripCHed3wZRACg"
        }
    }
};


module.exports = config[process.env.NODE_ENV || 'development'];