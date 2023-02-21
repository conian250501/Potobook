export const feedController = {
  feedPhotoPage: async (req, res, next) => {
    try {
      return res.render("client/feed", {
        title: "feedPhotoPage",

        user: req.user,
      });
    } catch (error) {
      console.log({ error });
      next(error);
    }
  },
  albumPhotoPage: async (req, res, next) => {
    try {
      return res.render("client/feedAlbum", {
        title: "feedAlbumPage",
        user: req.user,
      });
    } catch (error) {
      console.log({ error });
      next(error);
    }
  },
};
