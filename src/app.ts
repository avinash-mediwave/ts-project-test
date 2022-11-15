import createServer from './server';

const app = createServer();

app.listen(process.env.PORT, async () => {
  console.log(`Running on port ${process.env.PORT}`);
});
