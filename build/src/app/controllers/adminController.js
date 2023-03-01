"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.adminController = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _photoModel = require("../models/photoModel");
var _albumModel = require("../models/albumModel");
var _userModel = require("../models/userModel");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var adminController = {
  photosPage: function () {
    var _photosPage = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
      var perPage, page, total, totalPage, photos, photosReverse;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            perPage = req.query.limit || 4;
            page = req.query.page || 1;
            _context.next = 5;
            return _photoModel.Photo.find({}).count();
          case 5:
            total = _context.sent;
            totalPage = Math.ceil(total / perPage);
            _context.next = 9;
            return _photoModel.Photo.find({}).populate(["author", "albums"]).skip((page - 1) * perPage).limit(perPage);
          case 9:
            photos = _context.sent;
            photosReverse = photos.reverse();
            return _context.abrupt("return", res.render("admin/photos", {
              title: "adminPhotoPage",
              user: req.user,
              photos: photosReverse,
              page: page,
              perPage: perPage,
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
    function photosPage(_x, _x2, _x3) {
      return _photosPage.apply(this, arguments);
    }
    return photosPage;
  }(),
  editPhotoPage: function () {
    var _editPhotoPage = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
      var id, albums, photo;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            id = req.params.id;
            _context2.next = 4;
            return _albumModel.Album.find({
              author: req.user._id
            });
          case 4:
            albums = _context2.sent;
            _context2.next = 7;
            return _photoModel.Photo.findById(id).populate("albums").populate("author");
          case 7:
            photo = _context2.sent;
            if (photo) {
              _context2.next = 10;
              break;
            }
            throw new Error("Photo not found");
          case 10:
            return _context2.abrupt("return", res.render("admin/editPhoto", {
              user: req.user,
              photo: photo,
              albums: albums
            }));
          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](0);
            next(_context2.t0);
          case 16:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[0, 13]]);
    }));
    function editPhotoPage(_x4, _x5, _x6) {
      return _editPhotoPage.apply(this, arguments);
    }
    return editPhotoPage;
  }(),
  editPhoto: function () {
    var _editPhoto = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
      var id, _req$body, album, titleAlbum, descriptionAlbum, modeAlbum, user, albumExist, photo, newAlbum, albumOfPhotoUpdated, photoOfAlbumUpdated, imageUrl, _newAlbum, _imageUrl, _albumOfPhotoUpdated, _photoOfAlbumUpdated;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            id = req.params.id;
            _req$body = req.body, album = _req$body.album, titleAlbum = _req$body.titleAlbum, descriptionAlbum = _req$body.descriptionAlbum, modeAlbum = _req$body.modeAlbum;
            _context3.next = 5;
            return _userModel.User.findById({
              _id: req.body.userId
            });
          case 5:
            user = _context3.sent;
            if (user) {
              _context3.next = 8;
              break;
            }
            throw new Error("User not found");
          case 8:
            _context3.next = 10;
            return _albumModel.Album.findOne({
              title: album,
              author: req.user._id
            });
          case 10:
            albumExist = _context3.sent;
            _context3.next = 13;
            return _photoModel.Photo.findById(id);
          case 13:
            photo = _context3.sent;
            if (photo) {
              _context3.next = 16;
              break;
            }
            throw new Error("Update failed");
          case 16:
            if (req.file) {
              _context3.next = 47;
              break;
            }
            if (albumExist) {
              _context3.next = 32;
              break;
            }
            newAlbum = new _albumModel.Album({
              title: titleAlbum,
              description: descriptionAlbum,
              mode: modeAlbum,
              author: req.user._id
            });
            _context3.next = 21;
            return photo.updateOne(_objectSpread({}, req.body));
          case 21:
            user.albums.push(newAlbum._id);
            newAlbum.photos.push(photo._id);
            photo.albums.push(newAlbum._id);
            _context3.next = 26;
            return user.save();
          case 26:
            _context3.next = 28;
            return newAlbum.save();
          case 28:
            _context3.next = 30;
            return photo.save();
          case 30:
            _context3.next = 45;
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
            _context3.next = 37;
            return photo.updateOne(_objectSpread(_objectSpread({}, req.body), {}, {
              albums: albumOfPhotoUpdated
            }));
          case 37:
            _context3.next = 39;
            return albumExist.updateOne({
              photos: photoOfAlbumUpdated
            });
          case 39:
            photo.albums.push(albumExist._id);
            albumExist.photos.push(photo._id);
            _context3.next = 43;
            return albumExist.save();
          case 43:
            _context3.next = 45;
            return photo.save();
          case 45:
            req.flash("success_message", "Updated photo successfully");
            return _context3.abrupt("return", res.redirect("back"));
          case 47:
            if (albumExist) {
              _context3.next = 63;
              break;
            }
            imageUrl = "http://".concat(req.hostname, ":").concat(process.env.PORT, "/uploads/").concat(req.file.filename);
            _newAlbum = new _albumModel.Album({
              title: titleAlbum,
              description: descriptionAlbum,
              mode: modeAlbum,
              author: req.user._id
            });
            _context3.next = 52;
            return photo.updateOne(_objectSpread(_objectSpread({}, req.body), {}, {
              image: imageUrl
            }));
          case 52:
            _newAlbum.photos.push(photo._id);
            photo.albums.push(_newAlbum._id);
            user.albums.push(_newAlbum._id);
            _context3.next = 57;
            return user.save();
          case 57:
            _context3.next = 59;
            return _newAlbum.save();
          case 59:
            _context3.next = 61;
            return photo.save();
          case 61:
            _context3.next = 77;
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
            _context3.next = 69;
            return photo.updateOne(_objectSpread(_objectSpread({}, req.body), {}, {
              image: _imageUrl,
              albums: _albumOfPhotoUpdated
            }));
          case 69:
            _context3.next = 71;
            return albumExist.updateOne({
              photos: _photoOfAlbumUpdated
            });
          case 71:
            photo.albums.push(albumExist._id);
            albumExist.photos.push(photo._id);
            _context3.next = 75;
            return albumExist.save();
          case 75:
            _context3.next = 77;
            return photo.save();
          case 77:
            req.flash("success_message", "Updated photo successfully");
            return _context3.abrupt("return", res.redirect("back"));
          case 81:
            _context3.prev = 81;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0);
            next(_context3.t0);
          case 85:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[0, 81]]);
    }));
    function editPhoto(_x7, _x8, _x9) {
      return _editPhoto.apply(this, arguments);
    }
    return editPhoto;
  }(),
  deletePhoto: function () {
    var _deletePhoto = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
      var id, photo;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            id = req.params.id;
            _context4.next = 4;
            return _photoModel.Photo.findByIdAndDelete(id);
          case 4:
            photo = _context4.sent;
            if (photo) {
              _context4.next = 8;
              break;
            }
            req.flash("error_message", "Delete failed");
            return _context4.abrupt("return", res.redirect("back"));
          case 8:
            _context4.next = 10;
            return _userModel.User.updateMany({
              _id: photo.author
            }, {
              $pull: {
                photos: photo._id
              }
            });
          case 10:
            _context4.next = 12;
            return _albumModel.Album.updateMany({
              _id: photo.albums
            }, {
              $pull: {
                photos: photo._id
              }
            });
          case 12:
            req.flash("success_message", "Delete photo successfully");
            return _context4.abrupt("return", res.redirect("/my-photos"));
          case 16:
            _context4.prev = 16;
            _context4.t0 = _context4["catch"](0);
            console.log(_context4.t0);
            next(_context4.t0);
          case 20:
          case "end":
            return _context4.stop();
        }
      }, _callee4, null, [[0, 16]]);
    }));
    function deletePhoto(_x10, _x11, _x12) {
      return _deletePhoto.apply(this, arguments);
    }
    return deletePhoto;
  }(),
  albumsPage: function () {
    var _albumsPage = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
      var perPage, page, total, totalPage, albums, albumsReverse;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            perPage = req.query.limit || 4;
            page = req.query.page || 1;
            _context5.next = 5;
            return _albumModel.Album.find({}).count();
          case 5:
            total = _context5.sent;
            totalPage = Math.ceil(total / perPage);
            _context5.next = 9;
            return _albumModel.Album.find({}).populate(["author", "photos"]).skip((page - 1) * perPage).limit(perPage);
          case 9:
            albums = _context5.sent;
            albumsReverse = albums.reverse();
            return _context5.abrupt("return", res.render("admin/albums", {
              title: "adminAlbumPage",
              user: req.user,
              albums: albumsReverse,
              page: page,
              perPage: perPage,
              totalPage: totalPage
            }));
          case 14:
            _context5.prev = 14;
            _context5.t0 = _context5["catch"](0);
            console.log(_context5.t0);
            next(_context5.t0);
          case 18:
          case "end":
            return _context5.stop();
        }
      }, _callee5, null, [[0, 14]]);
    }));
    function albumsPage(_x13, _x14, _x15) {
      return _albumsPage.apply(this, arguments);
    }
    return albumsPage;
  }(),
  editAlbumPage: function () {
    var _editAlbumPage = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res, next) {
      var id, album;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            id = req.params.id;
            _context6.next = 4;
            return _albumModel.Album.findById(id).populate("author").populate("photos");
          case 4:
            album = _context6.sent;
            if (album) {
              _context6.next = 7;
              break;
            }
            throw new Error("Album not found");
          case 7:
            return _context6.abrupt("return", res.render("admin/editAlbum", {
              user: req.user,
              album: album
            }));
          case 10:
            _context6.prev = 10;
            _context6.t0 = _context6["catch"](0);
            console.log(_context6.t0);
            next(_context6.t0);
          case 14:
          case "end":
            return _context6.stop();
        }
      }, _callee6, null, [[0, 10]]);
    }));
    function editAlbumPage(_x16, _x17, _x18) {
      return _editAlbumPage.apply(this, arguments);
    }
    return editAlbumPage;
  }(),
  editAlbum: function () {
    var _editAlbum = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res, next) {
      var id, user, album, images;
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            id = req.params.id;
            _context8.next = 4;
            return _userModel.User.findById({
              _id: req.body.userId
            });
          case 4:
            user = _context8.sent;
            if (user) {
              _context8.next = 7;
              break;
            }
            throw new Error("User not found");
          case 7:
            _context8.next = 9;
            return _albumModel.Album.findById(id);
          case 9:
            album = _context8.sent;
            if (album) {
              _context8.next = 12;
              break;
            }
            throw new Error("Album not found");
          case 12:
            _context8.next = 14;
            return album.updateOne(_objectSpread({}, req.body));
          case 14:
            images = req.files;
            images.map( /*#__PURE__*/function () {
              var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(image) {
                var imageUrl, newPhoto;
                return _regenerator["default"].wrap(function _callee7$(_context7) {
                  while (1) switch (_context7.prev = _context7.next) {
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
                      _context7.next = 7;
                      return newPhoto.save();
                    case 7:
                    case "end":
                      return _context7.stop();
                  }
                }, _callee7);
              }));
              return function (_x22) {
                return _ref.apply(this, arguments);
              };
            }());
            _context8.next = 18;
            return user.save();
          case 18:
            _context8.next = 20;
            return album.save();
          case 20:
            req.flash("success_message", "Updated photo successfully");
            return _context8.abrupt("return", res.redirect("back"));
          case 24:
            _context8.prev = 24;
            _context8.t0 = _context8["catch"](0);
            console.log(_context8.t0);
            next(_context8.t0);
          case 28:
          case "end":
            return _context8.stop();
        }
      }, _callee8, null, [[0, 24]]);
    }));
    function editAlbum(_x19, _x20, _x21) {
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
            album.photos.map( /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(photo) {
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
              return function (_x26) {
                return _ref2.apply(this, arguments);
              };
            }());
            _context10.next = 10;
            return _userModel.User.updateMany({
              _id: album.author
            }, {
              $pull: {
                albums: album._id
              }
            });
          case 10:
            req.flash("success_message", "Delete album successfully");
            return _context10.abrupt("return", res.redirect("/admin/albums"));
          case 14:
            _context10.prev = 14;
            _context10.t0 = _context10["catch"](0);
            console.log(_context10.t0);
            next(_context10.t0);
          case 18:
          case "end":
            return _context10.stop();
        }
      }, _callee10, null, [[0, 14]]);
    }));
    function deleteAlbum(_x23, _x24, _x25) {
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
    function deletePhotoOfAlbum(_x27, _x28, _x29) {
      return _deletePhotoOfAlbum.apply(this, arguments);
    }
    return deletePhotoOfAlbum;
  }(),
  usersPage: function () {
    var _usersPage = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(req, res, next) {
      var perPage, page, total, totalPage, users, usersReverse;
      return _regenerator["default"].wrap(function _callee12$(_context12) {
        while (1) switch (_context12.prev = _context12.next) {
          case 0:
            _context12.prev = 0;
            perPage = req.query.limit || 10;
            page = req.query.page || 1;
            _context12.next = 5;
            return _userModel.User.find({}).count();
          case 5:
            total = _context12.sent;
            totalPage = Math.ceil(total / perPage);
            _context12.next = 9;
            return _userModel.User.find({
              isAdmin: false
            }).skip((page - 1) * perPage).limit(perPage);
          case 9:
            users = _context12.sent;
            usersReverse = users.reverse();
            return _context12.abrupt("return", res.render("admin/users", {
              title: "adminUserPage",
              user: req.user,
              users: usersReverse,
              page: page,
              perPage: perPage,
              totalPage: totalPage
            }));
          case 14:
            _context12.prev = 14;
            _context12.t0 = _context12["catch"](0);
            console.log(_context12.t0);
            next(_context12.t0);
          case 18:
          case "end":
            return _context12.stop();
        }
      }, _callee12, null, [[0, 14]]);
    }));
    function usersPage(_x30, _x31, _x32) {
      return _usersPage.apply(this, arguments);
    }
    return usersPage;
  }(),
  editUserPage: function () {
    var _editUserPage = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(req, res, next) {
      var id, userExist;
      return _regenerator["default"].wrap(function _callee13$(_context13) {
        while (1) switch (_context13.prev = _context13.next) {
          case 0:
            _context13.prev = 0;
            id = req.params.id;
            _context13.next = 4;
            return _userModel.User.findById(id);
          case 4:
            userExist = _context13.sent;
            return _context13.abrupt("return", res.render("admin/editUser", {
              title: "adminUserPage",
              user: req.user,
              userExist: userExist
            }));
          case 8:
            _context13.prev = 8;
            _context13.t0 = _context13["catch"](0);
            console.log(_context13.t0);
            next(_context13.t0);
          case 12:
          case "end":
            return _context13.stop();
        }
      }, _callee13, null, [[0, 8]]);
    }));
    function editUserPage(_x33, _x34, _x35) {
      return _editUserPage.apply(this, arguments);
    }
    return editUserPage;
  }(),
  editUser: function () {
    var _editUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14(req, res, next) {
      var id, _req$body2, firstName, lastName, active, user, imageUrl;
      return _regenerator["default"].wrap(function _callee14$(_context14) {
        while (1) switch (_context14.prev = _context14.next) {
          case 0:
            _context14.prev = 0;
            id = req.params.id;
            _req$body2 = req.body, firstName = _req$body2.firstName, lastName = _req$body2.lastName, active = _req$body2.active;
            _context14.next = 5;
            return _userModel.User.findById(id);
          case 5:
            user = _context14.sent;
            if (user) {
              _context14.next = 8;
              break;
            }
            throw new Error("User not found");
          case 8:
            if (req.file) {
              _context14.next = 13;
              break;
            }
            _context14.next = 11;
            return user.updateOne(_objectSpread(_objectSpread({}, req.body), {}, {
              active: active ? true : false
            }));
          case 11:
            _context14.next = 18;
            break;
          case 13:
            if (user) {
              _context14.next = 15;
              break;
            }
            throw new Error("User not found");
          case 15:
            imageUrl = "http://".concat(req.hostname, ":").concat(process.env.PORT, "/uploads/").concat(req.file.filename);
            _context14.next = 18;
            return user.updateOne(_objectSpread(_objectSpread({}, req.body), {}, {
              active: active ? true : false,
              avatar: imageUrl
            }));
          case 18:
            req.flash("success__message", "Updated user successfully");
            return _context14.abrupt("return", res.redirect("back"));
          case 22:
            _context14.prev = 22;
            _context14.t0 = _context14["catch"](0);
            console.log(_context14.t0);
            next(_context14.t0);
          case 26:
          case "end":
            return _context14.stop();
        }
      }, _callee14, null, [[0, 22]]);
    }));
    function editUser(_x36, _x37, _x38) {
      return _editUser.apply(this, arguments);
    }
    return editUser;
  }(),
  deleteUser: function () {
    var _deleteUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee17(req, res, next) {
      var id, user;
      return _regenerator["default"].wrap(function _callee17$(_context17) {
        while (1) switch (_context17.prev = _context17.next) {
          case 0:
            _context17.prev = 0;
            id = req.params.id;
            _context17.next = 4;
            return _userModel.User.findByIdAndDelete(id);
          case 4:
            user = _context17.sent;
            if (user) {
              _context17.next = 7;
              break;
            }
            throw new Error("User not found");
          case 7:
            user.albums.map( /*#__PURE__*/function () {
              var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15(album) {
                return _regenerator["default"].wrap(function _callee15$(_context15) {
                  while (1) switch (_context15.prev = _context15.next) {
                    case 0:
                      _context15.next = 2;
                      return _albumModel.Album.findByIdAndDelete(album._id);
                    case 2:
                    case "end":
                      return _context15.stop();
                  }
                }, _callee15);
              }));
              return function (_x42) {
                return _ref3.apply(this, arguments);
              };
            }());
            user.photos.map( /*#__PURE__*/function () {
              var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16(photo) {
                return _regenerator["default"].wrap(function _callee16$(_context16) {
                  while (1) switch (_context16.prev = _context16.next) {
                    case 0:
                      _context16.next = 2;
                      return _photoModel.Photo.findByIdAndDelete(photo._id);
                    case 2:
                    case "end":
                      return _context16.stop();
                  }
                }, _callee16);
              }));
              return function (_x43) {
                return _ref4.apply(this, arguments);
              };
            }());
            req.flash("success__messages", "Delete User successfully");
            return _context17.abrupt("return", res.redirect("/admin/users"));
          case 13:
            _context17.prev = 13;
            _context17.t0 = _context17["catch"](0);
            next(_context17.t0);
          case 16:
          case "end":
            return _context17.stop();
        }
      }, _callee17, null, [[0, 13]]);
    }));
    function deleteUser(_x39, _x40, _x41) {
      return _deleteUser.apply(this, arguments);
    }
    return deleteUser;
  }()
};
exports.adminController = adminController;