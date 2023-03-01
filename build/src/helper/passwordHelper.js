"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.passwordHelper = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _userModel = require("../app/models/userModel");
var passwordHelper = {
  hashPassword: function () {
    var _hashPassword = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(password, saltRounds) {
      var passwordHased;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _bcrypt["default"].hash(password, saltRounds);
          case 2:
            passwordHased = _context.sent;
            return _context.abrupt("return", passwordHased);
          case 4:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    function hashPassword(_x, _x2) {
      return _hashPassword.apply(this, arguments);
    }
    return hashPassword;
  }(),
  comparePassword: function () {
    var _comparePassword = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(id, password) {
      var user, isValidPassword;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _userModel.User.findById(id);
          case 2:
            user = _context2.sent;
            if (user) {
              _context2.next = 5;
              break;
            }
            return _context2.abrupt("return", false);
          case 5:
            _context2.next = 7;
            return _bcrypt["default"].compare(password, "".concat(user === null || user === void 0 ? void 0 : user.password));
          case 7:
            isValidPassword = _context2.sent;
            return _context2.abrupt("return", isValidPassword);
          case 9:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    function comparePassword(_x3, _x4) {
      return _comparePassword.apply(this, arguments);
    }
    return comparePassword;
  }()
};
exports.passwordHelper = passwordHelper;