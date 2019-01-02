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
        var totalUsers = 0;

        $.each(data.users.users, function (k, v) {
            var card = `<div class='card bg-light' data-toggle='modal' data-target='#extendedInfo' data-user='${v.name}'>
            <div class='card-header'>Points: ${v.totalPoints}</div>
            <div class='card-body'>
            <h5 class='card-title'>${v.name}</h5>
            <h6 class='card-subtitle text-muted'>Rank: ${v.rank}</h6>
            <p class='card-text'>Party: ${v.currentParty}</p>
            </div>
            </div>`;

            $('.card-columns').append(card);
            totalUsers++;
        });

        $('#count').text(`(${totalUsers})`);
    });
    
    $('#extendedInfo').on('show.bs.modal', function (event) {
        var userClicked = $(event.relatedTarget).data('user');
        $('.modal-title').text('');
        $('.modal-body').text('');

        $.getJSON(fileName, function(){
            console.log('loaded');
        })
        .done(function(data){
            var key;
            $.each(data.users.users, function (k, v) {
                if (v.name == userClicked){
                    key = k;
                    return;
                } 
            });
            console.log(key);
            var user = data.users.users[key];
            $('.modal-title').text(user.name);

            var s = '<p>Compleated Quests: ';
            if (user.completedQuests.length > 0) {
                $.each(user.completedQuests, function(k, v){
                    s += v + ' ';
                });
            } else {
                s += 'None';
            }
            s += '</p>';
            $('.modal-body').append(s);
            
            $('.modal-body').append(`<p>Rank: ${user.rank}</p>`);
            $('.modal-body').append(`<p>Current Party: ${user.currentParty}</p>`);
            $('.modal-body').append(`<p>Total Points: ${user.totalPoints}</p>`);
            $('.modal-body').append(`<p>easyPoints: ${user.easyPoints}</p>`);
            $('.modal-body').append(`<p>normalPoints: ${user.normalPoints}</p>`);
            $('.modal-body').append(`<p>hardPoints: ${user.hardPoints}</p>`);
            $('.modal-body').append(`<p>insanePoints: ${user.insanePoints}</p>`);
            $('.modal-body').append(`<p>extraPoints: ${user.extraPoints}</p>`);
            $('.modal-body').append(`<p>storyboardPoints: ${user.storyboardPoints}</p>`);
            $('.modal-body').append(`<p>backgroundPoints: ${user.backgroundPoints}</p>`);
            $('.modal-body').append(`<p>skinPoints: ${user.skinPoints}</p>`);
            $('.modal-body').append(`<p>questPoints: ${user.questPoints}</p>`);
            $('.modal-body').append(`<p>modPoints: ${user.modPoints}</p>`);
            $('.modal-body').append(`<p>hostPoints: ${user.hostPoints}</p>`);
        });
    });
});