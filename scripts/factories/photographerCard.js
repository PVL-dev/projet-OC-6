function photographerCardFactory(data) {
    // Compile les données reçues pour créer la carte photographe dans le DOM
    const { name, id, city, country, tagline, price, portrait } = data;
    const picture = `photos/Photographers_ID_Photos/${portrait+"_thumbnail.jpg"}`;

    function getPhotographerCardDOM() {
        //Génération de l'élément DOM ".card_container"
        const container = document.createElement( 'div' );
        container.setAttribute("class", "card_container");
        const link = document.createElement( 'a' );
        link.setAttribute("href", "photographer.html?id="+id);
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", "");
        const title = document.createElement( 'h2' );
        title.textContent = name;
        const text = document.createElement( 'div' );
        text.setAttribute("class", "text_container");
        const emplacement = document.createElement( 'h3' );
        emplacement.textContent = city+", "+country;
        const slogan = document.createElement( 'h4' );
        slogan.textContent = tagline;
        const priceText = document.createElement( 'p' );
        priceText.textContent = price+"€/jour";

        container.appendChild(link);
        link.appendChild(img);
        link.appendChild(title);
        container.appendChild(text);
        text.appendChild(emplacement);
        text.appendChild(slogan);
        text.appendChild(priceText);
        return (container);
    }
    return { name, picture, getPhotographerCardDOM }
}

