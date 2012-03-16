function chat_interface_init() {
$(".option_button")	.click(function() {
	$(".empty_box").show("slide", { direction: "right" }, 1000);
});

$(".invite_button")	.click(function() {
	$(".empty_box").show("slide", { direction: "right" }, 1000);
});

$(".file_upload_cancel").click(function() {
	$(".file_upload").css("display", "none");
});

$(".file_upload_submit").click(function() {
	$(".file_upload").css("display", "none");
});

$(".close_box").click(function() {
	$(".empty_box").hide("slide", { direction: "right" }, 1000);
});

$(".mceIframeContainer").click(function() {
});

$(".tabs li a").click(function() {
	$(".tabs li a").removeClass("current");
	$(this).addClass("current");
});

function show_comment() {
	$(".show_comment").css("display", "none");
  $("#elm2_parent").css("display", "block");
	$(".cancel_button").css("display", "block");
	$(".post_button").css("display", "block");
	$(".option_button").css("display", "none");
	$(".invite_button").css("display", "none");
}

$(".show_comment").click(function() {
	$(".show_comment").css("display", "none");
  $("#elm2_parent").css("display", "block");
	$(".cancel_button").css("display", "block");
	$(".post_button").css("display", "block");
	$(".option_button").css("display", "none");
	$(".invite_button").css("display", "none");	
});

$(".post_button").click(function() {
	$("#add_comment").after($('<div class="show_comment" onClick="show_comment()" style="font-family: Arial,Helvetica,sans-serif; font-size: 130%; font-weight: bloder; font-style: italic; color:#D7D7D7; width:100%; border:none;	height:100%;">Add a comment...</div><script>$(".show_comment").click(function() {	$(".show_comment").css("display", "none"); $("#elm2_parent").css("display", "block");	$(".cancel_button").css("display", "block");	$(".post_button").css("display", "block");	$(".option_button").css("display", "none");	$(".invite_button").css("display", "none");	tinyMCE.getInstanceById("elm2").focus(); });</script>'));
	$("#add_comment").remove();
	$(".show_comment").css("display", "block");
	$("#elm2_parent").css("display", "none");
	tinyMCE.get('elm2').setContent('');
	$(".cancel_button").css("display", "none");
	$(".post_button").css("display", "none");
	$(".option_button").css("display", "block");
	$(".invite_button").css("display", "block");	
});

$(".cancel_button").click(function() {
	$("#add_comment").after($('<div class="show_comment" onClick="show_comment()" style="font-family: Arial,Helvetica,sans-serif; font-size: 130%; font-weight: bloder; font-style: italic; color:#D7D7D7; width:100%; border:none;	height:100%;">Add a comment...</div><script>$(".show_comment").click(function() {	$(".show_comment").css("display", "none"); $("#elm2_parent").css("display", "block");	$(".cancel_button").css("display", "block");	$(".post_button").css("display", "block");	$(".option_button").css("display", "none");	$(".invite_button").css("display", "none");	tinyMCE.getInstanceById("elm2").focus(); });</script>'));
	$("#add_comment").remove();
	$(".show_comment").css("display", "block");
	$("#elm2_parent").css("display", "none");
	tinyMCE.get('elm2').setContent('');
	$(".cancel_button").css("display", "none");
	$(".post_button").css("display", "none");
	$(".option_button").css("display", "block");
	$(".invite_button").css("display", "block");	
});

$("#add_comment").click(function(){
	$(".cancel_button").css("display", "block");
	$(".post_button").css("display", "block");
	$(".option_button").css("display", "none");
	$(".invite_button").css("display", "none");
	$(this).css("display", "none");


	
	var component = $('<textarea id="elm2" name="elm2" rows="" cols="80" style="width: 100%; border-radius:5px; height:100%;"></textarea>');
	$(this).after(component);
	tinyMCE.init({
			// General options
	    mode : "textareas",
	    elements : "elm2",
	    theme : "advanced",
      plugins : "autolink,lists,spellchecker,pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template",
	    theme_advanced_buttons1 : "fontselect, fontsizeselect, forecolor, bold, italic, underline, justifyleft,justifycenter,justifyright, bullist, numlist, indent, outdent, link, spellchecker, upload, expand, collapse",
	    theme_advanced_buttons2 : "",
	    theme_advanced_buttons3 : "",
	    theme_advanced_toolbar_location : "top",
	    theme_advanced_toolbar_align : "right",
	    theme_advanced_statusbar_location : "bottom",
	    theme_advanced_resizing : false,
	    theme_advanced_resize_horizontal : false,
	    setup : function(ed) {

	        // Add a custom button
	        ed.addButton('expand', {
	            title : 'expand',
	            image : 'css/tinyMCE/image/expand.png',
	            onclick : function() {
	                // Add you own code to execute something on click
	                $(".mceToolbar").removeClass("mceRight").addClass("mceLeft");               
	                ed.focus();
	                $("#elm2_fontselect").css("display", "block");
	                $("#elm2_fontsizeselect").css("display", "block");      
	                $("#elm2_forecolor").css("display", "block");
	                $("#elm2_underline").css("display", "block");
	                $("#elm2_justifycenter").css("display", "block");
	                $("#elm2_justifyleft").css("display", "block");
	                $("#elm2_justifyright").css("display", "block");
	                $("#elm2_bullist").css("display", "block");
	                $("#elm2_numlist").css("display", "block");
	                $("#elm2_outdent").css("display", "block");
	                $("#elm2_indent").css("display", "block");
	                $("#elm2_link").css("display", "block");
	                $("#elm2_expand").css("display", "none");
	                $("#elm2_collapse").css("display", "block");
	                $("#elm2_spellchecker").css("display", "block");
	                $("#elm2_upload").css("margin-right", "10px");
	                $("#elm2_toolbargroup").css("position", "relative");
	                $("#elm2_toolbargroup").css("right", "none");
	                $("#elm2_toolbargroup").css("left", "0px");
	                $("#elm2_toolbar1").css("display", "none");

					    		var expand_toolbar = $("<div class='expand_toolbar' style='display:inline;'></div>");

					        $("#elm2_toolbar1").after(expand_toolbar);
					        					        
				          var span1 = $("<span class='span_start' style='display:inline; float:left; margin-top:5px;'></span>").append($("#elm2_toolbar1>tbody>tr>td").eq(0).contents() );  $(".expand_toolbar").append(span1); 
				          var span2 = $("<span class='span_fontselect' style='display:inline; float:left; margin-top:5px;'></span>").append($("#elm2_toolbar1>tbody>tr>td").eq(1).contents() );  $(".expand_toolbar").append(span2);
				          var span3 = $("<span class='span_fontsize' style='display:inline; float:left; margin-top:5px;'></span>").append($("#elm2_toolbar1>tbody>tr>td").eq(2).contents() );  $(".expand_toolbar").append(span3);
				          var span4 = $("<span class='span_empty' style='display:inline; float:left;'></span>").append($("#elm2_toolbar1>tbody>tr>td").eq(3).contents() );  $(".expand_toolbar").append(span4);
				          var span5 = $("<span class='span_forecolor' style='display:inline; float:left;'></span>").append($("#elm2_toolbar1>tbody>tr>td").eq(4).contents() );  $(".expand_toolbar").append(span5);
				          var span6 = $("<span class='span_bold' style='display:inline; float:left; margin-top:5px;'></span>").append($("#elm2_toolbar1>tbody>tr>td").eq(5).contents() );  $(".expand_toolbar").append(span6);
				          var span7 = $("<span class='span_italic' style='display:inline; float:left; margin-top:5px;'></span>").append($("#elm2_toolbar1>tbody>tr>td").eq(6).contents() );  $(".expand_toolbar").append(span7);
				          var span8 = $("<span class='span_underline' style='display:inline; float:left; margin-top:5px;'></span>").append($("#elm2_toolbar1>tbody>tr>td").eq(7).contents() );  $(".expand_toolbar").append(span8);
				          var span9 = $("<span class='span_justifyleft' style='display:inline; float:left; margin-top:5px;'></span>").append($("#elm2_toolbar1>tbody>tr>td").eq(8).contents() );  $(".expand_toolbar").append(span9);
				          var span10 = $("<span class='span_justifycenter' style='display:inline; float:left; margin-top:5px;'></span>").append($("#elm2_toolbar1>tbody>tr>td").eq(9).contents() );  $(".expand_toolbar").append(span10);
				          var span11 = $("<span class='span_justifyright' style='display:inline; float:left; margin-top:5px;'></span>").append($("#elm2_toolbar1>tbody>tr>td").eq(10).contents() );  $(".expand_toolbar").append(span11);
				          var span12 = $("<span class='span_bulllist' style='display:inline; float:left; margin-top:5px;'></span>").append($("#elm2_toolbar1>tbody>tr>td").eq(11).contents() );  $(".expand_toolbar").append(span12);
				          var span13 = $("<span class='span_numlist' style='display:inline; float:left; margin-top:5px;'></span>").append($("#elm2_toolbar1>tbody>tr>td").eq(12).contents() );  $(".expand_toolbar").append(span13);
				          var span14 = $("<span class='span_indent' style='display:inline; float:left; margin-top:5px;'></span>").append($("#elm2_toolbar1>tbody>tr>td").eq(13).contents() );  $(".expand_toolbar").append(span14);
				          var span15 = $("<span class='span_outdent' style='display:inline; float:left; margin-top:5px;'></span>").append($("#elm2_toolbar1>tbody>tr>td").eq(14).contents() );  $(".expand_toolbar").append(span15);
				          var span16 = $("<span class='span_link' style='display:inline; float:left; margin-top:5px;'></span>").append($("#elm2_toolbar1>tbody>tr>td").eq(15).contents() );  $(".expand_toolbar").append(span16);
				          var span17 = $("<span class='span_spellchecker' style='display:inline; float:left; margin-top:5px;'></span>").append($("#elm2_toolbar1>tbody>tr>td").eq(16).contents() );  $(".expand_toolbar").append(span17);
				          var span18 = $("<span class='span_upload' style='display:inline; float:left; margin-top:5px;'></span>").append($("#elm2_toolbar1>tbody>tr>td").eq(17).contents() );  $(".expand_toolbar").append(span18);
				          var span19 = $("<span class='span_expand' style='display:inline; float:left; margin-top:5px;'></span>").append($("#elm2_toolbar1>tbody>tr>td").eq(18).contents() );  $(".expand_toolbar").append(span19);
				          var span20 = $("<span class='span_collapse' style='display:inline; float:left; margin-top:5px;'></span>").append($("#elm2_toolbar1>tbody>tr>td").eq(19).contents() );  $(".expand_toolbar").append(span20);
				          var span21 = $("<span class='span_end' style='display:inline; float:left; margin-top:5px;'></span>").append($("#elm2_toolbar1>tbody>tr>td").eq(20).contents() );  $(".expand_toolbar").append(span21);
				          
				          $(".mceColorPreview").css("width", "20px"); 
				          $(".mceColorPreview").css("height", "20px"); 
				          $("#elm2_forecolor_action").css("padding-top", "5px"); 
				          $("#elm2_forecolor_action").css("top", "5px");
				          $("#elm2_forecolor_open").css("margin-top", "5px");
				          
					        $('#elm2_ifr').css("width", "100%");
					        $('#elm2_ifr').css("height", "100%");
					        
	           }
	        });
	
	        ed.addButton('collapse', {
	            title : 'collapse',
	            image : 'css/tinyMCE/image/collapse.png',
	            onclick : function() {
		            	$("#elm2_toolbar1>tbody>tr>td").eq(0).append($(".span_start").contents());
		            	$("#elm2_toolbar1>tbody>tr>td").eq(1).append($(".span_fontselect").contents());
		            	$("#elm2_toolbar1>tbody>tr>td").eq(2).append($(".span_fontsize").contents());
		            	$("#elm2_toolbar1>tbody>tr>td").eq(3).append($(".span_empty").contents());
		            	$("#elm2_toolbar1>tbody>tr>td").eq(4).append($(".span_forecolor").contents());
		            	$("#elm2_toolbar1>tbody>tr>td").eq(5).append($(".span_bold").contents());
		            	$("#elm2_toolbar1>tbody>tr>td").eq(6).append($(".span_italic").contents());
		            	$("#elm2_toolbar1>tbody>tr>td").eq(7).append($(".span_underline").contents());
		            	$("#elm2_toolbar1>tbody>tr>td").eq(8).append($(".span_justifyleft").contents());
		            	$("#elm2_toolbar1>tbody>tr>td").eq(9).append($(".span_justifycenter").contents());
		            	$("#elm2_toolbar1>tbody>tr>td").eq(10).append($(".span_justifyright").contents());
		            	$("#elm2_toolbar1>tbody>tr>td").eq(11).append($(".span_bulllist").contents());
		            	$("#elm2_toolbar1>tbody>tr>td").eq(12).append($(".span_numlist").contents());
		            	$("#elm2_toolbar1>tbody>tr>td").eq(13).append($(".span_indent").contents());
		            	$("#elm2_toolbar1>tbody>tr>td").eq(14).append($(".span_outdent").contents());
		            	$("#elm2_toolbar1>tbody>tr>td").eq(15).append($(".span_link").contents());
		            	$("#elm2_toolbar1>tbody>tr>td").eq(16).append($(".span_spellchecker").contents());
		            	$("#elm2_toolbar1>tbody>tr>td").eq(17).append($(".span_upload").contents());
		            	$("#elm2_toolbar1>tbody>tr>td").eq(18).append($(".span_expand").contents());
		            	$("#elm2_toolbar1>tbody>tr>td").eq(19).append($(".span_collapse").contents());
		            	$("#elm2_toolbar1>tbody>tr>td").eq(20).append($(".span_end").contents());
	            	
	                // Add you own code to execute something on click
	                $(".mceToolbar").removeClass("mceLeft").addClass("mceRight");               
	                ed.focus();
	                $("#elm2_fontselect").css("display", "none");
	                $("#elm2_fontsizeselect").css("display", "none");      
	                $("#elm2_forecolor").css("display", "none");
	                $("#elm2_underline").css("display", "none");
	                $("#elm2_justifycenter").css("display", "none");
	                $("#elm2_justifyleft").css("display", "none");
	                $("#elm2_justifyright").css("display", "none");
	                $("#elm2_bullist").css("display", "none");
	                $("#elm2_numlist").css("display", "none");
	                $("#elm2_outdent").css("display", "none");
	                $("#elm2_indent").css("display", "none");
	                $("#elm2_link").css("display", "none");
	                $("#elm2_collapse").css("display", "none");
	                $("#elm2_expand").css("display", "block");
	                $("#elm2_spellchecker").css("display", "none");
	                $("#elm2_upload").css("margin-right", "0px");
	                $("#elm2_toolbargroup").css("position", "absolute");
	                $("#elm2_toolbargroup").css("right", "0px");
	                $("#elm2_toolbargroup").css("left", "none");
	                
	                $("#elm2_toolbar1").css("display", "block");
	                $(".expand_toolbar").remove();
	                
					        $('#elm2_ifr').css("width", "100%");
					        $('#elm2_ifr').css("height", "100%");
					        
	                //$(".expand_toolbar").show("slide", { direction: "left" }, 1000);
	            }
	        });
	
	        ed.addButton('upload', {
	            title : 'upload',
	            image : 'css/tinyMCE/image/upload.png',
	            onclick : function() {
	                // Add you own code to execute something on click
	                $(".file_upload").css("display", "block");
	            }
	        });
	        $('#elm2_ifr').css("width", "100%");
	        $('#elm2_ifr').css("height", "100%");
	    }
	});

});

$('.panel').tabs();

$(".pane").addClass("ui-tabs-hide");
$(".comment_pane").removeClass("ui-tabs-hide");
$(".tabs li").removeClass("ui-tabs-selected ui-state-active");
$(".tabs li").eq(0).addClass("ui-tabs-selected ui-state-active");


$('.tabs').removeClass('ui-widget-header');

$(window).resize(function() {
	        $('#elm2_ifr').css("width", "100%");
	        $('#elm2_ifr').css("height", "100%");
});

}