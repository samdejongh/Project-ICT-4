	var pagina;

document.addEventListener("backbutton", function() {
		mosync.app.exit();
	}, false);

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
				if(pagina == "Settings")
				{
					
					var checked = localStorage.getItem("rb_checked");	
					if(checked == "kilometers")
					{
						$("#radio-choice-21").prop("checked", true).checkboxradio( "refresh" );;
					}
					
					if(checked == "miles")
					{	
						$("#radio-choice-22").prop("checked", true).checkboxradio( "refresh" );;	
					}
					
					$('input[name=rb]:radio').change(function(){
						
						if($('#radio-choice-21').is(':checked')) 
						{
							localStorage.setItem("rb_checked", "kilometers");
							checked = "kilometers";
						}
						
						if($('#radio-choice-22').is(':checked')) 
						{
							localStorage.setItem("rb_checked", "miles");
							checked = "miles";
						}							
					});
				}
			})	
			
		
});
});