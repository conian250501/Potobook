"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.passportLocal = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _passport = _interopRequireDefault(require("passport"));
var _userModel = require("../app/models/userModel");
var _passwordHelper = require("../helper/passwordHelper");
var LocalStrategy = require("passport-local").Strategy;
var passportLocal = function passportLocal() {
  _passport["default"].use(new LocalStrategy({
    usernameField: "email",
    passReqToCallback: true
  }, /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, email, password, done) {
      var user, isValidPassword;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _userModel.User.findOne({
              email: email
            });
          case 2:
            user = _context.sent;
            if (!((user === null || user === void 0 ? void 0 : user.active) === false)) {
              _context.next = 6;
              break;
            }
            req.flash("error_message", "User has been blocked for sensitive reasons");
            return _context.abrupt("return", done(null, false, {
              message: "User has been blocked for sensitive reasons"
            }));
          case 6:
            if (user) {
              _context.next = 9;
              break;
            }
            req.flash("error_message", "User dont exist");
            return _context.abrupt("return", done(null, false, {
              message: "User dont exist"
            }));
          case 9:
            _context.next = 11;
            return _passwordHelper.passwordHelper.comparePassword(user._id, password);
          case 11:
            isValidPassword = _context.sent;
            if (isValidPassword) {
              done(null, user);
            } else {
              req.flash("error_message", "Password incorrect");
              done(null, false, {
                message: "Password incorrect"
              });
            }
          case 13:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function (_x, _x2, _x3, _x4) {
      return _ref.apply(this, arguments);
    };
  }()));
  _passport["default"].serializeUser(function (user, done) {
    done(null, user);
  });
  _passport["default"].deserializeUser(function (id, done) {
    _userModel.User.findById(id, function (error, user) {
      done(error, user);
    });
  });
};
exports.passportLocal = passportLocal;