import express from 'express';

import routes from './routes';
import swaggerUi from 'swagger-ui-express';
import fs = require('fs');

function createServer() {
  const app = express();
  const swaggerFile: any = process.cwd() + '/swagger.json';
  const swaggerData: any = fs.readFileSync(swaggerFile, 'utf8');
  // const customCss: any = fs.readFileSync(
  //   process.cwd() + '/swagger.css',
  //   'utf8',
  // );
  const swaggerDocument = JSON.parse(swaggerData);
  app.use(express.json());
  app.use(`/api`, routes);

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  return app;
}

export default createServer;
