const express = require('express')
const stream = require('./stream')

const app = express()
const port = 3000

// app.post('/reservation/{userId}', (req, res) => {
//   res.send()
//   console.log('reservation has been MADE');
// })

// app.post('/removeReservation/{userId}', (req, res) => {
//   res.send()
//   console.log('reservation has been REMOVED');
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use('/stream', stream)