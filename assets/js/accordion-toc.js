document.addEventListener('DOMContentLoaded', function() {
  // Find the main content section
  const contentSection = document.querySelector('section');
  const tocContainer = document.getElementById('toc-list');

  if (!contentSection || !tocContainer) return;

  // Find only h1, h2 headings for a less granular TOC
  const headings = contentSection.querySelectorAll('h1, h2');
  if (headings.length < 2) return; // Don't create TOC for just a few headings

  // Group headings by their levels to create the accordion structure
  let currentH1 = null;
  let currentH1Id = '';
  let h1Counter = 0;
  let h2Counter = 0;

  // Create accordion container
  const accordion = document.createElement('aside');
  accordion.className = 'p-accordion';

  const accordionList = document.createElement('ul');
  accordionList.className = 'p-accordion__list';

  accordion.appendChild(accordionList);

  // Process each heading
  headings.forEach(function(heading) {
    // Skip any "Contents" or "Table of Contents" heading
    if (heading.textContent.trim() === 'Contents' || heading.textContent.trim() === 'Table of Contents') return;

    // Create ID from heading text if it doesn't have one
    if (!heading.id) {
      const id = heading.textContent.toLowerCase()
        .replace(/[^\w\s-]/g, '')   // Remove special chars
        .replace(/\s+/g, '-')       // Replace spaces with hyphens
        .replace(/-+/g, '-');       // Replace multiple hyphens with single
      heading.id = id;
    }

    // Handle h1 and h2 differently
    if (heading.tagName.toLowerCase() === 'h1') {
      h1Counter++;
      currentH1 = heading;
      currentH1Id = 'accordion-h1-' + h1Counter;

      // Create accordion group for H1
      const accordionGroup = document.createElement('li');
      accordionGroup.className = 'p-accordion__group';

      // Create heading and button
      const accordionHeading = document.createElement('h3');
      accordionHeading.className = 'p-accordion__heading';

      const accordionTab = document.createElement('button');
      accordionTab.className = 'p-accordion__tab';
      accordionTab.type = 'button';
      accordionTab.id = currentH1Id;
      accordionTab.setAttribute('aria-controls', currentH1Id + '-section');
      accordionTab.setAttribute('aria-expanded', 'false');
      accordionTab.textContent = heading.textContent;

      accordionHeading.appendChild(accordionTab);
      accordionGroup.appendChild(accordionHeading);

      // Create panel
      const accordionPanel = document.createElement('section');
      accordionPanel.className = 'p-accordion__panel';
      accordionPanel.id = currentH1Id + '-section';
      accordionPanel.setAttribute('aria-hidden', 'true');
      accordionPanel.setAttribute('aria-labelledby', currentH1Id);

      // Create list for h2s that will be inside this panel
      const h2List = document.createElement('ul');
      accordionPanel.appendChild(h2List);

      accordionGroup.appendChild(accordionPanel);
      accordionList.appendChild(accordionGroup);

      // Reset h2 counter for this h1
      h2Counter = 0;
    } else if (heading.tagName.toLowerCase() === 'h2' && currentH1) {
      h2Counter++;

      // Find the panel for current h1
      const panel = document.getElementById(currentH1Id + '-section');
      if (panel) {
        const h2List = panel.querySelector('ul');
        if (h2List) {
          // Create list item for h2
          const h2Item = document.createElement('li');
          const h2Link = document.createElement('a');
          h2Link.href = '#' + heading.id;
          h2Link.textContent = heading.textContent;
          h2Item.appendChild(h2Link);
          h2List.appendChild(h2Item);
        }
      }
    }
  });

  // Add the accordion to the TOC container
  tocContainer.appendChild(accordion);

  // Setup accordion functionality
  function toggleExpanded(element, show) {
    var target = document.getElementById(element.getAttribute('aria-controls'));

    if (target) {
      element.setAttribute('aria-expanded', show);
      target.setAttribute('aria-hidden', !show);
    }
  }

  function setupAccordion(accordionContainer) {
    // Set up an event listener on the container
    accordionContainer.addEventListener('click', function(event) {
      let target = event.target;

      // Find the closest accordion tab
      if (target.closest) {
        target = target.closest('.p-accordion__tab');
      }

      if (target) {
        // Check if already open
        const isTargetOpen = target.getAttribute('aria-expanded') === 'true';

        // Toggle the clicked panel
        toggleExpanded(target, !isTargetOpen);
      }
    });
  }

  // Initialize all accordions
  setupAccordion(accordion);
});

// Handle active link highlighting on scroll
window.addEventListener('scroll', function() {
  // Debounce for performance
  if (this.scrollTimeout) clearTimeout(this.scrollTimeout);

  this.scrollTimeout = setTimeout(function() {
    // Find all heading elements that have IDs
    const headings = document.querySelectorAll('h1[id], h2[id]');

    // Find which one is currently at the top of the viewport
    let current = '';
    for (let i = 0; i < headings.length; i++) {
      const heading = headings[i];
      const rect = heading.getBoundingClientRect();

      // If the heading is in the viewport or just above it
      if (rect.top <= 100) {
        current = heading.id;
      } else {
        // Once we find a heading below the viewport, we can stop
        break;
      }
    }

    // Find the link in the accordion that corresponds to the current heading
    if (current) {
      const links = document.querySelectorAll('.p-accordion__panel a');
      links.forEach(link => {
        // Remove highlighting from all links
        link.style.fontWeight = 'normal';

        // If this link points to the current heading, highlight it
        if (link.getAttribute('href') === '#' + current) {
          link.style.fontWeight = 'bold';

          // Find and expand the parent accordion if it's collapsed
          const panel = link.closest('.p-accordion__panel');
          if (panel) {
            const accordionId = panel.getAttribute('aria-labelledby');
            if (accordionId) {
              const accordionTab = document.getElementById(accordionId);
              if (accordionTab && accordionTab.getAttribute('aria-expanded') === 'false') {
                accordionTab.click();
              }
            }
          }
        }
      });
    }
  }, 100);
});
