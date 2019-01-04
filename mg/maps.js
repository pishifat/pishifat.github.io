/*
then for users, there's like a bunch of things to list
would only put total points, rank, and current party on the always-visible card
then the points breakdown and quest name list in this popup thing
for quests, would just do name/reward visible
and parties everything can be visible cuz there isnt much


add commnas
diffs in card w/ username on hover | crossed out taken diffs | show all except maps.locked ( https://media.discordapp.net/attachments/332717696812711948/529928461360431110/unknown.png ) 
collapsable by quests/generalmaps/ranked
sizes (ranked like https://cdn.discordapp.com/attachments/332717696812711948/529927425384251406/unknown.png )
*/

$(function(){


    var fileName = 'testfile35.json';
    var newFaQuest = "Culprate Map Pack";

    console.log('start');
    $.getJSON(fileName, function(){
        console.log('loaded');
    })
    .done(function(data){
        var totalNewFaCount = 0;
        var totalOldFaCount = 0;
        var wipNewFaCount = 0;
        var wipOldFaCount = 0;

        $.each(data.maps.beatmaps, function (k, b) {
            
            var mapCard = 
                `<div class='card bg-dark text-white ${ b.status == 'WIP' ? 'border-status-wip' : 'border-status-done' }' data-toggle='modal' data-target='#extendedInfo' data-mapid='${b.id}'>
                <img class='card-img' src='${b.link !== "" ? `https://assets.ppy.sh/beatmaps/${ b.link.slice(b.link.lastIndexOf('/') - b.link.length) }/covers/card.jpg` : 'https://osu.ppy.sh/images/layout/beatmaps/default-bg.png'}' style='opacity:0.5' alt='ops'> 
                <div class='card-img-overlay'>
                <h5 class='card-title'>${b.artist} - ${b.title}</h5>
                <p class='card-text'>Hosted by ${b.host}</p>
                </div>
                </div>`;

            $('#maps').append(mapCard);

            var p = '<p>';
            var diffs = ['Easy', 'Normal', 'Hard', 'Insane', 'Extra'];
            $.each(diffs, function(k, d){
                var isClaimed = false;
                var isUsed = false;

                $.each(b.tasks, function(k, t) {
                    if (d == t.name) {
                        var s = '';
                        $.each(t.mappers, function(k, m) {
                            s += m + ' | ';
                        });
                        p += `<i data-toggle="tooltip" data-placement="top" title="${ s }" style='color: ${ t.status == 'WIP' ? 'yellow' : 'green' };'>${ t.name }</i>`;

                        isClaimed = true;
                        isUsed = true;
                    }
                });

                $.each(b.categoriesLocked, function(k, c) {
                    if (d == c) {
                        if (isClaimed)
                            p += `<i style='color: grey;' opacity: 0.3;>${ c }</i>`;
                        else
                            p += `<i style='color: grey;'>${ c }</i>`;
                        
                        isUsed = true;
                    }
                });

                if (!isUsed)
                    p += `<i style='color: red;'>${ d }</i>`;
            });

            p += '</p>';

            if (b.status == 'Ranked')
                $('#rankedBeatmaps').append(p);
            else
                $('#diffs').append(p);
        });

        $('#newFaCount').text(`(${wipNewFaCount} WIPs of ${totalNewFaCount})`);
        $('#oldFaCount').text(`(${wipOldFaCount} WIPs of ${totalOldFaCount})`);
    });
    
    $('#extendedInfo').on('show.bs.modal', function (event) {
        var id = $(event.relatedTarget).data('mapid');
        $('.modal-title').text('');
        $('.modal-body').text('');

        $.getJSON(fileName, function(){
            console.log('loaded');
        })
        .done(function(data){
            var key;
            $.each(data.maps.beatmaps, function (k, v) {
                if (v.id == id){
                    key = k;
                    return;
                } 
            });
            console.log(key);
            console.log(data.maps.beatmaps[key].title);
            var map = data.maps.beatmaps[key];
            $('.modal-title').text(`${map.artist} - ${map.title} (${map.host})`);

            console.log(map.status);
            if (map.status == 'WIP') {
                $('.modal-header').removeClass('bg-success');
                $('.modal-header').addClass('bg-warning');
            } else {
                $('.modal-header').removeClass('bg-warning');
                $('.modal-header').addClass('bg-success');
            }

            $.each(map.tasks, function(k, v){
                var s = `<p class='${ v.status == 'WIP' ? 'text-warning' : 'text-success' }'>${v.name}: `;
                var mappers = map.tasks[k].mappers;
                $.each(mappers, function(k, v){
                    if (k == (mappers.length - 2))
                        s += v + ' & ';
                    else
                        s += v;
                });
                s += '</p>';
                $('.modal-body').append(s);
            });

            var s = '<p>BNs: ';
            $.each(map.bns, function(k, v){
                s += v + ' ';
            });
            s += '</p>';
            $('.modal-body').append(s);
            
            $('.modal-body').append(`<p>Quest: ${map.quest}</p>`);

            var s = `<p>Modders (${ map.modders.length }): `;
            $.each(map.modders, function(k, v){
                s += v + ' ';
            });
            s += '</p>';
            $('.modal-body').append(s);
        });
    });

    $('[data-toggle="tooltip"]').tooltip();

});