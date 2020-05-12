const { Schema, model } = require('mongoose');
const paginate = require("mongoose-paginate-v2");

const { InvalidVideoUrlError, VideoMissingKeyError } = require('../errors/video.error');

const schema = new Schema({
  title: String,
  url: String,
}, { timestamps: true });

schema.plugin(paginate);

function validateVideo({title = undefined, url = undefined}) {
  if(!title) return { err: new VideoMissingKeyError("TÍTULO") };
  if(!url) return { err: new VideoMissingKeyError("URL") };

  let query = {};
  const [, queryString] = url.split('?');
  
  if(!queryString) {
    return { err: new InvalidVideoUrlError() };
  }

  const keyValuePairs = queryString.split('&');
  
  keyValuePairs.forEach(keyValuePair => {
    const split = keyValuePair.split('=');
    query[split[0]] = split[1];
  });

  if(!query.v) {
    return { err: new InvalidVideoUrlError() };
  }

  const embedUrl = `https://www.youtube.com/embed/${query.v}`;
  
  return {
    title, 
    url: embedUrl
  };
}

module.exports = { Video: model("Video", schema), validateVideo };