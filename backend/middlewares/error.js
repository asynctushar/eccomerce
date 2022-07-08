const ErrorHandler = require("../utils/errorHandler");

const errorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internel Server Error.";

   

    // Wrong mongodb id error handling
    if (err.name == 'CastError') {
        console.log(3)
        const message = `Resource not found. Invalid: ${err.path}`;

        err = new ErrorHandler(message, 400)
    }

    res.status(err.statusCode).json({
        success: false,
        error: err.stack
    })
}

module.exports = errorMiddleware;
