<?php

/**
 * @file
 * This is the template file for the citation object
 *
 * @TODO: Add documentation about this file and the available variables
 */

// Change download_link to be consistent with other cmodels 
$sanitized_label = preg_replace('/[^A-Za-z0-9_\-]|\.citation$/', '_', $islandora_object->label);
$download_url = 'islandora/object/' . $islandora_object->id . '/datastream/PDF/download/' . $sanitized_label . '.citation';
$custom_download_link = 'Download ' . l('PDF', $download_url, array('attributes' => array('class' => array('islandora-pdf-link'))));
?>

<div class="islandora-citation-object islandora" vocab="http://schema.org/" prefix="dcterms: http://purl.org/dc/terms/" typeof="Article">
  <div class="islandora-citation-content-wrapper clearfix">
	<?php if (isset($citation)): ?>
	  <span class="citation"><?php print $citation ?></span>
	<?php endif; ?>
	<?php if (isset($islandora_content)): ?>
      <div class="islandora-citation-content">
        <?php print $islandora_content; ?>
      </div>


      <!-- usage stats -->
      <?php  if (module_exists('islandora_usage_stats')): ?>
        <div class="openskydora-info usage-stats">
          <?php
              module_load_include('inc', 'islandora_usage_stats', 'includes/db');
          ?>
          &nbsp;<br/>
          Times Viewed: <?php 
              /* using the view_count method from db.inc */
              print islandora_usage_stats_get_individual_object_view_count($islandora_object); ?>
    
          <?php
              /* using the downloads_count method from db.inc */
              $ds_count = islandora_usage_stats_get_datastream_downloads_count($islandora_object); ?>
    
          <?php if ($ds_count) : /* check the JPG and TIFF (OBJ) download counts */
                  $times_downloaded = 0;
                  if (array_key_exists('PDF', $ds_count)) $times_downloaded  = $ds_count['PDF'];  ?>
              <br/>
                  Times Downloaded: <?php print $times_downloaded; ?>
  
          <?php endif; ?> 
  
        </div>
      <?php endif; ?>  <!-- islandora_usage_stats -->
      <!-- end usage stats -->
      <?php if (isset($islandora_download_link)): ?>
        <div class="openskydora-info"><?php print $custom_download_link; ?></div>
      <?php endif; ?>
    <?php endif; ?>
    <?php if (isset($doi_link)): ?>
    <div class="openskydora-info">
	  <?php print $doi_link ?>
	</div>
    <?php endif; ?>	

  </div>

  <div class="islandora-citation-metadata">
    <?php print $description; ?>
    <?php if($parent_collections): ?>
      <div class="in-collections">
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
