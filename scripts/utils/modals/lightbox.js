import { currentMedias, currentPhotographer } from "/scripts/pages/photographer.js";
import { medias } from "/scripts/utils/Objects.js";

let currentMedia; // Contiendra le Json original du média sélectionné

export const lightboxInit = () => {
// Initialise la création de la Lightbox
    const images = document.querySelectorAll(".media-img")
    images.forEach(e => {
        eventOpenLightbox(e);
    });
    const videos = document.querySelectorAll(".media-video")
    videos.forEach(e => {
        eventOpenLightbox(e);
    });
};

const eventOpenLightbox = (e) => {
// Ajoute les EventListener d'ouverture de la Lightbox à chaque médias
    e.addEventListener("click", lightboxDrawer);
    e.addEventListener("keydown", async function (e) {
        if (e.key === "Enter") {
            lightboxDrawer(e);
        };
    });
};

const recoveryMedia = (e) => {
// Récupére le Json original du media sélectionné
    currentMedia = [];
    currentMedias.forEach(data => {
        if (data.id.toString() === e.target.id) {
            currentMedia.push(new medias(data.id, data.photographerId, data.title, data.likes, data.date, data.price).createMedia(data)); // Crée un objet de la classe medias
        };
    });
    currentMedia = currentMedia[0];
};

const lightboxDrawer = (e) => {
// Génére le code HTML de la Lightbox en fonction du type de média (image ou vidéo)
    recoveryMedia(e);

    const pathName = currentPhotographer.name;
    const title = currentMedia.title;

    const main = document.querySelector("main");
    const newLightbox = document.createElement("figure");
    newLightbox.setAttribute("class", "lightbox");
    newLightbox.setAttribute("id", currentMedia.id);
    
    let newHtmlLightbox;
    if (currentMedia.image) {
        let src = `/photos/${pathName}/${currentMedia.image}`;
        const data = {src, title};
        newHtmlLightbox = imgDrawer(data);
    };
    if (currentMedia.video) {
        let src = `/photos/${pathName}/${currentMedia.video}`;
        const data = {src, title};
        newHtmlLightbox = videoDrawer(data);
    };

    main.appendChild(newLightbox);
    newLightbox.innerHTML = newHtmlLightbox;
    document.querySelector(".nextBtn").focus(); // Focus pour la navigation au clavier
    eventLightbox(); // Crée les EventListener interne de la Lightbox
};

const imgDrawer = (e) => {
    return `
    <div class="lightbox-container">
        <div class="leftBtn">
            <i aria-label="Bouton Précédent, Cliquable" title ="Précédent" tabindex="2" class="fas fa-chevron-left prevBtn"></i>
        </div>
        <img src="${e.src}" alt=""/>
        <div class="rightBtn">
            <i aria-label="Bouton Fermer, Cliquable" title="Fermer" tabindex="2" class="fas fa-times closeBtn"></i>
            <i aria-label="Bouton Suivant, Cliquable" title="Suivant" tabindex="1" class="fas fa-chevron-right nextBtn"></i>
        </div>
        <h3>${e.title}</h3>
    </div>
    `
};

const videoDrawer = (e) => {
    return `
    <div class="lightbox-container">
        <div class="leftBtn">
        <i aria-label="Bouton Précédent, Cliquable" title ="Précédent" tabindex="2" class="fas fa-chevron-left prevBtn"></i>
        </div>
        <video width="350" height="300" controls="">
            <source src="${e.src}" type="video/mp4">
            Votre navigateur ne supporte pas le lecteur de vidéos.
        </video>
        <div class="rightBtn">
            <i aria-label="Bouton Fermer, Cliquable" title="Fermer" tabindex="2" class="fas fa-times closeBtn"></i>
            <i aria-label="Bouton Suivant, Cliquable" title="Suivant" tabindex="1" class="fas fa-chevron-right nextBtn"></i>
        </div>
        <h3>${e.title}</h3>
    </div>
    `
};

const eventLightbox = () => {
// Crée les EventListener interne de la Lightbox
    const closeBtn = document.querySelector(".closeBtn");
    closeBtn.addEventListener("click", closeLightbox);
    closeBtn.addEventListener("keydown", async function (e) {
        if (e.key === "Enter") {
            closeLightbox();
        };
    });

    const prevBtn = document.querySelector(".prevBtn");
    prevBtn.addEventListener("click", prevMedia);
    prevBtn.addEventListener("keydown", async function (e) {
        if (e.key === "Enter") {
            prevMedia();
        };
    });

    const nextBtn = document.querySelector(".nextBtn");
    nextBtn.addEventListener("click", nextMedia);
    nextBtn.addEventListener("keydown", async function (e) {
        if (e.key === "Enter") {
            nextMedia();
        };
    });
};

const prevMedia = () => {
// Passe au média précédent
    const lightbox = document.querySelector(".lightbox");

    for (let i = 0; i < currentMedias.length; i++) {
        if (lightbox.id === currentMedias[i].id.toString()) {
            if (currentMedias[i - 1]) {
                let cM = currentMedias[i - 1];
                nextLightboxDrawer(cM);
            } else {
                let cM = currentMedias[currentMedias.length - 1];
                nextLightboxDrawer(cM);
            };
            eventLightbox();
            i = currentMedias.length;
        };
    };
};

const nextMedia = () => {
// Passe au média suivant
    const lightbox = document.querySelector(".lightbox");

    for (let i = 0; i < currentMedias.length; i++) {
        if (lightbox.id === currentMedias[i].id.toString()) {
            if (currentMedias[i + 1]) {
                let cM = currentMedias[i + 1];
                nextLightboxDrawer(cM);
            } else {
                let cM = currentMedias[0];
                nextLightboxDrawer(cM);
            };
            eventLightbox();
            i = currentMedias.length;
        };
    };
};

const nextLightboxDrawer = (cM) => {
    const pathName = currentPhotographer.name;
    const lightbox = document.querySelector(".lightbox");
    lightbox.id = cM.id.toString();
    if (cM.image) {
        let id = cM.id;
        let src = `/photos/${pathName}/${cM.image}`;
        let title = cM.title;

        const data = {id, src, title};
        lightbox.innerHTML = imgDrawer(data);
    } else {
        let id = cM.id;
        let src = `/photos/${pathName}/${cM.video}`;
        let title = cM.title;

        const data = {id, src, title};
        lightbox.innerHTML = videoDrawer(data);
    };
};

const closeLightbox = () => {
// Ferme la Lightbox
    const lightbox = document.querySelector(".lightbox");    
    lightbox.style.animationPlayState = "running";
    setTimeout(function() {
        lightbox.style.animationPlayState = "paused";
        lightbox.remove();
    }, 300);
};
