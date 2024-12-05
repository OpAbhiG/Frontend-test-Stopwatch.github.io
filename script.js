// API URL for fetching products (fake API for demonstration)
const apiUrl = "https://fakestoreapi.com/products";

// DOM Elements
const productContainer = document.querySelector(".results");
const searchInput = document.querySelector("header input");

// Fetch products from API
async function fetchProducts() {
  try {
    const response = await fetch(apiUrl);
    const products = await response.json();
    displayProducts(products); // Initially display all products
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

// Display products on the page
function displayProducts(products) {
  productContainer.innerHTML = ""; // Clear previous products
  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p>₹${product.price}</p>
      <a href="${product.url}" target="_blank">Buy Now</a>
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

  displayProducts(filteredProducts); // Display filtered results
}

// Initialize products on page load
fetchProducts();

// Event listener for search input
searchInput.addEventListener("input", filterProducts);
