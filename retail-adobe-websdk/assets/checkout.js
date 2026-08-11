function getCart() {
    return JSON.parse(localStorage.getItem("novaCart") || "[]");
}

function renderCheckout() {

    var c = getCart();

    var total = c.reduce(function(s, x) {
        return s + (x.price * x.quantity);
    }, 0);

    document.getElementById("checkout-summary").innerHTML =
        c.map(function(x) {
            return "<p>" +
                x.name +
                " × " +
                x.quantity +
                " — $" +
                (x.price * x.quantity).toFixed(2) +
                "</p>";
        }).join("") || "<p>Your cart is empty.</p>";

    document.getElementById("checkout-total").textContent =
        "$" + total.toFixed(2);

    /*
     * Checkout Start Event
     */
    window.novaAdobe && novaAdobe.checkoutStart(
        c.map(function(x) {
            return {
                "SKU": x.id,
                "name": x.name,
                "priceTotal": x.price * x.quantity,
                "quantity": x.quantity,
                "currencyCode": "USD"
            };
        }),
        total
    );
}


document.addEventListener("DOMContentLoaded", function() {

    renderCheckout();

    document.getElementById("checkout-form").onsubmit = function(e) {

        e.preventDefault();

        var c = getCart();

        var total = c.reduce(function(s, x) {
            return s + (x.price * x.quantity);
        }, 0);

        var orderId = "NOVA-" + Date.now();


        /*
         * Build productListItems
         */
        var productListItems = c.map(function(x) {

            return {
                "SKU": x.id,

                "_id": "/product/" + x.id,

                "currencyCode": "USD",

                "discountAmount": 0,

                "name": x.name,

                "priceTotal": x.price * x.quantity,

                "product": "/product/" + x.id,

                "productAddMethod": "cart",

                "productCategories": [],

                "productImageUrl": "",

                "quantity": x.quantity,

                "unitOfMeasureCode": "EA",

                "selectedOptions": []
            };

        });


        /*
         * Debug
         */
        console.log("===== NOVA PURCHASE =====");
        console.log("Order ID:", orderId);
        console.log("Purchase Value:", total);
        console.log("Product List Items:", productListItems);


        /*
         * Push Purchase Event into Adobe Data Layer
         */

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

                "purchases": {
                    "id": orderId,
                    "value": total
                },

                "productListItems": productListItems

            }

        });


        /*
         * Send through your Adobe Web SDK wrapper
         */
        window.novaAdobe && novaAdobe.purchase(
            productListItems,
            total,
            orderId
        );


        /*
         * Clear cart
         */
        localStorage.removeItem("novaCart");


        alert("Demo order placed: " + orderId);

        location.href = "index.html";
    };
});
