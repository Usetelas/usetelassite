class ArticleError extends Error {
  constructor(message) {
    super(message);

    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);
  }
}

class ArticleNotFoundError extends ArticleError {
  constructor() {
    super("O artigo que você tentou acessar não existe ou foi excluído.");
    this.code = 404;
  }
}

class ArticleValidationError extends ArticleError {
  constructor() {
    super("A quantidade de caracteres é inválida");
    this.code = 400;
  }
}

class ArticleMissingKeyError extends ArticleError {
  constructor(key) {
    super(`O campo ${key} está em branco.`);
    this.code = 400;
  }
}

module.exports = {
  ArticleNotFoundError, ArticleValidationError, ArticleMissingKeyError
}