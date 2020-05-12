class VideoError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  
    Error.captureStackTrace(this, this.constructor);
  }
}

class VideoNotFoundError extends VideoError {
  constructor() {
    super("Vídeo não encontrado.");
    this.code = 404;
  }
}

class InvalidVideoUrlError extends VideoError {
  constructor() {
    super("O URL fornecido é inválido.");
    this.code = 400;
  }
}

class VideoMissingKeyError extends VideoError {
  constructor(key) {
    super(`O campo ${key} está em branco.`);
    this.code = 400;
  }
}

module.exports = {
  VideoMissingKeyError,
  VideoNotFoundError,
  InvalidVideoUrlError,
}