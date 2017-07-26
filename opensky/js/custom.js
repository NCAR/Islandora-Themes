function log(s) {
    if (window.console)
        console.log (s)
}

(function ($) {      // Use jQuery with the shortcut:
    
    var re = /([^&=]+)=?([^&]*)/g;
    var decode = function(str) {
        return decodeURIComponent(str.replace(/\+/g, ' '));
    };

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
	  log ('calling parseParams');
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

  })

// Here we immediately call the function with jQuery as the parameter.
}(jQuery));
