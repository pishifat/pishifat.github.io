$(function(){
    var fileName = 'testfile35.json';

    $.getJSON(fileName).done(function(data) {

        $.each(data.quests.quests, function (k, q) {
            if (k % 2 == 0)
                $('#quests').append('<div class="row"></div>');

            var button;
            if (q.status == 'open') 
                button = '<button class="btn btn-mg float-right">Accept</button>'
            // else if (q.assignedParty == user.party.currentyQuest) button = '<button class="btn btn-mg">Drop</button>'

            var card = `<div class='col-sm-6'>
            <div class='card bg-dark border-status-${q.status.toLowerCase()}'>
            <div class='card-header'>${q.name} ${button || ''}</div>
            <div class='card-body'>
            <p class='card-text'>Reward: ${q.reward}</p>
            <p class='card-text'>Description: ${q.description}</p>
            <p class='card-text'>Party size: ${q.minParty}-${q.maxParty}</p>
            <p class='card-text'>Required rank: ${q.minRank}</p>
            <p class='card-text'>Current party: <b>${q.assignedParty || 'none'}</b></p>
            </div>
            </div>
            </div>`;

            $('.row:last').append(card);
        });
    });
});