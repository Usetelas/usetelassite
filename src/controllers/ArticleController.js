const { Article, validateArticle } = require("../models/Article");

const {
  ArticleNotFoundError,
  ArticleValidationError,
} = require("../errors/article.error");

class ArticleController {
  async store(req, res, next) {
    const validatedArticle = validateArticle(req.body);
    if(validatedArticle.err) return next(validatedArticle.err);

    const { title, content, introduction, slug } = validatedArticle;
    const { originalname: name, size, key, location: url = "" } = req.file;

    const article = await Article.create({
      title,
      introduction,
      content,
      slug,
      key,
      url,
    });

    res.status(200).json({ article });
  }

  async index(req, res, next) {
    let query = {};
    const pagination = await Article.paginate(query, {
      limit: 5,
      page: req.query.page || 1,
      sort: {
        createdAt: -1,
      },
    });

    res.status(200).json(pagination);
  }

  async show(req, res, next) {
    const article = await Article.findById(req.params.id);
    if (!article) return next(new ArticleNotFoundError());

    res.status(200).json({ article });
  }

  async update(req, res, next) {
    const validatedArticle = validateArticle(req.body);
    if(validatedArticle.err) return next(validatedArticle.err);

    const article = await Article.findByIdAndUpdate(
      req.params.id,
      validatedArticle,
      { new: true }
    );
    if (!article) return next(new ArticleNotFoundError());

    res.status(200).json({ article });
  }

  async destroy(req, res, next) {
    const article = await Article.findById(req.params.id);
    if (!article) return next(new ArticleNotFoundError());

    await article.remove();

    res.status(200).json({ article });
  }
}

module.exports = new ArticleController();
