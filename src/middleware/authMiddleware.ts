import * as jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  try {

    const token = req.cookies.token;

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
      if (decoded.userID) {
        if (decoded.userAgent === req.headers['user-agent'] && req.session.userAgent === req.headers['user-agent']) {
          console.log(decoded.userAgent)
          console.log(req.headers['user-agent'])
          console.log(req.session.userAgent)
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