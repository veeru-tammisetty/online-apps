
/*
 * Adobe Experience Platform Web SDK
 * Retail Application
 */


/*
 * ============================================================
 * Adobe configuration
 * ============================================================
 */

window.NOVA_ADOBE_CONFIG = {
  orgId: "1F6324765762BE0E7F000101@AdobeOrg",
  datastreamId: "7c1168d7-ea8b-46aa-a71f-ee1280e77e6b",
  edgeDomain: "edge.adobedc.net"
};


/*
 * ============================================================
 * Adobe Web SDK base code
 *
 * This creates window.alloy immediately and queues commands
 * until the Adobe Web SDK library has finished loading.
 * ============================================================
 */

!function(n,o){
  o.forEach(function(o){
    n[o] || (
      n.__alloyNS = n.__alloyNS || [],
      n.__alloyNS.push(o),
      n[o] = function(){
        var u = arguments;
        return new Promise(function(i,l){
          n.setTimeout(function(){
            n[o].q.push([i,l,u]);
          });
        });
      },
      n[o].q = []
    );
  });
}(window, ["alloy"]);


/*
 * ============================================================
 * Load Adobe Web SDK
 * ============================================================
 */

(function () {

  var script = document.createElement("script");

  script.src =
    "https://cdn1.adoberesources.net/alloy/2.25.0/alloy.min.js";

  script.async = true;

  script.onload = function () {

    console.log("Adobe Web SDK library loaded.");

  };

  script.onerror = function () {

    console.error(
      "ERROR: Adobe Web SDK library failed to load."
    );

  };

  document.head.appendChild(script);

})();


/*
 * ============================================================
 * Configure Adobe Web SDK
 *
 * Because the base code creates alloy() immediately,
 * this command can safely be queued before the library
 * finishes downloading.
 * ============================================================
 */

alloy("configure", {

  orgId: window.NOVA_ADOBE_CONFIG.orgId,

  datastreamId: window.NOVA_ADOBE_CONFIG.datastreamId,

  edgeDomain: window.NOVA_ADOBE_CONFIG.edgeDomain

})
.then(function () {

  console.log(
    "Adobe Web SDK configured successfully."
  );

})
.catch(function (error) {

  console.error(
    "Adobe Web SDK configuration failed:",
    error
  );

});


/*
 * ============================================================
 * Test function
 * ============================================================
 */

window.testAdobeWebSDK = function () {

  if (typeof alloy === "undefined") {

    console.error(
      "Adobe Web SDK / alloy is not available."
    );

    return;

  }
  console.log("Pushing to adobeDataLayer");
window.adobeDataLayer = window.adobeDataLayer || [];
adobeDataLayer.push({
"event": "pageLoad",
"_genpactindia": {
"page": {
"pageType": "",
"pageIndustry": "",
"pageBigBetTopic": "",
"careerSectionFlag": false 
},
"traffic": {
"trackingCode": ""
"trafficSource": "",
"utm_source": "",
"utm_medium": "",
"utm_campaign": "",
"utm_term": "",
"utm_content": ""
},
"user": {
"locale": ""
}
},
"web": {
"webPageDetails": {
"URL": document.URL,
"name": "home",
"server": document.domain,
"siteSection": "home",
"isErrorPage": false,
"isHomePage": false
},
"webReferrer": {
"URL": document.referrer
}
}
}).then(function (result) {

    console.log(
      "Adobe page-view event sent successfully.",
      result
    );

  })
  .catch(function (error) {

    console.error(
      "Adobe page-view event failed:",
      error
    );

  });

};

