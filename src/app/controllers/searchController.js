import { Photo } from "../models/photoModel";
import { Album } from "../models/albumModel";
export const searchController = {
  search: async (req, res, next) => {
    try {
      const { title } = req.query;

      const photos = await Photo.find({ mode: "public" }).populate("author");

      const result = photos
        .filter((photo) => photo.title.toLowerCase().includes(title))
        .reverse();

      const albums = await Album.find({ mode: "public" }).populate([
        "author",
        "photos",
      ]);

      const resultAlbums = albums
        .filter((album) => album.title.toLowerCase().includes(title))
        .reverse();

      return res.render("client/search", {
        photos: result,
        albums: resultAlbums,
        user: req.user,
      });
    } catch (error) {
      next(error);
    }
  },
};
