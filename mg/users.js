/*
then for users, there's like a bunch of things to list
would only put total points, rank, and current party on the always-visible card
then the points breakdown and quest name list in this popup thing
for quests, would just do name/reward visible
and parties everything can be visible cuz there isnt much
*/

$(function(){

    var fileName = 'testfile35.json';
    var rankColors = ['black','saddlebrown','silver','gold'];

    $.getJSON(fileName).done(function(data) {


        $.each(data.users.users, function (k, u) {
            if (k % 4 == 0)                
                $('#parties').append('<div class="row"></div>');

            var card = `<div class='col-sm-3'>
            <div class='card bg-dark' data-toggle='modal' data-target='#extendedInfo' data-user='${u.name}' style='border-top: 7px solid ${rankColors[u.rank]};'>
            <div class='card-header'><b>${u.name}</b></div>
            <div class='card-body'>
            <p class='card-text'>Total points: ${u.totalPoints}</p>
            <p class='card-text'>Current party: <b>${u.currentParty || 'none'}</b></p>
            </div>
            </div>
            </div>`;

            $('.row:last').append(card);
        });
    });
    
    $('#extendedInfo').on('show.bs.modal', function (e) {
        var userId = $(e.relatedTarget).data('user');
        $('.modal-title').text('');
        $('.modal-body').text('');

        $.getJSON(fileName).done(function(data) {
            var key;
            $.each(data.users.users, function (k, v) {
                if (v.name == userId){
                    key = k;
                    return;
                } 
            });
            
            var user = data.users.users[key];
            $('.modal-title').text(user.name);
            
            $('.modal-body').append(`<p>Rank: ${user.rank}</p>`);
            $('.modal-body').append(`<p>Total Points: ${user.totalPoints}</p>`);
            
            function displayPoints(points, name) {
                if (points)
                    $('.modal-body').append(`<p class='ml-3 small'>${name} Points: ${Math.round(points)}</p>`);
            }
            displayPoints(user.easyPoints, 'Easy');
            displayPoints(user.normalPoints, 'Normal');
            displayPoints(user.hardPoints, 'Hard');
            displayPoints(user.insanePoints, 'Insane');
            displayPoints(user.extraPoints, 'Extra');
            displayPoints(user.storyboardPoints, 'Storyboard');
            displayPoints(user.skinPoints, 'Skin');
            displayPoints(user.backgroundPoints, 'Background');
            displayPoints(user.questPoints, 'Quest');
            displayPoints(user.modPoints, 'Mod');
            displayPoints(user.hostPoints, 'Host');

            $('.modal-body').append(`<p>Current Party: ${user.currentParty || 'none'}</p>`);

            if (user.completedQuests.length > 0) {
                $('.modal-body').append('<p>Compleated Quests: </p>');
                $.each(user.completedQuests, function(k, q){
                    $('.modal-body').append(`<p class='ml-3 small'>${q}</p>`);
                });
            }
        });
    });
});