import { widgetDrawer, currentMedias } from '../pages/photographer.js';

export const likesInit = () => {
    const heartBtn = document.querySelectorAll('.likeBtn');
    heartBtn.forEach(e => {
        e.addEventListener('click', likesToggle);
    });
};

const likesToggle = (e) => {
    if (e.target.classList.contains('liked')) {
        e.target.classList.remove('liked');
        currentMedias.forEach(data => {
            if (e.target.id === `${data.id.toString()}`) {
                data.likes -= 1;
                document.querySelector(`#count${data.id}`).innerHTML = `${data.likes}`;
            };
        });
    } else {
        e.target.classList.add('liked');
        currentMedias.forEach(data => {
            if (e.target.id === `${data.id.toString()}`) {
                data.likes += 1;
                document.querySelector(`#count${data.id}`).innerHTML = `${data.likes}`;
            };
        });
    };
    widgetDrawer();
};

