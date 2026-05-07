const cadastroForm = document.getElementById('cadastroForm')

cadastroForm.addEventListener('submit', async (event) => {
  event.preventDefault()

  const name = document.getElementById('registerName').value
  const email = document.getElementById('registerEmail').value
  const password = document.getElementById('registerPassword').value

  try {
    const response = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    })

    const data = await response.json()

    alert(data.message)

    if (response.ok) {
      window.location.href = './login.html'
    }
  } catch (error) {
    console.error('Erro ao cadastrar:', error)
  }
})