import { validationResult } from "express-validator";

// render  validation errors for register process these  added in validation_schema

export const register_validate_errors = async (req, res, next) => {
 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.locals.errors = errors.array();
        res.render("register", { errors: errors.array() ,layout: "./layout/auth_layout.ejs", })
        
    } else {
        next()
    }

}

// render  validation errors for login process these  added in validation_schema
export const login_validate_errors = async (req, res, next) => {
    
   console.log('ali')
    const errors = validationResult(req);
    console.log(errors)
    if (!errors.isEmpty()) {
        res.locals.errors = errors.array();
        res.render("login", { errors: errors.array() ,layout: "./layout/auth_layout.ejs", })

    } else {

        next()
    }

}



