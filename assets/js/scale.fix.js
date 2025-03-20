/**
 * Scale fix script for mobile devices
 * Includes specific fixes for content pane resizing issues
 */

(function() {
  // Prevent unwanted scaling and resizing on mobile devices
  var contentSection = document.querySelector('.content-column');
  var section = document.querySelector('section');

  if (contentSection) {
    // Store original height to prevent unwanted resizing
    var originalHeight = contentSection.offsetHeight;

    // Fix for iOS and Android touch events that might cause resizing
    document.addEventListener('touchstart', function(e) {
      // Only apply fixes if target is within content section
      if (contentSection.contains(e.target) || contentSection === e.target ||
          section.contains(e.target) || section === e.target) {
        // Set a fixed height during touch to prevent resize
        contentSection.style.height = originalHeight + 'px';
        contentSection.style.minHeight = originalHeight + 'px';

        // Prevent touch callout and text selection which can trigger resizing
        e.preventDefault();

        // Prevent pinch zoom on content section
        if (e.touches && e.touches.length > 1) {
          e.preventDefault();
        }
      }
    }, { passive: false });

    // Reset styles after touch end
    document.addEventListener('touchend', function(e) {
      if (contentSection.contains(e.target) || contentSection === e.target ||
          section.contains(e.target) || section === e.target) {
        // Remove fixed height with a slight delay to prevent flicker
        setTimeout(function() {
          contentSection.style.height = '';
          contentSection.style.minHeight = '';
        }, 300);
      }
    }, { passive: true });

    // Handle touch move to prevent unwanted behaviors
    document.addEventListener('touchmove', function(e) {
      if (contentSection.contains(e.target) || contentSection === e.target ||
          section.contains(e.target) || section === e.target) {
        // Allow scrolling but prevent other touch behaviors that might cause resize
        if (e.touches && e.touches.length > 1) {
          e.preventDefault();
        }
      }
    }, { passive: false });
  }

  // Disable text selection on mobile which can cause unwanted resize behavior
  function disableTextSelection(e) {
    if (e.target &&
        (contentSection.contains(e.target) || contentSection === e.target ||
         section.contains(e.target) || section === e.target)) {
      e.preventDefault();
      return false;
    }
  }

  // For mobile devices only
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    // Prevent context menu on long press which can cause resize
    document.addEventListener('contextmenu', disableTextSelection);

    // Disable double-tap to zoom
    document.addEventListener('dblclick', function(e) {
      if (contentSection.contains(e.target) || contentSection === e.target ||
          section.contains(e.target) || section === e.target) {
        e.preventDefault();
      }
    });

    // Add additional meta tag to disable scaling
    var meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
    document.getElementsByTagName('head')[0].appendChild(meta);
  }
})();
