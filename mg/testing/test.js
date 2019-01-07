const loki = require('lokijs');
const bm = require('./model/beatmap.js');
const bodyParser = require("body-parser");

var db = new loki('loki.json');

var express = require ("express");
var app = express();

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

app.use(express.static('..'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var beatmaps;

app.get("/maps", (req, res, next) => {
    res.json(beatmaps.data);
});

app.get("/editbeatmap/:mapId", (req, res) => {
    res.json(beatmaps.findOne({ $loki : parseInt(req.params.mapId) }));
});

app.get("/updatestatus/:mapId/:value", (req, res) => {
    console.log(req.params.mapId);
    console.log(req.params.value);
    var theMap = beatmaps.findOne({ $loki : parseInt(req.params.mapId)});
    theMap.status = req.params.value;
    res.json({});
    db.saveDatabase();
});

app.post('/newmap', (req, res) => {
    var beatmapVar = new bm.Beatmap(req.body.artist, req.body.title, req.body.host);

    var splits = req.body.difficulties.split(",");
    splits.forEach(task => {
        if(task.length > 0){
            beatmapVar.addTask(task);
        }
    });

    splits = req.body.locks.split(",");
    splits.forEach(task => {
        if(task.length > 0){
            beatmapVar.addCategoryLock(task);
        }
    });

    beatmaps.insert(beatmapVar);

    res.json({});
    db.saveDatabase();
});

db.loadDatabase({}, () => {
    beatmaps = db.getCollection('beatmaps');
    console.log(beatmaps)
});

