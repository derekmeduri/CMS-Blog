async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector().value;
  const post_content = document.querySelector().value;

  const response = await fetch("/api/posts", {
    method: "post",
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
//add event listener for submit button on creating new post then run function
document
  .querySelector(".new-post-form")
  .addEventListener("submit", newFormHandler);
