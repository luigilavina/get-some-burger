// Login
const loginForm = document.getElementById('loginForm')

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault()

    const email = document.getElementById('email').value
    const password = document.getElementById('senha').value

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                email,
                password
            })
        })

        const data = await response.json()

        if(response.ok){
            //salva usuário logado
            localStorage.setItem('user', JSON.stringify(data.user))

            //verifica se é admin
            if(data.user.role === 'admin'){
                window.location.href = './admin.html'
            }else{
                window.location.href = './index.html'
            }
        } else{
            alert(data.message)
        }
    } catch (error) {
        console.error(error)
    }
})