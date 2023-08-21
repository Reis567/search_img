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
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${apiKey}&per_page=12`;

    try {
        const response = await fetch(url);

        // Verifica se a resposta não foi bem-sucedida
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (page === 1) {
            searchResult.innerHTML = "";
        }

        const results = data.results;

        // Limpa a seção de resultados antes de adicionar novos resultados
        searchResult.innerHTML = "";
        results.forEach((result) => {
            const image = document.createElement("img");
            image.src = result.urls.small;

            const imageLink = document.createElement("a");
            imageLink.href = result.links.html;
            imageLink.target = "_blank";

            imageLink.appendChild(image);

            // Adiciona os elementos de imagem e link à seção de resultados
            searchResult.appendChild(imageLink);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        // Exibe mensagem de erro para o usuário
        searchResult.innerHTML = "An error occurred while fetching data. Please try again later.";
    }
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
