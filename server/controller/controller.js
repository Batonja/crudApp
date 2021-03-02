let Userdb = require("../model/model");

//creat and save new user
exports.create = (req, res) => {
  //validate req
  if (!req.body) {
    return res.status(400).send({ message: "Content cannot be empty" });
  }

  //new user
  const user = new Userdb({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
  });

  // save user in the database
  user
    .save(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Some error occured while creating user",
      })
    );
};

//retrieve and return all users retrive and return a single user
exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;

    Userdb.findById(id)
      .then((data) => {
        if (!data)
          return res
            .status(404)
            .send({ message: `User with id ${id} not found` });
        return res.send(data);
      })
      .catch((err) => {
        return res
          .status(500)
          .send({
            message: `User with id ${id} not found, internal server error`,
          });
      });
  }

  Userdb.find()
    .then((user) => res.send(user))
    .catch((err) =>
      res.status(500).send({
        message: err.message || "Error occured by retrieving user information",
      })
    );
};

//Update
exports.update = (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .send({ message: "Data to update cannot be entered" });
  }
  const id = req.params.id;
  Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        return res.status(400).send({
          message: `Cannot update user with ${id}, maybe user isn't found`,
        });
      } else {
        return res.send(data);
      }
    })
    .catch((err) =>
      res.status(500).send({ message: "Error updating user information" })
    );
};

//Delete user with specified id
exports.delete = (req, res) => {
  const id = req.params.id;

  Userdb.findByIdAndRemove(id)
    .then((data) => {
      if (!data)
        return res
          .status(400)
          .send({ message: `Cannot find user with id ${id}` });
      return res.send({ message: `User deleted successfully ` });
    })
    .catch((err) => {
      return res
        .status(500)
        .send({ message: `User with id ${id} cannot be deleted` });
    });
};

exports.findById = (req, res) => {
  const id = req.params.id;
  console.log(id);
  Userdb.findOne({ _id: id }, (err, data) => {
    if (err) return res.status(500).send({ message: err.message });
    return res.send(data);
  }).catch((err) =>
    res.status(500).send({
      message:
        err.message || `Error while trying to retrieve user with id: ${id}`,
    })
  );
};
