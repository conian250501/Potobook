import { Photo } from "../models/photoModel";
import { Album } from "../models/albumModel";
import { Like } from "../models/likeModel";

export const feedController = {
  feedPhotoPage: async (req, res, next) => {
    try {
      const perPage = req.query.limit || 12;
      const page = req.query.page || 1;
      const total = await Photo.find({ mode: "public" }).count();
      const totalPage = Math.ceil(total / perPage);

      const photos = await Photo.find({ mode: "public" })
        .populate("author")
        .populate({ path: "likes", populate: { path: "author" } })
        .skip((page - 1) * perPage)
        .limit(perPage);

      const photosReversed = photos.reverse();

      return res.render("client/feed", {
        title: "feedPhotoPage",
        user: req.user,
        photos: photosReversed,
        perPage,
        page,
        totalPage,
      });
    } catch (error) {
      console.log({ error });
      next(error);
    }
  },
  albumPhotoPage: async (req, res, next) => {
    try {
      const perPage = req.query.limit || 12;
      const page = req.query.page || 1;
      const total = await Album.find({ mode: "public" }).count();
      const totalPage = Math.ceil(total / perPage);

      const albums = await Album.find({ mode: "public" })
        .populate("author")
        .populate("photos")
        .populate({ path: "likes", populate: { path: "author" } })
        .skip((page - 1) * perPage)
        .limit(perPage);
      const albumsReversed = albums.reverse();
      return res.render("client/feedAlbum", {
        title: "feedAlbumPage",
        user: req.user,
        albums: albumsReversed,
        perPage,
        page,
        totalPage,
      });
    } catch (error) {
      console.log({ error });
      next(error);
    }
  },
};
