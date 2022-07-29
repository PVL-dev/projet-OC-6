import { currentMedias, mediasDrawer } from '../pages/photographer.js';

const menu = document.querySelector('.menu_container');
let sortBtnValue;

export const sortingInit = () => {
// Initialise les fonctions de classement des médias
    document.querySelector('.sorting_menu').addEventListener('click' , displayMenu);
};

const displayMenu = () => {
// Affiche ou efface le menu déroulant de choix du tri
    if (menu.classList.contains('deploy')) { 
        menu.classList.remove('deploy');
        menu.innerHTML = `
            <button class="sorting_menu btn" aria-label="${sortBtnValue}" role="button" aria-haspopup="listbox" aria-expanded="false">
                <span>${sortBtnValue}</span>
                <i class="fa fa-angle-down"></i>
            </button>
        `;

        document.querySelector('.sorting_menu').addEventListener('click' , displayMenu);
    } else {
        menu.classList.add('deploy');
        menu.innerHTML = `
            <div class="sorting_list" role="listbox" aria-activedescendant="default" aria-selected="true">
                <button class="sorting-element" role="button" aria-label="Popularité" value="Popularité">Popularité<i class="fa fa-angle-up"></i></button>
                <hr>
                <button class="sorting-element" role="button" aria-label="Date" value="Date">Date</button>
                <hr>
                <button class="sorting-element" role="button" aria-label="Titre" value="Titre">Titre</button>
            </div>
        `;

        const newButtons = document.querySelectorAll('.sorting-element');
        newButtons.forEach(e => e.addEventListener('click', mediasDrawer));
    };
};

export const sortingMedias = (e) => {
// Tri les médias en fonction de la méthode de tri sélectionnée
    if (e?.target.value) {
        sortBtnValue = e?.target.value;

    } else if (e === undefined) {
        sortBtnValue = 'Popularité';

    };
    let sortedMedias = currentMedias;


    if (sortBtnValue === 'Popularité') {
        sortedMedias.sort((a,b) => a.likes > b.likes ? -1:1);

    } else if (sortBtnValue === 'Date') {
        sortedMedias.sort(function (a,b){
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return dateA < dateB ? 1:-1;
        });

    } else if (sortBtnValue === 'Titre') {
        sortedMedias.sort((a,b) => a.title > b.title ? 1:-1);

    };

    if (menu.classList.contains('deploy')) {
        displayMenu();
    };
};

