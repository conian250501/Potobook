"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.albumController = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _albumModel = require("../models/albumModel");
var _likeModel = require("../models/likeModel");
var _photoModel = require("../models/photoModel");
var _userModel = require("../models/userModel");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var albumController = {
  albumPage: function () {
    var _albumPage = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
      var perPage, page, total, totalPage, albums;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            perPage = req.query.limit || 12;
            page = req.query.page || 1;
            _context.next = 5;
            return _albumModel.Album.find({
              author: req.user._id
            }).count();
          case 5:
            total = _context.sent;
            totalPage = Math.ceil(total / perPage);
            _context.next = 9;
            return _albumModel.Album.find({
              author: req.user._id
            }).populate("author").populate("photos").populate("likes").skip((page - 1) * perPage).limit(perPage);
          case 9:
            albums = _context.sent;
            return _context.abrupt("return", res.render("client/albums", {
              title: "myAlbumPage",
              user: req.user,
              albums: albums,
              perPage: perPage,
              page: page,
              totalPage: totalPage
            }));
          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            next(_context.t0);
          case 17:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 13]]);
    }));
    function albumPage(_x, _x2, _x3) {
      return _albumPage.apply(this, arguments);
    }
    return albumPage;
  }(),
  newAlbumPage: function () {
    var _newAlbumPage = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            try {
              res.render("client/newAlbum", {
                user: req.user
              });
            } catch (error) {
              next(error);
            }
          case 1:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    function newAlbumPage(_x4, _x5, _x6) {
      return _newAlbumPage.apply(this, arguments);
    }
    return newAlbumPage;
  }(),
  newAlbum: function () {
    var _newAlbum = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
      var _newAlbum2, user, imageList;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _newAlbum2 = new _albumModel.Album(_objectSpread(_objectSpread({}, req.body), {}, {
              author: req.user._id
            }));
            _context4.next = 4;
            return _userModel.User.findById({
              _id: req.user._id
            });
          case 4:
            user = _context4.sent;
            if (user) {
              _context4.next = 7;
              break;
            }
            throw new Error("User not found");
          case 7:
            imageList = req.files;
            imageList.map( /*#__PURE__*/function () {
              var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(image) {
                var imageUrl, newPhoto;
                return _regenerator["default"].wrap(function _callee3$(_context3) {
                  while (1) switch (_context3.prev = _context3.next) {
                    case 0:
                      imageUrl = "http://".concat(req.hostname, ":").concat(process.env.PORT, "/uploads/").concat(image.filename);
                      newPhoto = new _photoModel.Photo({
                        title: image.filename,
                        image: imageUrl,
                        author: req.user._id
                      });
                      user.photos.push(newPhoto._id);
                      newPhoto.albums.push(_newAlbum2._id);
                      _newAlbum2.photos.push(newPhoto._id);
                      _context3.next = 7;
                      return newPhoto.save();
                    case 7:
                    case "end":
                      return _context3.stop();
                  }
                }, _callee3);
              }));
              return function (_x10) {
                return _ref.apply(this, arguments);
              };
            }());
            user.albums.push(_newAlbum2._id);
            _context4.next = 12;
            return user.save();
          case 12:
            _context4.next = 14;
            return _newAlbum2.save();
          case 14:
            req.flash("success_message", "Created album successfully");
            return _context4.abrupt("return", res.redirect("back"));
          case 18:
            _context4.prev = 18;
            _context4.t0 = _context4["catch"](0);
            console.log(_context4.t0);
            next(_context4.t0);
          case 22:
          case "end":
            return _context4.stop();
        }
      }, _callee4, null, [[0, 18]]);
    }));
    function newAlbum(_x7, _x8, _x9) {
      return _newAlbum.apply(this, arguments);
    }
    return newAlbum;
  }(),
  editAlbumPage: function () {
    var _editAlbumPage = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
      var id, album;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            id = req.params.id;
            _context5.next = 4;
            return _albumModel.Album.findById(id).populate("author").populate("photos");
          case 4:
            album = _context5.sent;
            if (album) {
              _context5.next = 7;
              break;
            }
            throw new Error("Album not found");
          case 7:
            return _context5.abrupt("return", res.render("client/editAlbum", {
              user: req.user,
              album: album
            }));
          case 10:
            _context5.prev = 10;
            _context5.t0 = _context5["catch"](0);
            console.log(_context5.t0);
            next(_context5.t0);
          case 14:
          case "end":
            return _context5.stop();
        }
      }, _callee5, null, [[0, 10]]);
    }));
    function editAlbumPage(_x11, _x12, _x13) {
      return _editAlbumPage.apply(this, arguments);
    }
    return editAlbumPage;
  }(),
  editAlbum: function () {
    var _editAlbum = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res, next) {
      var id, user, album, images;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            id = req.params.id;
            _context7.next = 4;
            return _userModel.User.findById({
              _id: req.user._id
            });
          case 4:
            user = _context7.sent;
            if (user) {
              _context7.next = 7;
              break;
            }
            throw new Error("User not found");
          case 7:
            _context7.next = 9;
            return _albumModel.Album.findById(id);
          case 9:
            album = _context7.sent;
            if (album) {
              _context7.next = 12;
              break;
            }
            throw new Error("Album not found");
          case 12:
            _context7.next = 14;
            return album.updateOne(_objectSpread({}, req.body));
          case 14:
            images = req.files;
            images.map( /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(image) {
                var imageUrl, newPhoto;
                return _regenerator["default"].wrap(function _callee6$(_context6) {
                  while (1) switch (_context6.prev = _context6.next) {
                    case 0:
                      imageUrl = "http://".concat(req.hostname, ":").concat(process.env.PORT, "/uploads/").concat(image.filename);
                      newPhoto = new _photoModel.Photo({
                        title: image.filename,
                        image: imageUrl,
                        author: req.user._id
                      });
                      newPhoto.albums.push(album._id);
                      album.photos.push(newPhoto._id);
                      user.photos.push(newPhoto._id);
                      _context6.next = 7;
                      return newPhoto.save();
                    case 7:
                    case "end":
                      return _context6.stop();
                  }
                }, _callee6);
              }));
              return function (_x17) {
                return _ref2.apply(this, arguments);
              };
            }());
            _context7.next = 18;
            return user.save();
          case 18:
            _context7.next = 20;
            return album.save();
          case 20:
            req.flash("success_message", "Updated photo successfully");
            return _context7.abrupt("return", res.redirect("back"));
          case 24:
            _context7.prev = 24;
            _context7.t0 = _context7["catch"](0);
            console.log(_context7.t0);
            next(_context7.t0);
          case 28:
          case "end":
            return _context7.stop();
        }
      }, _callee7, null, [[0, 24]]);
    }));
    function editAlbum(_x14, _x15, _x16) {
      return _editAlbum.apply(this, arguments);
    }
    return editAlbum;
  }(),
  deleteAlbum: function () {
    var _deleteAlbum = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res, next) {
      var id, album;
      return _regenerator["default"].wrap(function _callee10$(_context10) {
        while (1) switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            id = req.params.id;
            _context10.next = 4;
            return _albumModel.Album.findByIdAndDelete(id);
          case 4:
            album = _context10.sent;
            if (album) {
              _context10.next = 7;
              break;
            }
            throw new Error("Delete album failed");
          case 7:
            album.likes.map( /*#__PURE__*/function () {
              var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(like) {
                return _regenerator["default"].wrap(function _callee8$(_context8) {
                  while (1) switch (_context8.prev = _context8.next) {
                    case 0:
                      _context8.next = 2;
                      return _likeModel.Like.findByIdAndDelete(like._id);
                    case 2:
                    case "end":
                      return _context8.stop();
                  }
                }, _callee8);
              }));
              return function (_x21) {
                return _ref3.apply(this, arguments);
              };
            }());
            album.photos.map( /*#__PURE__*/function () {
              var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(photo) {
                var photoDeleted;
                return _regenerator["default"].wrap(function _callee9$(_context9) {
                  while (1) switch (_context9.prev = _context9.next) {
                    case 0:
                      _context9.next = 2;
                      return _photoModel.Photo.findByIdAndDelete(photo._id);
                    case 2:
                      photoDeleted = _context9.sent;
                      _context9.next = 5;
                      return _userModel.User.updateMany({
                        _id: photoDeleted === null || photoDeleted === void 0 ? void 0 : photoDeleted.author
                      }, {
                        $pull: {
                          photos: photoDeleted === null || photoDeleted === void 0 ? void 0 : photoDeleted._id
                        }
                      });
                    case 5:
                    case "end":
                      return _context9.stop();
                  }
                }, _callee9);
              }));
              return function (_x22) {
                return _ref4.apply(this, arguments);
              };
            }());
            _context10.next = 11;
            return _userModel.User.updateMany({
              _id: album.author
            }, {
              $pull: {
                albums: album._id
              }
            });
          case 11:
            req.flash("success_message", "Delete album successfully");
            return _context10.abrupt("return", res.redirect("/my-albums"));
          case 15:
            _context10.prev = 15;
            _context10.t0 = _context10["catch"](0);
            console.log(_context10.t0);
            next(_context10.t0);
          case 19:
          case "end":
            return _context10.stop();
        }
      }, _callee10, null, [[0, 15]]);
    }));
    function deleteAlbum(_x18, _x19, _x20) {
      return _deleteAlbum.apply(this, arguments);
    }
    return deleteAlbum;
  }(),
  deletePhotoOfAlbum: function () {
    var _deletePhotoOfAlbum = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(req, res, next) {
      var _req$params, id, idPhoto, photo, album, photosUpdated, albumOfPhotosUpdated;
      return _regenerator["default"].wrap(function _callee11$(_context11) {
        while (1) switch (_context11.prev = _context11.next) {
          case 0:
            _context11.prev = 0;
            _req$params = req.params, id = _req$params.id, idPhoto = _req$params.idPhoto;
            _context11.next = 4;
            return _photoModel.Photo.findById({
              _id: idPhoto
            });
          case 4:
            photo = _context11.sent;
            if (photo) {
              _context11.next = 7;
              break;
            }
            throw new Error("Delete photo of album failed");
          case 7:
            _context11.next = 9;
            return _albumModel.Album.findById(id);
          case 9:
            album = _context11.sent;
            if (album) {
              _context11.next = 12;
              break;
            }
            throw new Error("Album not found");
          case 12:
            photosUpdated = album.photos.filter(function (item) {
              return item._id.toString() !== photo._id.toString();
            });
            albumOfPhotosUpdated = photo.albums.filter(function (item) {
              return item._id.toString() !== album._id.toString();
            });
            _context11.next = 16;
            return album.updateOne({
              photos: photosUpdated
            });
          case 16:
            _context11.next = 18;
            return photo.updateOne({
              albums: albumOfPhotosUpdated
            });
          case 18:
            _context11.next = 20;
            return photo.save();
          case 20:
            _context11.next = 22;
            return album.save();
          case 22:
            req.flash("success_message", "Delete photo of album successfully");
            return _context11.abrupt("return", res.redirect("back"));
          case 26:
            _context11.prev = 26;
            _context11.t0 = _context11["catch"](0);
            console.log(_context11.t0);
            next(_context11.t0);
          case 30:
          case "end":
            return _context11.stop();
        }
      }, _callee11, null, [[0, 26]]);
    }));
    function deletePhotoOfAlbum(_x23, _x24, _x25) {
      return _deletePhotoOfAlbum.apply(this, arguments);
    }
    return deletePhotoOfAlbum;
  }(),
  likeAlbum: function () {
    var _likeAlbum = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(req, res, next) {
      var id, user, album, newLike;
      return _regenerator["default"].wrap(function _callee12$(_context12) {
        while (1) switch (_context12.prev = _context12.next) {
          case 0:
            _context12.prev = 0;
            id = req.params.id;
            _context12.next = 4;
            return _userModel.User.findById(req.user._id);
          case 4:
            user = _context12.sent;
            _context12.next = 7;
            return _albumModel.Album.findById(id);
          case 7:
            album = _context12.sent;
            if (album) {
              _context12.next = 10;
              break;
            }
            throw new Error("Photo not found");
          case 10:
            newLike = new _likeModel.Like({
              author: req.user._id,
              nameAuthor: "".concat(user === null || user === void 0 ? void 0 : user.firstName, " ").concat(user === null || user === void 0 ? void 0 : user.lastName),
              likeType: "ALBUM",
              likeTypeId: album._id
            });
            album.likes.push(newLike._id);
            _context12.next = 14;
            return album.save();
          case 14:
            _context12.next = 16;
            return newLike.save();
          case 16:
            req.flash("success_message", "Like album successfully");
            return _context12.abrupt("return", res.redirect("back"));
          case 20:
            _context12.prev = 20;
            _context12.t0 = _context12["catch"](0);
            next(_context12.t0);
          case 23:
          case "end":
            return _context12.stop();
        }
      }, _callee12, null, [[0, 20]]);
    }));
    function likeAlbum(_x26, _x27, _x28) {
      return _likeAlbum.apply(this, arguments);
    }
    return likeAlbum;
  }(),
  dislikeAlbum: function () {
    var _dislikeAlbum = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(req, res, next) {
      var id, album, like, likeOfPhotoUpdated;
      return _regenerator["default"].wrap(function _callee13$(_context13) {
        while (1) switch (_context13.prev = _context13.next) {
          case 0:
            _context13.prev = 0;
            id = req.params.id;
            _context13.next = 4;
            return _albumModel.Album.findOne({
              _id: id,
              author: req.user._id
            });
          case 4:
            album = _context13.sent;
            if (album) {
              _context13.next = 7;
              break;
            }
            throw new Error("Photo not found");
          case 7:
            _context13.next = 9;
            return _likeModel.Like.findOne({
              author: req.user._id,
              likeType: "ALBUM",
              likeTypeId: album._id
            });
          case 9:
            like = _context13.sent;
            likeOfPhotoUpdated = album.likes.filter(function (item) {
              return item._id.toString() !== (like === null || like === void 0 ? void 0 : like._id.toString());
            });
            _context13.next = 13;
            return album.updateOne({
              likes: likeOfPhotoUpdated
            });
          case 13:
            _context13.next = 15;
            return like === null || like === void 0 ? void 0 : like.remove();
          case 15:
            return _context13.abrupt("return", res.redirect("back"));
          case 18:
            _context13.prev = 18;
            _context13.t0 = _context13["catch"](0);
            next(_context13.t0);
          case 21:
          case "end":
            return _context13.stop();
        }
      }, _callee13, null, [[0, 18]]);
    }));
    function dislikeAlbum(_x29, _x30, _x31) {
      return _dislikeAlbum.apply(this, arguments);
    }
    return dislikeAlbum;
  }()
};
exports.albumController = albumController;