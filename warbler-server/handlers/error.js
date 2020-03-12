// Generic error handler, looks for the 'bubbled up' message and status code otherwise it sets generic 500 and message
function errorHandler(error, request, response, next) {
  response.status(error.status || 500).json({
    error: {
      message: error.message || 'Oops! Something went wrong...',
    },
  });
}

export default errorHandler;
