/*
then for users, there's like a bunch of things to list
would only put total points, rank, and current party on the always-visible card
then the points breakdown and quest name list in this popup thing
for quests, would just do name/reward visible
and parties everything can be visible cuz there isnt much
*/

$(function(){

    var fileName = 'testfile35.json';

    console.log('start');
    $.getJSON(fileName, function(){
        console.log('loaded');
    })
    .done(function(data){
        var totalParties = 0;

        $.each(data.parties.parties, function (k, v) {
            
            var s = 'Members: ';
            $.each(data.parties.parties[k].members, function(k, v) {
                s += v + ' ';
            });

            var card = `<div class='card bg-light' data-toggle='modal'>
            <div class='card-header'>${v.name} (Rank: ${v.rank})</div>
            <div class='card-body'>
            <h5 class='card-title'>${v.currentQuest}</h5>
            <p class='card-text'>${s}</p>
            </div>
            </div>`;

            $('.card-columns').append(card);
            
            totalParties++;
        });

        $('#count').text(`(${totalParties})`);
    });

});