import { getJsonData } from "/scripts/utils/getJsonData.js";
import { photographer } from "/scripts/utils/Objects.js";

let fullData; // Contiendra toutes les données du JSON "brutes"
let photographersArray = [];


const startDrawingPage = async() => {
// Récupére les données du fichier JSON, les interpréte et lance la fonction de création de la page
    fullData = await getJsonData();
    fullData.photographersData.forEach(e => {
        photographersArray.push(new photographer(e.name, e.id, e.city, e.country, e.tagline, e.price, e.portrait))
    });
    pageDrawer();
};


const pageDrawer = () => {
// Génére un objet photographe puis la partie photograph-header à partir de cet objet
    photographersArray.forEach(e => {
        const container = document.querySelector(".photographer_section");
        const newCard = document.createElement("div");
        newCard.setAttribute("class", "card_container")
        const picture = `photos/Photographers_ID_Photos/${e.portrait+"_thumbnail.jpg"}`;
        const newHtml =`
            <a href="photographer.html?id=${e.id}">
                <img src="${picture}" alt="">
                <h2>${e.name}</h2>
            </a>
            <div class="text_container">
                <h3>${e.city}, ${e.country}</h3>
                <h4>${e.tagline}</h4>
                <p>${e.price}€/jour</p>
            </div>`;
        
        container.appendChild(newCard);
        newCard.innerHTML = newHtml;
    });
};


// Lance le script si on est bien sur la page index.hmtl
const body = document.querySelector("body") 
if (body.classList.contains("index-page")) {
    document.body.onload = startDrawingPage
};
