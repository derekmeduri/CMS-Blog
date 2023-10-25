const comment = async (event) => {
  event.preventDefault();

  const comment = document.querySelector("#comment-content").value.trim();

  if (comment) {
    console.log(comment);
    const response = await fetch(`/api/comment/posts`, {
      method: "POST",
      body: JSON.stringify({
        post_id: event.target.dataset.id,
        content: comment,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      document.location.reload();
    } else {
      alert("Comment not added");
    }
  }
};

const deleteComment = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data_id");

    const response = await fetch(`/api/comment/${id}`, {
      method: "DELTE",
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert("Comment not deleted");
    }
  }
};

document.querySelector("#commentForm").addEventListener("submit", comment);

document.querySelectorAll("#deleteButton").forEach((delBtn) => {
  delBtn.addEventListener("click", deleteComment);
});
