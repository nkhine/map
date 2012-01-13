function drawMap(paths) {
	var r = Raphael('map', 1000, 800);
	attributes = {
            fill: '#fff',
            stroke: '#3899E6',
            'stroke-width': 1,
            'stroke-linejoin': 'round'
        };	
	var arr = new Array();
	console.log(paths);

	var info = $(".countryinfo");
	var point = $("<div class='point' style='position:absolute; left:1000px; top:0px; display:none'><div class='close'></div></div>");
	$("#map").append(point);

	function exapandCountry(id, shortName) {
		var data = 'js/'+shortName+'/paths.js';
		var target = paths[shortName].name;
		
		document.getElementById("countryinfo").style.display = "none";
		document.getElementById(id).style.display = "none";
		$.ajax({
			url: 'js/'+shortName+'/paths.js',
			method:'get',
			dataType:'script',
			success:function(data){
				$("#map").empty();
				drawCountry(data);
				$(".point").css("display", "block");
			},
			error:function(){
				alert("There is no "+ target +" region data in " + data + "!");
			}
		});
	}
	
	for (var country in paths) {
		var obj = r.path(paths[country].path);
		
		obj.attr(attributes);
		arr[obj.id] = country;
		
		var countryinfo = $("<div id='"+obj.id+"' style='display:none;' class='country' ><img src='img/close.png' class='closeinfo' style='float:right;' /><p style='font-size:15px;'>Country Name:<a href='#' class='link' >"+paths[country].name+"</a></p></div>");
		var countryflag = $("<img src='flags/"+paths[country].name+".png' alt='There is no flag.' class='flag' />"); countryinfo.append(countryflag);
		var totalmembers = $("<p>Total members:"+paths[country].total_members+"</p>"); countryinfo.append(totalmembers);
		info.append(countryinfo);
		
		var region = $("<div id='"+country+"' class='regioninfo' style='display:none;'></div>");
		info.after(region);

		
		obj.hover(function(e){

			$("#countryinfo").css({"display": "none"});
			$(".country").css({"display": "none"});

			this.animate({
				fill: '#1669AD'
			}, 300);
			
			$("#countryinfo").css({"margin-left": e.pageX-10});
			$("#countryinfo").css({"margin-top": e.pageY-10});
			$("#countryinfo").css({"display": "block"});
			$("#"+this.id).css({"display": "block"});

			var id = this.id; var name = arr[this.id];
			//$("#" + this.id + " .flag").click( function(){ exapandCountry(id, name); });
			
			$(".closeinfo").click(function() { 
				$("#countryinfo").css({"display":"none"});
				$("#"+this.id).css({"display":"none"});			
			});			
		}, function(){
			this.animate({
				fill: attributes.fill
			}, 300);
		}).click(function(){
			exapandCountry(this.id, arr[this.id]);			
		});
		
		
		$('.point').find('.close').live('click', function(){
			var t = $(this),
			parent = t.parent('.point');
			parent.fadeOut(function(){
				parent.remove();
			});
			
			drawMap(paths);
			return false;
		});	
	}
	

}

function drawCountry(data) {
	var r = Raphael('map', 1000, 800);
	attributes = {
            fill: '#fff',
            stroke: '#3899E6',
            'stroke-width': 1,
            'stroke-linejoin': 'round'
        };	
	var arr = new Array();
	
	var info = $(".countryinfo");
	var point = $("<div class='point' style='position:absolute; left:1000px; top:0px; display:none'><div class='close'></div></div>");
	$("#map").append(point);
	
	for (var region in regions) {
		var obj = r.path(regions[region].path);
		obj.attr(attributes);
		arr[obj.id] = region;
		
		var region_area = document.getElementById(regions[region].shortName);
		var regioninfo = $("<div id='"+ regions[region].shortName+obj.id +"' style=' display:none; ' class=' region ' ><img src='img/close.png' class='closeinfo' style='float:right;' /><p style='font-size:15px;'>Region Name:<a href='#' class='link' >"+regions[region].name+"</a></p></div>");
		var countryflag = $("<img src='flags/"+regions[region].country+".png' alt='There is no flag.' />"); regioninfo.append(countryflag);
		var totalmembers = $("<p>Total members:"+regions[region].total_members+"</p>"); regioninfo.append(totalmembers);
		regioninfo.appendTo(region_area);
				
		obj.hover(function(e){
			$(".regioninfo").css({ "display": "none" });
			$(".region").css({ "display": "none" });		
			this.animate({
				fill: '#1669AD'
			}, 300);
			
			$("#" + regions[region].shortName).css({"margin-left": e.pageX-10});
			$("#" + regions[region].shortName).css({"margin-top": e.pageY-10});
			$("#" + regions[region].shortName).css({"display":"block"});
			$("#" + regions[region].shortName+this.id).css({"display":"block"});
			
			$(".closeinfo").click(function() { 
				$("#" + regions[region].shortName).css({"display":"none"});
				$("#" + regions[region].shortName+this.id).css({"display":"none"});			
			});
		}, function(){
			this.animate({
				fill: attributes.fill
			}, 300);
		});
		
	}	
}

