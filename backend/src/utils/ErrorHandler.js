class ErrorHandler extends Error {
    constructor(message, statusCode, stack, errors = []) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        this.stack = stack;
        this.status = false;
        this.message = message;
    }
}

export default ErrorHandler;