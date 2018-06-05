$(document).ready(function (){
	$("#submitUser").submit(function(e){
		e.preventDefault();
		var input = $("#user").val();
		
		$.each(db, function(i, val){
			if (val[0].username.toLowerCase() === input.toLowerCase()){
				input = val[0].username;
				return false;
			}else if (typeof val[0].alt !== "undefined"){
				if (val[0].alt.toLowerCase() === input.toLowerCase()){
					input = val[0].alt;
					return false;
				}
			}
		});
		var user = db[input];
		if (user != null){
			$(".treeview").prepend(createLi(user[0], "rgb(33, 37, 41)"));
			if (typeof user[0].none !== "undefined"){
				var $ul = $("<ul>");
				var text = "";
				if (user[0].none == "none")
					text = "Noone...";
				else
					text = "iNiS";
					
				$ul.append(createNoneLi(text));
				$(".treeview").children("li").first().append($ul);
			}else if (user[0].influences.length > 0){
				var $ul = $("<ul>");
				var influences = makeInfluences(user[0].influences);
				
				$.each(influences, function(i, influence){
					$ul.append(createLi(influence, getNewColor("rgb(33, 37, 41)")));
				});
				$(".treeview").children("li").first().append($ul);
			}else{
				createAlert("No extra info from "+ user[0].username);
			}
		}else{
			createAlert("User not found");
		}

		$("#user").val("");
		$(".box").popover({
			container: 'body',
			//trigger: 'focus',
		});
	});

	function createLi(user, previousColor){
	
		var newColor = getNewColor(previousColor);
	
		var $flag = $("<span>", {
			"class" : "flag-icon flag-icon-"+user.country.toLowerCase()
		});
	
		var $linkIcon = $("<i>", {
			"class" : "fas fa-angle-double-right"
		});
	
		var $profileLink = $("<a>", {
			"href" : "https://osu.ppy.sh/users/"+user.userId+"#beatmaps",
			"target" : "'_blank",
			"class" : "profileLink",
			"style" : "display:none",
		});
	
		$profileLink.append($linkIcon);
	
		//var username = $(this).siblings("span").text().trim();
		var mentioners = [];		
		$.each(db, function(i, userVal){
			$.each(userVal[0].influences, function(i, influence){
				if (influence == user.username){
					mentioners.push(userVal[0].username);
				}
			});
		});
		mentioners.sort();
		var actualMentioners = [];
		for (var i = 0; i < mentioners.length; i++) {
			if (mentioners[i] == mentioners[i+1]){
				actualMentioners.push(mentioners[i]);
			}
		}
		
		var $mentions = $("<i>", {
			"class" : "small box",
			"text" : " ("+user.mentions+" mentions)",
			"style" : "display:none",
			"data-toogle" : "popover",
			"data-trigger" : "focus",
			"data-content" : actualMentioners.join(", "),
			"tabindex" : "0",
			"title" : "Mentioned by",
		});
		
		var $text = $("<span>", {
			"class" : "li-text",
			"text" : " "+user.username+" ",
			"click" : function(e){
				e.stopPropagation();
				if ($(this).parent().children("ul").length > 0){
					$(this).parent().children("ul").slideToggle("fast");
				}else{
					if (typeof db[user.username][0].none !== "undefined"){
						var $ul = $("<ul>");
						var text = "";
						if (user[0].none == "none")
							text = "Noone...";
						else
							text = "iNiS";
	
						$ul.append(createNoneLi(text));
						$(this).closest("li").append($ul);
					}else if (db[user.username][0].influences.length > 0){
						var $ul = $("<ul>");
						var influences = makeInfluences(db[user.username][0].influences);
						
						$.each(influences, function(i, influence){
							$ul.append(createLi(influence, newColor));
						});
						$(this).closest("li").append($ul).slideDown("fast");
					}else{
						createAlert("No info from "+ user.username);
					}
				}
	
			}
		});
	
		var $li = $("<li>", {
			"style" : "color:"+newColor,
			"mouseover" : function(e){
				e.stopPropagation();
				$(this).children("a").show();
				$(this).children("i").show();
			},
			"mouseout" : function(e){
				e.stopPropagation();
				$(this).children("a").hide();
				$(this).children("i").hide();
			}
		});
	
		$li.prepend($flag);
		$li.append($text);
		$li.append($profileLink);
		$li.append($mentions);
	
		return $li;
	}
	
	function createNoneLi(text){
		var $text = $("<span>", {
			"class" : "li-text",
			"text" : " "+text+" ",
		});
	
		var $li = $("<li>", {
			"style" : "color:rgb(33, 37, 41)"
		});
	
		$li.append($text);
	
		return $li;
	}
	
	function makeInfluences(userIds){
		var $arrLi = [];
	
		$.each(userIds, function(i, userId){
			$arrLi.push(db[userId][0]);
		});
	
		return $arrLi;
	}
	
	function getNewColor(color){	
		switch(color){
			case "rgb(33, 37, 41)":
				return "rgb(33, 37, 40)";
			case "rgb(33, 37, 40)":
				return "rgb(125, 0, 0)";
			case "rgb(125, 0, 0)":
				return "rgb(175, 55, 0)";
			case "rgb(175, 55, 0)":
				return "rgb(186, 121, 0)";
			case "rgb(186, 121, 0)":
				return "rgb(34, 147, 25)";
			case "rgb(34, 147, 25)":
				return "rgb(0, 112, 100)";
			case "rgb(0, 112, 100)":
				return "rgb(69, 52, 119)";
			case "rgb(69, 52, 119)":
				return "rgb(196, 90, 147)";
			case "rgb(196, 90, 147)":
				return "rgb(125,0,0)";				
			default:
				return "rgb(125, 0, 0)";
		}
	}
	
	function createAlert(message){
		var $div = $("<div>", {
			"id" : "infoBox",
			"class" : "alert alert-warning alert-dismissible fade show alert-fixed",
			"text" : message
		});
	
		var $button = $("<button>", {
			"type" : "button",
			"class" : "close",
			"data-dismiss" : "alert"
		});
	
		var $span = $("<span>", {
			"html" : "&times;"
		});
	
		$button.append($span);
		$div.append($button);
	
		$div.appendTo("body").fadeTo(1200, 1).slideUp(500, function(){
			$(this).alert("close")
		});
	}
});