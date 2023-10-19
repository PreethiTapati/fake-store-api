import User from '../models/user.js';
import validateEmail from '../utils/validateEmail.js';
import validatePassword from '../utils/validatePassword.js';

const userController = {
    main: (req, res) => {
        res.status(200).render('form', {
            action: '/sign-up',
            button: 'Sign up'
        });
    },

    signUp: (req, res) => {
        const { email, password } = req.body;
        const emailExist = User.getUserByEmail(email);
        if (!emailExist) {
            const isValidateEmail = validateEmail(email);
            const isValidatePassword = validatePassword(password);

            if (isValidateEmail && isValidatePassword) {
                const user = new User(email, password);
                user.addUser();

                res.status(201).redirect('/api/home');
            } else {
                res.status(409).render('message', {
                    title: 'Not Valid',
                    message: 'Email or Password is not valid'
                });
                rd;
            }
        } else {
            res.status(409).render('message', {
                title: 'Email already exists',
                message: 'The email already taken'
            });
        }
    },

    signIn: (req, res) => {
        const { email, password } = req.body;
        const emailExist = User.getUserByEmail(email);

        if (!emailExist) {
            res.status(401).render('message', {
                title: 'No Valid account',
                message: 'the account is not valid'
            });
        } else {
            if (emailExist.password === password) {
                res.status(200).redirect('/api/home');
            } else
                res.status(409).render('message', {
                    title: '/log in failed',
                    message: 'email or password is not valid'
                });
        }
    }
};

export default userController;
