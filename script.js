// API URL for fetching products (replace this with real APIs from Flipkart, Amazon, etc.)
const apiUrl = "https://fakestoreapi.com/products"; // Fake API for demo purposes

// DOM Elements
const productContainer = document.querySelector(".results");
const searchInput = document.querySelector("header input");

// Fetch products from the API
async function fetchProducts() {
  try {
    const response = await fetch(apiUrl); // Fetch products from the API
    const products = await response.json(); // Parse the JSON data
    return products; // Return the products
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

    // Add the product data (image, title, price, and link) to the card
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p>₹${product.price}</p>
      <a href="${product.url}" target="_blank">Buy Now</a>
    `;
    
    // Append the product card to the product container
    productContainer.appendChild(productCard);
  });
}

// Filter products based on the search input
async function filterProducts() {
  const searchQuery = searchInput.value.toLowerCase(); // Convert search input to lowercase
  const products = await fetchProducts(); // Fetch products

  // Filter products that match the search query (case-insensitive)
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery) // Check if product title includes the search query
  );

  // Display the filtered products
  displayProducts(filteredProducts);
}

// Initialize products and display them on page load
fetchProducts().then(products => displayProducts(products));

// Event listener for the search input to filter products as the user types
searchInput.addEventListener("input", filterProducts);
