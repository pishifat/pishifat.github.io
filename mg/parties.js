$(function(){

    var fileName = 'testfile35.json';

    $.getJSON(fileName).done(function(data) {
        
        var rankColors = ['black','saddlebrown','silver','gold'];

        $.each(data.parties.parties, function (k, p) {
            if (k % 2 == 0)                
                $('#parties').append('<div class="row"></div>');

            var s = 'Members: ';
            $.each(data.parties.parties[k].members, function(k, v) {
                s += v + ', ';
            });

            var card = `<div class='col-sm-6'>
            <div class='card bg-dark' style='border-top: 7px solid ${rankColors[p.rank]};'>
            <div class='card-header'>${p.name} <button class='btn btn-mg justify-content-center float-right'>Join party</button></div>
            <div class='card-body'>
            <p class='card-text'>Members: ${s.slice(0, -2)}</p>
            <p class='card-text'>Current quest: ${p.currentQuest}</p>
            </div>
            </div>
            </div>`;

            $('.row:last').append(card);
        });
    });
});