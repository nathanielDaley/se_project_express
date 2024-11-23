const User = require("../models/user");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send({ users }))
    .catch((err) => {
      console.error(err);
      res.status(500).send({ message: err.message });
    });
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.send({ user }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.createUser = (req, res) => {
  const { name, avatar } = req.body;

  //console.log(`${name} ${avatar}`);

  User.create({ name, avatar })
    .then((user) => res.status(201).send({ user }))
    .catch((err) => {
      console.error(err);
      res.status(500).send({ message: err.message });
    });
};
