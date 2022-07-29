import { currentPhotographer } from '../../pages/photographer.js';

const body = document.querySelector('.photographer-page');
const contactModal = document.querySelector('#contact_modal');

export const contactModalInit = () => {
// Crée les EventListener d'ouverture de la modale
    const contactBtn = document.querySelector('.contact_button');
    contactBtn.addEventListener('click', modalDrawer);
    contactBtn.addEventListener('keydown', async function (e) {
        if (e.key === 'Enter') {
            modalDrawer();
        };
    });
};

const modalDrawer = () => {
// Génére et affiche la modale
    const contactModalTitle = document.querySelector('#contact_title');
    const pathName = currentPhotographer.name;
    const newHtml = `<h2>Contactez-moi <br>
        ${pathName}</h2>`;
    contactModalTitle.innerHTML = newHtml;

    contactModal.style.display = 'flex';
    body.classList.add('modal-open');

    const closeBtn = document.querySelector('.closeBtn');
    closeBtn.addEventListener('click', closeModal);
    closeBtn.addEventListener('keydown', async function (e) {
        if (e.key === 'Enter') {
            closeModal();
        };
    });

    const submitBtn = document.querySelector('.submit_button');
    submitBtn.addEventListener('click', validateForm);
    closeBtn.addEventListener('keydown', async function (e) {
        if (e.key === 'Enter') {
            validateForm();
        };
    });
};

const validateForm = () => {
    let firstName = document.querySelector('#firstName').value;
    let lastName = document.querySelector('#lastName').value;
    let email = document.querySelector('#email').value;
    let message = document.querySelector('#message').value;
    let form = {'Prénom' : firstName, 'Nom' : lastName, 'Mail' : email, 'Message' : message};
    console.log(form);
    closeModal();
};

const closeModal = () => {
// Ferme la modale
    body.classList.remove('modal-open');
    
    contactModal.style.animationPlayState = 'running';
    setTimeout(function() {
        contactModal.style.display = 'none';
        contactModal.style.animationPlayState = 'paused';
    }, 300);
};

