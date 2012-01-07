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
	for (var country in paths) {
		var obj = r.path(paths[country].path);
		obj.attr(attributes);
		arr[obj.id] = country;
		obj.hover(function(){
			this.animate({
				fill: '#1669AD'
			}, 300);
		}, function(){
			this.animate({
				fill: attributes.fill
			}, 300);
		}).dblclick(function(){
			$.ajax({
				url: 'js/'+arr[this.id]+'/paths.js',
				method:'get',
				dataType:'script',
				success:function(data){
					$("#map").empty();
					drawCountry(data);
				},
				error:function(){
					
				}
			});
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
	for (var region in regions) {
		var obj = r.path(regions[region].path);
		obj.attr(attributes);
		arr[obj.id] = region;
		obj.hover(function(){
			this.animate({
				fill: '#1669AD'
			}, 300);
		}, function(){
			this.animate({
				fill: attributes.fill
			}, 300);
		}).dblclick(function(){
			$.ajax({
				url: 'js/'+arr[this.id]+'/paths.js',
				method:'get',
				dataType:'script',
				success:function(data){

				},
				error:function(){
					
				}
			});
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
}

