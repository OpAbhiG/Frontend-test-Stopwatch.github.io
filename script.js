const apiUrl = "https://fakestoreapi.com/products"; // Fake Store API URL
let products = [];

// Fetch products from the API
async function fetchProducts() {
  try {
    const response = await fetch(apiUrl);
    products = await response.json();
    displayProducts(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    document.getElementById("product-list").innerHTML = `
      <p>Failed to load products. Please try again later.</p>`;
  }
}

// Display products on the page
function displayProducts(productList) {
  const productListContainer = document.getElementById("product-list");
  productListContainer.innerHTML = ""; // Clear existing products

  productList.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h3>${product.title}</h3>
      <div class="price">$${product.price.toFixed(2)}</div>
      <a href="#" class="store-link" target="_blank">Buy Now</a>
    `;

    productListContainer.appendChild(productCard);
  });
}

// Filter products based on search input
function filterProducts() {
  const searchValue = document.getElementById("search").value.toLowerCase();
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchValue)
  );
  displayProducts(filteredProducts);
}

// Load products on page load
document.addEventListener("DOMContentLoaded", fetchProducts);
