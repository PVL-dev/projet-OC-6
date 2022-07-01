function photographerPageFactory(data) {
    // Compile les données reçues pour créer la carte photographe dans le DOM
    const { name, id, city, country, tagline, price, portrait } = data;
    const picture = `photos/Photographers_ID_Photos/${portrait+"_thumbnail.jpg"}`;
    console.log(data);

    function getHeaderTextDOM() {
        //Génération de l'élément DOM ".text_container"
        const container = document.createElement( 'div' );
        container.setAttribute("class", "text_container");
        const title = document.createElement( 'h1' );
        title.textContent = name;
        const emplacement = document.createElement( 'h3' );
        emplacement.textContent = city+", "+country;
        const slogan = document.createElement( 'p' );
        slogan.textContent = tagline;

        container.appendChild(title);
        container.appendChild(emplacement);
        container.appendChild(slogan);
        return (container);
    }

    function getHeaderImgDOM() {
        //Génération de l'élément DOM ".img_container"
        const container = document.createElement( 'div' );
        container.setAttribute("class", "img_container");
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", "Photo d'illustration de "+name);

        container.appendChild(img);
        return (container);
    }

    return { name, picture, getHeaderTextDOM, getHeaderImgDOM }
}

