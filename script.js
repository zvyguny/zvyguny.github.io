let currentGalleryId = null;
let currentSlideIndex = 0;

function openModal(galleryId, slideIndex) {
    currentGalleryId = galleryId;
    currentSlideIndex = slideIndex;
    document.getElementById('modal').style.display = "block";
    showSlide(galleryId, slideIndex);
}

function closeModal() {
    document.getElementById('modal').style.display = "none";
}

function changeSlide(n) {
    showSlide(currentGalleryId, currentSlideIndex += n);
}

function showSlide(galleryId, slideIndex) {
    const gallery = document.querySelector(`.hidden-gallery[data-gallery-id="${galleryId}"]`);
    const images = gallery.getElementsByTagName('img');
    if (slideIndex >= images.length) {
        currentSlideIndex = 0;
    }
    if (slideIndex < 0) {
        currentSlideIndex = images.length - 1;
    }
    const modalImage = document.getElementById('modal-image');
    const selectedImage = images[currentSlideIndex];
    modalImage.src = selectedImage.src;

    // Удаляем предыдущий класс, если он был добавлен
    modalImage.className = 'modal-image';
    
    // Получаем и добавляем новый класс, если он указан в data-class
    const customClass = selectedImage.getAttribute('data-class');
    if (customClass) {
        modalImage.classList.add(customClass);
    }
}

// Прижимаем полосу прокрутки к изображению
const modalContent = document.querySelector('.modal-content');
const imageContainer = modalContent.querySelector('.image-container');
const modalImage = document.getElementById('modal-image');
const modalImageHeight = modalImage.clientHeight;
imageContainer.scrollTop = (modalImageHeight - imageContainer.clientHeight) / 2;

function showSlide(galleryId, slideIndex) {
    const gallery = document.querySelector(`.hidden-gallery[data-gallery-id="${galleryId}"]`);
    const images = gallery.getElementsByTagName('img');
    if (slideIndex >= images.length) {
        currentSlideIndex = 0;
    }
    if (slideIndex < 0) {
        currentSlideIndex = images.length - 1;
    }
    const modalImage = document.getElementById('modal-image');
    const selectedImage = images[currentSlideIndex];
    modalImage.src = selectedImage.src;

    // Получаем и добавляем все классы изображения
    const customClass = selectedImage.getAttribute('class');
    if (customClass) {
        modalImage.className = customClass;
    } else {
        modalImage.removeAttribute('class');
    }
}
