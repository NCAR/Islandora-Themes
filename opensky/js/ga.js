/*
a utility function to handle timeouts

useage:
  gtag('event', 'signup_form', { 'event_callback': {
    createFunctionWithTimeout(function() {
      form.submit();
    })
  }});

see the breadcrumbs handler

*/
function createFunctionWithTimeout(callback, opt_timeout) {
  var called = false;
  function fn() {
    if (!called) {
      called = true;
      callback();
    }
  }
  setTimeout(fn, opt_timeout || 1000);
  return fn;
}

(function ($) {      // Use jQuery with the shortcut:

	$(function () {  // must wait for dom to load
		log ('openSky - ga.js processing');
		
		// ADVANCE SEARCH TOGGLE
		$('.search-toggler')
			.click(function (event) {
				log ("sending GA event")
				var box = $(event.target).closest('.search-wrapper');
				if (typeof gtag === "function") {
					label = box.attr('id') == 'simple-search' ? 'open' : 'close';
					gtag('event', 'toggle', {
						'event_category' : 'advanced-search',
						'event_label' : label,
						'value' : label == 'open' ? 1 : 0,
					})
				} else {
					log ("WARN: gtag is a '" + (typeof gtag) + "'");
				}
			})
		
		// DETAILS TOGGLER
		// Track DETAILS Link
		$('a.fieldset-title').click (function (event) {
			// log ("details click");
			
			var $field_set = $(event.target).closest('fieldset.islandora-metadata');
			gtag('event', 'toggle', {
				'event_category' : 'details',
				'event_label' : $field_set.hasClass('collapsed') ? 'close' : 'open',
				'value' : $field_set.hasClass('collapsed') ? 0 : 1  //  1 if its opened
			})
		});
		
		
		// IN-COLLECTION Link
		$('.in-collection-link').click (function (event) {
			log ("in-collection click");
			event.preventDefault();
			
			gtag('event', 'navigate', {
				'event_category' : 'in-collection-link',
				'event_label' : $(event.target).html(),
				'value' : 0,
				'event_callback': 
				createFunctionWithTimeout (function () {
					var url = $(event.target).closest('a').prop("href");
					window.location = url;
				})
			})
		});
		
		
		/* TRACK breadcrumb clicks */
		$('.breadcrumbs a').click (function (event) {
			log ("breadcrumb click");
			event.preventDefault();
			
			gtag('event', 'navigate', {
				'event_category' : 'breadcrumb',
				'event_label' : $(event.target).attr('title') || $(event.target).html(),
				'value' : 0,
				'event_callback': 
				createFunctionWithTimeout (function () {
					var url = $(event.target).closest('a').prop("href");
					window.location = url;
				})
			})
		});
		
		// TRACK DATE-RANGE WIDGET FORM
		/* this does not trap submits triggered by the bottom "filter" button (see
		   handler for #edit-date-filter-date-filter-submit.click() above
		*/
		instrument_form('islandora-solr-range-slider-form-0', 'filter', 'date-range');

		// TRACK date-range-widget
		/* For some reason, the bottom "filter button" does not trigger form submit
		   so we have to trap it as a click and then call the form.submit();
		   sends same data as the $date_range_form submit method below
		*/
		var solr_range_slider_form = document.getElementById('islandora-solr-range-slider-form-0');
		if (solr_range_slider_form != null) {
			$('#edit-date-filter-date-filter-submit').click (function (event) {
				log ("date-range-submit");
				event.preventDefault();
				var form = document.getElementById('islandora-solr-range-slider-form-0');
				gtag('event', 'filter', {
					'event_category' : 'date-range',
					'event_label' : '',
					'value' : 0,
					'event_callback': 
					createFunctionWithTimeout (function () {
						$(event.target).closest ('form').submit();
					})
				})
			});
		}

		// TRACK Search-this-collection
		var collection_search_form_id = 'openskydora-search-collection-search-form';
		var collection_search_term_selector = '#edit-openskydora-collection-search-query';
		instrument_search_form(collection_search_form_id, collection_search_term_selector, 'collection-search');		

		// SIMPLE-SEARACH form tracking
		var simple_search_form_id = 'openskydora-simple-search-form';
		var simple_search_term_selector = 'edit-openskydora-simple-search-query';
		instrument_search_form(simple_search_form_id, simple_search_term_selector, 'simple-search');				
		// ADVANCED-SEARACH form tracking
		var advanced_search_form_id = 'openskydora-advanced-search-form';
		var advanced_search_term_selector = '';
		instrument_search_form(advanced_search_form_id, advanced_search_term_selector, 'advanced-search');


	  // TRACK the facets
	  $('.islandora-solr-facet-wrapper').each (function (i, wrapper) {
		  var facet_name = $(wrapper).find ('h3').html();
		  $(wrapper).find ('.islandora-solr-facet').each (function (i, facet) {
			  var $link = $(facet).find('a');
			  var value = $link.html();
			  log ("- " + i + ": " + facet_name + ": " + value);
			  $link.click (handle_facet_click);
			  
		  });
	  });

		// TRACK SORT By Links
		$('#block-islandora-solr-sort a').each (function (i, sort_link) {
			var $link = $(sort_link);
			log ("- " + $link.attr('title'));
		});

		$('#block-islandora-solr-sort a').click (handle_sort_click);
		
		
	});		 // wait for dom to load
	
	
	function instrument_search_form(form_id, search_term_selector, category, value=0) {
		/* 
		   action is hardcoded as "search'
		   the event label is the search term
		*/
		var form = document.getElementById(form_id);
		if (form != null) {
			form.addEventListener ('submit', function (event) {
				log ("instrument_search_form: " + form_id);
				
				// Prevent the browser from submitting the form
				// and thus unloading the current page.
				event.preventDefault();

				// Send the event to Google Analytics and
				// resubmit the form once the hit is done.
				gtag('event', 'search', {
					'event_category' : category,
					'event_label' : $(search_term_selector).val(),
					'value' : value,
					'event_callback': function() {
						log ("calling callback for " + form_id);
						$(event.target).closest ('form').submit();
					}
				});
			});
		}
	}
	
	function instrument_form(form_id, action, category, label, value=0) {
		// TRACK date-range-widget
		/* For some reason, the bottom "filter button" does not trigger form submit
		   so we have to trap it as a click and then call the form.submit();
		   sends same data as the $date_range_form submit method below
		*/
		var form = document.getElementById(form_id);
		if (form != null) {
			form.addEventListener ('submit', function (event) {
				log ("instrument_form: " + form_id);
				
				// Prevent the browser from submitting the form
				// and thus unloading the current page.
				event.preventDefault();
				
				// Send the event to Google Analytics and
				// resubmit the form once the hit is done.
				gtag('event', action, {
					'event_category' : category,
					'event_label' : label,
					'value' : value,
					'event_callback': function() {
						log ("calling callback for " + form_id);
						$(event.target).closest ('form').submit();
					}
				});
			});
		}
	}

	function handle_facet_click (event) {
		event.preventDefault();
		var $link = $(event.target);
		var value = $link.html();
		var facet_name = "UNKNOWN";
		facet_name = $link.closest('.islandora-solr-facet-wrapper').find('h3').html();
		//		  log ("- " + facet_name + ": " + value);
		
		gtag('event', 'filter', {
            'event_category' : facet_name,
            'event_label' : value,
            'value' : 0,
            'event_callback':
            createFunctionWithTimeout (function () {
                var url = $(event.target).closest('a').prop("href");
                window.location = url;
            })
		});
	}
	
	function handle_sort_click (event) {
		event.preventDefault();
		var $link = $(event.target);
		var sortby = $link.attr('title');
		
		gtag('event', 'sort', {
            'event_category' : sortby,
            'event_label' : '',
            'value' : 0,
            'event_callback':
            createFunctionWithTimeout (function () {
                var url = $(event.target).closest('a').prop("href");
                window.location = url;
            })
		});
	}

}(jQuery));
