"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.photoController = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _albumModel = require("../models/albumModel");
var _userModel = require("../models/userModel");
var _photoModel = require("../models/photoModel");
var _likeModel = require("../models/likeModel");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var photoController = {
  photoPage: function () {
    var _photoPage = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
      var perPage, page, total, totalPage, photos, photosReversed;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            perPage = req.query.limit || 12;
            page = req.query.page || 1;
            _context.next = 5;
            return _photoModel.Photo.find({
              author: req.user._id
            }).count();
          case 5:
            total = _context.sent;
            totalPage = Math.ceil(total / perPage);
            _context.next = 9;
            return _photoModel.Photo.find({
              author: req.user._id
            }).populate("author").populate("likes").skip((page - 1) * perPage).limit(perPage);
          case 9:
            photos = _context.sent;
            photosReversed = photos.reverse();
            return _context.abrupt("return", res.render("client/photos", {
              title: "myPhotoPage",
              user: req.user,
              photos: photosReversed,
              perPage: perPage,
              page: page,
              totalPage: totalPage
            }));
          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            next(_context.t0);
          case 18:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 14]]);
    }));
    function photoPage(_x, _x2, _x3) {
      return _photoPage.apply(this, arguments);
    }
    return photoPage;
  }(),
  newPhotoPage: function () {
    var _newPhotoPage = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
      var albums;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _albumModel.Album.find({
              author: req.user._id
            });
          case 3:
            albums = _context2.sent;
            return _context2.abrupt("return", res.render("client/newPhoto", {
              user: req.user,
              albums: albums
            }));
          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            next(_context2.t0);
          case 10:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[0, 7]]);
    }));
    function newPhotoPage(_x4, _x5, _x6) {
      return _newPhotoPage.apply(this, arguments);
    }
    return newPhotoPage;
  }(),
  newPhoto: function () {
    var _newPhoto = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
      var _req$body, album, titleAlbum, descriptionAlbum, modeAlbum, albumExist, user, imageUrl, _newPhoto2, newAlbum;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _req$body = req.body, album = _req$body.album, titleAlbum = _req$body.titleAlbum, descriptionAlbum = _req$body.descriptionAlbum, modeAlbum = _req$body.modeAlbum;
            _context3.next = 4;
            return _albumModel.Album.findOne({
              title: album,
              author: req.user._id
            });
          case 4:
            albumExist = _context3.sent;
            _context3.next = 7;
            return _userModel.User.findById({
              _id: req.user._id
            });
          case 7:
            user = _context3.sent;
            if (user) {
              _context3.next = 10;
              break;
            }
            throw new Error("User not found");
          case 10:
            imageUrl = "http://".concat(req.hostname, ":").concat(process.env.PORT, "/uploads/").concat(req.file.filename);
            _newPhoto2 = new _photoModel.Photo(_objectSpread(_objectSpread({}, req.body), {}, {
              author: req.user._id,
              image: imageUrl
            }));
            if (!(album === "")) {
              _context3.next = 20;
              break;
            }
            user.photos.push(_newPhoto2._id);
            _context3.next = 16;
            return user.save();
          case 16:
            _context3.next = 18;
            return _newPhoto2.save();
          case 18:
            req.flash("success_message", "Create new photo successfully");
            return _context3.abrupt("return", res.redirect("back"));
          case 20:
            if (albumExist) {
              _context3.next = 36;
              break;
            }
            newAlbum = new _albumModel.Album({
              title: titleAlbum,
              description: descriptionAlbum,
              mode: modeAlbum,
              author: req.user._id
            });
            newAlbum.photos.push(_newPhoto2._id);
            _newPhoto2.albums.push(newAlbum._id);
            user.photos.push(_newPhoto2._id);
            user.albums.push(newAlbum._id);
            _context3.next = 28;
            return user.save();
          case 28:
            _context3.next = 30;
            return _newPhoto2.save();
          case 30:
            _context3.next = 32;
            return newAlbum.save();
          case 32:
            req.flash("success_message", "Create new photo successfully");
            return _context3.abrupt("return", res.redirect("back"));
          case 36:
            _newPhoto2.albums.push(albumExist._id);
            user.photos.push(_newPhoto2._id);
            user.albums.push(albumExist._id);
            _context3.next = 41;
            return user.save();
          case 41:
            _context3.next = 43;
            return _newPhoto2.save();
          case 43:
            _context3.next = 45;
            return albumExist.save();
          case 45:
            req.flash("success_message", "Create new photo successfully");
            return _context3.abrupt("return", res.redirect("back"));
          case 47:
            _context3.next = 53;
            break;
          case 49:
            _context3.prev = 49;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0);
            next(_context3.t0);
          case 53:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[0, 49]]);
    }));
    function newPhoto(_x7, _x8, _x9) {
      return _newPhoto.apply(this, arguments);
    }
    return newPhoto;
  }(),
  editPhotoPage: function () {
    var _editPhotoPage = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
      var id, albums, photo;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            id = req.params.id;
            _context4.next = 4;
            return _albumModel.Album.find({
              author: req.user._id
            });
          case 4:
            albums = _context4.sent;
            _context4.next = 7;
            return _photoModel.Photo.findById(id).populate("albums").populate("author");
          case 7:
            photo = _context4.sent;
            if (photo) {
              _context4.next = 10;
              break;
            }
            throw new Error("Photo not found");
          case 10:
            return _context4.abrupt("return", res.render("client/editPhoto", {
              user: req.user,
              photo: photo,
              albums: albums
            }));
          case 13:
            _context4.prev = 13;
            _context4.t0 = _context4["catch"](0);
            next(_context4.t0);
          case 16:
          case "end":
            return _context4.stop();
        }
      }, _callee4, null, [[0, 13]]);
    }));
    function editPhotoPage(_x10, _x11, _x12) {
      return _editPhotoPage.apply(this, arguments);
    }
    return editPhotoPage;
  }(),
  editPhoto: function () {
    var _editPhoto = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
      var id, _req$body2, album, titleAlbum, descriptionAlbum, modeAlbum, user, albumExist, photo, newAlbum, albumOfPhotoUpdated, photoOfAlbumUpdated, imageUrl, _newAlbum, _imageUrl, _albumOfPhotoUpdated, _photoOfAlbumUpdated;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            id = req.params.id;
            _req$body2 = req.body, album = _req$body2.album, titleAlbum = _req$body2.titleAlbum, descriptionAlbum = _req$body2.descriptionAlbum, modeAlbum = _req$body2.modeAlbum;
            _context5.next = 5;
            return _userModel.User.findById({
              _id: req.user._id
            });
          case 5:
            user = _context5.sent;
            if (user) {
              _context5.next = 8;
              break;
            }
            throw new Error("User not found");
          case 8:
            _context5.next = 10;
            return _albumModel.Album.findOne({
              title: album,
              author: req.user._id
            });
          case 10:
            albumExist = _context5.sent;
            _context5.next = 13;
            return _photoModel.Photo.findById(id);
          case 13:
            photo = _context5.sent;
            if (photo) {
              _context5.next = 16;
              break;
            }
            throw new Error("Update failed");
          case 16:
            if (req.file) {
              _context5.next = 47;
              break;
            }
            if (albumExist) {
              _context5.next = 32;
              break;
            }
            newAlbum = new _albumModel.Album({
              title: titleAlbum,
              description: descriptionAlbum,
              mode: modeAlbum,
              author: req.user._id
            });
            _context5.next = 21;
            return photo.updateOne(_objectSpread({}, req.body));
          case 21:
            user.albums.push(newAlbum._id);
            newAlbum.photos.push(photo._id);
            photo.albums.push(newAlbum._id);
            _context5.next = 26;
            return user.save();
          case 26:
            _context5.next = 28;
            return newAlbum.save();
          case 28:
            _context5.next = 30;
            return photo.save();
          case 30:
            _context5.next = 45;
            break;
          case 32:
            albumOfPhotoUpdated = photo.albums.filter(function (album) {
              return album._id.toString() !== albumExist._id.toString();
            });
            photoOfAlbumUpdated = albumExist.photos.filter(function (item) {
              return item._id.toString() !== photo._id.toString();
            });
            console.log({
              albumOfPhotoUpdated: albumOfPhotoUpdated,
              photoOfAlbumUpdated: photoOfAlbumUpdated
            });
            _context5.next = 37;
            return photo.updateOne(_objectSpread(_objectSpread({}, req.body), {}, {
              albums: albumOfPhotoUpdated
            }));
          case 37:
            _context5.next = 39;
            return albumExist.updateOne({
              photos: photoOfAlbumUpdated
            });
          case 39:
            photo.albums.push(albumExist._id);
            albumExist.photos.push(photo._id);
            _context5.next = 43;
            return albumExist.save();
          case 43:
            _context5.next = 45;
            return photo.save();
          case 45:
            req.flash("success_message", "Updated photo successfully");
            return _context5.abrupt("return", res.redirect("back"));
          case 47:
            if (albumExist) {
              _context5.next = 63;
              break;
            }
            imageUrl = "http://".concat(req.hostname, ":").concat(process.env.PORT, "/uploads/").concat(req.file.filename);
            _newAlbum = new _albumModel.Album({
              title: titleAlbum,
              description: descriptionAlbum,
              mode: modeAlbum,
              author: req.user._id
            });
            _context5.next = 52;
            return photo.updateOne(_objectSpread(_objectSpread({}, req.body), {}, {
              image: imageUrl
            }));
          case 52:
            _newAlbum.photos.push(photo._id);
            photo.albums.push(_newAlbum._id);
            user.albums.push(_newAlbum._id);
            _context5.next = 57;
            return user.save();
          case 57:
            _context5.next = 59;
            return _newAlbum.save();
          case 59:
            _context5.next = 61;
            return photo.save();
          case 61:
            _context5.next = 77;
            break;
          case 63:
            _imageUrl = "http://".concat(req.hostname, ":").concat(process.env.PORT, "/uploads/").concat(req.file.filename);
            _albumOfPhotoUpdated = photo.albums.filter(function (album) {
              return album._id.toString() !== albumExist._id.toString();
            });
            _photoOfAlbumUpdated = albumExist.photos.filter(function (item) {
              return item._id.toString() !== photo._id.toString();
            });
            console.log({
              albumOfPhotoUpdated: _albumOfPhotoUpdated,
              photoOfAlbumUpdated: _photoOfAlbumUpdated
            });
            _context5.next = 69;
            return photo.updateOne(_objectSpread(_objectSpread({}, req.body), {}, {
              image: _imageUrl,
              albums: _albumOfPhotoUpdated
            }));
          case 69:
            _context5.next = 71;
            return albumExist.updateOne({
              photos: _photoOfAlbumUpdated
            });
          case 71:
            photo.albums.push(albumExist._id);
            albumExist.photos.push(photo._id);
            _context5.next = 75;
            return albumExist.save();
          case 75:
            _context5.next = 77;
            return photo.save();
          case 77:
            req.flash("success_message", "Updated photo successfully");
            return _context5.abrupt("return", res.redirect("back"));
          case 81:
            _context5.prev = 81;
            _context5.t0 = _context5["catch"](0);
            console.log(_context5.t0);
            next(_context5.t0);
          case 85:
          case "end":
            return _context5.stop();
        }
      }, _callee5, null, [[0, 81]]);
    }));
    function editPhoto(_x13, _x14, _x15) {
      return _editPhoto.apply(this, arguments);
    }
    return editPhoto;
  }(),
  deletePhoto: function () {
    var _deletePhoto = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res, next) {
      var id, photo;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            id = req.params.id;
            _context7.next = 4;
            return _photoModel.Photo.findByIdAndDelete(id);
          case 4:
            photo = _context7.sent;
            if (photo) {
              _context7.next = 8;
              break;
            }
            req.flash("error_message", "Delete failed");
            return _context7.abrupt("return", res.redirect("back"));
          case 8:
            photo.likes.map( /*#__PURE__*/function () {
              var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(like) {
                return _regenerator["default"].wrap(function _callee6$(_context6) {
                  while (1) switch (_context6.prev = _context6.next) {
                    case 0:
                      _context6.next = 2;
                      return _likeModel.Like.findByIdAndDelete(like._id);
                    case 2:
                    case "end":
                      return _context6.stop();
                  }
                }, _callee6);
              }));
              return function (_x19) {
                return _ref.apply(this, arguments);
              };
            }());
            _context7.next = 11;
            return _userModel.User.updateMany({
              _id: photo.author
            }, {
              $pull: {
                photos: photo._id
              }
            });
          case 11:
            _context7.next = 13;
            return _albumModel.Album.updateMany({
              _id: photo.albums
            }, {
              $pull: {
                photos: photo._id
              }
            });
          case 13:
            req.flash("success_message", "Delete photo successfully");
            return _context7.abrupt("return", res.redirect("/my-photos"));
          case 17:
            _context7.prev = 17;
            _context7.t0 = _context7["catch"](0);
            console.log(_context7.t0);
            next(_context7.t0);
          case 21:
          case "end":
            return _context7.stop();
        }
      }, _callee7, null, [[0, 17]]);
    }));
    function deletePhoto(_x16, _x17, _x18) {
      return _deletePhoto.apply(this, arguments);
    }
    return deletePhoto;
  }(),
  likePhoto: function () {
    var _likePhoto = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res, next) {
      var id, photo, user, newLike;
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            id = req.params.id;
            _context8.next = 4;
            return _photoModel.Photo.findById(id);
          case 4:
            photo = _context8.sent;
            _context8.next = 7;
            return _userModel.User.findById(req.user._id);
          case 7:
            user = _context8.sent;
            if (photo) {
              _context8.next = 10;
              break;
            }
            throw new Error("Photo not found");
          case 10:
            newLike = new _likeModel.Like({
              author: req.user._id,
              nameAuthor: "".concat(user === null || user === void 0 ? void 0 : user.firstName, " ").concat(user === null || user === void 0 ? void 0 : user.lastName),
              likeType: "PHOTO",
              likeTypeId: photo._id
            });
            photo.likes.push(newLike._id);
            _context8.next = 14;
            return photo.save();
          case 14:
            _context8.next = 16;
            return newLike.save();
          case 16:
            req.flash("success_message", "Like photo successfully");
            return _context8.abrupt("return", res.redirect("back"));
          case 20:
            _context8.prev = 20;
            _context8.t0 = _context8["catch"](0);
            next(_context8.t0);
          case 23:
          case "end":
            return _context8.stop();
        }
      }, _callee8, null, [[0, 20]]);
    }));
    function likePhoto(_x20, _x21, _x22) {
      return _likePhoto.apply(this, arguments);
    }
    return likePhoto;
  }(),
  dislikePhoto: function () {
    var _dislikePhoto = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res, next) {
      var id, photo, like, likeOfPhotoUpdated;
      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            id = req.params.id;
            _context9.next = 4;
            return _photoModel.Photo.findOne({
              _id: id,
              author: req.user._id
            });
          case 4:
            photo = _context9.sent;
            if (photo) {
              _context9.next = 7;
              break;
            }
            throw new Error("Photo not found");
          case 7:
            _context9.next = 9;
            return _likeModel.Like.findOne({
              author: req.user._id,
              likeType: "PHOTO",
              likeTypeId: photo._id
            });
          case 9:
            like = _context9.sent;
            likeOfPhotoUpdated = photo.likes.filter(function (item) {
              return item._id.toString() !== (like === null || like === void 0 ? void 0 : like._id.toString());
            });
            _context9.next = 13;
            return photo.updateOne({
              likes: likeOfPhotoUpdated
            });
          case 13:
            _context9.next = 15;
            return like === null || like === void 0 ? void 0 : like.remove();
          case 15:
            return _context9.abrupt("return", res.redirect("back"));
          case 18:
            _context9.prev = 18;
            _context9.t0 = _context9["catch"](0);
            next(_context9.t0);
          case 21:
          case "end":
            return _context9.stop();
        }
      }, _callee9, null, [[0, 18]]);
    }));
    function dislikePhoto(_x23, _x24, _x25) {
      return _dislikePhoto.apply(this, arguments);
    }
    return dislikePhoto;
  }()
};
exports.photoController = photoController;