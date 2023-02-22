import { Album } from "../models/albumModel";
import { User } from "../models/userModel";
import { Photo } from "../models/photoModel";

export const photoController = {
  photoPage: async (req, res, next) => {
    try {
      const photos = await Photo.find({ author: req.user._id }).populate(
        "author"
      );
      return res.render("client/photos", {
        title: "myPhotoPage",
        user: req.user,
        photos,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  newPhotoPage: async (req, res, next) => {
    try {
      const albums = await Album.find({ author: req.user._id });
      return res.render("client/newPhoto", { user: req.user, albums });
    } catch (error) {
      next(error);
    }
  },
  newPhoto: async (req, res, next) => {
    try {
      const { album, titleAlbum, descriptionAlbum, modeAlbum } = req.body;

      const albumExist = await Album.findOne({
        title: album,
        author: req.user._id,
      });

      const imageUrl = `http://${req.host}:${process.env.PORT}/uploads/${req.file.filename}`;

      const newPhoto = new Photo({
        ...req.body,
        author: req.user._id,
        image: imageUrl,
      });

      if (album === "") {
        await newPhoto.save();
        req.flash("success_message", "Create new photo successfully");
        return res.redirect("back");
      }

      if (!albumExist) {
        const newAlbum = new Album({
          title: titleAlbum,
          description: descriptionAlbum,
          mode: modeAlbum,
          author: req.user._id,
        });
        newAlbum.photos.push(newPhoto._id);
        newPhoto.albums.push(newAlbum._id);
        await newPhoto.save();
        await newAlbum.save();

        req.flash("success_message", "Create new photo successfully");
        return res.redirect("back");
      } else {
        newPhoto.albums.push(albumExist._id);
        await newPhoto.save();
        await albumExist.save();
        req.flash("success_message", "Create new photo successfully");
        return res.redirect("back");
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  editPhotoPage: async (req, res, next) => {
    try {
      const { id } = req.params;
      const albums = await Album.find({ author: req.user._id });
      const photo = await Photo.findById(id)
        .populate("albums")
        .populate("author");

      return res.render("client/editPhoto", { user: req.user, photo, albums });
    } catch (error) {
      next(error);
    }
  },
  editPhoto: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { album, titleAlbum, descriptionAlbum, modeAlbum } = req.body;

      const albumExist = await Album.findOne({
        title: album,
        author: req.user._id,
      });
      const photo = await Photo.findById(id);

      if (!photo) {
        throw new Error("Update failed");
      }

      if (!req.file) {
        if (!albumExist) {
          const newAlbum = new Album({
            title: titleAlbum,
            description: descriptionAlbum,
            mode: modeAlbum,
            author: req.user._id,
          });

          await photo.updateOne({ ...req.body });

          newAlbum.photos.push(photo._id);
          photo.albums.push(newAlbum._id);
          await newAlbum.save();
          await photo.save();
        } else {
          const albumOfPhotoUpdated = photo.albums.filter(
            (album) => album._id.toString() !== albumExist._id.toString()
          );
          const photoOfAlbumUpdated = albumExist.photos.filter(
            (item) => item._id.toString() !== photo._id.toString()
          );
          console.log({ albumOfPhotoUpdated, photoOfAlbumUpdated });

          await photo.updateOne({
            ...req.body,
            albums: albumOfPhotoUpdated,
          });

          await albumExist.updateOne({
            photos: photoOfAlbumUpdated,
          });

          photo.albums.push(albumExist._id);
          albumExist.photos.push(photo._id);

          await albumExist.save();
          await photo.save();
        }
        req.flash("success_message", "Updated photo successfully");
        return res.redirect("back");
      }

      if (!albumExist) {
        const imageUrl = `http://${req.hostname}:${process.env.PORT}/uploads/${req.file.filename}`;
        const newAlbum = new Album({
          title: titleAlbum,
          description: descriptionAlbum,
          mode: modeAlbum,
          author: req.user._id,
        });

        await photo.updateOne({ ...req.body, image: imageUrl });

        newAlbum.photos.push(photo._id);
        photo.albums.push(newAlbum._id);
        await newAlbum.save();
        await photo.save();
      } else {
        const imageUrl = `http://${req.hostname}:${process.env.PORT}/uploads/${req.file.filename}`;
        const albumOfPhotoUpdated = photo.albums.filter(
          (album) => album._id.toString() !== albumExist._id.toString()
        );
        const photoOfAlbumUpdated = albumExist.photos.filter(
          (item) => item._id.toString() !== photo._id.toString()
        );
        console.log({ albumOfPhotoUpdated, photoOfAlbumUpdated });

        await photo.updateOne({
          ...req.body,
          image: imageUrl,
          albums: albumOfPhotoUpdated,
        });

        await albumExist.updateOne({
          photos: photoOfAlbumUpdated,
        });

        photo.albums.push(albumExist._id);
        albumExist.photos.push(photo._id);

        await albumExist.save();
        await photo.save();
      }

      req.flash("success_message", "Updated photo successfully");
      return res.redirect("back");
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  deletePhoto: async (req, res, next) => {
    try {
      const { id } = req.params;
      const photo = await Photo.findByIdAndDelete(id);
      if (!photo) {
        req.flash("error_message", "Delete failed");
        return res.redirect("back");
      }

      await Album.updateMany(
        { _id: photo?.albums },
        { $pull: { photos: photo._id } }
      );
      req.flash("success_message", "Delete photo successfully");
      return res.redirect("/my-photos");
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};
