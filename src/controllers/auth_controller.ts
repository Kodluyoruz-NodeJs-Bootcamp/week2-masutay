import { getRepository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User } from '../entity/User';

export const register = async (req, res) => {

  const { firstName, lastName, userName, email, password } = req.body;

  // assign the entity to variable
  const userRepository = getRepository(User);

  // SELECT * FROM users WHERE userName = req.body 
  const existingUserName = await userRepository.findOne({ userName });
  const existingUserMail = await userRepository.findOne({ email });

  try {

    if (!existingUserMail && !existingUserName) {
      //generate salt before hash for user
      const salt = await bcrypt.genSalt()
      // assign that generated hash to hashPassword
      const hashPassword = await bcrypt.hash(password, salt);
      // create new user 

      const user = await userRepository.create({
        firstName,
        lastName,
        userName,
        email: email.toLowerCase(),
        password: hashPassword
      })

      //save user to DB
      await userRepository.save(user);

      res.redirect('/login')

    } else if (existingUserName || existingUserMail) {
      return res.status(400).json({
        message: "The UserName or mail already taken"
      });
    }

  } catch {
    res.status(500).send();
  }

};

export const login = async (req, res) => {

  const { userName, password } = req.body;

  // assign the entity to variable
  const userRepository = getRepository(User);

  // check the user whether exist 
  const user = await userRepository.findOne({ userName });

  if (!user) return res.status(401).send('User not found')
  //req.session.userID = user.id;

  try {

    // Validate user input
    if (user == null || password == null) {
      return res.status(400).send({ message: "Please check your information to login" })

      // check password whether valid
    } else if (userName == user.userName && await bcrypt.compare(password, user.password)) {

      //create jwt token
      const token = jwt.sign({
        user_id: user.id,
        userName: user.userName,
        userID: user.id,
        userAgent: req.headers['user-agent']
      },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "5m",
        }
      )

      res.cookie("token", token, { httpOnly: true });

      // session cookie
      req.session.userID = user.id;
      req.session.userAgent = req.headers['user-agent']

      res.redirect('/dashboard')

    } else return res.status(400).json({ message: "Invalid email or password. Please Login!" })

  } catch {

    res.status(500).send();
  }

}

export const allUser = async (req, res, next) => {

  const userRepository = getRepository(User);
  const users = await userRepository.find()

  res.render("index", { users: users, layout: "./layout/dataTable_layout.ejs" })

}

export const showLoginForm = (req, res, next) => {

  res.render("login", { layout: "./layout/auth_layout.ejs" })
}

export const showRegisterForm = (req, res, next) => {

  res.render("register", { layout: "./layout/auth_layout.ejs" })
}

export const logout = (req, res) => {
  //cookies clear
  res.cookie("token", "", { maxAge: 1 });
  res.redirect("/login");
};

