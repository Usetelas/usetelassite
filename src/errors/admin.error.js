class AdminError extends Error {
  constructor(message) {
    super(message);

    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);
  }
}

class IncorrectPasswordError extends AdminError {
  constructor() {
    super("Senha inváida.");
    this.code = 401;
  }
}

class AdminNotFoundError extends AdminError {
  constructor() {
    super("Nenhum usuário registrado com os dados fornecidos.");
    this.code = 404;
  }
}

class AdminValidationError extends AdminError {
  constructor(field) {
    super(`O campo "${field}" é inválido ou está vazio.`);
    this.code = 400;
  }
}

module.exports = {
  IncorrectPasswordError, AdminNotFoundError, AdminValidationError
}