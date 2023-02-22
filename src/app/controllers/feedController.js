import { Photo } from "../models/photoModel";
import { Album } from "../models/albumModel";

export const feedController = {
  feedPhotoPage: async (req, res, next) => {
    try {
      const perPage = req.query.limit || 2;
      const page = req.query.page || 1;
      const total = await Photo.find({ mode: "public" }).count();
      const totalPage = Math.ceil(total / perPage);

      const photos = await Photo.find({ mode: "public" })
        .populate("author")
        .skip((page - 1) * perPage)
        .limit(perPage);

      return res.render("client/feed", {
        title: "feedPhotoPage",
        user: req.user,
        photos,
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
      const perPage = req.query.limit || 2;
      const page = req.query.page || 1;
      const total = await Album.find({ mode: "public" }).count();
      const totalPage = Math.ceil(total / perPage);

      const albums = await Album.find({ mode: "public" })
        .populate("author")
        .skip((page - 1) * perPage)
        .limit(perPage);
      console.log(albums);
      return res.render("client/feedAlbum", {
        title: "feedAlbumPage",
        user: req.user,
        albums,
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
