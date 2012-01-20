var city_attr_fir = {
					fill: "#45f",
					stroke: "none",
					opacity: .6
				};
var city_attr_sec = {
					fill: "#9a4",
					stroke: "none",
					opacity: .6
				};
var city_attr_thi = {
					fill: "#932",
					stroke: "none",
					opacity: .6
				};
var city_attr_for = {
					fill: "#b51",
					stroke: "none",
					opacity: .6
				};
var city_attr_fiv = {
					fill: "#0f0",
					stroke: "none",
					opacity: .6
				};

function drawMap(paths) {
	firstX = 0;
	firstY = -15;
	
	mapWidth = 600;
	mapHeight = 400;
	
	var r = Raphael('world_map', mapWidth, mapHeight);	// resizing a world map
  r.setViewBox(firstX,firstY,1000,600); 
  
  // non displaying contenient map and country map
  
	$('#contenient_map').hide();
  $('#country_map').hide();
	
	var mapZoom = 1;
	var firstSetWidth = 1000;
	var firstSetHeight= 600;

  var maxIcon = $('.plus');
  var minIcon = $('.minus');
  var zoomInterval = 30;
  var mapRate = firstSetHeight/firstSetWidth;
 
  maxIcon.click(function(e) {
   
 	mapZoom=mapZoom + 0.2;
    firstX = firstX + mapZoom *zoomInterval;
//    firstY = firstY + mapZoom *zoomInterval*mapRate ;
    firstSetWidth = firstSetWidth - 2*mapZoom*zoomInterval;
    firstSetHeight = firstSetHeight- 2*mapZoom*zoomInterval * mapRate;
    r.setViewBox(firstX,-15, firstSetWidth, firstSetHeight);
    e.stopPropagation();
    e.preventDefault();
});

minIcon.click(function(e) {
    if (mapZoom < 1) return;

    firstX = firstX - mapZoom *zoomInterval;
//    firstY = firstY - mapZoom *zoomInterval*mapRate ;
   	firstSetWidth = firstSetWidth + 2*mapZoom*zoomInterval;
    firstSetHeight = firstSetHeight+ 2*mapZoom*zoomInterval * mapRate;
    r.setViewBox(firstX,firstY, firstSetWidth, firstSetHeight);
		mapZoom=mapZoom - 0.2; 
    e.stopPropagation();
    e.preventDefault();
});
 
	attributes = {
            fill: '#fff',
            stroke: '#3899E6',
            'stroke-width': 1,
            'stroke-linejoin': 'round'
        };	
	var arr = new Array();
	var info = $(".countryinfo");
	var point = $("<div class='point' style='position:absolute; left:1000px; top:0px; display:none'><div class='close'></div></div>");
	$("#world_map").append(point);
	
	var box_arr_cx = new Array();
	var box_arr_cy = new Array();
	var box_arr_radius = new Array();
	var box_arr_attr = new Array();
	for (var country in paths) {
		var obj = r.path(paths[country].path);
		bbox = obj.getBBox();
		if(paths[country].total_members)
		{
			box_arr_cx[country] = bbox.x + bbox.width/2;;
			box_arr_cy[country] = bbox.y + bbox.height/2;;
			if(paths[country].total_members < 100){
				box_arr_radius[country] = 5;
				box_arr_attr[country] = city_attr_fir;
			}
			else if(paths[country].total_members < 500)
			{
				  box_arr_radius[country] = 10;
				  box_arr_attr[country] = city_attr_sec;
				}
			else if(paths[country].total_members < 1000)
				{
				  box_arr_radius[country] = 15;	
				  box_arr_attr[country] = city_attr_thi;
				}
			else if(paths[country].total_members < 2000)
				{
				  box_arr_radius[country] = 20;
				  box_arr_attr[country] = city_attr_for;
				}
			else 
				{
					box_arr_radius[country] = 25;
					box_arr_attr[country] = city_attr_fiv;		
				}    
		}
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
			$("#countryinfo").css({"margin-top": e.pageY-80});
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
			exapandContenient(this.id, arr[this.id]);			
		});
		
		
		$('.point').find('.close').live('click', function(){
			var t = $(this),
			parent = t.parent('.point');
			parent.fadeOut(function(){
				parent.remove();
			});

			return false;
		});	
	}
	
	for (var country in paths) {
		
		r.circle(box_arr_cx[country],box_arr_cy[country], box_arr_radius[country]).attr(box_arr_attr[country]);
		
		}
		
}

///////  continient draw
function drawContinient(data,cont_target) {
	$("#world_map").find('svg').remove();
	//drawing continent map
	$('#contenient_map').show();
	//firstX = 10;
  //	firstY = 10;
	var r_contenient = Raphael('world_map', 600, 400);
	
	var mapZoom = 1;
	var firstSetWidth = 0 ;
	var firstSetHeight= 0;

  var maxIcon = $('#world_map .plus');
  var minIcon = $('#world_map .minus');

	$("#cont_txt").text(cont_target);
		switch(cont_target){
		case 'Asia':
			 firstX = 550;
			 firstY = 30;
			 firstSetWidth = 440 ;
			 firstSetHeight= 200; 
		break;
		case 'Africa':
			 firstX = 350;
			 firstY = 130;
			 firstSetWidth = 350 ;
			 firstSetHeight= 200; 
		break;
		case 'Europe':
			 firstX = 400;
			 firstY = 30;
			 firstSetWidth = 230 ;
			 firstSetHeight= 90; 
		break;
		case 'North America':
			 firstX = 0;
			 firstY = 10;
			 firstSetWidth = 340 ;
			 firstSetHeight= 180; 
		break;
		case 'South America':
			 firstX = 180;
			 firstY = 170;
			 firstSetWidth = 200 ;
			 firstSetHeight= 220; 
		break;
		case 'Australia':
			 firstX = 800;
			 firstY = 200;
			 firstSetWidth = 140 ;
			 firstSetHeight= 200; 
		break;
		default:
		break;
		}
	r_contenient.setViewBox(firstX,firstY,firstSetWidth,firstSetHeight);
	
  var zoomInterval = 5;
  var mapRate = 2/3;	
  
	maxIcon.click(function(e) {
    mapZoom=mapZoom + 0.2;

//    firstX = firstX + mapZoom *zoomInterval;
//    firstY = firstY + mapZoom *zoomInterval*mapRate ;
		if(firstSetWidth > 2*mapZoom*zoomInterval)
    	firstSetWidth = firstSetWidth - 2*mapZoom*zoomInterval;
    if(firstSetHeight > 2*mapZoom*zoomInterval * mapRate)
    	firstSetHeight = firstSetHeight- 2*mapZoom*zoomInterval * mapRate;
    r_contenient.setViewBox(firstX, firstY, firstSetWidth, firstSetHeight);
    e.stopPropagation();
    e.preventDefault();
	});

	minIcon.click(function(e) {
	   if (mapZoom == 1) return;
	   	
//    firstX = firstX - mapZoom *zoomInterval;
//    firstY = firstY - mapZoom *zoomInterval*mapRate ;
	   	firstSetWidth = firstSetWidth + 2*mapZoom*zoomInterval;
	    firstSetHeight = firstSetHeight+ 2*mapZoom*zoomInterval * mapRate;
	    r_contenient.setViewBox(firstX , firstY, firstSetWidth, firstSetHeight);

			mapZoom=mapZoom - 0.2; 
	    e.stopPropagation();
	    e.preventDefault();
	});		 

	var arr = new Array();
	
	var info = $(".countryinfo");
	var point = $("<div class='point' style='position:absolute; left:1000px; top:0px; display:none'><div class='close'></div></div>");
	$("#country_map").append(point);
	
		var city_attr = {
					fill: "#0f0",
					stroke: "none",
					opacity: .6
				};
		var box_arr_cx = new Array();
		var box_arr_cy = new Array();
		var box_arr_radius = new Array();
		var box_arr_attr = new Array();
		for (var country in paths) {
		var obj = r_contenient.path(paths[country].path);
		bbox = obj.getBBox();
		if(paths[country].total_members)
		{
			box_arr_cx[country] = bbox.x + bbox.width/2;;
			box_arr_cy[country] = bbox.y + bbox.height/2;;
			if(paths[country].total_members < 100){
				box_arr_radius[country] = 1;
				box_arr_attr[country] = city_attr_fir;
			}
			else if(paths[country].total_members < 500)
			{
				  box_arr_radius[country] = 2;
				  box_arr_attr[country] = city_attr_sec;
				}
			else if(paths[country].total_members < 1000)
				{
				  box_arr_radius[country] = 3;	
				  box_arr_attr[country] = city_attr_thi;
				}
			else if(paths[country].total_members < 2000)
				{
				  box_arr_radius[country] = 4;
				  box_arr_attr[country] = city_attr_for;
				}
			else 
				{
					box_arr_radius[country] = 5;
					box_arr_attr[country] = city_attr_fiv;		
				}    		    
		}
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
			//alert(e.pageY);
			
			$("#countryinfo").css({"margin-left": e.pageX-10});
			$("#countryinfo").css({"margin-top": e.pageY-280});
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
			//alert(this.id);
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
		for (var country in paths) {
		
		r_contenient.circle(box_arr_cx[country],box_arr_cy[country], box_arr_radius[country]).attr(box_arr_attr[country]);
		
		}
	
//drawing world map	in contenient_map
	$("#contenient_map").find('svg').remove();
	
	firstX_contenient = 0;
	firstY_contenient = 0;
	firstSetWidth_contenient = 1000;
	firstSetHeight_contenient= 200;
	mapWidth_contenient = 300;
	mapHeight_contenient = 200;
	
	var r = Raphael('contenient_map', mapWidth_contenient, mapHeight_contenient);

	
	r.setViewBox(firstX_contenient,firstY_contenient,firstSetWidth_contenient,firstSetHeight_contenient); //continient
	
	var mapZoom_contenient = 1;
  var maxIcon_contenient = $('#contenient_map .plus');
  var minIcon_contenient = $('#contenient_map .minus');
  var zoomInterval = 30;
  var mapRate_contenient = 2/3;
 

	maxIcon_contenient.click(function(e) {
   //firstX_contenient = firstX_contenient + mapZoom_contenient *zoomInterval;
		//    firstY_contenient = firstY_contenient - mapZoom_contenient *zoomInterval*mapRate_contenient ;
		if(firstSetWidth_contenient > 2*mapZoom_contenient*zoomInterval)
    	firstSetWidth_contenient = firstSetWidth_contenient - 2*mapZoom_contenient*zoomInterval;
    
    if(firstSetHeight_contenient > 2*mapZoom_contenient*zoomInterval * mapRate_contenient)
    	firstSetHeight_contenient = firstSetHeight_contenient- 2*mapZoom_contenient*zoomInterval * mapRate_contenient;

   	r.setViewBox(firstX_contenient, firstY_contenient, firstSetWidth_contenient, firstSetHeight_contenient);
		mapZoom_contenient=mapZoom_contenient + 0.2;
    e.stopPropagation();
    e.preventDefault();
	});

	minIcon_contenient.click(function(e) {
    if (mapZoom_contenient < 1) return;
   	
    firstX_contenient = firstX_contenient - mapZoom_contenient *zoomInterval;
//    firstY_contenient = firstY_contenient - mapZoom_contenient *zoomInterval*mapRate_contenient ;
   	firstSetWidth_contenient = firstSetWidth_contenient + 2*mapZoom_contenient*zoomInterval;
    firstSetHeight_contenient = firstSetHeight_contenient+ 2*mapZoom_contenient*zoomInterval * mapRate_contenient;
    r.setViewBox(firstX_contenient,firstY_contenient, firstSetWidth_contenient, firstSetHeight_contenient);
		//alert(firstY_contenient);
		mapZoom_contenient=mapZoom_contenient - 0.2; 
    e.stopPropagation();
    e.preventDefault();
	});
	
	

	for (var country in paths) {
			var obj = r.path(paths[country].path);
			bbox = obj.getBBox();
			if(paths[country].total_members)
			{
				box_arr_cx[country] = bbox.x + bbox.width/2;;
				box_arr_cy[country] = bbox.y + bbox.height/2;;
				if(paths[country].total_members < 100){
				box_arr_radius[country] = 5;
				box_arr_attr[country] = city_attr_fir;
			}
			else if(paths[country].total_members < 500)
			{
				  box_arr_radius[country] = 10;
				  box_arr_attr[country] = city_attr_sec;
				}
			else if(paths[country].total_members < 1000)
				{
				  box_arr_radius[country] = 15;	
				  box_arr_attr[country] = city_attr_thi;
				}
			else if(paths[country].total_members < 2000)
				{
				  box_arr_radius[country] = 20;
				  box_arr_attr[country] = city_attr_for;
				}
			else 
				{
					box_arr_radius[country] = 25;
					box_arr_attr[country] = city_attr_fiv;		
				}    	    
			}
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
				$("#countryinfo").css({"margin-top": e.pageY-280});
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
				exapandContenient(this.id, arr[this.id]);			
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
		for (var country in paths) {
		
			r.circle(box_arr_cx[country],box_arr_cy[country], box_arr_radius[country]).attr(box_arr_attr[country]);
		
		}
	
}

function drawCountry(data, cont_target,target) {
	$("#country_map").find('svg').remove();
// drawing worldmap in country_map
	$("#country_map").show();
	 
	firstX_world = 0;
	firstY_world = 0;
	firstSetWidth_world = 1000;
	firstSetHeight_world= 200;
	mapWidth_world = 300;
	mapHeight_world = 200;
	
	var r_world = Raphael('country_map', mapWidth_contenient, mapHeight_contenient);
	
	r_world.setViewBox(firstX_world,firstY_world,firstSetWidth_world,firstSetHeight_world); //continient
	
	var mapZoom_world = 1;
  var maxIcon_world = $('#country_map .plus');
  var minIcon_world = $('#country_map .minus');
  var zoomInterval = 30;
  var mapRate_world = 2/3;
 
	
	maxIcon_world.click(function(e) {
    

    firstX_world = firstX_world + mapZoom_world *zoomInterval;
//  firstY_world = firstY_worldt - mapZoom_world *zoomInterval*mapRate_world ;
		if(firstSetWidth_world > 2*mapZoom_world*zoomInterval)
    	firstSetWidth_world = firstSetWidth_world - 2*mapZoom_world*zoomInterval;
    if(firstSetHeight_world > 2*mapZoom_world*zoomInterval * mapRate_world)
    	firstSetHeight_world = firstSetHeight_world- 2*mapZoom_world*zoomInterval * mapRate_world;
   	r_world.setViewBox(firstX_world, firstY_world, firstSetWidth_world, firstSetHeight_world);
		mapZoom_world=mapZoom_world + 0.2;
    e.stopPropagation();
    e.preventDefault();
	});

	minIcon_world.click(function(e) {
    if (mapZoom_world < 1) return;
   	
    firstX_world = firstX_world - mapZoom_world *zoomInterval;
//    firstY_world = firstY_worldt - mapZoom_world *zoomInterval*mapRate_world ;
    firstSetWidth_world = firstSetWidth_world + 2*mapZoom_world*zoomInterval;
    firstSetHeight_world = firstSetHeight_world + 2*mapZoom_world*zoomInterval * mapRate_world;
   	r_world.setViewBox(firstX_world, firstY_world, firstSetWidth_world, firstSetHeight_world);
//    alert(firstY_world);
		mapZoom_world=mapZoom_world - 0.2; 
    e.stopPropagation();
    e.preventDefault();
	});
	
	var arr_world = new Array();
	
	var info = $(".countryinfo");
	var point = $("<div class='point' style='position:absolute; left:1000px; top:0px; display:none'><div class='close'></div></div>");
	$("#country_map").append(point);
	
	var city_attr = {
					fill: "#0f0",
					stroke: "none",
					opacity: .6
				};
		var box_arr_cx = new Array();
		var box_arr_cy = new Array();
		var box_arr_radius = new Array();
		var box_arr_attr = new Array();
	 for (var country in paths) {
		var obj = r_world.path(paths[country].path);
		bbox = obj.getBBox();
			if(paths[country].total_members)
			{
				box_arr_cx[country] = bbox.x + bbox.width/2;;
				box_arr_cy[country] = bbox.y + bbox.height/2;;
				if(paths[country].total_members < 100){
				box_arr_radius[country] = 3;
				box_arr_attr[country] = city_attr_fir;
			}
			else if(paths[country].total_members < 500)
			{
				  box_arr_radius[country] = 6;
				  box_arr_attr[country] = city_attr_sec;
				}
			else if(paths[country].total_members < 1000)
				{
				  box_arr_radius[country] = 9;	
				  box_arr_attr[country] = city_attr_thi;
				}
			else if(paths[country].total_members < 2000)
				{
				  box_arr_radius[country] = 12;
				  box_arr_attr[country] = city_attr_for;
				}
			else 
				{
					box_arr_radius[country] = 15;
					box_arr_attr[country] = city_attr_fiv;		
				}    	    
			}
		obj.attr(attributes);
		arr_world[obj.id] = country;
		
		var countryinfo = $("<div id='"+obj.id+"' style='display:none;' class='country' ><img src='img/close.png' class='closeinfo' style='float:right;' /><p style='font-size:15px;'>Country Name:<a href='#' class='link' >"+paths[country].name+"</a></p></div>");
		var countryflag = $("<img src='flags/"+paths[country].name+".png' alt='There is no flag.' class='flag' />"); countryinfo.append(countryflag);
		var totalmembers = $("<p>Total members:"+paths[country].total_members+"</p>"); countryinfo.append(totalmembers);
		info.append(countryinfo);
			
		var region = $("<div id='"+country+"' class='regioninfo' style='display:none;'></div>");
		info.after(region);

		obj.hover(function(e){
			$(".regioninfo").css({ "display": "none" });
			$(".region").css({ "display": "none" });		
			$("#countryinfo").css({"display": "none"});
			$(".country").css({"display": "none"});
			this.animate({
				fill: '#1669AD'
			}, 300);
			
			$("#countryinfo").css({"margin-left": e.pageX-10});
			$("#countryinfo").css({"margin-top": e.pageY-490});
			$("#countryinfo").css({"display": "block"});
			$("#"+this.id).css({"display": "block"});

			var id = this.id; var name = arr_world[this.id];
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
			$("#country_map").find('svg').remove();
			$("#country_map").hide();
			exapandContenient(this.id, arr_world[this.id]);			
		});
		
		$('.point').find('.close').live('click', function(){
			var t = $(this),
			parent = t.parent('.point');
			parent.fadeOut(function(){
				parent.remove();
			});
			
		//	drawMap(paths);
			return false;
			
		});	
	}
	
	for (var country in paths) {
		
			r_world.circle(box_arr_cx[country],box_arr_cy[country], box_arr_radius[country]).attr(box_arr_attr[country]);
		
		}
	
	// drawing contenient map in contenient_map
	$("#contenient_map").find('svg').remove();
		var r_contenient = Raphael('contenient_map', 300, 200);
	
	$("#cont_txt").text(target);
	
	mapWidth_contenient = 300;
	mapHeight_contenient = 200;
	
	
		switch(cont_target){
		case 'Asia':
			firstX_contenient = 550;
			firstY_contenient = 30;
			firstSetWidth_contenient = 440;
			firstSetHeight_contenient= 200;
		break;
		case 'Africa':
			firstX_contenient = 350;
			firstY_contenient = 130;
			firstSetWidth_contenient = 350;
			firstSetHeight_contenient= 200;
		break;
		case 'Europe':
			 firstX = 400;
			 firstY = 30;
			 firstSetWidth = 230 ;
			 firstSetHeight= 90; 
		break;
		case 'North America':
			firstX_contenient = 0;
			firstY_contenient = 10;
			firstSetWidth_contenient = 340;
			firstSetHeight_contenient= 180;
		break;
		case 'South America':
			firstX_contenient = 180;
			firstY_contenient = 170;
			firstSetWidth_contenient = 200;
			firstSetHeight_contenient= 220;
		break;
		case 'Australia':
			firstX_contenient = 800;
			firstY_contenient = 200;
			firstSetWidth_contenient = 140;
			firstSetHeight_contenient= 200;
		break;
		default:
		break;
		}	 
		
//	var r = Raphael('contenient_map', mapWidth_contenient, mapHeight_contenient);

	
	r_contenient.setViewBox(firstX_contenient,firstY_contenient,firstSetWidth_contenient,firstSetHeight_contenient); //continient
	
	var mapZoom_contenient = 1;
  var maxIcon_contenient = $('#contenient_map .plus');
  var minIcon_contenient = $('#contenient_map .minus');
  var zoomInterval = 30;
  var mapRate_contenient = 2/3;
 

	maxIcon_contenient.click(function(e) {
    

//    firstX_contenient = firstX_contenient + mapZoom_contenient *zoomInterval;
//    firstY_contenient = firstY_contenient - mapZoom_contenient *zoomInterval*mapRate_contenient ;
    if(firstSetWidth_contenient > 2*mapZoom_contenient*zoomInterval)
    	firstSetWidth_contenient = firstSetWidth_contenient - 2*mapZoom_contenient*zoomInterval;
    if(firstSetHeight_contenient > 2*mapZoom_contenient*zoomInterval * mapRate_contenient)
    	firstSetHeight_contenient = firstSetHeight_contenient- 2*mapZoom_contenient*zoomInterval * mapRate_contenient;
   	r_contenient.setViewBox(firstX_contenient, firstY_contenient, firstSetWidth_contenient, firstSetHeight_contenient);
		mapZoom_contenient=mapZoom_contenient + 0.2;
		alert(firstX_contenient);
    e.stopPropagation();
    e.preventDefault();
});

	minIcon_contenient.click(function(e) {
    if (mapZoom_contenient < 1) return;
   	
//    firstX_contenient = firstX_contenient - mapZoom_contenient *zoomInterval;
//    firstY_contenient = firstY_contenient - mapZoom_contenient *zoomInterval*mapRate_contenient ;
   	firstSetWidth_contenient = firstSetWidth_contenient + 2*mapZoom_contenient*zoomInterval;
    firstSetHeight_contenient = firstSetHeight_contenient+ 2*mapZoom_contenient*zoomInterval * mapRate_contenient;
    r_contenient.setViewBox(firstX_contenient,firstY_contenient, firstSetWidth_contenient, firstSetHeight_contenient);
		//alert(firstY_contenient);
		mapZoom_contenient=mapZoom_contenient - 0.2; 
    e.stopPropagation();
    e.preventDefault();
});
	
	var arr = new Array();
	
	var info = $(".countryinfo");
	var point = $("<div class='point' style='position:absolute; left:1000px; top:0px; display:none'><div class='close'></div></div>");
	$("#country_map").append(point);
	
	
		for (var country in paths) {
		var obj = r_contenient.path(paths[country].path);
		
		obj.attr(attributes);
		arr[obj.id] = country;
		
		var countryinfo = $("<div id='"+obj.id+"' style='display:none;' class='country' ><img src='img/close.png' class='closeinfo' style='float:right;' /><p style='font-size:15px;'>Country Name:<a href='#' class='link' >"+paths[country].name+"</a></p></div>");
		var countryflag = $("<img src='flags/"+paths[country].name+".png' alt='There is no flag.' class='flag' />"); countryinfo.append(countryflag);
		var totalmembers = $("<p>Total members:"+paths[country].total_members+"</p>"); countryinfo.append(totalmembers);
		info.append(countryinfo);
			
		var region = $("<div id='"+country+"' class='regioninfo' style='display:none;'></div>");
		info.after(region);

		obj.hover(function(e){
			$(".regioninfo").css({ "display": "none" });
			$(".region").css({ "display": "none" });		
			$("#countryinfo").css({"display": "none"});
			$(".country").css({"display": "none"});

			this.animate({
				fill: '#1669AD'
			}, 300);
			
			$("#countryinfo").css({"margin-left": e.pageX-10});
			$("#countryinfo").css({"margin-top": e.pageY-490});
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
		//	alert(cont_target);
			exapandCountry(this.id, arr[this.id]);			
		});
		
		$('.point').find('.close').live('click', function(){
			var t = $(this),
			parent = t.parent('.point');
			parent.fadeOut(function(){
				parent.remove();
			});
			
			//drawMap(paths);
			return false;
			
		});	
	}
	for (var country in paths) {
		
			r_contenient.circle(box_arr_cx[country],box_arr_cy[country], box_arr_radius[country]).attr(box_arr_attr[country]);
		
		}
	
// drawing country in world_map 	
		$("#world_map").find('svg').remove();
//		var r_country = Raphael('world_map', 500, 400);
		
			firstX_country = 0;
			firstY_country = 0;
			firstSetWidth_country = 200;
			firstSetHeight_country= 300;
			mapWidth_country = 500;
			mapHeight_country = 400;
	
	var r_country = Raphael('world_map', mapWidth_country, mapHeight_country);
	
	r_country.setViewBox(firstX_country,firstY_country,firstSetWidth_country,firstSetHeight_country); //continient
	
	var mapZoom_country  = 1;
  var maxIcon_country  = $('#world_map .plus');
  var minIcon_country  = $('#world_map .minus');
  var zoomInterval = 30;
  var mapRate_country = 4/5;
 
	maxIcon_country.click(function(e) {
    

    firstX_country = firstX_country + mapZoom_country *zoomInterval;
//  firstY_country = firstY_country - mapZoom_country *zoomInterval*mapRate_country ;
		if(firstSetWidth_country > 2*mapZoom_country*zoomInterval) 
    	firstSetWidth_country = firstSetWidth_country - 2*mapZoom_country*zoomInterval;
    if(firstSetHeight_country > 2*mapZoom_country*zoomInterval * mapRate_country) 
    	firstSetHeight_country = firstSetHeight_country- 2*mapZoom_country*zoomInterval * mapRate_country;
   	r_country.setViewBox(firstX_country, firstY_country, firstSetWidth_country, firstSetHeight_country);
		mapZoom_country=mapZoom_country + 0.2;
    e.stopPropagation();
    e.preventDefault();
});

	minIcon_country.click(function(e) {
    if (mapZoom_world < 1) return;
   	
    firstX_country = firstX_country - mapZoom_country *zoomInterval;
//    firstY_country = firstY_country - mapZoom_country *zoomInterval*mapRate_country ;
    firstSetWidth_country = firstSetWidth_country + 2*mapZoom_country*zoomInterval;
    firstSetHeight_country = firstSetHeight_country + 2*mapZoom_country*zoomInterval * mapRate_country;
    r_country.setViewBox(firstX_country, firstY_country, firstSetWidth_country, firstSetHeight_country);
//    alert(firstY_world);
		mapZoom_country=mapZoom_country - 0.2;
    e.stopPropagation();
    e.preventDefault();
});
	
		
		attributes = {
            fill: '#fff',
            stroke: '#3899E6',
            'stroke-width': 1,
            'stroke-linejoin': 'round'
        };
        
    	
	var arr = new Array();
	
	var info = $(".countryinfo");
	var point = $("<div class='point' style='position:absolute; left:1000px; top:0px; display:none'><div class='close'></div></div>");
	$("#country_map").append(point);
	
	for (var region in regions) {
		var obj = r_country.path(regions[region].path);
		bbox = obj.getBBox();
			if(regions[region].total_members)
			{
				//alert(regions[region].total_members);
				box_arr_cx[region] = bbox.x + bbox.width/2;
				box_arr_cy[region] = bbox.y + bbox.height/2;
				if(regions[region].total_members < 100)
				{
				box_arr_radius[region] = 5;
				box_arr_attr[region] = city_attr_fir;
			}
			else if(regions[region].total_members < 500)
			{
				  box_arr_radius[region] = 10;
				  box_arr_attr[region] = city_attr_sec;
				}
			else if(regions[region].total_members < 1000)
				{
				  box_arr_radius[region] = 15;	
				  box_arr_attr[region] = city_attr_thi;
				}
			else if(regions[region].total_members < 2000)
				{
				  box_arr_radius[region] = 20;
				  box_arr_attr[region] = city_attr_for;
				}
			else 
				{
					box_arr_radius[region] = 25;
					box_arr_attr[region] = city_attr_fiv;		
				}    	    
			}
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
			$(".countryinfo").css({ "display": "none" });
			$(".countryinfo").css({ "display": "none" });		
			this.animate({
				fill: '#1669AD'
			}, 300);
			
			$("#" + regions[region].shortName).css({"margin-left": e.pageX-10});
			$("#" + regions[region].shortName).css({"margin-top": e.pageY-490});
			
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
		for (var region in regions) {
		
			r_country.circle(box_arr_cx[region],box_arr_cy[region], box_arr_radius[region]).attr(box_arr_attr[region]);
		
		}	
}

function exapandContenient(id, shortName) {
//		var r_country = Raphael('country_map', 300, 200);
		var data = 'js/'+shortName+'/paths.js';
		var target = paths[shortName].name;
		var cont_target = paths[shortName].contenient_name;
		//alert(shortName);
		document.getElementById("countryinfo").style.display = "none";
		document.getElementById(id).style.display = "none";
		$.ajax({
//			URL: 'js/'+shortName+'/paths.js',
			method:'get',
			dataType:'script',
			success:function(data){
				//$("#world_map").empty();
				drawContinient(data, cont_target);
				$(".point").css("display", "block");
			},
			error:function(){
				alert("There is no "+ cont_target +" region data in " + data + "!");
			}
		});
}


function exapandCountry(id, shortName) {
			
		var data = 'js/'+shortName+'/paths.js';
		var target = paths[shortName].name;
		var cont_target = paths[shortName].contenient_name;

		document.getElementById("countryinfo").style.display = "none";
		document.getElementById(id).style.display = "none";
		$.ajax({
			url: 'js/'+shortName+'/paths.js',
			method:'get',
			dataType:'script',
			success:function(data){
				//$("#world_map").empty();
				drawCountry(data,cont_target,target);
				$(".point").css("display", "block");
			},
			error:function(){
				alert("There is no "+ target +" region data in " + data + "!");
			}
		});
	}