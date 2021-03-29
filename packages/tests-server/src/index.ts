import {delay} from '@do-while-for-each/common'
import * as bodyParser from 'body-parser'
import * as express from 'express'
import * as path from 'path'
import * as cors from 'cors'
import * as fs from 'fs'

const STATIC_DIR = path.resolve('../browsers-checks/build')

const port = 2020
const textParser = bodyParser.text()

const app = express()
app.use(cors({credentials: true, origin: true}))
app.use(express.static(STATIC_DIR))

app.get('/', (req, res) => {
  const body = fs.readFileSync(path.join(STATIC_DIR, 'index.html'))
  res.send(body)
})

app.post('/long-answer', textParser, async (req, res) => {
  await delay(3000)
  res.send(req.body)
})

app.listen(port, () => {
  console.log(`server run http://localhost:${port}`)
})
