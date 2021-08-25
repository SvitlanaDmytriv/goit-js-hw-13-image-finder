export  class ImagesApiServise {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    fetchImages() {
    const BASE_URL = 'https://pixabay.com/api/'
    this.page += 1
       
    return fetch(`${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=23051678-b5ac65469c9e5d51c8f14a2a6`)
    .then(response => response.json())
    .then(({ hits }) => hits)
    .catch(err => console.log(err));
    }

    
    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}




