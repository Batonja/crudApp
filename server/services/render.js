exports.homeRoutes = (req, res) => {
  res.render("index.ejs");
};

exports.addUserRoute = (req, res) => {
  res.render("add_user.ejs");
};

exports.updateUserRoute = (req, res) => {
  res.render("update_user.ejs");
};
