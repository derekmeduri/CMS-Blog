const { json } = require("sequelize");

async function deleteFormHandler(event) {
  event.preventDefault();

  const id = [];

  const response = await fetch(`/api/posts/${id}`, {
    method: "delete",
    body: JSON.stringify({
      post_id: id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  //if post deleted redirect back to dashboard
  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}
//listen for click on delete button and run delete function
document.querySelector().addEventListener("click", deleteFormHandler);
