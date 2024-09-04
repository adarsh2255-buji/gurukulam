const notFound =  (req, res, next) => {
    const error = new Error(`Not Found: ${req.originalUrl}`);
    error.status(404);
    next(error);
};

const errorHandler = (error, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let errorMessage = error.message;

    if(err.name === 'CastError' && errorMessage.kind === 'ObjectId') {
        statusCode = 404;
        errorMessage = 'Resource not found';
    }
    
    res.status(statusCode).json({
        message: errorMessage,
        stack : process.env.NODE_ENV === 'production' ? null : errorMessage.stack
    });
}

export {notFound, errorHandler}