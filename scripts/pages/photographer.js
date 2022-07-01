let url = (new URL(document.location.href));
let photographerID = url.searchParams.get('id');

async function getPhotographerInfos() {
    // Récupère et compile les infos du photographe depuis le Json en fonction de son ID

    let jsonFile = "data/photographers.json";

    let response = await fetch(jsonFile);
    let data = await response.json();
    let photographers = await data.photographers;
    
    function filterByID(obj) {
        if (obj.id == photographerID) {
            return true;
        } else {
            return false;
        }
    }
    
    let photographer = photographers.filter(filterByID);

    return ({
        photographer: [...photographer]});
}

async function displayData(photographer) {
    // Envoi les données du photographe au factory Page, récupère la page générée et l'ajoute au DOM
    const headerText = document.querySelector(".photograph-header_text");
    const headerImg = document.querySelector(".photograph-header_img");

    photographer.forEach((element) => {
        const photographerPageModel = photographerPageFactory(element);

        const generatedText = photographerPageModel.getHeaderTextDOM();
        headerText.appendChild(generatedText);
        console.log(generatedText);

        const generatedImg = photographerPageModel.getHeaderImgDOM();
        headerImg.appendChild(generatedImg);
        console.log(generatedImg);
    });
};

async function init() {
    // Initialise la fonction de récupération des données du photographe puis la fonction de génération de la page
    const { photographer } = await getPhotographerInfos();
    displayData(photographer);
};

init();