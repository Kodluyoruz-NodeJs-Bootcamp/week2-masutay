import { validationResult } from "express-validator";

export const register_validate_errors = async (req, res, next) => {
   
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.locals.errors = errors.array();
        res.render("register", { errors: errors.array() ,layout: "./layout/auth_layout.ejs", })

        
    } else {
        
        next()
    }

}



