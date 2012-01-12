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
	
	for (var country in paths) {
		var obj = r.path(paths[country].path);
		
		obj.attr(attributes);
		arr[obj.id] = country;
		
		var countryinfo = $("<div id='"+obj.id+"' style='display:none;'><p style='font-size:15px;'>Country Name:"+paths[country].name+"</p></div>");
		var countryflag = $("<img src='flags/"+paths[country].name+".png' alt='There is no flag.' />"); countryinfo.append(countryflag);
		var totalmembers = $("<p>Total members:"+paths[country].total_members+"</p>"); countryinfo.append(totalmembers);
		info.append(countryinfo);
		
		var region = $("<div id='"+country+"' class='regioninfo' style='display:none;'></div>");
		info.after(region);

		
		obj.hover(function(){
			this.animate({
				fill: '#1669AD'
			}, 300);
			document.getElementById("countryinfo").style.display = "block";
			document.getElementById(this.id).style.display = "block";
		}, function(){
			this.animate({
				fill: attributes.fill
			}, 300);
			document.getElementById("countryinfo").style.display = "none";
			document.getElementById(this.id).style.display = "none";

		}).click(function(){
			document.getElementById("countryinfo").style.display = "none";
			document.getElementById(this.id).style.display = "none";
			$.ajax({
				url: 'js/'+arr[this.id]+'/paths.js',
				method:'get',
				dataType:'script',
				jsonp:'jsonp_callback',
				success:function(data){
					$("#map").empty();
					drawCountry(data);
					$(".point").css("display", "block");
				},
				error:function(){
					alert("There is no region data!");
				}
			});
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
		var regioninfo = $("<div id='"+regions[region].shortName+obj.id+"' style='display:none;'><p style='font-size:15px;'>Region Name:"+regions[region].name+"</p></div>");
		var countryflag = $("<img src='flags/"+regions[region].country+".png' alt='There is no flag.' />"); regioninfo.append(countryflag);
		var totalmembers = $("<p>Total members:"+regions[region].total_members+"</p>"); regioninfo.append(totalmembers);
		regioninfo.appendTo(region_area);
				
		obj.hover(function(){
			this.animate({
				fill: '#1669AD'
			}, 300);
			document.getElementById(regions[region].shortName).style.display = "block";
			document.getElementById(regions[region].shortName+this.id).style.display = "block";			
		}, function(){
			this.animate({
				fill: attributes.fill
			}, 300);
			document.getElementById(regions[region].shortName).style.display = "none";
			document.getElementById(regions[region].shortName+this.id).style.display = "none";			
		}).click(function(){
			$.ajax({
				url: 'js/'+arr[this.id]+'/paths.js',
				method:'get',
				dataType:'script',
				jsonp:'jsonp_callback',
				success:function(data){
					document.getElementById(regions[region].shortName).style.display = "none";
					document.getElementById(regions[region].shortName+this.id).style.display = "none";	
				},
				error:function(){
					alert("There is no county data!");
				}
			});
		});
		
/*		$('.point').find('.close').live('click', function(){
			var t = $(this),
			parent = t.parent('.point');
			parent.fadeOut(function(){
				$(".regioninfo").css("display", "none");
				parent.remove();
			});

			return false;
		});	*/
	}	
}

