const { Router } = require("express");
const routes = Router();
const multer = require("multer");
const nodemailer = require("nodemailer");
const multerConfig = require("./config/multer");

const AdminController = require("./controllers/AdminController");
const AuthController = require("./controllers/AuthController");
const VideoController = require("./controllers/VideoController");
const ArticleController = require("./controllers/ArticleController");

const authenticate = require("./middlewares/authenticate");
const errorHandler = require("./middlewares/errorHandler");

routes.post("/register", AdminController.store);

routes.get("/profile", authenticate, AuthController.show);
routes.post("/login", AuthController.store);

routes.get("/articles", ArticleController.index);
routes.get("/articles/:id", ArticleController.show);
routes.post(
  "/articles",
  authenticate,
  multer(multerConfig).single("file"),
  ArticleController.store
);
routes.put("/articles/:id", authenticate, ArticleController.update);
routes.delete("/articles/:id", authenticate, ArticleController.destroy);

routes.get("/videos", VideoController.index);
routes.get("/videos/:id", VideoController.show);
routes.post("/videos", authenticate, VideoController.store);
routes.put("/videos/:id", authenticate, VideoController.update);
routes.delete("/videos/:id", authenticate, VideoController.destroy);

routes.post("/mail", async (req, res) => {
  const { name, phone, message, sender } = req.body;
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USETELAS_SENDER_EMAIL,
      pass: process.env.USETELAS_SENDER_EMAIL_PASSWORD,
    },
  });

  let mailOptions = {
    from: "usetelas.site@gmail.com",
    to: "usetelas@contato.com",
    subject: `Contato de Usetelas:${name} - Telefone: ${phone}`,
    text: `Email: ${sender} \n Mensagem: ${message}`,
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) return res.status(500).json(err);

    return res.status(200).json({ message: "sucesso" });
  });
});

routes.use(errorHandler);

module.exports = routes;
