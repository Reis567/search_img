// Obtendo referências aos elementos HTML usando seus IDs
const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");
const appPurpose = document.getElementById("app-purpose");

// Chave de API para autenticação na API do Unsplash
const apiKey = 'XZUcb-Oxz8laKWkJMOLqO2wVKHleLsxtOpKM5_lH1Bk';

// Variáveis para armazenar a palavra-chave de busca e o número da página atual
let keyword = "";
let page = 1;

// Função assíncrona para buscar e exibir imagens
async function searchImages() {
    // Atualiza a palavra-chave com o valor do campo de busca
    keyword = searchBox.value;
    
    // Monta a URL da API com os parâmetros de busca, página e chave de API
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${apiKey}&per_page=12`;

    // Faz uma requisição à API do Unsplash usando a URL
    const response = await fetch(url);
    // Converte a resposta em formato JSON
    const data = await response.json();

    // Se a página atual for a primeira, limpa a seção de resultados
    if (page === 1) {
        searchResult.innerHTML = "";
    }

    // Exibe os dados da resposta da API no console (para fins de depuração)
    console.log(data);

    // Obtém os resultados da busca da resposta
    const results = data.results;

    // Limpa a seção de resultados antes de adicionar novos resultados
    searchResult.innerHTML = "";
    // Mapeia os resultados e cria elementos de imagem e link para cada um
    results.map((result) => {
        const image = document.createElement("img");
        image.src = result.urls.small;

        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";

        imageLink.appendChild(image);

        // Adiciona os elementos de imagem e link à seção de resultados
        searchResult.appendChild(imageLink);
    });
}

// Define um ouvinte para o evento de envio do formulário de busca
searchForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Impede o comportamento padrão do formulário
    page = 1; // Reinicia a página para 1 ao enviar o formulário
    searchImages(); // Chama a função de busca e exibição de imagens
});

// Define um ouvinte para o evento de clique no botão "Mostrar Mais"
showMoreBtn.addEventListener("click", () => {
    page++; // Incrementa o número da página
    searchImages(); // Chama a função de busca e exibição de imagens novamente
});
