import { Album } from "../models/albumModel";
import { Like } from "../models/likeModel";
import { Photo } from "../models/photoModel";
import { User } from "../models/userModel";

export const albumController = {
  albumPage: async (req, res, next) => {
    try {
      const perPage = req.query.limit || 12;
      const page = req.query.page || 1;
      const total = await Album.find({ author: req.user._id }).count();
      const totalPage = Math.ceil(total / perPage);

      const albums = await Album.find({ author: req.user._id })
        .populate("author")
        .populate("photos")
        .populate("likes")
        .skip((page - 1) * perPage)
        .limit(perPage);

      return res.render("client/albums", {
        title: "myAlbumPage",
        user: req.user,
        albums,
        perPage,
        page,
        totalPage,
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
        const imageUrl = `http://${req.hostname}/uploads/${image.filename}`;
        const newPhoto = new Photo({
          title: image.filename,
          image: imageUrl,
          author: req.user._id,
        });

        user.photos.push(newPhoto._id);
        newPhoto.albums.push(newAlbum._id);
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
        const imageUrl = `http://${req.hostname}/uploads/${image.filename}`;
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

      album.likes.map(async (like) => {
        await Like.findByIdAndDelete(like._id);
      });

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
  likeAlbum: async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await User.findById(req.user._id);
      const album = await Album.findById(id);
      if (!album) {
        throw new Error("Photo not found");
      }
      const newLike = new Like({
        author: req.user._id,
        nameAuthor: `${user?.firstName} ${user?.lastName}`,
        likeType: "ALBUM",
        likeTypeId: album._id,
      });
      album.likes.push(newLike._id);

      await album.save();
      await newLike.save();

      req.flash("success_message", "Like album successfully");
      return res.redirect("back");
    } catch (error) {
      next(error);
    }
  },
  dislikeAlbum: async (req, res, next) => {
    try {
      const { id } = req.params;
      const album = await Album.findOne({ _id: id, author: req.user._id });

      if (!album) {
        throw new Error("Photo not found");
      }
      const like = await Like.findOne({
        author: req.user._id,
        likeType: "ALBUM",
        likeTypeId: album._id,
      });

      const likeOfPhotoUpdated = album.likes.filter(
        (item) => item._id.toString() !== like?._id.toString()
      );

      await album.updateOne({
        likes: likeOfPhotoUpdated,
      });
      await like?.remove();

      return res.redirect("back");
    } catch (error) {
      next(error);
    }
  },
};
