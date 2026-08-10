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

window.adobeDataLayer = window.adobeDataLayer || [];
console.log("adobeDataLayer initialized:", window.adobeDataLayer);

console.log("Pushing to adobeDataLayer");

adobeDataLayer.push({
  event: "pageLoad",
  _deloitteemeanorthpartnersand: {
    page: {
      pageType: "",
      pageIndustry: "retail",
      pageBigBetTopic: "Products",
      careerSectionFlag: false,
      pageLoadTime:
        performance.getEntriesByType("navigation")[0]?.loadEventEnd || 0,
    },

    traffic: {
      trackingCode:
        new URLSearchParams(window.location.search).get("trackingCode") || "",
      trafficSource: document.referrer || "direct",
      utm_source:
        new URLSearchParams(window.location.search).get("utm_source") || "",
      utm_medium:
        new URLSearchParams(window.location.search).get("utm_medium") || "",
      utm_campaign:
        new URLSearchParams(window.location.search).get("utm_campaign") || "",
      utm_term:
        new URLSearchParams(window.location.search).get("utm_term") || "",
      utm_content:
        new URLSearchParams(window.location.search).get("utm_content") || "",
    },

    user: {
      locale: navigator.language || "",
    },
  },

  web: {
    webPageDetails: {
      URL: document.URL,
      name:
        document.title ||
        window.location.pathname.split("/").filter(Boolean).pop() ||
        "home",
      server: document.domain,
      siteSection:
        window.location.pathname.split("/").filter(Boolean)[0] || "home",
      isErrorPage: document.title.toLowerCase().includes("404") || false,
      isHomePage:
        window.location.pathname === "/" || window.location.pathname === "",
    },

    webReferrer: {
      URL: document.referrer,
    },
  },
});

document
  .getElementById("checkout-form")
  ?.addEventListener("submit", function (event) {
    console.log("=== PURCHASE SUBMIT FIRED ===");

    // Stop the browser from navigating away before tracking
    event.preventDefault();

    console.log("Purchase event triggered");
    const purchaseData = {
    event: "purchase",

    _deloitteemeanorthpartnersand: {
      customer: {
        email:
          this.querySelector('input[name="email"]')?.value?.trim() || "",

        fullName:
          this.querySelector('input[name="name"]')?.value?.trim() || "",

        address:
          this.querySelector('input[name="address"]')?.value?.trim() || "",

        city:
          this.querySelector('input[name="city"]')?.value?.trim() || "",

        postcode:
          this.querySelector('input[name="postcode"]')?.value?.trim() || ""
      }
    }
  };
   alert(purchaseData )
    window.adobeDataLayer = window.adobeDataLayer || [];
    adobeDataLayer.push({
      event: "purchase",
      _deloitteemeanorthpartnersand: {
        customer: {
          email:
            document
              .querySelector('#checkout-form input[name="email"]')
              ?.value?.trim() || "",
          fullName:
            document
              .querySelector('#checkout-form input[name="name"]')
              ?.value?.trim() || "",
          address:
            document
              .querySelector('#checkout-form input[name="address"]')
              ?.value?.trim() || "",
          city:
            document
              .querySelector('#checkout-form input[name="City"]')
              ?.value?.trim() || "",
          postcode:
            document
              .querySelector('#checkout-form input[name="postcode"]')
              ?.value?.trim() || "",
        },
        page: {
          pageType: "",
          pageIndustry: "retail",
          pageBigBetTopic: "Products",
          careerSectionFlag: false,
          pageLoadTime:
            performance.getEntriesByType("navigation")[0]?.loadEventEnd || 0,
        },

        traffic: {
          trackingCode:
            new URLSearchParams(window.location.search).get("trackingCode") ||
            "",
          trafficSource: document.referrer || "direct",
          utm_source:
            new URLSearchParams(window.location.search).get("utm_source") || "",
          utm_medium:
            new URLSearchParams(window.location.search).get("utm_medium") || "",
          utm_campaign:
            new URLSearchParams(window.location.search).get("utm_campaign") ||
            "",
          utm_term:
            new URLSearchParams(window.location.search).get("utm_term") || "",
          utm_content:
            new URLSearchParams(window.location.search).get("utm_content") ||
            "",
        },

        user: {
          locale: navigator.language || "",
        },
      },

      web: {
        webPageDetails: {
          URL: document.URL,
          name:
            document.title ||
            window.location.pathname.split("/").filter(Boolean).pop() ||
            "home",
          server: document.domain,
          siteSection:
            window.location.pathname.split("/").filter(Boolean)[0] || "home",
          isErrorPage: document.title.toLowerCase().includes("404") || false,
          isHomePage:
            window.location.pathname === "/" || window.location.pathname === "",
        },

        webReferrer: {
          URL: document.referrer,
        },
      },
    });
    console.log("adobeDataLayer purchase ingestion:", window.adobeDataLayer);
    alert("testing purchase3");
    alert(JSON.stringify(window.adobeDataLayer, null, 2));
  });

console.log("===== add to cart =====");
(function () {
  function productItems(items) {
    return (items || []).map(function (p) {
      return {
        SKU: p.productId || p.id,
        name: p.productName || p.name,
        priceTotal: Number(p.priceTotal != null ? p.priceTotal : p.price || 0),
        quantity: Number(p.quantity || 1),
      };
    });
  }
  document.addEventListener("click", function (e) {
    var link = e.target.closest("[data-track]");
    if (!link) return;

    pushToDataLayer({
      event: "linkClick",
      name: link.dataset.track,
      type: "other",
      url: link.href || location.href,
    });
  });
})();
