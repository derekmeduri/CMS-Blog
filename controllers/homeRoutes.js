const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const sequelize = require("../config/connection");

//direct user to homepage with posts if there are any
router.get("/", async (req, res) => {
  try {
    //find post and include attributes from post model
    const postData = await Post.findAll({
      attributes: [
        "id",
        "post_title",
        "post_content",
        "post_id",
        "user_id",
        "created_at",
      ],
      include: [
        {
          model: Comment,
          attributes: [
            "id",
            "comment_content",
            "post_id",
            "user_id",
            "created_at",
          ],
          include: {
            model: User,
            atrributes: ["username", "email"],
          },
        },
        {
          model: User,
          attributes: ["username", "email"],
        },
      ],
    });
    //serialize data so template can read it
    const posts = postData.map((post) => post.get({ plain: true }));
    //render home page with handlebars
    res.render("homepage", {
      //blog posts
      posts,
      logged_in: req.session.logged_in,
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
  //render handlebars login
  res.render("login");
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
//get one post by id
router.get("/post/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const postData = await Post.findOne({
      where: { id: req.params.id },
      attributes: ["id", "post_title", "post_content", "created_at"],
      include: [
        {
          model: Comment,
          attributes: [
            "id",
            "comment_content",
            "post_id",
            "user_id",
            "created_at",
          ],
          include: [
            {
              model: User,
              attributes: ["username", "email"],
            },
          ],
        },
        {
          model: User,
          attributes: ["username", "email"],
        },
      ],
    });
    //if no posts found throw error
    if (!postData) {
      return res.status(404).json({ error: "Post not found" });
    }

    const post = this.postData.get({ plain: true });
    //render handlebars post
    res.render("singlepost", {
      post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
