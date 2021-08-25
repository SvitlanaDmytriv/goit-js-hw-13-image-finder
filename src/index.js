import './sass/main.scss';
import imageCardTemplate from './templates/imageCardTemplate.hbs'
import { refs } from './js/refs.js';
import { ImagesApiServise } from './js/apiService.js';
import { LoadMoreBtn } from './js/loadMoreBtn.js';

const debounce = require('lodash.debounce');


const imagesApiServise = new ImagesApiServise();
const loadMoreBtn = new LoadMoreBtn({
    selector: 'load-more-btn',
    hidden: true,
})



refs.searchForm.addEventListener('input', debounce(onSearchForm, 500))
loadMoreBtn.refs.button.addEventListener('click', fetchImages)


function onSearchForm(event) {
    event.preventDefault()

    imagesApiServise.query = event.target.value
    console.log(imagesApiServise.query)
    
    if (imagesApiServise.query === '') {
        clearImagesContainer()
        loadMoreBtn.hide()
        return
    }
        
    imagesApiServise.resetPage()
    clearImagesContainer()
    fetchImages()
 
}


function fetchImages() {
    loadMoreBtn.show()
    loadMoreBtn.disable()

    imagesApiServise.fetchImages()
    .then(hits => {
        appendImagesMarkup(hits)
        loadMoreBtn.enable()

        scrollingPage()
    }).catch (console.log)
    
}


function appendImagesMarkup(hits) {
    refs.galleryContainer.insertAdjacentHTML('beforeend', imageCardTemplate(hits));
}

function clearImagesContainer() {
    refs.galleryContainer.innerHTML = '';
}


function scrollingPage() {
   
 refs.galleryContainer.scrollIntoView({
  behavior: 'smooth',
  block: 'end',
})
 
}

