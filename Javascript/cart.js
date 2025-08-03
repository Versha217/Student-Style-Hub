document.addEventListener('DOMContentLoaded', function() {
    displayCart();
});

function displayCart() {
    var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    var cartTable = document.getElementById('cartItems');
    var subtotal = 0;
    var uniqueProductIds = new Set();
    var cartProductIds = []; // Array to store product IDs
    var cartQuantities = []; // Array to store quantities
    var cartSubtotals = []; // Array to store subtotals

    // Clear existing table content including the tbody
    cartTable.getElementsByTagName('tbody')[0].innerHTML = '';



// Calculate total of all products
var total = 0;
cartItems.forEach(function(item) {
    total += item.price * item.quantity;
});

// Display total in the table
var totalCell = document.getElementById('totalCell');
totalCell.textContent = '₹' + total.toFixed(2);

// Display total in the form
var totalInput = document.getElementById('total');
totalInput.value = '₹' + total.toFixed(2);



    // Loop through each item in the cart
    cartItems.forEach(function(item, index) {
        // Add the product ID to the set of unique product IDs
        uniqueProductIds.add(item.productId);
        cartProductIds.push(item.productId); // Push product ID to the array
        cartQuantities.push(item.quantity); // Push quantity to the array

        // Create a new table row
        var row = cartTable.getElementsByTagName('tbody')[0].insertRow();

        // Insert cells into the row and populate them with product information
        row.insertCell(0).innerHTML = '<img src="' + item.imageUrl + '" alt="product image" style="max-width: 100px; max-height: 100px;">';
        row.insertCell(1).textContent = item.productName;
        row.insertCell(2).textContent = '₹' + item.price.toFixed(2);
        row.insertCell(3).innerHTML = '<input type="number" value="' + item.quantity + '" onchange="updateQuantity(' + index + ', this.value)" style="width: 50px; height: 30px;">'; // Quantity input
        var subtotalValue = item.price * item.quantity;
        row.insertCell(4).textContent = '₹' + subtotalValue.toFixed(2); // Subtotal
        row.insertCell(5).innerHTML = '<a onclick="removeItem(' + index + ')" style="color: red; font-size: 20px;"><i class="fa-solid fa-xmark"></i></a>'; // Remove button/link

        // Calculate subtotal for this item and add it to the overall subtotal
        subtotal += subtotalValue;
        cartSubtotals.push(subtotalValue); // Push subtotal to the array
    });

    // Display subtotal
    var subtotalElement = document.getElementById('cart-subtotal');
    subtotalElement.innerText = '₹' + subtotal.toFixed(2);

    // Calculate total (subtotal + shipping) - assuming shipping is free
    var total = subtotal;
    var shipping = 0; // Assuming shipping is free

    // Display total
   // var totalElement = document.getElementById('total');
    //totalElement.innerText = '₹' + total.toFixed(2);

    // Update form with product IDs, quantities, and their subtotals
    document.getElementById('productIds').value = cartProductIds.join(',');
    document.getElementById('quantities').value = cartQuantities.join(',');
    document.getElementById('subtotals').value = cartSubtotals.join(',');
}

function addToCart(productName, price, imageUrl, productId) {
    var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    var existingItemIndex = cartItems.findIndex(item => item.productId === productId);

    if (existingItemIndex !== -1) {
        // If the product already exists in the cart, update its quantity instead of adding a new entry
        cartItems[existingItemIndex].quantity++;
    } else {
        // If the product doesn't exist, add it to the cart with quantity 1
        cartItems.push({ productName: productName, price: price, imageUrl: imageUrl, productId: productId, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cartItems));
    displayCart();
}

function removeItem(index) {
    var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    displayCart();
}

function updateQuantity(index, newQuantity) {
    var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems[index].quantity = parseInt(newQuantity);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    displayCart();
}



// script for showing form when click on proceedToCheckout button

 function showCheckoutForm() {
            var checkoutContainer = document.getElementById("checkoutContainer");
            checkoutContainer.style.display = "block";
            //var col25Container = document.querySelector(".col-25");
            //col25Container.style.display = "block";
 }
	
	
document.getElementById("checkoutForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get form input values
    const firstName = document.getElementById("fname").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("adr").value;
    const city = document.getElementById("city").value;
    const phone = document.getElementById("phone").value;
    const state = document.getElementById("state").value;
    const zip = document.getElementById("zip").value;

    // Validate form inputs
    if (firstName === "" || email === "" || address === "" || city === "" || state === "" || zip === "" || phone === "") {
        alert("Please fill out all the required fields");
        return;
    }

    if (!/^[a-zA-Z\s]+$/.test(firstName)) {
        alert("Full Name should contain only letters and spaces");
        return;
    }

    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
        alert("Please enter a valid email address");
        return;
    }

    if (!/^[\w\s]+$/.test(address)) {
        alert("Address should contain only letters, numbers, and spaces");
        return;
    }

    if (!/^[\w\s]+$/.test(city)) {
        alert("City should contain only letters and spaces");
        return;
    }

    if (phone === "" || !/^\d{3}-\d{3}-\d{4}$/.test(phone)) {
        alert("Please enter a valid phone number in the format XXX-XXX-XXXX");
        return;
    }

    if (!/^[\w\s]+$/.test(state)) {
        alert("State should contain only letters and spaces");
        return;
    }

    if (!/^\d{6}$/.test(zip)) {
        alert("Zip code should contain exactly 6 digits");
        return;
    }

    // Submit the form
    const url = 'https://script.google.com/macros/s/AKfycbx2i9CurS2JBzib2PGvqXOvfVqbboLUza8AbeWjRAfSa7_BxZDRvrG-lPURmCxvYSJTjA/exec';
    const formData = new FormData(e.target);
	
	e.target.btn.innerHTML="Submitting...";
	
    try {
        const response = await fetch(url, {
            method: "POST",
            body: formData
        });
        const result = await response.text();
		
		e.target.btn.innerHTML="Submit";
		
        document.getElementById("res").innerHTML = result;
        setTimeout(() => {
            document.getElementById("res").innerHTML = '';
        }, 5000);
		
        // Reset form inputs
        const formInputs = e.target.getElementsByTagName("input");
        for (let i = 0; i < formInputs.length; i++) {
            formInputs[i].value = "";
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to submit the form. Please try again.');
    }
});

// Add event listener for cancel button
const cancelButton = document.getElementById("cancelButton");
cancelButton.addEventListener("click", () => {
    // Reset form inputs
    const form = document.getElementById("checkoutForm");
    const formInputs = form.getElementsByTagName("input");
    for (let i = 0; i < formInputs.length; i++) {
        formInputs[i].value = "";
    }

    // Hide checkout container
    const checkoutContainer = document.getElementById("checkoutContainer");
    checkoutContainer.style.display = "none";
});

