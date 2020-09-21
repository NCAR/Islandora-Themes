<?php

/**
 * @file
 * This is the template file for the object page for large image
 *
 * Available variables:
 * - $islandora_object: The Islandora object rendered in this template file
 * - $islandora_dublin_core: The DC datastream object
 * - $dc_array: The DC datastream object values as a sanitized array. This
 *   includes label, value and class name.
 * - $islandora_object_label: The sanitized object label.
 * - $parent_collections: An array containing parent collection(s) info.
 *   Includes collection object, label, url and rendered link.
 * - $islandora_thumbnail_img: A rendered thumbnail image.
 * - $islandora_content: A rendered image. By default this is the JPG datastream
 *   which is a medium sized image. Alternatively this could be a rendered
 *   viewer which displays the JP2 datastream image.
 *
 * @see template_preprocess_islandora_large_image()
 * @see theme_islandora_large_image()
 */
?>
<div class="islandora-large-image-object islandora" vocab="http://schema.org/" prefix="dcterms: http://purl.org/dc/terms/" typeof="ImageObject">
  <div class="islandora-large-image-content-wrapper clearfix">
    <?php if ($islandora_content): ?>
      <?php if (isset($image_clip)): ?>
        <?php print $image_clip; ?>
      <?php endif; ?>
      <div class="islandora-large-image-content">
        <?php print $islandora_content; ?>
      </div>
    <?php endif; ?>


  </div>
  <div class="islandora-large-image-metadata">

<!-- usage stats -->
<?php  if (module_exists('islandora_usage_stats')): ?>
<div class="openskydora-info">
<?php
   module_load_include('inc', 'islandora_usage_stats', 'includes/db');
?>

   Times Viewed: <?php 
      /* using the view_count method from db.inc */
      print islandora_usage_stats_get_individual_object_view_count($islandora_object); ?>

   <?php

      /* using the downloads_count method from db.inc */
      $ds_count = islandora_usage_stats_get_datastream_downloads_count($islandora_object);
  ?>

<?php
      if ($ds_count) : /* check the JPG and TIFF (OBJ) download counts */
         $times_downloaded = 0;
         if (array_key_exists('OBJ', $ds_count)) $times_downloaded  = $ds_count['OBJ'];
         if (array_key_exists('JPG', $ds_count)) $times_downloaded += $ds_count['JPG'];
   ?>
      <br/>
         Times Downloaded (JPG/TIFF): <?php print $times_downloaded; ?>
   <?php endif; ?>

</div>
<?php endif; ?>
<!-- end usage stats -->


<div class="openskydora-info">
<?php
  if (isset($islandora_object['JPG'])) {
    $options['attributes']['class'] = array('islandora-pdf-link');
    print 'Download ' . l('Medium Sized Image (JPG)',  "islandora/object/{$islandora_object}/datastream/JPG/download", $options);
  }
?>
  
<?php if (isset($islandora_object['OBJ'])): ?>
  <br/>
  <?php
	$options['attributes']['class'] = array('islandora-pdf-link');
	print 'Download ' . l('Full Sized Image (TIFF)', "islandora/object/{$islandora_object}/datastream/OBJ/download", $options);
	?>
<?php endif; ?>
</div>


    <?php print $description; ?>
    <?php if ($parent_collections): ?>
      <div>
        <h2><?php print t('In collections'); ?></h2>
        <ul>
          <?php foreach ($parent_collections as $collection): ?>
        <li><?php print l($collection->label, "islandora/object/{$collection->id}"); ?></li>
          <?php endforeach; ?>
        </ul>
      </div>
    <?php endif; ?>
    <?php print $metadata; ?>
  </div>
</div>
