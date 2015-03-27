<?php

// Put the logo path into JavaScript for the live preview.
drupal_add_js(array('color' => array('logo' => theme_get_setting('logo', 'atmos'))), 'setting');

$info = array(
  // Available colors and color labels used in theme.
  'fields' => array(
    'top' => t('Header top'),
    'bottom' => t('Header bottom'),
    'titleslogan' => t('Title and slogan'),
    'bg' => t('Main background'),
    'text' => t('Text color'),
    'link' => t('Link color'),
    'lightblock' => t('Light block background'),
    'mediumblock' => t('Medium block background'),
    'darkblock' => t('Dark block background'),
    'blocktext' => t('Block text color'),
    'blocklink' => t('Block link color'),
    'footernav' => t('Footer background'),
    'footertext' => t('Footer text color'),
    'footerlink' => t('Footer link color'),
  ),
  // Pre-defined color schemes.
  'schemes' => array(
    'default' => array(
      'title' => t('Atmos (default)'),
      'colors' => array(
        'top' => '#a42220',
        'bottom' => '#910f0f',
        'titleslogan' => '#fffeff',
        'bg' => '#ffffff',
        'text' => '#333333',
        'link' => '#d75900',
        'lightblock' => '#a82929',
        'mediumblock' => '#911010',
        'darkblock' => '#353535',
        'blocktext' => '#eeeeee',
        'blocklink' => '#ff9900',
        'footernav' => '#e3e4e6',
        'footertext' => '#666666',
        'footerlink' => '#d75911',
      ),
    ),
    'ucar' => array(
      'title' => t('UCAR'),
      'colors' => array(
        'top' => '#24487d',
        'bottom' => '#003366',
        'titleslogan' => '#fffeff',
        'bg' => '#ffffff',
        'text' => '#333333',
        'link' => '#d75900',
        'lightblock' => '#24487d',
        'mediumblock' => '#003366',
        'darkblock' => '#333333',
        'blocktext' => '#eeeeee',
        'blocklink' => '#ff9900',
        'footernav' => '#e3e4e6',
        'footertext' => '#666666',
        'footerlink' => '#d75911',
      ),
    ),
    'forstaff' => array(
      'title' => t('For Staff'),
      'colors' => array(
        'top' => '#28543d',
        'bottom' => '#01472b',
        'titleslogan' => '#fffeff',
        'bg' => '#ffffff',
        'text' => '#333333',
        'link' => '#003366',
        'lightblock' => '#28543d',
        'mediumblock' => '#01472b',
        'darkblock' => '#333333',
        'blocktext' => '#eeeeee',
        'blocklink' => '#ff9900',
        'footernav' => '#e3e4e6',
        'footertext' => '#666666',
        'footerlink' => '#d75911',
      ),
    ),
    'bartik' => array(
      'title' => t('Bartik Blue kinda'),
      'colors' => array(
        'top' => '#1199ee',
        'bottom' => '#0779bf',
        'titleslogan' => '#fffeff',
        'bg' => '#ffffff',
        'text' => '#333333',
        'link' => '#a82626',
        'lightblock' => '#1199ee',
        'mediumblock' => '#0779bf',
        'darkblock' => '#333333',
        'blocktext' => '#eeeeee',
        'blocklink' => '#bb1010',
        'footernav' => '#e3e4e6',
        'footertext' => '#666666',
        'footerlink' => '#a82626',
      ),
    ),
    'greenleaf' => array(
      'title' => t('Green leaf'),
      'colors' => array(
        'top' => '#60aa00',
        'bottom' => '#448040',
        'titleslogan' => '#000000',
        'bg' => '#ffffff',
        'text' => '#333333',
        'link' => '#b38500',
        'lightblock' => '#60aa00',
        'mediumblock' => '#448040',
        'darkblock' => '#333333',
        'blocktext' => '#eeeeee',
        'blocklink' => '#e2d56a',
        'footernav' => '#e3e4e6',
        'footertext' => '#666666',
        'footerlink' => '#b38500',
      ),
    ),
    'dandelion' => array(
      'title' => t('Dandelion'),
      'colors' => array(
        'top' => '#f7e400',
        'bottom' => '#cfc000',
        'titleslogan' => '#fffeff',
        'bg' => '#ffffff',
        'text' => '#333333',
        'link' => '#d75900',
        'lightblock' => '#f7e400',
        'mediumblock' => '#cfc000',
        'darkblock' => '#333333',
        'blocktext' => '#333333',
        'blocklink' => '#d75900',
        'footernav' => '#e3e4e6',
        'footertext' => '#666666',
        'footerlink' => '#d75900',
      ),
    ),
    'naranja' => array(
      'title' => t('Naranja'),
      'colors' => array(
        'top' => '#f7b500',
        'bottom' => '#cf9000',
        'titleslogan' => '#000000',
        'bg' => '#ffffff',
        'text' => '#333333',
        'link' => '#116fb6',
        'lightblock' => '#f7b500',
        'mediumblock' => '#cf9000',
        'darkblock' => '#333333',
        'blocktext' => '#333333',
        'blocklink' => '#177ac4',
        'footernav' => '#e3e4e6',
        'footertext' => '#666666',
        'footerlink' => '#116fb6',
      ),
    ),
    'plum' => array(
      'title' => t('Plum'),
      'colors' => array(
        'top' => '#9662a3',
        'bottom' => '#844f92',
        'titleslogan' => '#ffffff',
        'bg' => '#fffdf7',
        'text' => '#333333',
        'link' => '#9d408d',
        'lightblock' => '#9662a3',
        'mediumblock' => '#844f92',
        'darkblock' => '#353535',
        'blocktext' => '#eeeeee',
        'blocklink' => '#5ab356',
        'footernav' => '#e3e4e6',
        'footertext' => '#666666',
        'footerlink' => '#9d408d',
      ),
    ),
    'ice' => array(
      'title' => t('Ice'),
      'colors' => array(
        'top' => '#d0d0d0',
        'bottom' => '#c2c4c5',
        'titleslogan' => '#000000',
        'bg' => '#ffffff',
        'text' => '#333333',
        'link' => '#d75900',
        'lightblock' => '#dedede',
        'mediumblock' => '#9c9c9c',
        'darkblock' => '#353535',
        'blocktext' => '#333333',
        'blocklink' => '#d75900',
        'footernav' => '#e3e4e6',
        'footertext' => '#666666',
        'footerlink' => '#d75900',
      ),
    ),
    'slate' => array(
      'title' => t('Slate'),
      'colors' => array(
        'top' => '#4a4a4a',
        'bottom' => '#5e5e5e',
        'titleslogan' => '#ffffff',
        'bg' => '#ffffff',
        'text' => '#333333',
        'link' => '#d75900',
        'lightblock' => '#5e5e5e',
        'mediumblock' => '#4a4a4a',
        'darkblock' => '#353535',
        'blocktext' => '#eeeeee',
        'blocklink' => '#d75900',
        'footernav' => '#e3e4e6',
        'footertext' => '#666666',
        'footerlink' => '#d75900',
      ),
    ),
  ),

  // CSS files (excluding @import) to rewrite with new color scheme.
  'css' => array(
    'css/colors.css',
  ),

  // Files to copy.
  'copy' => array(
    'logo.png',
  ),

  // Gradient definitions.
  'gradients' => array(
    array(
      // (x, y, width, height).
      'dimension' => array(0, 0, 0, 0),
      // Direction of gradient ('vertical' or 'horizontal').
      'direction' => 'vertical',
      // Keys of colors to use for the gradient.
      'colors' => array('top', 'bottom'),
    ),
  ),

  // Color areas to fill (x, y, width, height).
  'fill' => array(),

  // Coordinates of all the theme slices (x, y, width, height)
  // with their filename as used in the stylesheet.
  'slices' => array(),

  // Reference color used for blending. Matches the base.png's colors.
  'blend_target' => '#ffffff',

  // Preview files.
  'preview_css' => 'color/preview.css',
  'preview_js' => 'color/preview.js',
  'preview_html' => 'color/preview.html',

  // Base file for image generation.
  'base_image' => 'color/base.png',
);
