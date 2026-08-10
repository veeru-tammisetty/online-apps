# Nova Retail — Adobe Web SDK demo

A five-page responsive retail website built with HTML, CSS and JavaScript.

## Pages
- `index.html` — home / featured products
- `shop.html` — product catalogue and category filter
- `product.html` — product detail
- `cart.html` — localStorage shopping cart
- `checkout.html` — demo checkout / purchase event

## Adobe Experience Platform Web SDK

The site uses Adobe Alloy from the Adobe CDN and configures it in:
`assets/adobe-web-sdk.js`

Replace:
- `YOUR_IMS_ORG_ID@AdobeOrg`
- `YOUR_DATASTREAM_ID`

with values from Adobe Experience Platform Data Collection.

The demo sends:
- Page views
- Product views
- Add-to-cart events
- Checkout events
- Purchase events
- Link-click interactions

### Important
This is a client-side demo. Do not put API secrets, private credentials, or server authentication keys in browser JavaScript.

For production, configure the datastream with the appropriate Adobe Experience Platform services (for example Analytics, Experience Platform, or other destinations) and define an XDM schema/data elements/event mappings that match your implementation.

## Run locally

Because the project is static, serve it from a local web server rather than opening the HTML files directly. For example:

`python3 -m http.server 8000`

Then open:

`http://localhost:8000`

## Notes

The consent implementation in this demo opts into Adobe consent after Alloy configuration for demonstration purposes. A real site should obtain consent according to the applicable privacy requirements and your CMP before sending data.


## Adobe Client Data Layer

The updated implementation uses a browser-side `window.adobeDataLayer`:

```javascript
window.adobeDataLayer.push({
  event: "productView",
  product: {
    productId: "aurora-lamp",
    productName: "Aurora Desk Lamp",
    price: 89,
    quantity: 1
  }
});
```

The bridge in `assets/adobe-web-sdk.js` consumes these events and maps them to
Adobe Experience Platform Web SDK `sendEvent()` calls.

Implemented ACDL events:
- `pageView`
- `productView`
- `addToCart`
- `checkoutStart`
- `purchase`
- `linkClick`

Architecture:

`Website UI → adobeDataLayer → ACDL/Web SDK bridge → XDM → Adobe Edge Network → Datastream`

This keeps business-event data separate from the code that transports it to
Adobe and makes it easier to add an Adobe Analytics, AEP, Target, or other
datastream destination later.
