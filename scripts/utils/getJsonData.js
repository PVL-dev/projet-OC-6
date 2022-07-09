export const getJsonData = async() => {
    // Récupère et compile les infos du photographe depuis le Json en fonction de son ID
    const jsonFile = "data/photographers.json";
    const jsonData = await fetch(jsonFile);
    const data = await jsonData.json();

    const photographersData = [...data.photographers];
    const mediasData = [...data.media];

    return {
        photographersData,
        mediasData
    };
}