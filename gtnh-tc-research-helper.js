// ==UserScript==
// @name         TC Research Helper: Default to GTNH
// @namespace    https://glowredman.github.io/tcresearch
// @version      1.0
// @author       https://github.com/Linx-ESP
// @description  Auto-select Version 4.2.2.0 and enable all addons
// @match        https://glowredman.github.io/tcresearch*
// @grant        none
// @license      AGPL v3.0
// @icon         https://static.wikitide.net/gtnhwiki/2/2e/GTNH-logo.png
// ==/UserScript==

(function() {
    'use strict';

    // Utility: wait for an element to exist
    function waitFor(selector, callback) {
        const el = document.querySelector(selector);
        if (el) return callback(el);
        const obs = new MutationObserver(() => {
            const el = document.querySelector(selector);
            if (el) {
                obs.disconnect();
                callback(el);
            }
        });
        obs.observe(document.documentElement, { childList: true, subtree: true });
    }

    // 1. Select version 4.2.2.0
    waitFor("select#version", (sel) => {
        const target = [...sel.options].find(o => o.textContent.includes("4.2.2.0"));
        if (target) {
            sel.value = target.value;
            sel.dispatchEvent(new Event("change"));
        }
    });

    // 2. Select all addons
    waitFor("#addons", (container) => {
        const checkboxes = container.querySelectorAll("input[type='checkbox']");
        checkboxes.forEach(cb => {
            if (!cb.checked) {
                cb.checked = true;
                cb.dispatchEvent(new Event("change"));
            }
        });
    });

    // 3. Set Min Steps = 7
    waitFor("input#minsteps", (input) => {
        input.value = 7;
        input.dispatchEvent(new Event("input"));
        input.dispatchEvent(new Event("change"));
    });

})();
