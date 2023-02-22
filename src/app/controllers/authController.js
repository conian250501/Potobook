import { User } from "../models/userModel";
import { passwordHelper } from "../../helper/passwordHelper";

export const authController = {
  loginPage: async (req, res, next) => {
    return res.render("client/login", {});
  },
  registerPage: async (req, res, next) => {
    return res.render("client/register", {});
  },
  register: async (req, res, next) => {
    try {
      const { firstName, lastName, email, password, confirmPassword } =
        req.body;
      const userExist = await User.findOne({ email: email });
      if (userExist) {
        req.flash("error_message", "User already exists");
        return res.redirect("back");
      }

      const passwordHashed = await passwordHelper.hashPassword(password, 10);
      const newUser = new User({ ...req.body, password: passwordHashed });
      await newUser.save();

      req.flash("success_message", "Register Successfully");
      return res.redirect("/auth/login");
    } catch (error) {
      next(error);
    }
  },
  logout: (req, res, next) => {
    req.logout();
    req.flash("success_message", "Logout Successfully");
    res.redirect("/auth/login");
  },
};
