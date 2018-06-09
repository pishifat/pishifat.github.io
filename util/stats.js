$(document).ready(function() {
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })

    $.each(db, function (i, val){
        if (val[0].mentions > 0){
            if (val[0].country != "")
                $("#"+val[0].country).css("fill", "aliceblue");
        }
    });

    $("path").mouseenter(function (e){
        var path = $(this);
        var users = [];
        $.each(db, function (i, val){
            if (val[0].country == path.attr("id"))
                users.push(val[0]);
        });
        var aux = 0;
        var mostMentioned = "";
        $.each(users, function (i, val){
            if (val.mentions > aux){
                aux = parseInt(val.mentions);
                mostMentioned = val.username;
            }
        });
        if (aux != 0){
            path.attr("data-toggle", "tooltip");
            path.attr("title", mostMentioned+" ("+aux+" mentions)");
            $("#"+path.attr("id")).tooltip("show");
        }
    });
});