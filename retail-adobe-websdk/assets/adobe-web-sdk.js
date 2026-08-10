/*
 * Adobe Client Data Layer (ACDL) + Adobe Experience Platform Web SDK bridge.
 *
 * Flow:
 * UI -> window.adobeDataLayer -> ACDL listener -> XDM -> Alloy sendEvent
 *
 * Replace the Adobe configuration placeholders below.
 */
(function () {
  window.adobeDataLayer = window.adobeDataLayer || [];

  window.NOVA_ADOBE_CONFIG = {
    orgId: "1F6324765762BE0E7F000101@AdobeOrg",
    datastreamId: "7c1168d7-ea8b-46aa-a71f-ee1280e77e6b",
    edgeDomain: "edge.adobedc.net"
  };

  function waitForAlloy(callback, tries) {
    if (typeof window.alloy === "function") return callback();
    if ((tries || 0) > 100) return;
    setTimeout(function () {
      waitForAlloy(callback, (tries || 0) + 1);
    }, 100);
  }

  function sendXdm(xdm, data) {
    waitForAlloy(function () {
      window.alloy("sendEvent", {
        xdm: xdm || {},
        data: data || {}
      }).catch(function (error) {
        console.warn("Adobe Web SDK sendEvent failed:", error);
      });
    });
  }

  function productItems(items) {
    return (items || []).map(function (p) {
      return {
        SKU: p.productId || p.id,
        name: p.productName || p.name,
        priceTotal: Number(p.priceTotal != null ? p.priceTotal : p.price || 0),
        quantity: Number(p.quantity || 1)
      };
    });
  }

  function handleDataLayerEvent(entry) {
    if (!entry || !entry.event) return;

    var event = entry.event;
    var p = entry.product || {};
    var products = entry.products || [];
    var items = entry.productListItems || products;

    if (event === "pageView") {
      sendXdm({
        eventType: "web.webpagedetails.pageViews",
        web: {
          webPageDetails: {
            pageViews: { value: 1 },
            name: entry.pageName || document.title,
            URL: location.href
          }
        }
      });
    }

    if (event === "productView") {
      sendXdm({
        eventType: "commerce.productViews",
        productListItems: productItems([p]),
        commerce: { productViews: { value: 1 } }
      });
    }

    if (event === "addToCart") {
      sendXdm({
        eventType: "commerce.productListAdds",
        productListItems: productItems([p]),
        commerce: { productListAdds: { value: 1 } }
      });
    }

    if (event === "checkoutStart") {
      sendXdm({
        eventType: "commerce.checkouts",
        productListItems: productItems(items),
        commerce: {
          checkouts: { value: 1 },
          order: {
            priceTotal: Number(entry.total || 0),
            currencyCode: entry.currencyCode || "AUD"
          }
        }
      });
    }

    if (event === "purchase") {
      sendXdm({
        eventType: "commerce.purchases",
        productListItems: productItems(items),
        commerce: {
          purchases: { value: 1 },
          order: {
            purchaseID: entry.orderId,
            priceTotal: Number(entry.total || 0),
            currencyCode: entry.currencyCode || "AUD"
          }
        }
      });
    }

    if (event === "linkClick") {
      sendXdm({
        eventType: "web.webinteraction.linkClicks",
        web: {
          webInteraction: {
            name: entry.name,
            type: entry.type || "other",
            URL: entry.url || location.href
          }
        }
      });
    }
  }

  function pushToDataLayer(entry) {
    window.adobeDataLayer.push(entry);
    handleDataLayerEvent(entry);
  }

  window.novaAdobe = {
    pageView: function (name) {
      pushToDataLayer({
        event: "pageView",
        pageName: name || document.title
      });
    },

    productView: function (p) {
      pushToDataLayer({
        event: "productView",
        product: {
          productId: p.id,
          productName: p.name,
          price: p.price,
          quantity: 1
        }
      });
    },

    addToCart: function (p, quantity) {
      pushToDataLayer({
        event: "addToCart",
        product: {
          productId: p.id,
          productName: p.name,
          price: p.price,
          quantity: quantity || 1,
          priceTotal: p.price * (quantity || 1)
        }
      });
    },

    checkoutStart: function (items, total) {
      pushToDataLayer({
        event: "checkoutStart",
        productListItems: items,
        total: total,
        currencyCode: "AUD"
      });
    },

    purchase: function (items, total, orderId) {
      pushToDataLayer({
        event: "purchase",
        productListItems: items,
        total: total,
        orderId: orderId,
        currencyCode: "AUD"
      });
    }
  };

  waitForAlloy(function () {
    window.alloy("configure", {
      orgId: window.NOVA_ADOBE_CONFIG.orgId,
      datastreamId: window.NOVA_ADOBE_CONFIG.datastreamId,
      edgeDomain: window.NOVA_ADOBE_CONFIG.edgeDomain,
      defaultConsent: "pending",
      clickCollectionEnabled: true,
      clickCollection: {
        internalLinkEnabled: true,
        downloadLinkEnabled: true,
        externalLinkEnabled: true
      }
    }).then(function () {
      /*
       * Demo consent only.
       * A production site should connect this to its CMP.
       */
      return window.alloy("setConsent", {
        consent: [{
          standard: "Adobe",
          version: "2.0",
          value: { general: "in" }
        }]
      });
    }).then(function () {
      pushToDataLayer({
        event: "pageView",
        pageName: document.title
      });
    });
  });

  document.addEventListener("click", function (e) {
    var link = e.target.closest("[data-track]");
    if (!link) return;

    pushToDataLayer({
      event: "linkClick",
      name: link.dataset.track,
      type: "other",
      url: link.href || location.href
    });
  });
})();
