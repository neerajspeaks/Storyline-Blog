const fs = require('fs');

const logReqRes = (fileName) => {
    return (req, res, next) => {
        fs.appendFile(
            fileName,
            `Date: ${Date.now().toString()}, IP Addr: ${req.ip}, Method: ${req.method}, Path: ${req.path}\n`,
            (error, data) => {
                next();
            }
        );
    }
}

module.exports = { logReqRes };