const FIRST_IMAGE_IDX = 1;
const LAST_IMAGE_IDX = 34;

const photosContainer = document.querySelector('[gallery]');

const photoPreviewContainer = document.querySelector('[img-preview-container]');
const photoPreview = document.querySelector('[img-preview]');
const arrowLeft = document.querySelector('[img-arrow-left]');
const arrowRight = document.querySelector('[img-arrow-right]');

function main() {
    clearPhotosContainer();

    const photos = getPhotosToDisplay();
    displayPhotos(photos);
    enablePhotosPreviewModeOnClick(photos);
}

function clearPhotosContainer() {
    photosContainer.innerHTML = '';
}

function getPhotosToDisplay() {
    const photoNodes = [];
    for (let i = FIRST_IMAGE_IDX; i <= LAST_IMAGE_IDX; i++) {
        const photoIdx = i;
        const photoUrl = `./img/photos/image${photoIdx}.jpg`;

        const photoLink = document.createElement('a');

        photoLink.classList.add('photo');

        photoLink.setAttribute('href', photoUrl);
        photoLink.setAttribute('target', '_blank');
        photoLink.setAttribute('index', photoIdx);

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

function enablePhotosPreviewModeOnClick(photos) {
    togglePhotoPreviewModeOnPreviewContainerClick();
    togglePhotoPreviewModeOnPhotoClick(photos);

    switchPhotoPreviewByNumberOnArrowClick(arrowLeft, -1, (newIdx) => (newIdx < FIRST_IMAGE_IDX ? LAST_IMAGE_IDX : newIdx));
    switchPhotoPreviewByNumberOnArrowClick(arrowRight, 1, (newIdx) => (newIdx > LAST_IMAGE_IDX ? FIRST_IMAGE_IDX : newIdx));

    openPreviewPhotoInNewTabOnClick(photos);
}

function switchPhotoPreviewByNumberOnArrowClick(arrow, number, overrideNextPhotoIdxFn = (newIdx) => newIdx) {
    arrow.addEventListener('click', (e) => {
        e.stopPropagation();

        const currentPhotoIdx = +photoPreview.getAttribute('index');
        let nextPhotoIdx = currentPhotoIdx + number;
        nextPhotoIdx = overrideNextPhotoIdxFn(nextPhotoIdx);

        if (nextPhotoIdx > LAST_IMAGE_IDX) {
            nextPhotoIdx = 1;
        }

        const nextPhotoSrc = photoPreview.getAttribute('src').replace(`image${currentPhotoIdx}.jpg`, `image${nextPhotoIdx}.jpg`);
        photoPreview.setAttribute('src', nextPhotoSrc);
        photoPreview.setAttribute('index', nextPhotoIdx);
    });
}

function openPreviewPhotoInNewTabOnClick() {
    photoPreview.addEventListener('click', (e) => {
        e.stopPropagation();
        window.open(photoPreview.getAttribute('src'), '_blank');
    });
}

function togglePhotoPreviewModeOnPreviewContainerClick() {
    photoPreviewContainer.addEventListener('click', (e) => {
        togglePhotoPreviewMode();
    });
}

function togglePhotoPreviewModeOnPhotoClick(photos) {
    photos.forEach((photo) =>
        photo.addEventListener('click', (e) => {
            e.preventDefault();
            togglePhotoPreviewMode(photo);
        })
    );
}

function togglePhotoPreviewMode(photoLink) {
    if (photoLink) {
        updatePhotoPreview(photoLink);
    }

    if (isInPhotoPreviewMode()) {
        photoPreviewContainer.style.opacity = 0;
        const exitPhotoPreviewModeRef = () => {
            enableWindowScroll();
            photoPreviewContainer.classList.remove('show');
            photoPreviewContainer.removeEventListener('transitionend', exitPhotoPreviewModeRef);
        };
        photoPreviewContainer.addEventListener('transitionend', exitPhotoPreviewModeRef);
    } else {
        disableWindowScroll();
        photoPreviewContainer.classList.add('show');
        setTimeout(() => (photoPreviewContainer.style.opacity = 1), 0);
    }
}

function isInPhotoPreviewMode() {
    return photoPreviewContainer.classList.contains('show');
}

function updatePhotoPreview(photoLink) {
    photoPreview.setAttribute('src', photoLink.href);
    photoPreview.setAttribute('index', photoLink.getAttribute('index'));
}

function enableWindowScroll() {
    document.body.classList.remove('disable-scroll');
}

function disableWindowScroll() {
    document.body.classList.add('disable-scroll');
}

main();
