import express from "express";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();
const PORT = 3000;

app.use(express.static(__dirname + "/dist"));

app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html');
})

app.listen(PORT, () => {
    console.log(`Chat app is running on port ${PORT}.`);
});

