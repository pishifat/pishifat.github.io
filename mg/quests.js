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
        var totalOpened = 0;

        $.each(data.quests.quests, function (k, v) {
            
            var card = `<div class='card text-white'>
            <div class='card-header'>${v.name} (Reward: ${v.reward})</div>
            <div class='card-body'>
            <h5 class='card-title'>${v.status}</h5>
            <p class='card-text'>${v.description}</p>
            </div>
            </div>`;

            $('.card-columns').append(card);
            
            if (v.status == 'open') {
                totalOpened++;
                $('.card:last').addClass('bg-primary');
            } else {
                $('.card:last').addClass('bg-success');
            }
        });

        $('#count').text(`(${totalOpened})`);
    });
});