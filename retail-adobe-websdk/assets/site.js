// Shared cart counter helper. Loaded automatically by pages that need it.
function updateCartCount() {
    var c = JSON.parse(localStorage.getItem("novaCart") || "[]");
    var n = c.reduce(function(s, x) {
        return s + x.quantity
    }, 0);
    document.querySelectorAll("#cart-count").forEach(function(el) {
        el.textContent = n
    })
}
document.addEventListener("DOMContentLoaded", function() {
    updateCartCount();
    document.querySelectorAll(".add-to-cart").forEach(function(btn) {
        btn.addEventListener("click", function() {
            var c = JSON.parse(localStorage.getItem("novaCart") || "[]"),
                id = btn.dataset.productId,
                p = {
                    id: id,
                    name: btn.dataset.name,
                    price: Number(btn.dataset.price)
                },
                x = c.find(function(i) {
                    return i.id === id
                });
            if (x) x.quantity++;
            else c.push(Object.assign({
                quantity: 1
            }, p));
            localStorage.setItem("novaCart", JSON.stringify(c));
            window.novaAdobe && novaAdobe.addToCart(p, 1);
            updateCartCount();
            btn.textContent = "Added ✓";
            setTimeout(function() {
                btn.textContent = "Add to cart"
            }, 1200)
        })
    });
    var cat = document.getElementById("category");
    if (cat) cat.onchange = function() {
        document.querySelectorAll("#product-grid .card").forEach(function(card) {
            card.style.display = (cat.value === "all" || card.dataset.category === cat.value) ? "block" : "none"
        })
    }
});