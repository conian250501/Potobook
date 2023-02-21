export const photoController = {
  photoPage: async (req, res, next) => {
    try {
      return res.render("client/photos", {
        title: "myPhotoPage",
        user: req.user,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  newPhotoPage: async (req, res, next) => {},
  newPhoto: async (req, res, next) => {},
  editPhotoPage: async (req, res, next) => {},
  editPhoto: async (req, res, next) => {},
  deletePhoto: async (req, res, next) => {},
};
