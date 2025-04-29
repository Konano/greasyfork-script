// ==UserScript==
// @name         Remove Xiaohongshu Recommended Feeds
// @name:zh-CN   移除小红书首页的个性化推送
// @description  Automatically removes the exploreFeeds element from Xiaohongshu pages
// @description:zh-CN  当访问小红书首页时自动移除个性化推送
// @namespace    https://github.com/Konano
// @version      1.1.0.20250429
// @author       Konano
// @homepageURL  https://github.com/Konano/greasyfork-script
// @match        https://www.xiaohongshu.com/*
// @icon         https://www.xiaohongshu.com/favicon.ico
// @license      MIT
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // Execute after page load
    window.addEventListener('load', function() {
        removeElements();
    });

    // Also check and remove elements when DOM changes
    const observer = new MutationObserver(function() {
        removeElements();
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });

    function removeElements() {
        // Remove exploreFeeds element
        const exploreElement = document.getElementById('exploreFeeds');
        if (exploreElement && !exploreElement.dataset.removed) {
            exploreElement.remove();
            console.log('Xiaohongshu exploreFeeds element has been removed');
            exploreElement.dataset.removed = 'true';
        }
        
        // Remove elements with IDs starting with "homefeed."
        const homefeedElements = document.querySelectorAll('[id^="homefeed."]');
        homefeedElements.forEach(element => {
            if (!element.dataset.removed) {
                element.remove();
                console.log('Xiaohongshu element with ID starting with "homefeed." has been removed');
                element.dataset.removed = 'true';
            }
        });
        
        // Remove element with ID "homefeed_recommend"
        const recommendElement = document.getElementById('homefeed_recommend');
        if (recommendElement && !recommendElement.dataset.removed) {
            recommendElement.remove();
            console.log('Xiaohongshu homefeed_recommend element has been removed');
            recommendElement.dataset.removed = 'true';
        }
    }
})();
