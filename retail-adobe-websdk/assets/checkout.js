function getCart() {
    return JSON.parse(localStorage.getItem("novaCart") || "[]")
}

function renderCheckout() {
    var c = getCart(),
        total = c.reduce(function(s, x) {
            return s + x.price * x.quantity
        }, 0);
    document.getElementById("checkout-summary").innerHTML = c.map(function(x) {
        return "<p>" + x.name + " × " + x.quantity + " — $" + (x.price * x.quantity).toFixed(2) + "</p>"
    }).join("") || "<p>Your cart is empty.</p>";
    document.getElementById("checkout-total").textContent = "$" + total.toFixed(2);
    window.novaAdobe && novaAdobe.checkoutStart(c.map(function(x) {
        return {
            SKU: x.id,
            name: x.name,
            priceTotal: x.price * x.quantity,
            quantity: x.quantity
        }
    }), total)
}
document.addEventListener("DOMContentLoaded", function() {
    renderCheckout();
    document.getElementById("checkout-form").onsubmit = function(e) {
        e.preventDefault();
        var c = getCart(),
            total = c.reduce(function(s, x) {
                return s + x.price * x.quantity
            }, 0),
            orderId = "NOVA-" + Date.now();
        window.novaAdobe && novaAdobe.purchase(c.map(function(x) {
            return {
                SKU: x.id,
                name: x.name,
                priceTotal: x.price * x.quantity,
                quantity: x.quantity
            }
        }), total, orderId);
        localStorage.removeItem("novaCart");
        alert("Demo order placed: " + orderId);
        console.log("=== PURCHASE SUBMIT FIRED ===");

        // Stop the browser from navigating away before tracking

        console.log("Purchase event triggered");
        window.adobeDataLayer = [];

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
                .querySelector('#checkout-form input[name="City"]')
                ?.value?.trim() || "",
            "postcode": document
                .querySelector('#checkout-form input[name="postcode"]')
                ?.value?.trim() || "",
        },

        "page": {
            "pageType": "",
            "pageIndustry": "retail",
            "pageBigBetTopic": "Products",
            "careerSectionFlag": false,
            "pageLoadTime": performance.getEntriesByType("navigation")[0]?.loadEventEnd || 0,
        },

        "traffic": {
            "trackingCode": new URLSearchParams(window.location.search).get("trackingCode") || "",
            "trafficSource": document.referrer || "direct",
            "utm_source": new URLSearchParams(window.location.search).get("utm_source") || "",
            "utm_medium": new URLSearchParams(window.location.search).get("utm_medium") || "",
            "utm_campaign": new URLSearchParams(window.location.search).get("utm_campaign") || "",
            "utm_term": new URLSearchParams(window.location.search).get("utm_term") || "",
            "utm_content": new URLSearchParams(window.location.search).get("utm_content") || "",
        },

        "user": {
            "locale": navigator.language || "",
        },
    },

    "web": {
        "webPageDetails": {
            "URL": document.URL,
            "name": document.title ||
                window.location.pathname.split("/").filter(Boolean).pop() ||
                "home",
            "server": document.domain,
            "siteSection": window.location.pathname.split("/").filter(Boolean)[0] || "home",
            "isErrorPage": document.title.toLowerCase().includes("404") || false,
            "isHomePage": window.location.pathname === "/" || window.location.pathname === "",
        },

        "webReferrer": {
            "URL": document.referrer,
        },
    },
});
  console.log(JSON.stringify(window.adobeDataLayer, null, 2));
  console.log("test2")
    }
});