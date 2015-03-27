
(function ($) {
  Drupal.color = {
    logoChanged: false,
    callback: function(context, settings, form, farb, height, width) {
      // Change the logo to be the real one.
      if (!this.logoChanged) {
        $('#preview #preview-logo img').attr('src', Drupal.settings.color.logo);
        this.logoChanged = true;
      }
      // Remove the logo if the setting is toggled off. 
      if (Drupal.settings.color.logo == null) {
        $('div').remove('#preview-logo');
      }

      // Solid background.
      $('#preview-center-wrapper', form).css('backgroundColor', $('#palette input[name="palette[bg]"]', form).val());

      // Menu nav bar
      $('#preview #preview-header-sub-nav', form).css('background-color', $('#palette input[name="palette[bottom]"]', form).val());
      $('#preview #preview-header .block-menu li', form).css('border-color', $('#palette input[name="palette[top]"]', form).val());

      // Text preview.
      $('#preview #preview-content h1', form).css('color', $('#palette input[name="palette[bottom]"]', form).val());
      $('#preview #preview-content h1', form).css('border-bottom-color', $('#palette input[name="palette[bottom]"]', form).val());
      $('#preview .preview-content', form).css('color', $('#palette input[name="palette[text]"]', form).val());
      $('#preview #preview-content a', form).css('color', $('#palette input[name="palette[link]"]', form).val());

      // Blocks.
      $('#preview .preview-lightblock', form).css('color', $('#palette input[name="palette[blocktext]"]', form).val());
      $('#preview .preview-mediumblock', form).css('color', $('#palette input[name="palette[blocktext]"]', form).val());
      $('#preview .preview-lightblock', form).css('background-color', $('#palette input[name="palette[lightblock]"]', form).val());
      $('#preview .preview-mediumblock', form).css('background-color', $('#palette input[name="palette[mediumblock]"]', form).val());
      $('#preview .preview-darkblock', form).css('background-color', $('#palette input[name="palette[darkblock]"]', form).val());
      $('#preview .preview-block a', form).css('color', $('#palette input[name="palette[blocklink]"]', form).val());

      // Triptych.
      $('#preview #preview-triptych-wrapper .preview-lightblock h2', form).css('border-bottom-color', $('#palette input[name="palette[mediumblock]"]', form).val());
      $('#preview #preview-triptych-wrapper .preview-mediumblock h2', form).css('border-bottom-color', $('#palette input[name="palette[lightblock]"]', form).val());

      // Footer.
      $('#preview #preview-footer-wrapper', form).css('background-color', $('#palette input[name="palette[footernav]"]', form).val());
      $('#preview #preview-footer-wrapper', form).css('color', $('#palette input[name="palette[footertext]"]', form).val());
      $('#preview #preview-footer-wrapper a', form).css('color', $('#palette input[name="palette[footerlink]"]', form).val());

      // CSS3 Gradients.
      var gradient_start = $('#palette input[name="palette[top]"]', form).val();
      var gradient_end = $('#palette input[name="palette[top]"]', form).val();

      $('#preview #preview-header', form).attr('style', "background-color: " + gradient_start + "; background-image: -webkit-gradient(linear, 0% 0%, 0% 100%, from(" + gradient_start + "), to(" + gradient_end + ")); background-image: -moz-linear-gradient(-90deg, " + gradient_start + ", " + gradient_end + ");");

      $('#preview #preview-site-name', form).css('color', $('#palette input[name="palette[titleslogan]"]', form).val());
    }
  };
})(jQuery);
