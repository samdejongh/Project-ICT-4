$(document).ready(function(e) {
   $('.go_og, .go_his, .go_set').bind('tap', function () {
	   $('#og_image, #his_image, #set_image').css('border-bottom-color','#003366');
	   
	   if(this.attributes["class"].value=="go_og")
		   {pagina = "Orienteering Guide";}
	   if(this.attributes["class"].value=="go_his")
		   {pagina = "History";}
	   if(this.attributes["class"].value=="go_set")
		   {pagina = "Settings";}
	   
	   $('#namepage').html("<b>"+pagina+"</b>");
	   $("."+ this.attributes["class"].value +" li img").css('border-bottom-color','white');
	   $('#content').trigger('create');
	   $('#content').load('import.html #'+this.attributes["class"].value, function () {
            $('#content').trigger("create");
			//var height = ($(window).height() - $("#indexPage").find('[data-role="header"]').outerHeight() - $("#indexPage").find('[data-role="footer"]').outerHeight());
    //$("#map_canvas").height(height);
	})	
});
});