// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');
// const dotnev = require('dotenv');
// dotnev.config();

const app = express();
const PORT = /*process.env.PORT ||*/ 3000;

app.use(express.static(`${__dirname}/dist`));

app.get('/*', (req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`);
});

app.listen(PORT, () => {
  console.log(`Chat app is running on port ${PORT}.`);
});
