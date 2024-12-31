class HttpError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.code = statusCode;
        this.status = "failed" 
    }
}

module.exports = HttpError;