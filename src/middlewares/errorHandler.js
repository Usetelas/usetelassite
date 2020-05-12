function errorHandler(err, req, res, next) {
  let response = {
    message:
      err.message ||
      "Ocorreu um erro em nossos servidores. Por favor, tente novamente mais tarde ou entre em contato conosco.",
  };

  return res.status(err.code || 500).json(response);
}

module.exports = errorHandler;
