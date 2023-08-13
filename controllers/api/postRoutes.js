const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const sequelize = require("../../config/connection");
const withAuth = require("../../utils/auth");
const { post } = require("../dashboardRoutes");

//get all posts by user
router.get("/", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      attributes: ["id", "post_title", "post_content", "created_at"],
      //descending by newest to oldest
      order: [["created_at", "DESC"]],
      include: [
        {
          model: Comment,
          attributes: ["id", "comment_content", "user_id", "created_at"],
          include: {
            model: User,
            attributes: ["username", "email"],
          },
        },
        {
          model: User,
          attributes: ["username", "email"],
        },
      ],
    });
    res.json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get one post by user
router.get("/:id", async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: { id: req.params.id },
      attributes: ["id", "post_title", "post_content", "user_id", "created_at"],
      include: [
        {
          model: User,
          attributes: ["username", "email"],
        },
        {
          model: Comment,
          attributes: ["id", "comment_content", "user_id", "created_at"],
          include: {
            model: User,
            attributes: ["username", "email"],
          },
        },
      ],
    });
    if (!postData) {
      res.status(404).json({ message: "Post not found." });
      return;
    }
    res.json(postData);
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

//update posts if user is logged in
router.put("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.update(
      {
        post_title: req.body.post_title,
        post_content: req.body.post_content,
      },
      {
        where: { id: req.params.id },
      }
    );
    //if no post by that id then throw error message
    if (!postData) {
      res.status(404).json({ message: "Post not found." });
      return;
    }

    res.json({ message: "Post updated successfully!" });
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete post if user is logged in
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: { id: req.params.id },
    });
    //if no post with id is found display error
    if (!postData) {
      res
        .status(404)
        .json({ message: "Could not delete post or post not found." });
      return;
    }

    res.json({ message: "Post successfully deleted!" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
