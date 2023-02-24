import { User } from "../app/models/userModel";

export const authMiddleware = {
  ensureUserIsAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error_message", "Please log in to access the reqed page");
    res.redirect("/auth/login");
  },

  forwardAuthenticatedUser: (req, res, next) => {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect("/");
  },
  checkVerification: async (req, res, next) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email: email });
      const isValidEmail = email === user?.email;

      if (!isValidEmail) {
        req.flash("error_message", "Email invalid");
        return res.redirect("back");
      }

      if (user?.verify) {
        next();
      } else {
        req.flash(
          "error_message",
          "Please check your email to verify your account"
        );
        return res.redirect("back");
      }
    } catch (error) {
      next(error);
    }
  },
};
