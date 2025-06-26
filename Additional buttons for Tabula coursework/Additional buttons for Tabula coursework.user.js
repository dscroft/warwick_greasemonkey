// ==UserScript==
// @name         Additional buttons for Tabula coursework
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Add show/hide all buttons to Tabula
// @match        https://tabula.warwick.ac.uk/coursework/admin/assignments/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function addbuttons() {     
            document.querySelectorAll('.marking-stage').forEach(stage => {
                if (!stage.querySelector('.my-custom-btn')) {
                    // Expand all button
                    const btnExpand = document.createElement('button');
                    btnExpand.textContent = 'Expand all';
                    btnExpand.className = 'my-custom-btn btn';
                    btnExpand.addEventListener('click', () => {
                        stage.querySelectorAll('.clickable.collapsed.expandable-row').forEach(el => el.click());
                    });
                    stage.insertBefore(btnExpand, stage.firstChild);

                    // Collapse all button
                    const btnCollapse = document.createElement('button');
                    btnCollapse.textContent = 'Collapse all';
                    btnCollapse.className = 'my-custom-btn btn';
                    btnCollapse.addEventListener('click', () => {
                        stage.querySelectorAll('.clickable.expandable-row:not(.collapsed)').forEach(el => el.click());
                    });
                    stage.insertBefore(btnCollapse, btnExpand.nextSibling);
                }
            });
        }

    // Observe DOM changes to hide new "md-preview" elements
    const observer = new MutationObserver(addbuttons);
    observer.observe(document.body, { childList: true, subtree: true });
    
    addbuttons(); // Initial call to hide existing elements

    //clickable expandable-row collapsed


})();
