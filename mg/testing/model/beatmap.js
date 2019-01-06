class Beatmap
{
    constructor(artist, title, host)
    {
        this.artist = artist;
        this.title = title;  	
        this.host = host;

        this.tasks = [];
        this.status = "WIP";
        this.bns = [];
        this.quest = "";
        this.modders = [];
        this.link = "";

        this.categoriesLocked = [];
    }
}



module.exports = {Beatmap};