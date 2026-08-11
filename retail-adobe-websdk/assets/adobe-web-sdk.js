/*
 * Adobe Experience Platform Web SDK
 * Retail Application
 */

/*
 * ============================================================
 * Adobe configuration
 * ============================================================
 *
 */

console.log("===== adobe-web-sdk.js STARTED =====");


window.adobeDataLayer.push({
    "event": "pageLoad",

    "_deloitteemeanorthpartnersand": {
        "page": {
            "pageType": "",
            "pageIndustry": "retail1",
            "pageBigBetTopic": "Products",
            "careerSectionFlag": false,
            "pageLoadTime": performance.getEntriesByType("navigation")[0]?.loadEventEnd || 0
        },
        "traffic": {
            "trackingCode": new URLSearchParams(window.location.search).get("trackingCode") || "",
            "trafficSource": document.referrer || "direct",
            "utm_source": new URLSearchParams(window.location.search).get("utm_source") || "",
            "utm_medium": new URLSearchParams(window.location.search).get("utm_medium") || "",
            "utm_campaign": new URLSearchParams(window.location.search).get("utm_campaign") || "",
            "utm_term": new URLSearchParams(window.location.search).get("utm_term") || "",
            "utm_content": new URLSearchParams(window.location.search).get("utm_content") || ""
        },
        "user": {
            "locale": navigator.language || ""
        }
    },
    "web": {
        "webPageDetails": {
            "URL": document.URL,
            "name": document.title || window.location.pathname.split("/").filter(Boolean).pop() || "home",
            "server": document.domain,
            "siteSection": window.location.pathname.split("/").filter(Boolean)[0] || "home",
            "isErrorPage": document.title.toLowerCase().includes("404") || false,
            "isHomePage": window.location.pathname === "/" || window.location.pathname === ""
        },
        "webReferrer": {
            "URL": document.referrer
        }
    }
});
document
    .getElementById("checkout-form")
    ?.addEventListener("submit", function(event) {
        console.log("=== PURCHASE SUBMIT FIRED ===");

        // Stop the browser from navigating away before tracking
        event.preventDefault();

        console.log("Purchase event triggered");
        window.adobeDataLayer.push({
            "event": "purchase",
            
            "_deloitteemeanorthpartnersand": {
                "customer": {
                    "email": document
                        .querySelector('#checkout-form input[name="email"]')
                        ?.value?.trim() || "",
                    "fullName": document
                        .querySelector('#checkout-form input[name="name"]')
                        ?.value?.trim() || "",
                    "address": document
                        .querySelector('#checkout-form input[name="address"]')
                        ?.value?.trim() || "",
                    "city": document
                        .querySelector('#checkout-form input[name="city"]')
                        ?.value?.trim() || "",
                    "postcode": document
                        .querySelector('#checkout-form input[name="postcode"]')
                        ?.value?.trim() || "",
                },

                /*"page": {
                    "pageType": "",
                    "pageIndustry": "retail1",
                    "pageBigBetTopic": "Products",
                    "careerSectionFlag": false,
                    "pageLoadTime": performance.getEntriesByType("navigation")[0]?.loadEventEnd || 0
                },
                "traffic": {
                    "trackingCode": new URLSearchParams(window.location.search).get("trackingCode") || "",
                    "trafficSource": document.referrer || "direct",
                    "utm_source": new URLSearchParams(window.location.search).get("utm_source") || "",
                    "utm_medium": new URLSearchParams(window.location.search).get("utm_medium") || "",
                    "utm_campaign": new URLSearchParams(window.location.search).get("utm_campaign") || "",
                    "utm_term": new URLSearchParams(window.location.search).get("utm_term") || "",
                    "utm_content": new URLSearchParams(window.location.search).get("utm_content") || ""
                },
                "user": {
                    "locale": navigator.language || ""
                }*/
            },/*
            "web": {
                "webPageDetails": {
                    "URL": document.URL,
                    "name": document.title || window.location.pathname.split("/").filter(Boolean).pop() || "home",
                    "server": document.domain,
                    "siteSection": window.location.pathname.split("/").filter(Boolean)[0] || "home",
                    "isErrorPage": document.title.toLowerCase().includes("404") || false,
                    "isHomePage": window.location.pathname === "/" || window.location.pathname === ""
                },
                "webReferrer": {
                    "URL": document.referrer
                }
            },*/
            "purchases": {
                "id": "Sample value",
                "value": 30691.27
            },
            "productListItems": [{
                "SKU": "Sample value",
                "_id": "/uri-reference",
                "currencyCode": "USD",
                "discountAmount": 14917.88,
                "name": "Sample value",
                "priceTotal": 28613.41,
                "product": "https://ns.adobe.com/xdm/common/uri",
                "productAddMethod": "Sample value",
                "productCategories": [{
                    "categoryID": "Sample value",
                    "categoryName": "Sample value",
                    "categoryPath": "Sample value"
                }],
                "productImageUrl": "Sample value",
                "quantity": 32440,
                "refundAmount": 5750.85,
                "returnItem": {
                    "returnItemCondition": "Sample value",
                    "returnQuantityApproved": 5576,
                    "returnQuantityAuthorized": 6711,
                    "returnQuantityReceived": 11406,
                    "returnQuantityRequested": 28828,
                    "returnReason": "Sample value",
                    "returnResolution": "Sample value",
                    "returnStatus": "Sample value"
                },
                "selectedOptions": [{
                    "attribute": "Sample value",
                    "value": "Sample value"
                }],
                "unitOfMeasureCode": "Sample value"
            }]
        });
    });


console.log("===== add to cart =====");
(function() {
    function productItems(items) {
        return (items || []).map(function(p) {
            return {
                SKU: p.productId || p.id,
                name: p.productName || p.name,
                priceTotal: Number(p.priceTotal != null ? p.priceTotal : p.price || 0),
                quantity: Number(p.quantity || 1),
            };
        });
    }
    document.addEventListener("click", function(e) {
        var link = e.target.closest("[data-track]");
        if (!link) return;

    });
})();