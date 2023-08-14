async function commentHandler(event) {
  event.preventDefault();

  const comment_content = document.querySelector().value.trim();

  const post_id = [];

  if (comment_content) {
    const response = await fetch("/api/comments", {
      method: "post",
      body: JSON.stringify({
        post_id,
        comment_content,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      //reload page if comment successfully added
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
}

//event listener on comment submit button and run function
document.querySelector().addEventListener("submit", commentHandler);
