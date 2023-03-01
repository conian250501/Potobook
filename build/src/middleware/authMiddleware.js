"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authMiddleware = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _userModel = require("../app/models/userModel");
var authMiddleware = {
  ensureUserIsAuthenticated: function ensureUserIsAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error_message", "Please log in to access the reqed page");
    res.redirect("/auth/login");
  },
  forwardAuthenticatedUser: function forwardAuthenticatedUser(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect("/");
  },
  checkVerification: function () {
    var _checkVerification = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
      var email, user, isValidEmail;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            email = req.body.email;
            _context.next = 4;
            return _userModel.User.findOne({
              email: email
            });
          case 4:
            user = _context.sent;
            isValidEmail = email === (user === null || user === void 0 ? void 0 : user.email);
            if (isValidEmail) {
              _context.next = 9;
              break;
            }
            req.flash("error_message", "Email invalid");
            return _context.abrupt("return", res.redirect("back"));
          case 9:
            if (!(user !== null && user !== void 0 && user.verify)) {
              _context.next = 13;
              break;
            }
            next();
            _context.next = 15;
            break;
          case 13:
            req.flash("error_message", "Please check your email to verify your account");
            return _context.abrupt("return", res.redirect("back"));
          case 15:
            _context.next = 20;
            break;
          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](0);
            next(_context.t0);
          case 20:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 17]]);
    }));
    function checkVerification(_x, _x2, _x3) {
      return _checkVerification.apply(this, arguments);
    }
    return checkVerification;
  }()
};
exports.authMiddleware = authMiddleware;