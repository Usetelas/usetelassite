const { Admin } = require("../models/Admin");
const {
  IncorrectPasswordError,
  AdminNotFoundError,
  AdminValidationError
} = require("../errors/admin.error");

class AdminController {
  async store(req, res, next) {
    const { name, email, password } = req.body;

    if(!name) return next(new AdminValidationError("Nome"));
    if(!email) return next(new AdminValidationError("Email"));
    if(!password) return next(new AdminValidationError("Senha"));

    const admin = await Admin.create(req.body);

    res.status(200).json("Admin criado com sucesso");
  }

  async show(req, res, next) {
    let admin = await Admin.findById(req.params.id);
    if (!admin) return next(new AdminNotFoundError());

    res.status(200).json({ admin });
  }
}

module.exports = new AdminController();
