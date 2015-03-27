<?php

/**
 * Add body classes if certain regions have content.
 */
function ncarlibrary_preprocess_html(&$variables) {
  // Setup Google Webmasters Verification Meta Tag
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