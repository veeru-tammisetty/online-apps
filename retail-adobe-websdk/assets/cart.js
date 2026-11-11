function getCart() {
    return JSON.parse(localStorage.getItem("DeloitteCart") || "[]")
}

function saveCart(c) {
    localStorage.setItem("DeloitteCart", JSON.stringify(c))
}

function renderCart() {
    var c = getCart(),
        box = document.getElementById("cart-items"),
        total = 0;
    if (!c.length) {
        box.innerHTML = "<p>Your cart is empty. <a href='shop.html'>Continue shopping →</a></p>";
        document.getElementById("cart-total").textContent = "$0.00";
        return
    }
    box.innerHTML = c.map(function(x, i) {
        total += x.price * x.quantity;
        return "<div class='cart-row'><span><strong>" + x.name + "</strong><br>$" + x.price.toFixed(2) + " each</span><span>Qty: " + x.quantity + "</span><button class='btn small remove' data-i='" + i + "'>Remove</button></div>"
    }).join("");
    document.getElementById("cart-total").textContent = "$" + total.toFixed(2);
    box.querySelectorAll(".remove").forEach(function(b) {
        b.onclick = function() {
            var c = getCart();
            c.splice(+b.dataset.i, 1);
            saveCart(c);
            renderCart();
            updateCartCount()
        }
    })
}
document.addEventListener("DOMContentLoaded", renderCart);