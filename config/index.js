'use strict';

module.exports = {
    mongo: {
        opts: {
            safe: true
        },
        url: process.env.MONGODB_URL || 'mongodb://localhost/test',
        expireTimeHours: 24
    },
    port: process.env.PORT || 9003,
    bgUrl: process.env.BG_URL || 'http://localhost',
}
