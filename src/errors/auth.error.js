class AuthError extends Error {
  constructor(message) {
    super(message);

    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

class UnauthorizedError extends AuthError {
  constructor() {
    super("Você não tem permissão para acessar esse recurso.");
    this.code = 401;
  }
}

class InvalidTokenError extends AuthError {
  constructor() {
    super("O token fornecido é invalido.");
    this.code = 401;
  }
}

module.exports = { UnauthorizedError, InvalidTokenError };