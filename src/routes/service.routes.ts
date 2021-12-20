import express from 'express';

const routes = express.Router();

routes.get('/', (_, res) => {
  //  #swagger.tags = ['Service'] 
  //  #swagger.description = 'Test service'
  console.log('Test service - SUCESS')
  res.send('Test service - SUCESS')
  /* #swagger.responses[200] = {                 
          description: "Test service" } */
})

export default routes;
