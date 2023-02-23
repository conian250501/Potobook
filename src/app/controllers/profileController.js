import { User } from "../models/userModel";
import { passwordHelper } from "../../helper/passwordHelper";
export const profileController = {
  profilePage: async (req, res, next) => {
    try {
      const { _id } = req.user;
      const profile = await User.findById(_id);
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
  editProfile: async (req, res, next) => {
    try {
      const { _id } = req.user;
      const { firstName, lastName } = req.body;
      if (!req.file) {
        await User.findByIdAndUpdate(
          { _id },
          {
            firstName,
            lastName,
          }
        );
        req.flash("success_message", "Updated Profile");
        res.redirect("back");
      }
      console.log(req.file);
      const imageUrl = `http://${req.hostname}:${process.env.PORT}/uploads/${req.file.filename}`;

      await User.findByIdAndUpdate(
        { _id },
        {
          firstName,
          lastName,
          avatar: imageUrl,
        }
      );

      req.flash("success_message", "Updated Profile");
      res.redirect("back");
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  editPassword: async (req, res, next) => {
    try {
      const { _id } = req.user;
      const { currentPassword, newPassword, confirmPassword } = req.body;

      if (newPassword !== confirmPassword) {
        req.flash("error_message", "New password dont match");
        return res.redirect("back");
      }
      const isValidPassword = await passwordHelper.comparePassword(
        _id,
        currentPassword
      );
      if (!isValidPassword) {
        req.flash("error_message", "Current Password incorrect");
        return res.redirect("back");
      }

      const passwordHashed = await passwordHelper.hashPassword(newPassword, 10);

      await User.findByIdAndUpdate({ _id }, { password: passwordHashed });

      req.flash("success_message", "Update password successfully");
      return res.redirect("back");
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};
