import * as express from "express";
import { register, login, allUser, showRegisterForm, showLoginForm, logout } from "../controllers/auth_controller";
import { authMiddleware } from "../middleware/authMiddleware";
import { validateNewUser} from "../validation_schema/validation.schema";
import {  register_validate_errors } from "../middleware/validationMiddleware";


const router = express.Router();

router.get("/register", showRegisterForm);
router.post("/register", validateNewUser(), register_validate_errors, register);
router.get("/", (req, res) => {
    res.redirect('/login')
})
router.get("/login", showLoginForm);

router.post("/login",login,authMiddleware);  

router.post("/logout", logout);

router.get("/dashboard", allUser);


export default router;


