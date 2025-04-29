// ==UserScript==
// @name         Block Xiaohongshu Homepage
// @name:zh-CN   禁止访问小红书首页
// @version      1.0
// @namespace    https://github.com/Konano
// @description  Redirects to a blank page when visiting Xiaohongshu homepage to prevent addiction to fragmented information
// @description:zh-CN  当访问小红书首页时跳转到空白页，防止沉迷碎片信息
// @author       Konano
// @match        https://www.xiaohongshu.com/*
// @icon         https://www.xiaohongshu.com/favicon.ico
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // Check if the current URL is Xiaohongshu homepage
    function isExploreUrl(url) {
        if (!url) return false;

        // Exact match for https://www.xiaohongshu.com/explore
        if (url === 'https://www.xiaohongshu.com/explore' || url === 'https://www.xiaohongshu.com/explore/') {
            return true;
        }

        // Match explore page with query parameters
        if (url.match(/^https:\/\/www\.xiaohongshu\.com\/explore\?.*/)) {
            return true;
        }

        return false;
    }

    // Delayed redirect to blank page
    function delayedRedirect() {
        setTimeout(function() {
            console.log('Redirecting to blank page...');
            window.location.href = 'about:blank';
        }, 500);
    }

    // If current page is homepage, call redirect function
    if (isExploreUrl(window.location.href)) {
        console.log('Xiaohongshu homepage detected, redirecting to blank page...');
        delayedRedirect();
        return;
    }

    // Periodically check current URL
    setInterval(function() {
        if (isExploreUrl(window.location.href)) {
            console.log('Xiaohongshu homepage detected, redirecting to blank page...');
            delayedRedirect();
        }
    }, 1000);

})();
