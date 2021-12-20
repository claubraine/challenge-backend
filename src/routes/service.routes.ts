import express from 'express';

const routes = express.Router();

routes.get('/', (_, res) => {
  //  #swagger.tags = ['Service'] 
  //  #swagger.description = 'TESTE - API - Serviço de Integração'
  console.log('SUCESSO - API - Serviço de Integração')
  res.send('SUCESSO - API - Serviço de Integração')
  /* #swagger.responses[200] = {                 
          description: "SUCESSO - API - Serviço de Integração" } */
})

export default routes;