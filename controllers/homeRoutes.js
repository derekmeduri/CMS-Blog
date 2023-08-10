const router = require("express").Router();
const { User } = require("../models");
const withAuth = require("../utils/auth");

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
    res.render("", {
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

module.exports = router;
