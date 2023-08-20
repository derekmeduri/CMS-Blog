const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const routes = require("./controllers");
const sequelize = require("./config/connection");
const helpers = require("./utils/helpers");
const exp = require("constants");

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

const sesh = {
  secret: process.env.SECRET,
  cookie: {
    //kills after 10 mins (time in milliseconds)
    maxage: 600000,
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  },
  reseave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sesh));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

//connect to db before starting server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log("Now Listening on port 'http://localhost:${PORT}'")
  );
});
