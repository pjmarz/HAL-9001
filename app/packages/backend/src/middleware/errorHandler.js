const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Default error
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Handle specific error types
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = err.message;
  } else if (err.name === 'MulterError') {
    statusCode = 400;
    message = 'File upload error: ' + err.message;
  } else if (err.response && err.response.status) {
    // OpenAI API errors
    statusCode = err.response.status;
    message = err.response.data?.error?.message || 'External API error';
  }

  res.status(statusCode).json({
    error: {
      message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  });
};

module.exports = errorHandler;

