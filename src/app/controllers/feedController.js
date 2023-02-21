export const feedController = {
  feedPhotoPage: async (req, res, next) => {
    try {
      return res.render("client/feed", { title: "feedPhotoPage" });
    } catch (error) {
      console.log({ error });
      next(error);
    }
  },
  albumPhotoPage: async (req, res, next) => {
    try {
      return res.render("client/feed", { title: "feedAlbumPage" });
    } catch (error) {
      console.log({ error });
      next(error);
    }
  },
};
