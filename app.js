import express from 'express';
import { router as stream } from './stream.js';

const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

app.use('/stream', stream);
