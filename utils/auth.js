const withAuth = (req, res, next) => {
  //if user isnt logged in itll redirect to login
  if (!req.session.logged_in) {
    res.redirect("/login");
  } else {
    next();
  }
};

//export auth function
module.exports = withAuth;
