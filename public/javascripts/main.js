var ws = new WebSocket('ws://localhost:3333');

ws.onmessage = function (event) {
    console.log(JSON.parse(event.data));
};

$(document).ready(function () {

    $("#queryform").submit(function (e) {
        e.preventDefault(); // avoid to execute the actual submit of the form.
        var url = "/query"; // the script where you handle the form input.

        $.ajax({
            type: "POST",
            url: url,
            data: $("#queryform").serialize(), // serializes the form's elements.
            success: function (data) {
                console.log('ajax successfull'); // show response from the php script.
            }
        });

    });
});
