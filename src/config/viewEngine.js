import path from "path";

export const viewEngine = (app) => {
  app.set("views", path.join(__dirname, "../views"));
  app.set("view engine", "pug");
};
