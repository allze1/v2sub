import express from 'express'
const app = express()

app.enable('trust proxy')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
    let realhost = req.headers['x-forwarded-host']
    if (typeof realhost !== 'string') realhost = req.host
    else realhost = realhost.split(',')[0].trim()
    req.headers.host = realhost
    return next()
})

import cookieParser from 'cookie-parser'
app.use(cookieParser())

const api = express.Router()
app.use('/api', api)

import { getenv } from './cfenv.js'
const env = getenv()

api.get('/ping', (req, res) => {
    console.log('worker env will be here:', env)
    return res.status(200).send('pong')
})

import { createServer, get } from 'node:http'
import { httpServerHandler } from 'cloudflare:node'
const server = createServer(app)
export default httpServerHandler(server)
