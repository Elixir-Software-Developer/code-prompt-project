document.addEventListener('DOMContentLoaded', function() {
  // Find the main content section and the TOC container
  const contentSection = document.querySelector('section');
  const tocListContainer = document.getElementById('toc-list');

  if (!contentSection || !tocListContainer) return;

  // Find all headings (h1, h2, h3, etc.) in the content
  const headings = contentSection.querySelectorAll('h1, h2, h3, h4, h5, h6');
  if (headings.length < 3) return; // Don't create TOC for just a few headings

  // Track the nesting level of the TOC
  let previousLevel = 0;
  let listStack = [tocListContainer];
  let rootList = document.createElement('ul');
  tocListContainer.appendChild(rootList);
  listStack = [rootList];

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

    // Get the heading level (h1=1, h2=2, etc.)
    const level = parseInt(heading.tagName.charAt(1));

    // For sidebar TOC, we might want to limit the depth
    if (level > 4) return; // Skip h5, h6 for sidebar TOC to keep it compact

    // Handle nesting of lists
    if (level > previousLevel) {
      // Need to create a new nested list
      for (let i = previousLevel; i < level; i++) {
        const nestedList = document.createElement('ul');
        if (listStack[listStack.length - 1].lastChild) {
          listStack[listStack.length - 1].lastChild.appendChild(nestedList);
          listStack.push(nestedList);
        } else {
          // If there's no previous item, create a new list at the current level
          listStack[listStack.length - 1].appendChild(nestedList);
          listStack.push(nestedList);
        }
      }
    } else if (level < previousLevel) {
      // Need to close some lists and go back up
      for (let i = previousLevel; i > level; i--) {
        listStack.pop();
      }
    }

    // Create the list item
    const listItem = document.createElement('li');
    const link = document.createElement('a');
    link.href = `#${heading.id}`;
    link.textContent = heading.textContent;
    listItem.appendChild(link);

    // Add to the current list
    listStack[listStack.length - 1].appendChild(listItem);

    previousLevel = level;
  });

  // Highlight current section when scrolling
  window.addEventListener('scroll', function() {
    // Debounce for performance
    if (this.scrollTimeout) clearTimeout(this.scrollTimeout);

    this.scrollTimeout = setTimeout(function() {
      // Find all heading elements that have IDs
      const headings = document.querySelectorAll('h1[id], h2[id], h3[id], h4[id]');

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

      // Remove 'active' class from all TOC links
      const tocLinks = document.querySelectorAll('.toc-list a');
      tocLinks.forEach(link => {
        link.classList.remove('active');
      });

      // Add 'active' class to the current section's TOC link
      if (current) {
        const activeLink = document.querySelector(`.toc-list a[href="#${current}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    }, 100);
  });
});
