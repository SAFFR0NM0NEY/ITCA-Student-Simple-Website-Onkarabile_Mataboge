fetch("data/Product.xml")
 .then(response => response.text())
 .then(data => {
    const parser = new DOMParser();
    const xml = parser.parseFromString(data, "application/xml");
    const products = xml.getElementsByTagName("product");
    let output = "";
    for (let product of products) {
        const name = product.getElementsByTagName("name")[0].textContent;
        const price = product.getElementsByTagName("price")[0].textContent;
        const image = product.getElementsByTagName("image")[0].textContent;
        output += `
        <div class="product-card">
            <img src="${image}" alt="${name}" width="200">
            <h3>${name}</h3>
            <p>Price: R${price}</p>
            <button class="addingtocart" onclick="addToCart('${name}', ${price})">Add to Cart</button>
        </div>`;
    }
    document.getElementById("product-list").innerHTML = output;
 });

 function addToCart(name, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${name} added to cart`);
}


