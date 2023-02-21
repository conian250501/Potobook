import path from "path";

export const viewEngine = (app) => {
  app.set("views", "./src/views");
  app.set("view engine", "pug");
};
