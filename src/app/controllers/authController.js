import { User } from "../models/userModel";
import { passwordHelper } from "../../helper/passwordHelper";
import { jwtHelper } from "../../helper/jwtHelper";
import { confirmEmail } from "../../utils/confirmEmail";

export const authController = {
  sendMailPage: async (req, res, next) => {
    try {
      return res.render("client/sendEmail");
    } catch (error) {
      next(error);
    }
  },
  sendMail: async (req, res, next) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email: email });
      if (!user) {
        req.flash("error_message", "User not found");
        return res.redirect("back");
      }
      // CONFIRM EMAIL
      const subject = "Confirm your account here";
      const html = `
       <h4>Thanks you for register <3</h4>
       <p>Please go to link below to reset your passwor account</p>
       <a href="http://${req.hostname}/auth/forgot-password/${user.token}">Reset your password NOW</a>
       `;
      const isSendMail = await confirmEmail(email, subject, html);

      if (isSendMail) {
        req.flash("success_message", "Go to your email to reset your password");
        return res.redirect("back");
      } else {
        req.flash("error_message", "Send email failed");
        return res.redirect("back");
      }
    } catch (error) {
      next(error);
    }
  },
  forgotPassPage: async (req, res, next) => {
    try {
      const { token } = req.params;
      const user = await User.findOne({ token: token });
      if (!user) {
        throw new Error("User not found");
      }
      return res.render("client/forgotPassword", { userReset: user });
    } catch (error) {
      next(error);
    }
  },
  forgotPassword: async (req, res, next) => {
    try {
      const { newPassword, confirmPassword } = req.body;
      const user = await User.findOne({ token: req.params.token });
      if (newPassword !== confirmPassword) {
        req.flash("error_message", "New password dont match");
        return res.redirect("back");
      }

      const hashedPassword = await passwordHelper.hashPassword(newPassword, 10);

      await user?.updateOne({
        password: hashedPassword,
      });

      await user?.save();
      req.flash("success_message", "Reset password successfully");
      return res.redirect("back");
    } catch (error) {
      next(error);
    }
  },
  verifyEmail: async (req, res, next) => {
    try {
      const { token } = req.params;
      const user = await User.findOne({ token: token });

      if (!user) {
        throw new Error("User not found");
      }

      user.verify = true;
      await user.save();

      req.flash("success_message", "Verified email");
      return res.redirect("/auth/login");
    } catch (error) {
      next(error);
    }
  },
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

      if (password !== confirmPassword) {
        req.flash("error_message", "Password dont match");
        return res.redirect("back");
      }

      const passwordHashed = await passwordHelper.hashPassword(password, 10);
      const newUser = new User({ ...req.body, password: passwordHashed });

      // CREATE TOKEN
      const token = jwtHelper.createToken(newUser._id);
      newUser.token = token;
      await newUser.save();

      // CONFIRM EMAIL
      const subject = "Confirm your account here";
      const html = `
       <h4>Thanks you for register <3</h4>
       <p>Please confirm email to verify your account</p>
       <a href="${process.env.BASE_URL}/auth/verify-email/${token}">Verify email</a>
       `;
      const isSendMail = await confirmEmail(email, subject, html);
      console.log(isSendMail);

      if (newUser && isSendMail) {
        req.flash("success_message", "Go to your email to verify account");
        return res.redirect("/auth/login");
      } else {
        req.flash("error_message", "Create Login Failed");
        return res.redirect("back");
      }
    } catch (error) {
      next(error);
    }
  },
  logout: (req, res, next) => {
    req.logout(function (err) {
      if (err) {
        next(err);
      }
      req.flash("success_message", "Logout Successfully");
      res.redirect("/auth/login");
    });
  },
};
