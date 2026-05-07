require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

// middlewares
app.use(cors())
app.use(express.json())

// Conexão com banco
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB conectado !')
  } catch (error) {
    console.error('Erro ao conectar no MongoDB:', error.message)
  }
}

// rota teste
app.get('/', (req, res) => {
  res.send('API rodando')
})

// inicia servidor
const startServer = async () => {
  await connectDB()

  app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`)
  })
}

startServer()

const Product = require('./models/Product')

// Criar produto
app.post('/products', async (req, res) => {
  try {
    const product = await Product.create(req.body)

    res.status(201).json(product)
  } catch (error) {
    res.status(500).json({error: error.message})
  }
})

// lista de produtos
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find()

    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Deletar produto 
app.delete('/products/:id', async (req, res) => {
  try {
    const id = req.params.id

    const product = await Product.findByIdAndDelete(id)

    if(!product){
      return res.status(404).json({message: 'Produto não encontrado'})
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Atualiza produto
app.patch('/products/:id', async (req, res) => {
  try {
    const id = req.params.id

    const product = await Product.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    )

    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' })
    }

    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})