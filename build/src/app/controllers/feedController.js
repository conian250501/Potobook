"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.feedController = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _photoModel = require("../models/photoModel");
var _albumModel = require("../models/albumModel");
var _likeModel = require("../models/likeModel");
var feedController = {
  feedPhotoPage: function () {
    var _feedPhotoPage = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
      var perPage, page, total, totalPage, photos, photosReversed;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            perPage = req.query.limit || 12;
            page = req.query.page || 1;
            _context.next = 5;
            return _photoModel.Photo.find({
              mode: "public"
            }).count();
          case 5:
            total = _context.sent;
            totalPage = Math.ceil(total / perPage);
            _context.next = 9;
            return _photoModel.Photo.find({
              mode: "public"
            }).populate("author").populate({
              path: "likes",
              populate: {
                path: "author"
              }
            }).skip((page - 1) * perPage).limit(perPage);
          case 9:
            photos = _context.sent;
            photosReversed = photos.reverse(); // const photosTest = await Album.findOne({ title: "hihi" }).sort({
            //   $natural: -1,
            // });
            // const albumTest = await Photo.find({}).populate({
            //   path: "albums",
            //   match: { title: { $eq: "123" } },
            //   select: "title -_id",
            // });
            // console.log({ albumTest });
            // console.log({ photosTest });
            return _context.abrupt("return", res.render("client/feed", {
              title: "feedPhotoPage",
              user: req.user,
              photos: photosReversed,
              perPage: perPage,
              page: page,
              totalPage: totalPage
            }));
          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](0);
            console.log({
              error: _context.t0
            });
            next(_context.t0);
          case 18:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 14]]);
    }));
    function feedPhotoPage(_x, _x2, _x3) {
      return _feedPhotoPage.apply(this, arguments);
    }
    return feedPhotoPage;
  }(),
  albumPhotoPage: function () {
    var _albumPhotoPage = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
      var perPage, page, total, totalPage, albums, albumsReversed;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            perPage = req.query.limit || 12;
            page = req.query.page || 1;
            _context2.next = 5;
            return _albumModel.Album.find({
              mode: "public"
            }).count();
          case 5:
            total = _context2.sent;
            totalPage = Math.ceil(total / perPage);
            _context2.next = 9;
            return _albumModel.Album.find({
              mode: "public"
            }).populate("author").populate("photos").populate({
              path: "likes",
              populate: {
                path: "author"
              }
            }).skip((page - 1) * perPage).limit(perPage);
          case 9:
            albums = _context2.sent;
            albumsReversed = albums.reverse();
            return _context2.abrupt("return", res.render("client/feedAlbum", {
              title: "feedAlbumPage",
              user: req.user,
              albums: albumsReversed,
              perPage: perPage,
              page: page,
              totalPage: totalPage
            }));
          case 14:
            _context2.prev = 14;
            _context2.t0 = _context2["catch"](0);
            console.log({
              error: _context2.t0
            });
            next(_context2.t0);
          case 18:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[0, 14]]);
    }));
    function albumPhotoPage(_x4, _x5, _x6) {
      return _albumPhotoPage.apply(this, arguments);
    }
    return albumPhotoPage;
  }()
};
exports.feedController = feedController;