// utils/ExpressError.js
class ExpressError extends Error {
    constructor(message, statusCode) {
        super(message); // Set the message as the error message
        this.statusCode = statusCode; // Set the status code
    }
}

module.exports = ExpressError;