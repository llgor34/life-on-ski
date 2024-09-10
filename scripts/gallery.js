const photosContainer = document.querySelector('[gallery]');

function main() {
    clearPhotosContainer();
    const photos = getPhotosToDisplay();
    displayPhotos(photos);
}

function clearPhotosContainer() {
    photosContainer.innerHTML = '';
}

function getPhotosToDisplay() {
    const photoNodes = [];
    for (let i = 0; i < 34; i++) {
        const photoIdx = i + 1;
        const photoUrl = `./img/photos/image${photoIdx}.jpg`;

        const photoLink = document.createElement('a');

        photoLink.classList.add('photo');

        photoLink.setAttribute('href', photoUrl);
        photoLink.setAttribute('target', '_blank');

        const photoImage = document.createElement('img');
        photoImage.setAttribute('src', photoUrl);
        photoImage.setAttribute('alt', 'zdjęcie');

        photoLink.appendChild(photoImage);
        photoNodes.push(photoLink);
    }
    return photoNodes;
}

function displayPhotos(photos) {
    for (const photo of photos) {
        photosContainer.appendChild(photo);
    }
}

main();
