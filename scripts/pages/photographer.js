import { getJsonData } from "/scripts/utils/getJsonData.js";
import { photographer, medias } from "/scripts/utils/Objects.js";
import { likesInit } from "/scripts/utils/likes.js";
import { lightboxInit } from "/scripts/utils/modals/lightbox.js";
import { contactModalDrawer } from "/scripts/utils/modals/contactModal.js";

const url = (new URL(document.location.href));
const photographerID = url.searchParams.get('id');

let fullData; // Contiendra toutes les données du JSON "brutes"
export let currentPhotographer; // Contiendra uniquement les données filtrées du photographe
export let currentMedias; // Contiendra tous les médias de ce photographe


const startDrawingPage = async() => {
// Récupére les données du fichier JSON et lance la fonction de création du photograph-header
    fullData = await getJsonData();
    headerDrawer();
};


const headerDrawer = () => {
// Génére un objet photographe puis la partie photograph-header à partir de cet objet
    createPhotographer();
    const cP = currentPhotographer;
    const pageTitle = document.querySelector("#page-title");
    pageTitle.innerHTML = `Fisheye - ${cP.name}`;
    const container = document.querySelector(".photograph-header");
    const newHtmlHeader =`
        <div class="photograph-header_text">
            <h1>${cP.name}</h1>
            <h3>${cP.city}, ${cP.country}</h3>
            <p>${cP.tagline}</p>
        </div>
        <button class="contact_button">Contactez-moi</button>
        <div class="photograph-header_img">
            <img src="photos/Photographers_ID_Photos/${cP.portrait+"_thumbnail.jpg"}" alt="Photo de profil de ${cP.name}"/>
        </div>`;
    container.innerHTML = newHtmlHeader;
    const contactBtn = document.querySelector(".contact_button");
    contactBtn.addEventListener("click", contactModalDrawer);
    mediasDrawer();
};

const createPhotographer = () => {
// Crée l'objet photographer correspondant à l'ID récupéré dans l'URL
    fullData.photographersData.forEach(e => {
        if (e.id.toString() === photographerID) {
            currentPhotographer = new photographer(e.name, e.id, e.city, e.country, e.tagline, e.price, e.portrait)
        };
    });
};


const mediasDrawer = () => {
// Génére la partie medias_section
    createMedias();
    const container = document.querySelector(".medias_container");
    currentMedias.forEach(e => {
        let newHtmlMedia;
        const newCardElement = document.createElement("div");
        newCardElement.setAttribute("class", "media-card");
        if (e.constructor.name === "image") {
            newHtmlMedia =`
            <img class="media-img" id="${e.id}" tabindex="0" src="photos/${currentPhotographer.name}/${e.image}" alt="Photo intitulée : ${e.title}" title="Photo intitulée : ${e.title}">`;
        } else {
            newHtmlMedia =`
            <video class="media-video" id="${e.id}" tabindex="0" title="Vidéo intitulée : ${e.title}" width="350" height="300">
            <source src="photos/${currentPhotographer.name}/${e.video}" type="video/mp4">
            Votre navigateur ne supporte pas le lecteur de vidéos.
            </video>`;
        };
        let newHtmlCard = newHtmlMedia +`
        <div class="media-card_text">
            <h3>${e.title}</h3>
            <div class="media-likes">
                <p id="count${e.id}">${e.likes}</p>
                <i class="fas fa-heart likeBtn" id="${e.id}" tabindex="0" aria-label="Bouton J'aime, cliquable"></i>
            </div>
        </div>`;
        
        container.appendChild(newCardElement);
        newCardElement.innerHTML = newHtmlCard;
    });

    likesInit();
    widgetDrawer();
    lightboxInit();
};

const createMedias = () => {
// Crée les objets médias à partir de l'ensemble des médias du photographe
    currentMedias = [];
    fullData.mediasData.forEach(e => {
        if (e.photographerId.toString() === photographerID) {
            currentMedias.push(new medias(e.id, e.photographerId, e.title, e.likes, e.date, e.price).createMedia(e)); // Crée un objet de la classe medias
        };
    });
};


export const widgetDrawer = () => {
// Génére le widget des likes et du prix journalier en bas de page
    let totalLikes = 0;
    currentMedias.forEach(e => {
        totalLikes += e.likes;
    });

    const priceAndLikeWidget = document.querySelector(".priceandlike-widget");
    const newHtmlWidget = `
        <p>${totalLikes}</p>
        <i class="fas fa-heart"></i>
        <p>${currentPhotographer.price}€ / jour</p>`;
        priceAndLikeWidget.innerHTML = newHtmlWidget;
};


// Lance le script si on est bien sur la page photographer.hmtl
const body = document.querySelector("body");
if (body.classList.contains("photographer-page")) {
    document.body.onload = startDrawingPage;
};
