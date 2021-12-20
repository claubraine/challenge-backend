import express from 'express'

// authentication settings
import { checkToken } from '../config/safeRoutes';

import mail from '../controllers/mensageria-controller'

const routes = express.Router();

routes.post('/api/v1/mensageria/send', (req, res) => {
  /*
  #swagger.tags = ['Mensageria'] 
  #swagger.description = 'Sending email'

  #swagger.parameters['dados'] = {
    "in": "body",
    "description": "Editar Usuário",
    "required": true,
      "schema": {
        "$ref": "#/definitions/post_mensageria_req"
      }
  } 
  
  #swagger.responses[200] = {                    
    description: "Sucess",
    schema: [{ 
      "status": true,
      "message": "Queued. Thank you.",
      "from": "xxxxx@xxxx.com",
      "email": "yyyyyy@yyyy.com.br",
      "subject": "Subject"
    }]
  }
 
  #swagger.responses[401] = {                    
    description: "validation error",
    schema: { 
      "status": false,
      "message": "validation error",
      "error": "\"from\" is a required field, \"email\" cannot be empty, \"subject\" cannot be empty, \"html\" cannot be empty",
      "params" : {
                  "from": "",
                  "email": "",
                  "subject": "",
                  "html": ""
                }
      }
  }
  #swagger.responses[402] = {                    
    description: "host error",
    schema: { 
      "status": false,
      "message": "host error"
    }
  }
  #swagger.responses[403] = {                    
    description: "key error",
    schema: { 
      "status": false,
      "message": "key error"
    }
  }
     
  */
  mail.sendMail(req, res)
})

routes.post('/api/v1/mensageria/sendbytoken', checkToken, (req, res) => {
  /*
  #swagger.tags = ['Mensageria'] 
  #swagger.description = 'Sending email using token'

  #swagger.security = [{ "Bearer": [] }] 

  #swagger.parameters['dados'] = {
    "in": "body",
    "description": "Editar Usuário",
    "required": true,
      "schema": {
        "$ref": "#/definitions/post_mensageria_req"
      }
  } 
  
  #swagger.responses[200] = {                    
    description: "Sucess",
    schema: [{ 
      "status": true,
      "message": "Queued. Thank you.",
      "from": "xxxxx@xxxx.com",
      "email": "yyyyyy@yyyy.com.br",
      "subject": "Subject"
    }]
  }
 
  #swagger.responses[401] = {                    
    description: "validation error",
    schema: { 
      "status": false,
      "message": "validation error",
      "error": "\"from\" is a required field, \"email\" cannot be empty, \"subject\" cannot be empty, \"html\" cannot be empty",
      "params" : {
                  "from": "",
                  "email": "",
                  "subject": "",
                  "html": ""
                }
      }
  }
  #swagger.responses[402] = {                    
    description: "host error",
    schema: { 
      "status": false,
      "message": "host error"
    }
  }
  #swagger.responses[403] = {                    
    description: "key error",
    schema: { 
      "status": false,
      "message": "key error"
    }
  }
     
  */
  mail.sendMail(req, res)
})


export default routes;