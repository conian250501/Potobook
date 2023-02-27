import { Photo } from "../models/photoModel";
import { Album } from "../models/albumModel";
import { User } from "../models/userModel";

export const adminController = {
  photosPage: async (req, res, next) => {
    try {
      const perPage = req.query.limit || 4;
      const page = req.query.page || 1;
      const total = await Photo.find({}).count();
      const totalPage = Math.ceil(total / perPage);

      const photos = await Photo.find({})
        .populate(["author", "albums"])
        .skip((page - 1) * perPage)
        .limit(perPage);
      const photosReverse = photos.reverse();

      return res.render("admin/photos", {
        title: "adminPhotoPage",
        user: req.user,
        photos: photosReverse,
        page,
        perPage,
        totalPage,
      });
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
      if (!photo) {
        throw new Error("Photo not found");
      }

      return res.render("admin/editPhoto", { user: req.user, photo, albums });
    } catch (error) {
      next(error);
    }
  },
  editPhoto: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { album, titleAlbum, descriptionAlbum, modeAlbum } = req.body;

      const user = await User.findById({ _id: req.body.userId });
      if (!user) {
        throw new Error("User not found");
      }

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
          user.albums.push(newAlbum._id);
          newAlbum.photos.push(photo._id);
          photo.albums.push(newAlbum._id);

          await user.save();
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
        user.albums.push(newAlbum._id);

        await user.save();
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

      await User.updateMany(
        { _id: photo.author },
        { $pull: { photos: photo._id } }
      );
      await Album.updateMany(
        { _id: photo.albums },
        { $pull: { photos: photo._id } }
      );
      req.flash("success_message", "Delete photo successfully");
      return res.redirect("/my-photos");
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  albumsPage: async (req, res, next) => {
    try {
      const perPage = req.query.limit || 4;
      const page = req.query.page || 1;
      const total = await Album.find({}).count();
      const totalPage = Math.ceil(total / perPage);

      const albums = await Album.find({})
        .populate(["author", "photos"])
        .skip((page - 1) * perPage)
        .limit(perPage);
      const albumsReverse = albums.reverse();

      return res.render("admin/albums", {
        title: "adminAlbumPage",
        user: req.user,
        albums: albumsReverse,
        page,
        perPage,
        totalPage,
      });
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
      return res.render("admin/editAlbum", { user: req.user, album });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  editAlbum: async (req, res, next) => {
    try {
      const { id } = req.params;

      const user = await User.findById({ _id: req.body.userId });
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
        const imageUrl = `http://${req.hostname}:${process.env.PORT}/uploads/${image.filename}`;
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
      return res.redirect("/admin/albums");
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  deletePhotoOfAlbum: async (req, res, next) => {
    try {
      const { id, idPhoto } = req.params;

      const photo = await Photo.findById({ _id: idPhoto });

      if (!photo) {
        throw new Error("Delete photo of album failed");
      }
      const album = await Album.findById(id);
      if (!album) {
        throw new Error("Album not found");
      }

      const photosUpdated = album.photos.filter(
        (item) => item._id.toString() !== photo._id.toString()
      );
      const albumOfPhotosUpdated = photo.albums.filter(
        (item) => item._id.toString() !== album._id.toString()
      );

      await album.updateOne({
        photos: photosUpdated,
      });
      await photo.updateOne({
        albums: albumOfPhotosUpdated,
      });

      await photo.save();
      await album.save();

      req.flash("success_message", "Delete photo of album successfully");
      return res.redirect("back");
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  usersPage: async (req, res, next) => {
    try {
      const perPage = req.query.limit || 10;
      const page = req.query.page || 1;
      const total = await User.find({}).count();
      const totalPage = Math.ceil(total / perPage);

      const users = await User.find({ isAdmin: false })
        .skip((page - 1) * perPage)
        .limit(perPage);
      const usersReverse = users.reverse();

      return res.render("admin/users", {
        title: "adminUserPage",
        user: req.user,
        users: usersReverse,
        page,
        perPage,
        totalPage,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  editUserPage: async (req, res, next) => {
    try {
      const { id } = req.params;
      const userExist = await User.findById(id);
      return res.render("admin/editUser", {
        title: "adminUserPage",
        user: req.user,
        userExist,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  editUser: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { firstName, lastName, active } = req.body;
      const user = await User.findById(id);

      if (!user) {
        throw new Error("User not found");
      }

      if (!req.file) {
        await user.updateOne({
          ...req.body,
          active: active ? true : false,
        });
      } else {
        if (!user) {
          throw new Error("User not found");
        }
        const imageUrl = `http://${req.hostname}:${process.env.PORT}/uploads/${req.file.filename}`;

        await user.updateOne({
          ...req.body,
          active: active ? true : false,
          avatar: imageUrl,
        });
      }

      req.flash("success__message", "Updated user successfully");
      return res.redirect("back");
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  deleteUser: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        throw new Error("User not found");
      }

      user.albums.map(async (album) => {
        await Album.findByIdAndDelete(album._id);
      });

      user.photos.map(async (photo) => {
        await Photo.findByIdAndDelete(photo._id);
      });

      req.flash("success__messages", "Delete User successfully");
      return res.redirect("/admin/users");
    } catch (error) {
      next(error);
    }
  },
};
