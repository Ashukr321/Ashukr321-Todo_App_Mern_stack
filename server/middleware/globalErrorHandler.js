

const globalErrorHandler = (err, req, res ) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    message,
  });
}

export default globalErrorHandler;