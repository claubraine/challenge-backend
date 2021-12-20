// Library for data validation
import Joi from 'joi'

// Database connection
import { connection } from '../server/database_postgresql_conf';

// Table with user information
import User from '../models/postgresql/user';

// Library sending e-mail
import nodemailer from 'nodemailer'
import mailGun from 'nodemailer-mailgun-transport'
import { SentMessageInfo } from 'nodemailer/lib/smtp-transport'

// API parameters sending email
const auth = {
    auth: {
        api_key: process.env.API_KEY || 'MAIL_GUN_API_KEY', // TODO: Replace with your mailgun API KEY
        domain: process.env.DOMAIN || 'MAIL_GUN_DOMAIN' // TODO: Replace with your mailgun DOMAIN
    }
}
// configure parameters
const transporter = nodemailer.createTransport(mailGun(auth));

// schema options
const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true // remove unknown props
}

// Check mandatory parameters
const sendMailSchema = Joi.object().keys({
    from: Joi.string().email().required().messages({
        'string.email': `{{#label}} is not a valid value`,
        'string.empty': `{{#label}} is a required field`
    }),
    email: Joi.string().required().messages({
        'string.empty': `{{#label}} cannot be empty`,
        'any.required': `{{#label}} is a required field`
    }),
    subject: Joi.string().required().messages({
        'string.empty': `{{#label}} cannot be empty`,
        'any.required': `{{#label}} is a required field`
    }),
    html: Joi.string().required().messages({
        'string.empty': `{{#label}} cannot be empty`,
        'any.required': `{{#label}} is a required field`
    }),
    key: Joi.string().required().messages({
        'string.empty': `{{#label}} cannot be empty`,
        'any.required': `{{#label}} is a required field`
    }),
})

// Email sending method
const sendMail = async (req: any, res: any) => {

    // Home test block in development
    // Should be erased when going to production
    let host_test = false

    var array = req.rawHeaders;
    var elemento = 'Postman-Token';
    var idx = array.indexOf(elemento);

    if (idx >= 0) {
        // If you find it, it will be a positive value.
        host_test = true
    }
 
    var elemento = 'http://localhost:'+ process.env.PORT +'/api/doc/';
    var idx = array.indexOf(elemento);

    if (idx >= 0) {
        // If you find it, it will be a positive value.
        host_test = true
    }
    //End block for testing locally in development



    const ip = require("ip")

    // Captura host origem 
    const host = req.headers.referer

    console.log('Request URL:', req.originalUrl)
    console.log('IP:', ip.address());
    console.log('Request Type:', req.method)
    console.log('body:', req.body)
    console.log('params:', req.params)
    console.log('host:', req.headers.referer)

    // Load sent parameters 
    const { key, from, email, subject, html } = req.body

    // Store mandatory parameters
    const validation = {
        from: from,
        email: email,
        subject: subject,
        html: html,
        key: key
    }

    // Check parameters
    const { error } = sendMailSchema.validate(validation, options)

    if (error) {
        // If you have any error in the parameters
        res.status(401).json({
            status: false,
            message: `validation error`,
            error: `${error.details.map(x => x.message).join(', ')}`,
            params: validation
        })
    } else {

        const userRepository = connection!.getRepository(User)

        // Find record that has registered key
        userRepository.findOne({ key: key }).then((async (user) => {

            // each find a record
            if (user) {
                // Checks if the host orihem is the same as the one allowed for the record
                if ((user.host == host) || (host == 'http://localhost:5000/api/doc/') || (host_test == true)) {

                    // If it's a comma-separated list of emails, it turns it into an array
                    const list_emails = email.split(',')

                    // Initialized shipment status array
                    let status_send: { status: boolean; data: SentMessageInfo; }[] = []

                    // Scroll through the email list to send an individual
                    for await (let aux of list_emails) {

                        // load shipping information
                        const mailOptions = {
                            from: from, // email you are sending
                            to: aux, // email I'm receiving
                            subject, // subject matter 
                            html // content 
                        }
                        // call send function to send, and load the result
                        const result: any = await send(mailOptions)

                        // load the results into satatus_send
                        status_send.push(result)
                    }

                    // after scrolling through the email list returns the results
                    res.status(200).json(
                        status_send
                    )
                } else {
                    // return on source host error
                    res.status(402).json({
                        status: false,
                        message: `host error`
                    })
                }
            } else {
                // return in case of key error
                res.status(403).json({
                    status: false,
                    message: `key error`
                })
            }
        }))
    }
}

// function to send individual emails
async function send(dados: any) {
    // return of a promise
    return new Promise(async resolve => {
        // I send emails
        transporter.sendMail(dados, function (err: any, data: any) {
            if (err) {
                // in case of error in sending
                resolve({
                    status: false,
                    message: err.message,
                    error: err.details,
                    from: dados.from,
                    email: dados.to,
                    subject: dados.subject
                });
            } else {
                // on successful submission
                resolve({
                    status: true,
                    message: data.message,
                    from: dados.from,
                    email: dados.to,
                    subject: dados.subject
                });
            }
        })
    })
}

export default { sendMail }
