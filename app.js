import express from 'express';
import { router as stream } from './stream.js';

const app = express();
const port = 3000;

// app.post('/reservation/{userId}', (req, res) => {
//   res.send()
//   console.log('reservation has been MADE');
// })

// app.post('/removeReservation/{userId}', (req, res) => {
//   res.send()
//   console.log('reservation has been REMOVED');
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.use('/stream', stream);
