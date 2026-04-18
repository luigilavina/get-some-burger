
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