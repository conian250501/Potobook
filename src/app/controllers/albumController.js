import { Album } from "../models/albumModel";
import { Photo } from "../models/photoModel";

export const albumController = {
  albumPage: async (req, res, next) => {
    try {
      const albums = await Album.find({ author: req.user._id })
        .populate("author")
        .populate("photos");
      return res.render("client/albums", {
        title: "myAlbumPage",
        user: req.user,
        albums,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  newAlbumPage: async (req, res, next) => {
    try {
      res.render("client/newAlbum", { user: req.user });
    } catch (error) {
      next(error);
    }
  },
  newAlbum: async (req, res, next) => {
    try {
      const newAlbum = new Album({ ...req.body, author: req.user._id });

      const imageList = req.files;
      imageList.map(async (image) => {
        const imageUrl = `http://${req.host}:${process.env.PORT}/uploads/${image.filename}`;
        const newPhoto = new Photo({
          title: image.filename,
          image: imageUrl,
          author: req.user._id,
        });
        newAlbum.photos.push(newPhoto._id);
        await newPhoto.save();
      });

      await newAlbum.save();

      req.flash("success_message", "Created album successfully");
      return res.redirect("back");
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  editAlbumPage: async (req, res, next) => {
    try {
      const { id } = req.params;
      const album = await Album.findById(id)
        .populate("author")
        .populate("photos");
      return res.render("client/editAlbum", { user: req.user, album });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  editAlbum: async (req, res, next) => {
    try {
      const { id } = req.params;
      const album = await Album.findById(id);

      await album.updateOne({ ...req.body });

      const images = req.files;
      images.map(async (image) => {
        const imageUrl = `http://${req.host}:${process.env.PORT}/uploads/${image.filename}`;
        const newPhoto = new Photo({
          title: image.filename,
          image: imageUrl,
          author: req.user._id,
        });
        newPhoto.albums.push(newPhoto._id);
        album.photos.push(newPhoto._id);
        await newPhoto.save();
      });
      await album.save();

      req.flash("success_message", "Updated photo successfully");
      return res.redirect("back");
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  deleteAlbum: async (req, res, next) => {
    try {
      const { id } = req.params;
      const album = await Album.findByIdAndDelete(id);
      album.photos.map(async (photo) => {
        await Photo.findByIdAndDelete(photo._id);
      });

      req.flash("success_message", "Delete album successfully");
      return res.redirect("/my-albums");
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  deletePhotoOfAlbum: async (req, res, next) => {
    try {
      const { id } = req.params;
      const photo = await Photo.findByIdAndDelete(id);

      await Photo.updateMany(
        { _id: photo.albums },
        { $pull: { photos: photo._id } }
      );

      req.flash("success_message", "Delete photo of album successfully");
      return res.redirect("back");
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};
