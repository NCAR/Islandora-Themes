<?php

/**
 * Add body classes if certain regions have content.
 */
function atmos_preprocess_html(&$variables) {
  if (!empty($variables['page']['featured'])) {
    $variables['classes_array'][] = 'featured';
  }

  if (!empty($variables['page']['triptych_first'])
    || !empty($variables['page']['triptych_middle'])
    || !empty($variables['page']['triptych_last'])) {
    $variables['classes_array'][] = 'triptych';
  }

  if (!empty($variables['page']['footer_firstcolumn'])
    || !empty($variables['page']['footer_secondcolumn'])
    || !empty($variables['page']['footer_thirdcolumn'])
    || !empty($variables['page']['footer_fourthcolumn'])) {
    $variables['classes_array'][] = 'footer-columns';
  }

  // Add conditional stylesheets for IE
  drupal_add_css(path_to_theme() . '/css/ie.css', array('group' => CSS_THEME, 'browsers' => array('!IE' => FALSE), 'preprocess' => FALSE));
  drupal_add_css(path_to_theme() . '/css/ie6.css', array('group' => CSS_THEME, 'browsers' => array('IE' => 'IE 6', '!IE' => FALSE), 'preprocess' => FALSE));
  drupal_add_css(path_to_theme() . '/css/ie7.css', array('group' => CSS_THEME, 'browsers' => array('IE' => 'IE 7', '!IE' => FALSE), 'preprocess' => FALSE));

  //create term classes for node pages
  //TODO: abstract this so it works for any entity
  $terms = array(); 
  if (arg(0) == 'node' && arg(1) != 'add' && arg(2) != 'edit') {
    $tnode = node_load(arg(1));
    $lang = $tnode->language;
    //$terms[] = 'NID_' . $node->nid;

    foreach($tnode as $key => $val) {
      $key_parts = explode('_', $key);
      if ($key_parts[0] == 'field') {
        $term_field = $tnode->$key;
        if (!empty($key)  && !empty($term_field[$lang])) {
          foreach ($term_field[$lang] as $term) {
            $variables['classes_array'][] = strtoupper(@$term['taxonomy_term']->vocabulary_machine_name) . '_TID' . @$term['taxonomy_term']->tid;
          }
        }
      }
    }
  }

}

/**
 * Override or insert variables into the page template for HTML output.
 */
function atmos_process_html(&$variables) {
  // Hook into color.module.
  if (module_exists('color')) {
    @_color_html_alter($variables);
  }
}

/**
 * Override or insert variables into the page template.
 */
function atmos_process_page(&$variables) {
  
  // When using subthemes, the function path_to_theme() does not always return the proper path.
  // Rather then giving the subtheme path, the function returns the parent theme path.
  // Below we set the variable $path_to_theme and make it available within page.tpl.php
  global $theme_key;
  $path_to_theme = drupal_get_path('theme', $theme_key);
  $variables['path_to_theme'] = $path_to_theme;
  
  // Hook into color.module.
  if (module_exists('color')) {
    @_color_page_alter($variables);
  }
  // atmos Specific
  $variables['nsf_logo']   = theme_get_setting('nsf_logo') ? TRUE : FALSE;
  $variables['slogan_background_image']   = theme_get_setting('slogan_background_image') ? TRUE : FALSE;
  
  // Always print the site name and slogan, but if they are toggled off, we'll
  // just hide them visually.
  $variables['hide_site_name']   = theme_get_setting('toggle_name') ? FALSE : TRUE;
  $variables['hide_site_slogan'] = theme_get_setting('toggle_slogan') ? FALSE : TRUE;
  if ($variables['hide_site_name']) {
    // If toggle_name is FALSE, the site_name will be empty, so we rebuild it.
    $variables['site_name'] = filter_xss_admin(variable_get('site_name', 'Drupal'));
  }
  if ($variables['hide_site_slogan']) {
    // If toggle_site_slogan is FALSE, the site_slogan will be empty, so we rebuild it.
    $variables['site_slogan'] = filter_xss_admin(variable_get('site_slogan', ''));
  }
  // Since the title and the shortcut link are both block level elements,
  // positioning them next to each other is much simpler with a wrapper div.
  if (!empty($variables['title_suffix']['add_or_remove_shortcut']) && $variables['title']) {
    // Add a wrapper div using the title_prefix and title_suffix render elements.
    $variables['title_prefix']['shortcut_wrapper'] = array(
      '#markup' => '<div class="shortcut-wrapper clearfix">',
      '#weight' => 100,
    );
    $variables['title_suffix']['shortcut_wrapper'] = array(
      '#markup' => '</div>',
      '#weight' => -99,
    );
    // Make sure the shortcut link is the first item in title_suffix.
    $variables['title_suffix']['add_or_remove_shortcut']['#weight'] = -100;
  }
}

/**
 * Implements hook_preprocess_maintenance_page().
 */
function atmos_preprocess_maintenance_page(&$variables) {
  if (!$variables['db_is_active']) {
    unset($variables['site_name']);
  }
  drupal_add_css(drupal_get_path('theme', 'atmos') . '/css/maintenance-page.css');
}

/**
 * Override or insert variables into the maintenance page template.
 */
function atmos_process_maintenance_page(&$variables) {
  // Always print the site name and slogan, but if they are toggled off, we'll
  // just hide them visually.
  $variables['hide_site_name']   = theme_get_setting('toggle_name') ? FALSE : TRUE;
  $variables['hide_site_slogan'] = theme_get_setting('toggle_slogan') ? FALSE : TRUE;
  if ($variables['hide_site_name']) {
    // If toggle_name is FALSE, the site_name will be empty, so we rebuild it.
    $variables['site_name'] = filter_xss_admin(variable_get('site_name', 'Drupal'));
  }
  if ($variables['hide_site_slogan']) {
    // If toggle_site_slogan is FALSE, the site_slogan will be empty, so we rebuild it.
    $variables['site_slogan'] = filter_xss_admin(variable_get('site_slogan', ''));
  }
}

/**
 * Override or insert variables into the node template.
 */
function atmos_preprocess_node(&$variables) {
  if ($variables['view_mode'] == 'full' && node_is_page($variables['node'])) {
    $variables['classes_array'][] = 'node-full';
  }
}

/**
 * Override or insert variables into the block template.
 */
function atmos_preprocess_block(&$variables) {
  // In the header region visually hide block titles.
  if ($variables['block']->region == 'header') {
    $variables['title_attributes_array']['class'][] = 'element-invisible';
  }
}

/**
 * Implements theme_menu_tree().
 */
function atmos_menu_tree($variables) {
  return '<ul class="menu clearfix">' . $variables['tree'] . '</ul>';
}

/**
 * Implements theme_field__field_type().
 */
function atmos_field__taxonomy_term_reference($variables) {
  $output = '';

  // Render the label, if it's not hidden.
  if (!$variables['label_hidden']) {
    $output .= '<h3 class="field-label">' . $variables['label'] . ': </h3>';
  }

  // Render the items.
  $output .= ($variables['element']['#label_display'] == 'inline') ? '<ul class="links inline">' : '<ul class="links">';
  foreach ($variables['items'] as $delta => $item) {
    $output .= '<li class="taxonomy-term-reference-' . $delta . '"' . $variables['item_attributes'][$delta] . '>' . drupal_render($item) . '</li>';
  }
  $output .= '</ul>';

  // Render the top-level DIV.
  $output = '<div class="' . $variables['classes'] . (!in_array('clearfix', $variables['classes_array']) ? ' clearfix' : '') . '">' . $output . '</div>';

  return $output;
}

/**
 *  Helper function to print user-friendly content type name on a page header.  Used in atmos theme.
 *  @param
 *  $node object - the node object of the node being viewed
 */
function atmos_print_content_type_name($node){
  if(!is_object($node)) return false;
  
  // First try to get name from menu system.. Two menus are used in atmos site:
  $name = '';
  if($name = _atmos_get_menu_items('menu-header-sub-nav')){
    return $name;
  }
  elseif($name = _atmos_get_menu_items('main-menu')){
    return $name;
  }
  return false;
}

/**
 *  Helper function to print user-friendly content type name on a page header.
 *  Build the menu tree
 */
function _atmos_get_menu_items($mid){
  $tree = menu_tree_page_data($mid);
  $names = _atmos_get_traverse_menu_tree($tree);
  $i = count($names)-2;
  if($i >= 0) return $names[$i];
  elseif($i + 1 >= 0) return $names[$i + 1];
}

/**
 *  Helper function to print user-friendly content type name on a page header.
 *  Traverse the menu tree and look for active_trail names
 */
function _atmos_get_traverse_menu_tree($tree){
  if(empty($tree) || !is_array($tree)) return false;
  
  static $names = array();

  // Traverse down the active trail and return last name
  foreach($tree as $menu => $links){
    if($links['link']['in_active_trail'] == '1'){
      $names[] = $links['link']['title'];
      _atmos_get_traverse_menu_tree($links['below']);
    }
  }
  return $names;
}

