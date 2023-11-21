const mongoose = require("mongoose");
const User = require("../models/user");
const { hashSync, compareSync } = require("bcryptjs");
const jwt = require("jsonwebtoken");

const controller = () => {
  return {
    getUser: async (req, res) => {
      const { username } = req.params;
      const user = await User.findOne({ username: username });
      const { password, ...data } = user._doc;
      if (user) return res.status(200).json(data);
      return res.status(500).json("User does not exist");
    },
    getUserById: async (req, res) => {
      try {
        const { id } = req.params;
        const user = await User.findById(id);
        const { password, ...data } = user._doc;
        if (user) return res.status(200).json({ user: data });
        return res.status(500).json("User does not exist");
      } catch (e) {
        console.log(e.message);
        res.send(e);
      }
    },
    updateUser: async (req, res) => {
      const { username } = req.params;
      const { currentUser, admin, password } = req.body;
      if (password) {
        req.body.password = hashSync(password, 10);
      }
      if (username === currentUser || admin) {
        const user = await User.findOneAndUpdate(
          { username: username },
          req.body,
          { new: true }
        );
        return res.status(200).json({ user: user });
      } else {
        return res.status(500).json({ message: "Not Authorized" });
      }
    },
    updateUserById: async (req, res) => {
      const { id } = req.params;
      const oid = new mongoose.Types.ObjectId(id);
      console.log(req.body);
      const { _id } = req.body;
      console.log(_id);
      console.log(oid);
      // if(password){
      //     req.body.password = hashSync(password,10)
      // }
      if (id === _id) {
        const user = await User.findOneAndUpdate({ _id: oid }, req.body, {
          new: true,
        });
        const token = jwt.sign(
          { username: user.username, _id: user._id },
          "secret",
          { expiresIn: "1h" }
        );
        return res.status(200).json({ user, token });
      } else {
        return res.status(500).json({ message: "Not Authorized" });
      }
    },
    deleteUser: async (req, res) => {
      const { username } = req.params;
      const { currentUser, admin } = req.body;
      if (username === currentUser || admin) {
        const user = await User.findOneAndDelete(
          { username: username },
          req.body,
          { new: true }
        );
        return res.status(200).json({ user: user });
      } else {
        return res.status(500).json({ message: "Not Authorized" });
      }
    },
  };
};

module.exports = controller;
