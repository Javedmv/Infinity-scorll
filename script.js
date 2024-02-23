const imageContainer = document.getElementById("image-container");
const loader = document.getElementById('loader');

let photoArray = [];
const apiKey = ''
const count = 5;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

function setAttributes(element,attributes){
    for(const key in attributes){
        element.setAttributes(key,attributes[key])
    }
};

function displayPhotos(){
    photoArray.forEach(photo => {
        const item = document.createElement('a');
        setAttributes(item,{
            href:photo.links.html,
            target:'_blank',
        });
        const image = document.createElement('img');
        setAttributes(image,{
            src:photo.urls.regular,
            alt:photo.alt_description,
            title:photo.alt_description,
        });
    });
}

async function getPhoto(){
    try {
        const response = await fetch(apiUrl);
        photoArray = await response.json();
        displayPhotos(photoArray)
    } catch (error) {
        
    }
}

getPhoto();