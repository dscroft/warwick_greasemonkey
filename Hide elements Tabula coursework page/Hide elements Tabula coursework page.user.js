// ==UserScript==
// @name         Hide elements Tabula coursework page
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Hide Markdown preview boxes on Tabula profile page
// @match        https://tabula.warwick.ac.uk/coursework/admin/assignments/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function hideMdPreview() {
            // hide the markdown preview boxes, unless they contain specific labels
            document.querySelectorAll('.marking-and-feedback').forEach(container => {
                container.querySelectorAll('.form-group').forEach(formGroup => {
                    const label = formGroup.querySelector('label[for="file.upload"], label[for="mark"]');
                    if (!label) {
                        formGroup.style.display = 'none';
                    }
                });
            });

            // hide the help text, just takes up space
            document.querySelectorAll('.marking-and-feedback').forEach(container => {
                container.querySelectorAll('.help-block').forEach(el => {
                    el.style.display = 'none';
                });
            });

            document.querySelectorAll('.originality-reports').forEach(report => {
                const turnitinLink = report.querySelector('[target="turnitin-viewer"]');
                if (turnitinLink) {
                    const href = turnitinLink.getAttribute('href');
                    // Check if a "View Report" link is already present
                    const existing = Array.from(report.children).find(
                        el => el.tagName === 'A' && el.textContent.trim() === 'View Report'
                    );
                    if (!existing) {
                        const viewLink = document.createElement('a');
                        viewLink.href = href;
                        viewLink.textContent = 'View Report';
                        viewLink.target = '_blank';
                        // Insert as the first child
                        report.insertBefore(viewLink, report.firstChild);
                    }
                }
            });
      
        }

    // Observe DOM changes to hide new "md-preview" elements
    const observer = new MutationObserver(hideMdPreview);
    observer.observe(document.body, { childList: true, subtree: true });
    
    hideMdPreview(); // Initial call to hide existing elements
})();
