const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const sequelize = require("../config/connection");

//direct user to homepage with posts if there are any
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      //order by descending date
      order: [["post_date", "DESC"]],
      include: [
        {
          model: User,
          atrributes: ["username", "email"],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["username", "email"],
            },
          ],
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));
    //render home page with handlebars
    res.render("homepage", {
      //blog posts
      posts,
      logged_in: req.session.logged_in,
      //logged in session id
      logged_in_id: req.session.logged_in_id,
      //current url
      url: req.url,
      postId: req.params.postId,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//login
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
});

//sign up
router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  //render handlebars signup
  res.render("signup");
});

module.exports = router;
