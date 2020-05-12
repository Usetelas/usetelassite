const { Video, validateVideo } = require('../models/Video');
const { VideoNotFoundError } = require('../errors/video.error');

class VideoController {

  async store(req, res, next) {
    const validatedVideo = validateVideo(req.body);
    if(validatedVideo.err) return next(validatedVideo.err);
  
    const video = await Video.create(validatedVideo);

    res.status(200).json({ video });    
  }

  async index(req, res, next) {
    const pagination = await Video.paginate(
      {},
      {
        limit: 5,
        page: req.query.page || 1,
        sort: { createdAt: -1 }
      }
    );

    res.status(200).json(pagination);
  }

  async show(req, res, next) {
    const video = await Video.findById(req.params.id);
    if(!video) return next(new VideoNotFoundError());

    res.status(200).json(video);
  }

  async update(req, res, next) {
    const validatedVideo = validateVideo(req.body);
    if(validatedVideo.err) return next(validatedVideo.err);

    const video = await Video.findByIdAndUpdate(req.params.id, validatedVideo, { new: true });
    if(!video) return next(new VideoNotFoundError());
    
    res.status(200).json(video);
  }

  async destroy(req, res, next) {
    const video = await Video.findById(req.params.id);
    if(!video) return next(new VideoNotFoundError());

    await video.remove();

    res.status(200).json(video);
  }
}

module.exports = new VideoController();