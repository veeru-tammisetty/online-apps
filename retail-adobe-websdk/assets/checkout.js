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
        
        
    }
});