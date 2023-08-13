const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const sequelize = require("../config/connection");
const withAuth = require("../utils/auth");
const { increment } = require("../models/Post");

//gets dashboard or redirects to login withAuth if they are not authenticated
router.get("/", withAuth, async (req, res) => {
  try {
    //find all posts by user
    const postData = await Post.findAll({
      attributes: ["id", "post_title", "post_content", "user_id", "created_at"],
      order: [["username", "ASC"]],
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
      ],
    });
    //serialize data so template can read it
    const posts = postData.map((post) => post.get({ plain: true }));
    //render handlebars dashboard
    res.render("dashboard", {
      posts,
      logged_in: true,
    });
    //catch error and return status 500
  } catch (err) {
    res.status(500).json(err);
  }
});

//get single post on dashboard
router.get("edit/:Id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "post_title", "post_content", "user_id", "created_at"],
      include: [
        {
          model: User,
          attributes: ["username", "email"],
        },
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
            attributes: ["username", "email"],
          },
        },
      ],
    });
    if (!postData) {
      res.status(404).json({ message: "No posts found." });
      return;
    }

    const post = postData.get({ plain: true });
    //render handlebars for edit post
    res.render("editpost", { post, logged_in: true });
  } catch (err) {
    res.status(500).json(err);
  }
});

//create new post if user in logged in
router.post("/", withAuth, async (req, res) => {
  try {
    const postData = await Post.create({
      //create with post model
      post_title: req.body.post_title,
      post_content: req.body.post_content,
      user_id: req.session.user_id,
    });
    res.json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
