import { Request, Response } from 'express';

// library to encrypt
import bcrypt from 'bcrypt';

// Library for data validation
import Joi from 'joi';

// Library JSON Web Token
import jwt from 'jsonwebtoken';

// Database connection
import { connection } from '../server/database_postgresql_conf';

// Table with ActiveSession information
import ActiveSession from '../models/postgresql/activeSession';
// Table with user information
import User from '../models/postgresql/user';

// Check mandatory parameters
const userTokenSchema = Joi.object().keys({
    userToken: Joi.string().required().messages({
        'string.empty': `{{#label}} is a required field`
    }),
});

const userEmailSchema = Joi.object().keys({
    userToken: Joi.string().required().messages({
        'string.empty': `{{#label}} is a required field`
    }),
    email: Joi.string().email().required().messages({
        'string.email': `{{#label}} is not a valid value`,
        'string.empty': `{{#label}} is a required field`
    }),
});

const userSenhaSchema = Joi.object().keys({
    userToken: Joi.string().required().messages({
        'string.empty': `{{#label}} is a required field`
    }),
    password: Joi.string().min(4).required().messages({
        'string.empty': `{{#label}} is a required field`,
        'string.min': '{{#label}} length must be at least {{#limit}} characters at least',
    }),
});

const userLoginSchema = Joi.object().keys({
    email: Joi.string().email().required().messages({
        'string.email': `{{#label}} is not a valid value`,
        'string.empty': `{{#label}} is a required field`
    }),
    password: Joi.string().min(4).required().messages({
        'string.empty': `{{#label}} is a required field`,
        'string.min': '{{#label}} length must be at least {{#limit}} characters at least',
    }),
});



const login = async (req: Request, res: Response) => {

    const result = userLoginSchema.validate(req.body);

    if (result.error) {
        res.status(401).json({
            success: false,
            msg: `Validation error: ${result.error.details[0].message}`,
        });
        return;
    } else {

        const { email, password } = req.body;

        const userRepository = connection!.getRepository(User);

        userRepository.findOne({ email }).then((user) => {

            if (!user) {
                return res.status(402).json({
                    success: false,
                    msg: 'Wrong credentials or unregistered user'
                });
            }

            if (!user.password) {
                return res.status(403).json({
                    success: false,
                    msg: 'No password'
                });
            }

            bcrypt.compare(password, user.password, (_err2, isMatch) => {
                if (isMatch) {

                    if (!process.env.SECRET) {
                        throw new Error('SECRET not provided');
                    }

                    const token = jwt.sign({
                        id: user.id,
                        username: user.username,
                        email: user.email,
                    }, process.env.SECRET, {
                        expiresIn: 86400, // 1 week
                    });

                    const query = {
                        userId: user.id,
                        token,
                        status: true
                    };

                    const activeSessionRepository = connection!.getRepository(ActiveSession);

                    activeSessionRepository.save(query);

                    // Delete the password (hash)
                    (user as { password: string | undefined }).password = undefined;
                    (user as { confirmacao_token: string | undefined }).confirmacao_token = undefined;
                    (user as { user_token: string | undefined }).user_token = undefined;

                    return res.status(200).json({
                        success: true,
                        token,
                        user,
                    });
                }

                return res.status(404).json({
                    success: false,
                    msg: 'Wrong credentials or unregistered user'
                });
            });
        });
    }

}

const logout = async (req: Request, res: Response) => {

    const { token } = req.body;
    const activeSessionRepository = connection!.getRepository(ActiveSession);

    activeSessionRepository.delete({ token })
        .then(
            () => res.status(200).json({
                success: true
            })
        )
        .catch(() => {
            res.status(401).json({
                success: false,
                msg: 'Token revoked'
            });
        });
}


const post_checkSession = async (_req: Request, res: Response) => {

    res.status(200).json({
        success: true
    });

}

const postSchema = Joi.object().keys({
    username: Joi.string().alphanum().min(4).max(15).optional().messages({
        'string.alphanum': '{{#label}} must contain only alphanumeric characters',
        'string.min': '{{#label}} length must be at least {{#limit}} characters at least',
        'string.max': '{{#label}} comprimento deve ter {{#limit}} caracteres no máximo',
    }),
    email: Joi.string().email().required().messages({
        'string.email': `{{#label}} is not a valid value`,
        'string.empty': `{{#label}} is a required field`
    }),
    password: Joi.string().min(4).required().messages({
        'string.empty': `{{#label}} is a required field`,
        'string.min': '{{#label}} length must be at least {{#limit}} characters at least',
    }),
    key: Joi.string().required().messages({
        'string.empty': `{{#label}} cannot be empty`,
        'any.required': `{{#label}} is a required field`
    }),
    host: Joi.string().required().messages({
        'string.empty': `{{#label}} cannot be empty`,
        'any.required': `{{#label}} is a required field`
    }),
});

const post = async (req: Request, res: Response) => {
    // Joy Validation
    const result = postSchema.validate(req.body);
    if (result.error) {

        res.status(401).json({
            success: false,
            msg: `Validation error: ${result.error.details[0].message}`,
        });
        return;
    }

    const { username, email, password, key, host } = req.body;

    const userRepository = connection!.getRepository(User);

    userRepository.findOne({ email }).then((user) => {
        if (user) {
            res.status(402).json({
                success: false,
                msg: 'Email already exists'
            });
        } else {
            bcrypt.genSalt(10, (_err, salt) => {
                bcrypt.hash(password, salt).then((hash) => {

                    let confirmacao_token = bcrypt.hashSync(Date() + username + email, salt);
                    let user_token = bcrypt.hashSync(email + username + Date(), salt);

                    // Removing special characters to use in confirmation or access link
                    confirmacao_token = confirmacao_token.replace(/[^a-zA-Z0-9]/g, '');
                    user_token = user_token.replace(/[^a-zA-Z0-9]/g, '');

                    const query = {
                        username,
                        email,
                        password: hash,
                        status: true,
                        confirmacao_registro: false,
                        confirmacao_token,
                        user_token: user_token,
                        key,
                        host
                    };

                    userRepository.save(query).then((u) => {
                        res.status(200).json({
                            success: true,
                            userID: u.id,
                            msg: 'User registered successfully'
                        });
                    });
                });
            });
        }
    });

}

const userSenhaPut = async (req: Request, res: Response) => {
    let { userToken, password } = req.body;

    password = password.trim();

    let result = userSenhaSchema.validate({ userToken, password });

    if (result.error) {
        return res.status(401).json({
            success: false,
            msg: `Validation error..: ${result.error.details[0].message}`,
        });
    } else {
        const userRepository = connection!.getRepository(User);

        const query = { user_token: userToken };
        let newvalues = { password };

        bcrypt.genSalt(10, async (_err, salt) => {
            await bcrypt.hash(password, salt).then(async (hash) => {
                newvalues['password'] = hash;

                userRepository.update(query, newvalues).then(() => {
                    res.status(200).json({
                        success: true,
                        msg: 'Password updated successfully'
                    })
                },
                ).catch(() => {
                    return res.status(402).json({
                        success: false,
                        msg: 'Error updating password'
                    });
                });
            })
        })
    }
}

const userEmailPut = async (req: Request, res: Response) => {
    let { userToken, email } = req.body;

    email = email.trim();

    let result = userEmailSchema.validate({ userToken, email });

    if (result.error) {

        return res.status(401).json({
            success: false,
            msg: `Validation error..: ${result.error.details[0].message}`,
        });

    } else {

        const userRepository = connection!.getRepository(User);

        await userRepository.findOne({ email }).then((user) => {

            const query = { user_token: userToken };
            let newvalues = { email };

            if (user) {
                if (user?.user_token != userToken) {
                    return res.status(500).json({
                        success: false,
                        msg: 'Email already used'
                    });
                } else {
                    userRepository.update(query, newvalues).then(() => {
                        res.status(200).json({
                            success: true,
                            msg: 'Email already used'
                        })
                    },
                    ).catch(() => {
                        return res.status(500).json({
                            success: false,
                            msg: 'Error updating user'
                        });
                    });
                }
            } else {
                userRepository.update(query, newvalues).then(() => {
                    res.status(200).json({
                        success: true,
                        msg: 'User updated successfully'
                    })
                },
                ).catch(() => {
                    return res.status(500).json({
                        success: false,
                        msg: 'Error updating user'
                    });
                })
            }
        })
    }
}

const userPut = async (req: Request, res: Response) => {

    let { userToken, username, key, host } = req.body;

    username = username.trim();

    let result = userTokenSchema.validate({ userToken });

    if (result.error) {
        return res.status(401).json({
            success: false,
            msg: `Validation error..: ${result.error.details[0].message}`,
        });
    } else {

        const userRepository = connection!.getRepository(User);

        const query = { user_token: userToken };
        let newvalues = { username, key , host  };

        if (!username) delete newvalues['username'];
        if (!host) delete newvalues['host'];
        if (!key) delete newvalues['key'];

        await userRepository.update(query, newvalues).then(() => {
            res.status(200).json({
                success: true,
                msg: 'User updated successfully'
            })
        },
        ).catch(() => {
            return res.status(402).json({
                success: false,
                msg: 'Error updating user'
            });
        });
    }
}

const get_by_email = async (req: Request, res: Response) => {
    const email = req.params.email;

    console.log('Request URL:', req.originalUrl);
    console.log('Request Type:', req.method);
    console.log('email:', email);

    const userRepository = connection!.getRepository(User);

    userRepository.findOne({ email: email }).then(((user) => {

        if (user) {
            res.status(200).json({
                success: true,
                user: {
                    id: user?.id,
                    username: user?.username,
                    email: user?.email,
                    date: user?.date,
                }
            });
        } else {
            console.log('no records found');
            res.status(401).json({
                success: false,
                mensage: 'no records found'
            });
        }
    }));

}

const get_by_userToken = async (req: Request, res: Response) => {
    const userToken = req.params.userToken;

    console.log('Request URL:', req.originalUrl);
    console.log('Request Type:', req.method);
    console.log('userToken:', userToken);

    const userRepository = connection!.getRepository(User);

    userRepository.findOne({ user_token: userToken }).then(((user) => {

        if (user) {
            res.status(200).json({
                success: true,
                user: {
                    id: user?.id,
                    username: user?.username,
                    email: user?.email,
                    date: user?.date,
                }
            });
        } else {
            console.log('no records found');
            res.status(401).json({
                success: false,
                mensage: 'no records found'
            });
        }
    }));

}

const get_by_id = async (req: Request, res: Response) => {

    const userID = req.params.userID;

    console.log('Request URL:', req.originalUrl);
    console.log('Request Type:', req.method);
    console.log('userID:', userID);

    const userRepository = connection!.getRepository(User);

    userRepository.findOne({ id: userID }).then(((user) => {

        if (user) {
            res.status(200).json({
                success: true,
                user: {
                    id: user?.id,
                    username: user?.username,
                    email: user?.email,
                    date: user?.date,
                }
            });
        } else {
            console.log('no records found');

            res.status(401).json({
                success: false,
                mensage: 'no records found'
            });
        }
    }));

}

const search = async (req: Request, res: Response) => {

    let { userID, username, email } = req.body;

    // Remove blank spaces from the beginning and end of parameter values
    userID = userID.trim();
    username = username.trim();
    email = email.trim();

    // Values ​​to be searched
    let query = { id: userID, username: username, email: email };

    // Remove parameters with null values
    if (!userID) delete query['id'];
    if (!username) delete query['username'];
    if (!email) delete query['email'];

    const userRepository = connection!.getRepository(User);

    await userRepository.find(query).then((users) => {

        if ( users.length === 0 ) {
            // Nehum registro emcontrado
            res.status(401).json({
                success: false,
                mensage: 'No record found'
            })
        } else {
            users = users.map((item) => {
                const x = item;
                // do not return password in answer
                (x as { password: string | undefined }).password = undefined;
                return x;
            });

            res.status(200).json({
                success: true,
                users
            });
        }
       
    }).catch(() => res.json({ success: false }));
};

const all = async (_req: Request, res: Response) => {

    const userRepository = connection!.getRepository(User);

    userRepository.find({}).then((users: any[]) => {

        users = users.map((item) => {
            const x = item;
            (x as { password: string | undefined }).password = undefined;

            return x;
        });

        res.status(200).json({
            success: true,
            users
        });

    }).catch(() => res.json({ success: false }));
};

export default { all, search, get_by_id, get_by_userToken, get_by_email, userPut, userEmailPut, userSenhaPut, post, post_checkSession, logout, login };


