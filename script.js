const imageContainer = document.getElementById("image-container");
const loader = document.getElementById('loader');

let ready = false;
let imgLoaded = 0;
let totalImages = 0;
let photoArray = [];

const apiKey = ''
const count = 10;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

function imageLoaded(){
    imgLoaded++;
    if(imgLoaded === totalImages){
        loader.hidden = true;
        ready = true;
    }
}

function setAttributes(element,attributes){
    for(const key in attributes){
        element.setAttributes(key,attributes[key])
    }
};

function displayPhotos(){
    imgLoaded = 0;
    totalImages = photoArray.length;
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
        image.addEventListener('load',imageLoaded);
        item.appendChild(image);
        imageContainer.appendChild(item);
    });
}

async function getPhoto(){
    try {
        const response = await fetch(apiUrl);
        photoArray = await response.json();
        console.log(photoArray)
        displayPhotos(photoArray)
    } catch (error) {
        
    }
}

window.addEventListener('scroll',()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhoto();
    }
})

getPhoto();