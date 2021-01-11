<?php

/**
 * @file
 * This is the template file for the pdf object
 *
 * @TODO: Add documentation about this file and the available variables
 */

// Change download_link to be consistent with other cmodels 
$sanitized_label = preg_replace('/[^A-Za-z0-9_\-]|\.pdf$/', '_', $islandora_object->label);
$download_url = 'islandora/object/' . $islandora_object->id . '/datastream/OBJ/download/' . $sanitized_label . '.pdf';
$custom_download_link = l('Download PDF', $download_url, array('attributes' => array('class' => array('islandora-pdf-link'))));

// supplemental/related resources
$funding_info = openskydora_get_funding_info($variables['islandora_object']);
$related_items = openskydora_get_related_items($variables['islandora_object']);
$related_software = $related_items['software'];
$related_datasets =  $related_items['datasets'];
$related_other =  $related_items['other'];
?>

<div class="islandora-pdf-object islandora" vocab="http://schema.org/" prefix="dcterms: http://purl.org/dc/terms/" typeof="Article">
<div class="islandora-pdf-content-wrapper clearfix">

<div class="islandora-content-container">
<div class="islandora-content-left">  

    <?php if (isset($islandora_content)): ?>
      <div class="islandora-pdf-content">
        <?php print $islandora_content; ?>
      </div>


      <!-- usage stats -->
      <?php  if (module_exists('islandora_usage_stats')): ?>
        <!--//div class="openskydora-info usage-stats">
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
                  if (array_key_exists('OBJ', $ds_count)) $times_downloaded  = $ds_count['OBJ'];  ?>
              <br/>
                  Times Downloaded: <?php print $times_downloaded; ?>
  
          <?php endif; ?> 
  
        </div//-->
      <?php endif; ?>  <!-- islandora_usage_stats -->
      <!-- end usage stats -->
      <?php if (isset($islandora_download_link)): ?>
        <div class="openskydora-info download-button"><?php print $custom_download_link; ?></div>
      <?php endif; ?>
    <?php endif; ?>


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

    <!-- Related dataset -->
    <?php if (@$related_datasets): ?>
      <div class="related-datasets">
        <h2><?php print t('Supporting Datasets'); ?></h2>
		<ul>
		  <?php foreach ($related_datasets as $dataset_item) {
				  print $dataset_item['#markup'];
				}
				?>
		</ul>
	  </div>
	<?php endif; ?>

    <!-- Related software -->
    <?php if (@$related_software): ?>
      <div class="related-software">
        <h2><?php print t('Supporting Software'); ?></h2>
		<ul>
		  <?php foreach ($related_software as $software_item) {
				  print $software_item['#markup'];
				}
				?>
		</ul>
	  </div>
	<?php endif; ?>

    <!-- Related other -->
    <?php if (@$related_other): ?>
      <div class="related-other">
        <h2><?php print t('Supporting Service or Object'); ?></h2>
		<ul>
		  <?php foreach ($related_other as $other_item) {
				  print $other_item['#markup'];
				}
				?>
		</ul>
	  </div>
	<?php endif; ?>


  </div>

<div class="islandora-content-right">
  <div class="islandora-pdf-metadata">
    <?php print $description; ?>
    <?php print $metadata; ?>
  </div>
</div>
</div>
</div>
</div>
