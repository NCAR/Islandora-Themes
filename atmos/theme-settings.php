<?php

/**
 * @file
 * Theme setting callbacks for the BAT Overrides theme
 */

/**
 * Implements hook_form_FORM_ID_alter().
 */
function atmos_form_system_theme_settings_alter(&$form, &$form_state) {
  $form['theme_settings']['slogan_background_image'] = array(
    '#type' => 'checkbox',
    '#title' => t('Use a background image for the Site Slogan?'),
    '#default_value' => theme_get_setting('slogan_background_image'),
    '#description' => t('Uses the image found at atmos/images/slogan.png for the site slogan.  You are free to change this image file with one that suits your site.  Please note, if you select this option, the text version of the "Site slogan" will not appear, even if you have it checked below.'),
    // Place this above other options.
    '#weight' => -2,
  );
  $form['theme_settings']['nsf_logo'] = array(
    '#type' => 'checkbox',
    '#title' => t('Include the NSF logo?'),
    '#default_value' => theme_get_setting('nsf_logo'),
    '#description' => t('Uses the image found at atmos/images/nsf.png for the NSF logo.  Do not use this option with the site slogan option, they will conflict with one another.'),
    // Place this above other options.
    '#weight' => -2,
  );
}
