const API_URL = 'http://localhost:3000/products'

const user = JSON.parse(localStorage.getItem('user'))

if (!user || user.role !== 'admin') {
  alert('Acesso negado')
  window.location.href = './login.html'
}

const productForm = document.getElementById('productForm')
const productsList = document.getElementById('productsList')
const btnCancelEdit = document.getElementById('btnCancelEdit')
const btnLogout = document.getElementById('btnLogout')

const productIdInput = document.getElementById('productId')
const nameInput = document.getElementById('name')
const priceInput = document.getElementById('price')
const categoryInput = document.getElementById('category')
const imageInput = document.getElementById('image')
const descriptionInput = document.getElementById('description')

async function loadProducts() {
  try {
    const response = await fetch(API_URL)
    const products = await response.json()

    productsList.innerHTML = ''

    products.forEach(product => {
      const card = document.createElement('div')
      card.classList.add('product-admin-card')

      card.innerHTML = `
        <img src="./imagens/${product.image || 'Logo.png'}" alt="${product.name}">
        
        <div class="product-info">
          <h3>${product.name}</h3>
          <p>${product.description || 'Sem descrição'}</p>
          <strong>R$ ${product.price}</strong>
          <p>Categoria: ${product.category}</p>
        </div>

        <div class="product-actions">
          <button class="btn-edit">Editar</button>
          <button class="btn-delete">Deletar</button>
        </div>
      `

      const btnEdit = card.querySelector('.btn-edit')
      const btnDelete = card.querySelector('.btn-delete')

      btnEdit.addEventListener('click', () => {
        productIdInput.value = product._id
        nameInput.value = product.name
        priceInput.value = product.price
        categoryInput.value = product.category
        imageInput.value = product.image || ''
        descriptionInput.value = product.description || ''

        btnCancelEdit.style.display = 'block'
      })

      btnDelete.addEventListener('click', async () => {
        const confirmDelete = confirm(`Deseja deletar ${product.name}?`)

        if (!confirmDelete) return

        await fetch(`${API_URL}/${product._id}`, {
          method: 'DELETE'
        })

        loadProducts()
      })

      productsList.appendChild(card)
    })
  } catch (error) {
    console.error('Erro ao carregar produtos:', error)
  }
}

productForm.addEventListener('submit', async (event) => {
  event.preventDefault()

  const product = {
    name: nameInput.value,
    price: Number(priceInput.value),
    category: categoryInput.value,
    image: imageInput.value,
    description: descriptionInput.value
  }

  const productId = productIdInput.value

  if (productId) {
    await fetch(`${API_URL}/${productId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    })
  } else {
    await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    })
  }

  productForm.reset()
  productIdInput.value = ''
  btnCancelEdit.style.display = 'none'

  loadProducts()
})

btnCancelEdit.addEventListener('click', () => {
  productForm.reset()
  productIdInput.value = ''
  btnCancelEdit.style.display = 'none'
})

btnLogout.addEventListener('click', () => {
  localStorage.removeItem('user')
  window.location.href = './login.html'
})

loadProducts()