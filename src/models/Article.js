const { Schema, model } = require("mongoose");
const paginate = require("mongoose-paginate-v2");
const aws = require("aws-sdk");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

const { ArticleMissingKeyError } = require('../errors/article.error');

const s3 = new aws.S3();

const schema = new Schema(
  {
    title: String,
    introduction: String,
    content: String,
    key: String,
    url: String,
    slug: String,
  },
  { timestamps: true }
);

schema.pre("save", function () {
  if (!this.url) {
    this.url = `${process.env.USETELAS_APP_URL}/files/${this.key}`;
  }
});

schema.pre("remove", function () {
  if (process.env.USETELAS_STORAGE_TYPE === "s3") {
    return s3
      .deleteObject({
        Bucket: "usetelas",
        Key: this.key,
      })
      .promise();
  } else {
    return promisify(fs.unlink)(
      path.resolve(__dirname, "..", "..", "tmp", "uploads", this.key)
    );
  }
});

schema.plugin(paginate);

function validateArticle({ title = undefined, introduction = undefined, content = undefined, slug = undefined }) {
  if(!title) return { err: new ArticleMissingKeyError("TÍTULO") };
  if(!introduction) return { err: new ArticleMissingKeyError("INTRODUÇÃO") };
  if(!content) return { err: new ArticleMissingKeyError("CONTEÚDO") };
  if(!slug) return { err: new ArticleMissingKeyError("SLUG") };
  
  return {
    title,
    introduction,
    content,
    slug
  }
}

module.exports = { Article: model("Article", schema), validateArticle };
