const loki = require('lokijs');

var db = new loki('loki.json');

var beatmaps = db.addCollection('beatmaps');

beatmaps.insert({
    "id": 3,
    "artist": "Culprate",
    "title": "Whispers (Part II)",
    "host": "Milan-",
    "tasks": [{
            "name": "Insane",
            "mappers": ["Milan-"],
            "status": "Done"
        }
    ],
    "status": "Done",
    "bns": ["pishifat", "BOUYAAA"],
    "quest": "",
    "modders": ["NeilPerry", "Sing", "Niva", "pishifat", "BOUYAAA"],
    "link": "https://osu.ppy.sh/beatmapsets/848837",
    "allLocked": false,
    "categoriesLocked": []
})
beatmaps.insert({
    "id": 4,
    "artist": "Culprate",
    "title": "Mechanic Heartbeat",
    "host": "pishifat",
    "tasks": [{
            "name": "Extra",
            "mappers": ["pishifat"],
            "status": "Done"
        }, {
            "name": "Insane",
            "mappers": ["jonathanlfj"],
            "status": "Done"
        }, {
            "name": "Hard",
            "mappers": ["Sinnoh"],
            "status": "Done"
        }, {
            "name": "Easy",
            "mappers": ["Chaoslitz"],
            "status": "Done"
        }, {
            "name": "Normal",
            "mappers": ["pishifat"],
            "status": "Done"
        }
    ],
    "status": "Done",
    "bns": ["Mirash", "Hobbes2"],
    "quest": "Culprate Map Pack",
    "modders": ["Niva", "Hinsvar", "Mirash"],
    "link": "https://osu.ppy.sh/beatmapsets/876227",
    "allLocked": false,
    "categoriesLocked": []
})
beatmaps.insert({
    "id": 5,
    "artist": "cYsmix",
    "title": "Little Knight",
    "host": "Sonnyc",
    "tasks": [{
            "name": "Insane",
            "mappers": ["Sonnyc"],
            "status": "Done"
        }, {
            "name": "Hard",
            "mappers": ["Sonnyc"],
            "status": "Done"
        }, {
            "name": "Easy",
            "mappers": ["Sonnyc"],
            "status": "Done"
        }, {
            "name": "Normal",
            "mappers": ["Left"],
            "status": "Done"
        }, {
            "name": "Background",
            "mappers": ["Noffy"],
            "status": "Done"
        }
    ],
    "status": "Done",
    "bns": ["pishifat"],
    "quest": "",
    "modders": ["pishifat"],
    "link": "https://osu.ppy.sh/beatmapsets/791845",
    "allLocked": false,
    "categoriesLocked": []
})

db.saveDatabase();