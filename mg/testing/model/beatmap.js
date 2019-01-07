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

    addTask(name){
        name = name.charAt(0).toUpperCase() + name.slice(1);
        this.tasks.push(new Task(name));
    }

    addCategoryLock(name){
        name = name.charAt(0).toUpperCase() + name.slice(1, -1);
        this.categoriesLocked.push(name);
    }

    
}

class Task
{
    constructor(name)
    {
        this.name = name;
        this.mappers = [];
        this.status = "WIP";
    }

}



module.exports = {Beatmap, Task};