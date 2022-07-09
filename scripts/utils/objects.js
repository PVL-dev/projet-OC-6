export class photographer {
// Classe qui génére un objet "photographer" contenant les données d'un photographe
    constructor(name, id, city, country, tagline, price, portrait) {
        this.name = name;
        this.id = id;
        this.city = city;
        this.country = country;
        this.tagline = tagline;
        this.price = price;
        this.portrait = portrait;
    };
};


export class medias {
// Classe qui génére un objet "medias" contenant plusieurs objets "media" de type "image" ou "video"
    constructor(id, photographerId, title, likes, date, price) {
        this.id = id;
        this.photographerId = photographerId;
        this.title = title;
        this.likes = likes;
        this.date = date;
        this.price = price;
    };

    createMedia(data) {
    // Débute la génération d'un objet "media" de type "image" ou "video"
        if (data.image) {
            return new image(data);
        } else {
            return new video(data);
        };
    };
};

class image extends medias {
// Classe qui génére un objet "media" de type "image"
    constructor(data) {
        super(data.id, data.photographerId, data.title, data.likes, data.date, data.price);
        this.image = data.image;
    };
};

class video extends medias {
// Classe qui génére un objet "media" de type "video"
    constructor(data) {
      super(data.id, data.photographerId, data.title, data.likes, data.date, data.price);
      this.video = data.video;
    };
};
