
/*
 * Adobe Experience Platform Web SDK
 * Retail Application
 */


/*
 * ============================================================
 * Adobe configuration
 * ============================================================
 */
console.log("===== adobe-web-sdk.js STARTED =====");

window.adobeDataLayer = window.adobeDataLayer || [];

console.log("adobeDataLayer initialized:", window.adobeDataLayer);

console.log("Pushing to adobeDataLayer");

window.adobeDataLayer.push({
  event: "pageView",
  page: {
    name: document.title,
    url: window.location.href
  }
});

