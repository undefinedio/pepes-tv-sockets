import $ from 'jquery';

const ws = new WebSocket('ws://localhost:3333');

$(document).ready(() => {
    ws.onmessage = function (event) {
        console.log(event);
        let data = JSON.parse(event.data);
        $('.js-message').html(data.message);
        $('.js-from').html(data.from);
    };
});
