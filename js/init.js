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
	firstY = 40;
	
	mapWidth = 600;
	mapHeight = 300;
	
	var r = Raphael('world_map', mapWidth, mapHeight);
 	r.canvas.setAttribute("viewBox", firstX+" " + firstY + " 980 300");

 	r.draggable.enable();	
  var set = r.set();
  
  // non displaying contenient map and country map
  
	$('#contenient_map').hide();
  $('#country_map').hide();
	
	var mapZoom = 1;
	var firstSetWidth = 980;
	var firstSetHeight= 300;

  var maxIcon = $('.plus');
  var minIcon = $('.minus');
  
  var mapRate = firstSetHeight/firstSetWidth;
  var zoomInterval = 30;
  maxIcon.click(function(e) {
  
 	mapZoom=mapZoom + 0.1;
    firstX = firstX + mapZoom *zoomInterval;
    firstY = firstY + mapZoom *zoomInterval*mapRate ;
    firstSetWidth = firstSetWidth - 2*mapZoom*zoomInterval;
    firstSetHeight = firstSetHeight- 2*mapZoom*zoomInterval * mapRate;
   	r.canvas.setAttribute("viewBox", firstX+" " + firstY + " "+firstSetWidth +" "+ firstSetHeight);
    e.stopPropagation();
    e.preventDefault();
});

minIcon.click(function(e) {
    if (mapZoom < 1) return;

    firstX = firstX - mapZoom *zoomInterval;
    firstY = firstY - mapZoom *zoomInterval*mapRate ;
   	firstSetWidth = firstSetWidth + 2*mapZoom*zoomInterval;
    firstSetHeight = firstSetHeight+ 2*mapZoom*zoomInterval * mapRate;
  	r.canvas.setAttribute("viewBox", firstX+" " + firstY + " "+firstSetWidth +" "+ firstSetHeight);
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
	
	var box_arr_cx = new Array();
	var box_arr_cy = new Array();
	var box_arr_radius = new Array();
	var box_arr_attr = new Array();
	for (var country in paths) {
		if( paths[country].name != 'persion path' ) {		
			var obj = r.path(paths[country].path);
	
	  	obj.draggable.enable();
			bbox = obj.getBBox();
			set.push(obj);
	
			if(paths[country].total_members)
			{
				box_arr_cx[country] = bbox.x + bbox.width/2;;
				box_arr_cy[country] = bbox.y + bbox.height/2;;
				if(paths[country].total_members < 100){
					box_arr_radius[country] = 2;
					box_arr_attr[country] = city_attr_fir;
				}
				else if(paths[country].total_members < 500)
				{
					  box_arr_radius[country] = 4;
					  box_arr_attr[country] = city_attr_sec;
					}
				else if(paths[country].total_members < 1000)
					{
					  box_arr_radius[country] = 6;	
					  box_arr_attr[country] = city_attr_thi;
					}
				else if(paths[country].total_members < 2000)
					{
					  box_arr_radius[country] = 8;
					  box_arr_attr[country] = city_attr_for;
					}
				else 
					{
						box_arr_radius[country] = 10;
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
	
			
			// test
			
			countryinfo.find('p').eq(0).hover(function(e){
				$(this).parent().parent().eq(0).css({"background": "#d3d2d1", "opacity": .9});
			},function(){
				$(this).parent().parent().eq(0).css({"background":""});
				});
	//			.click(function(){
	//				var temp_id = $(this).parent().eq(0).attr('id');
	//				exapandCountry(temp_id, arr[temp_id]);			
	//		});
	
			obj.hover(function(e){
	
				$("#countryinfo").css({"display": "none"});
				$(".country").css({"display": "none"});
	
				this.animate({
					fill: '#1669AD'
				}, 200);
				
				$("#countryinfo").css({"margin-left": e.pageX-220});
				$("#countryinfo").css({"margin-top": e.pageY-230});
				$("#countryinfo").css({"display": "block"});
				$("#"+this.id).css({"display": "block"});
	
				var id = this.id; var name = arr[this.id];
				r.canvas.setAttribute("stroke-width",0);
	
				$(".closeinfo").click(function() { 
					$("#countryinfo").css({"display":"none"});
					$("#"+this.id).css({"display":"none"});			
				});			
			}, function(){
				this.animate({
					fill: attributes.fill
				}, 300);
				r.canvas.setAttribute("stroke-width",0);
	
			}).click(function(){
				exapandContenient(this.id, arr[this.id]);			
			});
			
			////////// ongoing testing
	//		.mousedown(function(){
	//				obj.css({'cursor','hand'})
	//			});
	////////////
		} else {
			var obj = r.path(paths[country].path);
	
	  	obj.draggable.enable();
			bbox = obj.getBBox();
			set.push(obj);
	
			attributes.fill = '#FF0';
			obj.attr(attributes);
			arr[obj.id] = country;
	
			obj.hover(function(e){	
				this.animate({
					fill: '#1669AD'
				}, 200);
				var id = this.id; var name = arr[this.id];
				r.canvas.setAttribute("stroke-width",0);		
			}, function(){
				this.animate({
					fill: '#FF0'
				}, 300);
				r.canvas.setAttribute("stroke-width",0);
			}).click(function(){
				$(".top_div").load('chat/chat.html');
			});
			
			if( paths[country].contenient_name == 'usa' )	{
				obj.scale(0.1, 0.1, 180, 100);
			} else if( paths[country].contenient_name == 'russia' ) {
				obj.scale(0.1, 0.1, 820, 40);
			} else if( paths[country].contenient_name == 'australia' ) {
				obj.scale(0.1, 0.1, 920, 300);				
			}
			attributes.fill = '#FFF';
		}
	}
}

///////  continient draw
function drawContinient(data,cont_target, id) {
	$("#world_map").children().remove();
	$("#world_map").append('<div class="plus"></div>');
	$("#world_map").append('<div class="minus"></div>');
	//drawing continent map
	$('#contenient_map').show();

	var r_contenient = Raphael('world_map', 600, 300);
	r_contenient.draggable.enable();	
	var set_contenient = r_contenient.set();
	
	var mapZoom = 1;
	var firstSetWidth = 0 ;
	var firstSetHeight= 0;

  var maxIcon_world = $('#world_map .plus');
  var minIcon_world = $('#world_map .minus');

	$("#cont_txt").text(cont_target);
		switch(cont_target){
		case 'Asia':
			 firstX_sec = 550;
			 firstY_sec = 30;
			 firstSetWidth_sec = 440 ;
			 firstSetHeight_sec= 230; 
		break;
		case 'Africa':
			 firstX_sec= 350;
			 firstY_sec = 130;
			 firstSetWidth_sec = 350 ;
			 firstSetHeight_sec= 200; 
		break;
		case 'Europe':
			 firstX_sec = 400;
			 firstY_sec = 30;
			 firstSetWidth_sec = 230 ;
			 firstSetHeight_sec= 90; 
		break;
		case 'North America':
			 firstX_sec = 0;
			 firstY_sec = 10;
			 firstSetWidth_sec = 340 ;
			 firstSetHeight_sec= 180; 
		break;
		case 'South America':
			 firstX_sec = 200;
			 firstY_sec = 180;
			 firstSetWidth_sec = 180 ;
			 firstSetHeight_sec= 200; 
		break;
		case 'Australia':
			 firstX_sec = 760;
			 firstY_sec = 220;
			 firstSetWidth_sec = 120 ;
			 firstSetHeight_sec= 140; 
		break;
		default:
		break;
		}
	r_contenient.canvas.setAttribute("viewBox", firstX_sec+" " + firstY_sec + " "+firstSetWidth_sec +" "+ firstSetHeight_sec);
	//alert(firstX);
  
  var mapRate = firstSetHeight_sec/firstSetWidth_sec;	
  	mapZoom=mapZoom + 0.05;
  	var zoomInterval_cont = 3;
	maxIcon_world.click(function(e) {
    
//		alert(firstX);
		firstX_sec = firstX_sec + mapZoom *zoomInterval_cont;
   	firstY_sec = firstY_sec + mapZoom *zoomInterval_cont*mapRate ;
		if(firstSetWidth_sec > 2*mapZoom*zoomInterval)
    	firstSetWidth = firstSetWidth - 2*mapZoom*zoomInterval_cont;
    if(firstSetHeight_sec > 2*mapZoom*zoomInterval_cont * mapRate)
    	firstSetHeight_sec = firstSetHeight_sec- 2*mapZoom*zoomInterval_cont * mapRate;
    	r_contenient.canvas.setAttribute("viewBox", firstX_sec+" " + firstY_sec + " "+firstSetWidth_sec +" "+ firstSetHeight_sec);
    e.stopPropagation();
    e.preventDefault();
	});

	minIcon_world.click(function(e) {
	   if (mapZoom == 1) return;
	   	
	    firstX_sec = firstX_sec - mapZoom *zoomInterval_cont;
	    firstY_sec = firstY_sec - mapZoom *zoomInterval_cont*mapRate ;
	   	firstSetWidth_sec = firstSetWidth_sec + 2*mapZoom*zoomInterval_cont;
	    firstSetHeight_sec = firstSetHeight_sec+ 2*mapZoom*zoomInterval_cont * mapRate;
			r_contenient.canvas.setAttribute("viewBox", firstX_sec+" " + firstY_sec + " "+firstSetWidth_sec +" "+ firstSetHeight_sec);
			mapZoom=mapZoom - 0.05; 
	    e.stopPropagation();
	    e.preventDefault();
	});		 

	var arr = new Array();
	
	var info = $(".countryinfo");
	
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
		if( paths[country].name != 'persion path' ) {		
		var obj = r_contenient.path(paths[country].path);
		obj.draggable.enable();	
		set_contenient.push(obj);
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
		
		countryinfo.find('p').eq(0).hover(function(e){
			$(this).parent().parent().eq(0).css({"background": "#d3d2d1", "opacity": .9});
		},function(){
			$(this).parent().parent().eq(0).css({"background":""});
			});
//			.click(function(){
//				var temp_id = $(this).parent().eq(0).attr('id');
//				exapandCountry(temp_id, arr[temp_id]);			
//		});

		obj.hover(function(e){

			$("#countryinfo").css({"display": "none"});
			$(".country").css({"display": "none"});
	
			this.animate({
				fill: '#1669AD'
			}, 300);
			
			$("#countryinfo").css({"margin-left": e.pageX-220});
			$("#countryinfo").css({"margin-top": e.pageY-430});
			$("#countryinfo").css({"display": "block"});
			$("#"+this.id).css({"display": "block"});

			var id = this.id; var name = arr[this.id];
			
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
	}
	}
	var offset_value = $('#world_map').offset();
		
	var left_value = offset_value.left + 200;
	$("#countryinfo").css({"display":"block", "margin-top":100, "margin-left":left_value});
	$("#"+id).css({"display":"block"});		
	
//drawing world map	in contenient_map
	$("#contenient_map").find('svg').remove();
	//$("#contenient_map").append();
	
	firstX_contenient = 0;
	firstY_contenient = 40;
	firstSetWidth_contenient = 980;
	firstSetHeight_contenient= 300;
	mapWidth_contenient = 300;
	mapHeight_contenient = 200;
	
	var r = Raphael('contenient_map', mapWidth_contenient, mapHeight_contenient);
	r.draggable.enable();	
	var set = r.set();
	
	r.canvas.setAttribute("viewBox", firstX_contenient+" " + firstY_contenient + " "+firstSetWidth_contenient+" "+ firstSetHeight_contenient);
	var mapZoom_contenient = 1;
  var maxIcon_contenient = $('#contenient_map .plus');
  var minIcon_contenient = $('#contenient_map .minus');
  var zoomInterval = 30;
  var mapRate_contenient = 2/3;
 

	maxIcon_contenient.click(function(e) {

   	firstX_contenient = firstX_contenient + mapZoom_contenient *zoomInterval;
    firstY_contenient = firstY_contenient + mapZoom_contenient *zoomInterval*mapRate_contenient ;
		if(firstSetWidth_contenient > 2*mapZoom_contenient*zoomInterval)
    	firstSetWidth_contenient = firstSetWidth_contenient - 2*mapZoom_contenient*zoomInterval;
    
    if(firstSetHeight_contenient > 2*mapZoom_contenient*zoomInterval * mapRate_contenient)
    	firstSetHeight_contenient = firstSetHeight_contenient- 2*mapZoom_contenient*zoomInterval * mapRate_contenient;

   	r.canvas.setAttribute("viewBox", firstX_contenient+" " + firstY_contenient + " "+firstSetWidth_contenient+" "+ firstSetHeight_contenient);
		mapZoom_contenient=mapZoom_contenient + 0.2;
    e.stopPropagation();
    e.preventDefault();
	});

	minIcon_contenient.click(function(e) {
    if (mapZoom_contenient < 1) return;
   	
    firstX_contenient = firstX_contenient - mapZoom_contenient *zoomInterval;
    firstY_contenient = firstY_contenient - mapZoom_contenient *zoomInterval*mapRate_contenient ;
   	firstSetWidth_contenient = firstSetWidth_contenient + 2*mapZoom_contenient*zoomInterval;
    firstSetHeight_contenient = firstSetHeight_contenient+ 2*mapZoom_contenient*zoomInterval * mapRate_contenient;
    	r.canvas.setAttribute("viewBox", firstX_contenient+" " + firstY_contenient + " "+firstSetWidth_contenient+" "+ firstSetHeight_contenient);
		mapZoom_contenient=mapZoom_contenient - 0.2; 
    e.stopPropagation();
    e.preventDefault();
	});

	for (var country in paths) {
		if( paths[country].name != 'persion path' ) {
			var obj = r.path(paths[country].path);
			obj.draggable.enable();
			set.push(obj);
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
			arr[obj.id] = country;
		
			var countryinfo = $("<div id='"+obj.id+"' style='display:none;' class='country' ><img src='img/close.png' class='closeinfo' style='float:right;' /><p style='font-size:15px;'>Country Name:<a href='#' class='link' >"+paths[country].name+"</a></p></div>");
			var countryflag = $("<img src='flags/"+paths[country].name+".png' alt='There is no flag.' class='flag' />"); countryinfo.append(countryflag);
			var totalmembers = $("<p>Total members:"+paths[country].total_members+"</p>"); countryinfo.append(totalmembers);
			info.append(countryinfo);
				
			var region = $("<div id='"+country+"' class='regioninfo' style='display:none;'></div>");
			info.after(region);
			
		countryinfo.find('p').eq(0).hover(function(e){
			$(this).parent().parent().eq(0).css({"background": "#d3d2d1", "opacity": .9});
		},function(){
			$(this).parent().parent().eq(0).css({"background":""});
			});
//			.click(function(){
//				var temp_id = $(this).parent().eq(0).attr('id');
//				exapandCountry(temp_id, arr[temp_id]);			
//		});

			obj.hover(function(e){
	
				$("#countryinfo").css({"display": "none"});
				$(".country").css({"display": "none"});
	
				this.animate({
					fill: '#1669AD'
				}, 300);
				
				$("#countryinfo").css({"margin-left": e.pageX-220});
				$("#countryinfo").css({"margin-top": e.pageY-430});
				$("#countryinfo").css({"display": "block"});
				$("#"+this.id).css({"display": "block"});
	
				var id = this.id; var name = arr[this.id];
				
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
		}
		
	}
}

function drawCountry(data, cont_target,target,shortName, id) {
		
	$("#country_map").find('svg').remove();
// drawing worldmap in country_map
	$("#country_map").show();
	 
	firstX_world = 0;
	firstY_world = 40;
	firstSetWidth_world = 980;
	firstSetHeight_world= 300;
	mapWidth_world = 300;
	mapHeight_world = 200;
	
	var r_world = Raphael('country_map', mapWidth_world, mapHeight_world);
	r_world.draggable.enable();
	var set_world = r_world.set();
  r_world.canvas.setAttribute("viewBox", firstX_world+" " + firstY_world + " "+firstSetWidth_world+" "+ firstSetHeight_world);
	
	var mapZoom_world = 1;
  var maxIcon_world = $('#country_map .plus');
  var minIcon_world = $('#country_map .minus');
  var zoomInterval = 30;
  var mapRate_world = 2/3;
	
	maxIcon_world.click(function(e) {
		alert(firstX_world);
    firstX_world = firstX_world + mapZoom_world *zoomInterval;
	  firstY_world = firstY_world + mapZoom_world *zoomInterval*mapRate_world ;
		if(firstSetWidth_world > 2*mapZoom_world*zoomInterval)
    	firstSetWidth_world = firstSetWidth_world - 2*mapZoom_world*zoomInterval;
    if(firstSetHeight_world > 2*mapZoom_world*zoomInterval * mapRate_world)
    	firstSetHeight_world = firstSetHeight_world- 2*mapZoom_world*zoomInterval * mapRate_world;
    	r_world.canvas.setAttribute("viewBox", firstX_world+" " + firstY_world + " "+firstSetWidth_world+" "+ firstSetHeight_world);
		mapZoom_world=mapZoom_world + 0.2;
    e.stopPropagation();
    e.preventDefault();
	});

	minIcon_world.click(function(e) {
    if (mapZoom_world < 1) return;
   	
    firstX_world = firstX_world - mapZoom_world *zoomInterval;
    firstY_world = firstY_world - mapZoom_world *zoomInterval*mapRate_world ;
    firstSetWidth_world = firstSetWidth_world + 2*mapZoom_world*zoomInterval;
    firstSetHeight_world = firstSetHeight_world + 2*mapZoom_world*zoomInterval * mapRate_world;
    r_world.canvas.setAttribute("viewBox", firstX_world+" " + firstY_world + " "+firstSetWidth_world+" "+ firstSetHeight_world);
		mapZoom_world=mapZoom_world - 0.2; 
    e.stopPropagation();
    e.preventDefault();
	});
	
	var arr_world = new Array();
	
	var info = $(".countryinfo");
	
	var city_attr = {
					fill: "#0f0",
					stroke: "none",
					opacity: .6
				};
		var box_arr_cx = new Array();
		var box_arr_cy = new Array();
		var box_arr_radius = new Array();
		var box_arr_attr = new Array();
		var country_bbox_width = new Array();
		var country_bbox_height = new Array();
	 for (var country in paths) {
	 	if( paths[country].name != 'persion path' ) {
		var obj = r_world.path(paths[country].path);
		obj.draggable.enable();
		set_world.push(obj);
		bbox = obj.getBBox();
		country_bbox_width[country] = bbox.width;
		country_bbox_height[country] = bbox.height;
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
		
		countryinfo.find('p').eq(0).hover(function(e){
			$(this).parent().parent().eq(0).css({"background": "#d3d2d1", "opacity": .9});
		},function(){
			$(this).parent().parent().eq(0).css({"background":""});
			});
//			.click(function(){
//				var temp_id = $(this).parent().eq(0).attr('id');
//				exapandCountry(temp_id, arr_world[temp_id]);			
//		});
		
		obj.hover(function(e){
			$(".regioninfo").css({ "display": "none" });
			$(".region").css({ "display": "none" });		
			$("#countryinfo").css({"display": "none"});
			$(".country").css({"display": "none"});
			this.animate({
				fill: '#1669AD'
			}, 300);
			
			$("#countryinfo").css({"margin-left": e.pageX-220});
			$("#countryinfo").css({"margin-top": e.pageY-635});
			$("#countryinfo").css({"display": "block"});
			$("#"+this.id).css({"display": "block"});

			var id = this.id; var name = arr_world[this.id];
			
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
	}
	}

	// drawing contenient map in contenient_map
	$("#contenient_map").find('svg').remove();
		$('#contenient_map').show();
		var r_contenient = Raphael('contenient_map', 300, 200);
		r_contenient.draggable.enable();
		var set_contenient = r_contenient.set();
	
	$("#cont_txt").text(target);
	
	mapWidth_contenient_sec = 300;
	mapHeight_contenient_sec = 200;
	
	
		switch(cont_target){
		case 'Asia':
			firstX_contenient_sec = 550;
			firstY_contenient_sec = 30;
			firstSetWidth_contenient_sec = 440;
			firstSetHeight_contenient_sec= 200;
		break;
		case 'Africa':
			firstX_contenient_sec = 350;
			firstY_contenient_sec = 130;
			firstSetWidth_contenient_sec = 350;
			firstSetHeight_contenient_sec= 200;
		break;
		case 'Europe':
			 firstX_contenient_sec = 400;
			 firstY_contenient_sec = 30;
			 firstSetWidth_contenient_sec = 230 ;
			 firstSetHeight_contenient_sec= 90; 
		break;
		case 'North America':
			firstX_contenient_sec = 0;
			firstY_contenient_sec = 10;
			firstSetWidth_contenient_sec = 340;
			firstSetHeight_contenient_sec= 180;
		break;
		case 'South America':
			firstX_contenient_sec = 200;
			firstY_contenient_sec = 170;
			firstSetWidth_contenient_sec = 200;
			firstSetHeight_contenient_sec= 220;
		break;
		case 'Australia':
			firstX_contenient_sec = 760;
			firstY_contenient_sec = 220;
			firstSetWidth_contenient_sec = 120;
			firstSetHeight_contenient_sec= 170;
		break;
		default:
		break;
		}	 

	r_contenient.canvas.setAttribute("viewBox", firstX_contenient_sec+" " + firstY_contenient_sec + " "+firstSetWidth_contenient_sec+" "+ firstSetHeight_contenient_sec);
	
	var mapZoom_contenient_sec = 1;
  var maxIcon_contenient_sec = $('#contenient_map .plus');
  var minIcon_contenient_sec = $('#contenient_map .minus');
  var zoomInterval_contenient_sec = 3;
  var mapRate_contenient_sec = firstSetHeight_contenient_sec/firstSetWidth_contenient_sec;
 

	maxIcon_contenient_sec.click(function(e) {
		
    firstX_contenient_sec = firstX_contenient_sec + mapZoom_contenient_sec *zoomInterval_contenient_sec;
    firstY_contenient_sec = firstY_contenient_sec + mapZoom_contenient_sec *zoomInterval_contenient_sec*mapRate_contenient_sec ;
    if(firstSetWidth_contenient_sec > 2*mapZoom_contenient_sec*zoomInterval_contenient_sec)
    	firstSetWidth_contenient_sec = firstSetWidth_contenient_sec - 2*mapZoom_contenient_sec*zoomInterval_contenient_sec;
    if(firstSetHeight_contenient_sec > 2*mapZoom_contenient_sec*zoomInterval_contenient_sec * mapRate_contenient_sec)
    	firstSetHeight_contenient_sec = firstSetHeight_contenient_sec- 2*mapZoom_contenient_sec*zoomInterval_contenient_sec * mapRate_contenient_sec;
  	r_contenient.canvas.setAttribute("viewBox", firstX_contenient_sec+" " + firstY_contenient_sec + " "+firstSetWidth_contenient_sec+" "+ firstSetHeight_contenient_sec);
		mapZoom_contenient_sec=mapZoom_contenient_sec + 0.1;
		
    e.stopPropagation();
    e.preventDefault();
});

	minIcon_contenient_sec.click(function(e) {
    if (mapZoom_contenient_sec < 1) return;
   	firstX_contenient_sec = firstX_contenient_sec - mapZoom_contenient_sec *zoomInterval_contenient_sec;
    firstY_contenient_sec = firstY_contenient_sec - mapZoom_contenient_sec *zoomInterval_contenient_sec*mapRate_contenient_sec ;
    
   	firstSetWidth_contenient_sec = firstSetWidth_contenient_sec + 2*mapZoom_contenient_sec*zoomInterval_contenient_sec;
    firstSetHeight_contenient_sec = firstSetHeight_contenient_sec + 2*mapZoom_contenient_sec*zoomInterval_contenient_sec * mapRate_contenient_sec;
  	r_contenient.canvas.setAttribute("viewBox", firstX_contenient_sec+" " + firstY_contenient_sec + " "+firstSetWidth_contenient_sec+" "+ firstSetHeight_contenient_sec);
		mapZoom_contenient=mapZoom_contenient_sec - 0.1; 
    e.stopPropagation();
    e.preventDefault();
});
	
	var arr_country = new Array();
	
	var info = $(".countryinfo");
		
		for (var country in paths) {
		
		var obj = r_contenient.path(paths[country].path);
		set_contenient.push(obj);
		obj.draggable.enable();
		obj.attr(attributes);
		arr_country[obj.id] = country;
		
		var countryinfo = $("<div id='"+obj.id+"' style='display:none;' class='country' ><img src='img/close.png' class='closeinfo' style='float:right;' /><p style='font-size:15px;'>Country Name:<a href='#' class='link' >"+paths[country].name+"</a></p></div>");
		var countryflag = $("<img src='flags/"+paths[country].name+".png' alt='There is no flag.' class='flag' />"); countryinfo.append(countryflag);
		var totalmembers = $("<p>Total members:"+paths[country].total_members+"</p>"); countryinfo.append(totalmembers);
		info.append(countryinfo);
			
		var region = $("<div id='"+country+"' class='regioninfo' style='display:none;'></div>");
		info.after(region);
		
		countryinfo.find('p').eq(0).hover(function(e){
			$(this).parent().parent().eq(0).css({"background": "#d3d2d1", "opacity": .9});
		},function(){
			$(this).parent().parent().eq(0).css({"background":""});
			});
//			.click(function(){
//				var temp_id = $(this).parent().eq(0).attr('id');
//				exapandCountry(temp_id, arr_country[temp_id]);			
//		});
		
		obj.hover(function(e){
			$(".regioninfo").css({ "display": "none" });
			$(".region").css({ "display": "none" });		
			$("#countryinfo").css({"display": "none"});
			$(".country").css({"display": "none"});

			this.animate({
				fill: '#1669AD'
			}, 300);
			
			$("#countryinfo").css({"margin-left": e.pageX-220});
			$("#countryinfo").css({"margin-top": e.pageY-635});
			$("#countryinfo").css({"display": "block"});
			$("#"+this.id).css({"display": "block"});

			var id = this.id; var name = arr_country[this.id];
			
			$(".closeinfo").click(function() { 
				$("#countryinfo").css({"display":"none"});
				$("#"+this.id).css({"display":"none"});			
			});			
		}, function(){
			this.animate({
				fill: attributes.fill
			}, 300);
		}).click(function(){
			exapandCountry(this.id, arr_country[this.id]);			
		});
		
	}
	
// drawing country in world_map
		$("#world_map").find('svg').remove();
			firstX_country = 0;
			firstY_country = 0;
			firstSetWidth_country = 400;
			firstSetHeight_country= 300;
			mapWidth_country = 600;
			mapHeight_country = 300;
	
	var r_country = Raphael('world_map', mapWidth_country, mapHeight_country);
	
	r_country.draggable.enable();
	var set_country = r_country.set();
	var mapZoom_country  = 1;
  var maxIcon_country  = $('#world_map .plus');
  var minIcon_country  = $('#world_map .minus');
  var zoomInterval_country = 20;
  var mapRate_country = 3/4;
 
	maxIcon_country.click(function(e) {
    firstX_country = firstX_country + mapZoom_country *zoomInterval_country;
    firstY_country = firstY_country + mapZoom_country *zoomInterval_country*mapRate_country ;
		if(firstSetWidth_country > 2*mapZoom_country*zoomInterval) 
    	firstSetWidth_country = firstSetWidth_country - 2*mapZoom_country*zoomInterval_country;
    if(firstSetHeight_country > 2*mapZoom_country*zoomInterval_country * mapRate_country) 
    	firstSetHeight_country = firstSetHeight_country- 2*mapZoom_country*zoomInterval_country * mapRate_country;
    	r_country.canvas.setAttribute("viewBox", firstX_country+" " + firstY_country + " "+firstSetWidth_country+" "+ firstSetHeight_country);

		mapZoom_country=mapZoom_country + 0.1;
    e.stopPropagation();
    e.preventDefault();
});

	minIcon_country.click(function(e) {
    if (mapZoom_country < 1) return;
   	
    firstX_country = firstX_country - mapZoom_country *zoomInterval_country;
    firstY_country = firstY_country - mapZoom_country *zoomInterval_country*mapRate_country ;
    firstSetWidth_country = firstSetWidth_country + 2*mapZoom_country*zoomInterval_country;
    firstSetHeight_country = firstSetHeight_country + 2*mapZoom_country*zoomInterval_country * mapRate_country;
    	r_country.canvas.setAttribute("viewBox", firstX_country+" " + firstY_country + " "+firstSetWidth_country+" "+ firstSetHeight_country);
		mapZoom_country=mapZoom_country - 0.1;
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
	
	for (var region in regions) {
		var obj = r_country.path(regions[region].path);
		set_country.push(obj);
		obj.draggable.enable();
		bbox = obj.getBBox();
			if(regions[region].total_members)
			{
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
			
			$("#"+id ).css({ "display": "block" });		
			this.animate({
				fill: '#1669AD'
			}, 300);
			
			$("#" + regions[region].shortName).css({"margin-left": e.pageX-220});
			$("#" + regions[region].shortName).css({"margin-top": e.pageY-635});
			
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
	var circle_arr = new Array();
		for (var region in regions) {
		
			var circle_country = r_country.circle(box_arr_cx[region],box_arr_cy[region], box_arr_radius[region]);
			circle_country.attr(box_arr_attr[region]);
			set_country.push(circle_country);
			circle_arr[circle_country.id] = region;
		
		var region_area = document.getElementById(regions[region].shortName);
		var regioninfo = $("<div id='"+ regions[region].shortName+circle_country.id +"' style=' display:none; ' class=' region ' ><img src='img/close.png' class='closeinfo' style='float:right;' /><p style='font-size:15px;'>Region Name:<a href='#' class='link' >"+regions[region].name+"</a></p></div>");
		var countryflag = $("<img src='flags/"+regions[region].country+".png' alt='There is no flag.' />"); regioninfo.append(countryflag);
		var totalmembers = $("<p>Total members:"+regions[region].total_members+"</p>"); regioninfo.append(totalmembers);
		regioninfo.appendTo(region_area);
				
		circle_country.hover(function(e){
			$(".regioninfo").css({ "display": "none" });
			$(".region").css({ "display": "none" });		
			$(".countryinfo").css({ "display": "none" });
			$(".countryinfo").css({ "display": "none" });		
					
			$("#" + regions[region].shortName).css({"margin-left": e.pageX-220});
			$("#" + regions[region].shortName).css({"margin-top": e.pageY-635});
			
			$("#" + regions[region].shortName).css({"display":"block"});
			$("#" + regions[region].shortName+this.id).css({"display":"block"});
			
			$(".closeinfo").click(function() { 
				$("#" + regions[region].shortName).css({"display":"none"});
				$("#" + regions[region].shortName+this.id).css({"display":"none"});			
			});
		}, function(){
				});
		
		}
		var canvas_width = r_country.canvas.getBBox().width;
		var canvas_height= r_country.canvas.getBBox().height;
		var canvas_xrate = canvas_width/600;
		var canvas_yrate = canvas_height/300;
		if(canvas_width < 600)
		{
			firstX_country = -(600-canvas_width)/2;
			firstSetWidth_country = 600;
			firstSetHeight_country = 300;
		}
		else{
			firstX_country = 0;
			firstSetWidth_country = canvas_width;
			firstSetHeight_country = canvas_height+100;
		}
		r_country.canvas.setAttribute("viewBox", firstX_country+" " + firstY_country + " "+firstSetWidth_country+" "+ firstSetHeight_country);
		var offset_value = $('#world_map').offset();
		
		var left_value = offset_value.left + 200;
	  $("#countryinfo").css({"display":"block", "margin-top":-100, "margin-left":left_value});
		$("#"+id).css({"display":"block"});
}

function exapandContenient(id, shortName) {
		var data = 'js/'+shortName+'/paths.js';
		var target = paths[shortName].name;
		var cont_target = paths[shortName].contenient_name;
		document.getElementById("countryinfo").style.display = "none";
		document.getElementById(id).style.display = "none";
		$.ajax({
			URL: 'js/'+shortName+'/paths.js',
			method:'get',
			dataType:'script',
			success:function(data){
				drawContinient(data, cont_target, id);
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
				drawCountry(data,cont_target,target,shortName, id);
			},
			error:function(){
				alert("There is no "+ target +" region data in " + data + "!");
			}
		});
	}