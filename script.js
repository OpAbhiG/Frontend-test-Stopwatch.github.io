// Fake product data for demonstration (Replace with actual API calls later)
const amazonProducts = [
  { id: 1, title: "Laptop", price: 45000, image: "https://example.com/laptop.jpg", url: "https://www.amazon.in/dp/B08DLXYWTG" },
  { id: 2, title: "Smartphone", price: 20000, image: "https://example.com/smartphone.jpg", url: "https://www.amazon.in/dp/B08DLXYWTG" },
];

const flipkartProducts = [
  { id: 1, title: "Laptop", price: 46000, image: "https://example.com/laptop.jpg", url: "https://www.flipkart.com" },
  { id: 2, title: "Smartphone", price: 19000, image: "https://example.com/smartphone.jpg", url: "https://www.flipkart.com" },
];

// Function to search for products from both Amazon and Flipkart
function searchProducts() {
  const query = document.getElementById("search").value.trim();

  if (query === "") {
    alert("Please enter a product name to search!");
    return;
  }

  // Clear previous results
  document.getElementById("results").innerHTML = "Loading...";

  // Filter products from both Amazon and Flipkart
  const filteredAmazonProducts = amazonProducts.filter(product => 
    product.title.toLowerCase().includes(query.toLowerCase())
  );

  const filteredFlipkartProducts = flipkartProducts.filter(product => 
    product.title.toLowerCase().includes(query.toLowerCase())
  );

  // Combine the results
  const combinedResults = [...filteredAmazonProducts, ...filteredFlipkartProducts];

  displayResults(combinedResults);
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
      <p>₹${product.price}</p>
      <a href="${product.url}" target="_blank">View Product</a>
    `;

    resultsDiv.appendChild(productCard);
  });
}
