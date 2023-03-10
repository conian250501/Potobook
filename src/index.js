import dotenv from "dotenv";
import bodyParser from "body-parser";
import flash from "connect-flash";
import express from "express";
import session from "express-session";
import passport from "passport";
import path from "path";
import { rootRouter } from "./app/router/rootRouter";
import { connectMongoDB } from "./config/dbConfig";
import { viewEngine } from "./config/viewEngine";
import { passportLocal } from "./middleware/passport";

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

// CONNECT DATABASE
connectMongoDB
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));

app.use(flash());
passportLocal();
app.use(
  session({
    secret: "r8q,+&1LM3)CD*zAGpx1xm{NeQhc;#",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 }, // 1 hour
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.static(path.join(__dirname, "public")));
app.use(function (req, res, next) {
  res.locals.success_message = req.flash("success_message");
  res.locals.error_message = req.flash("error_message");
  res.locals.error = req.flash("error");
  next();
});

// SET VIEW ENGINE
viewEngine(app);

// SET ROUTER
rootRouter(app);

app.use((err, req, res, next) => {
  res.render("error/error", { error: err.message });
});

app.listen(port, () => {
  console.log(`Server running on : http://localhost:${port}`);
});
