// API URL for fetching products
const apiUrl = "https://fakestoreapi.com/products";

// DOM Elements
const productContainer = document.getElementById("product-container");
const searchInput = document.getElementById("search");

// Fetch products from API
async function fetchProducts() {
  try {
    const response = await fetch(apiUrl);
    const products = await response.json();
    displayProducts(products);
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

// Display products on the page
function displayProducts(products) {
  productContainer.innerHTML = ""; // Clear container
  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p>$${product.price}</p>
      <button onclick="alert('Buy Now clicked for ${product.title}')">Buy Now</button>
    `;
    productContainer.appendChild(productCard);
  });
}

// Filter products based on search input
async function filterProducts() {
  const searchQuery = searchInput.value.toLowerCase();
  const products = await fetchProducts();

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery)
  );

  displayProducts(filteredProducts);
}

// Initialize products on page load
fetchProducts();
