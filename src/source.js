import express from 'express'
const source = express.Router()

import { needauth } from './auth.js'
source.use(needauth)

import { getenv } from './cfenv.js'
const env = getenv()

source.get('/list', async (req, res) => {
    const keys = (await env.data.list()).keys
    const names = keys.map(item => item.name)
    return res.status(200).json(names)
})

export default source
