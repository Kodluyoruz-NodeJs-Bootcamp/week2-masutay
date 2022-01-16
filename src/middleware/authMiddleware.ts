import * as jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  
  try {
    // assign the token cookie that added under the cookies that variable name is token
    const token = req.cookies.token;
 //Check if the user is coming from the same browser.
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
      if (decoded.userID) {
        if (decoded.userAgent === req.headers['user-agent'] && req.session.userAgent === req.headers['user-agent']) {
         next()
        } else res.status(401).send({ error: true, message: "this request is on different browser!" })
      } else {
        res.redirect('/login')
      }
    });

  } catch (error) {
    next(error)
  }

}