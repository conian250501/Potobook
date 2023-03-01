"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _connectFlash = _interopRequireDefault(require("connect-flash"));
var dotenv = _interopRequireWildcard(require("dotenv"));
var _express = _interopRequireDefault(require("express"));
var _expressSession = _interopRequireDefault(require("express-session"));
var _passport = _interopRequireDefault(require("passport"));
var _path = _interopRequireDefault(require("path"));
var _rootRouter = require("./app/router/rootRouter");
var _dbConfig = require("./config/dbConfig");
var _viewEngine = require("./config/viewEngine");
var _passport2 = require("./middleware/passport");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
dotenv.config({
  path: _path["default"].join(__dirname, "../.env")
});
var app = (0, _express["default"])();
var port = process.env.PORT || 8080;

// CONNECT DATABASE
_dbConfig.connectMongoDB.then(function () {
  console.log("Connected to MongoDB");
})["catch"](function (err) {
  return console.log(err);
});
app.use((0, _connectFlash["default"])());
(0, _passport2.passportLocal)();
app.use((0, _expressSession["default"])({
  secret: "r8q,+&1LM3)CD*zAGpx1xm{NeQhc;#",
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 60 * 60 * 1000
  } // 1 hour
}));

app.use(_passport["default"].initialize());
app.use(_passport["default"].session());
app.use(_bodyParser["default"].json({
  limit: "50mb"
}));
app.use(_bodyParser["default"].urlencoded({
  extended: true,
  limit: "50mb"
}));
app.use(_express["default"]["static"](_path["default"].join(__dirname, "public")));
app.use(function (req, res, next) {
  res.locals.success_message = req.flash("success_message");
  res.locals.error_message = req.flash("error_message");
  res.locals.error = req.flash("error");
  next();
});

// SET VIEW ENGINE
(0, _viewEngine.viewEngine)(app);

// SET ROUTER
(0, _rootRouter.rootRouter)(app);
app.use(function (err, req, res, next) {
  res.render("error/error", {
    error: err.message
  });
});
app.listen(port, function () {
  console.log("Server running on : http://localhost:".concat(port));
});