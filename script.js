document.addEventListener("DOMContentLoaded", function () {
    const videoItems = document.querySelectorAll(".video-item");
    const videoFrame = document.getElementById("video-frame");
    const commentsDiv = document.getElementById("comments");
    const commentForm = document.getElementById("comment-form");
    const commentInput = document.getElementById("comment-input");

    let currentVideoId = "";

    // Simpan komentar dalam objek dengan videoId sebagai kunci
    const comments = {};

    videoItems.forEach((item) => {
        item.addEventListener("click", function () {
            const videoId = item.getAttribute("data-video-id");
            currentVideoId = videoId;
            videoFrame.src = `https://drive.google.com/file/d/${videoId}/preview`;

            // Tampilkan komentar untuk video yang dipilih
            displayComments(videoId);
        });
    });

    commentForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const commentText = commentInput.value.trim();

        if (commentText && currentVideoId) {
            if (!comments[currentVideoId]) {
                comments[currentVideoId] = [];
            }
            comments[currentVideoId].push(commentText);
            displayComments(currentVideoId);
            commentInput.value = "";
        }
    });

    function displayComments(videoId) {
        commentsDiv.innerHTML = "";
        if (comments[videoId]) {
            comments[videoId].forEach((comment) => {
                const commentElement = document.createElement("div");
                commentElement.classList.add("comment");
                commentElement.textContent = comment;
                commentsDiv.appendChild(commentElement);
            });
        }
    }
}); 