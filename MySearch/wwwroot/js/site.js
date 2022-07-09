const searchResults = [];

let urls = [];

const baseUrl = 'https://www.googleapis.com/customsearch/v1?'
const apiKey = 'AIzaSyCPlZG7tzO8CEq81u_ty0eu8mHs8nbo9BI';
const cx = '30ea3021d27d247fe';

const table = $('#search-table');

const saveToDbUrl = 'https://localhost:7230/MySearchApi/SaveQuery ';
const exportUrl = 'https://localhost:7230/MySearchApi/ExportToExcel ';

$(document).ready(function () {
    table.DataTable({
        ordering: true,
        searching: true,
        columns: [
            { 'data': 'title' },
            { 'data': 'link' },
            { 'data': 'snippet' }
        ]
    });
});

$('#search-button').on('click', function () {
    let searchVal = $('#search-input').val();

    if (!inputValid(searchVal)) {
        alert('search query can\'t be empty');
        return;
    }

    searchVal = encodeURIComponent(searchVal);

    for (var i = 0; i < 10; i++) {
        const url = createUrl(1 + i * 10, searchVal);
        urls.push(url);
    }

    search();
});

$('#export-button').on('click', function () {
    axios.post(exportUrl).then(alert('export.xlsx exported successfully'));
});

const search = async function () {

    const result = await Promise.all([
        axios.get(urls[0]),
        axios.get(urls[1]),
        axios.get(urls[2]),
        axios.get(urls[3]),
        axios.get(urls[4]),
        axios.get(urls[5]),
        axios.get(urls[6]),
        axios.get(urls[7]),
        axios.get(urls[8]),
        axios.get(urls[9])
    ]).then(data => {
        urls = [];

        const items = getItemsFromData(data);
        const mappedItems = items.map(i => createMappedItem(i));

        $('.displayable').css('display', 'block');

        table.DataTable().destroy();
        table.empty();

        table.DataTable({
            data: mappedItems,
            ordering: true,
            searching: true,
            columns: [
                { 'data': 'title' },
                { 'data': 'link' },
                { 'data': 'snippet' }
            ]
        });

        axios.post(saveToDbUrl, mappedItems.map(mi => createMappedItemForBack(mi)));
    });
}

const createUrl = function (start, query) {
    const url = baseUrl + 'key=' + apiKey + '&cx=' + cx + `&start=${start}` + `&q=${query}`;
    return url;
}

const inputValid = function (val) {
    return val.length !== 0;
}

const getItemsFromData = function (data) {
    const items = [];

    for (var i = 0; i < data.length; i++) {
        data[i].data.items.forEach(i => items.push(i));
    }

    return items;
}

const createMappedItem = function (item) {
    const mappedItem = {};

    mappedItem.title = item.title;
    mappedItem.link = item.link;
    mappedItem.snippet = item.snippet;

    return mappedItem;
}

const createMappedItemForBack = function (item) {
    const mappedItem = { id: 0, ...item };
    return mappedItem;
}