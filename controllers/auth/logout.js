const { User } = require("../../models");

const logout = async (req, res) => {
  const { _id } = req.User;
  await User.findByIdAndUpdate(_id, { token: null });
  res.status(204);
  res.json();
};

module.exports = logout;
