const jwt = require("jsonwebtoken");

/**
 * Checks if the user is authenticated via token
 * verifies that the decoded token is the same as the plaintext token
 *
 * @param req
 * @param res
 * @param next
 * @param {string} email
 * @param {string} userId
 * @param {string} token
 */
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "highly_secret_tokenpart_that_has_an_acceptable_length_greetings_if_you_see_this"); // maybe make this even longer
    req.userData = {email: decodedToken.email, userId: decodedToken.userId };
    next();
  } catch (error) {
    res.status(401).json({ message: "Auth failed!" });
  }
};
