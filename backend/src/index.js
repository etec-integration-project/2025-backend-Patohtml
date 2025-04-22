import express from 'express'
import cors from 'cors'
import miiboRoutes from './route/miibo.routes.js'
import indexRoutes from './route/index.routes.js'
import userRoutes from './route/user.routes.js'

const app = express()

app.use(cors())

app.use(express.json())

app.use('/shop', miiboRoutes)
app.use(indexRoutes)
app.use(userRoutes)

app.listen(3001)
console.log('Server on port 3001')