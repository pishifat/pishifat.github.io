var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('in.txt')
});

lineReader.on('line', function (line) {
  var a = line.split(",");
  var user_id = a[2];
  var mentions = a[4];
  var username = a[5];
  var country = a[6];
  var influence1 = a[7];
  var influence2 = a[8];
  var influence3  = a[9];
  var none_DSdev = a[10];
  var alt_name = a[11];
  var xcoord = a[15];
  var ycoord = a[16];
  
  
  
var influences = '"influences":[';
	if (influence1!==""){
		influences += '"' + influence1 + '"';
	}
	if (influence2!==""){
		influences += ',"' + influence2 + '"';
			if (influence3!==""){
				influences += ',"' + influence3 + '"';
			}
	}
	influences += "]";

 var what = false;
 
 var result = '"userId":"' + user_id + '","mentions":"' + mentions + '","username":"' + username + '","country":"' + country + '",' + influences;
 if(none_DSdev!==""){
	 what=true;
	 result+= ',"none":"' + none_DSdev;
	 if(alt_name!==""){
		result+= '","alt":"' + alt_name + '"';
	 }else{
		 result+='"';
	 }
 }
 
  if(alt_name!=="" && what==false){
	 result+= ',"alt":"' + alt_name + '"';
 }
 
   if(xcoord!==""){
	 result+= ',"xcoord":"' + xcoord + '","ycoord":"' + ycoord + '"';
 }

 
 
 result+= '}];';

 
var dataStart = 'db["' + username + '"]=db["' + user_id + '"]=[{' + result;
 
  /*if (alt_name!==""){
	var altStart = 'db["' + alt_name + '"]=[{' + result;
	console.log(altStart);
 }*/
 
 var dataStart = 'db["' + username + '"]=db["' + user_id + '"]=';
 
 
 if (alt_name!==""){
    dataStart += 'db["' + alt_name + '"]=[{' + result;
	
 
	console.log(dataStart);}
	else{
			console.log(dataStart += '[{' + result);
	}

});

