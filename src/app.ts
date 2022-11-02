import createServer from './server';

const app = createServer();

app.listen(3456, async () => {
  console.log('Running on port 3456');
});
