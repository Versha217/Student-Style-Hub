			var MainImg = document.getElementById("MainImg");
			var smallimg = document.getElementsByClassName("small-img");
			
			smallimg[0].onclick=function(){
				MainImg.src=smallimg[0].src;
			}
			smallimg[1].onclick=function(){
				MainImg.src=smallimg[1].src;
			}
			smallimg[2].onclick=function(){
				MainImg.src=smallimg[2].src;
			}
			smallimg[3].onclick=function(){
				MainImg.src=smallimg[3].src;
			}
			
			
			function addToCart(productName, price, imageUrl, productId) {
				// Retrieve cart items from localStorage or initialize an empty array
				var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
				
				// Check if the product already exists in the cart
				var existingItem = cartItems.find(item => item.productId === productId);
				
				if (existingItem) {
					// If the product already exists, increment its quantity
					existingItem.quantity++;
					} else {
						// If the product doesn't exist, add it to the cart
						var newItem = {
						productId: productId,
						productName: productName,
						price: price,
						imageUrl: imageUrl,
						quantity: 1
						};
						cartItems.push(newItem);
					}

				// Save the updated cart items back to localStorage
				localStorage.setItem('cart', JSON.stringify(cartItems));
			
				// Update the cart icon in the header to reflect the number of items in the cart
				var cartIcon = document.querySelector('#lg-bag a');
				var cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
				cartIcon.innerHTML = `<i class="fa-solid fa-cart-shopping"></i><span class="cart-count">${cartItemCount}</span>`;

				// Display a toast message to indicate that the product was added to the cart
				showToast('Product added to cart.');

				// Display a message to indicate that the product was added to the cart
				showToast('Product added to cart');
				//alert('Product added to cart');

				// Redirect the user to the cart page
				//window.location.href = 'cart.html';
			}

			function showToast(message){
				//create a new div element for the toast message
				var toast=document.createElement('div');
				toast.classList.add('toast');
				toast.textContent=message;
	
				//Append the toast msg to body
				document.body.appendChild(toast);
	
				//Automatically remove the toast message after a short delay
				setTimeout(function(){
					document.body.removeChild(toast);
				},3000);
			}
			
