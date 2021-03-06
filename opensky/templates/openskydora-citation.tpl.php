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
$custom_download_link = l('Download PDF', $download_url, array('attributes' => array('class' => array('islandora-pdf-link'))));

// supplemental/related resources
$related_items = openskydora_get_related_items($variables['islandora_object']);
$related_software = $related_items['software'];
$related_datasets =  $related_items['datasets'];
$related_documents =  $related_items['documents'];
$related_other =  $related_items['other'];
$fgs_createdDate_dt = get_solr_field($islandora_object, 'fgs_createdDate_dt');
?>

<div class="islandora-citation-object islandora" vocab="http://schema.org/" prefix="dcterms: http://purl.org/dc/terms/" typeof="Article">
  <div class="islandora-citation-content-wrapper clearfix">
	<?php if (isset($citation)): ?>
	  <span class="citation" id="container_citation"><?php print $citation ?>
	  <button class="btn_copy_citation" onclick="copyCitation()">Copy Citation</button>
          </span>
	<?php endif; ?>

<div class="islandora-content-container">
    <div class="islandora-content-left">

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
		  <!--
          Times Viewed: <?php 
              /* using the view_count method from db.inc */
              print islandora_usage_stats_get_individual_object_view_count($islandora_object); ?>
		  -->
          <?php
              /* using the downloads_count method from db.inc */
              $ds_count = islandora_usage_stats_get_datastream_downloads_count($islandora_object); ?>
		  
          <?php if ($ds_count) : /* check the JPG and TIFF (OBJ) download counts */
                $times_downloaded = 0;
				$threshold_date_str = '2019-01-01';
				$threshold_date = strtotime($threshold_date_str);
				$created_date = strtotime($fgs_createdDate_dt);
				if (array_key_exists('PDF', $ds_count)) $times_downloaded  = $ds_count['PDF'];  ?>

		  <?php if ($times_downloaded > 0) : ?>
		  <?php $times_str = $times_downloaded > 1 ? 'times' : 'time'; ?>
                File Viewed:

			    <?php if ($created_date < $threshold_date) : ?>
				  <br/> <?php print $times_downloaded; ?> <?php print $times_str; ?> since <?php print $threshold_date_str; ?>
				<?php else : ?>
		          <?php print $times_downloaded; ?> <?php print $times_str; ?>
				<?php endif; ?>    <!-- created .... --> 

			  <?php endif; ?> <!-- times_downloa ..  -->
		  <?php endif; ?> <!-- ds_count -->
        </div>
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

    <!-- Related documents -->
    <?php if (@$related_documents): ?>
      <div class="related-documents">
        <h2><?php print t('Related Documents'); ?></h2>
		<ul>
<?php 
		  $document_count = 0;
		  $total = count($related_documents);
		  foreach ($related_documents as $document_item) {

			  if($document_count == 3){
                           print '<span id="document_more" class="hiddenContent">';
			  }
			  print $document_item['#markup'];

			  if($document_count == $total-1){
	                    print '</span>';
			  }
			  $document_count++;
		  }
				?>
		</ul>
<?php
			  if($document_count > 3){
				  print '<button id="document_more_btn" aria-label="Show more or less documents toggle" 
					 class="closed" onclick="toggleContent(\'document_more\')">'.t('Show more').'</button>';
			  }
?>
	  </div>
	<?php endif; ?>

    <!-- Related dataset -->
    <?php if (@$related_datasets): ?>
      <div class="related-datasets">
        <h2><?php print t('Supporting Datasets'); ?></h2>
		<ul>
<?php 
		  $dataset_count = 0;
		  $total = count($related_datasets);
		  foreach ($related_datasets as $dataset_item) {

			  if($dataset_count == 3){
                           print '<span id="dataset_more" class="hiddenContent">';
			  }
			  print $dataset_item['#markup'];

			  if($dataset_count == $total-1){
	                    print '</span>';
			  }
			  $dataset_count++;
		  }
				?>
		</ul>
<?php
			  if($dataset_count > 3){
				  print '<button id="dataset_more_btn" aria-label="Show more or less datasets toggle" 
					 class="closed" onclick="toggleContent(\'dataset_more\')">'.t('Show more').'</button>';
			  }
?>
	  </div>
	<?php endif; ?>

<!-- Related software -->
    <?php if (@$related_software): ?>
      <div class="related-software">
        <h2><?php print t('Supporting Software'); ?></h2>
		<ul>
		  <?php 
		  $software_count = 0;
		  $total = count($related_software);
		  foreach ($related_software as $software_item) {

			  if($software_count == 3){
				  print '<span id="software_more" class="hiddenContent">';
			  }
			  print $software_item['#markup'];

			  if($software_count == $total-1){
			    print '</span>';
			  }
			  $software_count++;
				}
				?>
		</ul>
<?php 
		  if($software_count > 3){
print '<button id="software_more_btn" aria-label="Show more or show less software toggle" class="closed" onclick="toggleContent(\'software_more\')">'.t('Show more').'</button>';
		  }
?>
	  </div>
	<?php endif; ?>

    <!-- Related Other -->
    <?php if (@$related_other): ?>
      <div class="related-other">
        <h2><?php print t('Supporting Service or Object'); ?></h2>
		<ul>
		  <?php 
		  $other_count = 0;
		  $total = count($related_other);
		  foreach ($related_other as $other_item) {

			  if($other_count == 3){
				  print '<span id="other_more" class="hiddenContent">';
			  }
			  print $other_item['#markup'];

			  if($other_count == $total-1){
			    print '</span>';
			  }
			  $other_count++;
				}
				?>
		</ul>
<?php 
		  if($other_count > 3){
print '<button id="other_more_btn" aria-label="Show more or show less other toggle" class="closed" onclick="toggleContent(\'other_more\')">'.t('Show more').'</button>';
		  }
?>
	  </div>
	<?php endif; ?>
		    

	</div>
    <div class="islandora-content-right">

  <div class="islandora-citation-metadata">
    <?php print $description; ?>

    <?php if (isset($doi_link)): ?>
    <div class="openskydora-info published-url">
	  <?php print $doi_link ?>
	</div>
    <?php endif; ?>	

    <?php print $metadata; ?>
  </div>

</div>
  </div> 


  </div>

</div>
