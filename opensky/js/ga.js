/*
a utility function to handle timeouts

usage:
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

function get_pid_from_path (s) {
	log ('--\n' + s);
	var m = /\/islandora\/object\/([^\/]*)/.exec (s);
	if (m) {
		return decodeURIComponent(m[1]);
	}
}

(function ($) {      // Use jQuery with the shortcut:

	$(function () {  // must wait for dom to load
		log ('openSky - ga.js processing');

		if (typeof(gtag) === 'undefined') {
			log ("GTAG is not defined");
		} else {
			
			// ADVANCE SEARCH TOGGLE
			$('.search-toggler')
				.click(function (event) {
					log ("sending GA event")
					var box = $(event.target).closest('.search-wrapper');
					if (typeof gtag === "function") {
						label = box.attr('id') == 'simple-search' ? 'open' : 'close';
						gtag('event', 'advanced-search', {
							'event_category' : 'toggle',
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
				gtag('event', 'details', {
					'event_category' : 'toggle',
					'event_label' : $field_set.hasClass('collapsed') ? 'close' : 'open',
					'value' : $field_set.hasClass('collapsed') ? 0 : 1  //  1 if its opened
				})
			});
			
			
			// IN-COLLECTION Link
			$('.in-collection-link').click (function (event) {
				log ("in-collection click");
				event.preventDefault();
				
				gtag('event', 'in-collection-link', {
					'event_category' : 'navigate',
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
				
				gtag('event', 'breadcrumb', {
					'event_category' : 'navigate',
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
					gtag('event', 'date-range', {
						'event_category' : 'filter',
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
					$link.click (handle_facet_click);
				});
			});
			
			
			// TRACK SORT By Links
			$('#block-islandora-solr-sort a').click (handle_sort_click);
			
			// Track download links
			$('.islandora-pdf-link').click (handle_download_click);
			
			// Track 'preview clicks'
			$('.islandora-pdf-content a').click (handle_preview_click);
			$('.islandora-basic-image-content a').click (handle_preview_click);
			$('.islandora-citation-content a').click (handle_preview_click);
			
			// --------------------
			/* TRACK related-datasets clicks */
			$('.related-datasets a').click (function (event) {
				log ("dataset click");
				handle_supporting_resource_click (event, 'dataset');
			});
			
			/* TRACK related-documents clicks */
			$('.related-documents a').click (function (event) {
				log ("related document click");
				handle_supporting_resource_click (event, 'document');
			});
			
			/* TRACK related-software clicks */
			$('.related-software a').click (function (event) {
				log ("software click");
				handle_supporting_resource_click (event, 'software');
			});
			
			/* TRACK related-other clicks */
			$('.related-other a').click (function (event) {
				log ("other click");
				handle_supporting_resource_click (event, 'other');
			});
			
			/* Track the MORE button for Contributors */
			$('#contrib_more_btn').click(function (event) {
				handle_more_less_btn_click(event, 'contributors');
			});
			
			/* Track the SHOW MORE button for DATASET */
			$('#dataset_more_btn').click(function (event) {
				handle_more_less_btn_click(event, 'datasets');
			});
			
			/* Track the SHOW MORE button for DOCUMENT */
			$('#document_more_btn').click(function (event) {
				handle_more_less_btn_click(event, 'documents');
			});
			
			/* Track the SHOW MORE button for SOFTWARE */
			$('#software_more_btn').click(function (event) {
				handle_more_less_btn_click(event, 'software');
			});
			
			/* Track the SHOW MORE button for other relatedItems */
			$('#other_more_btn').click(function (event) {
				handle_more_less_btn_click(event, 'other');
			});
			
			/* Track the SHOW MORE button for subjects */
			$('#subjects_more_btn').click(function (event) {
				handle_more_less_btn_click(event, 'subjects');
			});
			
			/* Track a subject-term metadata click */
			$('.subject-term>a').click(function (event) {
				event.preventDefault();
				var label = $(event.target).html();
				var action = 'subject-metadata';
				log ("label: " + label);
				
				gtag('event', action, {
					'event_category' : 'filter',
					'event_label' : label,
					'event_callback': createFunctionWithTimeout (function () {
						var url = $(event.target).closest('a').prop("href");
						window.location = url;
					})
				})
				
			});
			
			/* Track the COPY CITATION button */
			$('.btn_copy_citation').click(function (event) {
				log ("copy citation");
				var button = $(event.target)
				if (typeof gtag === "function") {
					gtag('event', 'citation', {
						'event_category' : 'copy',
					})
				}
			});
			
			/* Track the Show MORE btn for DESCRIPTION */
			$('.description a.toggler').click(function (event) {
				var label = $(event.target).html() == 'Show more' ? 'more' : 'less';
				gtag('event', 'description', {
					'event_category' : 'toggle',
					'event_label' : label,
					'value' : label == 'more' ? 1 : 0,
				})
			});
			
			/* Track exit links on Contribute page */
			$('.policy-link').click (function (event) {
				handle_exit_click(event, 'contribute-policy');
			})
			
			/* Track exit links on Contribute page */
			$('.contribute-button').click (function (event) {
				handle_exit_click(event, 'contribute-form');
			})		
			
			/* Track links in home page dynamic content */
			$('.dynamic-content a').click (function (event) {
				handle_home_dynamic_content_click(event);
			});
		}		
	});		 // wait for dom to load
	  
	function instrument_search_form(form_id, search_term_selector, action, value=0) {
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
				gtag('event', action, {
					'event_category' : 'search',
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
	
	function instrument_form(form_id, category, action, label, value=0) {
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
		var action = facet_name.replaceAll(' ', '_').toLowerCase() + "_facet";
		
		gtag('event', action, {
            'event_category' : 'filter',
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
		var action = "sort_by_" + sortby.replaceAll(' ', '_').toLowerCase();
		
 		gtag('event', action, {
            'event_category' : 'sort' ,
            'event_label' : sortby,
            'value' : 0,
            'event_callback':
            createFunctionWithTimeout (function () {
                var url = $(event.target).closest('a').prop("href");
                window.location = url;
            })
		});
	}
	
	function handle_supporting_resource_click (event, genre) {
        var button = $(event.target)
        if (typeof gtag === "function") {
            event.preventDefault();
			
            gtag('event', genre, {
                'event_category' : 'related',
				'event_label' : $(event.target).attr('href') || $(event.target).html(),
                'value' : 0,
                'event_callback':
                createFunctionWithTimeout (function () {
                    var url = $(event.target).closest('a').prop("href");
                    window.location = url;
                })
            })
		}
	}
	
	function handle_more_less_btn_click(event, genre) {
        var button = $(event.target)
        if (typeof gtag === "function") {
			var classes = button.attr('class').split(' ');
			if (typeof (classes) == 'string') {
				classes = [classes];
			}
			
			label = classes.includes ('opened') ? 'more' : 'less';
			log ("label: " + label);
			
			gtag('event', genre, {
				'event_category' : 'toggle',
				'event_label' : label,
				'value' : label == 'more' ? 1 : 0,
			})
		}
	}
	
	/*
	  - action: download
	  - category: (link text which generally tells object type, such as PDF
	  - label: the PID
	*/
	function handle_download_click (event) {
		
		event.preventDefault();
		var $link = $(event.target);
		var pid = get_pid_from_path($link.attr('href'));
		var action = $link.html();
		
		gtag('event', action, {
            'event_category' : 'download',
            'event_label' : pid,
            'value' : 0,
            'event_callback':
            createFunctionWithTimeout (function () {
                var url = $(event.target).closest('a.islandora-pdf-link').prop("href");
                window.location = url;
            })
		});
	}
	
	/*
	  - action: view
	  - category: PDF (hard coded)
	  - label: the PID
	*/
	function handle_preview_click (event) {
		event.preventDefault();
		var $link = $(event.target).closest('a');
		var pid = get_pid_from_path($link.attr('href'));
		var action = 'preview-click';
		
		gtag('event', action, {
            'event_category' : 'view',
            'event_label' : pid,
            'value' : 0,
            'event_callback':
            createFunctionWithTimeout (function () {
                var url = $(event.target).closest('a').prop("href");
                window.location = url;
            })
		});
	}
	
	/*
	  Track clicks on home page dynamic content. Clicks on altmetrics badges
	  are exit links, the others simply navigate within the site.
	  
	  - action: home-page-dynamic-content-link
	  - category: navigate OR exit
	  - label: id of inclosing div.dynamic-content
	*/
	function handle_home_dynamic_content_click (event) {
		event.preventDefault();
		var event_label = $(event.target).closest('.dynamic-content').prop("id");
		var event_action = 'home-page-dynamic-content-link';
		var $link = $(event.target).closest('a');
		
		// treat altmetrics-badge differently because it's an exit link
		if ($link.prop("class") == 'altmetrics-badge') {
			event_category = 'exit';
			event_label += "-altmetrics-badge";
		} else {
			event_category = 'navigate';
		}
		
		//log ('handle_home_dynamic_content_click: ' + event_label);
		//log ("- category: " + event_category);
		//log ("- event_action: " + event_action);
		
		
		gtag('event', event_action, {
            'event_category' : event_category,
            'event_label' : event_label,
            'value' : 0,
            'event_callback':
            createFunctionWithTimeout (function () {
                var url = $link.prop("href");
                window.location = url;
            })
		});
	}		  
	
	/*
	  - action: describes context of link (e.g., "contribution page")
	  - category: exit (hard coded)
	  - label: the URL of clicked link
	*/
	function handle_exit_click (event, action) {
		console.log ("handle_exit_click");
		event.preventDefault();
		var url = $(event.target).closest('a').prop("href");
		
		gtag('event', action, {
            'event_category' : 'exit',
            'event_label' : url,
            'value' : 0,
            'event_callback':
            createFunctionWithTimeout (function () {
                window.location = url;
            })
		});
	}
	
}(jQuery));


