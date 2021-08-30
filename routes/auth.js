/** Auth-related routes. */

const User = require('../models/user');
const express = require('express');
const router = express.Router();
const createTokenForUser = require('../helpers/createToken');


/** Register user; return token.
 *
 *  Accepts {username, first_name, last_name, email, phone, password}.
 *
 *  Returns {token: jwt-token-string}.
 *
 *  If incorrect username/password given, should raise 401.
 *
 */

router.post('/register', async function (req, res, next) {
  try {
    const { username, password, first_name, last_name, email, phone } = req.body;

    // Bug fix #1 provide optional admin property
    let admin = req.body.admin
    if (admin === undefined) admin = false;
    let user = await User.register({ username, password, first_name, last_name, email, phone, admin });
    const token = createTokenForUser(username, user.admin);
    return res.status(201).json({ token });
  } catch (err) {
    return next(err);
  }
}); // end

/** Log in user; return token.
 *
 *  Accepts {username, password}.
 *
 *  Returns {token: jwt-token-string}.
 *
 *  If incorrect username/password given, should raise 401.
 *
 */

router.post('/login', async function (req, res, next) {
  try {
    const { username, password } = req.body;
    //Bug #2 - The authenticate method call was not being awaited
    let user = await User.authenticate(username, password);
    const token = createTokenForUser(username, user.admin);
    return res.json({ token });
  } catch (err) {
    return next(err);
  }
}); // end

module.exports = router;
