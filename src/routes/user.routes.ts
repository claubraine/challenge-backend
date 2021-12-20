import express from 'express';

const routes = express.Router();

// authentication settings
import { checkToken } from '../config/safeRoutes';

// Table with user information
import UsersController from '../controllers/users-controller';

// login route
routes.post('/api/v1/user/login', (req, res) => {
  /* 
  #swagger.tags = ['Users'] 
  #swagger.description = 'Login'
   
  #swagger.parameters['dados'] = {
        "in": "body",
        "description": "User Login",
        "required": false,
          "schema": {
                "$ref": "#/definitions/post_login_req"
          }
      } 
  
  #swagger.responses[200] = {                    
    description: "Sucess",
    schema: { 
      success: true,
      token : '',
      user: {},
    }
  }  

  #swagger.responses[401] = {                    
    description: "Validation error",
    schema: { 
      success: false,
      msg: "Validation error: ...",
    }
  }  

  #swagger.responses[402] = {                    
    description: "Validation error",
    schema: { 
      success: false,
      msg: 'Wrong credentials or unregistered user'
    }
  }  

  #swagger.responses[403] = {                    
    description: "No password",
    schema: { 
      success: false,
      msg: 'No password'
    }
  }  
  #swagger.responses[404] = {                    
    description: "Wrong credentials or unregistered user",
    schema: { 
      success: false,
      msg: 'Wrong credentials or unregistered user'
    }
  }  


*/

  UsersController.login(req, res);
});

// logou route
routes.post('/api/v1/user/logout', checkToken, (req, res) => {
  /*
  #swagger.tags = ['Users'] 
  #swagger.description = 'Logout'
   
  #swagger.parameters['dados'] = {
        "in": "body",
        "description": "Logout",
        "required": false,
          "schema": {
                "$ref": "#/definitions/post_logout_req"
          }
  } 

  #swagger.responses[200] = {                    
    description: "Wrong credentials or unregistered user",
    schema: { 
      success: true
    }
  }  
  #swagger.responses[401] = {                    
    description: "Token revoked",
    schema: { 
      success: false,          
      msg: 'Token revoked' 
    }
  }  

   
  */
  UsersController.logout(req, res);

});

// route check session
routes.post('/api/v1/user/checkSession', (_req, res) => {
  /*
  #swagger.tags = ['Users'] 
  #swagger.description = 'Check session'
    
    #swagger.parameters['dados'] = {
      "in": "body",
      "description": "check session",
      "required": false,
        "schema": {
              "$ref": "#/definitions/post_checkSession_req"
        }
    } 

  #swagger.responses[200] = {                    
    description: "Success",
    schema: { 
       success: true  
    }
  }  
  */
  UsersController.post_checkSession(_req, res);

});

// route register new User
routes.post('/api/v1/user', (req, res) => {
  
  /*
  #swagger.tags = ['Users'] 
  #swagger.description = 'Register new User'
    
  #swagger.parameters['dados'] = {
        "in": "body",
        "description": "Register new User",
        "required": false,
          "schema": {
                "$ref": "#/definitions/post_user_req"
          }
  }   

  #swagger.responses[200] = {                    
    description: "Sucess",
    schema: { 
      success: true, 
      userID: '5020bf49-96ba-4c84-9b52-442e3b3384e2', 
      msg: 'User registered successfully' 
    }
  }

  #swagger.responses[401] = {                    
    description: "validation error",
    schema: { 
      success: false, 
      msg: 'Validation error: ...' 
    }
  }
  #swagger.responses[402] = {                    
    description: "Email already exists",
    schema: { 
      success: false, 
      msg: 'Email already exists' 
    }
  }
  
  */
  UsersController.post(req, res);
});

// route edit user
routes.put('/api/v1/user/edit', checkToken, (req, res) => {
  /*
  #swagger.tags = ['Users'] 
  #swagger.description = 'Edit user'

  #swagger.security = [{ "Bearer": [] }] 
    
  #swagger.parameters['dados'] = {
    "in": "body",
      "description": "Edit user",
      "required": false,
      "schema": {
        "$ref": "#/definitions/put_user_req"
    }
  }  

  #swagger.responses[200] = {                    
    description: "User updated successfully",
    schema: { 
      success: true,
      msg: 'User updated successfully'
    }
  }


  #swagger.responses[401] = {                    
    description: "Erro",
    schema: { 
      success: false, 
      msg: 'Mistake. Please contact the administrator'
    }
  }

  */

  UsersController.userPut(req, res);
});

// route edit email
routes.put('/api/v1/user/edit/email', checkToken, (req, res) => {
  /*
  #swagger.tags = ['Users'] 
  #swagger.description = 'Edit email'

  #swagger.security = [{ "Bearer": [] }] 
    
  #swagger.parameters['dados'] = {
    "in": "body",
      "description": "Edit email",
      "required": false,
      "schema": {
        "$ref": "#/definitions/put_user_email_req"
    }
  }  


  #swagger.responses[200] = {                 
    success: true,
    msg: 'Email successfully edited'
  } 
  #swagger.responses[401] = {                 
    success: false, 
    msg: 'Mistake. Please contact the administrator'
  } 
  */

  UsersController.userEmailPut(req, res);
});

// route edit password
routes.put('/api/v1/user/edit/senha', checkToken, (req, res) => {
  /*
  #swagger.tags = ['Users'] 
  #swagger.description = 'Editar Usuário'

  #swagger.security = [{ "Bearer": [] }] 
    
  #swagger.parameters['dados'] = {
    "in": "body",
      "description": "Editar Usuário",
      "required": false,
      "schema": {
        "$ref": "#/definitions/put_user_senha_req"
    }
  }  

  #swagger.responses[200] = {                    
    description: "User updated successfully",
    schema: { 
      success: true,
      msg: 'Password updated successfully'
    }
  }

  #swagger.responses[401] = {                    
    description: "User updated successfully",
    schema: { 
      success: true,
      msg: 'Erro ao atualizar senha'
    }
  }

  */

  UsersController.userSenhaPut(req, res);
});

// route delete user
routes.delete('/api/v1/user/delete', checkToken, (_req, res) => {
  /*
  #swagger.tags = ['Users'] 
  #swagger.description = 'Delete user'

  #swagger.security = [{ "Bearer": [] }] 

  #swagger.parameters['dados'] = {
        "in": "body",
        "description": "Delete user",
        "required": false,
          "schema": {
            "$ref": "#/definitions/delete_user_req"
          }
      }   
  #swagger.responses[200] = {                    
    description: "Record deleted successfully",
    schema: { 
        success: true, 
        msg: 'Sucess' 
    }
  }

  */
  res.status(200).json({ success: true, msg: 'Sucesso' });
});

// route list all users
routes.post('/api/v1/user/all', (_req, res) => {
  /*  
  
  #swagger.tags = ['Users'] 
  #swagger.description = 'List all users'

    #swagger.responses[200] = {                    
    description: "Sucess",
    schema: { 
      "success": true,
      "users": [
        {
          "id": "5020bf49-96ba-4c84-9b52-442e3b3384e2",
          "username": "teste",
          "email": "claubraine@yahoo.com.br",
          "status": true,
          "confirmacao_registro": false,
          "confirmacao_token": "2b10QedOmhW9BmM4MggHM4mRvhUgQsmNrbVmri1FXF3YsF5M0Oljpu",
          "user_token": "2b10QedOmhW9BmM4MggHM4mR1q1MCREaBbktnQnbVtTzTCuFVZYYmO",
          "key": "11111",
          "host": "88888",
          "date": "2021-12-20"
        }
      ]
    }
  }
  
  */

  UsersController.all(_req, res);
});

// route find all users
routes.post('/api/v1/user/search', (req, res) => {
  /*  
  
  #swagger.tags = ['Users'] 
  #swagger.description = 'Find all users'

  
  #swagger.parameters['dados'] = {
    "in": "body",
    "description": "Find all users",
    "required": false,
      "schema": {
        "$ref": "#/definitions/post_user_busca_req"
      }
  } 

  #swagger.responses[200] = {                    
    description: "Record deleted successfully",
    schema: { 
        success: true, 
        users: {} 
    }
  }


  */

  UsersController.search(req, res);
});

// lists of the user located by email
routes.post('/api/v1/user/:email', checkToken,(req, res) => {
  /*  
  #swagger.tags = ['Users'] 
  #swagger.description = 'Listar Usuário por Email'

  #swagger.security = [{ "Bearer": [] }] 

  #swagger.responses[200] = {                    
    description: "Record deleted successfully",
    schema: { 
        success: true, 
        users: {} 
    }
  }
  #swagger.responses[401] = {                    
    description: "Record deleted successfully",
    schema: { 
        success: true, 
        users: {} 
    }
  }

  */

  UsersController.get_by_email(req, res);
});

// lists of user located by token
routes.post('/api/v1/user/:userToken', checkToken,(req, res) => {
  /*  
  #swagger.tags = ['Users'] 
  #swagger.description = 'Listar Usuário por Token'

  #swagger.security = [{ "Bearer": [] }] 

  #swagger.responses[200] = {                    
    description: "lists of user",
    schema: { 
        success: true, 
        users: {} 
    }
  }
  #swagger.responses[401] = {                    
    description: "no records found",
    schema: { 
      success: false,
      mensage: 'no records found'
    }
  }
  */

  UsersController.get_by_userToken(req, res);
});
 
// lists of users located by id
routes.post('/api/v1/user/:userID', checkToken,(req, res) => {
  /*  
  
  #swagger.tags = ['Users'] 
  
  #swagger.description = 'Listar Usuário por ID'

  #swagger.security = [{ "Bearer": [] }] 

  #swagger.responses[200] = {                    
    description: "lists of user",
    schema: { 
        success: true, 
        users: {} 
    }
  }
  #swagger.responses[401] = {                    
    description: "no records found",
    schema: { 
      success: false,
      mensage: 'no records found'
    }
  }
  */

  UsersController.get_by_id(req, res);
});



export default routes;
