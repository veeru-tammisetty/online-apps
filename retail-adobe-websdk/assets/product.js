document.addEventListener("DOMContentLoaded", function () {
  var id = new URLSearchParams(location.search).get("id") || "aurora-lamp";
  var p = window.PRODUCT_CATALOG[id] || window.PRODUCT_CATALOG["aurora-lamp"];
  document.title = "Deloitte Retail — " + p.name;
  document.getElementById("product-name").textContent = p.name;
  document.getElementById("product-price").textContent = "$" + p.price.toFixed(2);
  document.getElementById("product-description").textContent = p.description;
  var visual = document.getElementById("product-visual");
  visual.textContent = p.image; visual.className = "product-image large " + p.class;
  window.DeloitteAdobe && DeloitteAdobe.productView({id:id,name:p.name,price:p.price});
  document.getElementById("add-product").onclick = function () {
    var cart = JSON.parse(localStorage.getItem("DeloitteCart") || "[]");
    var existing = cart.find(function(x){return x.id===id;});
    if (existing) existing.quantity++; else cart.push({id:id,name:p.name,price:p.price,quantity:1});
    localStorage.setItem("DeloitteCart", JSON.stringify(cart));
    window.DeloitteAdobe && DeloitteAdobe.addToCart({id:id,name:p.name,price:p.price},1);
    alert("Added to cart");
    if (typeof updateCartCount === "function") updateCartCount();
  };
});
