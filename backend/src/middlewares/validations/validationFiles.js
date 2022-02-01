const validationFiles = {
  fileExists: (request, response, next) => {
    if (
      !request.files ||
      Object.keys(request.files).length === 0 ||
      !request.files.file
    ) {
      return response.status(400).json({
        message: 'File not found',
      });
    }

    return next();
  },
};

module.exports = validationFiles;
