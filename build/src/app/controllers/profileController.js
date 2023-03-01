"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.profileController = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _userModel = require("../models/userModel");
var _passwordHelper = require("../../helper/passwordHelper");
var profileController = {
  profilePage: function () {
    var _profilePage = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
      var _id, profile;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _id = req.user._id;
            _context.next = 4;
            return _userModel.User.findById(_id);
          case 4:
            profile = _context.sent;
            if (profile) {
              _context.next = 7;
              break;
            }
            throw new Error("User dont exist");
          case 7:
            return _context.abrupt("return", res.render("client/profile", {
              user: req.user
            }));
          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);
            next(_context.t0);
          case 13:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 10]]);
    }));
    function profilePage(_x, _x2, _x3) {
      return _profilePage.apply(this, arguments);
    }
    return profilePage;
  }(),
  editProfilePage: function () {
    var _editProfilePage = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
      var id, profile;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            id = req.user.id;
            _context2.next = 4;
            return _userModel.User.findById(id);
          case 4:
            profile = _context2.sent;
            if (profile) {
              _context2.next = 7;
              break;
            }
            throw new Error("User dont exist");
          case 7:
            return _context2.abrupt("return", res.render("client/editProfile", {
              user: req.user,
              profile: profile
            }));
          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](0);
            next(_context2.t0);
          case 13:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[0, 10]]);
    }));
    function editProfilePage(_x4, _x5, _x6) {
      return _editProfilePage.apply(this, arguments);
    }
    return editProfilePage;
  }(),
  editProfile: function () {
    var _editProfile = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
      var _id, _req$body, firstName, lastName, imageUrl;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _id = req.user._id;
            _req$body = req.body, firstName = _req$body.firstName, lastName = _req$body.lastName;
            if (req.file) {
              _context3.next = 8;
              break;
            }
            _context3.next = 6;
            return _userModel.User.findByIdAndUpdate({
              _id: _id
            }, {
              firstName: firstName,
              lastName: lastName
            });
          case 6:
            req.flash("success_message", "Updated Profile");
            res.redirect("back");
          case 8:
            console.log(req.file);
            imageUrl = "http://".concat(req.hostname, ":").concat(process.env.PORT, "/uploads/").concat(req.file.filename);
            _context3.next = 12;
            return _userModel.User.findByIdAndUpdate({
              _id: _id
            }, {
              firstName: firstName,
              lastName: lastName,
              avatar: imageUrl
            });
          case 12:
            req.flash("success_message", "Updated Profile");
            res.redirect("back");
            _context3.next = 20;
            break;
          case 16:
            _context3.prev = 16;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0);
            next(_context3.t0);
          case 20:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[0, 16]]);
    }));
    function editProfile(_x7, _x8, _x9) {
      return _editProfile.apply(this, arguments);
    }
    return editProfile;
  }(),
  editPassword: function () {
    var _editPassword = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
      var _id, _req$body2, currentPassword, newPassword, confirmPassword, isValidPassword, passwordHashed;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _id = req.user._id;
            _req$body2 = req.body, currentPassword = _req$body2.currentPassword, newPassword = _req$body2.newPassword, confirmPassword = _req$body2.confirmPassword;
            if (!(newPassword !== confirmPassword)) {
              _context4.next = 6;
              break;
            }
            req.flash("error_message", "New password dont match");
            return _context4.abrupt("return", res.redirect("back"));
          case 6:
            _context4.next = 8;
            return _passwordHelper.passwordHelper.comparePassword(_id, currentPassword);
          case 8:
            isValidPassword = _context4.sent;
            if (isValidPassword) {
              _context4.next = 12;
              break;
            }
            req.flash("error_message", "Current Password incorrect");
            return _context4.abrupt("return", res.redirect("back"));
          case 12:
            _context4.next = 14;
            return _passwordHelper.passwordHelper.hashPassword(newPassword, 10);
          case 14:
            passwordHashed = _context4.sent;
            _context4.next = 17;
            return _userModel.User.findByIdAndUpdate({
              _id: _id
            }, {
              password: passwordHashed
            });
          case 17:
            req.flash("success_message", "Update password successfully");
            return _context4.abrupt("return", res.redirect("back"));
          case 21:
            _context4.prev = 21;
            _context4.t0 = _context4["catch"](0);
            console.log(_context4.t0);
            next(_context4.t0);
          case 25:
          case "end":
            return _context4.stop();
        }
      }, _callee4, null, [[0, 21]]);
    }));
    function editPassword(_x10, _x11, _x12) {
      return _editPassword.apply(this, arguments);
    }
    return editPassword;
  }()
};
exports.profileController = profileController;