// function to get login details from the user
const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  console.log(email);
  console.log(password);

  //   if (email && password) {
  //     // Send a POST request to the API endpoint
  //     const response = await fetch("/api/users/login", {
  //       method: "POST",
  //       body: JSON.stringify({ email, password }),
  //       headers: { "Content-Type": "application/json" },
  //     });
  //     console.log((await response.json()).user);

  //     if (response.ok) {
  //       // If successful, redirect the browser to the profile page
  //       document.location.replace("/userprofile");
  //     } else {
  //       alert(response.statusText);
  //     }
  //   }
};

// function to get the sign up details from the user
const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector("#name-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();
  const phone = document.querySelector("#phone-signup").value.trim();
  const address = document.querySelector("#address-signup").value.trim();

  //   if (name && email && password) {
  //     const response = await fetch("/api/users", {
  //       method: "POST",
  //       body: JSON.stringify({ name, email, password }),
  //       headers: { "Content-Type": "application/json" },
  //     });

  //     if (response.ok) {
  //       document.location.replace("/dashboard");
  //     } else {
  //       alert(response.statusText);
  //     }
  //   }
  console.log(name, email, password, phone, address);
};