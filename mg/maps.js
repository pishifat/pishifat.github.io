/*
add commnas
diffs in card w/ username on hover | crossed out taken diffs | show all except maps.locked ( https://media.discordapp.net/attachments/332717696812711948/529928461360431110/unknown.png ) 
collapsable by quests/generalmaps/ranked
sizes (ranked like https://cdn.discordapp.com/attachments/332717696812711948/529927425384251406/unknown.png )
*/

$(function(){


    var fileName = 'testfile35.json';
    var newFaQuest = "Culprate Map Pack";

    $.getJSON(fileName).done(function(data){
        var totalNewFaCount = 0;
        var totalOldFaCount = 0;
        var wipNewFaCount = 0;
        var wipOldFaCount = 0;

        $.each(data.maps.beatmaps, function (k, b) {
            
            var isRanked = b.status == 'Ranked';
            var quest = b.quest == '' ? 'Others' : b.quest;
            var questId = quest.split(' ').join('') + (isRanked ? '-ranked' : '-pending');

            if (!$(`#${questId}`).length) {
                var questCollapse = `<a class='ml-3' data-toggle='collapse' href='#${questId}'>${quest}</a>
                    <div class="row">
                    <div id='${questId}' class='collapse show' id='questCollapse'></div>
                    </div>`;
                if (isRanked)
                    $('#rankedBeatmaps').append(questCollapse);
                else
                    $('#pendingBeatmaps').append(questCollapse);
            }

            $(`#${questId}`).append(`<div class='row' id='${b.id}'>`);

            var mapCard = 
                `<div class="col-sm-${isRanked ? '12' : '7'} my-2">
                <div class='card bg-dark border-status-${b.status.toLowerCase()}' data-toggle='modal' data-target='#editBeatmap' data-mapid='${b.id}'>
                <img class='card-img' src='${b.link !== '' ? `https://assets.ppy.sh/beatmaps/${ b.link.slice(b.link.lastIndexOf('/') - b.link.length) }/covers/card.jpg` : 'https://osu.ppy.sh/images/layout/beatmaps/default-bg.png'}' style='opacity:0.5' alt='ops'> 
                <div class='card-img-overlay'>
                <p class='card-title mb-1'>${b.artist} - ${b.title}</p>
                <small class='card-text'>Hosted by <b>${b.host}</b></small>
                </div>
                </div>
                </div>`;

            $(`#${b.id}`).append(mapCard);

            if (b.status != 'Ranked')
            {
                var diffsBlock = '<div class="col-sm-5 my-2">'; //style="background: linear-gradient(transparent 33%, rgba(31, 31, 31, 1) 33% 66%, transparent 66%);"
                var diffs = { 'Easy':'E', 'Normal':'N', 'Hard':'H', 'Insane':'I', 'Extra':'E' };
                
                $.each(diffs, function(d, v){
                    var isClaimed = false;
                    var isUsed = false;
    
                    $.each(b.tasks, function(k, t) {
                        if (d == t.name) {
                            var s = '';
                            $.each(t.mappers, function(k, m) {
                                s += m + ' | ';
                            });
                            diffsBlock += `<span class="diffs px-1 ${ t.status.toLowerCase() }" data-toggle="tooltip" title="${ s }">${ v }</span>`;
    
                            isClaimed = true;
                            isUsed = true;
                        }
                    });
    
                    $.each(b.categoriesLocked, function(k, c) {
                        if (d == c) {
                            if (isClaimed)
                                diffsBlock += `<span class="diffs px-1 blocked" style="opacity: 0.3";>${ v }</span>`;
                            else
                                diffsBlock += `<span class="diffs px-1 blocked">${ v }</span>`;
                            
                            isUsed = true;
                        }
                    });
    
                    if (!isUsed)
                        diffsBlock += `<span class="diffs px-1 aviable">${ v }</span>`;
                });
    
                diffsBlock += '</div>';
    
                $(`#${b.id}`).append(diffsBlock);
            }
        });

        $('[data-toggle="tooltip"]').tooltip()
    });
    
    $('#editBeatmap').on('show.bs.modal', function (event) {
        var id = $(event.relatedTarget).data('mapid');
        $('#editBeatmap .modal-title').text('');
        $('#difficulties').text('');

        $.getJSON(fileName).done(function(data) {
            var mapId;
            $.each(data.maps.beatmaps, function (k, v) {
                if (v.id == id){
                    mapId = k;
                    return;
                }
            });

            var map = data.maps.beatmaps[mapId];
            $('#editBeatmap .modal-title').text(`${map.artist} - ${map.title} (${map.host})`);
            $('#editBeatmap .modal-header').addClass('bg-' + map.status.toLowerCase());

            $.each(map.tasks, function(k, d){
                var diffs = `<p class='${ d.status.toLowerCase() }'> <button class='btn btn-mg'>-</button> ${d.name}: `;
                var mappers = map.tasks[k].mappers;
                $.each(mappers, function(k, v){
                    diffs += v + ', ';
                });
                diffs = diffs.slice(0, -2) + '</p>';
                $('#difficulties').append(diffs);
            });

            var bns = '<p>BNs: ';
            $.each(map.bns, function(k, b){
                bns += b + ' ';
            });
            bns += '</p>';
            $('#bns').html(`BNs: ${bns} <button class="btn btn-mg">+</button>`);
            
            $('#editBeatmap .modal-body').append(`<p>Quest: ${map.quest}</p>`);

            var bns = `<p>Modders (${ map.modders.length }): `;
            $.each(map.modders, function(k, v){
                bns += v + ' ';
            });
            bns += '</p>';
            $('#editBeatmap .modal-body').append(bns);
        });
    });
});