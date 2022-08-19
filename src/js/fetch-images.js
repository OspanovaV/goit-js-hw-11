import axios from 'axios';
export { fetchImages };

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '29360332-a92f3069e6903f60a66cd9589';
const URLSearchParams = 'image_type=photo&orientation=horizontal&safesearch=true';

async function fetchImages(query, page, perPage) {
    const response = await axios.get(
        `${BASE_URL}?key=${KEY}&${URLSearchParams}&q=${query}&page=${page}&per_page=${perPage}`
    );
    return response;
}