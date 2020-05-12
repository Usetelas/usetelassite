const { Admin } = require('../models/Admin');
const { IncorrectPasswordError, AdminNotFoundError } = require('../errors/admin.error');

class AuthController {
  async store(req, res, next) {
    const { email, password } = req.body;

    let user = await Admin.findOne({ email });
    if(!user) return next(new AdminNotFoundError());

    const passwordMatch = await user.comparePassword(password);
    if(!passwordMatch) return next(new IncorrectPasswordError());

    const token = user.generateToken();

    res.status(200).json({ token });
  }

  async show(req, res, next) {
    const admin = req.admin;

    res.status(200).json({ admin });
  }
}

module.exports = new AuthController();