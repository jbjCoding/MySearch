// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

$(document).ready(function () {
    console.log('ready');
});

const baseUrl = 'https://www.googleapis.com/customsearch/v1?'
const apiKey = 'AIzaSyCPlZG7tzO8CEq81u_ty0eu8mHs8nbo9BI';
const cx = '30ea3021d27d247fe';

const url = baseUrl + 'key=' + apiKey + '&cx=' + cx + '&q=';

$('#search-button').on('click', function () {
    $.get({
        url: url + 'lectures'
    }).done(function(res) {
        console.log(res);
    });
});