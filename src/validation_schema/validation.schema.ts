import { body } from 'express-validator';

// validation for Register

export const validateNewUser = () => {

    return [
        body('email')
            .trim()
            .isEmail().withMessage('Please insert a valid email address!'),

        body('password')
            .trim()
            .isLength({ min: 6 }).withMessage("Password must be at least 6 characters!!"),

        body('repassword')
            .trim()
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error('Passwords dont match!!')
                }
                return true;
            })
    ]

}

// validation for Login

export const validateLogin = () => {

    return [
        body('userName')
            .trim()
            .isEmpty().withMessage("cant be empty"),
        body('password')
            .trim()
            .isLength({ min: 6 }).withMessage("Password must be at least 6 characters!!"),
    ]

}





