//404_not found

const notfound = (req, res, next) =>{
    const error = new Error(`Page not found - ${req.originalUrl}`)
    res.status(404);
    next(error);
}

const errorMiddleware = (error, req, res, next ) => {
    if(res.headerSent){
        return next(error)
    }
    res.status(error.code || 500).json({message: error.message || "internal server error"})
}


module.exports = {errorMiddleware, notfound}