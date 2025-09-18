const session = require('express-session');
const MongoStore = require('connect-mongo');

const sessionConfig = (mongoUri) => {
    if (!mongoUri) throw new Error('MONGO_URI is required for session store');

    return session({
        secret: process.env.SESSION_SECRET || 'secretkey',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: mongoUri }),
        cookie: { maxAge: 1000 * 60 * 60 * 24 }
    });
};

module.exports = sessionConfig;
