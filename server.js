require('dotenv').config()
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient
const app = express()
const http = require('http')
const SerialPort = require('serialport')
const Readline = SerialPort.parsers.Readline
const port = new SerialPort('COM10')
const parser = port.pipe(new Readline({ delimiter: '\r\n' }))

const dbuser = process.env.DBUSER
const dbpassword = process.env.DBPASSWORD
const url = `mongodb://${dbuser}:${dbpassword}@ds151463.mlab.com:51463/rfid`

app.use(express.static(path.join(__dirname, 'client/build')))

app
  .use(bodyParser.urlencoded({ extended: true, limit: '50mb', parameterLimit: 50000 }))
  .use(bodyParser.json({ limit: '50mb' }))
  .use(cors())

const server = http.createServer(app)

const runServer = async () => {
  try {
    const client = await MongoClient.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })
    const db = await client.db('rfid')

    app.get('/', function (req, res) {
      res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
    })

    app.route('/getMembers').get(async (req, res) => {
      const results = await db
        .collection('members')
        .find()
        .toArray()
      await res.send(results)
    })

    app.route('/addMember').post(async (req, res) => {
      const result = await db
        .collection('members')
        .insertOne(req.body)
      await res.send(result)
    })

    app.route('/deleteMember').delete(async (req, res) => {
      const result = await db
        .collection('members')
        .deleteOne(req.body)
      await res.send(result)
    })

    app.route('/editMember').put(async (req, res) => {
      const result = await db
        .collection('members')
        .updateOne({ _id: req.body._id },
          {
            $set: {
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              rfidSerial: req.body.rfidSerial
            }
          })
      await res.send(result)
    })

    app.route('/getLogs').get(async (req, res) => {
      const results = await db
        .collection('logs')
        .find()
        .toArray()
      await res.send(results)
    })

    app.route('/resetLogs').delete(async (req, res) => {
      await db
        .collection('logs')
        .deleteMany({})
    })

    parser.on('data', async (rfid) => {
      const formatedRfid = rfid.split(' ').join('')
      const memberResults = await db
        .collection('members')
        .find({ rfidSerial: formatedRfid })
        .toArray()
      const date = new Date().toDateString()
      const time = new Date().toTimeString()
      if (memberResults.length === 1) {
        const { firstName, lastName, src } = memberResults[0]
        await db
          .collection('logs')
          .insertOne({
            key: formatedRfid,
            firstName,
            lastName,
            rfidSerial: formatedRfid,
            date,
            time,
            status: 'MATCH',
            src
          })
      } else {
        await db
          .collection('logs')
          .insertOne({
            key: formatedRfid,
            firstName: 'N/A',
            lastName: 'N/A',
            rfidSerial: formatedRfid,
            date,
            time,
            status: 'NO-MATCH',
            src: null
          })
      }
    })

    server.listen(process.env.PORT || 3002, () => {
      console.log('Listening to server on http://localhost:3002')
    })
  } catch (error) {
    console.log('Error', error.message)
  }
}

runServer()
