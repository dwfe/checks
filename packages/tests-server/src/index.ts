import * as express from 'express'
import * as cors from 'cors'
import * as bodyParser from 'body-parser'
import {delayAsync} from './utils/globals';

const app = express()
app.use(cors())
const port = 2020
const textParser = bodyParser.text()

app.post('/long-answer', textParser, async (req, res) => {
  await delayAsync(3000)
  res.send(req.body)
})

app.listen(port, () => {
  console.log(`server run http://localhost:${port}`)
})
