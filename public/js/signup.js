async function signup(event) {
  event.preventDefault();
  //take in username email and password for user login
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (username && email && password) {
    const response = await fetch("/api/users", {
      method: "post",
      body: JSON.stringify({ username, email, password }),
      headers: { "Content-Type": "application/json" },
    });
    //if user signup is successful redirect to dashboard
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
}

//add event listener to submit button for signup and run the function
document.querySelector(".signup-form").addEventListener("submit", signup);
