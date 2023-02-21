export const albumController = {
  albumPage: async (req, res, next) => {
    try {
      return res.render("client/albums", {
        title: "myAlbumPage",
        user: req.user,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  newAlbumPage: async (req, res, next) => {},
  newAlbum: async (req, res, next) => {},
  editAlbumPage: async (req, res, next) => {},
  editAlbum: async (req, res, next) => {},
  deleteAlbum: async (req, res, next) => {},
};
