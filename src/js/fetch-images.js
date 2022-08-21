import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '29360332-a92f3069e6903f60a66cd9589';
const URL_SEARCH_PARAMS = 'image_type=photo&orientation=horizontal&safesearch=true';
const PER_PAGE = 40;

async function fetchImages(query, page) {
     
     const response = await axios.get(
        `${BASE_URL}?key=${KEY}&${URL_SEARCH_PARAMS}&q=${query}&page=${page}&per_page=${PER_PAGE}`
     );
    return response;
}
export { fetchImages, PER_PAGE };