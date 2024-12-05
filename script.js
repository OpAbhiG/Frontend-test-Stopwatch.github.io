// API URL for fetching product data (You can use any public API, such as Fake Store API)
const apiUrl = 'https://fakestoreapi.com/products';

// Function to search for products
async function searchProducts() {
  const query = document.getElementById("search").value.trim();

  if (query === "") {
    alert("Please enter a product name to search!");
    return;
  }

  // Clear previous results
  document.getElementById("results").innerHTML = "Loading...";

  // Fetch the products data
  try {
    const response = await fetch(apiUrl);
    const products = await response.json();

    // Filter products based on the search query
    const filteredProducts = products.filter(product => 
      product.title.toLowerCase().includes(query.toLowerCase())
    );

    displayResults(filteredProducts);
  } catch (error) {
    console.error('Error fetching product data:', error);
    document.getElementById("results").innerHTML = "Error fetching product data.";
  }
}

// Function to display product results
function displayResults(products) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = '';  // Clear any previous results

  if (products.length === 0) {
    resultsDiv.innerHTML = "No products found!";
    return;
  }

  // Create a card for each product
  products.forEach(product => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p>$${product.price}</p>
      <a href="${product.url}" target="_blank">View Product</a>
    `;

    resultsDiv.appendChild(productCard);
  });
}
