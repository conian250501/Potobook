"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchController = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _photoModel = require("../models/photoModel");
var _albumModel = require("../models/albumModel");
var searchController = {
  search: function () {
    var _search = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
      var title, photos, result, albums, resultAlbums;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            title = req.query.title;
            _context.next = 4;
            return _photoModel.Photo.find({
              mode: "public"
            }).populate("author");
          case 4:
            photos = _context.sent;
            result = photos.filter(function (photo) {
              return photo.title.toLowerCase().includes(title);
            }).reverse();
            _context.next = 8;
            return _albumModel.Album.find({
              mode: "public"
            }).populate(["author", "photos"]);
          case 8:
            albums = _context.sent;
            resultAlbums = albums.filter(function (album) {
              return album.title.toLowerCase().includes(title);
            }).reverse();
            return _context.abrupt("return", res.render("client/search", {
              photos: result,
              albums: resultAlbums,
              user: req.user
            }));
          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](0);
            next(_context.t0);
          case 16:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 13]]);
    }));
    function search(_x, _x2, _x3) {
      return _search.apply(this, arguments);
    }
    return search;
  }()
};
exports.searchController = searchController;