const loki = require('lokijs');

var db = new loki('loki.json');

var beatmaps;

db.loadDatabase({}, () => {
    beatmaps = db.getCollection('beatmaps');
    console.log(beatmaps);
});

