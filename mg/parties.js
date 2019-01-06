/*
then for users, there's like a bunch of things to list
would only put total points, rank, and current party on the always-visible card
then the points breakdown and quest name list in this popup thing
for quests, would just do name/reward visible
and parties everything can be visible cuz there isnt much
*/

$(function(){

    var fileName = 'testfile35.json';

    $.getJSON(fileName).done(function(data) {
        
        var rankColors = ['black','saddlebrown','silver','gold'];

        $.each(data.parties.parties, function (k, p) {
            if (k % 2 == 0) {
                console.log('y');
                
                $('#parties').append('<div class="row"></div>');
            }

            var s = 'Members: ';
            $.each(data.parties.parties[k].members, function(k, v) {
                s += v + ', ';
            });

            var card = `<div class='col-sm-6'>
            <div class='card bg-dark' data-toggle='modal' style='border-top: 7px solid ${rankColors[p.rank]};'>
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