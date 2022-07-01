async function getPhotographers() {
    // Récupère et compile les infos des photographes depuis le Json dans la constante "photographers"

    let jsonFile = "data/photographers.json";

    let response = await fetch(jsonFile);
    let data = await response.json();
    let photographers = await data.photographers;

    return ({
        photographers: [...photographers]});
}

async function displayData(photographers) {
    // Envoi les données des photographes au factory Card, récupère les cartes générées et les ajoute au DOM
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerCardModel = photographerCardFactory(photographer);
        const generatedCards = photographerCardModel.getPhotographerCardDOM();
        photographersSection.appendChild(generatedCards);
    });
};

async function init() {
    // Initialise la fonction de récupération des données des photographes puis la fonction de génération des cartes
    const { photographers } = await getPhotographers();
    displayData(photographers);
};

init();
