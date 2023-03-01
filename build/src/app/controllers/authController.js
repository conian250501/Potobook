"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authController = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _userModel = require("../models/userModel");
var _passwordHelper = require("../../helper/passwordHelper");
var _jwtHelper = require("../../helper/jwtHelper");
var _confirmEmail = require("../../utils/confirmEmail");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var authController = {
  sendMailPage: function () {
    var _sendMailPage = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            return _context.abrupt("return", res.render("client/sendEmail"));
          case 4:
            _context.prev = 4;
            _context.t0 = _context["catch"](0);
            next(_context.t0);
          case 7:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 4]]);
    }));
    function sendMailPage(_x, _x2, _x3) {
      return _sendMailPage.apply(this, arguments);
    }
    return sendMailPage;
  }(),
  sendMail: function () {
    var _sendMail = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
      var email, user, subject, html, isSendMail;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            email = req.body.email;
            _context2.next = 4;
            return _userModel.User.findOne({
              email: email
            });
          case 4:
            user = _context2.sent;
            if (user) {
              _context2.next = 8;
              break;
            }
            req.flash("error_message", "User not found");
            return _context2.abrupt("return", res.redirect("back"));
          case 8:
            // CONFIRM EMAIL
            subject = "Confirm your account here";
            html = "\n       <h4>Thanks you for register <3</h4>\n       <p>Please go to link below to reset your passwor account</p>\n       <a href=\"".concat(process.env.BASE_URL, "/auth/forgot-password/").concat(user.token, "\">Reset your password NOW</a>\n       ");
            _context2.next = 12;
            return (0, _confirmEmail.confirmEmail)(email, subject, html);
          case 12:
            isSendMail = _context2.sent;
            if (!isSendMail) {
              _context2.next = 18;
              break;
            }
            req.flash("success_message", "Go to your email to reset your password");
            return _context2.abrupt("return", res.redirect("back"));
          case 18:
            req.flash("error_message", "Send email failed");
            return _context2.abrupt("return", res.redirect("back"));
          case 20:
            _context2.next = 25;
            break;
          case 22:
            _context2.prev = 22;
            _context2.t0 = _context2["catch"](0);
            next(_context2.t0);
          case 25:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[0, 22]]);
    }));
    function sendMail(_x4, _x5, _x6) {
      return _sendMail.apply(this, arguments);
    }
    return sendMail;
  }(),
  forgotPassPage: function () {
    var _forgotPassPage = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
      var token, user;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            token = req.params.token;
            _context3.next = 4;
            return _userModel.User.findOne({
              token: token
            });
          case 4:
            user = _context3.sent;
            if (user) {
              _context3.next = 7;
              break;
            }
            throw new Error("User not found");
          case 7:
            return _context3.abrupt("return", res.render("client/forgotPassword", {
              userReset: user
            }));
          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](0);
            next(_context3.t0);
          case 13:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[0, 10]]);
    }));
    function forgotPassPage(_x7, _x8, _x9) {
      return _forgotPassPage.apply(this, arguments);
    }
    return forgotPassPage;
  }(),
  forgotPassword: function () {
    var _forgotPassword = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
      var _req$body, newPassword, confirmPassword, user, hashedPassword;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _req$body = req.body, newPassword = _req$body.newPassword, confirmPassword = _req$body.confirmPassword;
            _context4.next = 4;
            return _userModel.User.findOne({
              token: req.params.token
            });
          case 4:
            user = _context4.sent;
            if (!(newPassword !== confirmPassword)) {
              _context4.next = 8;
              break;
            }
            req.flash("error_message", "New password dont match");
            return _context4.abrupt("return", res.redirect("back"));
          case 8:
            _context4.next = 10;
            return _passwordHelper.passwordHelper.hashPassword(newPassword, 10);
          case 10:
            hashedPassword = _context4.sent;
            _context4.next = 13;
            return user.updateOne({
              password: hashedPassword
            });
          case 13:
            _context4.next = 15;
            return user.save();
          case 15:
            req.flash("success_message", "Reset password successfully");
            return _context4.abrupt("return", res.redirect("back"));
          case 19:
            _context4.prev = 19;
            _context4.t0 = _context4["catch"](0);
            next(_context4.t0);
          case 22:
          case "end":
            return _context4.stop();
        }
      }, _callee4, null, [[0, 19]]);
    }));
    function forgotPassword(_x10, _x11, _x12) {
      return _forgotPassword.apply(this, arguments);
    }
    return forgotPassword;
  }(),
  verifyEmail: function () {
    var _verifyEmail = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
      var token, user;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            token = req.params.token;
            _context5.next = 4;
            return _userModel.User.findOne({
              token: token
            });
          case 4:
            user = _context5.sent;
            if (user) {
              _context5.next = 7;
              break;
            }
            throw new Error("User not found");
          case 7:
            user.verify = true;
            _context5.next = 10;
            return user.save();
          case 10:
            req.flash("success_message", "Verified email");
            return _context5.abrupt("return", res.redirect("/auth/login"));
          case 14:
            _context5.prev = 14;
            _context5.t0 = _context5["catch"](0);
            next(_context5.t0);
          case 17:
          case "end":
            return _context5.stop();
        }
      }, _callee5, null, [[0, 14]]);
    }));
    function verifyEmail(_x13, _x14, _x15) {
      return _verifyEmail.apply(this, arguments);
    }
    return verifyEmail;
  }(),
  loginPage: function () {
    var _loginPage = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res, next) {
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            return _context6.abrupt("return", res.render("client/login", {}));
          case 1:
          case "end":
            return _context6.stop();
        }
      }, _callee6);
    }));
    function loginPage(_x16, _x17, _x18) {
      return _loginPage.apply(this, arguments);
    }
    return loginPage;
  }(),
  registerPage: function () {
    var _registerPage = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res, next) {
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            return _context7.abrupt("return", res.render("client/register", {}));
          case 1:
          case "end":
            return _context7.stop();
        }
      }, _callee7);
    }));
    function registerPage(_x19, _x20, _x21) {
      return _registerPage.apply(this, arguments);
    }
    return registerPage;
  }(),
  register: function () {
    var _register = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res, next) {
      var _req$body2, firstName, lastName, email, password, confirmPassword, userExist, passwordHashed, newUser, token, subject, html, isSendMail;
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            _req$body2 = req.body, firstName = _req$body2.firstName, lastName = _req$body2.lastName, email = _req$body2.email, password = _req$body2.password, confirmPassword = _req$body2.confirmPassword;
            _context8.next = 4;
            return _userModel.User.findOne({
              email: email
            });
          case 4:
            userExist = _context8.sent;
            if (!userExist) {
              _context8.next = 8;
              break;
            }
            req.flash("error_message", "User already exists");
            return _context8.abrupt("return", res.redirect("back"));
          case 8:
            if (!(password !== confirmPassword)) {
              _context8.next = 11;
              break;
            }
            req.flash("error_message", "Password dont match");
            return _context8.abrupt("return", res.redirect("back"));
          case 11:
            _context8.next = 13;
            return _passwordHelper.passwordHelper.hashPassword(password, 10);
          case 13:
            passwordHashed = _context8.sent;
            newUser = new _userModel.User(_objectSpread(_objectSpread({}, req.body), {}, {
              password: passwordHashed
            })); // CREATE TOKEN
            token = _jwtHelper.jwtHelper.createToken(newUser._id);
            newUser.token = token;
            _context8.next = 19;
            return newUser.save();
          case 19:
            // CONFIRM EMAIL
            subject = "Confirm your account here";
            html = "\n       <h4>Thanks you for register <3</h4>\n       <p>Please confirm email to verify your account</p>\n       <a href=\"".concat(process.env.BASE_URL, "/auth/verify-email/").concat(token, "\">Verify email</a>\n       ");
            _context8.next = 23;
            return (0, _confirmEmail.confirmEmail)(email, subject, html);
          case 23:
            isSendMail = _context8.sent;
            console.log(isSendMail);
            if (!(newUser && isSendMail)) {
              _context8.next = 30;
              break;
            }
            req.flash("success_message", "Go to your email to verify account");
            return _context8.abrupt("return", res.redirect("/auth/login"));
          case 30:
            req.flash("error_message", "Create Login Failed");
            return _context8.abrupt("return", res.redirect("back"));
          case 32:
            _context8.next = 37;
            break;
          case 34:
            _context8.prev = 34;
            _context8.t0 = _context8["catch"](0);
            next(_context8.t0);
          case 37:
          case "end":
            return _context8.stop();
        }
      }, _callee8, null, [[0, 34]]);
    }));
    function register(_x22, _x23, _x24) {
      return _register.apply(this, arguments);
    }
    return register;
  }(),
  logout: function logout(req, res, next) {
    req.logout(function (err) {
      if (err) {
        next(err);
      }
      req.flash("success_message", "Logout Successfully");
      res.redirect("/auth/login");
    });
  }
};
exports.authController = authController;