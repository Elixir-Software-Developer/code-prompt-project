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

        // Allow all multi-touch gestures including pinch-to-zoom for accessibility
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

    // Handle touch move to allow scrolling but prevent multi-touch gestures
    document.addEventListener('touchmove', function(e) {
      if (contentSection.contains(e.target) || contentSection === e.target ||
          section.contains(e.target) || section === e.target) {
        // Allow all touch gestures including scrolling and pinch-to-zoom
      }
    }, { passive: true });
  }

  // Handle text selection on mobile - only prevent in specific cases
  function disableTextSelection(e) {
    // Only prevent context menu, not all text selection
    if (e.target && e.type === 'contextmenu' &&
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

    // Do not add meta tags that restrict user scaling - important for accessibility
  }
})();
