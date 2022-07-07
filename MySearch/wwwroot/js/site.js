const searchResults = [];

const urls = [];

const baseUrl = 'https://www.googleapis.com/customsearch/v1?'
const apiKey = 'AIzaSyCPlZG7tzO8CEq81u_ty0eu8mHs8nbo9BI';
const cx = '30ea3021d27d247fe';

const createUrl = function (start, query) {
    const url = baseUrl + 'key=' + apiKey + '&cx=' + cx + `&start=${start}` + `&q=${query}`;
    return url;
}


$('#search-button').on('click', function () {
    const searchVal = $('#search-input').val();

    if (!inputValid(searchVal)) {
        alert('search query can\'t be empty');
        return;
    }

    for (var i = 0; i < 10; i++) {
        const url = createUrl(1 + i * 10, searchVal);
        urls.push(url);
    }

    for (var i = 0; i < 10; i++) {
        $.get({
            url: urls[i]
        }).done(function (res) {
            res.items.forEach(i => searchResults.push(i));
        });
    }
});

const inputValid = function (val) {
    return val.length !== 0;
}