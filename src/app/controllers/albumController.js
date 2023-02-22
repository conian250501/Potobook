import { Album } from "../models/albumModel";
import { Photo } from "../models/photoModel";
import { User } from "../models/userModel";

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

      const user = await User.findById({ _id: req.user._id });
      if (!user) {
        throw new Error("User not found");
      }

      const imageList = req.files;
      imageList.map(async (image) => {
        const imageUrl = `http://${req.host}:${process.env.PORT}/uploads/${image.filename}`;
        const newPhoto = new Photo({
          title: image.filename,
          image: imageUrl,
          author: req.user._id,
        });

        user.photos.push(newPhoto._id);
        newAlbum.photos.push(newPhoto._id);
        await newPhoto.save();
      });

      user.albums.push(newAlbum._id);
      await user.save();
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
      if (!album) {
        throw new Error("Album not found");
      }
      return res.render("client/editAlbum", { user: req.user, album });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  editAlbum: async (req, res, next) => {
    try {
      const { id } = req.params;

      const user = await User.findById({ _id: req.user._id });
      if (!user) {
        throw new Error("User not found");
      }

      const album = await Album.findById(id);
      if (!album) {
        throw new Error("Album not found");
      }
      await album.updateOne({ ...req.body });

      const images = req.files;
      images.map(async (image) => {
        const imageUrl = `http://${req.host}:${process.env.PORT}/uploads/${image.filename}`;
        const newPhoto = new Photo({
          title: image.filename,
          image: imageUrl,
          author: req.user._id,
        });

        newPhoto.albums.push(album._id);
        album.photos.push(newPhoto._id);
        user.photos.push(newPhoto._id);
        await newPhoto.save();
      });

      await user.save();
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
      if (!album) {
        throw new Error("Delete album failed");
      }

      album.photos.map(async (photo) => {
        const photoDeleted = await Photo.findByIdAndDelete(photo._id);
        await User.updateMany(
          { _id: photoDeleted?.author },
          { $pull: { photos: photoDeleted?._id } }
        );
      });

      await User.updateMany(
        { _id: album.author },
        { $pull: { albums: album._id } }
      );

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
      if (!photo) {
        throw new Error("Delete photo of album failed");
      }

      await User.updateMany(
        { _id: photo.author },
        { $pull: { photos: photo._id } }
      );
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
