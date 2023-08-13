const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

//get comments
router.get("/", async (req, res) => {
  try {
    const commentData = await Comment.findAll({});
    //turn comments into json object
    res.json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get comment ids
router.get("/:id", async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      where: { id: req.params.id },
    });
    res.json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//post comment if user is logged in
router.post("/", withAuth, async (req, res) => {
  try {
    const commmentData = await Comment.create({
      comment_content: req.body.comment_content,
      post_id: req.body.post_id,
      user_id: req.session.user_id,
    });
    res.json(commmentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//delete comment if user is logged in
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: { id: req.params.id },
    });
    if (!commentData) {
      res
        .status(404)
        .json({ message: "Cannot delete comment or no comment found." });
      return;
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
