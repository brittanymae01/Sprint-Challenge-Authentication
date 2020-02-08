const router = require("express").Router();
const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

const { jwtSecret } = require("../config/serets");

Users = require("./users-model");

router.post("/register", (req, res) => {
  // implement registration
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;
  Users.add(user)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "problem with registering to the database"
      });
    });
});

router.post("/login", (req, res) => {
  // implement login
  let { username, password } = req.body;
  Users.findBy({ username })
    .first()
    .then(user => {
      if (!user) {
        return res.status(401).json({
          errorMessage: "username does not exist"
        });
      } else {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = signToken(user);

          res.status(200).json({
            message: `Welcome ${user.username}!`,
            token
          });
        }
      }
    })
    .catch(error => {
      console.log(error);
      return res.status(500).json({ errorMessage: "error logging in" });
    });
});

function signToken(user) {
  const payload = {
    subject: user.id
  };

  const options = {
    expiresIn: "1d"
  };

  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
