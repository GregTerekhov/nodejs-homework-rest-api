const { Conflict } = require("http-errors");
const gravatar = require("gravatar");

const { User } = require("../../models");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }

  const avatarURL = gravatar.url(email);
  const newUser = new User({ email, avatarURL });

  newUser.setPassword(password);
  newUser.save();

  res.status(201);
  res.json({
    status: "success",
    code: 201,
    data: {
      user: {
        email,
        subscription: "starter",
        avatarURL,
      },
    },
  });
};

module.exports = register;
