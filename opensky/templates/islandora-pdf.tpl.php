<?php

/**
 * @file
 * This is the template file for the pdf object
 *
 * @TODO: Add documentation about this file and the available variables
 */
?>

<div class="islandora-pdf-object islandora" vocab="http://schema.org/" prefix="dcterms: http://purl.org/dc/terms/" typeof="Article">
  <div class="islandora-pdf-content-wrapper clearfix">
    <?php if (isset($islandora_content)): ?>
      <div class="islandora-pdf-content">
        <?php print $islandora_content; ?>
      </div>
      <?php if (isset($islandora_download_link)): ?>
        <?php print $islandora_download_link; ?>
      <?php endif; ?>
    <?php endif; ?>
  </div>



<!-- usage stats -->

<?php  if (module_exists('islandora_usage_stats')): ?>
<div>
<?php
   module_load_include('inc', 'islandora_usage_stats', 'includes/db');
?>

<p>
   Times viewed: <?php 
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
   ?>
      <br/>
         Times downloaded: <?php print $times_downloaded; ?>
   <?php endif; ?>


</p>
</div>
<?php endif; ?>




<!-- end usage stats -->






  <div class="islandora-pdf-metadata">
    <?php print $description; ?>
    <?php if($parent_collections): ?>
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
