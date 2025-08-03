
/*Shop Page */

// Function to filter products based on search input
function filterProducts() {
    const searchTerm = document.querySelector('.search-box').value.toLowerCase();
    const products = document.getElementsByClassName('pro');

    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        const productName = product.querySelector('.des h5').textContent.toLowerCase(); // Get product name

        if (productName.includes(searchTerm)) {
            product.classList.remove('hide'); // Show matching products
        } else {
            product.classList.add('hide'); // Hide non-matching products
        }
    }
}


// Add event listener for pressing Enter key
document.querySelector('.search-box').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        filterProducts();
    }
});


// for pagination links it works properly 
/*
function showProducts(page) {
  // Hide all product sections
  document.getElementById('product1').style.display = 'none';
  document.getElementById('product2').style.display = 'none';
  document.getElementById('product3').style.display = 'none';

  // Show products for the selected page
  document.getElementById('product' + page).style.display = 'block';
}
*/