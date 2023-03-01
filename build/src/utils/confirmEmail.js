"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.confirmEmail = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _nodemailer = _interopRequireDefault(require("nodemailer"));
var _require = require("googleapis"),
  google = _require.google;
var confirmEmail = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(email, subject, html) {
    var MyOAuth2Client, accessToken, transporter, info;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          //CREATE OAUTH2 CLIENT
          MyOAuth2Client = new google.auth.OAuth2("118433726660-13eqb0qngcgcftnkj8d31so0hj181fe3.apps.googleusercontent.com", "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", "https://developers.google.com/oauthplayground");
          MyOAuth2Client.setCredentials({
            refresh_token: "1//04fCJIRjMW2n5CgYIARAAGAQSNwF-L9IrJsIQaf3w3rxHhMMa3J-pM9SJosTfKdbNNc3VSwkIuCRjBpPEzzXkUQOgyseJzaUcsB0"
          });

          //GENERATE ACCESS_TOKEN
          _context.next = 5;
          return MyOAuth2Client.getAccessToken();
        case 5:
          accessToken = _context.sent;
          //SEND MAIL
          transporter = _nodemailer["default"].createTransport({
            service: "gmail",
            auth: {
              type: "OAuth2",
              user: "conian2505@gmail.com",
              clientId: "118433726660-13eqb0qngcgcftnkj8d31so0hj181fe3.apps.googleusercontent.com",
              clientSecret: "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",
              refreshToken: "1//04fCJIRjMW2n5CgYIARAAGAQSNwF-L9IrJsIQaf3w3rxHhMMa3J-pM9SJosTfKdbNNc3VSwkIuCRjBpPEzzXkUQOgyseJzaUcsB0",
              accessToken: accessToken
            },
            tls: {
              rejectUnauthorized: false
            }
          });
          _context.next = 9;
          return transporter.sendMail({
            from: "conian2505@gmai",
            to: email,
            subject: subject,
            html: html
          });
        case 9:
          info = _context.sent;
          if (!info.accepted) {
            _context.next = 15;
            break;
          }
          console.log(info);
          return _context.abrupt("return", info);
        case 15:
          throw new Error("Couldn't send email");
        case 16:
          _context.next = 21;
          break;
        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", _context.t0);
        case 21:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 18]]);
  }));
  return function confirmEmail(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
exports.confirmEmail = confirmEmail;