import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { connectMongoDB } from "./config/dbConfig";
import { rootRouter } from "./app/router/rootRouter";
import { viewEngine } from "./config/viewEngine";
import path from "path";
import session from "express-session";
import passport from "passport";
import flash from "connect-flash";
import { passportLocal } from "./middleware/passport";

dotenv.config();

const port = process.env.PORT || 4001;
const app = express();

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

app.use(bodyParser.json({ limit: "100000mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "1000000mb" }));
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

// Cath error 404
app.use((req, res, next) => {
  const error = new Error("Not found");
  res.render("error/error", { error: error.message });
});

app.listen(port, () => {
  console.log(`Server running on : http://localhost:${port}`);
});
