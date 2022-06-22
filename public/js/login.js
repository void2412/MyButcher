// function to get login details from the user
const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  console.log(email);
  console.log(password);

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch("/api/customers/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace("/userprofile");
    } else {
      alert(response.statusText);
    }
  }
};

// function to get the sign up details from the user
const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector("#name-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();
  const phone1 = document.querySelector("#phone-signup").value.trim();
  const address = document.querySelector("#address-signup").value.trim();
  const account_type = 1;
  console.log(name, email, password, phone1, address, account_type);
  if (name && email && password) {
    const response = await fetch("/api/customers", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        name,
        address,
        phone1,
        account_type,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/userprofile");
    } else {
      alert(response.statusText);
    }
  }
  // console.log(name, email, password, phone, address);
};

// function to edit saved customer details
const goToUserEdit = (event) => {
  event.preventDefault();
  id = event.target.getAttribute("data-id");

  document.location.replace(`/edit-profile/${id}`);
};

const saveCustomerDetails = async (event) => {
  event.preventDefault();

  const name = document.querySelector("#name-edit").value.trim();

  const email = document.querySelector("#email-edit").value.trim();

  const phone1 = document.querySelector("#phone1-edit").value.trim();

  const phone2 = document.querySelector("#phone2-edit").value.trim();

  const address = document.querySelector("#address-edit").value.trim();

  console.log(name, email, phone1, address);

  const urlValue = window.location.pathname;

  const urlId = urlValue.split("/");

  if (name && email) {
    const response = await fetch(`/api/customers/${urlId[urlId.length - 1]}`, {
      method: "PUT",
      body: JSON.stringify({ name, email, phone1, phone2, address }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/userprofile");
    } else {
      alert("Failed to update post");
    }
  }
};

// function to redirect page to the customers order's route

const goToOrderPage = (event) => {
  event.preventDefault();
  id = event.target.getAttribute("data-id");

  document.location.replace(`/orders/${id}`);
};
