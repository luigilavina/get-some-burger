
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
}

btnProximo.addEventListener('click', () => {
  indice = (indice + 1) % imagens.length;
  atualizarImagem();
});

btnVolta.addEventListener('click', () => {
  indice = (indice - 1 + imagens.length) % imagens.length;
  atualizarImagem();
});


// Menu Fixo

const dados = {
  hamburgers: [
    { nome: "Get Some Classic", preco: 20 },
    { nome: "Get Some Double Meat", preco: 25 }
  ],
  acompanhamentos: [
    { nome: "Batata frita", preco: 15 }
  ],
  sobremesas: [
    { nome: "Milkshake", preco: 18 }
  ],
  bebidas: [
    { nome: "Coca-Cola", preco: 8 }
  ],
  drinks: [
    { nome: "Caipirinha", preco: 22 }
  ]
};

const categoria = document.querySelectorAll('.categoria')
const areaItens = document.getElementById('area-itens')

categoria.forEach(cat =>{
  cat.addEventListener('click', () =>{
    const tipo = cat.dataset.categoria

    mostrarItens(tipo)
  })
}) 

function mostrarItens(tipo){
  areaItens.innerHTML = ''

  dados[tipo].forEach(item =>{
    const div = document.createElement('div')

    div.classList.add('item-card')
    div.textContent = `${item.nome} - R$ ${item.preco}`;

    areaItens.appendChild(div)
  })
}