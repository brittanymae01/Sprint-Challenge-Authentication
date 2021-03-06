/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

// module.exports = (req, res, next) => {
//   res.status(401).json({ you: 'shall not pass!' });
// };

const jwt = require("jsonwebtoken");

const { jwtSecret } = require("../config/serets");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        // the token is not valid
        res.status(401).json({ you: "token not valid" });
      } else {
        req.user = { subject: decodedToken.subject };

        next();
      }
    });
  } else {
    res.status(401).json({ you: "invalid credentials" });
  }
};
