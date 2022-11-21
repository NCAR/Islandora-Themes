<?php

/**
 * Returns HTML for a breadcrumb trail.
 *
 * @param $variables
 *   An associative array containing:
 *   - breadcrumb: An array containing the breadcrumb links.
 */
function opensky_breadcrumb($variables) {
  $breadcrumb = $variables['breadcrumb'];

  if (!empty($breadcrumb)) {
    // Provide a navigational heading to give context for breadcrumb links to
    // screen-reader users. Make the heading invisible with .element-invisible.
    $output = '<h2 class="element-invisible">' . t('You are here') . '</h2>';

    $new_crumbs = array();
    foreach ($breadcrumb as $index=>$val) {
        $output .= $val;
        if ($index < count($breadcrumb) -1) {
            if (strpos ($val, 'search-breadcrumb') || strpos($val, 'filter-breadcrumb')) {
                $output .= ': ';
            } else if (strpos ($breadcrumb[$index+1], 'search-breadcrumb') || strpos ($breadcrumb[$index+1], 'filter-breadcrumb')) {
                $output .= '<span class="spacer-breadcrumb">&nbsp;</span> ';
            } else {
                $output .= ' | ';
            }
        }
    }
    
    return $output;
  }
}

function opensky_preprocess_page (&$variables, $hook) {
    // drupal_set_message ('PREPROCESSING Page');
    $variables['show_content_alert'] = openskydora_show_content_alert();
    // dsm($variables);
}

/**
 * Add body classes if certain regions have content.
 */
function opensky_preprocess_html(&$variables) {

  // Setup Google Webmasters Verification Meta Tag
    // WHY do we need this verification??
  $google_webmasters_verification = array(
    '#type' => 'html_tag',
    '#tag' => 'meta',
    '#attributes' => array(
      'name' => 'google-site-verification',
      // REPLACE THIS CODE WITH THE ONE GOOGLE SUPPLIED YOU WITH
      'content' => 'JszSTjsDycPOwOlpq9EszOtSe7S7BlYGhQzrhShwQF8',
    )
  );
 
  // Add Google Webmasters Verification Meta Tag to head
  drupal_add_html_head($google_webmasters_verification, 'google_webmasters_verification');
}
