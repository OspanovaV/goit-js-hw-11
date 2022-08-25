import './css/styles.css';
import { fetchImages, PER_PAGE } from './js/fetch-images';
import { renderGallery } from './js/render-gallery';

import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.btn-load-more');
let query = '';
let page = 1;
const lightBox = new SimpleLightbox('.gallery a');

searchForm.addEventListener('submit', onSearchForm);
loadMoreBtn.addEventListener('click', onLoadMoreBtn);

async function onSearchForm(e) {
    e.preventDefault();   
    page = 1; 
    query = e.currentTarget.searchQuery.value.trim();
    
  if (query === '') {
      Notiflix.Notify.failure('The search string cannot be empty. Please specify your search query.');
      return;
    }
    gallery.innerHTML = '';
    loadMoreBtn.classList.add('is-hidden');
    try {
        const images = await fetchImages(query, page);
        const data = images.data;
        if (data.totalHits === 0) {
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        } else {
            renderGallery(data.hits);
            lightBox.refresh();
            Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
            onSearchNotification(data);           
        }     
    } catch (error) {
        console.log(error)
    };
}

async function onLoadMoreBtn() {
    page += 1;
    try {
const images = await fetchImages(query, page)
    const data = images.data;
    renderGallery(data.hits);
    lightBox.refresh();
    onSearchNotification(data);     
    } catch (error) {
        console.log(error)
    };
}

function onSearchNotification(data) {
const totalPages = Math.ceil(data.totalHits / PER_PAGE);
    if (page >= totalPages) {
        loadMoreBtn.classList.add('is-hidden');
        Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
        return;
    } 
    if (data.totalHits === 0) {
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        }
    if (data.totalHits >= PER_PAGE) { 
        loadMoreBtn.classList.remove('is-hidden');
    }   
}

