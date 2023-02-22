import { User } from "../models/userModel";
export const profileController = {
  profilePage: async (req, res, next) => {
    try {
      const { id } = req.user;
      const profile = await User.findById(id);
      if (!profile) {
        throw new Error("User dont exist");
      }
      return res.render("client/profile", {
        user: req.user,
      });
    } catch (error) {
      next(error);
    }
  },
  editProfilePage: async (req, res, next) => {
    try {
      const { id } = req.user;
      const profile = await User.findById(id);
      if (!profile) {
        throw new Error("User dont exist");
      }
      return res.render("client/editProfile", { user: req.user, profile });
    } catch (error) {
      next(error);
    }
  },
  editProfile: async (req, res, next) => {},
};
