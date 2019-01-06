function addNewMap(){
    $.post("http://localhost:3000/newmap", {"artist": "aaaaa", "title": "bbbbbb", "host": "asdf"})
}

$(function(){

    var fileName = 'testfile35.json';
    var newFaQuest = "Culprate Map Pack";
    var testing = true;
    
    $.getJSON(testing ? '/maps' : fileName).done(function(data){

        $.each(testing ? data : data.maps.beatmaps, function (k, b) {

            var isRanked = b.status == 'Ranked';
            var quest = b.quest || 'Others';
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

            $(`#${questId}`).append(`<div class='row' id='${testing ? b.$loki : b.id}'>`);

            var mapCard = 
                `<div class="col-sm-${isRanked ? '12' : '7'} my-2">
                <div class='card bg-dark border-status-${b.status.toLowerCase()}' data-toggle='modal' data-target='#editBeatmap' data-mapid='${testing ? b.$loki : b.id}'>
                <img class='card-img' src='${b.link !== '' ? `https://assets.ppy.sh/beatmaps/${ b.link.slice(b.link.lastIndexOf('/') - b.link.length) }/covers/card.jpg` : 'https://osu.ppy.sh/images/layout/beatmaps/default-bg.png'}' style='opacity:0.5' alt='ops'> 
                <div class='card-img-overlay'>
                <p class='card-title mb-1'>${b.artist} - ${b.title}</p>
                <small class='card-text'>Hosted by <b>${b.host}</b></small>
                </div>
                </div>
                </div>`;

            $(`#${testing ? b.$loki : b.id}`).append(mapCard);

            if (!isRanked)
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
                        diffsBlock += `<span class="diffs px-1 open">${ v }</span>`;
                });
    
                diffsBlock += '</div>';
    
                $(`#${testing ? b.$loki : b.id}`).append(diffsBlock);
            }
        });

        $('[data-toggle="tooltip"]').tooltip();
        $('[data-toggle="popover"]').popover();
    });
    
    $('#editBeatmap').on('show.bs.modal', function (e) {
        var id = $(e.relatedTarget).data('mapid');
        $('#editBeatmap .modal-title').text('');
        $('#difficulties').text('');

        $.getJSON(testing ? '/editbeatmap/'+id : fileName).done(function(map) {
            
            if (!testing) {
                var mapId;
                $.each(map.maps.beatmaps, function (k, v) {
                    if (v.id == id){
                        mapId = k;
                        return;
                    }
                });
    
                map = map.maps.beatmaps[mapId];
            }

            $('#editBeatmap .modal-title').text(`${map.artist} - ${map.title} (${map.host})`);
            $('#editBeatmap .modal-header').addClass('bg-' + map.status.toLowerCase());

            var visualTasks = ['Skin', 'Storyboard', 'Background'];

            $.each(map.tasks, function(k, t){
                var mappers = '';
                $.each(t.mappers, function(k, v){
                    mappers += v + ', ';
                });
                mappers = mappers.slice(0, -2);

                var i = visualTasks.indexOf(t.name);
                if (i == -1) {
                    $('#difficulties').prepend(`<p class='${ t.status.toLowerCase() } ml-3 small'> <button class='btn btn-mg-used btn-sm'>-</button> ${t.name}: ${mappers} </p>`);
                } else {
                    var button = '<button class="btn btn-mg-used btn-sm">+</button>';
                    switch (i) {
                        case 1:
                            $('#skin').html(button + ' Skin:' + mappers);
                            break;
                        case 2:
                            $('#sb').html(button + ' Storyboard:' + mappers);
                            break;
                        case 3:
                            $('#bg').html(button + ' Background:' + mappers);
                            break;
                    }                
                }
            });
            
            $('#quest').html(`<p>Quest: ${map.quest} <button class="btn btn-mg${map.quest.length ? '-used' : ''} btn-sm">${map.quest.length ? '-' : '+'}</button></p>`);

            var modders = '';
            $.each(map.modders, function(k, v){
                modders += v + ', ';
            });
            modders = modders.slice(0, -2);
            $('#modders').html(`<p>Modders <b>(${map.modders.length})</b>: ${modders} <button class="btn btn-mg btn-sm">+</button></p>`);

            var bns = '';
            $.each(map.bns, function(k, b){
                bns += b + ', ';
            });
            bns = bns.slice(0, -2);
            $('#bns').html(`<p>BNs: ${bns} <button class="btn btn-mg btn-sm">+</button>`);

            $.each(map.categoriesLocked, function(k, c){
                $('#lockedDiffs').prepend(`<p><button class='btn btn-mg-used btn-sm'>-</button> ${c}</p>`);
            });
        });
    });

    $("#newmap").click(addNewMap);
    
});



