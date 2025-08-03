
			const signUpBtn = document.getElementById("signupBtn");
			let signinBtn=document.getElementById("signinBtn");
			let nameField=document.getElementById("nameField");
			let title=document.getElementById("title");
			let signupForm = document.getElementById("signupForm");
			console.log("Signup form:", signupForm);
			
			
			signinBtn.addEventListener("click", function() {
	
				signupBtn.classList.add("disable");
				signinBtn.classList.remove("disable");
				console.log("name field disabled");
			});

			signupBtn.addEventListener("click", function() {	
				
				signupBtn.classList.remove("disable");
				signinBtn.classList.add("disable");
				
			});
			


			// Function to generate a unique user ID
			function generateUserId() {
			console.log("userId fn called");
			// Generate a timestamp-based ID
			var timestamp = new Date().getTime();

			// Generate a random number (between 0 and 9999)
			var random = Math.floor(Math.random() * 10000);

			// Combine timestamp and random number to create a unique ID
			var userId = timestamp + '-' + random;

			console.log("userId="+userId);
			return userId;
}

			


			document.getElementById("signupForm").addEventListener("submit", async (e) => {
			
			
				console.log("Form validation function called");
			
				e.preventDefault(); // Prevent the default form submission

				

				// Perform form validation
				let nameInput = document.getElementById("nameInput");
				let emailInput = document.getElementById("emailInput");
				let passwordInput = document.getElementById("passwordInput");

				console.log("Name:", nameInput.value);
				console.log("Email:", emailInput.value);
				console.log("Password:", passwordInput.value);

				// Validate name
				if (nameInput.value.trim() === "") {
					alert("Please enter your name.");
					return false;
				}

				// Validate email format
				let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				if (!emailPattern.test(emailInput.value)) {
					alert("Please enter a valid email address.");
					return false;
				}

				// Validate password length
				if (passwordInput.value.length < 8) {
					alert("Password must be at least 8 characters long.");
					return false;
				}
	
				// If all validations pass, submit the form
				
				console.log("Form submission prevented:", event.defaultPrevented);
				
				// Submit the form data to google sheets
				const url = 'https://script.google.com/macros/s/AKfycbyLV4Img2KBG3lab2lVr8aZhVb8s_3Poj7os129VHLM4v308V9LpD-feqSt9pnRl04yOA/exec';
				const  signUpData= new FormData(e.target);
				
				// Append the generated user ID to the form data
				var userId = generateUserId();
				console.log("function call to userId:", userId);
				signUpData.set('userId', userId); // Append the userId to the form data

				e.target.signupBtn.innerHTML="Sign Up...";
					
				try {
						const response = await fetch(url, {
						method: "POST",
						body: signUpData
					});
					
					const result = await response.text();
		
					e.target.signupBtn.innerHTML="Sing Up";
		
					document.getElementById("res").innerHTML = result;
					setTimeout(() => {
						document.getElementById("res").innerHTML = '';
					}, 5000);
		
					// Display the success message
					//document.getElementById("res").innerHTML = 'Thank you for sign up ';
		
		
					// Check if the response contains a success message
					if (result.includes("Thank You for sign up")) {
						
						// Redirect the user to the home page with a smooth transition
						setTimeout(() => {
							window.location.replace('index.html');
						}, 2000);
		
						// Reset form inputs
						const formInputs = e.target.getElementsByTagName("input");
						for (let i = 0; i < formInputs.length; i++) {
							formInputs[i].value = "";
						}
					}
				} 
				catch (error) {
					console.error('Error:', error);
					alert('Failed to submit the form. Please try again.');
				}
	
	
			});
			
			




/*

// to get user data from sheet and show in pop up box
document.getElementById('userIcon').addEventListener('click', function() {
  fetch('https://script.google.com/macros/s/AKfycbzoffowxfTdv2QAFTCZJ13VEOMj4vBzPhifAE0OUvXvFY8ig4a9oK8w1T8AQNcGcvzfpQ/exec')
    .then(response => response.json())
    .then(data => {
      const popupUserData = document.getElementById('popupUserData');
      popupUserData.innerHTML = '<h2>User Data</h2><ul>';
      data.forEach(user => {
        popupUserData.innerHTML += `<li>Name: ${user.name}, Email: ${user.email}</li>`;
      });
      popupUserData.innerHTML += '</ul>';
      document.getElementById('popup').style.display = 'block';
    })
    .catch(error => console.error('Error fetching user data:', error));
});

document.getElementsByClassName('close')[0].addEventListener('click', function() {
  document.getElementById('popup').style.display = 'none';
});


*/


