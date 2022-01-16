import * as express from "express";
import { register, login, allUser, showRegisterForm, showLoginForm, logout } from "../controllers/auth_controller";
import { authMiddleware } from "../middleware/authMiddleware";
import { validateLogin, validateNewUser} from "../validation_schema/validation.schema";
import {  login_validate_errors, register_validate_errors } from "../middleware/validationMiddleware";


const router = express.Router();

router.get("/", (req, res) => {
    res.redirect('/login')
})

router.get("/register", showRegisterForm);
router.post("/register", validateNewUser(), register_validate_errors, register);

router.get("/login", showLoginForm);

router.post("/login",validateLogin(),login_validate_errors,login,authMiddleware);  

router.post("/logout", logout);

router.get("/dashboard", allUser);


export default router;


