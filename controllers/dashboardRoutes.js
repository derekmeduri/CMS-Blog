const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const sequelize = require("../config/connection");
const withAuth = require("../utils/auth");

//gets dashboard or redirects to login withAuth if they are not authenticated
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    //find all posts by user
    const userData = await User.findAll({
      attributes: { exclude: ["password"] },
      order: [["username", "ASC"]],
      include: [
        {
          model: Post,
          include: [
            {
              model: User,
              attributes: ["username", "email"],
            },
          ],
          where: { user_id: req.session.logged_in_id },
        },
      ],
    });
    //serialize data so template can read it
    const users = userData.map((user) => user.get({ plain: true }));
    //render handlebars dashboard
    res.render("dashboard", {
      users,
      logged_in: req.session.logged_in,
      logged_in_id: req.session.logged_in_id,
      //current url
      url: req.url,
      upatingBlog: false,
    });
    //catch error and return status 500
  } catch (err) {
    res.status(500).json(err);
  }
});

//get single post on dashboard
router.get("/dashboard/:postId", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.postId, {
      include: [
        {
          model: User,
          attributes: ["username", "email"],
        },
      ],
    });

    if (!postData) {
      return res.status(404).json({ error: "No Post found" });
    }
    const users = postData.get({ plain: true });

    //render handlebars dashboard
    res.render("dashboard", {
      users,
      logged_in: req.session.logged_in,
      logged_in_id: req.session.logged_in_id,
      //current url
      url: req.url,
      //update blog post
      upatingBlog: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//post details
