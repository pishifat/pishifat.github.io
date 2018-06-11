

var dbPropertyNames = Object.getOwnPropertyNames(db);


var dbArray = new Array();
var dbMapperNames = new Array();
var dbInfluences;
var dbInfluenceNames = new Array();


//Get rid of the duplicates

for(var i=0;i<dbPropertyNames.length;i++)
{
	var dbtempname = dbPropertyNames[i];
	var dbtempobject = db[''+dbtempname][0];
	
	if(dbtempname!==dbtempobject.username)
	{
		dbArray.push(dbtempobject);
		
	}
}

//Make a name portfolio

for(var i=0;i<dbArray.length;i++)
{
	dbMapperNames.push(dbArray[i].username);
	if(dbArray[i].alt!=null)
	{
		dbMapperNames.push(dbArray[i].alt);
	}
}

//Make an influences list
var dbInfluences = new Map();
for(var i=0;i<dbArray.length;i++)
{
	if(dbArray[i].influences==null) continue;
	
	for(var j=0;j<dbArray[i].influences.length;j++)
	{
		dbInfluences[dbArray[i].influences[j]]=1;
	}
}

dbInfluenceNames = Object.getOwnPropertyNames(dbInfluences);

//Check for missing individuals

for(var i=0;i<dbInfluenceNames.length;i++)
{
		var influence = dbInfluenceNames[i];
		var failed = true;
		
		for(var j=0;j<dbMapperNames.length;j++)
		{
			if(dbMapperNames[j]===influence)
			{
				failed = false;
				break;
			}
		}
		
		if(failed)
		{
			console.log(influence);
		}
}
