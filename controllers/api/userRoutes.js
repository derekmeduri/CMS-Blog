const router = require("express").Router();
const { User } = require("../../models");

//create new user for login
router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req, res);
    //save the session data
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.sessions.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

//login finding  user email
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .statusMessage(400)
        .json({ message: "Email or Password is incorrect. Please try again." });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Email or Password is incorrect. Please try again." });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.sessions.logged_in = true;

      res.json({
        user: userData,
        message: "You have been successfully logged in!",
      });
    });
  } catch (err) {
    res.status(404).end();
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
