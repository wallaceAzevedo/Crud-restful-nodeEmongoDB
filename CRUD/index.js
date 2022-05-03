// config inicial
const express = require('express')
const app = express()
require('dotenv').config()

// depois do db
const mongoose = require('mongoose')

app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())

// rotas da API 
const nftRoutes = require('./routes/nftRoutes')

app.use('/nft', nftRoutes )

app.get('/', (req, res) => {
  res.json({ message: 'Oi Express!' })
})

const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongoose
  .connect(
  `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.olupf.mongodb.net/bancodaapi?retryWrites=true&w=majority`,
  )
 .then(() => {
  console.log('Conectou ao banco!')
    app.listen(3001)
 })
  .catch((err) => console.log(err))
