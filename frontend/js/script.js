
// Carrossel
const imagens = [
  'imagens/carrossel1.png',
  'imagens/carrossel2.png',
  'imagens/carrossel3.png',
];

let indice = 0;

const imagemCarrossel = document.getElementById('imagemCarrossel');
const btnProximo = document.getElementById('btnProximo');
const btnVolta = document.getElementById('btnVolta');

function atualizarImagem() {
  imagemCarrossel.src = imagens[indice];
  setTimeout(() => {
    imagemCarrossel.src = imagens[indice];
    imagemCarrossel.style.opacity = 1;
  }, 300);
}

btnProximo.addEventListener('click', () => {
  indice = (indice + 1) % imagens.length;
  atualizarImagem();
});

btnVolta.addEventListener('click', () => {
  indice = (indice - 1 + imagens.length) % imagens.length;
  atualizarImagem();
});

setInterval(() => {
  indice = (indice + 1) % imagens.length;
  atualizarImagem();
}, 5000);

// Menu backend MongoDB

const categorias = document.querySelectorAll('.categoria')
const areaItens = document.getElementById('area-itens')

let produtos = []

async function carregarProdutos() {
  try {
    const resposta = await fetch('http://localhost:3000/products')
    produtos = await resposta.json()

    console.log(produtos)
  } catch (error) {
    console.error('Erro ao buscar produtos:', error)
  }
}

function mostrarItens(categoriaSelecionada) {
  areaItens.innerHTML = ''

  const produtosFiltrados = produtos.filter(
    produto => produto.category === categoriaSelecionada
  )

  produtosFiltrados.forEach(produto => {
    const div = document.createElement('div')

    div.classList.add('item-card')

    div.innerHTML = `
    <img src="./imagens/${produto.image}" alt="${produto.name}">
    <h3>${produto.name}</h3>
    <p>${produto.description || ''}</p>
    <strong>R$ ${produto.price}</strong>
  `

    areaItens.appendChild(div)
  })
}

categorias.forEach(categoria => {
  categoria.addEventListener('click', () => {
    const categoriaSelecionada = categoria.dataset.categoria
    mostrarItens(categoriaSelecionada)
  })
})

carregarProdutos()