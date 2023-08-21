const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

const apiKey = 'XZUcb-Oxz8laKWkJMOLqO2wVKHleLsxtOpKM5_lH1Bk';
let keyword = "";
let page = 1;

async function searchImages() {
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${apiKey}`;

    const response = await fetch(url);

    const data = await response.json();

    console.log(data);

    const results = data.results;

    results.map((result) => {
        const image = document.createElement("img");
        image.src=result.urls.small
    }
    
    )
}

searchForm.addEventListener("submit", (e) =>{
    e.preventDefault();
    page = 1;
    searchImages();
})