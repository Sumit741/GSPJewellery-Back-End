const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");
  if (!accessToken) {
    res.json("User not logged in");
  }

  try {
    const validate = verify(accessToken, "secretCode");
    if (validate) {
      req.user = validate; 
      next();
    }
    return validate;
  } catch (err) {
    res.json({ error: err.message });
  }
};

module.exports = { validateToken };
