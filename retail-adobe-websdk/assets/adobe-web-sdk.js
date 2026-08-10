
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
 * Load Adobe Web SDK
 * ============================================================
 */

(function () {

  var script = document.createElement("script");

  /*
   * Adobe Alloy CDN
   */
  script.src = "https://cdn1.adoberesources.net/alloy/2.25.0/alloy.min.js";

  script.async = true;

  script.onload = function () {

    console.log("Adobe Web SDK loaded.");

    /*
     * Configure Alloy
     */
    alloy("configure", {

      orgId: window.NOVA_ADOBE_CONFIG.orgId,

      datastreamId: window.NOVA_ADOBE_CONFIG.datastreamId,

      edgeDomain: window.NOVA_ADOBE_CONFIG.edgeDomain

    });

    console.log("Adobe Web SDK configured.");

    /*
     * Send initial page-view event
     */
    sendPageView();

  };

  script.onerror = function () {

    console.error(
      "Unable to load Adobe Web SDK."
    );

  };

  document.head.appendChild(script);

})();


/*
 * ============================================================
 * Page View
 * ============================================================
 */

function sendPageView() {

  if (typeof alloy === "undefined") {

    console.error(
      "Adobe Web SDK is not available."
    );

    return;

  }

  alloy("sendEvent", {

    xdm: {

      eventType: "web.webpagedetails.pageViews",

      web: {

        webPageDetails: {

          name: document.title,

          URL: window.location.href

        }

      }

    }

  })
  .then(function (result) {

    console.log(
      "Page view event sent successfully.",
      result
    );

  })
  .catch(function (error) {

    console.error(
      "Page view event failed.",
      error
    );

  });

}


/*
 * ============================================================
 * Product View
 * ============================================================
 */

function viewProduct(product) {

  if (typeof alloy === "undefined") {

    console.error(
      "Adobe Web SDK is not available."
    );

    return;

  }

  alloy("sendEvent", {

    xdm: {

      eventType: "commerce.productViews",

      productListItems: [

        {

          SKU: product.sku,

          name: product.name,

          priceTotal: product.price,

          quantity: 1

        }

      ]

    }

  })
  .then(function (result) {

    console.log(
      "Product view event sent.",
      result
    );

  })
  .catch(function (error) {

    console.error(
      "Product view event failed.",
      error
    );

  });

}


/*
 * ============================================================
 * Add To Cart
 * ============================================================
 */

function addToCart(product) {

  if (typeof alloy === "undefined") {

    console.error(
      "Adobe Web SDK is not available."
    );

    return;

  }

  alloy("sendEvent", {

    xdm: {

      eventType: "commerce.productListAdds",

      commerce: {

        productListAdds: {

          value: 1

        }

      },

      productListItems: [

        {

          SKU: product.sku,

          name: product.name,

          priceTotal: product.price,

          quantity: 1

        }

      ]

    }

  })
  .then(function (result) {

    console.log(
      "Add-to-cart event sent.",
      result
    );

  })
  .catch(function (error) {

    console.error(
      "Add-to-cart event failed.",
      error
    );

  });

}


/*
 * ============================================================
 * Button Events
 * ============================================================
 */

document.addEventListener("DOMContentLoaded", function () {

  var product1 = {
    sku: "LAPTOP-001",
    name: "Laptop",
    price: 1000
  };

  var product2 = {
    sku: "HEADPHONE-001",
    name: "Headphones",
    price: 200
  };


  var viewProductButton =
    document.getElementById("view-product");

  if (viewProductButton) {

    viewProductButton.addEventListener(
      "click",
      function () {

        viewProduct(product1);

      }
    );

  }


  var addToCartButton =
    document.getElementById("add-to-cart");

  if (addToCartButton) {

    addToCartButton.addEventListener(
      "click",
      function () {

        addToCart(product1);

      }
    );

  }


  var viewProduct2Button =
    document.getElementById("view-product-2");

  if (viewProduct2Button) {

    viewProduct2Button.addEventListener(
      "click",
      function () {

        viewProduct(product2);

      }
    );

  }


  var addToCart2Button =
    document.getElementById("add-to-cart-2");

  if (addToCart2Button) {

    addToCart2Button.addEventListener(
      "click",
      function () {

        addToCart(product2);

      }
    );

  }

});
