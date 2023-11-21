const User = require("../models/user");
const { hashSync, compareSync } = require("bcryptjs");
const jwt = require("jsonwebtoken");

const controller = () => {
  return {
    register: async (req, res) => {
      try {
        const data = req.body;
        data.password = hashSync(data.password, 10);
        const user = await User.create(data);
        const token = jwt.sign(
          { username: user.username, _id: user._id },
          "secret",
          { expiresIn: "1hr" }
        );
        res.status(200).json({ user, token });
      } catch (e) {
        let message = "Something Went Wrong !!!";
        return res.status(500).json({
          message: message,
        });
      }
    },
    login: async (req, res) => {
      try {
        const { username, password } = req.body;
        const user = await User.findOne({ username: username });
        if (user === null)
          return res.status(400).json({ status: "User does not exist" });
        if (compareSync(password, user.password)) {
          const token = jwt.sign(
            { username: user.username, _id: user._id },
            "secret",
            { expiresIn: "1hr" }
          );
          return res.json({ user, token });
        } else return res.status(400).json({ status: "Incorrect Password" });
      } catch (e) {
        console.log(e);
      }
    },
  };
};

module.exports = controller;
