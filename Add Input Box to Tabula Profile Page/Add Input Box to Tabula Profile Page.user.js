// ==UserScript==
// @name         Add Input Box to Tabula Profile Page
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Adds an input box to the element with ID 'aaa' on the Tabula profile page
// @match        https://tabula.warwick.ac.uk/profiles/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

  	function extract(htmlText) {
				const parser = new DOMParser();

        // Parse the HTML text into a document
        const doc = parser.parseFromString(htmlText, 'text/html');

      	console.log( htmlText )
      
        // Get the element with class "identity"
        const identityElement = doc.querySelector('.identity');

        // Log the result
        console.log(identityElement.textContent);
    }
  
    // Define your function
    async function foo() {
        const input = document.getElementById('multiquery');
        if (!input) {
            console.warn('multiquery input not found');
            return;
        }

        const raw = input.value.trim();
        const ids = raw.split(/[|;\s]+/).filter(Boolean); // Split on space, |, or ; and remove empties
	
      	for (const id of ids) {
            const url = `https://tabula.warwick.ac.uk/profiles/view/${encodeURIComponent(id)}`;

          	const newTab = window.open(url, '_blank');
                if (!newTab) {
                    console.error('Failed to open new tab');
                    continue;
                }

                await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for the new tab to load
                const identityElement = newTab.document.querySelector('.identity');
                if (identityElement) {
                    console.log(identityElement.textContent);
                } else {
                    console.warn('Element with class "identity" not found in the new tab');
                }

                newTab.close(); // Close the new tab after processing
            
        }
      
    }

    // Wait for the page to fully load
    window.addEventListener('load', function() {
        const container = document.getElementById('searchProfilesCommand');
        if (!container || !container.parentNode) return;
          	const newContent = document.createElement('div');
      			newContent.innerHTML = `
              <div class="input-group">
                <input id="multiquery" name="multiquery" class="form-control" placeholder="Enter multiple IDs" type="text" value="2229259 5511979" autocomplete="off">
                <div class="input-group-btn">
                    <button id="multibutton" class="btn btn-default" aria-label="Search" type="submit">
                        <i class="fa fa-search"></i>
                    </button>
                </div>
              </div>
          	`;
      
      			container.parentNode.appendChild(newContent);
      
      			document.getElementById('multibutton').addEventListener('click', function(event) {
                    foo();
                });
        }
    );
})();