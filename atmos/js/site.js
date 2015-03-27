/**
*  @file
*  This file contains miscellaneous script to enhance funtionality of the Atmos theme
* 
*/
(function ($) {
	
Drupal.behaviors.atmos_theme = function() {

  $(document).ready( function() {
    
    $("#newsletter").attr("value", "ENTER EMAIL ADDRESS");
  
    var text = "ENTER EMAIL ADDRESS";
  
    $("#mce-EMAIL").focus(function() {
      $(this).addClass("active");
      if($(this).attr("value") == text) $(this).attr("value", "");
    });
  
    $("#mce-EMAIL").blur(function() {
      $(this).removeClass("active");
      if($(this).attr("value") == "") $(this).attr("value", text);
    });
  });

};

}(jQuery));