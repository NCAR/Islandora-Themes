function log(s) {
    if (window.console)
        console.log (s)
}

function toggleContent(divName){
  var elm = document.getElementById(divName);
  var btn = document.getElementById(divName+'_btn');
 
  if(btn.className == 'closed') {
    elm.className = 'visibleContent';

    btn.className = 'opened';
    btn.innerText = 'Show less';
  } else {
    elm.className = 'hiddenContent';
    btn.className = 'closed';
    btn.innerText = 'Show more';
  }

  
}
function copyCitation() {
    var citation = "";

    citation = document.getElementById("container_citation").childNodes[0].childNodes[0].childNodes[0].innerText;

    copyToClipboard(citation);
    alert("Citation copied to clipboard.");
}
const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}

(function ($) {      // Use jQuery with the shortcut:


    var re = /([^&=]+)=?([^&]*)/g;
    var decode = function(str) {
        return decodeURIComponent(str.replace(/\+/g, ' '));
    };

    $.fn.exists = function () {
        return this.length !== 0;
    }
    
    $.parseParams = function(query) {
        var params = {}, e;

        if (!query)
            return params;

        var i = query.indexOf('?');
        if (i != -1)
            query = query.substring(i+1);

        if (query) {
            if (query.substr(0, 1) == '?') {
                query = query.substr(1);
            }

            while (e = re.exec(query)) {
                var k = decode(e[1]);
                var v = decode(e[2]);
                if (params[k] !== undefined) {
                    if (!$.isArray(params[k])) {
                        params[k] = [params[k]];
                    }
                    params[k].push(v);
                } else {
                    params[k] = v;
                }
            }
        }
        return params;
    };


  $(function () {  // must wait for dom to load
      log ('openSky - custom.js calling parseParams');
      var PARAMS = $.parseParams(window.location.search);

      var simple = $('#simple-search');
      var advanced = $('#advanced-search');


      function search_toggle_handler (event) {
	  log ("search_button_handler: " + event.target.id);
	  var box = $(event.target).closest('.search-wrapper');
	  log ("BOX: " + box.attr('id'));
	  if (box.attr('id') == 'simple-search')
	      activate_advanced();
	  else
	      activate_simple();
      }

	  // open details tab (the function is only defined for landing pages
	  if (typeof (Drupal.toggleFieldset) == 'function') {
		  // Details toggle is closed by default. Uncomment to open it
		  Drupal.toggleFieldset($('fieldset.islandora.islandora-metadata.collapsible.collapsed'));
	  }
	  
      function activate_simple() {
          simple.show()
          advanced.hide()
      }

      function activate_advanced() {
          advanced.show();
          simple.hide();
      }

      $('.search-toggler')
	  .click(search_toggle_handler)
	  .css('cursor', 'pointer')

      // initialize search-wrapper
      var segments = window.location.pathname.split('/')
      var last = segments[segments.length - 1];

      // look for escaped colon (used in lucene queries)
      if (window.location.pathname.indexOf('/search/') != -1 && last.indexOf('%3A') > -1) {
	  activate_advanced()
      }
      else {
	  activate_simple()
      }

	  // turn the selected menu item's color to orange
	  $('#header .block-menu a.active').css ('color', '#ff9900');

	  // set mouseover for pdf preview
	  $('.islandora-pdf-content img').attr ('title', 'Click to view document');
	  
	  // populate collection select options
	  $simple_search_collection_select = $("#simple-search form select[name='collection']");
	  $advanced_search_collection_select = $("#openskydora-advanced-search-form select[name='collection']");

	  $([$simple_search_collection_select, $advanced_search_collection_select]).each (function (i, target) {
		  $target = $(target);
		  if (typeof $target == 'undefined' || $target.length == 0) {
			  log (i + " - TARGET NOT FOUND");
			  return;
		  }
		  
		  if ($target.length && typeof COLLECTION_SELECT_OPTIONS != 'undefined') {
			  // log ("COLLECTION_SELECT_OPTIONS");
			  
			  for (var key in COLLECTION_SELECT_OPTIONS) {
				  // log ('- ' + key + ' -> ' + COLLECTION_SELECT_OPTIONS[key]);
				  $target.append($('<option>', {
					  value: key,
					  text : COLLECTION_SELECT_OPTIONS[key]
				  }));
			  }
			  
		  } else {
			  log ("COLLECTION_SELECT_OPTIONS NOT DEFINED");
		  }
	  });

      /* When audio player is a compound object child, the display is set too wide (640px)                                                                
         and the controls do not display. Narrow the player so the controls can be seen.                                                                  
	 Delay because viewer is loaded asynchronously (we should just listen for event ...)
      */
      setTimeout (function () {

          // var $audio_player = $('#block-system-main #mediaplayer'); // osstage2Test
	  var $audio_player = $('#block-system-main #islandora_videojs'); // DG prod
          var $compound_object = $('#block-islandora-compound-object-compound-navigation');
          if ($audio_player.exists() && $compound_object.exists()) {
              // log ("Compound AUDIO PLAYER FOUND!!!");
              $audio_player.css({
                  // 'border': 'yellow dashed 3px',
                  'width' : '580px',
              });
          }
      }, 500);


  })

// Here we immediately call the function with jQuery as the parameter.
}(jQuery));
