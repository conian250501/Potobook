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
};
