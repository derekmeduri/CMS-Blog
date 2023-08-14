async function editFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector().value;
  const post_content = document.querySelector().value;
  const id = [];

  const response = await fetch(`/api/posts/${id}`, {
    method: "put",
    body: JSON.stringify({
      title,
      post_content,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}

//listen for submit button and run edit function
document.querySelector().addEventListener("submit", editFormHandler);
