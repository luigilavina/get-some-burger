require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const User = require('./models/User')

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


// LOGIN

// Registra Usuário
app.post('/register', async (req, res) => {
  try {
    const {name, email, password} = req.body

    const userExists = await User.findOne({email})

    if(userExists){
      return res.status(400).json({message: 'Email já cadastrado'})
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'user'
    })

    res.status(201).json({
      message: 'Usuário cadastrado com sucesso',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })
  } catch (error) {
    res.status(500).json({error: error.message})
  }
})

// Login Usuário
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return res.status(400).json({ message: 'Senha incorreta' })
    }

    res.status(200).json({
      message: 'Login realizado com sucesso',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})