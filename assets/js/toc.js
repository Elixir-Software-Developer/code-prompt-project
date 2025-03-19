document.addEventListener('DOMContentLoaded', function() {
  // Find the main content section
  const contentSection = document.querySelector('section');
  if (!contentSection) return;

  // Find all headings (h1, h2, h3, etc.) in the content
  const headings = contentSection.querySelectorAll('h1, h2, h3, h4, h5, h6');
  if (headings.length < 3) return; // Don't create TOC for just a few headings

  // Create the TOC container
  const tocContainer = document.createElement('div');
  tocContainer.className = 'toc-container';
  tocContainer.innerHTML = '<h2 id="table-of-contents">Table of Contents</h2><div class="toc-list"></div>';

  const tocList = tocContainer.querySelector('.toc-list');

  // Track the nesting level of the TOC
  let previousLevel = 0;
  let listStack = [tocList];

  // Process each heading
  headings.forEach(function(heading) {
    // Skip the TOC heading itself if we encounter it
    if (heading.textContent.trim() === 'Table of Contents') return;

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

  // Insert TOC after the first heading or at the beginning of content
  const firstHeading = contentSection.querySelector('h1');
  if (firstHeading) {
    firstHeading.parentNode.insertBefore(tocContainer, firstHeading.nextSibling);
  } else {
    contentSection.insertBefore(tocContainer, contentSection.firstChild);
  }
});
